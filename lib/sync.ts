/**
 * Core sync logic — runs both in the Vercel Cron route and the local CLI script.
 * Fetches all VENTING-brand products from the SteelSoft API, joins specs,
 * and resolves product image URLs via the public WordPress media library on steelsoft.rs.
 *
 * Image resolution is cached persistently (Vercel KV / local file) so subsequent
 * daily syncs only query the WP API for filenames that have never been seen before,
 * keeping runtime well under the Vercel Hobby 60-second function limit.
 */

import { loadImageCache, saveImageCache } from './products'

const STEELSOFT_BASE = 'http://mail.steelsoft.rs:51337'
const WP_MEDIA_BASE = 'https://steelsoft.rs/wp-json/wp/v2/media'
const IMAGE_CONCURRENCY = 15
const BRAND_FILTER = 'VENTING'

// ── Types ────────────────────────────────────────────────────────────────────

export interface Spec {
  name: string
  value: string
  attr: string   // qualifier, e.g. "maks.", "min.", "nom."
  unit: string
  group: string
  basic: boolean // true = key spec shown in quick-stats row
  order: number  // official display order from API
}

export interface Product {
  id: string
  name: string
  model: string
  type: string
  category: string
  categoryName: string
  subcategory: string
  subcategoryName: string
  barcode: string
  inStock: boolean
  lastUpdated: string
  image: string | null
  energyClass: string
  inverter: string
  specs: Spec[]
}

export interface Category {
  code: string
  name: string
  count: number
}

export interface SyncResult {
  products: Product[]
  categories: Category[]
  syncedAt: string
  total: number
}

// ── SteelSoft API ─────────────────────────────────────────────────────────────

function steelsoftAuth(): string {
  const user = process.env.STEELSOFT_USER ?? ''
  const pass = process.env.STEELSOFT_PASS ?? ""
  return Buffer.from(`${user}:${pass}`).toString('base64')
}

async function fetchSteelSoft<T>(path: string): Promise<T> {
  const res = await fetch(`${STEELSOFT_BASE}${path}`, {
    headers: { Authorization: `Basic ${steelsoftAuth()}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`SteelSoft ${path} → HTTP ${res.status}`)
  return res.json() as Promise<T>
}

// ── WordPress media resolver ──────────────────────────────────────────────────

type WPMedia = { source_url: string }

/**
 * Resolves only filenames not already in the persistent cache.
 * Returns an updated cache record with any new entries merged in.
 */
async function resolveNewImages(
  filenames: string[],
  existingCache: Record<string, string>
): Promise<Record<string, string>> {
  const unique = [...new Set(filenames.filter(Boolean))]

  // Only query WP for filenames we haven't seen before
  const unknown = unique.filter((f) => !(f in existingCache))
  console.log(
    `[sync] Image cache: ${unique.length - unknown.length} hits, ${unknown.length} need lookup`
  )

  if (unknown.length === 0) return existingCache

  const newEntries: Record<string, string> = {}

  for (let i = 0; i < unknown.length; i += IMAGE_CONCURRENCY) {
    const batch = unknown.slice(i, i + IMAGE_CONCURRENCY)
    await Promise.all(
      batch.map(async (filename) => {
        try {
          const searchTerm = filename.replace(/\.[^.]+$/, '')
          const url = `${WP_MEDIA_BASE}?search=${encodeURIComponent(searchTerm)}&per_page=3&orderby=date&order=desc`
          const res = await fetch(url, { cache: 'no-store' })
          if (!res.ok) return
          const items = (await res.json()) as WPMedia[]
          // Store URL if found, empty string if not — so we never look this up again
          newEntries[filename] = items.length > 0 ? items[0].source_url : ''
        } catch {
          // Non-fatal — will retry next sync
        }
      })
    )
  }

  console.log(`[sync] Resolved ${Object.keys(newEntries).length} new images`)
  return { ...existingCache, ...newEntries }
}

// ── Raw API types ─────────────────────────────────────────────────────────────

interface RawProduct {
  anQId: number
  acIdent: string
  acName: string
  acClassif: string
  acClassifName: string
  acClassif2: string
  acCLassif2Name: string
  acCode: string | null
  Brand: string
  Model: string
  Tip: string
  anStock: string
  adTimeChg: string | null
  _acWebImage: string | null
  Inverter: string
  EnergetskiRazred: string | null
}

interface RawSpec {
  acIdent: string
  acSpecName: string
  acValue: string | null
  acAttr: string | null
  acUM: string | null
  acGroup: string | null
  acBasic: string | null
  anOrderID: number | null
}

// ── Main sync function ────────────────────────────────────────────────────────

export async function syncProducts(): Promise<SyncResult> {
  // Fetch sequentially — the server returns 500 on concurrent large requests
  console.log('[sync] Fetching SteelSoft products…')
  const allProducts = await fetchSteelSoft<RawProduct[]>('/api/identi/')
  console.log(`[sync] Got ${allProducts.length} products`)

  console.log('[sync] Fetching SteelSoft specs…')
  const allSpecs = await fetchSteelSoft<RawSpec[]>('/api/karakteristike/')
  console.log(`[sync] Got ${allSpecs.length} specs`)

  // Filter to VENTING brand only
  const ventingRaw = allProducts.filter((p) => p.Brand?.trim() === BRAND_FILTER)
  const ventingIds = new Set(ventingRaw.map((p) => p.acIdent))
  console.log(`[sync] ${ventingRaw.length} VENTING products`)

  // Build specs map (acIdent → Spec[]), sorted by official order
  const specsMap = new Map<string, Spec[]>()
  for (const s of allSpecs) {
    if (!ventingIds.has(s.acIdent) || !s.acValue) continue
    const arr = specsMap.get(s.acIdent) ?? []
    arr.push({
      name: s.acSpecName ?? '',
      value: s.acValue,
      attr: s.acAttr ?? '',
      unit: s.acUM ?? '',
      group: s.acGroup ?? '',
      basic: s.acBasic === 'T',
      order: s.anOrderID ?? 9999,
    })
    specsMap.set(s.acIdent, arr)
  }
  // Sort each product's specs by the API-defined display order
  for (const [id, specs] of specsMap) {
    specsMap.set(id, specs.sort((a, b) => a.order - b.order))
  }

  // Load persistent image cache, resolve only new filenames, save updated cache
  const imageFilenames = ventingRaw.map((p) => p._acWebImage ?? '').filter(Boolean)
  const existingCache = await loadImageCache()
  const updatedCache = await resolveNewImages(imageFilenames, existingCache)
  await saveImageCache(updatedCache)

  // Build final product list
  const products: Product[] = ventingRaw.map((p) => ({
    id: p.acIdent,
    name: p.acName ?? '',
    model: p.Model ?? '',
    type: p.Tip ?? '',
    category: p.acClassif ?? '',
    categoryName: p.acClassifName ?? '',
    subcategory: p.acClassif2 ?? '',
    subcategoryName: p.acCLassif2Name ?? '',
    barcode: p.acCode?.trim() ?? '',
    inStock: parseFloat(p.anStock ?? '0') > 0,
    lastUpdated: p.adTimeChg ?? '',
    image: p._acWebImage ? (updatedCache[p._acWebImage] || null) : null,
    energyClass: p.EnergetskiRazred ?? '',
    inverter: p.Inverter ?? '',
    specs: specsMap.get(p.acIdent) ?? [],
  }))

  // Build category list sorted by count
  const catMap = new Map<string, { name: string; count: number }>()
  for (const p of products) {
    const entry = catMap.get(p.category)
    if (entry) entry.count++
    else catMap.set(p.category, { name: p.categoryName, count: 1 })
  }
  const categories: Category[] = [...catMap.entries()]
    .map(([code, { name, count }]) => ({ code, name, count }))
    .sort((a, b) => b.count - a.count)

  const result: SyncResult = {
    products,
    categories,
    syncedAt: new Date().toISOString(),
    total: products.length,
  }

  console.log(`[sync] Done — ${result.total} products across ${categories.length} categories`)
  return result
}
