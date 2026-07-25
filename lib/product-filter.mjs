/**
 * Koji SteelSoft artikli ulaze na sajt.
 *
 * Sajt prikazuje ISKLJUČIVO aktuelnu VENTING ponudu 2026, a nju definiše
 * katalog slika koje je klijent poslao (lib/image-overrides.mjs). Artikal ulazi
 * ako je:
 *   1. Brand === VENTING,
 *   2. nije u ne-proizvod kategoriji (delovi, alat, materijal, polovno…),
 *   3. pokriven jednom od katalog-slika, i
 *   4. SteelSoft ga drži „za web" (acShowAtena === 'T') — ILI je to novi 2026
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
  if ((raw.Brand ?? '').trim() !== BRAND_FILTER) return false

  const classif = (raw.acClassif ?? '').trim()
  if (EXCLUDED_CLASSIF_PREFIXES.some((prefix) => classif.startsWith(prefix))) return false

  const rule = overrideRule(imageInput(raw))
  if (!rule) return false // nema katalog-sliku → nije 2026 ponuda

  const webFlagged = (raw.acShowAtena ?? '').trim() === 'T'
  return webFlagged || rule.always === true
}
