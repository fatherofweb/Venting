import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = { title: 'O nama' }

export default function ONamaPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '60vh' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 28px 100px' }}>

          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>
            Venting
          </p>
          <h1 style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: '#0c0c0d', margin: '0 0 48px', lineHeight: 1.1 }}>
            Oprema za klimatizaciju i ventilaciju
          </h1>

          <div style={{ fontSize: 16, color: '#374151', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: 28 }}>

            <p>
              Venting je brend opreme za klimatizaciju, ventilaciju i prečišćavanje vazduha. U Srbiji Venting uređaje uvozi i distribuira <strong style={{ color: '#0c0c0d' }}>Steelsoft</strong>.
            </p>

            <p>
              Asortiman pokriva kompletan program — od kućnih split klima uređaja, preko komercijalnih i multi-split sistema, do rekuperatora, fancoil jedinica i vazdušnih zavesa.
            </p>

            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0c0c0d', marginBottom: 16 }}>Šta nudimo</h2>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Kućni i komercijalni klima uređaji (split, multi-split, kasetni, kanalski)',
                  'Rekuperatori za kontrolisanu ventilaciju i obnavljanje energije',
                  'Fancoil jedinice za centralne sisteme grejanja i hlađenja',
                  'Vazdušne zavese',
                  'Prateća oprema i rezervni delovi',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: '#374151' }}>
                    <span style={{ color: '#0c0c0d', fontWeight: 700, fontSize: 18, lineHeight: 1.3, flexShrink: 0 }}>+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p>
              Venting oprema pokriva stambene i poslovne prostore, hotele, prodajne objekte i industrijska postrojenja — rešenja za svaki tip objekta i budžet.
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
