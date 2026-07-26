import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductById, getProducts } from '@/lib/products'
import { SITE_URL } from '@/lib/site'
import type { Product } from '@/lib/sync'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ProductDetail from './ProductDetail'

// Pre-render every product at build time; refresh in the background hourly.
export const revalidate = 3600

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ id: p.id }))
}

/** Short, human description from the product name, category and a few key specs. */
function productDescription(p: Product): string {
  const specs = p.specs
    .filter((s) => s.value && (s.value + (s.unit ? ' ' + s.unit : '')).length <= 16)
    .slice(0, 4)
    .map((s) => `${s.name.replace(/:$/, '')} ${s.value}${s.unit ? ' ' + s.unit : ''}`)
  const base = `${p.name} — ${p.categoryName}.`
  const tail = specs.length ? ` ${specs.join(', ')}.` : ''
  return (base + tail).slice(0, 200)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById(params.id)
  if (!product) return { title: 'Proizvod nije pronađen' }

  const description = productDescription(product)
  const path = `/product/${product.id}`
  const images = product.image ? [{ url: product.image, alt: product.name }] : undefined

  return {
    title: product.name,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}${path}`,
      title: product.name,
      description,
      images,
    },
    twitter: { card: 'summary_large_image', title: product.name, description, images: product.image ? [product.image] : undefined },
  }
}

function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    ...(product.image ? { image: [`${SITE_URL}${product.image}`] } : {}),
    description: productDescription(product),
    sku: product.barcode || product.id,
    ...(product.model ? { mpn: product.model } : {}),
    brand: { '@type': 'Brand', name: 'VENTING' },
    category: product.categoryName,
    url: `${SITE_URL}/product/${product.id}`,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
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
      <ProductJsonLd product={product} />
      <Header />
      <main>
        <ProductDetail product={product} related={related} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
