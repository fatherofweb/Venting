import { notFound } from 'next/navigation'
import { getProductById, getProducts } from '@/lib/products'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ProductDetail from './ProductDetail'

export const dynamic = 'force-dynamic'

interface Props {
  params: { id: string }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.id)
  if (!product) notFound()

  // „Slični proizvodi": rangiraj po srodnosti (ista podkategorija > ista kategorija),
  // pa po zalihi. Ne zahtevamo zalihu jer je katalog izlog i mnogi modeli su van
  // zaliha — tako sekcija uvek ima 3 relevantna artikla umesto da bude prazna.
  const allProducts = await getProducts()
  const rank = (p: (typeof allProducts)[number]) =>
    (p.subcategory && p.subcategory === product.subcategory ? 2 : 0) +
    (p.category === product.category ? 1 : 0)
  const related = allProducts
    .filter((p) => p.id !== product.id && p.image && rank(p) > 0)
    .sort((a, b) => rank(b) - rank(a) || Number(b.inStock) - Number(a.inStock))
    .slice(0, 3)

  return (
    <>
      <Header />
      <main>
        <ProductDetail product={product} related={related} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
