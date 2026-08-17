/**
 * Canonical site URL, used for metadata base, Open Graph, sitemap and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in the environment to the real domain when it's ready;
 * falls back to the current Vercel domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ventinghvac.com'
).replace(/\/+$/, '')

export const SITE_NAME = 'Venting'
export const SITE_DESCRIPTION =
  'Venting — oprema za klimatizaciju i ventilaciju: kućni i komercijalni klima uređaji, multi-split sistemi, rekuperatori, fancoili, vazdušne zavese i dodatna oprema.'
