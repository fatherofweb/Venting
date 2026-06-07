'use client'

import { useLanguage } from '@/lib/LanguageContext'
import type { Product } from '@/lib/sync'
import styles from './ProductDetail.module.css'

interface Props {
  product: Product
}

function ImagePlaceholder() {
  return (
    <div className={styles.imagePlaceholder}>
      <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="120" height="90" rx="8" fill="#edf1f5" />
        <path d="M30 64 L48 42 L62 56 L78 36 L94 64" stroke="#c8d4de" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="42" cy="34" r="7" fill="#c8d4de" />
      </svg>
    </div>
  )
}

export default function ProductDetail({ product }: Props) {
  const { t } = useLanguage()

  // Group specs by their group label (empty group → 'Opšte')
  const specGroups = product.specs.reduce<Record<string, typeof product.specs>>((acc, spec) => {
    const key = spec.group || 'Opšte'
    acc[key] = acc[key] ?? []
    acc[key].push(spec)
    return acc
  }, {})

  // Quick stats: up to 4 items, best available data first
  const quickStats: { label: string; value: string; attr?: string; unit?: string }[] = []
  const seenNames = new Set<string>()

  // Top-level fields first (only block the name if we actually used it)
  if (product.energyClass) {
    quickStats.push({ label: t.shop.energyClass, value: product.energyClass })
    seenNames.add('Energetski razred')
    seenNames.add('Energetska Klasa')
  }
  if (product.inverter) {
    quickStats.push({ label: t.shop.inverter, value: product.inverter })
    seenNames.add('Inverter')
  }

  // Pass 1: API-flagged basic specs
  for (const spec of product.specs) {
    if (quickStats.length >= 4) break
    if (spec.basic && !seenNames.has(spec.name.trim()) && spec.value) {
      quickStats.push({ label: spec.name.replace(/:$/, '').trim(), value: spec.value, attr: spec.attr || undefined, unit: spec.unit || undefined })
      seenNames.add(spec.name.trim())
    }
  }

  // Pass 2: any spec with a short displayable value (≤ 14 chars total)
  for (const spec of product.specs) {
    if (quickStats.length >= 4) break
    const cleanName = spec.name.replace(/:$/, '').trim()
    const displayLen = spec.value.length + (spec.unit ? spec.unit.length + 1 : 0)
    if (!seenNames.has(spec.name.trim()) && spec.value && displayLen <= 14) {
      quickStats.push({ label: cleanName, value: spec.value, attr: spec.attr || undefined, unit: spec.unit || undefined })
      seenNames.add(spec.name.trim())
    }
  }

  return (
    <div className={styles.page}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>

          {/* Left: text */}
          <div className={product.image ? styles.heroText : styles.heroTextFull}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <a href="/">Venting</a>
              <span aria-hidden="true">/</span>
              <a href={`/shop?tab=${categoryToTab(product.category)}`}>{product.categoryName}</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{product.name}</span>
            </nav>

            {/* Type eyebrow */}
            {product.type && <p className={styles.eyebrow}>{product.type}</p>}

            {/* Product name */}
            <h1 className={styles.title}>{product.name}</h1>

            {/* Model */}
            {product.model && (
              <p className={styles.model}>{product.model}</p>
            )}

            {/* Subcategory + barcode meta row */}
            <div className={styles.metaRow}>
              {product.subcategoryName && (
                <span className={styles.metaTag}>{product.subcategoryName}</span>
              )}
              {product.barcode && (
                <span className={styles.metaBarcode}>EAN {product.barcode}</span>
              )}
            </div>

            {/* Quick stats */}
            {quickStats.length > 0 && (
              <div className={styles.quickStats}>
                {quickStats.map((stat, i) => (
                  <div key={i} className={styles.statItem}>
                    <span className={styles.statValue}>
                      {stat.value}
                      {stat.unit && <span className={styles.statUnit}> {stat.unit}</span>}
                    </span>
                    {stat.attr && <span className={styles.statAttr}>{stat.attr}</span>}
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className={styles.ctas}>
              <a href="/shop" className={styles.ctaSecondary}>
                ← {t.shop.allProducts}
              </a>
            </div>
          </div>

          {/* Right: image — hidden entirely when no image exists */}
          {product.image && (
            <div className={styles.heroImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} />
            </div>
          )}

        </div>
      </section>

      {/* ── Technical specs ───────────────────────────────────── */}
      {Object.keys(specGroups).length > 0 && (
        <section className={styles.specs}>
          <div className={styles.specsInner}>
            <h2 className={styles.specsHeading}>Tehničke specifikacije</h2>

            {Object.entries(specGroups).map(([group, specs]) => (
              <div key={group} className={styles.specGroup}>
                {group !== 'Opšte' && (
                  <h3 className={styles.specGroupTitle}>{group.charAt(0).toUpperCase() + group.slice(1)}</h3>
                )}
                <table className={styles.specTable}>
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr key={i} className={styles.specRow}>
                        <td className={styles.specName}>
                          {spec.name.replace(/:$/, '')}
                          {spec.attr && <span className={styles.specAttrLabel}> ({spec.attr})</span>}
                        </td>
                        <td className={styles.specValue}>
                          {spec.value}
                          {spec.unit && <span className={styles.specUnit}> {spec.unit}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}

// Map SteelSoft category code back to the nav tab index
function categoryToTab(code: string): number {
  const map: Record<string, number> = {
    '01KLK': 0, '03MLT': 0,
    '02KKO': 1, '04VRF': 1, '08VNTZAV': 1,
    '08VNTREK': 2,
    '07KVVTGT': 3,
  }
  return map[code] ?? 4
}
