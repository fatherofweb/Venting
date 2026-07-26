'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import type { CategoryStat } from '@/app/page'

interface Props {
  categoryStats: CategoryStat[]
}

/** One category tile: representative product photo on a light card with the label. */
function Tile({
  cat,
  fallbackTab,
  className,
  labelSize,
}: {
  cat: CategoryStat | undefined
  fallbackTab: number
  className: string
  labelSize: string
}) {
  const { t } = useLanguage()
  const tab = cat?.tab ?? fallbackTab

  return (
    <a
      href={`/shop?tab=${tab}`}
      className={`group relative flex flex-col justify-end rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.2)] ${className}`}
      style={{ textDecoration: 'none', background: '#e9edf1' }}
    >
      {cat?.image && (
        <Image
          src={cat.image}
          alt=""
          fill
          sizes="(max-width:640px) 50vw, 500px"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Dark scrim at the bottom so the white label reads over the photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(9,12,16,0.82) 0%, rgba(9,12,16,0.4) 32%, rgba(9,12,16,0.06) 60%, rgba(9,12,16,0) 100%)',
        }}
      />

      <div className="relative z-10 p-5">
        <span className="block font-sans text-[10px] font-medium uppercase tracking-widest mb-1.5 text-white/70">
          {cat?.count ?? 0} proizvoda
        </span>
        <span className={`block font-sans ${labelSize} font-bold uppercase tracking-wide text-white`}>
          {t.nav[tab]}
        </span>
      </div>
    </a>
  )
}

export default function WeRecommend({ categoryStats }: Props) {
  const { t } = useLanguage()

  // First 4 categories in the bento layout
  const cats = categoryStats.slice(0, 4)

  return (
    <section className="py-10 sm:py-20 bg-brand-section">
      <div className="max-w-site mx-auto px-4 sm:px-10">
        <h2 className="font-sans text-[22px] sm:text-[28px] font-black uppercase tracking-heading text-brand-text text-center mb-7 sm:mb-12">
          {t.weRecommend}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 wr-grid">
          {/* Col 1 — tall: Kućna rešenja */}
          <Tile cat={cats[0]} fallbackTab={0} labelSize="text-[14px]"
            className="sm:col-start-1 sm:row-start-1 sm:row-span-2" />

          {/* Col 2, Row 1: Komercijalna rešenja */}
          <Tile cat={cats[1]} fallbackTab={1} labelSize="text-[13px]"
            className="sm:col-start-2 sm:row-start-1" />

          {/* Col 3 — tall: Fancoili */}
          <Tile cat={cats[3]} fallbackTab={3} labelSize="text-[14px]"
            className="sm:col-start-3 sm:row-start-1 sm:row-span-2" />

          {/* Col 2, Row 2: Rekuperatori */}
          <Tile cat={cats[2]} fallbackTab={2} labelSize="text-[13px]"
            className="sm:col-start-2 sm:row-start-2" />
        </div>
      </div>
    </section>
  )
}
