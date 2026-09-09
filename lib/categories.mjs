/**
 * Kategorije sajta i redosled u navigaciji — jedini izvor istine.
 *
 * `codes` su SteelSoft klasifikacije (acClassif), plus dve virtuelne kategorije
 * koje dodeljuje pravilo u image-overrides.mjs (`category`):
 *   FLEXFIT  — multi sistem sa Hidro box-om (katalog 2026, s20-23)
 *   KONDENZ  — pumpe za kondenz (katalog 2026, s47-50)
 *
 * `href` postoji samo kad kategorija ima svoju stranicu umesto /shop taba.
 */

/**
 * @typedef {Object} SiteCategory
 * @property {string}   key
 * @property {string[]} codes   acClassif prefiksi ili virtuelni ključ
 * @property {string}   [href]  sopstvena stranica (npr. FlexFit prezentacija)
 */

/** @type {SiteCategory[]} */
export const CATEGORIES = [
  { key: 'KUCNI', codes: ['01KLK', '03MLT'] },
  { key: 'KOMERCIJALNI', codes: ['02KKO', '04VRF', '08VNTZAV'] },
  { key: 'FLEXFIT', codes: ['FLEXFIT'], href: '/flexfit' },
  { key: 'REKUPERATORI', codes: ['08VNTREK'] },
  { key: 'FANCOILI', codes: ['07KVVTGT'] },
  { key: 'KONDENZ', codes: ['KONDENZ'] },
  { key: 'OPREMA', codes: ['11OPRPOK', '08VNTDISEL', '11OPREEO'] },
]

/** Mapa tab-indeks → lista acClassif kodova (kompatibilno sa starim NAV_CATEGORY_MAP). */
export const NAV_CATEGORY_MAP = CATEGORIES.map((c) => c.codes)

/** Da li kategorija ima svoju stranicu (ne prikazuje se kao /shop tab). */
export function categoryHref(tab) {
  const c = CATEGORIES[tab]
  return c?.href ?? `/shop?tab=${tab}`
}

/** Tab indeksi koji se prikazuju kao tabovi u prodavnici (bez onih sa svojom stranicom). */
export const SHOP_TABS = CATEGORIES.map((c, i) => (c.href ? null : i)).filter((i) => i !== null)

/** Prikazni nazivi virtuelnih kategorija (one koje ne dolaze iz SteelSoft klasifikacije). */
export const VIRTUAL_CATEGORY_NAMES = {
  FLEXFIT: 'FLEX FIT',
  KONDENZ: 'PUMPE ZA KONDENZ',
}
