import type { Metadata } from 'next'
import SubNav from '../../components/SubNav'
import SiteFooter from '../../components/SiteFooter'

export const metadata: Metadata = {
  title: 'Pricing — LYVECA AI',
  description:
    'Transparent fixed pricing. Studio website €1,490, Premium (with AI agent) €2,990, AI Visibility Upgrade €890 for existing sites, MCP integration €1,890, care plans from €99/month.',
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

const groups: { heading: string; blurb: string; rows: { name: string; price: string; desc: string }[] }[] = [
  {
    heading: 'Websites',
    blurb: 'A new, AI-built website. Every build includes the AI-readable layer (Layer 03) at no extra charge.',
    rows: [
      { name: 'Studio', price: '€1,490', desc: 'AI-built website (5–7 days) + AI-readable layer + strategy call + AEO content optimization.' },
      { name: 'Premium', price: '€2,990', desc: 'Everything in Studio + an embedded AI Agent + custom design + 2 extra revisions + 1 month free care.' },
    ],
  },
  {
    heading: 'AI Visibility — for websites that already exist',
    blurb: 'Keep your current site. We make it readable and citable by AI search engines — no rebuild.',
    rows: [
      { name: 'AI Visibility Audit', price: '€90', desc: 'A report on how your site appears in ChatGPT, Perplexity and Claude, with the top fixes. 48-hour delivery.' },
      { name: 'AI Visibility Upgrade', price: '€890', desc: 'One-week upgrade: schema, AI-readable content, crawler access, before/after report.' },
    ],
  },
  {
    heading: 'Add-ons',
    blurb: 'Extend any site with intelligence and machine-actionability.',
    rows: [
      { name: 'AI Agent (Layer 02)', price: '€1,490 setup', desc: 'An autonomous agent that qualifies leads, answers questions, and books meetings 24/7. Included in Premium. API usage billed at cost or via a care plan.' },
      { name: 'MCP Integration (Layer 04)', price: '€1,890', desc: 'Makes your site actionable by outside AI agents — they can get pricing, check availability and book directly, no browser. For tech/SaaS clients.' },
    ],
  },
  {
    heading: 'Monthly care plans',
    blurb: '3-month minimum. The ongoing partnership after launch.',
    rows: [
      { name: 'Care', price: '€99/mo', desc: 'Keeps your site (or agent) running: uptime, backups, updates, security, agent monitoring.' },
      { name: 'AI Visibility', price: '€249/mo', desc: 'Everything in Care + monthly AI-visibility tracking, re-optimization, and a citation report.' },
    ],
  },
]

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      <SubNav />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px 0' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          Transparent pricing
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(32px,5vw,56px)', color: 'var(--text)', margin: '16px 0 20px' }}>
          Simple. Honest. No surprises.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 680 }}>
          Fixed prices in EUR — not ranges. What you see is what you pay. Every project is 50% on
          start, 50% on delivery. As a non-VAT payer, the price you see is the final price.
        </p>

        {groups.map(({ heading, blurb, rows }) => (
          <section key={heading} style={{ marginTop: 56 }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>
              {heading}
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', marginBottom: 20, maxWidth: 640 }}>{blurb}</p>
            <div style={{ display: 'grid', gap: 12 }}>
              {rows.map(({ name, price, desc }) => (
                <div key={name} style={{
                  display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'baseline',
                  padding: '22px 24px', border: '1px solid var(--border)', borderRadius: 10, background: 'rgba(255,255,255,0.015)',
                }}>
                  <div style={{ flex: '1 1 320px' }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{name}</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--text)', whiteSpace: 'nowrap' }}>{price}</div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section style={{ marginTop: 56, padding: '28px 28px', border: '1px solid var(--accent-dim)', borderRadius: 12, background: 'rgba(59,130,246,0.05)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 26, color: 'var(--text)', marginBottom: 12 }}>
            Founding clients — limited slots
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 700 }}>
            The first projects are offered at a founding-client rate in exchange for a case study and
            testimonial. If you want to be one of them, mention it when you book a call.
          </p>
        </section>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <a href="https://calendly.com/sona-masova23" style={{
            display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em',
            color: '#0a0a0f', background: 'var(--accent)', padding: '14px 28px', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            Book a Call
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
