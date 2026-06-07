'use client'

import { useLanguage } from '@/lib/LanguageContext'

const POST_META = [
  { date: '14.05.2026', readTime: '4 min', bg: 'linear-gradient(145deg, #b4c8d8 0%, #7a9ab0 100%)', decoration: <div className="w-[70%] aspect-video rounded mx-auto" style={{ background: 'rgba(255,255,255,0.12)' }} /> },
  { date: '30.04.2026', readTime: '4 min', bg: 'linear-gradient(145deg, #d4b4a8 0%, #b08878 100%)', decoration: <div className="w-[52%] aspect-[3/4] rounded-full mx-auto" style={{ background: 'rgba(255,255,255,0.14)' }} /> },
  { date: '09.04.2026', readTime: '3 min', bg: 'linear-gradient(145deg, #c0c8d0 0%, #8890a0 100%)', decoration: (
    <div className="flex gap-2.5 items-end justify-center h-full px-6">
      <div className="w-[30%] h-4/5 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
      <div className="w-[38%] h-4/5 rounded" style={{ background: 'rgba(255,255,255,0.14)' }} />
    </div>
  )},
  { date: '01.04.2026', readTime: '4 min', bg: 'linear-gradient(145deg, #1e2e4a 0%, #141e38 100%)', decoration: <div className="w-[80%] aspect-video rounded mx-auto" style={{ background: 'rgba(255,255,255,0.06)' }} /> },
]

export default function Blog() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-site mx-auto px-10">
        <h2 className="font-sans text-[28px] font-black uppercase tracking-heading text-brand-text text-center mb-12">
          {t.blog}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {POST_META.map((meta, i) => {
            const post = t.blogPosts[i]
            return (
              <article key={i} className="cursor-pointer transition-opacity duration-200 hover:opacity-80">
                <div className="w-full rounded-lg mb-4 overflow-hidden flex items-center justify-center"
                  style={{ aspectRatio: '4/3', background: meta.bg }}>
                  {meta.decoration}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[1px] text-[#aaa]">{t.readLabel}</span>
                  <span className="text-[#ddd] text-xs">·</span>
                  <span className="font-sans text-[11px] text-[#aaa]">{meta.date}</span>
                  <span className="text-[#ddd] text-xs">·</span>
                  <span className="font-sans text-[11px] text-[#aaa]">{meta.readTime}</span>
                </div>
                <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.3px] leading-snug text-brand-text">
                  {post.title}
                </p>
              </article>
            )
          })}
        </div>

        <div className="text-center">
          <a href="#" className="inline-flex items-center font-sans text-base font-medium rounded-pill px-7 py-2.5 border-2 border-brand-text text-brand-text bg-transparent transition-colors duration-200 hover:bg-brand-text hover:text-white">
            {t.seeMore}
          </a>
        </div>
      </div>
    </section>
  )
}
