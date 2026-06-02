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
      width: 'min(680px, calc(100vw - 32px))',
      background: '#111118',
      border: '1px solid #1e1e2e',
      padding: '28px 32px',
      backdropFilter: 'blur(12px)',
    }}>
      {/* Text */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: '#9898b4',
        lineHeight: 1.7,
        margin: '0 0 20px 0',
      }}>
        We use first-party and third-party cookies to understand how our website is used and to improve it.
        We use analytics cookies to measure traffic and understand visitor behaviour.
        You can accept all cookies, reject non-essential ones, or manage your preferences.
        For more information please see our{' '}
        <a
          href="/cookies-policy"
          style={{ color: '#3b82f6', textDecoration: 'underline', textUnderlineOffset: 3 }}
        >
          Cookies Policy
        </a>.
      </p>

      {/* Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
      }}>
        <button
          onClick={decline}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: 'transparent',
            border: 'none',
            color: '#6b6b8a',
            padding: '0',
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}
        >
          Cookie Settings
        </button>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={decline}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'transparent',
              border: '1px solid #1e1e2e',
              color: '#9898b4',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
          >
            Reject All
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
              padding: '10px 20px',
              cursor: 'pointer',
            }}
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  )
}
