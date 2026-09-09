'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import { categoryHref } from '@/lib/categories.mjs'
import { type Locale } from '@/lib/i18n'

/* ─── Search helpers ─────────────────────────────────────── */
type ProductHit = { id: string; name: string; categoryName: string; image: string | null }

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ|ð/g, 'd')
}

function highlight(text: string, query: string): string {
  if (!query) return text
  const q = normalize(query)
  const n = normalize(text)
  const idx = n.indexOf(q)
  if (idx === -1) return text
  return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + q.length) + '</mark>' + text.slice(idx + q.length)
}

/* ─── Constants ──────────────────────────────────────────── */
const LANGUAGES: { code: Locale; nativeName: string; flag: string }[] = [
  { code: 'sr', nativeName: 'SRB', flag: '🇷🇸' },
  { code: 'en', nativeName: 'EN',  flag: '🇬🇧' },
]

const SECONDARY_LINKS = [
  { label: 'Servis i podrška', href: '/servis' },
  { label: 'Blog',             href: '/blog'   },
  { label: 'Kontakt',          href: '/kontakt' },
]

/* ─── Language Switcher ──────────────────────────────────── */
function LanguageSwitcher({ locale, setLocale }: { locale: Locale; setLocale: (l: Locale) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc) }
  }, [open])

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="flex items-center gap-[5px] px-2 py-2 font-sans text-[13px] font-medium text-brand-text hover:opacity-60 transition-opacity select-none"
      >
        {/* Globe */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/>
          <ellipse cx="12" cy="12" rx="4.5" ry="9"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
        </svg>
        <span>{current.nativeName}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1l3 3 3-3"/>
        </svg>
      </button>

      <div className={`absolute top-[calc(100%+8px)] right-0 z-50 w-48 bg-white rounded-xl border border-[#e8e8e8] shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-1.5 origin-top-right transition-all duration-200 ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
        {LANGUAGES.map(lang => (
          <button key={lang.code} onClick={() => { setLocale(lang.code); setOpen(false) }}
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-left font-sans text-[13px] transition-colors ${lang.code === locale ? 'bg-[#f5f5f5] font-semibold' : 'text-[#333] hover:bg-[#f9f9f9]'}`}>
            <span className="text-[17px] leading-none">{lang.flag}</span>
            <span className="flex-1">{lang.nativeName}</span>
            {lang.code === locale && (
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6.5l3.5 3.5 5.5-6"/>
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Header ─────────────────────────────────────────────── */
export default function Header() {
  const { t, locale, setLocale } = useLanguage()
  const [searchOpen, setSearchOpen]   = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [query, setQuery]             = useState('')
  const [allProducts, setAllProducts] = useState<ProductHit[]>([])
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const searchInputRef                = useRef<HTMLInputElement>(null)
  const resultsRef                    = useRef<HTMLDivElement>(null)

  /* Fetch product list once on first search open */
  useEffect(() => {
    if (!searchOpen || allProducts.length > 0) return
    fetch('/data/products.json')
      .then(r => r.json())
      .then(d => setAllProducts(
        d.products
          .filter((p: ProductHit & { inStock: boolean }) => p.inStock)
          .map((p: ProductHit & { inStock: boolean }) => ({ id: p.id, name: p.name, categoryName: p.categoryName, image: p.image }))
      ))
  }, [searchOpen, allProducts.length])

  /* Live-filter results */
  const results = useMemo<ProductHit[]>(() => {
    const q = query.trim()
    if (q.length < 2) return []
    const nq = normalize(q)
    return allProducts
      .filter(p => normalize(p.name).includes(nq) || normalize(p.categoryName).includes(nq))
      .slice(0, 7)
  }, [query, allProducts])

  /* Reset selected when results change */
  useEffect(() => { setSelectedIdx(-1) }, [results])

  /* focus input when search opens */
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
    else { setQuery(''); setSelectedIdx(-1) }
  }, [searchOpen])

  /* Escape closes both panels */
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchOpen(false); setMenuOpen(false) }
    }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [])

  /* close search when menu opens and vice-versa */
  const openSearch = () => { setMenuOpen(false); setSearchOpen(v => !v) }
  const openMenu   = () => { setSearchOpen(false); setMenuOpen(v => !v) }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#e2e2e2]">
        <div className="w-full px-10">
          <div className="flex items-center h-[105px]">

            {/* Logo */}
            <a href="/" className="shrink-0" aria-label="Venting home">
              <Image src="/logo.png" alt="Venting" width={138} height={32} priority className="h-8 w-auto"/>
            </a>

            {/* Primary nav — desktop */}
            <nav className="hidden lg:flex flex-1 items-center justify-center" aria-label="Primary navigation">
              <ul className="flex items-center gap-9">
                {t.nav.map((item, i) => (
                  <li key={item}>
                    <a href={categoryHref(i)} className="font-sans text-[13px] font-bold uppercase tracking-nav text-brand-text whitespace-nowrap hover:opacity-60 transition-opacity">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right controls */}
            <div className="flex items-center ml-auto shrink-0" style={{ gap: '2px' }}>

              {/* Language */}
              <LanguageSwitcher locale={locale} setLocale={setLocale}/>

              {/* ── Search — bigger & bolder ── */}
              <button
                onClick={openSearch}
                aria-label="Search"
                aria-expanded={searchOpen}
                style={{ background: 'transparent', border: 'none', padding: '0 10px', cursor: 'pointer' }}
                className={`transition-opacity duration-200 ${searchOpen ? 'opacity-40' : 'hover:opacity-60'}`}
              >
                <span style={{ display: 'block', width: '26px', height: '34px', padding: 0, background: 'transparent' }}>
                  <svg
                    viewBox="0 0 18 17.99"
                    style={{ width: '26px', height: '26px', fill: 'rgb(12,12,13)', stroke: 'none' }}
                    aria-hidden="true"
                  >
                    {/* Ring: outer r=6.5, inner r=4.1 → 2.4-unit wall */}
                    <path
                      fillRule="evenodd"
                      d="M6.5 0a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"
                    />
                    {/* Handle */}
                    <path d="M9.89 11.31L11.31 9.89 17.99 16.79 16.79 17.99z"/>
                  </svg>
                </span>
              </button>

              {/* ── Burger — bigger & bolder ── */}
              <button
                onClick={openMenu}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  padding: 0,
                  margin: 0,
                  border: 0,
                  borderRadius: 0,
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  transition: 'all 0.2s ease',
                }}
                className={menuOpen ? 'opacity-40' : 'hover:opacity-60'}
              >
                {menuOpen ? (
                  <svg
                    viewBox="0 0 24.88 24.87"
                    style={{ width: '30px', height: '30px', fill: 'rgb(12,12,13)', stroke: 'none' }}
                    aria-hidden="true"
                  >
                    <path d="M2.1 0 0 2.1l10.34 10.34L0 22.77l2.1 2.1 10.34-10.34 10.34 10.34 2.1-2.1-10.34-10.33L24.88 2.1 22.78 0 12.44 10.33z"/>
                  </svg>
                ) : (
                  /* Bolder bars: 4-unit tall bars (was 2.5), evenly spaced */
                  <svg
                    viewBox="0 0 24.88 24.87"
                    style={{ width: '30px', height: '30px', fill: 'rgb(0,0,0)', stroke: 'none' }}
                    aria-hidden="true"
                  >
                    <path d="M0 4.3h24.88v2.5H0zm0 6.84h24.88v2.5H0zm0 6.84h24.88v2.5H0z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Search bar + live results ──────────────────────── */}
        <div className={`overflow-visible transition-all duration-300 ${searchOpen ? 'border-t border-[#e2e2e2]' : 'hidden'}`}>
          <div className="w-full px-10 py-4 relative">
            <div className="flex items-center gap-3 border-b-2 border-brand-text pb-1">
              <svg viewBox="0 0 18 17.99" style={{ width: '17px', height: '17px', fill: 'rgb(12,12,13)', stroke: 'none', flexShrink: 0, opacity: 0.4 }} aria-hidden="true">
                <path fillRule="evenodd" d="M6.5 0a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/>
                <path d="M9.89 11.31L11.31 9.89 17.99 16.79 16.79 17.99z"/>
              </svg>
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Pretraži proizvode…"
                className="flex-1 bg-transparent font-sans text-[16px] text-brand-text placeholder:text-[#bbb] outline-none"
                onKeyDown={e => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, results.length - 1)) }
                  else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, -1)) }
                  else if (e.key === 'Enter') {
                    const target = selectedIdx >= 0 ? results[selectedIdx] : results[0]
                    if (target) { window.location.href = `/product/${target.id}`; setSearchOpen(false) }
                  }
                }}
              />
              {query && (
                <button onClick={() => setQuery('')} className="shrink-0 opacity-40 hover:opacity-80 transition-opacity" aria-label="Clear">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                    <line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Results dropdown */}
            {results.length > 0 && (
              <div ref={resultsRef} className="absolute left-10 right-10 top-full z-50 bg-white border border-[#e2e2e2] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden mt-1">
                {results.map((p, i) => (
                  <a
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={() => setSearchOpen(false)}
                    className={`flex items-center gap-4 px-5 py-3 transition-colors ${i === selectedIdx ? 'bg-[#f3f4f6]' : 'hover:bg-[#f9fafb]'}`}
                  >
                    {/* Thumbnail */}
                    <div style={{ width: 44, height: 44, flexShrink: 0, background: '#f3f4f6', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {p.image
                        ? <Image src={p.image} alt="" width={44} height={44} style={{ objectFit: 'contain' }} />
                        : <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#d1d5db" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                      }
                    </div>
                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        className="font-sans text-[13px] font-600 text-brand-text truncate"
                        dangerouslySetInnerHTML={{ __html: highlight(p.name, query) }}
                        style={{ fontWeight: 600 }}
                      />
                      <p className="font-sans text-[11px] text-[#9ca3af] mt-0.5">{p.categoryName}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M3 8h10M9 4l4 4-4 4"/>
                    </svg>
                  </a>
                ))}
                {/* "See all" footer when many matches */}
                {allProducts.filter(p => normalize(p.name).includes(normalize(query)) || normalize(p.categoryName).includes(normalize(query))).length > 7 && (
                  <a href={`/shop`} onClick={() => setSearchOpen(false)} className="flex items-center justify-center gap-2 px-5 py-3 border-t border-[#f0f0f0] text-[12px] font-medium text-[#6b7280] hover:text-brand-text hover:bg-[#f9fafb] transition-colors">
                    Pogledaj sve rezultate
                  </a>
                )}
              </div>
            )}

            {/* No results */}
            {query.trim().length >= 2 && results.length === 0 && allProducts.length > 0 && (
              <div className="absolute left-10 right-10 top-full z-50 bg-white border border-[#e2e2e2] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] px-5 py-4 mt-1">
                <p className="font-sans text-[13px] text-[#9ca3af]">Nema rezultata za <strong className="text-brand-text">{query}</strong></p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Burger menu overlay ───────────────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-30 bg-black transition-opacity duration-300 ${menuOpen ? 'opacity-20 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Drawer — slides down from under the sticky header */}
      <div className={`fixed top-[106px] left-0 right-0 z-30 bg-white border-b border-[#e2e2e2] shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-all duration-300 origin-top ${menuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
        <div className="w-full px-10 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10">

            {/* Main nav items */}
            <div>
              <ul className="flex flex-col gap-1">
                {t.nav.map((item, i) => (
                  <li key={item}>
                    <a
                      href={categoryHref(i)}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between group py-3 border-b border-[#f0f0f0] last:border-0"
                    >
                      <span className="font-sans text-[15px] font-bold uppercase tracking-[1px] text-brand-text group-hover:opacity-60 transition-opacity">
                        {item}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 group-hover:opacity-60 transition-opacity" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4"/>
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Secondary links */}
              <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-6 border-t border-[#f0f0f0]">
                {SECONDARY_LINKS.map(link => (
                  <li key={link.label}>
                    <a href={link.href} onClick={() => setMenuOpen(false)}
                      className="font-sans text-[12px] font-medium uppercase tracking-[1px] text-brand-muted hover:text-brand-text transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Language picker (right column) */}
            <div className="lg:w-52">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-brand-muted mb-3">Language</p>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLocale(lang.code); setMenuOpen(false) }}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left font-sans text-[13px] transition-colors
                      ${lang.code === locale ? 'bg-[#f0f0f0] font-semibold text-brand-text' : 'text-[#444] hover:bg-[#f8f8f8]'}`}
                  >
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                    {lang.code === locale && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto">
                        <path d="M1.5 6l3 3 6-5.5"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
