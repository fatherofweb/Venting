'use client'

import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const columns = [
    { heading: t.footerAssortment, links: t.footerAssortmentLinks },
    { heading: t.footerAboutUs,    links: t.footerAboutUsLinks    },
    { heading: t.footerSupport,    links: t.footerSupportLinks    },
  ]

  return (
    <footer className="bg-white border-t border-brand-border pt-14 pb-8">
      <div className="max-w-site mx-auto px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-sans text-[15px] font-bold uppercase tracking-[1.5px] text-brand-text mb-5">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-sans text-[13.5px] text-[#555] transition-colors duration-150 hover:text-brand-text">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-brand-border pt-6 text-center">
          <p className="font-sans text-[12.5px] text-brand-muted">{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
