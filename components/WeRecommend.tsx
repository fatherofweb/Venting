'use client'

import { useLanguage } from '@/lib/LanguageContext'
import type { CategoryStat } from '@/app/page'

interface Props {
  categoryStats: CategoryStat[]
}

const CATEGORY_STYLES: { gradient: string; text: string }[] = [
  { gradient: 'linear-gradient(160deg, #1a3a5c 0%, #0e2240 50%, #091830 100%)', text: 'rgba(255,255,255,0.65)' },
  { gradient: 'linear-gradient(145deg, #1e3a2a 0%, #112218 100%)',              text: 'rgba(255,255,255,0.65)' },
  { gradient: 'linear-gradient(145deg, #2a2a2a 0%, #181818 100%)',              text: 'rgba(255,255,255,0.65)' },
  { gradient: 'linear-gradient(160deg, #3a1a1a 0%, #221010 50%, #180a0a 100%)', text: 'rgba(255,255,255,0.65)' },
]

export default function WeRecommend({ categoryStats }: Props) {
  const { t } = useLanguage()

  // Use first 4 categories in the bento layout
  const cats = categoryStats.slice(0, 4)

  return (
    <section className="py-10 sm:py-20 bg-brand-section">
      <div className="max-w-site mx-auto px-4 sm:px-10">
        <h2 className="font-sans text-[22px] sm:text-[28px] font-black uppercase tracking-heading text-brand-text text-center mb-7 sm:mb-12">
          {t.weRecommend}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 wr-grid">

          {/* Col 1 — tall, spans 2 rows on desktop: Kućna rešenja */}
          <a
            href={`/shop?tab=${cats[0]?.tab ?? 0}`}
            className="sm:col-start-1 sm:row-start-1 sm:row-span-2 rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]"
            style={{ textDecoration: 'none', background: CATEGORY_STYLES[0].gradient, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            {/* AC unit illustration */}
            <svg viewBox="0 0 120 90" fill="none" aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', width: 140, opacity: 0.12 }}>
              <rect x="6" y="28" width="108" height="46" rx="6" stroke="white" strokeWidth="4"/>
              <rect x="22" y="10" width="76" height="20" rx="4" stroke="white" strokeWidth="3.5"/>
              <line x1="28" y1="52" x2="92" y2="52" stroke="white" strokeWidth="3"/>
              <line x1="28" y1="62" x2="76" y2="62" stroke="white" strokeWidth="3"/>
              <circle cx="96" cy="57" r="8" stroke="white" strokeWidth="3"/>
            </svg>
            <div className="relative z-10 p-5">
              <span className="block font-sans text-[10px] font-medium uppercase tracking-widest mb-1.5" style={{ color: CATEGORY_STYLES[0].text }}>
                {cats[0]?.count ?? 0} proizvoda
              </span>
              <span className="block font-sans text-[14px] font-bold uppercase tracking-wide text-white">
                {t.nav[cats[0]?.tab ?? 0]}
              </span>
            </div>
          </a>

          {/* Col 2, Row 1 on desktop: Komercijalna rešenja */}
          <a
            href={`/shop?tab=${cats[1]?.tab ?? 1}`}
            className="sm:col-start-2 sm:row-start-1 rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]"
            style={{ textDecoration: 'none', background: CATEGORY_STYLES[1].gradient, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            {/* Building illustration */}
            <svg viewBox="0 0 100 80" fill="none" aria-hidden="true" style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 100, opacity: 0.14 }}>
              <rect x="10" y="24" width="80" height="50" rx="4" stroke="white" strokeWidth="3.5"/>
              <rect x="28" y="6" width="44" height="20" rx="3" stroke="white" strokeWidth="3"/>
              <line x1="50" y1="24" x2="50" y2="74" stroke="white" strokeWidth="2.5"/>
              <rect x="18" y="38" width="20" height="14" rx="2" stroke="white" strokeWidth="2.5"/>
              <rect x="62" y="38" width="20" height="14" rx="2" stroke="white" strokeWidth="2.5"/>
            </svg>
            <div className="relative z-10 p-5">
              <span className="block font-sans text-[10px] font-medium uppercase tracking-widest mb-1.5" style={{ color: CATEGORY_STYLES[1].text }}>
                {cats[1]?.count ?? 0} proizvoda
              </span>
              <span className="block font-sans text-[13px] font-bold uppercase tracking-wide text-white">
                {t.nav[cats[1]?.tab ?? 1]}
              </span>
            </div>
          </a>

          {/* Col 3 — tall, spans 2 rows on desktop: Fancoili */}
          <a
            href={`/shop?tab=${cats[3]?.tab ?? 3}`}
            className="sm:col-start-3 sm:row-start-1 sm:row-span-2 rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]"
            style={{ textDecoration: 'none', background: CATEGORY_STYLES[3].gradient, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            {/* Fan coil / radiator illustration */}
            <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', width: 120, opacity: 0.12 }}>
              <rect x="8" y="20" width="84" height="52" rx="6" stroke="white" strokeWidth="4"/>
              <circle cx="50" cy="46" r="18" stroke="white" strokeWidth="3"/>
              <circle cx="50" cy="46" r="8" stroke="white" strokeWidth="2.5"/>
              <line x1="50" y1="28" x2="50" y2="36" stroke="white" strokeWidth="2.5"/>
              <line x1="50" y1="56" x2="50" y2="64" stroke="white" strokeWidth="2.5"/>
              <line x1="32" y1="46" x2="40" y2="46" stroke="white" strokeWidth="2.5"/>
              <line x1="60" y1="46" x2="68" y2="46" stroke="white" strokeWidth="2.5"/>
            </svg>
            <div className="relative z-10 p-5">
              <span className="block font-sans text-[10px] font-medium uppercase tracking-widest mb-1.5" style={{ color: CATEGORY_STYLES[3].text }}>
                {cats[3]?.count ?? 0} proizvoda
              </span>
              <span className="block font-sans text-[14px] font-bold uppercase tracking-wide text-white">
                {t.nav[cats[3]?.tab ?? 3]}
              </span>
            </div>
          </a>

          {/* Col 2, Row 2 on desktop: Rekuperatori */}
          <a
            href={`/shop?tab=${cats[2]?.tab ?? 2}`}
            className="sm:col-start-2 sm:row-start-2 rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]"
            style={{ textDecoration: 'none', background: CATEGORY_STYLES[2].gradient, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            {/* Air circulation illustration */}
            <svg viewBox="0 0 90 90" fill="none" aria-hidden="true" style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 90, opacity: 0.14 }}>
              <circle cx="45" cy="45" r="36" stroke="white" strokeWidth="3.5"/>
              <circle cx="45" cy="45" r="18" stroke="white" strokeWidth="3"/>
              <path d="M45 9 C45 9 33 27 33 45 C33 63 45 81 45 81" stroke="white" strokeWidth="2.5"/>
              <path d="M45 9 C45 9 57 27 57 45 C57 63 45 81 45 81" stroke="white" strokeWidth="2.5"/>
              <line x1="9" y1="45" x2="81" y2="45" stroke="white" strokeWidth="2.5"/>
            </svg>
            <div className="relative z-10 p-5">
              <span className="block font-sans text-[10px] font-medium uppercase tracking-widest mb-1.5" style={{ color: CATEGORY_STYLES[2].text }}>
                {cats[2]?.count ?? 0} proizvoda
              </span>
              <span className="block font-sans text-[13px] font-bold uppercase tracking-wide text-white">
                {t.nav[cats[2]?.tab ?? 2]}
              </span>
            </div>
          </a>

        </div>
      </div>
    </section>
  )
}
