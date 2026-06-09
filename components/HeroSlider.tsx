'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

const SLIDES = [
  { src: '/Naslovna 1.png', alt: 'Venting Glory Pro klima uređaj' },
  { src: '/Naslovna 3.png', alt: 'Venting komercijalni kasetni klima uređaji' },
  { src: '/Naslovna 5.png', alt: 'Venting sobni rekuperator' },
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

  return (
    <section
      className="relative overflow-hidden bg-[#0a0c10] hero-section"
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
          <div key={slide.src} className="slide relative" role="listitem">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dot navigation — dark pill so it reads on light slides too */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 px-3 py-2 rounded-full"
        style={{ background: 'rgba(0,0,0,0.22)', backdropFilter: 'blur(6px)' }}
        role="tablist"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-label={`Slajd ${i + 1}`}
            aria-selected={i === current}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => { stopAuto(); goTo(i); startAuto() }}
          />
        ))}
      </div>
    </section>
  )
}
