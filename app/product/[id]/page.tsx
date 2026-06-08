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

  const allProducts = await getProducts()
  const related = allProducts
    .filter((p) => p.inStock && p.category === product.category && p.id !== product.id)
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
