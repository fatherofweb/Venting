import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { getProducts } from '@/lib/products'

// Regenerate daily so new products enter the sitemap without a redeploy.
export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/shop`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/o-nama`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/servis`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/kontakt`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.4 },
    { url: `${SITE_URL}/privatnost`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/uslovi`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/kolacici`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const products = await getProducts()
  const productEntries: MetadataRoute.Sitemap = products.map((p) => {
    const d = p.lastUpdated ? new Date(p.lastUpdated) : now
    return {
      url: `${SITE_URL}/product/${p.id}`,
      lastModified: Number.isNaN(d.getTime()) ? now : d,
      changeFrequency: 'weekly',
      priority: 0.7,
    }
  })

  return [...staticEntries, ...productEntries]
}
