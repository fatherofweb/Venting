#!/usr/bin/env node
/**
 * Local development sync script.
 * Fetches all VENTING products from SteelSoft + resolves images,
 * then writes the result to public/data/products.json.
 *
 * Image resolutions are cached in public/data/image-cache.json so
 * subsequent runs only query the WordPress media API for new filenames,
 * keeping runtime to ~15s after the first run.
 *
 * Usage:
 *   npm run sync
 */

import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DATA_DIR = join(ROOT, 'public', 'data')
const OUT_FILE = join(DATA_DIR, 'products.json')
const CACHE_FILE = join(DATA_DIR, 'image-cache.json')

// ── Load .env.local if present ────────────────────────────────────────────────
try {
  const envRaw = await readFile(join(ROOT, '.env.local'), 'utf-8')
  for (const line of envRaw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    let val = trimmed.slice(idx + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
} catch { /* .env.local is optional */ }

// ── Config ────────────────────────────────────────────────────────────────────
const STEELSOFT_BASE = 'http://mail.steelsoft.rs:51337'
const STEELSOFT_USER = process.env.STEELSOFT_USER ?? ''
const STEELSOFT_PASS = process.env.STEELSOFT_PASS ?? ""
const WP_MEDIA_BASE = 'https://steelsoft.rs/wp-json/wp/v2/media'
const IMAGE_CONCURRENCY = 15
const BRAND_FILTER = 'VENTING'

const STEELSOFT_AUTH = Buffer.from(`${STEELSOFT_USER}:${STEELSOFT_PASS}`).toString('base64')

// ── Helpers ───────────────────────────────────────────────────────────────────
async function fetchSteelSoft(path) {
  console.log(`  GET ${STEELSOFT_BASE}${path}`)
  const res = await fetch(`${STEELSOFT_BASE}${path}`, {
    headers: { Authorization: `Basic ${STEELSOFT_AUTH}` },
  })
  if (!res.ok) throw new Error(`SteelSoft ${path} → HTTP ${res.status}`)
  return res.json()
}

async function loadImageCache() {
  try {
    const raw = await readFile(CACHE_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

async function saveImageCache(cache) {
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8')
}

async function resolveNewImages(filenames, existingCache) {
  const unique = [...new Set(filenames.filter(Boolean))]
  const unknown = unique.filter((f) => !(f in existingCache))

  console.log(`  Cache: ${unique.length - unknown.length} hits, ${unknown.length} need lookup`)

  if (unknown.length === 0) return existingCache

  const newEntries = {}

  for (let i = 0; i < unknown.length; i += IMAGE_CONCURRENCY) {
    const batch = unknown.slice(i, i + IMAGE_CONCURRENCY)
    process.stdout.write(`  images ${i + 1}–${Math.min(i + IMAGE_CONCURRENCY, unknown.length)} / ${unknown.length}\r`)

    await Promise.all(
      batch.map(async (filename) => {
        try {
          const searchTerm = filename.replace(/\.[^.]+$/, '')
          const url = `${WP_MEDIA_BASE}?search=${encodeURIComponent(searchTerm)}&per_page=3&orderby=date&order=desc`
          const res = await fetch(url)
          if (!res.ok) return
          const items = await res.json()
          // Store URL if found, empty string if not — so we never look this up again
          newEntries[filename] = items.length > 0 ? items[0].source_url : ''
        } catch { /* Non-fatal */ }
      })
    )
  }
  process.stdout.write('\n')
  console.log(`  Resolved ${Object.keys(newEntries).length} new images`)
  return { ...existingCache, ...newEntries }
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log('─'.repeat(60))
console.log('Venting product sync')
console.log('─'.repeat(60))

const started = Date.now()

console.log('\n[1/5] Fetching products from SteelSoft…')
const allProducts = await fetchSteelSoft('/api/identi/')
console.log(`      ${allProducts.length} products`)

console.log('\n[2/5] Fetching specs from SteelSoft…')
const allSpecs = await fetchSteelSoft('/api/karakteristike/')
console.log(`      ${allSpecs.length} specs`)

console.log(`\n[3/5] Filtering VENTING brand…`)
const ventingRaw = allProducts.filter((p) => p.Brand?.trim() === BRAND_FILTER)
const ventingIds = new Set(ventingRaw.map((p) => p.acIdent))
console.log(`      ${ventingRaw.length} VENTING products`)

console.log('\n[4/5] Building specs map…')
const specsMap = new Map()
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

console.log('\n[5/5] Resolving product images (using persistent cache)…')
const imageFilenames = ventingRaw.map((p) => p._acWebImage ?? '').filter(Boolean)
const existingCache = await loadImageCache()
const updatedCache = await resolveNewImages(imageFilenames, existingCache)
await saveImageCache(updatedCache)

// Build products
const products = ventingRaw.map((p) => ({
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

// Build categories
const catMap = new Map()
for (const p of products) {
  const entry = catMap.get(p.category)
  if (entry) entry.count++
  else catMap.set(p.category, { name: p.categoryName, count: 1 })
}
const categories = [...catMap.entries()]
  .map(([code, { name, count }]) => ({ code, name, count }))
  .sort((a, b) => b.count - a.count)

const result = {
  products,
  categories,
  syncedAt: new Date().toISOString(),
  total: products.length,
}

await mkdir(DATA_DIR, { recursive: true })
await writeFile(OUT_FILE, JSON.stringify(result, null, 2), 'utf-8')

const elapsed = ((Date.now() - started) / 1000).toFixed(1)
console.log('\n' + '─'.repeat(60))
console.log(`✓ Synced ${result.total} products across ${categories.length} categories`)
console.log(`✓ Written to ${OUT_FILE}`)
console.log(`✓ Image cache: ${Object.keys(updatedCache).length} entries in ${CACHE_FILE}`)
console.log(`✓ Completed in ${elapsed}s`)
console.log('─'.repeat(60))

console.log('\nCategories:')
for (const cat of categories) {
  console.log(`  ${cat.code.padEnd(20)} ${cat.name.substring(0, 38).padEnd(38)} ${cat.count}`)
}
