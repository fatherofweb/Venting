/**
 * Filteri prodavnice — po kategoriji najviše 3-4, birani prema tome šta je za
 * tu grupu proizvoda zaista bitno.
 *
 * Svaki filter ima `get(product)` koji vraća vrednost opcije (string) ili null
 * ako se ne odnosi na taj artikal. Opcije se izvode iz stvarnih podataka, pa se
 * nikad ne prikaže filter koji nema šta da ponudi.
 *
 * Napomena: fancoili, rekuperatori, kondenz pumpe i oprema nemaju specifikacije
 * u SteelSoft API-ju, pa se za njih vrednosti izvode iz oznake modela.
 */

// ── Pomoćne funkcije ─────────────────────────────────────────────────────────

const txt = (p) => `${p.model ?? ''} ${p.name ?? ''}`

/** Specifikacija po imenu (bez dvotačke, case-insensitive). */
function spec(p, re) {
  const s = (p.specs ?? []).find((x) => re.test((x.name ?? '').replace(/:$/, '').trim()))
  return s?.value?.trim() || null
}

/** Kapacitet u BTU iz oznake modela: VAC-09CHSD → 9.000 BTU */
function btu(p) {
  const m = txt(p).match(/-(\d{2})(?=[A-Z])/)
  if (!m) return null
  return `${parseInt(m[1], 10)}.000 BTU`
}

/** Tip unutrašnje/spoljne jedinice iz podkategorije. */
function unitType(p) {
  const s = (p.subcategoryName ?? '').toUpperCase()
  if (s.includes('ZIDNA')) return 'Zidna'
  if (s.includes('KASETNA')) return 'Kasetna'
  if (s.includes('KANALSKA')) return 'Kanalska'
  if (s.includes('KONZOLNA')) return 'Konzolna'
  if (s.includes('PARAPETNO') || s.includes('PODPLAFONSKA')) return 'Podno-plafonska'
  if (s.includes('SPOLJNA')) return 'Spoljna jedinica'
  if (s.includes('PROZORSK')) return 'Prozorska'
  if (s.includes('SPLIT')) return 'Split sistem'
  return null
}

/** Energetska klasa — polje iz API-ja, pa specifikacija kao rezerva. */
function energy(p) {
  const v = (p.energyClass || spec(p, /^energetski razred$/i) || '').trim().toUpperCase()
  return /^A\+*$/.test(v) ? v : null
}

function wifi(p) {
  const v = (spec(p, /^wi-?fi$/i) || '').trim().toUpperCase()
  if (!v) return null
  if (v.startsWith('DA')) return 'Da'
  if (v.startsWith('NE')) return 'Ne'
  return null
}

/** Tip fancoila iz oznake modela. */
function fanType(p) {
  const s = txt(p).toUpperCase()
  if (/HC3/.test(s)) return 'Kanalski — visoki pritisak'
  if (/H2KM4/.test(s) || /KASETNI/.test(s)) return 'Kasetni'
  if (/H2WMU/.test(s) || /PARAPETN/.test(s)) return 'Parapetni'
  if (/HWA/.test(s) || /KANALSKI/.test(s)) return 'Kanalski'
  return null
}

/** Protok rekuperatora iz oznake: VHBQiT-D050TFA → 500 m³/h */
function rekFlow(p) {
  const m = txt(p).match(/D0?(\d{2,3})T/i)
  if (m) return `${parseInt(m[1], 10) * 10} m³/h`
  return null
}

function rekType(p) {
  if (/TTW/i.test(txt(p))) return 'Sobni'
  if (/VHBQ/i.test(txt(p))) return 'Kanalski'
  return null
}

/** Protok kondenz pumpe iz oznake: PC-24A → 24 l/h */
function pumpFlow(p) {
  const m = txt(p).match(/PC-?(\d{2,3})/i)
  if (!m) return null
  const v = parseInt(m[1], 10)
  if (v <= 20) return 'do 20 l/h'
  if (v <= 50) return '20-50 l/h'
  return 'preko 50 l/h'
}

/** Vrsta dodatne opreme. */
function accessoryType(p) {
  const s = txt(p).toUpperCase()
  if (/TERMOSTAT|VBC/.test(s)) return 'Termostat'
  if (/WI-?FI|OSK|WF-/.test(s)) return 'Wi-Fi modul'
  if (/UPRAVLJA|KJR|RG10/.test(s)) return 'Daljinski upravljač'
  return null
}

const stock = (p) => (p.inStock ? 'Na stanju' : null)

// ── Definicije po kategoriji ─────────────────────────────────────────────────

const STOCK_FILTER = { key: 'stanje', label: 'Dostupnost', get: stock }

/** @type {Record<string, {key:string,label:string,get:(p:any)=>string|null,sort?:string}[]>} */
const BY_CATEGORY = {
  // Kućni klima uređaji
  '01KLK': [
    { key: 'kapacitet', label: 'Kapacitet', get: btu, sort: 'num' },
    { key: 'klasa', label: 'Energetska klasa', get: energy },
    { key: 'wifi', label: 'Wi-Fi', get: wifi },
    STOCK_FILTER,
  ],
  // Multi split
  '03MLT': [
    { key: 'tip', label: 'Tip jedinice', get: unitType },
    { key: 'kapacitet', label: 'Kapacitet', get: btu, sort: 'num' },
    STOCK_FILTER,
  ],
  // Komercijalni
  '02KKO': [
    { key: 'tip', label: 'Tip jedinice', get: unitType },
    { key: 'kapacitet', label: 'Kapacitet', get: btu, sort: 'num' },
    STOCK_FILTER,
  ],
  // Fancoili
  '07KVVTGT': [
    { key: 'tip', label: 'Tip fancoila', get: fanType },
    STOCK_FILTER,
  ],
  // Rekuperatori
  '08VNTREK': [
    { key: 'tip', label: 'Tip', get: rekType },
    { key: 'protok', label: 'Protok vazduha', get: rekFlow, sort: 'num' },
    STOCK_FILTER,
  ],
  // Pumpe za kondenz
  KONDENZ: [
    {
      key: 'protok',
      label: 'Protok',
      get: pumpFlow,
      order: ['do 20 l/h', '20-50 l/h', 'preko 50 l/h'],
    },
    STOCK_FILTER,
  ],
  // Dodatna oprema
  '11OPRPOK': [
    { key: 'vrsta', label: 'Vrsta', get: accessoryType },
    STOCK_FILTER,
  ],
}

/** Filteri za tab „Svi proizvodi". */
const ALL_FILTERS = [
  { key: 'tip', label: 'Tip jedinice', get: unitType },
  STOCK_FILTER,
]

/**
 * Vraća definicije filtera za dati tab, sa opcijama izvedenim iz proizvoda.
 * @param {string[]|null} codes  acClassif kodovi taba (null = svi proizvodi)
 * @param {any[]} products       proizvodi tog taba
 */
export function buildFilters(codes, products) {
  const defs = codes ? BY_CATEGORY[codes.find((c) => BY_CATEGORY[c])] ?? [] : ALL_FILTERS
  const num = (s) => {
    const m = String(s).match(/\d+/)
    return m ? parseInt(m[0], 10) : 0
  }

  return defs
    .map((d) => {
      const counts = new Map()
      for (const p of products) {
        const v = d.get(p)
        if (v) counts.set(v, (counts.get(v) ?? 0) + 1)
      }
      let options = [...counts.entries()].map(([value, count]) => ({ value, count }))
      if (d.order) {
        const rank = (v) => (d.order.indexOf(v) === -1 ? 999 : d.order.indexOf(v))
        options.sort((a, b) => rank(a.value) - rank(b.value))
      } else if (d.sort === 'num') options.sort((a, b) => num(a.value) - num(b.value))
      else options.sort((a, b) => a.value.localeCompare(b.value, 'sr'))
      return { key: d.key, label: d.label, get: d.get, options }
    })
    // filter bez opcija (ili sa samo jednom) ne nosi informaciju
    .filter((f) => f.options.length > 1 || (f.key === 'stanje' && f.options.length === 1))
}

/** Da li proizvod prolazi sve aktivne filtere. */
export function matchesFilters(product, filters, active) {
  for (const f of filters) {
    const sel = active[f.key]
    if (!sel || sel.length === 0) continue
    const v = f.get(product)
    if (!v || !sel.includes(v)) return false
  }
  return true
}
