'use client'

import { useState, useEffect } from 'react'

const GA_ID = 'G-TFRNGLH75Q'

function loadGA() {
  if (typeof window === 'undefined') return
  if (document.getElementById('ga-script')) return

  const s1 = document.createElement('script')
  s1.id = 'ga-script'
  s1.async = true
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s1)

  const s2 = document.createElement('script')
  s2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `
  document.head.appendChild(s2)
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const choice = localStorage.getItem('cookie-consent')
    if (!choice) {
      setVisible(true)
    } else if (choice === 'accepted') {
      loadGA()
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
    loadGA()
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 200,
      width: 'min(560px, calc(100vw - 32px))',
      background: '#111118',
      border: '1px solid #1e1e2e',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
      flexWrap: 'wrap',
      backdropFilter: 'blur(12px)',
    }}>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: '#9898b4',
        lineHeight: 1.6,
        flex: 1,
        minWidth: 200,
        margin: 0,
      }}>
        We use cookies to improve your experience. By continuing you agree to our use of cookies.
      </p>

      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'transparent',
            border: '1px solid #1e1e2e',
            color: '#6b6b8a',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: '#3b82f6',
            border: '1px solid #3b82f6',
            color: '#0a0a0f',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
