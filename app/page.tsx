import Header from '@/components/Header'
import HeroSlider from '@/components/HeroSlider'
import BestSeller from '@/components/BestSeller'
import WeRecommend from '@/components/WeRecommend'
import Disclaimer from '@/components/Disclaimer'
import Blog from '@/components/Blog'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import { getProducts } from '@/lib/products'
import type { Product } from '@/lib/sync'

export const dynamic = 'force-dynamic'

/**
 * Istaknuti proizvodi u sekciji „Najprodavaniji".
 *
 * Nemamo podatke o stvarnoj prodaji, pa su ovo ručno izabrani reprezentativni
 * modeli (po jedan iz kućnog, komercijalnog i multi programa, svi sa bogatim
 * specifikacijama za karticu). Da promeniš izbor — samo zameni šifre artikala
 * (acIdent). Redosled ovde = redosled na sajtu. Prikazuju se bez obzira na
 * zalihu (sajt je katalog/izlog, ne prodavnica sa korpom).
 */
const FEATURED_IDS = [
  '01KLK001900', // GLORY PRO VSGPAU-09HRFN8 — kućni split
  '02KKO000657', // VCD1-24HRFM8 — komercijalni kasetni
  '03MLT000836', // VCA3U-18HRFM8 — multi split kasetni
]

const NAV_CATEGORY_MAP: string[][] = [
  ['01KLK', '03MLT'],
  ['02KKO', '04VRF', '08VNTZAV'],
  ['08VNTREK'],
  ['07KVVTGT'],
  ['11OPRPOK', '08VNTDISEL', '17ALT', '12MATELE', '12MATKON', '11OPREEO', '15DEL', 'SRBZR', 'URDEL', 'POLUR'],
]

function visibleSpecCount(p: Product): number {
  let n = (p.energyClass ? 1 : 0) + (p.inverter ? 1 : 0)
  for (const s of p.specs) {
    const val = s.value + (s.unit ? ' ' + s.unit : '')
    if (s.value && val.length <= 14) n++
  }
  return n
}

function pickBestSellers(products: Product[]): Product[] {
  const byId = new Map(products.map((p) => [p.id, p]))
  const picks: Product[] = []
  const usedIds = new Set<string>()

  // 1) Hand-picked featured models, in order
  for (const id of FEATURED_IDS) {
    const p = byId.get(id)
    if (p?.image && !usedIds.has(p.id)) {
      picks.push(p)
      usedIds.add(p.id)
    }
  }

  // 2) Fallback — if a featured id is missing, fill with the richest-spec products
  //    (prefer in stock) so the row always has three cards.
  if (picks.length < 3) {
    const fallback = products
      .filter((p) => p.image && !usedIds.has(p.id) && visibleSpecCount(p) > 0)
      .sort(
        (a, b) =>
          Number(b.inStock) - Number(a.inStock) ||
          visibleSpecCount(b) - visibleSpecCount(a)
      )
    for (const p of fallback) {
      picks.push(p)
      usedIds.add(p.id)
      if (picks.length === 3) break
    }
  }

  return picks
}

export interface CategoryStat {
  tab: number
  count: number
  withImage: number
}

function computeCategoryStats(products: Product[]): CategoryStat[] {
  const inStock = products.filter((p) => p.inStock)
  return NAV_CATEGORY_MAP.map((codes, tab) => {
    const group = inStock.filter((p) => codes.includes(p.category))
    return { tab, count: group.length, withImage: group.filter((p) => p.image).length }
  })
}

export default async function Home() {
  const products = await getProducts()
  const bestSellers = pickBestSellers(products)
  const categoryStats = computeCategoryStats(products)

  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <BestSeller products={bestSellers} />
        <WeRecommend categoryStats={categoryStats} />
        <Disclaimer />
        <Blog />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
