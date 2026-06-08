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
  const inStock = products.filter((p) => p.inStock && p.image)
  const picks: Product[] = []
  const usedIds = new Set<string>()

  // Try each main category; only pick products that have at least 1 visible spec on the card
  for (const codes of NAV_CATEGORY_MAP.slice(0, 4)) {
    const candidates = inStock
      .filter((p) => codes.includes(p.category) && visibleSpecCount(p) > 0)
      .sort((a, b) => visibleSpecCount(b) - visibleSpecCount(a))
    if (candidates.length > 0 && !usedIds.has(candidates[0].id)) {
      picks.push(candidates[0])
      usedIds.add(candidates[0].id)
    }
    if (picks.length === 3) break
  }

  // Fill remaining slots from any inStock+image product with visible specs
  if (picks.length < 3) {
    const withSpecs = inStock
      .filter((p) => !usedIds.has(p.id) && visibleSpecCount(p) > 0)
      .sort((a, b) => visibleSpecCount(b) - visibleSpecCount(a))
    for (const p of withSpecs) {
      picks.push(p)
      usedIds.add(p.id)
      if (picks.length === 3) break
    }
  }

  // Last resort: any inStock+image product
  if (picks.length < 3) {
    for (const p of inStock) {
      if (!usedIds.has(p.id)) { picks.push(p); usedIds.add(p.id) }
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
