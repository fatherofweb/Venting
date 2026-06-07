/**
 * Product data access layer.
 *
 * Strategy:
 *  - Production (Vercel):  reads from Vercel KV, populated daily by the cron sync.
 *  - Local development:    reads from public/data/products.json written by `npm run sync`.
 *
 * KV keys:
 *   venting:products:v1     — full SyncResult
 *   venting:image-cache:v1  — filename→URL map, persists across syncs
 */

import type { SyncResult, Product, Category } from './sync'

const KV_KEY = 'venting:products:v1'
const IMAGE_CACHE_KEY = 'venting:image-cache:v1'

// ── Storage helpers ───────────────────────────────────────────────────────────

async function kvAvailable(): Promise<boolean> {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

// ── Image cache (persists between syncs to avoid re-querying WP) ─────────────

function dataPath(filename: string): string {
  const { join } = require('path') as typeof import('path')
  return join(process.cwd(), 'public', 'data', filename)
}

export async function loadImageCache(): Promise<Record<string, string>> {
  if (await kvAvailable()) {
    const { kv } = await import('@vercel/kv')
    return (await kv.get<Record<string, string>>(IMAGE_CACHE_KEY)) ?? {}
  }
  try {
    const { readFile } = await import('fs/promises')
    const raw = await readFile(dataPath('image-cache.json'), 'utf-8')
    return JSON.parse(raw) as Record<string, string>
  } catch {
    return {}
  }
}

export async function saveImageCache(cache: Record<string, string>): Promise<void> {
  if (await kvAvailable()) {
    const { kv } = await import('@vercel/kv')
    await kv.set(IMAGE_CACHE_KEY, cache)
    return
  }
  const { writeFile } = await import('fs/promises')
  await writeFile(dataPath('image-cache.json'), JSON.stringify(cache, null, 2), 'utf-8')
}

export async function loadSyncResult(): Promise<SyncResult | null> {
  if (await kvAvailable()) {
    const { kv } = await import('@vercel/kv')
    return kv.get<SyncResult>(KV_KEY)
  }

  // Local dev fallback — read the JSON written by `npm run sync`
  try {
    const { readFile } = await import('fs/promises')
    const raw = await readFile(dataPath('products.json'), 'utf-8')
    return JSON.parse(raw) as SyncResult
  } catch {
    return null
  }
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
