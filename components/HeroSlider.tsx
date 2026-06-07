'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

const SLIDE_CONFIGS = [
  { bgClass: 'slide-bg-1', visual: 'tv'      },
  { bgClass: 'slide-bg-2', visual: 'pana'    },
  { bgClass: 'slide-bg-3', visual: 'brushes' },
  { bgClass: 'slide-bg-4', visual: 'fridge'  },
  { bgClass: 'slide-bg-5', visual: 'ac'      },
] as const

const DELAY = 4800

/* ── Visual sub-components (static, no translations) ──── */
function TVVisual() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full overflow-hidden rounded-[5px_5px_3px_3px] border-2"
        style={{ background: '#080a0f', borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 0 60px rgba(80,120,240,0.12), 0 20px 60px rgba(0,0,0,0.6)' }}>
        <div className="relative w-full aspect-video overflow-hidden">
          <div className="absolute inset-0 tv-screen-gradient" />
          <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/5 to-transparent" />
        </div>
        <div className="h-2.5" style={{ background: '#0f1118' }} />
      </div>
      <div className="w-[22%] h-[18px]" style={{ background: '#141620' }} />
      <div className="w-[48%] h-[7px] rounded-b" style={{ background: '#141620' }} />
    </div>
  )
}

function PanaVisual() {
  return (
    <div className="flex items-center justify-center h-64 w-full">
      <div className="w-40 h-40 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'rgba(255,255,255,0.14)' }}>
        <div className="w-28 h-28 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'rgba(255,255,255,0.09)' }}>
          <span className="font-display text-5xl" style={{ color: 'rgba(255,255,255,0.22)' }}>P</span>
        </div>
      </div>
    </div>
  )
}

function BrushesVisual() {
  const brushes = [
    { headH: 38, handleH: 170, headColor: 'rgba(220,80,100,0.5)',  handleColor: 'rgba(220,80,100,0.3)',  w: 24 },
    { headH: 44, handleH: 190, headColor: 'rgba(80,160,220,0.6)',  handleColor: 'rgba(80,160,220,0.35)', w: 28 },
    { headH: 38, handleH: 170, headColor: 'rgba(80,210,160,0.5)',  handleColor: 'rgba(80,210,160,0.3)',  w: 24 },
  ]
  return (
    <div className="flex items-center justify-center gap-5 h-64 w-full">
      {brushes.map((b, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="rounded-[14px_14px_4px_4px]" style={{ width: b.w, height: b.headH, background: b.headColor }} />
          <div className="rounded-[0_0_10px_10px]"    style={{ width: b.w - 4, height: b.handleH, background: b.handleColor }} />
        </div>
      ))}
    </div>
  )
}

function FridgeVisual() {
  return (
    <div className="w-[55%] mx-auto flex flex-col gap-0.5 p-0.5 rounded-lg border-2"
      style={{ height: 300, background: 'linear-gradient(160deg, #1c2430 0%, #141a24 100%)', borderColor: '#232a38', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
      <div className="rounded-[6px_6px_2px_2px] relative" style={{ flex: '0.42', background: '#1a2030' }}>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1 h-14 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
      </div>
      <div className="rounded-[2px_2px_6px_6px] relative" style={{ flex: '0.58', background: '#1a2030' }}>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1 h-10 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
      </div>
    </div>
  )
}

function ACVisual() {
  return (
    <div className="w-[88%] mx-auto">
      <div className="rounded-xl border-2 p-5"
        style={{ background: 'linear-gradient(160deg, #1c2230 0%, #141820 100%)', borderColor: '#232838', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
        <div className="flex flex-col gap-2">
          {[100, 80, 100, 90].map((w, i) => (
            <div key={i} className="h-1 rounded" style={{ width: `${w}%`, background: 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(80,200,160,0.3)' }} />
          </div>
          <span className="font-sans text-2xl font-black tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>22°</span>
          <div className="w-8 h-2.5 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>
      </div>
      <div className="flex justify-center gap-16 mt-2">
        <div className="w-0.5 h-7 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
        <div className="w-0.5 h-7 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
      </div>
      <div className="w-[70%] mx-auto h-[5px] rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
    </div>
  )
}

const VISUALS: Record<string, React.ReactNode> = {
  tv:      <TVVisual />,
  pana:    <PanaVisual />,
  brushes: <BrushesVisual />,
  fridge:  <FridgeVisual />,
  ac:      <ACVisual />,
}

/* ── Main ─────────────────────────────────────────────────── */
export default function HeroSlider() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % SLIDE_CONFIGS.length) + SLIDE_CONFIGS.length) % SLIDE_CONFIGS.length)
  }, [])

  const startAuto = useCallback(() => {
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % SLIDE_CONFIGS.length), DELAY)
  }, [])

  const stopAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  useEffect(() => { startAuto(); return stopAuto }, [startAuto, stopAuto])

  const touchXRef = useRef(0)

  return (
    <section
      className="relative overflow-hidden bg-[#0a0c10]"
      style={{ height: '520px' }}
      aria-label="Featured products"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      onTouchStart={(e) => { touchXRef.current = e.changedTouches[0].clientX }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchXRef.current
        if (Math.abs(dx) > 48) { stopAuto(); goTo(dx < 0 ? current + 1 : current - 1); startAuto() }
      }}
    >
      <div className="slides-track" style={{ transform: `translateX(-${current * 100}%)` }} role="list">
        {SLIDE_CONFIGS.map((cfg, i) => {
          const slide = t.heroSlides[i]
          return (
            <div key={cfg.visual} className={`slide flex items-center ${cfg.bgClass}`} role="listitem">
              <div className="relative z-10 px-20 max-w-[52%]">
                <p className="font-sans text-[13px] font-medium uppercase tracking-[2.5px] mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {slide.eyebrow}
                </p>
                <h2 className="font-display text-[60px] font-bold leading-[1.08] mb-8 text-white tracking-wide">
                  {slide.title.map((line, j) => <span key={j} className="block">{line}</span>)}
                </h2>
                <a href="#" className="inline-flex items-center font-sans text-base font-medium rounded-pill px-7 py-2.5 border-2 border-white text-white bg-transparent transition-colors duration-200 hover:bg-white hover:text-brand-text">
                  {t.heroCta}
                </a>
              </div>
              <div className="absolute right-[72px] top-1/2 -translate-y-1/2 w-[44%] max-w-[520px]">
                {VISUALS[cfg.visual]}
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10" role="tablist">
        {SLIDE_CONFIGS.map((_, i) => (
          <button key={i} role="tab" aria-label={`Slide ${i + 1}`} aria-selected={i === current}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => { stopAuto(); goTo(i); startAuto() }}
          />
        ))}
      </div>
    </section>
  )
}
