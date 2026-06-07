'use client'

import { useLanguage } from '@/lib/LanguageContext'

export default function WeRecommend() {
  const { t } = useLanguage()
  const rc = t.recCards

  return (
    <section className="py-20 bg-brand-section">
      <div className="max-w-site mx-auto px-10">
        <h2 className="font-sans text-[28px] font-black uppercase tracking-heading text-brand-text text-center mb-12">
          {t.weRecommend}
        </h2>

        <div className="grid grid-cols-3 gap-3.5" style={{ gridTemplateRows: '248px 248px' }}>

          {/* Washing Machine — col 1, spans 2 rows */}
          <div className="col-start-1 row-start-1 row-span-2 rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]">
            <div className="relative w-full h-full flex flex-col justify-end p-5"
              style={{ background: 'linear-gradient(160deg, #b8c4d0 0%, #8898a8 40%, #6a7a8a 100%)' }}>
              <svg viewBox="0 0 120 120" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-28 h-28" aria-hidden="true">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="8" />
                <circle cx="60" cy="60" r="36" fill="none" stroke="rgba(255,255,255,0.1)"  strokeWidth="5" />
              </svg>
              <div className="relative z-10">
                <span className="block font-sans text-[10px] font-medium uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {rc.washerSub}
                </span>
                <span className="block font-sans text-[13px] font-bold uppercase tracking-wide text-white">
                  {rc.washerLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Beauty & Care — col 2, row 1 */}
          <div className="col-start-2 row-start-1 rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]">
            <div className="relative w-full h-full flex flex-col justify-end p-5"
              style={{ background: 'linear-gradient(145deg, #c8a8a0 0%, #b08090 50%, #906070 100%)' }}>
              <div className="absolute top-7 left-1/2 -translate-x-1/2 flex gap-2.5 items-end" aria-hidden="true">
                {[{ w: 14, h: 60 }, { w: 20, h: 76 }, { w: 14, h: 56 }, { w: 18, h: 70 }].map((b, i) => (
                  <div key={i} className="rounded-[3px_3px_0_0]" style={{ width: b.w, height: b.h, background: 'rgba(255,255,255,0.2)' }} />
                ))}
              </div>
              <span className="relative z-10 block font-sans text-[13px] font-bold uppercase tracking-wide text-white">
                {rc.beauty}
              </span>
            </div>
          </div>

          {/* Tesla Giveaways — col 3, spans 2 rows */}
          <div className="col-start-3 row-start-1 row-span-2 rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]">
            <div className="relative w-full h-full flex flex-col justify-end p-5"
              style={{ background: 'linear-gradient(160deg, #162040 0%, #0e1830 50%, #0a1228 100%)' }}>
              <div className="absolute top-5 right-5 rounded-lg p-2.5 text-center border"
                style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)' }} aria-hidden="true">
                <span className="block font-sans text-[8px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {rc.warrantyTop}
                </span>
                <span className="block font-sans text-[11px] font-black uppercase tracking-wide text-white">
                  {rc.warrantyMain}
                </span>
              </div>
              <div className="relative z-10">
                <span className="block font-sans text-[10px] font-medium uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {rc.giftSub}
                </span>
                <span className="block font-sans text-[13px] font-bold uppercase tracking-wide text-white">
                  {rc.giftLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Handstick Vacuum — col 2, row 2 */}
          <div className="col-start-2 row-start-2 rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]">
            <div className="relative w-full h-full flex flex-col justify-end p-5"
              style={{ background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)' }}>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1 rounded" style={{ height: '68%', background: 'rgba(255,255,255,0.15)' }} aria-hidden="true" />
              <div className="absolute left-1/2 -translate-x-1/2 w-14 h-4 rounded-full" style={{ bottom: 60, background: 'rgba(255,255,255,0.12)' }} aria-hidden="true" />
              <span className="relative z-10 block font-sans text-[13px] font-bold uppercase tracking-wide text-white">
                {rc.vacuum}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
