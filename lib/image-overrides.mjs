/**
 * Zvanične katalog-slike 2026 (klijent, jul 2026) — bez SteelSoft watermark-a.
 *
 * Fajlovi žive u public/images/products/ i imaju PRIORITET nad slikama koje
 * sync povuče sa steelsoft.rs. Koristi se i u lib/sync.ts (Vercel cron) i u
 * scripts/sync.mjs (lokalni `npm run sync`), pa je ovo jedino mesto za izmene.
 *
 * Pravila se primenjuju redom — prvo koje se poklopi pobeđuje — zato idu od
 * najspecifičnijeg ka najopštijem.
 *
 *   name — regex nad `${name} ${model}`, case-insensitive
 *   sub  — regex nad subcategoryName, case-insensitive (opciono)
 */

/**
 * @typedef {Object} ImageRule
 * @property {string}  image        putanja do lokalne slike
 * @property {string} [name]        regex nad `${name} ${model}`
 * @property {string} [sub]         regex nad subcategoryName
 * @property {boolean} [always]     uključi proizvod i kad SteelSoft flag kaže „nije za web"
 *                                  (za nove 2026 modele koje SteelSoft još nije aktivirao)
 */

/** @type {ImageRule[]} */
export const IMAGE_OVERRIDES = [
  // ── Spoljne jedinice split sistema ──────────────────────────────────────
  // MORA pre pravila za zidne jedinice: artikli tipa „GLORY PRO SJ" se poklapaju
  // i sa nazivom serije, a na njima treba da stoji spoljna, ne unutrašnja jedinica.
  { image: '/images/products/univerzalna-spoljna-jedinica-r32.jpg', sub: '^SPLIT SJ' },

  // ── Zidne split jedinice ────────────────────────────────────────────────
  { image: '/images/products/glory-pro.jpg', name: 'GLORY\\s+PRO' },
  { image: '/images/products/glory-plus.jpg', name: 'GLORY\\s+PLUS' },
  { image: '/images/products/t-pro-nordic-tp31.jpg', name: 'TP31' },
  { image: '/images/products/vac-r32-inverter-t-elite-xa41.jpg', name: 'XA41' },
  { image: '/images/products/inverter-xab1.jpg', name: 'XAB1' },
  // XA82 je crna serija — potvrđeno poređenjem sa starim slikama sa steelsoft.rs
  // (01KLK001306 XA82-I i 01KLK001556 XA82-I2 su oba crni uređaji).
  { image: '/images/products/vac-r32-inverter-crni.jpg', name: 'XA82' },
  { image: '/images/products/vsaf-multi-zidna-uj.jpg', name: 'VSAF', sub: 'ZIDNA UNUTRA' },
  { image: '/images/products/vsaf-inverter-r32-m-eko.jpg', name: 'VSAF', sub: '^SPLIT' },

  // ── Kasetne i konzolne jedinice ─────────────────────────────────────────
  // VCA4U je nova 2026 kaseta — sub filter drži panel „PANEL ZA VCA4U" podalje.
  { image: '/images/products/nova-kompaktna-kasetna-uj.jpg', name: 'VCA4U', sub: 'KASETNA', always: true },
  { image: '/images/products/vca3-multi-kasetna-uj.jpg', name: 'VCA3', sub: 'KASETNA UNUTRA.NJA MULTI' },
  { image: '/images/products/vca3u-vcd1-kasetni-split-r32.jpg', name: 'VCA3|VCD1', sub: 'KASETNA UNUTRA.NJA CAC' },
  { image: '/images/products/vfa2u-multi-konzolna-uj.jpg', name: 'VFA2U' },

  // ── Kanalske, parapetne i spoljne jedinice ──────────────────────────────
  // VOX30U / VTJ su nove 2026 serije (klijent poslao slike) — uključi ih i ako ih
  // SteelSoft još nije aktivirao za web.
  { image: '/images/products/nova-kompaktna-spoljna-jedinica.jpg', name: 'VOX\\d*30U', always: true },
  { image: '/images/products/multi-split-kanalska-uj.jpg', name: 'VTJ', sub: 'KANALSKA UNUTRA.NJA MULTI', always: true },
  { image: '/images/products/nova-kanalska-uj.jpg', name: 'VTJ', always: true },
  { image: '/images/products/vti-kanalski-split-r32.jpg', name: 'VTI', sub: 'KANALSKA UNUTRA.NJA CAC' },
  { image: '/images/products/vue-podno-plafonski-split.jpg', name: 'VUE', sub: 'PARAPETNO-PODPLAFONSKA' },
  { image: '/images/products/multi-split-spoljna-jedinica-r32.jpg', name: 'M8', sub: 'SPOLJNA JEDINICA MULTI' },

  // ── Prozorske ───────────────────────────────────────────────────────────
  { image: '/images/products/wfm-prozorski.jpg', name: 'WFM', sub: 'PROZORSKI' },

  // ── Fancoil-i (konvektori) ──────────────────────────────────────────────
  { image: '/images/products/h2km4-kasetni-fancoil.jpg', name: 'H2KM4', sub: 'KASETNI FANCOIL' },
  { image: '/images/products/h2wmu-parapetni-fancoil.jpg', name: 'H2WMU', sub: 'PARAPETNI' },
  // Starije HKM4 / HWMU serije — isti tip uređaja kao H2KM4 / H2WMU (kasetni,
  // odn. parapetni fancoil). Poređenjem sa starim slikama utvrđeno da izgledaju
  // isto; koristimo istu katalog-fotku da izbegnemo watermark. (sub filter drži
  // panele i nosače podalje — oni su u drugim podkategorijama.)
  { image: '/images/products/h2km4-kasetni-fancoil.jpg', name: 'HKM4', sub: 'KASETNI FANCOIL' },
  { image: '/images/products/h2wmu-parapetni-fancoil.jpg', name: 'HWMU', sub: 'PARAPETNI' },
  { image: '/images/products/hwa-kanalski-fancoil-visoki-pritisak.jpg', name: 'HWA-V-\\d+HC3L', sub: 'KANALSKI FANCOIL' },
  { image: '/images/products/hwa-kanalski-fancoil.jpg', name: 'HWA-V-', sub: 'KANALSKI FANCOIL' },

  // ── Rekuperatori, hidro kit, kontroleri ─────────────────────────────────
  { image: '/images/products/vhbqit-rekuperator.jpg', name: 'VHBQiT', sub: 'REKUPERATORI' },
  { image: '/images/products/vav-ttw5-w-sobni-rekuperator.jpg', name: 'VAV-TTW5' },
  { image: '/images/products/hidro-box.jpg', name: 'HIDRO KIT' },
  { image: '/images/products/kontroler-kjr-120n.jpg', name: 'KJR-120N', always: true },
]

/**
 * Slike iz kataloga koje NISU dodeljene nijednom artiklu — stoje u
 * public/images/products/ dok se ne razjasni kome pripadaju.
 */
export const UNASSIGNED_IMAGES = {
  'hidro-box-spoljna-jedinica.jpg':
    'Spoljna jedinica uz Hidro box — u bazi ne postoji poseban artikal za nju.',
  'kontroler-kjr-120l-f-e.jpg': 'KJR-120L F-E — nema odgovarajući artikal u bazi.',
  'kontroler-kjr-120x.jpg': 'KJR-120X — nema odgovarajući artikal u bazi.',
}

/**
 * Vraća prvo pravilo koje odgovara artiklu, ili null.
 * @param {{ name?: string, model?: string, subcategoryName?: string }} product
 * @returns {ImageRule | null}
 */
export function overrideRule(product) {
  const haystack = `${product.name ?? ''} ${product.model ?? ''}`
  const sub = product.subcategoryName ?? ''

  for (const rule of IMAGE_OVERRIDES) {
    if (rule.name && !new RegExp(rule.name, 'i').test(haystack)) continue
    if (rule.sub && !new RegExp(rule.sub, 'i').test(sub)) continue
    return rule
  }
  return null
}

/**
 * Vraća lokalnu katalog-sliku za artikal, ili null ako nijedno pravilo ne odgovara.
 * @param {{ name?: string, model?: string, subcategoryName?: string }} product
 * @returns {string | null}
 */
export function overrideImage(product) {
  return overrideRule(product)?.image ?? null
}
