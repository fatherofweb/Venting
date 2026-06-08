'use client'

import { useState, useEffect } from 'react'
import styles from './CookieConsent.module.css'

const STORAGE_KEY = 'venting_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'all')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'necessary')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Obaveštenje o kolačićima" aria-modal="false">
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.title}>Kolačići na ovom sajtu</p>
          <p className={styles.desc}>
            Koristimo neophodne kolačiće za rad sajta i analitičke kolačiće kako bismo poboljšali vaše iskustvo.
            U skladu sa Zakonom o zaštiti podataka o ličnosti (ZZPL), vaš pristanak je neophodan za korišćenje neobaveznih kolačića.{' '}
            <a href="/kolacici" className={styles.link}>Saznaj više</a>
          </p>
        </div>
        <div className={styles.actions}>
          <button onClick={decline} className={styles.btnSecondary}>
            Samo neophodni
          </button>
          <button onClick={accept} className={styles.btnPrimary}>
            Prihvati sve
          </button>
        </div>
      </div>
    </div>
  )
}
