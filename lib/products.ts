/**
 * Product data access layer.
 *
 * The committed public/data/products.json is the source of truth for the
 * catalogue and its images — it ships with every deploy, so the live site is
 * always correct the moment the code deploys. Vercel KV (refreshed by the daily
 * cron) is used only when it is *strictly newer* than the bundled snapshot, so a
 * stale KV entry can never override a fresh deploy. Regenerate the snapshot with
 * `npm run sync` and commit it whenever the catalogue changes.
 */

import type { SyncResult, Product, Category } from './sync'
import bundledData from '@/public/data/products.json'

const KV_KEY = 'venting:products:v1'
const BUNDLED = bundledData as unknown as SyncResult

// ── Storage helpers ───────────────────────────────────────────────────────────

async function kvAvailable(): Promise<boolean> {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

function dataPath(filename: string): string {
  const { join } = require('path') as typeof import('path')
  return join(process.cwd(), 'public', 'data', filename)
}

export async function loadSyncResult(): Promise<SyncResult | null> {
  // KV wins only when it is strictly newer than the deployed snapshot.
  if (await kvAvailable()) {
    try {
      const { kv } = await import('@vercel/kv')
      const kvData = await kv.get<SyncResult>(KV_KEY)
      if (kvData?.syncedAt && kvData.syncedAt > BUNDLED.syncedAt) return kvData
    } catch {
      // KV unreachable — fall through to the bundled snapshot
    }
  }
  return BUNDLED
}

export async function saveSyncResult(data: SyncResult): Promise<void> {
  if (await kvAvailable()) {
    const { kv } = await import('@vercel/kv')
    // No TTL — the cron updates this manually; we never want it to auto-expire
    await kv.set(KV_KEY, data)
    return
  }

  // Local dev fallback — write to public/data/products.json
  const { writeFile, mkdir } = await import('fs/promises')
  const dir = dataPath('')
  await mkdir(dir, { recursive: true })
  await writeFile(dataPath('products.json'), JSON.stringify(data, null, 2), 'utf-8')
}

// ── Public read API ───────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const data = await loadSyncResult()
  return data?.products ?? []
}

export async function getCategories(): Promise<Category[]> {
  const data = await loadSyncResult()
  return data?.categories ?? []
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find((p) => p.id === id) ?? null
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts()
  if (!category || category === 'all') return products
  return products.filter((p) => p.category === category)
}

export async function getSyncMeta(): Promise<{ syncedAt: string; total: number } | null> {
  const data = await loadSyncResult()
  if (!data) return null
  return { syncedAt: data.syncedAt, total: data.total }
}
