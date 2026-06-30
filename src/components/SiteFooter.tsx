import Link from 'next/link'

// Shared site footer with the legally-required business identification (imprint).
// NOTE: fill the [PLACEHOLDER] legal identifiers before deploying to main.
export default function SiteFooter() {
  const year = new Date().getFullYear()

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-dim)',
    textDecoration: 'none', display: 'block', marginBottom: 14,
  }
  const headStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 18,
  }

  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 96, padding: '56px 24px 32px' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40,
      }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, letterSpacing: '0.06em', color: 'var(--text)', fontWeight: 500, marginBottom: 14 }}>
            LYVECA AI
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 260 }}>
            Websites built for humans. And for AI.
          </p>
        </div>

        {/* Contact */}
        <div>
          <div style={headStyle}>Contact</div>
          <a href="mailto:sonamasova@lyveca.com" style={linkStyle}>sonamasova@lyveca.com</a>
          <a href="https://calendly.com/sona-masova23" style={linkStyle}>Book a 30-min call</a>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 4 }}>
            Bratislava, Slovakia · Serving globally
          </p>
          <div style={{ display: 'flex', gap: 18, marginTop: 16 }}>
            <a href="https://x.com/LyvecaAI" style={{ ...linkStyle, marginBottom: 0 }}>X</a>
            <a href="https://dev.to/lyvecaaicom" style={{ ...linkStyle, marginBottom: 0 }}>dev.to</a>
            <a href="https://github.com/Sonya2301" style={{ ...linkStyle, marginBottom: 0 }}>GitHub</a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div style={headStyle}>Explore</div>
          <Link href="/services" style={linkStyle}>Services</Link>
          <Link href="/pricing" style={linkStyle}>Pricing</Link>
          <Link href="/about" style={linkStyle}>About</Link>
          <Link href="/cookies-policy" style={linkStyle}>Cookies Policy</Link>
        </div>
      </div>

      {/* Footer note. NOTE: add full business identification (IČO, address, register)
          here once the živnosť is registered — required before invoicing clients. */}
      <div style={{
        maxWidth: 1100, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid var(--border)',
        fontFamily: 'var(--font-sans)', fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.7,
      }}>
        <p style={{ marginBottom: 10 }}>
          LYVECA AI is an independent web studio by <strong style={{ color: 'var(--text-dim)' }}>Soňa Mášová</strong>,
          based in Bratislava, Slovakia. Contact: sonamasova@lyveca.com.
        </p>
        <p>© {year} LYVECA AI · Soňa Mášová. All rights reserved.</p>
      </div>
    </footer>
  )
}
