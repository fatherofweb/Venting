#!/usr/bin/env node
/**
 * Local development sync script.
 * Fetches the SteelSoft catalogue, keeps only the current 2026 VENTING offer
 * (see lib/product-filter.mjs), attaches the local watermark-free catalogue
 * photos, and writes the result to public/data/products.json.
 *
 * Usage:
 *   npm run sync
 */

import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { overrideImage } from '../lib/image-overrides.mjs'
import { isCatalogProduct } from '../lib/product-filter.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DATA_DIR = join(ROOT, 'public', 'data')
const OUT_FILE = join(DATA_DIR, 'products.json')

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

/** Polja koja overrideImage() traži iz sirovog zapisa. */
const imageInput = (p) => ({ name: p.acName ?? '', model: p.Model ?? '', subcategoryName: p.acCLassif2Name ?? '' })

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

console.log(`\n[3/5] Filtering VENTING catalogue products…`)
// 2026 katalog = slike koje je klijent poslao. Pravilo je u product-filter.mjs:
// VENTING + prava kategorija + pokriven katalog-slikom + (za-web ili novi 2026 model).
const ventingRaw = allProducts.filter(isCatalogProduct)
const ventingIds = new Set(ventingRaw.map((p) => p.acIdent))
console.log(`      ${ventingRaw.length} VENTING catalogue products`)

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

// Build products — svaki artikal po definiciji filtera ima lokalnu katalog-sliku,
// pa overrideImage() ovde nikad ne vraća null.
console.log('\n[5/5] Building products…')
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
  image: overrideImage(imageInput(p)),
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
console.log(`✓ Completed in ${elapsed}s`)
console.log('─'.repeat(60))

console.log('\nCategories:')
for (const cat of categories) {
  console.log(`  ${cat.code.padEnd(20)} ${cat.name.substring(0, 38).padEnd(38)} ${cat.count}`)
}
