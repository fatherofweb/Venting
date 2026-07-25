'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

// bg = svetla neutrala uzeta sa ivice svakog banera; puni bočne trake na širokim
// ekranima tako da se stope sa slikom (svi baneri su svetli).
const SLIDES = [
  { src: '/naslovna-1.png', alt: 'Venting Glory Pro klima uređaj',             bg: '#e7e6e9' },
  { src: '/naslovna-2.png', alt: 'Venting Flex Fit multi sistem',               bg: '#f3f2f1' },
  { src: '/naslovna-3.png', alt: 'Venting komercijalni kasetni klima uređaji',  bg: '#e9e9ea' },
  { src: '/naslovna-5.png', alt: 'Venting sobni rekuperator',                   bg: '#eaeef2' },
]

const DELAY = 4800

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % SLIDES.length) + SLIDES.length) % SLIDES.length)
  }, [])

  const startAuto = useCallback(() => {
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), DELAY)
  }, [])

  const stopAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  useEffect(() => { startAuto(); return stopAuto }, [startAuto, stopAuto])

  const touchXRef = useRef(0)

  // Svi baneri su svetli → tamne tačkice na svima.
  const isDark = false

  return (
    <section
      className="relative overflow-hidden hero-section"
      style={{
        background: SLIDES[current].bg,
        transition: 'background 0.65s ease',
      }}
      aria-label="Istaknuti proizvodi"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      onTouchStart={(e) => { touchXRef.current = e.changedTouches[0].clientX }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchXRef.current
        if (Math.abs(dx) > 48) { stopAuto(); goTo(dx < 0 ? current + 1 : current - 1); startAuto() }
      }}
    >
      <div
        className="slides-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
        role="list"
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="slide relative"
            style={{ background: slide.bg }}
            role="listitem"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              // contain (not cover): the slides are ~16:9 but the band is wider, so
              // cover would crop the bottom feature-icon row. The slide bg colour is
              // matched to each image's edges, so it fills the sides seamlessly.
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dots — colour adapts to light vs dark slide */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 px-3 py-2 rounded-full"
        style={{
          background: isDark ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.12)',
          backdropFilter: 'blur(6px)',
        }}
        role="tablist"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-label={`Slajd ${i + 1}`}
            aria-selected={i === current}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            style={{
              background: i === current
                ? (isDark ? '#ffffff' : '#0c0c0d')
                : (isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)'),
            }}
            onClick={() => { stopAuto(); goTo(i); startAuto() }}
          />
        ))}
      </div>
    </section>
  )
}
