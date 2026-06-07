'use client'

import { useState, useMemo, useEffect } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import type { Product } from '@/lib/sync'
import styles from './Shop.module.css'

// Maps each header nav index (0–4) to SteelSoft category codes
const NAV_CATEGORY_MAP: string[][] = [
  ['01KLK', '03MLT'],                                                                                          // Kućna rešenja
  ['02KKO', '04VRF', '08VNTZAV'],                                                                               // Komercijalna rešenja
  ['08VNTREK'],                                                                                                  // Rekuperatori
  ['07KVVTGT'],                                                                                                  // Fancoili (konvektori)
  ['11OPRPOK', '08VNTDISEL', '17ALT', '12MATELE', '12MATKON', '11OPREEO', '15DEL', 'SRBZR', 'URDEL', 'POLUR'], // Dodatna oprema
]

function ArrowIcon() {
  return (
    <svg
      className={styles.actionIcon}
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 1L14 6L9 11M14 6H1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ImagePlaceholder() {
  return (
    <div className={styles.imagePlaceholder}>
      <svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="64" height="48" rx="6" fill="#e2e8ef" />
        <path
          d="M16 34 L26 22 L33 30 L42 18 L50 34"
          stroke="#b0bec9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="18" r="4" fill="#b0bec9" />
      </svg>
    </div>
  )
}

interface Props {
  products: Product[]
}

export default function ShopClient({ products }: Props) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(-1)

  // Read ?tab= from URL on mount so header nav links work
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    if (tab !== null) setActiveTab(parseInt(tab, 10))
  }, [])

  const inStockProducts = useMemo(() => products.filter((p) => p.inStock), [products])

  const tabCounts = useMemo(
    () => NAV_CATEGORY_MAP.map((codes) => inStockProducts.filter((p) => codes.includes(p.category)).length),
    [inStockProducts]
  )

  const filtered = useMemo(() => {
    const inStock = products.filter((p) => p.inStock)
    if (activeTab === -1) return inStock
    const codes = NAV_CATEGORY_MAP[activeTab]
    return inStock.filter((p) => codes.includes(p.category))
  }, [products, activeTab])

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>{t.shop.heading}</h1>

      {/* ── Category tabs — mirrors the header nav ─────────── */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === -1 ? styles.tabActive : ''}`}
          onClick={() => setActiveTab(-1)}
        >
          <span className={styles.tabName}>{t.shop.allProducts}</span>
          <span className={styles.tabCount}>{inStockProducts.length}</span>
        </button>

        {t.nav.map((label, i) => (
          <button
            key={i}
            className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(i)}
          >
            <span className={styles.tabName}>{label}</span>
            <span className={styles.tabCount}>{tabCounts[i]}</span>
          </button>
        ))}
      </div>

      {/* ── Product grid ──────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className={styles.empty}>{t.shop.noProducts}</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((product) => (
            <a key={product.id} href={`/product/${product.id}`} className={styles.item}>
              <div className={styles.card}>
                <div className={styles.inner}>
                  <h3 className={styles.code}>{product.name || product.id}</h3>

                  <div className={styles.imageWrap}>
                    {product.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.image} alt={product.name} loading="lazy" />
                    ) : (
                      <ImagePlaceholder />
                    )}
                  </div>

                  <p className={styles.categoryLabel}>{product.categoryName}</p>

                  {(product.energyClass || product.inverter) && (
                    <>
                      <div className={styles.dotDivider} />
                      <div className={styles.details}>
                        {product.energyClass && (
                          <div className={styles.detailCol}>
                            <div className={styles.detailLabel}>{t.shop.energyClass}</div>
                            <div className={styles.detailValue}>{product.energyClass}</div>
                          </div>
                        )}
                        {product.inverter && (
                          <div className={styles.detailCol}>
                            <div className={styles.detailLabel}>{t.shop.inverter}</div>
                            <div className={styles.detailValue}>{product.inverter}</div>
                          </div>
                        )}
                      </div>
                    </>
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
          ))}
        </div>
      )}
    </section>
  )
}
