import Link from 'next/link'

// Reusable closing CTA band with the blue radial glow, used on subpages.
export default function CTABand({
  title, copy, email, secondary,
}: {
  title: string
  copy: string
  email?: boolean
  secondary?: { href: string; label: string }
}) {
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 28px 96px' }} data-reveal>
      <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 28, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(22px)', padding: 'clamp(40px,6vw,72px)', textAlign: 'center' }}>
        <div aria-hidden="true" className="cta-glow" style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 560, height: 360, background: 'radial-gradient(ellipse, rgba(90,120,255,0.28), transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px,5vw,60px)', lineHeight: 1.0, letterSpacing: '-0.03em', margin: '0 auto', maxWidth: '16ch', color: 'var(--text-strong)' }}>
            {title}
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-dim)', margin: '22px auto 34px', maxWidth: '48ch', lineHeight: 1.6 }}>
            {copy}
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://calendly.com/sona-masova23" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)',
              background: 'linear-gradient(140deg,#6fb6ff,#2a7fe6)', padding: '15px 28px', borderRadius: 12, boxShadow: '0 14px 36px -10px rgba(74,158,255,0.7)',
            }}>
              Book a free call
            </a>
            {secondary && (
              <Link href={secondary.href} style={{
                fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--text-strong)',
                background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.12)', padding: '15px 28px', borderRadius: 12,
              }}>
                {secondary.label}
              </Link>
            )}
          </div>
          {email && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-faint)', marginTop: 20 }}>sonamasova@lyveca.com</div>}
        </div>
      </div>
    </section>
  )
}
