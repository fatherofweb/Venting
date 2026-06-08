'use client'

import { useLanguage } from '@/lib/LanguageContext'
import type { CategoryStat } from '@/app/page'

interface Props {
  categoryStats: CategoryStat[]
}

const CATEGORY_STYLES = [
  {
    gradient: 'linear-gradient(145deg, #1a3a5c 0%, #0e2240 100%)',
    icon: (
      <svg viewBox="0 0 80 60" fill="none" aria-hidden="true" style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', width: 90, opacity: 0.18 }}>
        <rect x="4" y="20" width="72" height="32" rx="4" stroke="white" strokeWidth="3"/>
        <rect x="16" y="8" width="48" height="14" rx="3" stroke="white" strokeWidth="3"/>
        <line x1="20" y1="36" x2="60" y2="36" stroke="white" strokeWidth="2"/>
        <line x1="20" y1="42" x2="50" y2="42" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    gradient: 'linear-gradient(145deg, #1e3a2a 0%, #112218 100%)',
    icon: (
      <svg viewBox="0 0 80 70" fill="none" aria-hidden="true" style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', width: 90, opacity: 0.18 }}>
        <rect x="8" y="20" width="64" height="44" rx="4" stroke="white" strokeWidth="3"/>
        <rect x="22" y="6" width="36" height="16" rx="2" stroke="white" strokeWidth="2.5"/>
        <line x1="40" y1="20" x2="40" y2="64" stroke="white" strokeWidth="2"/>
        <rect x="18" y="32" width="16" height="12" rx="2" stroke="white" strokeWidth="2"/>
        <rect x="46" y="32" width="16" height="12" rx="2" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    gradient: 'linear-gradient(145deg, #1a3040 0%, #0e1e2a 100%)',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 90, opacity: 0.18 }}>
        <circle cx="40" cy="40" r="32" stroke="white" strokeWidth="3"/>
        <circle cx="40" cy="40" r="16" stroke="white" strokeWidth="2.5"/>
        <path d="M40 8 C40 8 28 24 28 40 C28 56 40 72 40 72" stroke="white" strokeWidth="2"/>
        <path d="M40 8 C40 8 52 24 52 40 C52 56 40 72 40 72" stroke="white" strokeWidth="2"/>
        <line x1="8" y1="40" x2="72" y2="40" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    gradient: 'linear-gradient(145deg, #3a1a1a 0%, #221010 100%)',
    icon: (
      <svg viewBox="0 0 80 70" fill="none" aria-hidden="true" style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', width: 90, opacity: 0.18 }}>
        <rect x="4" y="16" width="72" height="40" rx="6" stroke="white" strokeWidth="3"/>
        <circle cx="40" cy="36" r="14" stroke="white" strokeWidth="2.5"/>
        <circle cx="40" cy="36" r="6" stroke="white" strokeWidth="2"/>
        <line x1="40" y1="22" x2="40" y2="28" stroke="white" strokeWidth="2"/>
        <line x1="40" y1="44" x2="40" y2="50" stroke="white" strokeWidth="2"/>
        <line x1="26" y1="36" x2="32" y2="36" stroke="white" strokeWidth="2"/>
        <line x1="48" y1="36" x2="54" y2="36" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    gradient: 'linear-gradient(145deg, #2a2a2a 0%, #181818 100%)',
    icon: (
      <svg viewBox="0 0 80 70" fill="none" aria-hidden="true" style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', width: 90, opacity: 0.18 }}>
        <path d="M16 56 L16 30 L40 14 L64 30 L64 56 Z" stroke="white" strokeWidth="3"/>
        <rect x="30" y="38" width="20" height="18" rx="2" stroke="white" strokeWidth="2.5"/>
        <rect x="20" y="36" width="12" height="10" rx="2" stroke="white" strokeWidth="2"/>
        <rect x="48" y="36" width="12" height="10" rx="2" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
]

export default function WeRecommend({ categoryStats }: Props) {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-brand-section">
      <div className="max-w-site mx-auto px-10">
        <h2 className="font-sans text-[28px] font-black uppercase tracking-heading text-brand-text text-center mb-12">
          {t.weRecommend}
        </h2>

        {/* Row 1: 3 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 14 }}>
          {categoryStats.slice(0, 3).map((stat, i) => (
            <a
              key={stat.tab}
              href={`/shop?tab=${stat.tab}`}
              style={{ textDecoration: 'none', display: 'block', borderRadius: 10, overflow: 'hidden', height: 200, position: 'relative', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s', background: CATEGORY_STYLES[i].gradient }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(0,0,0,0.22)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
            >
              {CATEGORY_STYLES[i].icon}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 22px' }}>
                <span style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 6 }}>
                  {stat.count} {stat.count === 1 ? 'proizvod' : 'proizvoda'}
                </span>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#fff', lineHeight: 1.3 }}>
                  {t.nav[stat.tab]}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Row 2: 2 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {categoryStats.slice(3, 5).map((stat, i) => (
            <a
              key={stat.tab}
              href={`/shop?tab=${stat.tab}`}
              style={{ textDecoration: 'none', display: 'block', borderRadius: 10, overflow: 'hidden', height: 170, position: 'relative', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s', background: CATEGORY_STYLES[i + 3].gradient }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(0,0,0,0.22)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
            >
              {CATEGORY_STYLES[i + 3].icon}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 20px 20px' }}>
                <span style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 6 }}>
                  {stat.count} {stat.count === 1 ? 'proizvod' : 'proizvoda'}
                </span>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#fff', lineHeight: 1.3 }}>
                  {t.nav[stat.tab]}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
