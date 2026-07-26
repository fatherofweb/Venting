/**
 * Core sync logic — runs both in the Vercel Cron route and the local CLI script.
 * Fetches products + specs from the SteelSoft API and keeps only the current 2026
 * VENTING offer (see product-filter.mjs). Every kept product is attached its local
 * watermark-free catalogue photo from lib/image-overrides.mjs — the site serves no
 * external product images, so the whole thing stays well under the Vercel 60s limit.
 */

import { overrideImage } from './image-overrides.mjs'
import { isCatalogProduct } from './product-filter.mjs'

const STEELSOFT_BASE = 'http://mail.steelsoft.rs:51337'

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
  const user = process.env.STEELSOFT_USER
  const pass = process.env.STEELSOFT_PASS
  if (!user || !pass) {
    throw new Error('STEELSOFT_USER and STEELSOFT_PASS must be set in the environment')
  }
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
  acShowAtena: string      // "T" = SteelSoft marks it for the web
  adTimeChg: string | null
  Inverter: string
  EnergetskiRazred: string | null
}

/** Fields overrideImage() needs from a raw record. */
function imageInput(p: RawProduct) {
  return { name: p.acName ?? '', model: p.Model ?? '', subcategoryName: p.acCLassif2Name ?? '' }
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

  // The 2026 catalogue *is* the set of photos the client sent — a product only
  // exists on the site if one of those photos covers it (see product-filter.mjs).
  // Everything else (discontinued series, spare parts, items with no photo) is
  // left out by design.
  const ventingRaw = allProducts.filter(isCatalogProduct)
  const ventingIds = new Set(ventingRaw.map((p) => p.acIdent))
  console.log(`[sync] ${ventingRaw.length} VENTING catalogue products`)

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

  // Build final product list. Every item is guaranteed a local catalogue photo
  // by the filter above, so overrideImage() never returns null here.
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
    image: overrideImage(imageInput(p)),
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
