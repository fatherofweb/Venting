import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/products'
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

  return (
    <>
      <Header />
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
