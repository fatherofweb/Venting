'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function FloatingButtons() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-7 right-7 flex flex-col gap-2.5 z-50" aria-label="Quick actions">
      <button className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.5px] text-brand-text bg-white border border-brand-border rounded-pill px-4 py-2.5 shadow-[0_2px_16px_rgba(0,0,0,0.12)] transition-all duration-200 hover:shadow-[0_6px_28px_rgba(0,0,0,0.18)] hover:-translate-y-px whitespace-nowrap">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path strokeLinecap="round" d="M3 8l9 6 9-6" />
        </svg>
        {t.newsletter}
      </button>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={t.backToTop}
        className={`flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.5px] text-brand-text bg-white border border-brand-border rounded-pill px-4 py-2.5 shadow-[0_2px_16px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.18)] hover:-translate-y-px whitespace-nowrap ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        {t.backToTop}
      </button>
    </div>
  )
}
