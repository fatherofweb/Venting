'use client'

import { useLanguage } from '@/lib/LanguageContext'
import type { Product } from '@/lib/sync'
import styles from './BestSeller.module.css'

interface Props {
  products: Product[]
}

function ArrowIcon() {
  return (
    <svg className={styles.actionIcon} viewBox="0 0 15 12" fill="none" aria-hidden="true">
      <path d="M9 1L14 6L9 11M14 6H1" stroke="#0b0b0d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ImagePlaceholder() {
  return (
    <svg viewBox="0 0 80 60" fill="none" aria-hidden="true" style={{ width: 80, opacity: 0.3 }}>
      <rect width="80" height="60" rx="6" fill="#e2e8ef"/>
      <path d="M16 44L28 28l10 12 12-16 14 20" stroke="#b0bec9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="22" r="5" fill="#b0bec9"/>
    </svg>
  )
}

// Pick up to 3 key specs to display on the card
function pickSpecs(product: Product): { label: string; value: string }[] {
  const specs: { label: string; value: string }[] = []

  if (product.energyClass) specs.push({ label: 'Energetska klasa', value: product.energyClass })
  if (product.inverter)    specs.push({ label: 'Inverter', value: product.inverter })

  // Fill remaining from API specs (prefer basic-flagged, short values)
  const seen = new Set(specs.map((s) => s.label.toLowerCase()))
  for (const s of product.specs) {
    if (specs.length >= 3) break
    const cleanName = s.name.replace(/:$/, '').trim()
    const displayVal = s.value + (s.unit ? ' ' + s.unit : '')
    const dlen = displayVal.length
    if (!seen.has(cleanName.toLowerCase()) && s.value && dlen <= 14) {
      specs.push({ label: cleanName, value: displayVal })
      seen.add(cleanName.toLowerCase())
    }
  }

  return specs.slice(0, 3)
}

export default function BestSeller({ products }: Props) {
  const { t } = useLanguage()

  if (products.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{t.bestSeller}</h2>

      <div className={styles.grid}>
        {products.map((product) => {
          const specs = pickSpecs(product)
          return (
            <a key={product.id} href={`/product/${product.id}`} className={styles.item} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className={styles.card}>
                <div className={styles.inner}>
                  <h3 className={styles.code}>{product.name}</h3>

                  <div className={styles.imageWrap}>
                    {product.image
                      ? <img src={product.image} alt={product.name} loading="lazy"/>
                      : <ImagePlaceholder />
                    }
                  </div>

                  <p className={styles.name}>{product.categoryName}</p>

                  {/* Spacer pushes specs to bottom regardless of whether they exist */}
                  <div style={{ flex: 1 }} />

                  <div className={styles.dotDivider} />
                  {specs.length > 0 ? (
                    <div
                      className={styles.details}
                      style={{ '--spec-cols': specs.length } as React.CSSProperties}
                    >
                      {specs.map((spec) => (
                        <div key={spec.label + '_l'} className={styles.detailLabel}>{spec.label}</div>
                      ))}
                      {specs.map((spec) => (
                        <div key={spec.label + '_v'} className={styles.detailValue}>{spec.value}</div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.details} style={{ '--spec-cols': 1, opacity: 0.35 } as React.CSSProperties}>
                      <div className={styles.detailLabel}>Specifikacije</div>
                      <div className={styles.detailValue}>-</div>
                    </div>
                  )}
                </div>

                <div className={styles.actionBar}>
                  <span className={styles.actionBtn}>
                    <ArrowIcon />
                    {t.learnMore}
                  </span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
