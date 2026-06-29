import Link from 'next/link'

// Top navigation for content subpages (/services, /pricing, /about).
export default function SubNav() {
  const link: React.CSSProperties = {
    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
    color: 'var(--text-muted)', textTransform: 'uppercase', textDecoration: 'none',
  }
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(12px)',
      background: 'rgba(10,10,15,0.7)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 24px',
    }}>
      <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.06em', color: 'var(--text)', fontWeight: 500, textDecoration: 'none' }}>
        LYVECA AI
      </Link>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Link href="/services" style={link}>Services</Link>
        <Link href="/pricing" style={link}>Pricing</Link>
        <Link href="/about" style={link}>About</Link>
        <a href="https://calendly.com/sona-masova23" style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
          color: '#0a0a0f', background: 'var(--accent)', padding: '9px 18px',
          textTransform: 'uppercase', textDecoration: 'none',
        }}>
          Book a Call
        </a>
      </div>
    </nav>
  )
}
