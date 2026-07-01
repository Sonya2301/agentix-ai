import Link from 'next/link'
import Logo from './Logo'

// Shared site footer. Legal note kept honest until the živnosť is registered.
// NOTE: add full business identification (IČO, address, register) below once the
// živnosť is registered — required before invoicing clients.
export default function SiteFooter() {
  const col: React.CSSProperties = {
    display: 'flex', flexDirection: 'column', gap: 11,
    fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--text-body)',
  }
  const head: React.CSSProperties = {
    fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em',
    color: 'var(--text-faint)', marginBottom: 3,
  }

  return (
    <footer style={{ borderTop: '1px solid var(--hairline)', position: 'relative', zIndex: 1 }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '48px 28px',
        display: 'flex', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ marginBottom: 14 }}><Logo mark={28} word={16} /></div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.7, maxWidth: '34ch' }}>
            Websites built for humans. And for AI.<br />
            Bratislava, Slovakia · serving globally.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
          <div style={col}>
            <span style={head}>PAGES</span>
            <Link href="/services" className="navlink">Services</Link>
            <Link href="/pricing" className="navlink">Pricing</Link>
            <Link href="/about" className="navlink">About</Link>
            <Link href="/cookies-policy" className="navlink">Cookies</Link>
          </div>
          <div style={col}>
            <span style={head}>CONNECT</span>
            <a href="mailto:sonamasova@lyveca.com" className="navlink">Email</a>
            <a href="https://x.com/LyvecaAI" target="_blank" rel="noopener noreferrer" className="navlink">X · @LyvecaAI</a>
            <a href="https://dev.to/lyvecaaicom" target="_blank" rel="noopener noreferrer" className="navlink">dev.to</a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--hairline)' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '18px 28px',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)',
        }}>
          <span>© 2026 LYVECA AI · Soňa Mášová</span>
          <span>llms.txt ✓ · schema ✓ · MCP ✓</span>
        </div>
      </div>
    </footer>
  )
}
