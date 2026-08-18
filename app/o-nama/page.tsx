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
            O brendu
          </p>
          <h1 style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: '#0c0c0d', margin: '0 0 48px', lineHeight: 1.1 }}>
            Kvalitet i ekonomičnost u jednom brendu
          </h1>

          <div style={{ fontSize: 16, color: '#374151', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: 28 }}>

            <p>
              Brend Venting osnovan je 2010. godine od strane preduzeća <strong style={{ color: '#0c0c0d' }}>Steelsoft d.o.o.</strong> kao robna marka pod kojom bi se koristili proizvodi najboljeg odnosa cene i kvaliteta više kineskih, evropskih ali i srpskih, domaćih proizvođača opreme i HVAC komponenti.
            </p>

            <p>
              Steelsoft d.o.o. je glavni distributer Venting opreme, gde se odlikujemo odličnom post-prodajnom podrškom kao i lagerom servisnih delova radi pružanja najbolje usluge.
            </p>

            <p>
              Brend Venting je prepoznatljiv po kvalitetu, ekonomičnosti i funkcionalnosti.
            </p>

            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0c0c0d', marginBottom: 16 }}>Program</h2>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                {[
                  'Split klima uređaji',
                  'Multi split klima uređaji',
                  'Komercijalni klima uređaji',
                  'Rekuperatori',
                  'Fancoili',
                  'Pumpe za kondenz',
                  'Pumpe za pranje',
                  'Termostati',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: '#374151' }}>
                    <span style={{ color: '#0c0c0d', fontWeight: 700, fontSize: 18, lineHeight: 1.3, flexShrink: 0 }}>+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: '#f9fafb', borderRadius: 16, padding: '28px 32px' }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0c0c0d', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Vizija</h2>
              <p style={{ margin: 0, fontSize: 16, color: '#374151', lineHeight: 1.8 }}>
                Vizija Venting-a jeste da brend Venting bude sinonim za klima uređaje koji su ekonomični i kvalitetni i koji prate nove standarde u tehnologiji i održivom razvoju.
              </p>
            </div>

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
