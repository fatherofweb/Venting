import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = { title: 'Servis i podrška' }

const SERVICES = [
  { title: 'Ugradnja', desc: 'Profesionalna ugradnja klima uređaja, rekuperatora i fancoila od strane sertifikovanih tehničara.' },
  { title: 'Redovno održavanje', desc: 'Godišnji servis i čišćenje uređaja za optimalne performanse i duži vek trajanja.' },
  { title: 'Popravka i dijagnostika', desc: 'Brza dijagnostika i popravka kvara na svim Venting uređajima.' },
]

export default function ServisPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '60vh' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 28px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>Podrška</p>
          <h1 style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: '#0c0c0d', margin: '0 0 16px', lineHeight: 1.1 }}>
            Servis i podrška
          </h1>
          <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 64, maxWidth: 560, lineHeight: 1.7 }}>
            Naš tim sertifikovanih tehničara spreman je da vam pomogne u svakom trenutku, od ugradnje do redovnog odrzavanja.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 64 }}>
            {SERVICES.map((s) => (
              <div key={s.title} style={{ border: '2px solid #edf1f5', borderRadius: 20, padding: '32px 28px' }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', marginBottom: 12 }}>{s.title}</h2>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#f9fafb', borderRadius: 20, padding: '40px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0c0c0d', marginBottom: 8 }}>Zakažite servis</h2>
              <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Pišite nam na servis@steelsoft.rs i dogovorimo termin koji vam odgovara.</p>
            </div>
            <a href="mailto:servis@steelsoft.rs?subject=Zakazivanje%20servisa" style={{ background: '#0c0c0d', color: '#fff', borderRadius: 12, padding: '14px 32px', fontSize: 14, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              servis@steelsoft.rs
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
