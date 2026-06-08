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

function pickBestSellers(products: Product[]): Product[] {
  const inStock = products.filter((p) => p.inStock && p.image)
  const picks: Product[] = []
  for (const codes of NAV_CATEGORY_MAP.slice(0, 3)) {
    const candidates = inStock
      .filter((p) => codes.includes(p.category))
      .sort((a, b) => b.specs.length - a.specs.length)
    if (candidates.length > 0) picks.push(candidates[0])
    if (picks.length === 3) break
  }
  if (picks.length < 3) {
    const usedIds = new Set(picks.map((p) => p.id))
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
