import type { Metadata } from 'next'
import SubNav from '../../components/SubNav'
import SiteFooter from '../../components/SiteFooter'
import CTABand from '../../components/CTABand'

export const metadata: Metadata = {
  title: 'Services — LYVECA AI',
  description:
    'Four layers, one studio: AI-Built websites (Layer 01), AI-Powered with an embedded agent (Layer 02), AI-Readable for ChatGPT/Perplexity/Claude (Layer 03), and AI-Actionable via MCP (Layer 04).',
  alternates: { canonical: 'https://lyveca.com/services' },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Four-Layer AI Website Service',
  provider: { '@type': 'Organization', name: 'LYVECA AI', url: 'https://lyveca.com' },
  areaServed: 'Worldwide',
  serviceType: 'Web Design and Development',
  description:
    'AI-Built, AI-Powered, AI-Readable and AI-Actionable websites — built for human visitors and AI agents.',
}

const wrap: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 28px' }
const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--blue-bright)',
}

type Tone = 'white' | 'tint' | 'blue'
const layers: { tag: string; title: string; price: string; body: string; bullets: string[]; tone: Tone }[] = [
  {
    tag: 'LAYER 01', title: 'AI-Built Websites', price: 'from €1,490', tone: 'white',
    body: 'Fast, fully custom websites built with AI tools and delivered in 5–7 days. No templates, no page-builder bloat — a real site that matches the quality of your product.',
    bullets: ['Custom design in your brand', 'Built on a modern stack, no templates', 'AI-generated copy & visuals included', 'Delivered live in 5–7 days'],
  },
  {
    tag: 'LAYER 02', title: 'AI-Powered Websites', price: '€1,490 setup', tone: 'tint',
    body: 'Embedded AI agents that work the front of house for you — qualifying leads, answering questions, booking meetings and handling support 24/7, with no human in the loop.',
    bullets: ['Lead qualification & routing', 'Books meetings directly', 'Answers from your own content', 'Included in the Premium build'],
  },
  {
    tag: 'LAYER 03', title: 'AI-Readable Websites', price: 'included / €890', tone: 'white',
    body: 'The layer that gets you found. Built with llms.txt, Schema.org JSON-LD, AEO/GEO content optimization and AI-crawler permissions so engines can read, understand and cite you.',
    bullets: ['llms.txt + structured data', 'AEO / GEO content optimization', 'AI-crawler permissions configured', 'In every build, or added as an upgrade'],
  },
  {
    tag: 'LAYER 04', title: 'AI-Actionable Websites', price: '€1,890', tone: 'blue',
    body: 'An MCP server that lets outside AI agents operate your site directly — get pricing, check availability and book meetings without ever opening a browser. Built for tech & SaaS.',
    bullets: ['Model Context Protocol server', 'Pricing & availability endpoints', 'Agent-to-agent booking', 'Ideal for tech, SaaS & security'],
  },
]

const addons = [
  { price: '€90', name: 'AI Visibility Audit', desc: 'A report on exactly how AI sees — or misses — your current site.' },
  { price: '€890', name: 'AI Visibility Upgrade', desc: 'Make an existing site fully AI-readable without a rebuild.' },
  { price: '€99', per: '/mo', name: 'Care Plan', desc: 'Uptime, updates, security and monitoring, handled.' },
  { price: '€249', per: '/mo', name: 'AI Visibility Plan', desc: 'Care plan plus monthly AI-visibility tracking and reporting.' },
]

function layerCard(tone: Tone): React.CSSProperties {
  const base: React.CSSProperties = { borderRadius: 22, padding: '36px 32px', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 32 }
  if (tone === 'blue') return { ...base, background: 'linear-gradient(155deg,#6fb6ff,#2a7fe6)', border: '1px solid #2a7fe6', boxShadow: '0 22px 50px -22px rgba(74,158,255,0.6)' }
  if (tone === 'tint') return { ...base, background: 'linear-gradient(160deg,#eef4ff,#dbe8ff)', border: '1px solid #bcd8ff' }
  return { ...base, background: '#ffffff', border: '1px solid #dbe6f2', boxShadow: '0 18px 40px -24px rgba(40,90,150,0.4)' }
}

export default function ServicesPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SubNav />

      <header style={{ ...wrap, padding: '72px 28px 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, ...eyebrow, fontSize: 11.5, color: 'var(--blue)', background: 'rgba(74,158,255,0.10)', border: '1px solid rgba(74,158,255,0.22)', padding: '7px 13px', borderRadius: 100, marginBottom: 26 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', animation: 'pulse 2s infinite' }} />
          Services · Four layers + add-ons
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px,5.6vw,80px)', lineHeight: 1.0, letterSpacing: '-0.03em', margin: 0, maxWidth: '16ch', color: 'var(--text-strong)' }}>
          Everything your site needs to work in{' '}
          <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 600, background: 'linear-gradient(110deg,#cfe8ff,#2a7fe6 55%,#2a7fe6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>both worlds.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.5vw,18px)', lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '58ch', margin: '24px 0 0' }}>
          Four layers you can buy together or one at a time. Layer 03 ships in every build — the rest stack on as your business grows.
        </p>
      </header>

      {/* Layers */}
      <section style={{ ...wrap, padding: '16px 28px 40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {layers.map((L) => {
            const onBlue = L.tone === 'blue'
            const tagColor = onBlue ? 'rgba(3,16,31,0.66)' : L.tone === 'tint' ? '#5a78a0' : '#8a94a5'
            const arrow = onBlue ? '#03101f' : L.tone === 'tint' ? '#3a6fae' : '#2f6fb5'
            return (
              <div key={L.tag} data-reveal style={layerCard(L.tone)} className="svc-layer lift">
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', color: tagColor, marginBottom: 14 }}>{L.tag}</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(26px,3vw,38px)', lineHeight: 1.02, letterSpacing: '-0.02em', margin: '0 0 16px', color: onBlue ? '#03101f' : '#182430' }}>{L.title}</h2>
                  <div style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: onBlue ? '#2a7fe6' : '#03101f', background: onBlue ? '#03101f' : 'linear-gradient(140deg,#6fb6ff,#2a7fe6)', padding: '7px 13px', borderRadius: 8 }}>{L.price}</div>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.7, color: onBlue ? 'rgba(3,16,31,0.82)' : '#5a6675', margin: '0 0 20px' }}>{L.body}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {L.bullets.map((b) => (
                      <div key={b} style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: onBlue ? '#03101f' : '#243040', display: 'flex', gap: 11, fontWeight: onBlue ? 500 : 400 }}>
                        <span style={{ color: arrow }}>→</span>{b}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Add-ons */}
      <section style={{ ...wrap, padding: '56px 28px 72px' }}>
        <div style={{ ...eyebrow, marginBottom: 18 }}>Add-ons &amp; care</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(28px,3.8vw,48px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 36px', color: 'var(--text)' }}>Keep it sharp after launch.</h2>
        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {addons.map((a) => (
            <div key={a.name} className="lift" style={{ background: 'var(--glass)', backdropFilter: 'blur(22px)', border: '1px solid var(--glass-border)', borderRadius: 18, padding: '26px 24px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 12 }}>
                {a.price}{a.per && <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{a.per}</span>}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--text)', marginBottom: 8 }}>{a.name}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.6, color: 'var(--text-muted)' }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        title="Not sure which layers you need?"
        copy="Start with a €90 audit, or book a free call and we'll map the layers to your business."
        secondary={{ href: '/pricing', label: 'See pricing' }}
      />
      <SiteFooter />

      <style>{`@media (max-width: 760px){ .svc-layer{ grid-template-columns:1fr !important; gap:20px !important; } }`}</style>
    </div>
  )
}
