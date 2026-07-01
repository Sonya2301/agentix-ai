import type { Metadata } from 'next'
import SubNav from '../../components/SubNav'
import SiteFooter from '../../components/SiteFooter'
import CTABand from '../../components/CTABand'

export const metadata: Metadata = {
  title: 'Pricing — LYVECA AI',
  description:
    'Transparent fixed pricing. Studio website €1,490, Premium (with AI agent) €2,990, AI Visibility Upgrade €890 for existing sites, MCP integration €1,890, care plans from €99/month. First 3 clients: −40% pilot pricing.',
  alternates: { canonical: 'https://lyveca.com/pricing' },
}

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'LYVECA AI Services',
  itemListElement: [
    { '@type': 'Offer', name: 'AI Visibility Audit', price: '90', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'AI Visibility Upgrade', price: '890', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'Studio Website', price: '1490', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'Premium Website', price: '2990', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'AI Agent Add-on', price: '1490', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'MCP Integration', price: '1890', priceCurrency: 'EUR' },
  ],
}

const wrap: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 28px' }
const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--blue-bright)',
}
const glassCard: React.CSSProperties = { background: 'var(--glass)', backdropFilter: 'blur(22px)', border: '1px solid var(--glass-border)', borderRadius: 22, padding: '36px 32px' }
const tick = (color: string, t: string, dark = false) => (
  <div key={t} style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: dark ? '#2a1608' : '#c8c5cf', display: 'flex', gap: 11, fontWeight: dark ? 500 : 400 }}>
    <span style={{ color }}>✓</span>{t}
  </div>
)

const lineItems = [
  { name: 'AI Visibility Audit', desc: 'A report on how AI currently sees your site.', price: '€90' },
  { name: 'AI Visibility Upgrade', desc: 'Make an existing site AI-readable, no rebuild.', price: '€890' },
  { name: 'AI Agent Add-on', desc: 'Embedded lead + booking agent, setup.', price: '€1,490' },
  { name: 'MCP Integration', desc: 'Agent-operable site for tech & SaaS clients.', price: '€1,890' },
]

const pilots = [
  { name: 'AI Visibility Upgrade', price: '€490', was: '€890', give: 'Named case study + before/after metrics' },
  { name: 'Studio build', price: '€990', was: '€1,490', give: 'Case study + screen-recording rights' },
  { name: 'Premium build', price: '€1,790', was: '€2,990', give: 'Case study + intro to 2 contacts' },
]

export default function PricingPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      <SubNav />

      <header style={{ ...wrap, padding: '72px 28px 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, ...eyebrow, fontSize: 11.5, color: 'var(--blue)', background: 'rgba(74,158,255,0.10)', border: '1px solid rgba(74,158,255,0.22)', padding: '7px 13px', borderRadius: 100, marginBottom: 26 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', animation: 'pulse 2s infinite' }} />
          Pricing · fixed · no hourly billing
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px,5.6vw,80px)', lineHeight: 1.0, letterSpacing: '-0.03em', margin: 0, maxWidth: '13ch', color: 'var(--text-strong)' }}>
          Fixed prices.{' '}
          <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 600, background: 'linear-gradient(110deg,#cfe8ff,#2a7fe6 55%,#2a7fe6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>No surprises.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.5vw,18px)', lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '56ch', margin: '24px 0 0' }}>
          Every build includes the AI-readable layer, custom copy and visuals, and full deployment. Pick a package, add what you need.
        </p>
      </header>

      {/* ── 3 pilot slots ── */}
      <section style={{ ...wrap, padding: '16px 28px 8px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(74,158,255,0.28)', borderRadius: 22, background: 'rgba(74,158,255,0.06)', padding: 'clamp(28px,4vw,40px)' }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: -100, right: -60, width: 380, height: 300, background: 'radial-gradient(ellipse, rgba(90,120,255,0.25), transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
            <div style={{ ...eyebrow, color: 'var(--blue-bright)' }}>Launch offer · 3 pilot slots — 2026</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink)', background: 'linear-gradient(140deg,#6fb6ff,#2a7fe6)', padding: '5px 11px', borderRadius: 100 }}>−40%</div>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3.4vw,40px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 12px', color: 'var(--text-strong)' }}>
            The first three clients set the price.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '62ch', margin: '0 0 28px' }}>
            LYVECA is taking on three founding projects at a −40% pilot rate — in exchange for a case study and testimonial.
            When the third slot closes, prices return to the standard list below.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14 }}>
            {pilots.map((p) => (
              <div key={p.name} className="lift" style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '22px 20px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--text)', marginBottom: 10 }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{p.price}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-faint)', textDecoration: 'line-through' }}>{p.was}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, lineHeight: 1.55, color: 'var(--text-muted)' }}>{p.give}</div>
              </div>
            ))}
          </div>
          <a href="https://calendly.com/sona-masova23" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', marginTop: 24, fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)',
            background: 'linear-gradient(140deg,#6fb6ff,#2a7fe6)', padding: '13px 24px', borderRadius: 11, boxShadow: '0 12px 30px -10px rgba(74,158,255,0.7)',
          }}>
            Claim a pilot slot →
          </a>
        </div>
      </section>

      {/* Packages */}
      <section style={{ ...wrap, padding: '40px 28px 40px' }}>
        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
          {/* Studio */}
          <div className="lift" style={glassCard}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--text-faint)', marginBottom: 22 }}>STUDIO</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26, color: 'var(--text)', marginBottom: 8 }}>Studio</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 26 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 52, letterSpacing: '-0.03em', color: 'var(--text)' }}>€1,490</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>one-time</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
              {['Custom AI-built website', 'AI-readable layer (llms.txt + schema)', 'AI-generated copy & visuals', 'Full deploy: analytics, sitemap, GDPR', 'Live in 5–7 days'].map((t) => tick('var(--blue-bright)', t))}
            </div>
            <a href="https://calendly.com/sona-masova23" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', background: 'linear-gradient(140deg,#6fb6ff,#2a7fe6)', padding: 14, borderRadius: 11 }}>Start with Studio</a>
          </div>

          {/* Premium */}
          <div className="lift" style={{ background: 'linear-gradient(155deg,#6fb6ff,#2a7fe6)', border: '1px solid #2a7fe6', borderRadius: 22, padding: '36px 32px', boxShadow: '0 22px 50px -20px rgba(74,158,255,0.6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(3,16,31,0.6)' }}>PREMIUM</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, background: '#03101f', color: '#6fb6ff', padding: '4px 9px', borderRadius: 100, letterSpacing: '0.1em' }}>★ POPULAR</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26, color: '#03101f', marginBottom: 8 }}>Premium</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 26 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 52, letterSpacing: '-0.03em', color: '#03101f' }}>€2,990</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(3,16,31,0.55)' }}>one-time</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
              {['Everything in Studio', 'Embedded AI agent (lead + booking)', 'Fully custom design', 'AEO / GEO content optimization', 'Priority build & support'].map((t) => tick('#03101f', t, true))}
            </div>
            <a href="https://calendly.com/sona-masova23" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, color: '#6fb6ff', background: '#03101f', padding: 14, borderRadius: 11 }}>Go Premium →</a>
          </div>
        </div>
      </section>

      {/* Line items */}
      <section style={{ ...wrap, padding: '24px 28px 24px' }}>
        <div style={{ ...eyebrow, marginBottom: 24 }}>Everything else, à la carte</div>
        <div style={{ border: '1px solid var(--glass-border)', borderRadius: 18, overflow: 'hidden' }}>
          {lineItems.map((it, i) => (
            <div key={it.name} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center', padding: '22px 26px', borderBottom: i < lineItems.length - 1 ? '1px solid var(--hairline)' : 'none' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, color: 'var(--text)', marginBottom: 4 }}>{it.name}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)' }}>{it.desc}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--text)', whiteSpace: 'nowrap' }}>{it.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly */}
      <section style={{ ...wrap, padding: '40px 28px 40px' }}>
        <div style={{ ...eyebrow, marginBottom: 24 }}>Ongoing / monthly</div>
        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
          {[
            { price: '€99', name: 'Care Plan', desc: 'Uptime, updates, security and monitoring, handled for you.' },
            { price: '€249', name: 'AI Visibility Plan', desc: 'Care plan plus monthly AI-visibility tracking and reporting.' },
          ].map((m) => (
            <div key={m.name} className="lift" style={{ background: 'var(--glass)', backdropFilter: 'blur(22px)', border: '1px solid var(--glass-border)', borderRadius: 18, padding: '28px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)' }}>{m.price}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>/month</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: 'var(--text)', marginBottom: 8 }}>{m.name}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{m.desc}</div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, color: 'var(--text-faint)', marginTop: 18 }}>
          3-month minimum on monthly plans. 50% deposit / 50% on delivery. As a non-VAT payer, the price you see is the final price.
        </p>
      </section>

      <CTABand
        title="Get a quote in one call."
        copy="Tell us what you need and we'll confirm scope and a fixed price on a free 30-minute call."
      />
      <SiteFooter />
    </div>
  )
}
