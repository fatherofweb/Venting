export type Locale = 'sr' | 'en'

export type T = {
  nav: string[]
  heroCta: string
  heroSlides: { eyebrow: string; title: string[] }[]
  bestSeller: string
  weRecommend: string
  blog: string
  learnMore: string
  whereToBuy: string
  shop: {
    heading: string
    allProducts: string
    outOfStock: string
    noProducts: string
    energyClass: string
    inverter: string
  }
  specs: {
    resolution: string
    smartOs: string
    color: string
    netVolume: string
    cooling: string
    energyClass: string
    capacity: string
    power: string
  }
  categories: {
    tv: string
    fridge: string
    airFryer: string
  }
  recCards: {
    washerSub: string
    washerLabel: string
    beauty: string
    vacuum: string
    giftSub: string
    giftLabel: string
    warrantyTop: string
    warrantyMain: string
  }
  readLabel: string
  seeMore: string
  blogPosts: { title: string }[]
  footerAssortment: string
  footerAssortmentLinks: string[]
  footerAboutUs: string
  footerAboutUsLinks: string[]
  footerSupport: string
  footerSupportLinks: string[]
  copyright: string
  disclaimer: string
  backToTop: string
  newsletter: string
}

export const translations: Record<Locale, T> = {
  /* ─── Serbian ─────────────────────────────────────────── */
  sr: {
    nav: ['Kućna rešenja', 'Komercijalna rešenja', 'Flex Fit', 'Rekuperatori', 'Fancoili', 'Kondenz pumpe', 'Dodatna oprema'],
    heroCta: 'Pogledaj više',
    heroSlides: [
      { eyebrow: 'Pametna klima', title: ['Venting', 'Klima uređaji'] },
      { eyebrow: 'Više od hlađenja', title: ['Venting', 'Komercijalna', 'rešenja'] },
      { eyebrow: 'Jedan sistem, više funkcija', title: ['Venting', 'Flex Fit'] },
      { eyebrow: 'Čist vazduh', title: ['Venting', 'Rekuperatori'] },
      { eyebrow: 'Efikasno grejanje', title: ['Venting', 'Fancoili'] },
      { eyebrow: 'Odvod kondenzata', title: ['Venting', 'Kondenz pumpe'] },
      { eyebrow: 'Kompletna oprema', title: ['Venting', 'Dodatna oprema'] },
    ],
    bestSeller: 'Najprodavaniji',
    weRecommend: 'Preporučujemo',
    blog: 'Blog',
    learnMore: 'Saznaj više',
    whereToBuy: 'Gde kupiti',
    shop: {
      heading: 'Proizvodi',
      allProducts: 'Svi proizvodi',
      outOfStock: 'Rasprodato',
      noProducts: 'Nema proizvoda u ovoj kategoriji.',
      energyClass: 'Energetska klasa',
      inverter: 'Inverter',
    },
    specs: {
      resolution: 'Rezolucija',
      smartOs: 'Smart OS',
      color: 'Boja',
      netVolume: 'Neto zapremina (L)',
      cooling: 'Hlađenje',
      energyClass: 'Energetska klasa',
      capacity: 'Kapacitet',
      power: 'Snaga',
    },
    categories: { tv: 'Kućni klima uređaji', fridge: 'Komercijalni', airFryer: 'Rekuperatori' },
    recCards: {
      washerSub: 'Mašina za veš', washerLabel: 'WF91480TS',
      beauty: 'Lepota i nega', vacuum: 'Štapni usisivač',
      giftSub: 'Promocije', giftLabel: 'Venting ponuda',
      warrantyTop: 'Produžena', warrantyMain: 'Garancija',
    },
    readLabel: 'Čitaj',
    seeMore: 'Pogledaj više',
    blogPosts: [
      { title: 'Kako odabrati pravi klima uređaj za leto 2026.' },
      { title: 'Prednosti rekuperatora za vaš dom' },
      { title: 'Fancoili: efikasno grejanje i hladjenje' },
      { title: 'Šta je VRF sistem i kada ga koristiti?' },
    ],
    footerAssortment: 'Asortiman',
    footerAssortmentLinks: ['Kućni klima uređaji', 'Komercijalni klima uređaji', 'Flex Fit', 'Rekuperatori', 'Fancoili', 'Kondenz pumpe', 'Vazdušne zavese', 'Dodatna oprema'],
    footerAboutUs: 'O nama',
    footerAboutUsLinks: ['Naša priča', 'Blog', 'Politika privatnosti', 'Uslovi korišćenja', 'Politika kolačića'],
    footerSupport: 'Podrška',
    footerSupportLinks: ['Servis i podrška', 'Kontakt'],
    copyright: '© Venting 2026. Sva prava zadržana.',
    disclaimer: 'Slike uređaja su prikazane isključivo u ilustrativne svrhe i mogu se razlikovati od stvarnih uređaja. Pre korišćenja uređaja uvek pročitajte korisnički priručnik i bezbednosne informacije.',
    backToTop: 'Nazad na vrh',
    newsletter: 'Bilten',
  },

  /* ─── English ─────────────────────────────────────────── */
  en: {
    nav: ['Home Solutions', 'Commercial Solutions', 'Flex Fit', 'Recuperators', 'Fan Coils', 'Condensate Pumps', 'Additional Equipment'],
    heroCta: 'See more',
    heroSlides: [
      { eyebrow: 'Smart climate', title: ['Venting', 'Air Conditioning'] },
      { eyebrow: 'Beyond cooling', title: ['Venting', 'Commercial', 'Solutions'] },
      { eyebrow: 'One system, many functions', title: ['Venting', 'Flex Fit'] },
      { eyebrow: 'Clean air', title: ['Venting', 'Recuperators'] },
      { eyebrow: 'Efficient heating', title: ['Venting', 'Fan Coils'] },
      { eyebrow: 'Condensate removal', title: ['Venting', 'Condensate Pumps'] },
      { eyebrow: 'Complete equipment', title: ['Venting', 'Additional Equipment'] },
    ],
    bestSeller: 'Best Sellers',
    weRecommend: 'We Recommend',
    blog: 'Blog',
    learnMore: 'Learn more',
    whereToBuy: 'Where to buy',
    shop: {
      heading: 'Products',
      allProducts: 'All products',
      outOfStock: 'Out of stock',
      noProducts: 'No products in this category.',
      energyClass: 'Energy class',
      inverter: 'Inverter',
    },
    specs: {
      resolution: 'Resolution', smartOs: 'Smart OS', color: 'Color',
      netVolume: 'Net volume (L)', cooling: 'Cooling', energyClass: 'Energy class',
      capacity: 'Capacity', power: 'Power',
    },
    categories: { tv: 'Home AC', fridge: 'Commercial', airFryer: 'Recuperators' },
    recCards: {
      washerSub: 'Washing machine', washerLabel: 'WF91480TS',
      beauty: 'Beauty & Care', vacuum: 'Handstick Vacuum',
      giftSub: 'Promotions', giftLabel: 'Venting offers',
      warrantyTop: 'Extended', warrantyMain: 'Warranty',
    },
    readLabel: 'Read',
    seeMore: 'See more',
    blogPosts: [
      { title: 'How to choose the right air conditioner for summer 2026' },
      { title: 'The benefits of recuperators for your home' },
      { title: 'Fan coils: efficient heating and cooling' },
      { title: 'What is a VRF system and when to use it?' },
    ],
    footerAssortment: 'Assortment',
    footerAssortmentLinks: ['Home AC Units', 'Commercial AC', 'Flex Fit', 'Recuperators', 'Fan Coils', 'Condensate Pumps', 'Air Curtains', 'Additional Equipment'],
    footerAboutUs: 'About Us',
    footerAboutUsLinks: ['Our Story', 'Blog', 'Privacy Policy', 'Terms and Conditions', 'Cookie Policy'],
    footerSupport: 'Support',
    footerSupportLinks: ['Service & Support', 'Contact'],
    copyright: '© Venting 2026. All rights reserved.',
    disclaimer: 'Device images are provided for illustration purposes only and may differ from the final devices. Before using a device always read the user manual and safety information.',
    backToTop: 'Back to top',
    newsletter: 'Newsletter',
  },
}
