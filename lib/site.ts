/**
 * Canonical site URL, used for metadata base, Open Graph, sitemap and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in the environment to the real domain when it's ready;
 * falls back to the current Vercel domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://venting-seven.vercel.app'
).replace(/\/+$/, '')

export const SITE_NAME = 'Venting'
export const SITE_DESCRIPTION =
  'Venting — ovlašćeni distributer opreme za klimatizaciju i ventilaciju. Kućni i komercijalni klima uređaji, rekuperatori, fancoili i dodatna oprema.'
