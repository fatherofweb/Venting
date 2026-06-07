import { getProducts } from '@/lib/products'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ShopClient from './ShopClient'

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <>
      <Header />
      <main>
        <ShopClient products={products} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
