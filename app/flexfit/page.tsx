import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import styles from './FlexFit.module.css'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Flex Fit',
  description:
    'Venting Flex Fit - multi sistem sa Hidro box-om: hlađenje i grejanje unutrašnjim jedinicama, podno grejanje i sanitarna topla voda iz jedne spoljne jedinice.',
  alternates: { canonical: '/flexfit' },
  openGraph: {
    title: 'Flex Fit | Venting',
    description:
      'Jedna jedinica za mnogostruku aplikaciju - ATA hlađenje i grejanje, ATW podno grejanje i sanitarna topla voda.',
    url: '/flexfit',
  },
}

/** Katalog 2026, s20-23 */
const APLIKACIJE = [
  'ATA hlađenje - unutrašnjim jedinicama multi sistema',
  'ATA grejanje - unutrašnjim jedinicama multi sistema',
  'ATW podno grejanje',
  'ATA grejanje + ATW podno grejanje istovremeno',
  'ATW sanitarna topla voda',
]

const PROIZVODI = [
  {
    id: '04VRF001116',
    tip: 'Hidro box',
    model: 'VZAU-28HWFM8',
    dim: '918 × 490 × 325 mm',
    tezina: '56 kg',
    image: '/images/products/hidro-box.jpg',
  },
  {
    id: '03MLT001033',
    tip: 'Spoljna jedinica 27K',
    model: 'V3OB-27HFM8F',
    dim: '890 × 342 × 673 mm',
    tezina: '48 kg',
    image: '/images/products/hidro-box-spoljna-jedinica.jpg',
  },
  {
    id: '03MLT001034',
    tip: 'Spoljna jedinica 36K',
    model: 'V4OC-36HFM8F',
    dim: '946 × 410 × 810 mm',
    tezina: '66 kg',
    image: '/images/products/hidro-box-spoljna-jedinica.jpg',
  },
  {
    id: '03MLT001122',
    tip: 'Spoljna jedinica 42K',
    model: 'V5OE-42HF1M8',
    dim: '946 × 410 × 810 mm',
    tezina: '74,1 kg',
    image: '/images/products/hidro-box-spoljna-jedinica.jpg',
  },
]

const FUNKCIJE = [
  {
    naslov: 'Dezinfekcija sanitarne vode',
    tekst:
      'Zagrevanjem sanitarne tople vode na visokoj temperaturi vrši se proces dezinfekcije. Temperatura i dužina trajanja procesa se mogu podesiti.',
  },
  {
    naslov: 'Zaštita podnog grejanja',
    tekst:
      'U kombinaciji sa podnim grejanjem, temperatura ulazne vode se podešava mešnim ventilom - tako se štiti pod i postiže veći komfor.',
  },
  {
    naslov: 'Trenutna topla voda',
    tekst:
      'U kombinaciji sa rezervoarom za sanitarnu toplu vodu obezbeđuje se trenutna topla voda za kratak vremenski period.',
  },
  {
    naslov: 'Jednostavna kontrola',
    tekst:
      'Hidro box je opremljen kontrolerom koji korisniku omogućava jednostavnu regulaciju celog sistema.',
  },
]

/** Specifikacija - katalog s23. Kolone: 27K / 36K / 42K */
const SPEC_ROWS: { label: string; unit?: string; v: [string, string, string] }[] = [
  { label: 'Napajanje', unit: 'Ph-V-Hz', v: ['220-240V–50Hz, 1Ph', '220-240V–50Hz, 1Ph', '220-240V–50Hz, 1Ph'] },
  { label: 'Električni grejač Hidro box-a', unit: 'W/A', v: ['3100 / 13,5', '3100 / 13,5', '3100 / 13,5'] },
  { label: 'Zvučni pritisak - Hidro box', unit: 'dB(A)', v: ['52', '52', '52'] },
  { label: 'Zvučni pritisak - spoljna jedinica', unit: 'dB(A)', v: ['65', '70', '70'] },
  { label: 'ATA hlađenje', unit: '°C', v: ['-15~50', '-15~50', '-15~50'] },
  { label: 'ATA grejanje', unit: '°C', v: ['-15~24', '-15~24', '-15~24'] },
  { label: 'ATW grejanje (prostorija)', unit: '°C', v: ['0~43', '0~43', '0~43'] },
  { label: 'ATW grejanje (flow)', unit: '°C', v: ['25~60', '25~60', '25~60'] },
  { label: 'Sanitarna topla voda', unit: '°C', v: ['35~55', '35~55', '35~55'] },
  { label: 'Rashladno sredstvo', v: ['R32 (GWP 675)', 'R32 (GWP 675)', 'R32 (GWP 675)'] },
  { label: 'Količina freona', unit: 'kg', v: ['1,8', '1,8', '1,8'] },
  { label: 'Ukupna max. dužina cevi', unit: 'm', v: ['60', '80', '80'] },
  { label: 'Max. dužina po unutrašnjoj jedinici', unit: 'm', v: ['20', '20', '20'] },
  { label: 'Max. visinska razlika UJ / SJ', unit: 'm', v: ['15', '15', '15'] },
  { label: 'Max. broj unutrašnjih jedinica', v: ['3', '4', '5'] },
]

export default function FlexFitPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <p className={styles.eyebrow}>Flex Fit</p>
            <h1 className={styles.title}>
              Venting multi sistem sa Hidro box-om za podno grejanje i sanitarnu toplu vodu
            </h1>
            <p className={styles.lead}>
              Jedna spoljna jedinica pokriva klimatizaciju, podno grejanje i pripremu sanitarne
              tople vode - bez zasebnog sistema za svaku funkciju.
            </p>

            <ul className={styles.apps}>
              {APLIKACIJE.map((a) => (
                <li key={a} className={styles.appItem}>
                  <span className={styles.appDot} aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Šema sistema */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Šema sistema</h2>
            <p className={styles.sub}>
              Sistem čine spoljna jedinica, unutrašnje AC jedinice, Hidro box i ostale komponente
              grejanja (podno grejanje, rezervoar sanitarne vode, radijatori).
            </p>
            <div className={styles.figure}>
              <Image
                src="/images/flexfit/sema-sistema.webp"
                alt="Šema Flex Fit sistema - spoljna jedinica, unutrašnje jedinice i Hidro box"
                width={1200}
                height={960}
                sizes="(max-width: 900px) 100vw, 900px"
                className={styles.figureImg}
              />
            </div>
          </div>
        </section>

        {/* Proizvodi */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Pregled proizvoda</h2>
            <p className={styles.sub}>Hidro box i tri spoljne jedinice - 27K, 36K i 42K.</p>

            <div className={styles.grid}>
              {PROIZVODI.map((p) => (
                <a key={p.id} href={`/product/${p.id}`} className={styles.card}>
                  <div className={styles.cardImg}>
                    <Image
                      src={p.image}
                      alt={p.model}
                      fill
                      sizes="(max-width: 640px) 50vw, 260px"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardTip}>{p.tip}</span>
                    <span className={styles.cardModel}>{p.model}</span>
                    <dl className={styles.cardSpecs}>
                      <div>
                        <dt>Dimenzije</dt>
                        <dd>{p.dim}</dd>
                      </div>
                      <div>
                        <dt>Težina</dt>
                        <dd>{p.tezina}</dd>
                      </div>
                    </dl>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Jedan sistem, više funkcija */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Jedan sistem, više funkcija</h2>
            <p className={styles.sub}>
              Sistem obezbeđuje ATW hlađenje, ATA grejanje, ATW grejanje i sanitarnu toplu vodu, uz
              istovremeni rad unutrašnjih jedinica i pripreme tople vode.
            </p>
            <div className={styles.figure}>
              <Image
                src="/images/flexfit/dijagram-funkcije.webp"
                alt="Flex Fit - istovremeni rad klimatizacije, podnog grejanja i sanitarne tople vode"
                width={1400}
                height={570}
                sizes="(max-width: 1100px) 100vw, 1100px"
                className={styles.figureImg}
              />
            </div>

            <div className={styles.fnGrid}>
              {FUNKCIJE.map((f) => (
                <div key={f.naslov} className={styles.fnCard}>
                  <h3 className={styles.fnTitle}>{f.naslov}</h3>
                  <p className={styles.fnText}>{f.tekst}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifikacija */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Specifikacija</h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Model</th>
                    <th scope="col">V3OB-27HFM8F</th>
                    <th scope="col">V4OC-36HFM8F</th>
                    <th scope="col">V5OE-42HF1M8</th>
                  </tr>
                </thead>
                <tbody>
                  {SPEC_ROWS.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">
                        {r.label}
                        {r.unit ? <span className={styles.unit}>{r.unit}</span> : null}
                      </th>
                      <td>{r.v[0]}</td>
                      <td>{r.v[1]}</td>
                      <td>{r.v[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.note}>Hidro box: VZAU-28HWFM8 uz sve tri spoljne jedinice.</p>
          </div>
        </section>

        {/* Šema instalacije */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Šema instalacije</h2>
            <div className={styles.figure}>
              <Image
                src="/images/flexfit/sema-instalacije.webp"
                alt="Detaljna šema instalacije Flex Fit sistema"
                width={1400}
                height={580}
                sizes="(max-width: 1100px) 100vw, 1100px"
                className={styles.figureImg}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.inner}>
            <h2 className={styles.ctaTitle}>Zainteresovani ste za Flex Fit?</h2>
            <p className={styles.ctaText}>
              Pošaljite upit - pomoći ćemo vam da izaberete konfiguraciju za vaš objekat.
            </p>
            <a href="/kontakt" className={styles.ctaBtn}>
              Kontaktirajte nas
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
