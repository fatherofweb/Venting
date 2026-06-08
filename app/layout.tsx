import type { Metadata } from 'next'
import { Montserrat, Archivo_Black } from 'next/font/google'
import { LanguageProvider } from '@/lib/LanguageContext'
import CookieConsent from '@/components/CookieConsent'
import './globals.css'

/* Only load the 3 weights actually used: body(400), bold UI(700), display headings(900) */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
})

/* Single display font — Archivo Black covers Panton Black Caps fallback */
const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-archivo-black',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Venting | Klima uređaji i ventilacija',
  description:
    'Venting - ovlašćeni distributer opreme za klimatizaciju i ventilaciju. Kućni i komercijalni klima uređaji, rekuperatori, fancoili i dodatna oprema.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="sr"
      className={`${montserrat.variable} ${archivoBlack.variable}`}
    >
      <body className="font-sans text-brand-text bg-brand-bg antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        <CookieConsent />
      </body>
    </html>
  )
}
