/**
 * Opisi i specifikacije preuzeti iz štampanog kataloga 2026.
 *
 * SteelSoft API za neke grupe (pumpe za kondenz, kontroleri, termostati) ne vraća
 * nijednu karakteristiku, pa bi stranica proizvoda ostala prazna. Ovde stoje
 * podaci iz kataloga koji se u sync-u dodaju kad ih API nema.
 *
 * `match` je regex nad `${name} ${model}`, case-insensitive - prvo pravilo pobeđuje.
 * `specs` su parovi [naziv, vrednost, jedinica?].
 */

const CE_TEKST =
  'Snaga 3 W, nizak nivo buke, veoma tih rad bez vibracija. Kompaktna konstrukcija koja se lako sklapa. CE sertifikat.'

/** @type {{match:string, description:string, specs:[string,string,string?][]}[]} */
export const CATALOG_INFO = [
  // Pumpe za kondenz (katalog s47-50)
  {
    match: 'PC-24A',
    description: `Pumpa za odvod kondenzata sa rezervoarom od 200 ml, za mini split uređaje snage do 8 kW. ${CE_TEKST}`,
    specs: [
      ['Protok', 'max. 24', 'L/h'], ['Maksimalna visina', '10', 'm'],
      ['Kapacitet rezervoara', '200', 'ml'], ['Za uređaje snage do', '8', 'kW'],
      ['Nivo buke na 1 m', '19', 'dB(A)'], ['Snaga', '3', 'W'],
      ['Napajanje', '100-230V / 50-60', 'Hz'], ['Radna temperatura', '0~50', '°C'],
    ],
  },
  {
    match: 'PC-40A',
    description: `Pumpa za odvod kondenzata sa rezervoarom od 200 ml, za mini split uređaje snage do 15 kW. ${CE_TEKST}`,
    specs: [
      ['Protok', 'max. 40', 'L/h'], ['Maksimalna visina', '10', 'm'],
      ['Kapacitet rezervoara', '200', 'ml'], ['Za uređaje snage do', '15', 'kW'],
      ['Nivo buke na 1 m', '21', 'dB(A)'], ['Snaga', '3', 'W'],
      ['Napajanje', '100-230V / 50-60', 'Hz'], ['Radna temperatura', '0~50', '°C'],
    ],
  },
  {
    match: 'PC-50A',
    description: `Pumpa za odvod kondenzata sa najvećom podiznom visinom u seriji - do 12 m, za uređaje do 15 kW. ${CE_TEKST}`,
    specs: [
      ['Protok', 'max. 50', 'L/h'], ['Maksimalna visina', '12', 'm'],
      ['Kapacitet rezervoara', '200', 'ml'], ['Za uređaje snage do', '15', 'kW'],
      ['Nivo buke na 1 m', '25', 'dB(A)'], ['Snaga', '3', 'W'],
      ['Napajanje', '100-230V / 50-60', 'Hz'], ['Radna temperatura', '0~50', '°C'],
    ],
  },
  {
    match: 'PC-12B',
    description: `Mini pumpa za odvod kondenzata sa rezervoarom od 35 ml, za uređaje do 8 kW. ${CE_TEKST}`,
    specs: [
      ['Protok', 'max. 18', 'L/h'], ['Maksimalna visina', '10', 'm'],
      ['Kapacitet rezervoara', '35', 'ml'], ['Za uređaje snage do', '8', 'kW'],
      ['Nivo buke na 1 m', '19', 'dB(A)'], ['Snaga', '3', 'W'],
      ['Napajanje', '100-230V / 50-60', 'Hz'], ['Radna temperatura', '0~50', '°C'],
    ],
  },
  {
    match: 'PC-36B',
    description: `Mini pumpa za odvod kondenzata sa rezervoarom od 35 ml, za uređaje do 15 kW. ${CE_TEKST}`,
    specs: [
      ['Protok', 'max. 36', 'L/h'], ['Maksimalna visina', '10', 'm'],
      ['Kapacitet rezervoara', '35', 'ml'], ['Za uređaje snage do', '15', 'kW'],
      ['Nivo buke na 1 m', '21', 'dB(A)'], ['Snaga', '3', 'W'],
      ['Napajanje', '100-230V / 50-60', 'Hz'], ['Radna temperatura', '0~50', '°C'],
    ],
  },
  {
    match: 'PC-12C',
    description:
      'Mini pumpa kompaktnog dizajna za mali prostor, sa većim rezervoarom od 55 ml i sigurnosnim prekidačem 3A-250V bez napona. Za uređaje do 8 kW.',
    specs: [
      ['Protok', 'max. 18', 'L/h'], ['Maksimalna visina', '10', 'm'],
      ['Kapacitet rezervoara', '55', 'ml'], ['Za uređaje snage do', '8', 'kW'],
      ['Nivo buke na 1 m', '19', 'dB(A)'], ['Snaga', '3', 'W'],
      ['Napajanje', '100-230V / 50-60', 'Hz'], ['Radna temperatura', '0~50', '°C'],
    ],
  },
  {
    match: 'PC-36C',
    description:
      'Mini pumpa kompaktnog dizajna za mali prostor, sa većim rezervoarom od 55 ml i sigurnosnim prekidačem 3A-250V bez napona. Za uređaje do 15 kW.',
    specs: [
      ['Protok', 'max. 36', 'L/h'], ['Maksimalna visina', '10', 'm'],
      ['Kapacitet rezervoara', '55', 'ml'], ['Za uređaje snage do', '15', 'kW'],
      ['Nivo buke na 1 m', '21', 'dB(A)'], ['Snaga', '3', 'W'],
      ['Napajanje', '100-230V / 50-60', 'Hz'], ['Radna temperatura', '0~50', '°C'],
    ],
  },
  {
    match: 'PC-80A',
    description:
      'Kompaktna i izdržljiva pumpa visine 100 mm, sa visokim protokom i tihim radom. Specijalni dizajn kontrolnog ventila, zatvoren gornji poklopac štiti od prašine i vlage, tri ulazna otvora na vrhu ili sa strane.',
    specs: [
      ['Protok', 'max. 80', 'L/h'], ['Maksimalna visina', '2', 'm'],
      ['Kapacitet rezervoara', '0,5', 'L'], ['Nivo buke na 1 m', '23', 'dB(A)'],
      ['Snaga', '5', 'W'], ['Napajanje', '100-230V / 50-60', 'Hz'],
      ['Radna temperatura', '0~50', '°C'],
    ],
  },
  {
    match: 'PC-125A',
    description:
      'Pumpa najvećeg kapaciteta u seriji - do 125 L/h, sa rezervoarom od 1,8 L. Namenjena većim sistemima i komercijalnim instalacijama.',
    specs: [
      ['Protok', 'max. 125', 'L/h'], ['Maksimalna visina', '4', 'm'],
      ['Kapacitet rezervoara', '1,8', 'L'], ['Nivo buke na 1 m', '48', 'dB(A)'],
      ['Snaga', '60', 'W'], ['Napajanje', '100-230V / 50-60Hz ili 115V / 60', 'Hz'],
      ['Radna temperatura', '0~50', '°C'],
    ],
  },
  {
    match: 'PC-10D',
    description:
      'Najmanja pumpa u seriji, sa rezervoarom od 35 ml i tihim radom od 19 dB(A). Za mini split uređaje snage do 8 kW.',
    specs: [
      ['Protok', 'max. 12', 'L/h'], ['Maksimalna visina', '7', 'm'],
      ['Kapacitet rezervoara', '35', 'ml'], ['Za uređaje snage do', '8', 'kW'],
      ['Nivo buke na 1 m', '19', 'dB(A)'], ['Napajanje', '100-230V / 50-60', 'Hz'],
      ['Radna temperatura', '0~50', '°C'],
    ],
  },

  // Termostati (katalog s51-52)
  // Redosled je bitan: 103S i 117W pre opštijih 103 i 101.
  {
    match: 'VBC ?103S',
    description:
      'Termostat za dvocevne i četvorocevne fancoil jedinice sa kontrolom podnog grejanja, montaža na zid. Modbus komunikacija, tajmer/program, dry kontakt za prozor ili vrata i hotelski držač kartica.',
    specs: [
      ['Za sisteme', '2-cevni i 4-cevni fancoil'], ['Kontrola podnog grejanja', 'Da'],
      ['Brzine ventilatora', '3'], ['Ventil', 'ON/OFF'],
      ['Tajmer / program', 'Da'], ['Komunikacija', 'Modbus'],
      ['Eksterni senzor', 'Vazdušni ili cevni'], ['Napajanje', '220VAC ±10% / 50-60', 'Hz'],
      ['Dimenzije', '86 x 86 x 12', 'mm'], ['Montaža', 'Na zid'],
    ],
  },
  {
    match: 'VBC ?103',
    description:
      'Termostat za dvocevne i četvorocevne fancoil jedinice sa kontrolom podnog grejanja, ugradnja u fancoil. Modbus komunikacija, tajmer/program, dry kontakt za prozor ili vrata i hotelski držač kartica.',
    specs: [
      ['Za sisteme', '2-cevni i 4-cevni fancoil'], ['Kontrola podnog grejanja', 'Da'],
      ['Brzine ventilatora', '3'], ['Ventil', 'ON/OFF'],
      ['Tajmer / program', 'Da'], ['Komunikacija', 'Modbus'],
      ['Eksterni senzor', 'Vazdušni ili cevni'], ['Napajanje', '220VAC ±10% / 50-60', 'Hz'],
      ['Dimenzije', '86 x 86 x 13', 'mm'], ['Montaža', 'U fancoil'],
    ],
  },
  {
    match: 'VBC ?102',
    description:
      'Termostat za dvocevne i četvorocevne fancoil jedinice sa Modbus komunikacijom, tajmerom/programom, dry kontaktom za prozor ili vrata i hotelskim držačem kartica.',
    specs: [
      ['Za sisteme', '2-cevni i 4-cevni fancoil'], ['Brzine ventilatora', '3'],
      ['Ventil', 'ON/OFF'], ['Tajmer / program', 'Da'],
      ['Komunikacija', 'Modbus'], ['Eksterni senzor', 'Vazdušni ili cevni'],
      ['Napajanje', '220VAC ±10% / 50-60', 'Hz'], ['Dimenzije', '86 x 86 x 13', 'mm'],
    ],
  },
  {
    match: 'VBC ?117W-2MS',
    description:
      'Termostat za dvocevne fancoil jedinice sa Wi-Fi kontrolom i dodatnim cevnim senzorom (oznaka S). Modbus komunikacija, tajmer/program, dry kontakt za prozor ili vrata i hotelski držač kartica.',
    specs: [
      ['Za sisteme', '2-cevni fancoil'], ['Wi-Fi kontrola', 'Da'],
      ['Cevni senzor', 'Uključen'], ['Brzine ventilatora', '3'],
      ['Ventil', 'ON/OFF'], ['Tajmer / program', 'Da'],
      ['Komunikacija', 'Modbus'], ['Napajanje', 'AC 85-230V ±10% / 50-60', 'Hz'],
      ['Dimenzije', '96 x 86 x 13', 'mm'], ['Montaža', 'Na zid'],
    ],
  },
  {
    match: 'VBC ?117W',
    description:
      'Termostat za dvocevne fancoil jedinice sa Wi-Fi kontrolom, Modbus komunikacijom, tajmerom/programom, dry kontaktom za prozor ili vrata i hotelskim držačem kartica.',
    specs: [
      ['Za sisteme', '2-cevni fancoil'], ['Wi-Fi kontrola', 'Da'],
      ['Brzine ventilatora', '3'], ['Ventil', 'ON/OFF'],
      ['Tajmer / program', 'Da'], ['Komunikacija', 'Modbus'],
      ['Eksterni senzor', 'Vazdušni ili cevni'], ['Napajanje', 'AC 85-230V ±10% / 50-60', 'Hz'],
      ['Dimenzije', '96 x 86 x 13', 'mm'], ['Montaža', 'Na zid'],
    ],
  },
  {
    match: 'VBC ?101',
    description:
      'Mehanički termostat za dvocevne fancoil jedinice, sa trobrzinskim ventilatorom i ON/OFF ventilom.',
    specs: [
      ['Tip', 'Mehanički'], ['Za sisteme', '2-cevni fancoil'],
      ['Brzine ventilatora', '3'], ['Ventil', 'ON/OFF'],
      ['Napajanje', 'AC 230V ±10% / 50-60', 'Hz'], ['Dimenzije', '85 x 130 x 40', 'mm'],
    ],
  },

  // Kontroleri (katalog s34)
  {
    match: 'KJR-120L',
    description:
      'Žičani daljinski upravljač sa AUTO funkcijom, režimima COOL/HEAT/FAN i DRY, FOLLOW ME funkcijom, podešavanjem pravca protoka vazduha i tajmerom za odloženo uključenje i isključenje. Kompatibilan sa svim unutrašnjim jedinicama CAC i Multi split sistema.',
    specs: [
      ['Tip', 'Žičani daljinski upravljač'], ['Displej', 'LCD'],
      ['Režimi rada', 'COOL / HEAT / FAN / DRY'], ['Auto funkcija', 'Da'],
      ['FOLLOW ME', 'Da'], ['Tajmer', 'Odloženo uklj./isklj.'],
      ['Kompatibilnost', 'CAC i Multi split unutrašnje jedinice'],
    ],
  },
  {
    match: 'KJR-120X',
    description:
      'Žičani daljinski upravljač sa LCD displejem, grupnom kontrolom i nedeljnim tajmerom. Podržava režime COOL/HEAT/FAN i DRY, FOLLOW ME funkciju i podešavanje pravca protoka vazduha.',
    specs: [
      ['Tip', 'Žičani daljinski upravljač'], ['Displej', 'LCD'],
      ['Režimi rada', 'COOL / HEAT / FAN / DRY'], ['Grupna kontrola', 'Da'],
      ['Nedeljni tajmer', 'Da'], ['FOLLOW ME', 'Da'],
      ['Kompatibilnost', 'VTI, VUE, VCA4U, VCD1, VFA2U'],
    ],
  },
  {
    match: 'KJR-120N',
    description:
      'Žičani daljinski upravljač sa LCD displejem, grupnom kontrolom i nedeljnim tajmerom. Podržava režime COOL/HEAT/FAN i DRY, FOLLOW ME funkciju, podešavanje pravca protoka vazduha i tajmer za odloženo uključenje i isključenje.',
    specs: [
      ['Tip', 'Žičani daljinski upravljač'], ['Displej', 'LCD'],
      ['Režimi rada', 'COOL / HEAT / FAN / DRY'], ['Grupna kontrola', 'Da'],
      ['Nedeljni tajmer', 'Da'], ['FOLLOW ME', 'Da'],
      ['Kompatibilnost', 'VTJ, VCA3U, VFA2U'],
    ],
  },
]

/** Podaci iz kataloga za artikal, ili null. */
export function catalogInfo(product) {
  const hay = `${product.name ?? ''} ${product.model ?? ''}`
  return CATALOG_INFO.find((e) => new RegExp(e.match, 'i').test(hay)) ?? null
}

/**
 * Pretvara [naziv, vrednost, jedinica?] u oblik koji koristi Product.specs.
 * Kao „basic" (red sa istaknutim podacima na vrhu stranice) uzimamo prve četiri
 * kratke vrednosti - duge rečenice tamo razvlače kolone.
 */
export function toSpecs(pairs) {
  const highlighted = new Set(
    pairs
      .map(([, value], i) => (String(value).length <= 16 ? i : -1))
      .filter((i) => i !== -1)
      .slice(0, 4),
  )
  return pairs.map(([name, value, unit], i) => ({
    name,
    value,
    attr: '',
    unit: unit ?? '',
    group: '',
    basic: highlighted.has(i),
    order: i,
  }))
}
