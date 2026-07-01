'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
]

// Sticky top navigation, shared across the homepage and content subpages.
export default function SubNav() {
  const pathname = usePathname()

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 60,
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      background: 'rgba(10,8,9,0.62)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '16px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, fontFamily: 'var(--font-sans)', fontSize: 14 }}>
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={active ? undefined : 'navlink'}
                style={{
                  color: active ? 'var(--text-strong)' : 'var(--text-body)',
                  borderBottom: active ? '1px solid var(--blue-deep)' : '1px solid transparent',
                  paddingBottom: 2,
                }}
              >
                {label}
              </Link>
            )
          })}
          <a href="https://calendly.com/sona-masova23" target="_blank" rel="noopener noreferrer" style={{
            fontWeight: 600, color: 'var(--ink)', background: 'var(--grad-blue)',
            padding: '9px 17px', borderRadius: 10,
            boxShadow: '0 8px 22px -8px rgba(74,158,255,0.7)',
          }}>
            Book a call
          </a>
        </div>
      </div>
    </nav>
  )
}
