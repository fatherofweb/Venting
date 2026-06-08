import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = { title: 'O nama - Venting' }

export default function ONamaPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '60vh' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 28px 100px' }}>

          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>
            Venting d.o.o.
          </p>
          <h1 style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: '#0c0c0d', margin: '0 0 48px', lineHeight: 1.1 }}>
            Vaš partner za klimatizaciju i ventilaciju
          </h1>

          <div style={{ fontSize: 16, color: '#374151', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: 28 }}>

            <p>
              Venting je ovlašćeni distributer i serviser opreme za klimatizaciju, ventilaciju i prečišćavanje vazduha. Više od 20 godina prisutni smo na srpskom tržištu, obezbeđujući pouzdana rešenja za stambene, poslovne i industrijske objekte.
            </p>

            <p>
              Kao zvanični partner kompanije <strong style={{ color: '#0c0c0d' }}>Mitsubishi Electric</strong>, nudimo kompletnu paletu klima uređaja, rekuperatora, fancoil jedinica i vazdušnih zavesa uz garanciju originalnih delova i fabričku podršku.
            </p>

            <div style={{ background: '#f9fafb', borderRadius: 16, padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { n: '20+', label: 'godina iskustva na srpskom tržištu' },
                { n: '1000+', label: 'dostupnih proizvoda u asortimanu' },
                { n: '5', label: 'kategorija opreme za svaki tip objekta' },
              ].map(({ n, label }) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <span style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 32, fontWeight: 900, color: '#0c0c0d', minWidth: 80 }}>{n}</span>
                  <span style={{ fontSize: 15, color: '#6b7280' }}>{label}</span>
                </div>
              ))}
            </div>

            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0c0c0d', marginBottom: 16 }}>Šta nudimo</h2>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Kućni i komercijalni klima uređaji (split, multi-split, kazetni, kanalski)',
                  'Rekuperatori za kontrolisanu ventilaciju i obnavljanje energije',
                  'Fancoil jedinice za centralne sisteme grejanja i hlađenja',
                  'Vazdušne zavese i ventilatori',
                  'Oprema za ugradnju, prateći materijal i rezervni delovi',
                  'Servis i tehnička podrška ovlašćenih tehničara',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: '#374151' }}>
                    <span style={{ color: '#0c0c0d', fontWeight: 700, fontSize: 18, lineHeight: 1.3, flexShrink: 0 }}>+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p>
              Opremamo stambene i poslovne prostore, hotele, prodajne objekte i industrijska postrojenja. Naš tim prati sve novine u branši i pomaže vam da izaberete rešenje koje odgovara vašim potrebama i budžetu.
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
