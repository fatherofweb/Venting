import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ShopClient from './ShopClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Prodavnica',
  description:
    'Kompletna ponuda VENTING opreme: kućni i komercijalni klima uređaji, multi split sistemi, rekuperatori, fancoili i dodatna oprema.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Prodavnica | Venting',
    description:
      'Kompletna ponuda VENTING opreme: klima uređaji, rekuperatori, fancoili i dodatna oprema.',
    url: '/shop',
  },
}

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
