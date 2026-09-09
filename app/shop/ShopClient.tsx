'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import type { Product } from '@/lib/sync'
import { NAV_CATEGORY_MAP, CATEGORIES } from '@/lib/categories.mjs'
import { buildFilters, matchesFilters } from '@/lib/filters.mjs'

type FilterOption = { value: string; count: number }
type ShopFilter = {
  key: string
  label: string
  get: (p: Product) => string | null
  options: FilterOption[]
}
import styles from './Shop.module.css'

// Index = activeTab + 1 (0 = all, 1-5 = tabs 0-4)
// indeks = activeTab + 1 (tab -1 = svi proizvodi)
const HERO_BG_CLASSES = [
  'slide-bg-1', // svi
  'slide-bg-1', // kućna
  'slide-bg-2', // komercijalna
  'slide-bg-4', // flex fit
  'slide-bg-3', // rekuperatori
  'slide-bg-5', // fancoili
  'slide-bg-2', // kondenz pumpe
  'slide-bg-4', // dodatna oprema
]

/* ── SVG Visuals per category ─────────────────────────────── */

function AllVisual() {
  return (
    <svg viewBox="0 0 200 150" fill="none" aria-hidden="true" className={styles.heroSvg}>
      {([[18,18],[108,18],[18,88],[108,88]] as [number,number][]).map(([x,y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="72" height="58" rx="8" stroke="white" strokeWidth="2.5" opacity="0.16"/>
          <line x1={x+10} y1={y+18} x2={x+62} y2={y+18} stroke="white" strokeWidth="2" opacity="0.12"/>
          <line x1={x+10} y1={y+30} x2={x+52} y2={y+30} stroke="white" strokeWidth="1.5" opacity="0.09"/>
          <line x1={x+10} y1={y+42} x2={x+58} y2={y+42} stroke="white" strokeWidth="1.5" opacity="0.09"/>
        </g>
      ))}
    </svg>
  )
}

function HomeVisual() {
  return (
    <svg viewBox="0 0 200 140" fill="none" aria-hidden="true" className={styles.heroSvg}>
      {/* Indoor unit */}
      <rect x="10" y="36" width="180" height="50" rx="10" stroke="white" strokeWidth="3" opacity="0.18"/>
      <line x1="30" y1="53" x2="162" y2="53" stroke="white" strokeWidth="2.5" opacity="0.16"/>
      <line x1="30" y1="64" x2="148" y2="64" stroke="white" strokeWidth="2" opacity="0.12"/>
      <line x1="30" y1="75" x2="155" y2="75" stroke="white" strokeWidth="2" opacity="0.12"/>
      <circle cx="172" cy="59" r="5" fill="rgba(80,200,160,0.4)"/>
      {/* Outdoor unit */}
      <rect x="58" y="104" width="68" height="30" rx="6" stroke="white" strokeWidth="2.5" opacity="0.15"/>
      <circle cx="92" cy="119" r="11" stroke="white" strokeWidth="2" opacity="0.18"/>
      <circle cx="92" cy="119" r="4" stroke="white" strokeWidth="1.5" opacity="0.14"/>
      {/* Pipes */}
      <path d="M72 86 L72 104" stroke="white" strokeWidth="2" strokeDasharray="3 3" opacity="0.12"/>
      <path d="M112 86 L112 104" stroke="white" strokeWidth="2" strokeDasharray="3 3" opacity="0.12"/>
    </svg>
  )
}

function CommercialVisual() {
  return (
    <svg viewBox="0 0 200 160" fill="none" aria-hidden="true" className={styles.heroSvg}>
      {/* Cassette unit */}
      <rect x="38" y="28" width="124" height="104" rx="12" stroke="white" strokeWidth="3" opacity="0.18"/>
      {/* Center fan */}
      <circle cx="100" cy="80" r="24" stroke="white" strokeWidth="2.5" opacity="0.16"/>
      <circle cx="100" cy="80" r="9" stroke="white" strokeWidth="2" opacity="0.14"/>
      {/* 4 airflow grilles */}
      <line x1="100" y1="28" x2="100" y2="52" stroke="white" strokeWidth="3" opacity="0.16"/>
      <line x1="100" y1="108" x2="100" y2="132" stroke="white" strokeWidth="3" opacity="0.16"/>
      <line x1="38" y1="80" x2="62" y2="80" stroke="white" strokeWidth="3" opacity="0.16"/>
      <line x1="138" y1="80" x2="162" y2="80" stroke="white" strokeWidth="3" opacity="0.16"/>
      {/* Corner decorations */}
      <circle cx="55" cy="45" r="4" stroke="white" strokeWidth="1.5" opacity="0.12"/>
      <circle cx="145" cy="45" r="4" stroke="white" strokeWidth="1.5" opacity="0.12"/>
      <circle cx="55" cy="115" r="4" stroke="white" strokeWidth="1.5" opacity="0.12"/>
      <circle cx="145" cy="115" r="4" stroke="white" strokeWidth="1.5" opacity="0.12"/>
    </svg>
  )
}

function RecuperatorVisual() {
  return (
    <svg viewBox="0 0 220 140" fill="none" aria-hidden="true" className={styles.heroSvg}>
      {/* Main box */}
      <rect x="28" y="32" width="164" height="76" rx="10" stroke="white" strokeWidth="3" opacity="0.18"/>
      {/* Divider */}
      <line x1="110" y1="32" x2="110" y2="108" stroke="white" strokeWidth="2" opacity="0.14"/>
      {/* Left: fresh air in */}
      <path d="M8 55 L28 55" stroke="white" strokeWidth="2.5" opacity="0.2"/>
      <path d="M8 70" stroke="white" strokeWidth="2.5" opacity="0.2"/>
      <path d="M8 85 L28 85" stroke="white" strokeWidth="2.5" opacity="0.2"/>
      <polyline points="18,48 25,55 18,62" stroke="white" strokeWidth="2" opacity="0.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Right: stale air out */}
      <path d="M192 55 L212 55" stroke="white" strokeWidth="2.5" opacity="0.2"/>
      <path d="M192 85 L212 85" stroke="white" strokeWidth="2.5" opacity="0.2"/>
      <polyline points="202,48 195,55 202,62" stroke="white" strokeWidth="2" opacity="0.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Heat exchange fins left chamber */}
      {[0,1,2,3,4].map(i => (
        <line key={'l'+i} x1={48} y1={42+i*14} x2={90} y2={42+i*14} stroke="white" strokeWidth="1.5" opacity="0.11"/>
      ))}
      {/* Heat exchange fins right chamber */}
      {[0,1,2,3,4].map(i => (
        <line key={'r'+i} x1={130} y1={42+i*14} x2={172} y2={42+i*14} stroke="white" strokeWidth="1.5" opacity="0.11"/>
      ))}
    </svg>
  )
}

function FancoilVisual() {
  return (
    <svg viewBox="0 0 200 140" fill="none" aria-hidden="true" className={styles.heroSvg}>
      {/* Main body */}
      <rect x="12" y="28" width="176" height="84" rx="10" stroke="white" strokeWidth="3" opacity="0.18"/>
      {/* Fan */}
      <circle cx="54" cy="70" r="30" stroke="white" strokeWidth="2.5" opacity="0.16"/>
      <circle cx="54" cy="70" r="11" stroke="white" strokeWidth="2" opacity="0.14"/>
      <line x1="54" y1="40" x2="54" y2="59" stroke="white" strokeWidth="2" opacity="0.15"/>
      <line x1="54" y1="81" x2="54" y2="100" stroke="white" strokeWidth="2" opacity="0.15"/>
      <line x1="24" y1="70" x2="43" y2="70" stroke="white" strokeWidth="2" opacity="0.15"/>
      <line x1="65" y1="70" x2="84" y2="70" stroke="white" strokeWidth="2" opacity="0.15"/>
      {/* Coil fins */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i} x1={106+i*11} y1={36} x2={106+i*11} y2={104} stroke="white" strokeWidth="2" opacity="0.14"/>
      ))}
      <rect x="104" y="34" width="78" height="72" rx="4" stroke="white" strokeWidth="2" opacity="0.1"/>
    </svg>
  )
}

function AccessoriesVisual() {
  return (
    <svg viewBox="0 0 200 140" fill="none" aria-hidden="true" className={styles.heroSvg}>
      {/* Horizontal pipe */}
      <rect x="18" y="56" width="164" height="20" rx="10" stroke="white" strokeWidth="2.5" opacity="0.18"/>
      {/* Vertical pipe */}
      <rect x="90" y="18" width="20" height="104" rx="10" stroke="white" strokeWidth="2.5" opacity="0.18"/>
      {/* Valve at intersection */}
      <circle cx="100" cy="66" r="20" stroke="white" strokeWidth="3" opacity="0.2"/>
      <circle cx="100" cy="66" r="8" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="2" opacity="0.16"/>
      {/* Handle */}
      <rect x="82" y="60" width="36" height="12" rx="6" stroke="white" strokeWidth="2" opacity="0.16"/>
      {/* Small fittings */}
      <circle cx="35" cy="66" r="7" stroke="white" strokeWidth="2" opacity="0.13"/>
      <circle cx="165" cy="66" r="7" stroke="white" strokeWidth="2" opacity="0.13"/>
      <circle cx="100" cy="28" r="7" stroke="white" strokeWidth="2" opacity="0.13"/>
      <circle cx="100" cy="112" r="7" stroke="white" strokeWidth="2" opacity="0.13"/>
    </svg>
  )
}

const VISUALS = [
  AllVisual,           // svi
  HomeVisual,          // kućna
  CommercialVisual,    // komercijalna
  CommercialVisual,    // flex fit
  RecuperatorVisual,   // rekuperatori
  FancoilVisual,       // fancoili
  AccessoriesVisual,   // kondenz pumpe
  AccessoriesVisual,   // dodatna oprema
]

/* ── CategoryHero ─────────────────────────────────────────── */

interface HeroProps {
  activeTab: number
  t: ReturnType<typeof useLanguage>['t']
  locale: string
}

function CategoryHero({ activeTab, t, locale }: HeroProps) {
  const bgClass = HERO_BG_CLASSES[activeTab + 1] ?? 'slide-bg-1'
  const Visual = VISUALS[activeTab + 1] ?? AllVisual

  const eyebrow = activeTab >= 0 ? t.heroSlides[activeTab]?.eyebrow : (locale === 'sr' ? 'Svi proizvodi' : 'All products')
  const titleLines = activeTab >= 0 ? t.heroSlides[activeTab]?.title : (locale === 'sr' ? ['Kompletan', 'Asortiman'] : ['Full', 'Assortment'])

  return (
    <div className={`${bgClass} ${styles.hero}`}>
      <div className={styles.heroInner} key={activeTab}>
        <div className={styles.heroText}>
          <p className={styles.heroEyebrow}>{eyebrow}</p>
          <h1 className={styles.heroTitle}>
            {titleLines?.map((line, i) => <span key={i} className={styles.heroTitleLine}>{line}</span>)}
          </h1>
          <a href="#products" className={styles.heroCta}>{t.heroCta}</a>
        </div>
        <div className={styles.heroVisual}>
          <Visual />
        </div>
      </div>
    </div>
  )
}

/* ── Spec picker (mirrors BestSeller logic) ───────────────── */

function pickCardSpecs(product: Product): { label: string; value: string }[] {
  const specs: { label: string; value: string }[] = []
  if (product.energyClass) specs.push({ label: 'Energetska klasa', value: product.energyClass })
  if (product.inverter)    specs.push({ label: 'Inverter', value: product.inverter })
  const seen = new Set(specs.map((s) => s.label.toLowerCase()))
  for (const s of product.specs) {
    if (specs.length >= 3) break
    const cleanName = s.name.replace(/:$/, '').trim()
    const displayVal = s.value + (s.unit ? ' ' + s.unit : '')
    if (!seen.has(cleanName.toLowerCase()) && s.value && displayVal.length <= 14) {
      specs.push({ label: cleanName, value: displayVal })
      seen.add(cleanName.toLowerCase())
    }
  }
  return specs.slice(0, 3)
}

/* ── Icons ────────────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg className={styles.actionIcon} viewBox="0 0 15 12" fill="none" aria-hidden="true">
      <path d="M9 1L14 6L9 11M14 6H1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ImagePlaceholder() {
  return (
    <div className={styles.imagePlaceholder}>
      <svg viewBox="0 0 64 48" fill="none" aria-hidden="true">
        <rect width="64" height="48" rx="6" fill="#e2e8ef"/>
        <path d="M16 34 L26 22 L33 30 L42 18 L50 34" stroke="#b0bec9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="18" r="4" fill="#b0bec9"/>
      </svg>
    </div>
  )
}

/* ── Main ─────────────────────────────────────────────────── */

interface Props { products: Product[] }

const PAGE_SIZE = 24

export default function ShopClient({ products }: Props) {
  const { t, locale } = useLanguage()
  const [activeTab, setActiveTab] = useState(-1)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [filtersOpen, setFiltersOpen] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const productsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    if (tab !== null) setActiveTab(parseInt(tab, 10))
  }, [])

  // Scroll active tab pill into center on mobile
  useEffect(() => {
    const el = tabButtonRefs.current[activeTab + 1]
    const container = tabsRef.current
    if (!el || !container) return
    const targetScroll = el.offsetLeft - (container.offsetWidth - el.offsetWidth) / 2
    container.scrollTo({ left: targetScroll, behavior: 'smooth' })
  }, [activeTab])

  // Sajt je izlog kataloga 2026 — prikazuju se svi artikli, a zaliha je filter.
  const inStockProducts = products

  const tabCounts = useMemo(
    () => NAV_CATEGORY_MAP.map((codes) => products.filter((p) => codes.includes(p.category)).length),
    [products]
  )

  // Artikli aktivnog taba (pre filtera) — iz njih se izvode opcije filtera.
  const tabProducts = useMemo(
    () =>
      activeTab === -1
        ? products
        : products.filter((p) => NAV_CATEGORY_MAP[activeTab].includes(p.category)),
    [products, activeTab]
  )

  const filters: ShopFilter[] = useMemo(
    () => buildFilters(activeTab === -1 ? null : NAV_CATEGORY_MAP[activeTab], tabProducts),
    [activeTab, tabProducts]
  )

  const filtered = useMemo(() => {
    let list = tabProducts.filter((p) => matchesFilters(p, filters, activeFilters))
    const q = search.trim().toLowerCase()
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q))
    return list
  }, [tabProducts, filters, activeFilters, search])

  const activeCount = Object.values(activeFilters).reduce((n, v) => n + v.length, 0)

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function changeTab(tab: number) {
    setActiveTab(tab)
    setPage(1)
    setSearch('')
    setActiveFilters({})
  }

  function toggleFilter(key: string, value: string) {
    setActiveFilters((prev) => {
      const cur = prev[key] ?? []
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]
      const out = { ...prev }
      if (next.length) out[key] = next
      else delete out[key]
      return out
    })
    setPage(1)
  }

  function changePage(next: number) {
    setPage(next)
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <CategoryHero activeTab={activeTab} t={t} locale={locale} />

      <section className={styles.section} id="products" ref={productsRef}>
        {/* ── Category tabs ─────────────────────────────── */}
        <div className={styles.tabsOuter}>
          <div className={styles.tabs} ref={tabsRef}>
            <button
              ref={el => { tabButtonRefs.current[0] = el }}
              className={`${styles.tab} ${activeTab === -1 ? styles.tabActive : ''}`}
              onClick={() => changeTab(-1)}
            >
              <span className={styles.tabName}>{t.shop.allProducts}</span>
              <span className={styles.tabCount}>{inStockProducts.length}</span>
            </button>

            {t.nav.map((label, i) => (
              CATEGORIES[i]?.href ? null : (
              <button
                key={i}
                ref={el => { tabButtonRefs.current[i + 1] = el }}
                className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
                onClick={() => changeTab(i)}
              >
                <span className={styles.tabName}>{label}</span>
                <span className={styles.tabCount}>{tabCounts[i]}</span>
              </button>
              )
            ))}
          </div>
        </div>

        {/* ── Search filter ─────────────────────────────── */}
        <div className={styles.searchRow}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" stroke="#9ca3af" strokeWidth="1.6"/>
              <path d="M10.5 10.5L14 14" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Pretraži proizvode..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            />
            {search && (
              <button className={styles.searchClear} onClick={() => { setSearch(''); setPage(1) }} aria-label="Obriši pretragu">
                ×
              </button>
            )}
          </div>
          {search && (
            <p className={styles.searchCount}>
              {filtered.length} {filtered.length === 1 ? 'rezultat' : 'rezultata'}
            </p>
          )}
        </div>

        {/* ── Filteri ───────────────────────────────────── */}
        {filters.length > 0 && (
          <div className={styles.filterBar}>
            <button
              className={`${styles.filterToggle} ${filtersOpen ? styles.filterToggleOpen : ''}`}
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.filterIcon}>
                <path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              Filteri
              {activeCount > 0 && <span className={styles.filterBadge}>{activeCount}</span>}
              <span className={styles.filterChevron} aria-hidden="true">⌄</span>
            </button>

            {activeCount > 0 && (
              <button className={styles.filterReset} onClick={() => { setActiveFilters({}); setPage(1) }}>
                Poništi
              </button>
            )}

            <span className={styles.filterCount}>
              {filtered.length} {filtered.length === 1 ? 'proizvod' : 'proizvoda'}
            </span>
          </div>
        )}

        {filters.length > 0 && filtersOpen && (
          <div className={styles.filterPanel}>
            {filters.map((f) => (
              <div key={f.key} className={styles.filterGroup}>
                <span className={styles.filterLabel}>{f.label}</span>
                <div className={styles.filterChips}>
                  {f.options.map((o) => {
                    const on = (activeFilters[f.key] ?? []).includes(o.value)
                    return (
                      <button
                        key={o.value}
                        className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                        onClick={() => toggleFilter(f.key, o.value)}
                        aria-pressed={on}
                      >
                        {o.value}
                        <span className={styles.chipCount}>{o.count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Product grid ──────────────────────────────── */}
        {filtered.length === 0 ? (
          <p className={styles.empty}>{t.shop.noProducts}</p>
        ) : (
          <div className={styles.grid}>
            {paginated.map((product) => {
              const specs = pickCardSpecs(product)
              return (
                <a key={product.id} href={`/product/${product.id}`} className={styles.item}>
                  <div className={styles.card}>
                    <div className={styles.inner}>
                      <h3 className={styles.code}>{product.name || product.id}</h3>

                      <div className={styles.imageWrap}>
                        {product.image
                          ? <Image src={product.image} alt={product.name} fill sizes="(max-width:640px) 100vw, 33vw" style={{ objectFit: 'contain' }} />
                          : <ImagePlaceholder />
                        }
                      </div>

                      <p className={styles.categoryLabel}>{product.categoryName}</p>

                      <div style={{ flex: 1 }} />

                      <div className={styles.dotDivider} />
                      {specs.length > 0 ? (
                        <div
                          className={styles.specGrid}
                          style={{ '--spec-cols': specs.length } as React.CSSProperties}
                        >
                          {specs.map((spec) => (
                            <div key={spec.label + '_l'} className={styles.specLabel}>{spec.label}</div>
                          ))}
                          {specs.map((spec) => (
                            <div key={spec.label + '_v'} className={styles.specValue}>{spec.value}</div>
                          ))}
                        </div>
                      ) : (
                        <div className={styles.specGrid} style={{ '--spec-cols': 1, opacity: 0.3 } as React.CSSProperties}>
                          <div className={styles.specLabel}>Specifikacije</div>
                          <div className={styles.specValue}>-</div>
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
        )}

        {/* ── Pagination ────────────────────────────────── */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
              aria-label="Prethodna strana"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ''}`}
                onClick={() => changePage(n)}
                aria-current={n === page ? 'page' : undefined}
              >
                {n}
              </button>
            ))}

            <button
              className={styles.pageBtn}
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages}
              aria-label="Sledeća strana"
            >
              →
            </button>
          </div>
        )}
      </section>
    </>
  )
}
