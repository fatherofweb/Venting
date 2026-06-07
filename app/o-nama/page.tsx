import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = { title: 'O nama — Venting' }

export default function ONamaPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '60vh' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 28px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>Venting</p>
          <h1 style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: '#0c0c0d', margin: '0 0 48px', lineHeight: 1.1 }}>
            Naša priča
          </h1>
          <div style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p>
              Venting je srpska kompanija specijalizovana za klimatizaciju, ventilaciju i prateću opremu. Naša misija je da svakom korisniku obezbedimo optimalne uslove boravka — u domu, kancelariji ili industrijskom prostoru.
            </p>
            <p>
              Nudimo kompletan asortiman koji obuhvata kućne i komercijalne klima uređaje, rekuperatore, fancoile i vazdušne zavese, kao i svu prateću opremu potrebnu za ugradnju i održavanje sistema.
            </p>
            <p>
              Sarađujemo sa sertifikovanim tehničarima i distributerima širom Srbije, garantujući kvalitetnu ugradnju i pouzdanu podršku nakon kupovine.
            </p>
          </div>
          <a href="/kontakt" style={{ display: 'inline-block', marginTop: 48, background: '#0c0c0d', color: '#fff', borderRadius: 12, padding: '14px 32px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            Kontaktirajte nas
          </a>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
