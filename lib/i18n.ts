export type Locale = 'sr' | 'en' | 'hr' | 'bs' | 'sl' | 'de' | 'fr' | 'it'

export type T = {
  nav: string[]
  heroCta: string
  heroSlides: { eyebrow: string; title: string[] }[]
  bestSeller: string
  weRecommend: string
  blog: string
  learnMore: string
  whereToBuy: string
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
    nav: ['Kućni', 'Klima uređaji komercijalni', 'Rekuperatori', 'Dodatna oprema', 'Akcija'],
    heroCta: 'Pogledaj više',
    heroSlides: [
      { eyebrow: 'Pronađi svoju veličinu', title: ['Tesla TV', 'Serija 6', 'QLED'] },
      { eyebrow: 'Zvanični partner', title: ['Tesla &', 'Panathinaikos', 'BC'] },
      { eyebrow: 'Predstavljamo', title: ['Tesla', 'Četkice za zube'] },
      { eyebrow: 'Više od hlađenja', title: ['Tesla', 'Frižideri'] },
      { eyebrow: 'Pametna klima', title: ['Tesla', 'Klima uređaji'] },
    ],
    bestSeller: 'Najprodavaniji',
    weRecommend: 'Preporučujemo',
    blog: 'Blog',
    learnMore: 'Saznaj više',
    whereToBuy: 'Gde kupiti',
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
    categories: { tv: 'TV Serija 6', fridge: 'Frižider sa franc. vratima', airFryer: 'Friteza na vrući vazduh' },
    recCards: {
      washerSub: 'Mašina za veš', washerLabel: 'WF91480TS',
      beauty: 'Lepota i nega', vacuum: 'Štapni usisivač',
      giftSub: 'Promocije', giftLabel: 'Tesla nagradne igre',
      warrantyTop: 'Produžena', warrantyMain: 'Garancija',
    },
    readLabel: 'Čitaj',
    seeMore: 'Pogledaj više',
    blogPosts: [
      { title: 'Kako odabrati pravi klima uređaj za leto 2026.' },
      { title: 'Najlepše frizure za maturu 2026.' },
      { title: 'Zašto side-by-side frižider nije za svakoga...' },
      { title: 'Da li je 65-inčni TV idealna veličina?' },
    ],
    footerAssortment: 'Asortiman',
    footerAssortmentLinks: ['TV-ovi', 'Kućni aparati', 'Klima uređaji', 'Monitori', 'Prečistači vazduha', 'Telefoni', 'Lepota i nega'],
    footerAboutUs: 'O nama',
    footerAboutUsLinks: ['Naša priča', 'Tesla nagradne igre', 'Preporuke iz prve ruke', 'Politika privatnosti', 'Uslovi korišćenja', 'Politika kolačića', 'Usklađenost'],
    footerSupport: 'Podrška',
    footerSupportLinks: ['Servis', 'Česta pitanja', 'Kontakt', 'Tesla Partnershub'],
    copyright: '© Comtrade Group 2026. Sva prava zadržana.',
    disclaimer: 'Slike uređaja su prikazane isključivo u ilustrativne svrhe i mogu se razlikovati od stvarnih uređaja. Pre korišćenja uređaja uvek pročitajte korisnički priručnik i bezbednosne informacije.',
    backToTop: 'Nazad na vrh',
    newsletter: 'Bilten',
  },

  /* ─── English ─────────────────────────────────────────── */
  en: {
    nav: ['Home', 'Commercial AC', 'Recuperators', 'Accessories', 'Sale'],
    heroCta: 'See more',
    heroSlides: [
      { eyebrow: 'Find your size', title: ['Tesla TV', 'Series 6', 'QLED'] },
      { eyebrow: 'Official Partner', title: ['Tesla &', 'Panathinaikos', 'BC'] },
      { eyebrow: 'Introducing', title: ['Tesla', 'Toothbrushes'] },
      { eyebrow: 'Beyond cooling', title: ['Tesla', 'Refrigerators'] },
      { eyebrow: 'Smart climate', title: ['Tesla Air', 'Conditioning'] },
    ],
    bestSeller: 'Best Seller',
    weRecommend: 'We Recommend',
    blog: 'Blog',
    learnMore: 'Learn more',
    whereToBuy: 'Where to buy',
    specs: {
      resolution: 'Resolution', smartOs: 'Smart OS', color: 'Color',
      netVolume: 'Net volume (L)', cooling: 'Cooling', energyClass: 'Energy class',
      capacity: 'Capacity', power: 'Power',
    },
    categories: { tv: 'TV Series 6', fridge: 'French-door refrigerator', airFryer: 'Air fryer' },
    recCards: {
      washerSub: 'Washing machine', washerLabel: 'WF91480TS',
      beauty: 'Beauty & Care', vacuum: 'Handstick Vacuum Cleaner',
      giftSub: 'Promotions', giftLabel: 'Tesla Giveaways',
      warrantyTop: 'Extended', warrantyMain: 'Warranty',
    },
    readLabel: 'Read',
    seeMore: 'See more',
    blogPosts: [
      { title: 'How to choose the right air conditioner for summer 2026' },
      { title: 'The most beautiful prom hairstyle ideas for 2026' },
      { title: 'Why a side-by-side fridge is not for everyone...' },
      { title: 'Is a 65-inch TV the ideal size?' },
    ],
    footerAssortment: 'Assortment',
    footerAssortmentLinks: ['TVs', 'Home Appliances', 'Air Conditioning', 'Monitors', 'Air purifiers', 'Phones', 'Beauty & Care'],
    footerAboutUs: 'About Us',
    footerAboutUsLinks: ['Our Story', 'Tesla Giveaways', 'First hand recommendations', 'Privacy Policy', 'Terms and Conditions', 'Cookie Policy', 'Compliance'],
    footerSupport: 'Support',
    footerSupportLinks: ['Service', 'FAQ', 'Contact', 'Tesla Partnershub'],
    copyright: '© Comtrade Group 2026. All rights reserved.',
    disclaimer: 'Device images are provided for illustration purposes only and may differ from the final devices. Before using a device always read the user manual and safety information.',
    backToTop: 'Back to top',
    newsletter: 'Newsletter',
  },

  /* ─── Croatian ────────────────────────────────────────── */
  hr: {
    nav: ['Kućni', 'Komercijalni klima uređaji', 'Rekuperatori', 'Dodatna oprema', 'Akcija'],
    heroCta: 'Pogledaj više',
    heroSlides: [
      { eyebrow: 'Pronađi svoju veličinu', title: ['Tesla TV', 'Serija 6', 'QLED'] },
      { eyebrow: 'Službeni partner', title: ['Tesla &', 'Panathinaikos', 'BC'] },
      { eyebrow: 'Predstavljamo', title: ['Tesla', 'Električne četkice'] },
      { eyebrow: 'Više od hlađenja', title: ['Tesla', 'Hladnjaci'] },
      { eyebrow: 'Pametna klima', title: ['Tesla', 'Klima uređaji'] },
    ],
    bestSeller: 'Najprodavanije',
    weRecommend: 'Preporučujemo',
    blog: 'Blog',
    learnMore: 'Saznaj više',
    whereToBuy: 'Gdje kupiti',
    specs: {
      resolution: 'Rezolucija', smartOs: 'Smart OS', color: 'Boja',
      netVolume: 'Neto volumen (L)', cooling: 'Hlađenje', energyClass: 'Energetski razred',
      capacity: 'Kapacitet', power: 'Snaga',
    },
    categories: { tv: 'TV Serija 6', fridge: 'Hladnjak s franc. vratima', airFryer: 'Airfryer' },
    recCards: {
      washerSub: 'Perilica rublja', washerLabel: 'WF91480TS',
      beauty: 'Ljepota i njega', vacuum: 'Štapni usisavač',
      giftSub: 'Promocije', giftLabel: 'Tesla nagradne igre',
      warrantyTop: 'Produžena', warrantyMain: 'Jamstvo',
    },
    readLabel: 'Čitaj',
    seeMore: 'Pogledaj više',
    blogPosts: [
      { title: 'Kako odabrati pravi klima uređaj za ljeto 2026.' },
      { title: 'Najljepše maturalne frizure za 2026.' },
      { title: 'Zašto side-by-side hladnjak nije za svakoga...' },
      { title: 'Je li 65-inčni TV idealna veličina?' },
    ],
    footerAssortment: 'Asortiman',
    footerAssortmentLinks: ['TV-ovi', 'Kućanski aparati', 'Klima uređaji', 'Monitori', 'Pročišćivači zraka', 'Mobiteli', 'Ljepota i njega'],
    footerAboutUs: 'O nama',
    footerAboutUsLinks: ['Naša priča', 'Tesla nagradne igre', 'Preporuke iz prve ruke', 'Politika privatnosti', 'Uvjeti korištenja', 'Politika kolačića', 'Usklađenost'],
    footerSupport: 'Podrška',
    footerSupportLinks: ['Servis', 'Česta pitanja', 'Kontakt', 'Tesla Partnershub'],
    copyright: '© Comtrade Group 2026. Sva prava pridržana.',
    disclaimer: 'Slike uređaja prikazane su isključivo u ilustrativne svrhe i mogu se razlikovati od stvarnih uređaja. Prije korištenja uređaja uvijek pročitajte korisnički priručnik i sigurnosne informacije.',
    backToTop: 'Natrag na vrh',
    newsletter: 'Bilten',
  },

  /* ─── Bosnian ─────────────────────────────────────────── */
  bs: {
    nav: ['Kućni', 'Komercijalni klima uređaji', 'Rekuperatori', 'Dodatna oprema', 'Akcija'],
    heroCta: 'Pogledaj više',
    heroSlides: [
      { eyebrow: 'Pronađi svoju veličinu', title: ['Tesla TV', 'Serija 6', 'QLED'] },
      { eyebrow: 'Zvanični partner', title: ['Tesla &', 'Panathinaikos', 'BC'] },
      { eyebrow: 'Predstavljamo', title: ['Tesla', 'Električne četkice'] },
      { eyebrow: 'Više od hlađenja', title: ['Tesla', 'Frižideri'] },
      { eyebrow: 'Pametna klima', title: ['Tesla', 'Klima uređaji'] },
    ],
    bestSeller: 'Najprodavaniji',
    weRecommend: 'Preporučujemo',
    blog: 'Blog',
    learnMore: 'Saznaj više',
    whereToBuy: 'Gdje kupiti',
    specs: {
      resolution: 'Rezolucija', smartOs: 'Smart OS', color: 'Boja',
      netVolume: 'Neto zapremina (L)', cooling: 'Hlađenje', energyClass: 'Energetska klasa',
      capacity: 'Kapacitet', power: 'Snaga',
    },
    categories: { tv: 'TV Serija 6', fridge: 'Frižider s franc. vratima', airFryer: 'Friteza na vrući zrak' },
    recCards: {
      washerSub: 'Mašina za rublje', washerLabel: 'WF91480TS',
      beauty: 'Ljepota i njega', vacuum: 'Štapni usisivač',
      giftSub: 'Promocije', giftLabel: 'Tesla nagradne igre',
      warrantyTop: 'Produžena', warrantyMain: 'Garancija',
    },
    readLabel: 'Čitaj',
    seeMore: 'Pogledaj više',
    blogPosts: [
      { title: 'Kako odabrati pravi klima uređaj za ljeto 2026.' },
      { title: 'Najljepše maturalne frizure za 2026.' },
      { title: 'Zašto side-by-side frižider nije za svakoga...' },
      { title: 'Da li je 65-inčni TV idealna veličina?' },
    ],
    footerAssortment: 'Asortiman',
    footerAssortmentLinks: ['TV-ovi', 'Kućanski aparati', 'Klima uređaji', 'Monitori', 'Prečistači zraka', 'Telefoni', 'Ljepota i njega'],
    footerAboutUs: 'O nama',
    footerAboutUsLinks: ['Naša priča', 'Tesla nagradne igre', 'Preporuke iz prve ruke', 'Politika privatnosti', 'Uslovi korišćenja', 'Politika kolačića', 'Usklađenost'],
    footerSupport: 'Podrška',
    footerSupportLinks: ['Servis', 'Česta pitanja', 'Kontakt', 'Tesla Partnershub'],
    copyright: '© Comtrade Group 2026. Sva prava zadržana.',
    disclaimer: 'Slike uređaja su prikazane isključivo u ilustrativne svrhe i mogu se razlikovati od stvarnih uređaja. Prije korišćenja uređaja uvijek pročitajte korisnički priručnik i sigurnosne informacije.',
    backToTop: 'Nazad na vrh',
    newsletter: 'Bilten',
  },

  /* ─── Slovenian ───────────────────────────────────────── */
  sl: {
    nav: ['Domači', 'Komercialne klimatske naprave', 'Rekuperatorji', 'Dodatna oprema', 'Akcija'],
    heroCta: 'Poglej več',
    heroSlides: [
      { eyebrow: 'Poišči svojo velikost', title: ['Tesla TV', 'Serija 6', 'QLED'] },
      { eyebrow: 'Uradni partner', title: ['Tesla &', 'Panathinaikos', 'BC'] },
      { eyebrow: 'Predstavljamo', title: ['Tesla', 'El. zobne ščetke'] },
      { eyebrow: 'Več kot hlajenje', title: ['Tesla', 'Hladilniki'] },
      { eyebrow: 'Pametna klima', title: ['Tesla', 'Klimatske naprave'] },
    ],
    bestSeller: 'Najboljši prodajalec',
    weRecommend: 'Priporočamo',
    blog: 'Blog',
    learnMore: 'Izvedi več',
    whereToBuy: 'Kje kupiti',
    specs: {
      resolution: 'Ločljivost', smartOs: 'Smart OS', color: 'Barva',
      netVolume: 'Neto prostornina (L)', cooling: 'Hlajenje', energyClass: 'Energetski razred',
      capacity: 'Kapaciteta', power: 'Moč',
    },
    categories: { tv: 'TV Serija 6', fridge: 'Hladilnik s franc. vrati', airFryer: 'Friteza z vr. zrakom' },
    recCards: {
      washerSub: 'Pralni stroj', washerLabel: 'WF91480TS',
      beauty: 'Lepota in nega', vacuum: 'Palični sesalnik',
      giftSub: 'Promocije', giftLabel: 'Tesla nagradne igre',
      warrantyTop: 'Razširjena', warrantyMain: 'Garancija',
    },
    readLabel: 'Beri',
    seeMore: 'Poglej več',
    blogPosts: [
      { title: 'Kako izbrati pravo klimatsko napravo za poletje 2026' },
      { title: 'Najlepše maturantske pričeske za 2026' },
      { title: 'Zakaj hladilnik side-by-side ni za vsakogar...' },
      { title: 'Je 65-palčni televizor idealna velikost?' },
    ],
    footerAssortment: 'Asortiment',
    footerAssortmentLinks: ['Televizorji', 'Gospodinjski aparati', 'Klimatske naprave', 'Monitorji', 'Čistilci zraka', 'Telefoni', 'Lepota in nega'],
    footerAboutUs: 'O nas',
    footerAboutUsLinks: ['Naša zgodba', 'Tesla nagradne igre', 'Priporočila iz prve roke', 'Politika zasebnosti', 'Splošni pogoji', 'Politika piškotkov', 'Skladnost'],
    footerSupport: 'Podpora',
    footerSupportLinks: ['Servis', 'Pogosta vprašanja', 'Kontakt', 'Tesla Partnershub'],
    copyright: '© Comtrade Group 2026. Vse pravice pridržane.',
    disclaimer: 'Slike naprav so prikazane samo za ilustrativne namene in se lahko razlikujejo od dejanskih naprav. Pred uporabo naprave vedno preberite navodila za uporabo in varnostne informacije.',
    backToTop: 'Nazaj na vrh',
    newsletter: 'Glasilo',
  },

  /* ─── German ──────────────────────────────────────────── */
  de: {
    nav: ['Zuhause', 'Gewerbliche Klimaanlagen', 'Rekuperatoren', 'Zubehör', 'Aktion'],
    heroCta: 'Mehr erfahren',
    heroSlides: [
      { eyebrow: 'Finde deine Größe', title: ['Tesla TV', 'Serie 6', 'QLED'] },
      { eyebrow: 'Offizieller Partner', title: ['Tesla &', 'Panathinaikos', 'BC'] },
      { eyebrow: 'Neu vorgestellt', title: ['Tesla', 'Zahnbürsten'] },
      { eyebrow: 'Mehr als Kühlen', title: ['Tesla', 'Kühlschränke'] },
      { eyebrow: 'Intelligentes Klima', title: ['Tesla', 'Klimaanlagen'] },
    ],
    bestSeller: 'Bestseller',
    weRecommend: 'Wir empfehlen',
    blog: 'Blog',
    learnMore: 'Mehr erfahren',
    whereToBuy: 'Wo kaufen',
    specs: {
      resolution: 'Auflösung', smartOs: 'Smart OS', color: 'Farbe',
      netVolume: 'Nettovolumen (L)', cooling: 'Kühltechnik', energyClass: 'Energieklasse',
      capacity: 'Kapazität', power: 'Leistung',
    },
    categories: { tv: 'TV Serie 6', fridge: 'French-Door-Kühlschrank', airFryer: 'Heißluftfritteuse' },
    recCards: {
      washerSub: 'Waschmaschine', washerLabel: 'WF91480TS',
      beauty: 'Beauty & Pflege', vacuum: 'Stabstaubsauger',
      giftSub: 'Aktionen', giftLabel: 'Tesla Gewinnspiele',
      warrantyTop: 'Verlängerte', warrantyMain: 'Garantie',
    },
    readLabel: 'Lesen',
    seeMore: 'Mehr anzeigen',
    blogPosts: [
      { title: 'Wie wählt man die richtige Klimaanlage für den Sommer 2026?' },
      { title: 'Die schönsten Abschlussfrisuren für 2026' },
      { title: 'Warum ein Side-by-Side-Kühlschrank nicht für jeden ist...' },
      { title: 'Ist ein 65-Zoll-TV die ideale Größe?' },
    ],
    footerAssortment: 'Sortiment',
    footerAssortmentLinks: ['Fernseher', 'Haushaltsgeräte', 'Klimaanlagen', 'Monitore', 'Luftreiniger', 'Telefone', 'Beauty & Pflege'],
    footerAboutUs: 'Über uns',
    footerAboutUsLinks: ['Unsere Geschichte', 'Tesla Gewinnspiele', 'Empfehlungen aus erster Hand', 'Datenschutz', 'AGB', 'Cookie-Richtlinie', 'Compliance'],
    footerSupport: 'Support',
    footerSupportLinks: ['Service', 'FAQ', 'Kontakt', 'Tesla Partnershub'],
    copyright: '© Comtrade Group 2026. Alle Rechte vorbehalten.',
    disclaimer: 'Gerätebilder dienen nur zur Illustration und können vom tatsächlichen Gerät abweichen. Lesen Sie vor der Verwendung stets die Bedienungsanleitung und Sicherheitshinweise.',
    backToTop: 'Nach oben',
    newsletter: 'Newsletter',
  },

  /* ─── French ──────────────────────────────────────────── */
  fr: {
    nav: ['Maison', 'Climatiseurs commerciaux', 'Récupérateurs', 'Accessoires', 'Promotion'],
    heroCta: 'En savoir plus',
    heroSlides: [
      { eyebrow: 'Trouvez votre taille', title: ['Tesla TV', 'Série 6', 'QLED'] },
      { eyebrow: 'Partenaire officiel', title: ['Tesla &', 'Panathinaikos', 'BC'] },
      { eyebrow: 'Nous présentons', title: ['Tesla', 'Brosses à dents'] },
      { eyebrow: 'Au-delà du froid', title: ['Tesla', 'Réfrigérateurs'] },
      { eyebrow: 'Climat intelligent', title: ['Tesla', 'Climatiseurs'] },
    ],
    bestSeller: 'Meilleures ventes',
    weRecommend: 'Nous recommandons',
    blog: 'Blog',
    learnMore: 'En savoir plus',
    whereToBuy: 'Où acheter',
    specs: {
      resolution: 'Résolution', smartOs: 'Smart OS', color: 'Couleur',
      netVolume: 'Volume net (L)', cooling: 'Technologie froid', energyClass: 'Classe énergétique',
      capacity: 'Capacité', power: 'Puissance',
    },
    categories: { tv: 'TV Série 6', fridge: 'Réfrig. porte française', airFryer: 'Friteuse à air chaud' },
    recCards: {
      washerSub: 'Lave-linge', washerLabel: 'WF91480TS',
      beauty: 'Beauté & Soins', vacuum: 'Aspirateur balai',
      giftSub: 'Promotions', giftLabel: 'Concours Tesla',
      warrantyTop: 'Garantie', warrantyMain: 'Étendue',
    },
    readLabel: 'Lire',
    seeMore: 'Voir plus',
    blogPosts: [
      { title: 'Comment choisir le bon climatiseur pour l\'été 2026 ?' },
      { title: 'Les plus belles coiffures de bal pour 2026' },
      { title: 'Pourquoi un réfrigérateur side-by-side n\'est pas pour tous...' },
      { title: 'Un TV 65 pouces est-il la taille idéale ?' },
    ],
    footerAssortment: 'Assortiment',
    footerAssortmentLinks: ['Téléviseurs', 'Électroménager', 'Climatiseurs', 'Moniteurs', 'Purificateurs d\'air', 'Téléphones', 'Beauté & Soins'],
    footerAboutUs: 'À propos',
    footerAboutUsLinks: ['Notre histoire', 'Concours Tesla', 'Recommandations directes', 'Conf. vie privée', 'CGU', 'Politique cookies', 'Conformité'],
    footerSupport: 'Support',
    footerSupportLinks: ['Service', 'FAQ', 'Contact', 'Tesla Partnershub'],
    copyright: '© Comtrade Group 2026. Tous droits réservés.',
    disclaimer: 'Les images des appareils sont fournies à titre indicatif uniquement et peuvent différer des appareils finaux. Avant d\'utiliser un appareil, lisez toujours le manuel et les consignes de sécurité.',
    backToTop: 'Retour en haut',
    newsletter: 'Newsletter',
  },

  /* ─── Italian ─────────────────────────────────────────── */
  it: {
    nav: ['Casa', 'Climatizzatori commerciali', 'Recuperatori', 'Accessori', 'Offerta'],
    heroCta: 'Scopri di più',
    heroSlides: [
      { eyebrow: 'Trova la tua dimensione', title: ['Tesla TV', 'Serie 6', 'QLED'] },
      { eyebrow: 'Partner ufficiale', title: ['Tesla &', 'Panathinaikos', 'BC'] },
      { eyebrow: 'Presentando', title: ['Tesla', 'Spazzolini elettrici'] },
      { eyebrow: 'Oltre il raffreddamento', title: ['Tesla', 'Frigoriferi'] },
      { eyebrow: 'Clima intelligente', title: ['Tesla', 'Climatizzatori'] },
    ],
    bestSeller: 'Più venduti',
    weRecommend: 'Consigliamo',
    blog: 'Blog',
    learnMore: 'Scopri di più',
    whereToBuy: 'Dove acquistare',
    specs: {
      resolution: 'Risoluzione', smartOs: 'Smart OS', color: 'Colore',
      netVolume: 'Volume netto (L)', cooling: 'Tecnologia raffredd.', energyClass: 'Classe energetica',
      capacity: 'Capacità', power: 'Potenza',
    },
    categories: { tv: 'TV Serie 6', fridge: 'Frigo porta francese', airFryer: 'Friggitrice ad aria' },
    recCards: {
      washerSub: 'Lavatrice', washerLabel: 'WF91480TS',
      beauty: 'Bellezza e Cura', vacuum: 'Aspirapolvere a stelo',
      giftSub: 'Promozioni', giftLabel: 'Concorsi Tesla',
      warrantyTop: 'Garanzia', warrantyMain: 'Estesa',
    },
    readLabel: 'Leggi',
    seeMore: 'Vedi altri',
    blogPosts: [
      { title: 'Come scegliere il condizionatore giusto per l\'estate 2026' },
      { title: 'Le più belle acconciature per il ballo 2026' },
      { title: 'Perché un frigo side-by-side non è per tutti...' },
      { title: 'Un TV da 65 pollici è la dimensione ideale?' },
    ],
    footerAssortment: 'Assortimento',
    footerAssortmentLinks: ['TV', 'Elettrodomestici', 'Climatizzatori', 'Monitor', 'Purif. d\'aria', 'Telefoni', 'Bellezza e Cura'],
    footerAboutUs: 'Chi siamo',
    footerAboutUsLinks: ['La nostra storia', 'Concorsi Tesla', 'Raccomandazioni dirette', 'Privacy', 'Termini e condizioni', 'Cookie policy', 'Conformità'],
    footerSupport: 'Supporto',
    footerSupportLinks: ['Assistenza', 'FAQ', 'Contatti', 'Tesla Partnershub'],
    copyright: '© Comtrade Group 2026. Tutti i diritti riservati.',
    disclaimer: 'Le immagini dei dispositivi sono fornite solo a scopo illustrativo e possono differire dai dispositivi finali. Prima di utilizzare un dispositivo, leggere sempre il manuale e le informazioni di sicurezza.',
    backToTop: 'Torna in cima',
    newsletter: 'Newsletter',
  },
}
