'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { type T } from '@/lib/i18n'
import styles from './BestSeller.module.css'

const PRODUCTS: {
  code: string
  image: string
  getCategory: (t: T) => string
  specs: { getLabel: (t: T) => string; value: string }[]
}[] = [
  {
    code: 'Q65E655GUS',
    image: 'https://tesla.info/wp-content/uploads/2025/09/Q65E655GUS-350x245.png',
    getCategory: (t) => t.categories.tv,
    specs: [
      { getLabel: (t) => t.specs.resolution, value: 'UHD' },
      { getLabel: (t) => t.specs.smartOs,    value: 'GOOGLE TV' },
      { getLabel: (t) => t.specs.color,      value: 'Gray' },
    ],
  },
  {
    code: 'RF4200FSNSGE',
    image: 'https://tesla.info/wp-content/uploads/2025/11/RF4200FSNSGE_HP-350x878.png',
    getCategory: (t) => t.categories.fridge,
    specs: [
      { getLabel: (t) => t.specs.netVolume,   value: '436' },
      { getLabel: (t) => t.specs.cooling,     value: 'Total No Frost' },
      { getLabel: (t) => t.specs.energyClass, value: 'E' },
    ],
  },
  {
    code: 'AF900BSD',
    image: 'https://tesla.info/wp-content/uploads/2025/11/AF900BSD-HP-350x288.png',
    getCategory: (t) => t.categories.airFryer,
    specs: [
      { getLabel: (t) => t.specs.capacity, value: '4.5 + 4.5 L' },
      { getLabel: (t) => t.specs.color,    value: 'Black - Inox' },
      { getLabel: (t) => t.specs.power,    value: '2400W' },
    ],
  },
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
        stroke="#0b0b0d"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg
      className={styles.actionIcon}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 1.5H3.2L5 10H12L14 4.5H4"
        stroke="#0b0b0d"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="12.5" r="1.1" stroke="#0b0b0d" strokeWidth="1.3" />
      <circle cx="11" cy="12.5" r="1.1" stroke="#0b0b0d" strokeWidth="1.3" />
    </svg>
  )
}

export default function BestSeller() {
  const { t } = useLanguage()

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{t.bestSeller}</h2>

      <div className={styles.grid}>
        {PRODUCTS.map((product) => (
          <div key={product.code} className={styles.item}>
            <div className={styles.card}>

              <div className={styles.inner}>
                <h3 className={styles.code}>{product.code}</h3>

                <div className={styles.imageWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.getCategory(t)}
                    loading="lazy"
                  />
                </div>

                <p className={styles.name}>{product.getCategory(t)}</p>

                <div className={styles.dotDivider} />

                <div className={styles.details}>
                  {product.specs.map((spec) => (
                    <div key={spec.value} className={styles.detailCol}>
                      <div className={styles.detailLabel}>{spec.getLabel(t)}</div>
                      <div className={styles.detailValue}>{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.actionBar}>
                <a href="#" className={styles.actionBtn}>
                  <ArrowIcon />
                  {t.learnMore}
                </a>
                <a href="#" className={styles.actionBtn}>
                  <CartIcon />
                  {t.whereToBuy}
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
