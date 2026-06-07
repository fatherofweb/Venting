import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = { title: 'Politika kolačića — Venting' }

export default function KolaciciPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '60vh' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 28px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>Pravno</p>
          <h1 style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 900, color: '#0c0c0d', margin: '0 0 48px', lineHeight: 1.1 }}>
            Politika kolačića
          </h1>
          <div style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p>Sajt venting.rs koristi kolačiće (cookies) kako bi osigurao ispravno funkcionisanje i poboljšao korisničko iskustvo.</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Šta su kolačići?</h2>
            <p>Kolačići su male tekstualne datoteke koje se čuvaju na vašem uređaju kada posećujete sajt. Koristimo ih za pamćenje vaših podešavanja (npr. odabrani jezik).</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Koje kolačiće koristimo?</h2>
            <p><strong style={{ color: '#0c0c0d' }}>Neophodne</strong> — obezbeđuju osnovno funkcionisanje sajta (npr. čuvanje odabranog jezika). Ovi kolačići ne mogu biti isključeni.</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Upravljanje kolačićima</h2>
            <p>Možete obrisati ili blokirati kolačiće u podešavanjima vašeg pregledača. Imajte u vidu da blokiranje kolačića može uticati na funkcionalnost sajta.</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Kontakt</h2>
            <p>Za pitanja: <a href="mailto:info@venting.rs" style={{ color: '#0c0c0d' }}>info@venting.rs</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
