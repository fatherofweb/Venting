import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = { title: 'Kontakt — Venting' }

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '60vh' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '80px 28px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>Kontakt</p>
          <h1 style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: '#0c0c0d', margin: '0 0 48px', lineHeight: 1.1 }}>
            Kako možemo da pomognemo?
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            {/* Info */}
            <div>
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#0c0c0d', marginBottom: 12 }}>Adresa</h2>
                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7 }}>
                  Venting d.o.o.<br />
                  Beograd, Srbija
                </p>
              </div>
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#0c0c0d', marginBottom: 12 }}>Telefon</h2>
                <a href="tel:+38100000000" style={{ fontSize: 15, color: '#6b7280', textDecoration: 'none' }}>+381 00 000 000</a>
              </div>
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#0c0c0d', marginBottom: 12 }}>E-pošta</h2>
                <a href="mailto:info@venting.rs" style={{ fontSize: 15, color: '#6b7280', textDecoration: 'none' }}>info@venting.rs</a>
              </div>
              <div>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#0c0c0d', marginBottom: 12 }}>Radno vreme</h2>
                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7 }}>
                  Pon – Pet: 08:00 – 16:00<br />
                  Subota i nedelja: zatvoreno
                </p>
              </div>
            </div>

            {/* Form */}
            <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#0c0c0d', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Ime i prezime</label>
                <input type="text" placeholder="Vaše ime" style={{ width: '100%', padding: '12px 16px', border: '2px solid #edf1f5', borderRadius: 12, fontSize: 14, color: '#0c0c0d', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#0c0c0d', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>E-pošta</label>
                <input type="email" placeholder="vasa@email.com" style={{ width: '100%', padding: '12px 16px', border: '2px solid #edf1f5', borderRadius: 12, fontSize: 14, color: '#0c0c0d', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#0c0c0d', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Poruka</label>
                <textarea placeholder="Kako možemo da pomognemo?" rows={5} style={{ width: '100%', padding: '12px 16px', border: '2px solid #edf1f5', borderRadius: 12, fontSize: 14, color: '#0c0c0d', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ alignSelf: 'flex-start', background: '#0c0c0d', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Pošalji poruku
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
