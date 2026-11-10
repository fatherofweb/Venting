/**
 * Koji SteelSoft artikli ulaze na sajt.
 *
 * Sajt prikazuje ISKLJUČIVO aktuelnu VENTING ponudu 2026, a nju definiše
 * katalog slika koje je klijent poslao (lib/image-overrides.mjs). Artikal ulazi
 * ako je:
 *   1. Brand === VENTING,
 *   2. nije u ne-proizvod kategoriji (delovi, alat, materijal, polovno…),
 *   3. pokriven jednom od katalog-slika, i
 *   4. SteelSoft ga drži „za web" (acShowAtena === 'T') - ILI je to novi 2026
 *      model označen sa `always` u pravilu slike (SteelSoft ga još nije aktivirao).
 *
 * Koristi se i u lib/sync.ts (Vercel cron) i u scripts/sync.mjs (lokalni sync),
 * pa je ovo jedino mesto gde se pravilo menja.
 */

import { overrideRule } from './image-overrides.mjs'

export const BRAND_FILTER = 'VENTING'

/**
 * Prefiksi šifri klasifikacija koje NISU proizvodi za prikaz:
 * rezervni delovi, alat, elektro/kondenz materijal, sredstva za rad,
 * uređaji za delove i polovni uređaji.
 */
export const EXCLUDED_CLASSIF_PREFIXES = [
  '15DEL', // REZERVNI DELOVI
  '17ALT', // ALATI I PRIBOR U KLIMATIZACIJI
  '12MAT', // ELEKTRO MATERIJAL / KONDENZ CEVI (12MATELE, 12MATKON)
  'SRBZR', // SREDSTVA ZA RAD I BEZBEDAN RAD
  'URDEL', // UREĐAJI ZA DELOVE
  'POLUR', // POLOVNI UREĐAJI
]

/**
 * Neki artikli (npr. kontroleri KJR-120L i KJR-120X) imaju prazno polje Brand
 * u SteelSoft-u, a VENTING im stoji u nazivu - i njih računamo kao VENTING.
 */
function isVenting(raw) {
  const brand = (raw.Brand ?? '').trim()
  if (brand) return brand === BRAND_FILTER
  return new RegExp(`\\b${BRAND_FILTER}\\b`, 'i').test(raw.acName ?? '')
}

/**
 * Stare revizije modela koje je katalog 2026 zamenio - u bazi postoje oba zapisa,
 * a na sajtu sme da stoji samo onaj iz kataloga.
 *   VSAFBU-09/12HRDM8 → katalog 2026 navodi VSAFBU-09/12HRD1M8
 */
export const SUPERSEDED_MODELS = ['VSAFBU-(09|12)HRDM8']

/** Polja koja overrideRule() traži iz sirovog zapisa. */
function imageInput(raw) {
  return { name: raw.acName ?? '', model: raw.Model ?? '', subcategoryName: raw.acCLassif2Name ?? '' }
}

/**
 * Da li artikal ulazi na sajt (aktuelna 2026 ponuda).
 * @param {{ Brand?: string, acShowAtena?: string, acClassif?: string, acName?: string, Model?: string, acCLassif2Name?: string }} raw  sirov zapis iz /api/identi/
 * @returns {boolean}
 */
export function isCatalogProduct(raw) {
  if (!isVenting(raw)) return false

  const classif = (raw.acClassif ?? '').trim()
  if (EXCLUDED_CLASSIF_PREFIXES.some((prefix) => classif.startsWith(prefix))) return false

  const name = raw.acName ?? ''
  if (SUPERSEDED_MODELS.some((re) => new RegExp(re, 'i').test(name))) return false

  const rule = overrideRule(imageInput(raw))
  if (!rule) return false // nema katalog-sliku → nije 2026 ponuda

  const webFlagged = (raw.acShowAtena ?? '').trim() === 'T'
  return webFlagged || rule.always === true
}
