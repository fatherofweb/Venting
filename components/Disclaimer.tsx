'use client'

import { useLanguage } from '@/lib/LanguageContext'

export default function Disclaimer() {
  const { t } = useLanguage()
  return (
    <div className="py-5 bg-white">
      <div className="max-w-site mx-auto px-10">
        <p className="text-[11px] text-brand-muted italic text-center max-w-[760px] mx-auto leading-relaxed">
          {t.disclaimer}
        </p>
      </div>
    </div>
  )
}
