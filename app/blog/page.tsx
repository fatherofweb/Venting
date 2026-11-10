import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

export const metadata = { title: 'Blog - Venting' }

const POSTS = [
  { slug: '1', date: '05. jun 2026.', tag: 'Saveti', title: 'Kako odabrati pravi klima uređaj za leto 2026.', excerpt: 'Investicija u dobar klima uređaj može biti ključna za udobnost tokom vrućih leta. Evo šta treba da znate pre kupovine.' },
  { slug: '2', date: '28. maj 2026.', tag: 'Rekuperatori', title: 'Prednosti rekuperatora za vaš dom', excerpt: 'Rekuperatori nisu samo za poslovne prostore. Saznajte kako mogu poboljšati kvalitet vazduha u vašem domu i smanjiti račune za struju.' },
  { slug: '3', date: '15. maj 2026.', tag: 'Fancoili', title: 'Fancoili: efikasno grejanje i hlađenje', excerpt: 'Fancoil jedinice nude fleksibilno i energetski efikasno rešenje za grejanje i hlađenje stambenih i poslovnih prostora.' },
  { slug: '4', date: '02. maj 2026.', tag: 'Komercijalno', title: 'Šta je VRF sistem i kada ga koristiti?', excerpt: 'VRF sistemi su idealni za veće objekte koji zahtevaju preciznu kontrolu temperature u više zona. Saznajte više o prednostima.' },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '60vh' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 28px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>Venting</p>
          <h1 style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: '#0c0c0d', margin: '0 0 64px', lineHeight: 1.1 }}>
            Blog
          </h1>

          {/* Članci još nemaju sadržaj, pa kartice nisu linkovane - vodile bi na 404.
              Kad stignu tekstovi: vrati <a href={`/blog/${post.slug}`}> i dodaj rutu app/blog/[slug]. */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {POSTS.map((post, i) => (
              <div key={post.slug} style={{ display: 'block', color: 'inherit', borderTop: i === 0 ? '1px solid #edf1f5' : undefined, borderBottom: '1px solid #edf1f5', padding: '36px 0' }}>
                <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 120 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#6b7280' }}>{post.date}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#6b7280', background: '#f3f4f6', borderRadius: 6, padding: '3px 10px', marginBottom: 12 }}>{post.tag}</span>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0c0c0d', marginBottom: 10, lineHeight: 1.3 }}>{post.title}</h2>
                    <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{post.excerpt}</p>
                  </div>
                  <div style={{ flexShrink: 0, alignSelf: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#9ca3af', border: '1px solid #e5e7eb', borderRadius: 999, padding: '4px 12px', whiteSpace: 'nowrap' }}>
                      Uskoro
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
