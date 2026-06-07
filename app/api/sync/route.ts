/**
 * POST /api/sync  — Vercel Cron endpoint
 *
 * Vercel calls this automatically every day at 14:00 UTC (16:00 Serbian time / CEST).
 * The request carries `Authorization: Bearer <CRON_SECRET>` set by Vercel.
 *
 * You can also trigger a manual sync by calling:
 *   curl -H "Authorization: Bearer $CRON_SECRET" https://your-domain.com/api/sync
 */

import { NextResponse } from 'next/server'
import { syncProducts } from '@/lib/sync'
import { saveSyncResult } from '@/lib/products'

// Allow up to 5 minutes — capped at 60 s on Hobby plan, 300 s on Pro
export const maxDuration = 300

export async function GET(req: Request) {
  // Validate the cron secret so random callers can't trigger syncs
  const authHeader = req.headers.get('authorization')
  const secret = process.env.CRON_SECRET

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const started = Date.now()

  try {
    const data = await syncProducts()
    await saveSyncResult(data)

    return NextResponse.json({
      ok: true,
      products: data.total,
      categories: data.categories.length,
      syncedAt: data.syncedAt,
      durationMs: Date.now() - started,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[sync route] Failed:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
