import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = { title: 'Uslovi korišćenja - Venting' }

export default function UsloviPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '60vh' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 28px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>Pravno</p>
          <h1 style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 900, color: '#0c0c0d', margin: '0 0 48px', lineHeight: 1.1 }}>
            Uslovi korišćenja
          </h1>
          <div style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p>Korišćenjem sajta venting.rs slažete se sa sledećim uslovima. Ukoliko se ne slažete, molimo vas da ne koristite sajt.</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Sadržaj sajta</h2>
            <p>Sav sadržaj na sajtu (tekst, slike, logotipi) vlasništvo je kompanije Venting d.o.o. i zaštićen je autorskim pravima. Nije dozvoljena upotreba bez pismene dozvole.</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Tačnost informacija</h2>
            <p>Trudimo se da informacije budu tačne i ažurne. Venting d.o.o. ne preuzima odgovornost za eventualne greške u opisima proizvoda ili tehničkim specifikacijama.</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Izmene uslova</h2>
            <p>Zadržavamo pravo izmene ovih uslova u bilo kom trenutku. Izmene stupaju na snagu objavljivanjem na sajtu.</p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0c0c0d', margin: 0 }}>Kontakt</h2>
            <p>Za pitanja u vezi sa uslovima korišćenja: <a href="mailto:info@venting.rs" style={{ color: '#0c0c0d' }}>info@venting.rs</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
