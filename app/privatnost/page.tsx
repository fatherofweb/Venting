import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = { title: 'Politika privatnosti - Venting' }

export default function PrivatnostPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '60vh' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 28px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>Pravno</p>
          <h1 style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 900, color: '#0c0c0d', margin: '0 0 48px', lineHeight: 1.1 }}>
            Politika privatnosti
          </h1>
          <div style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p>Venting d.o.o. poštuje privatnost korisnika svog sajta. Ova politika objašnjava koje podatke prikupljamo, kako ih koristimo i štitimo.</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Podaci koje prikupljamo</h2>
            <p>Prikupljamo isključivo podatke koje nam dobrovoljno dostavite putem kontakt forme (ime, e-mail, poruka). Ne prikupljamo podatke o plaćanju niti posebne kategorije ličnih podataka.</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Svrha obrade</h2>
            <p>Vaše podatke koristimo isključivo u svrhu odgovaranja na vaše upite i pružanja traženih informacija.</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Kolačići</h2>
            <p>Sajt koristi neophodne kolačiće za ispravno funkcionisanje. Detaljnije informacije dostupne su u <a href="/kolacici" style={{ color: '#0c0c0d' }}>Politici kolačića</a>.</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Kontakt</h2>
            <p>Za sva pitanja u vezi sa zaštitom podataka, kontaktirajte nas na <a href="mailto:info@venting.rs" style={{ color: '#0c0c0d' }}>info@venting.rs</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
