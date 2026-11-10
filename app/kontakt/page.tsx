'use client'

import { useState, type FormEvent } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '2px solid #edf1f5',
  borderRadius: 12,
  fontSize: 14,
  color: '#0c0c0d',
  outline: 'none',
  boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: '#0c0c0d',
  marginBottom: 8,
  textTransform: 'uppercase',
  letterSpacing: 1,
}

export default function KontaktPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = `Upit sa sajta${name ? ` - ${name}` : ''}`
    const body = `Ime i prezime: ${name}\nE-pošta: ${email}\n\n${message}`
    window.location.href = `mailto:prodaja@steelsoft.rs?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '60vh' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '80px 28px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>Kontakt</p>
          <h1 style={{ fontFamily: 'var(--font-archivo-black), sans-serif', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: '#0c0c0d', margin: '0 0 16px', lineHeight: 1.1 }}>
            Kako možemo da pomognemo?
          </h1>
          <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.7, marginBottom: 44 }}>
            Pošaljite nam upit - brzo odgovaramo na sve poruke.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={labelStyle}>Ime i prezime</label>
              <input type="text" required placeholder="Vaše ime" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>E-pošta</label>
              <input type="email" required placeholder="vasa@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Poruka</label>
              <textarea required placeholder="Kako možemo da pomognemo?" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <button type="submit" style={{ alignSelf: 'flex-start', background: '#0c0c0d', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Pošalji poruku
            </button>
          </form>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
