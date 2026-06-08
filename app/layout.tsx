import type { Metadata } from 'next'
import { Montserrat, Archivo_Black } from 'next/font/google'
import { LanguageProvider } from '@/lib/LanguageContext'
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
  title: 'Tesla - Electronics for Everyone',
  description:
    'Discover Tesla TVs, Home Appliances, Air Conditioning, Monitors, Phones, and Beauty & Care products.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${archivoBlack.variable}`}
    >
      <body className="font-sans text-brand-text bg-brand-bg antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
