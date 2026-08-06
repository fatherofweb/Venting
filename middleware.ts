import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Keep the temporary *.vercel.app hosts out of Google. Only the real domain
 * (ventinghvac.com) should be indexed; requests served on a vercel.app hostname
 * get X-Robots-Tag: noindex so accidental submissions drop out of the index.
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const host = req.headers.get('host') ?? ''
  if (host.endsWith('.vercel.app')) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  return res
}

export const config = {
  // Run on pages, skip Next internals and static assets.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|ico|txt|xml)$).*)'],
}
