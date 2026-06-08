import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = { title: '404 - Stranica nije pronađena | Venting' }

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '80px 28px', textAlign: 'center' }}>

          <p style={{
            fontFamily: 'var(--font-archivo-black), sans-serif',
            fontSize: 'clamp(72px, 12vw, 120px)',
            fontWeight: 900,
            color: '#edf1f5',
            lineHeight: 1,
            margin: '0 0 8px',
            letterSpacing: '-4px',
          }}>
            404
          </p>

          <h1 style={{
            fontFamily: 'var(--font-archivo-black), sans-serif',
            fontSize: 'clamp(22px, 3.5vw, 32px)',
            fontWeight: 900,
            color: '#0c0c0d',
            margin: '0 0 16px',
            lineHeight: 1.15,
          }}>
            Stranica nije pronađena
          </h1>

          <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7, margin: '0 0 40px' }}>
            Stranica koju tražite ne postoji ili je premještena. Pogledajte naš asortiman ili se vratite na početnu.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/"
              style={{
                background: '#0c0c0d',
                color: '#fff',
                borderRadius: 12,
                padding: '13px 28px',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Početna
            </a>
            <a
              href="/shop"
              style={{
                background: '#fff',
                color: '#0c0c0d',
                borderRadius: 12,
                border: '1.5px solid #d1d5db',
                padding: '13px 28px',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Pregledaj proizvode
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
