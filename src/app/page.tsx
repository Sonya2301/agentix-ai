import Link from 'next/link'
import SubNav from '../components/SubNav'
import SiteFooter from '../components/SiteFooter'
import Aurora from '../components/Aurora'
import CountUp from '../components/CountUp'
import { MCPPlayground } from '../components/MCPPlayground'

const wrap: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 28px' }
const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.16em',
  textTransform: 'uppercase', color: 'var(--blue-bright)',
}
const h2: React.CSSProperties = {
  fontFamily: 'var(--font-display)', fontWeight: 600,
  fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.02em',
  color: 'var(--text)', margin: 0,
}
const bluePill = 'linear-gradient(140deg,#6fb6ff,#2a7fe6)'

const stats = [
  { value: 60.3, decimals: 1, suffix: '%', label: 'of US Google queries now show an AI Overview — the answer never leaves Google.' },
  { value: 59, decimals: 0, suffix: '%', label: 'of retail site traffic is already bots and agents, not humans.' },
  { value: 2, decimals: 0, suffix: '×', label: 'AI search traffic converts at twice the rate of traditional organic.' },
  { value: 18, decimals: 0, suffix: '%', label: 'of all organic referral traffic now comes from AI search engines.' },
]

const numberStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px,4vw,50px)', letterSpacing: '-0.02em', lineHeight: 1,
  display: 'inline-block',
  background: 'linear-gradient(120deg,#cfe8ff,#2a7fe6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
}

type Tone = 'white' | 'tint' | 'blue'
const layers: { tag: string; title: string; price: string; body: string; tone: Tone }[] = [
  { tag: 'LAYER 01', title: 'AI-Built', price: 'from €1,490', tone: 'white',
    body: 'Fast, fully custom websites built with AI tools and delivered in 5–7 days. No templates — a site that matches the quality of your product.' },
  { tag: 'LAYER 02', title: 'AI-Powered', price: '€1,490', tone: 'tint',
    body: 'An embedded agent that qualifies leads, answers questions and books meetings 24/7, with no human in the loop. Included in Premium.' },
  { tag: 'LAYER 03', title: 'AI-Readable', price: 'included / €890', tone: 'white',
    body: 'llms.txt, Schema.org JSON-LD and AEO/GEO content so AI engines can read, understand and cite you. In every build, or added on its own.' },
  { tag: 'LAYER 04', title: 'AI-Actionable', price: '€1,890', tone: 'blue',
    body: 'An MCP server that lets outside AI agents operate your site directly — get pricing, check availability and book, without a browser.' },
]

const steps = [
  { no: '01', title: 'Client briefing', body: '30-min call and a short brand brief. We learn your business and goals.' },
  { no: '02', title: 'AI copy', body: 'All text written by AI from your brief — clear, on-brand, conversion-focused.' },
  { no: '03', title: 'AI-assisted build', body: 'The full site designed and developed with AI tools. Fast, custom, no templates.' },
  { no: '04', title: 'Visual generation', body: 'Custom images generated in your brand. No stock photos.' },
  { no: '05', title: 'Deploy & setup', body: 'Domain, analytics, schema, AI crawlers, GDPR. Live in 5–7 days.' },
]

const plans: { tag: string; name: string; price: string; desc: string; featured: boolean }[] = [
  { tag: 'AUDIT', name: 'AI Visibility Audit', price: '€90', featured: false,
    desc: 'A report on exactly how AI sees — or misses — your current site.' },
  { tag: '★ MOST POPULAR', name: 'Studio', price: '€1,490', featured: true,
    desc: 'AI-built website + the AI-readable layer baked in. Live in 5–7 days.' },
  { tag: 'FULL STACK', name: 'Premium', price: '€2,990', featured: false,
    desc: 'Studio + embedded AI agent + fully custom design direction.' },
]

function layerCard(tone: Tone): React.CSSProperties {
  const base: React.CSSProperties = { borderRadius: 20, padding: '26px 24px' }
  if (tone === 'blue') return { ...base, background: 'linear-gradient(155deg,#6fb6ff,#2a7fe6)', border: '1px solid #2a7fe6', boxShadow: '0 22px 46px -20px rgba(74,158,255,0.55)' }
  if (tone === 'tint') return { ...base, background: 'linear-gradient(160deg,#eef4ff,#dbe8ff)', border: '1px solid #bcd8ff' }
  return { ...base, background: '#ffffff', border: '1px solid #dbe6f2', boxShadow: '0 14px 34px -22px rgba(40,90,150,0.35)' }
}

export default function Home() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <SubNav />

      {/* ── Hero ── */}
      <header style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Aurora />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '104px 28px 96px', textAlign: 'center' }}>
          <div className="reveal" style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--blue-soft)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)',
            padding: '7px 13px', borderRadius: 100, marginBottom: 30, backdropFilter: 'blur(10px)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--yellow)', animation: 'pulse 2s infinite' }} />
            AI Web Studio · Bratislava
          </div>
          <h1 className="reveal" style={{
            animationDelay: '0.08s',
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(46px,6.8vw,92px)', lineHeight: 1.0, letterSpacing: '-0.03em',
            margin: 0, color: 'var(--text-strong)',
          }}>
            Websites built for{' '}
            <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 600,
              background: 'linear-gradient(110deg,#e4f2ff,#7cc4ff 55%,#4a9eff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              humans.
            </span>
            <br />
            And for{' '}
            <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 600, color: 'var(--yellow)' }}>AI.</span>
          </h1>
          <p className="reveal" style={{
            animationDelay: '0.16s',
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.5vw,18px)', lineHeight: 1.65,
            color: 'var(--text-body)', maxWidth: '52ch', margin: '26px auto 20px',
          }}>
            Four layers — built, powered, readable, actionable — so your site works for the people
            visiting it and the AI agents reading it.
          </p>
          <div className="reveal" style={{ animationDelay: '0.22s', fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-muted)', letterSpacing: '0.02em', marginBottom: 34 }}>
            Built by AI<span style={{ color: 'var(--yellow)' }}> · </span>Powered by AI<span style={{ color: 'var(--yellow)' }}> · </span>Found by AI<span style={{ color: 'var(--yellow)' }}> · </span>Used by AI
          </div>
          <div className="reveal" style={{ animationDelay: '0.28s', display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://calendly.com/sona-masova23" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)',
              background: bluePill, padding: '14px 24px', borderRadius: 12, boxShadow: '0 12px 34px -10px rgba(74,158,255,0.7)',
            }}>
              Book a free 30-min call
            </a>
            <Link href="/pricing" style={{
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--text-strong)',
              background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.16)',
              padding: '14px 24px', borderRadius: 12,
            }}>
              See pricing
            </Link>
          </div>
        </div>
      </header>

      {/* ── Trust line ── */}
      <div style={{ ...wrap, padding: '8px 28px 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
          <span>Built for</span>
          <span style={{ color: 'var(--text-muted)' }}>Tech &amp; SaaS</span><span style={{ color: '#3a3740' }}>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Cybersecurity</span><span style={{ color: '#3a3740' }}>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Agencies &amp; freelancers</span>
        </div>
      </div>

      {/* ── 01 The shift ── */}
      <section style={{ ...wrap, padding: '40px 28px 72px' }}>
        <div data-reveal>
          <div style={{ ...eyebrow, marginBottom: 18 }}>01 — The shift</div>
          <h2 style={{ ...h2, marginBottom: 16, maxWidth: '20ch' }}>ChatGPT can&apos;t find your website.</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '62ch', margin: '0 0 40px' }}>
            60% of searches now end without a click. AI agents skip your homepage and go straight to the data layer.
            If your site can&apos;t be read, it can&apos;t be cited — and it can&apos;t be found.
          </p>
        </div>
        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
          {stats.map((s) => (
            <div key={s.label} className="lift" style={{ background: 'var(--glass)', backdropFilter: 'blur(22px)', border: '1px solid var(--glass-border)', borderRadius: 18, padding: '26px 24px' }}>
              <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} style={numberStyle} />
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.5, color: 'var(--text-muted)', marginTop: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 02 The system ── */}
      <section style={{ ...wrap, padding: '24px 28px 72px' }}>
        <div data-reveal>
          <div style={{ ...eyebrow, marginBottom: 18 }}>02 — The system</div>
          <h2 style={{ ...h2, marginBottom: 36 }}>Four layers. One studio.</h2>
        </div>
        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
          {layers.map((L) => {
            const onBlue = L.tone === 'blue'
            return (
              <Link key={L.tag} href="/services" className="lift" style={layerCard(L.tone)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: onBlue ? 'rgba(3,16,31,0.66)' : '#8a94a5' }}>{L.tag}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: onBlue ? '#03101f' : '#2f6fb5' }}>{L.price}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 23, letterSpacing: '-0.01em', margin: '0 0 10px', color: onBlue ? '#03101f' : '#182430' }}>{L.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: onBlue ? 'rgba(3,16,31,0.78)' : '#5a6675', margin: 0 }}>{L.body}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── 03 Layer 04, live (MCP demo) ── */}
      <section style={{ ...wrap, padding: '24px 28px 72px' }} data-reveal>
        <div style={{ ...eyebrow, marginBottom: 18 }}>03 — Layer 04, live</div>
        <MCPPlayground />
      </section>

      {/* ── 04 Process ── */}
      <section style={{ ...wrap, padding: '24px 28px 72px' }}>
        <div data-reveal>
          <div style={{ ...eyebrow, marginBottom: 18 }}>04 — Process</div>
          <h2 style={{ ...h2, marginBottom: 36 }}>Brief to live in 5–7 days.</h2>
        </div>
        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {steps.map((st) => (
            <div key={st.no} className="lift" style={{ background: '#ffffff', border: '1px solid #dbe6f2', borderRadius: 16, padding: '22px 20px', boxShadow: '0 14px 34px -24px rgba(40,90,150,0.3)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#2f6fb5', marginBottom: 16 }}>{st.no}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: '#182430', marginBottom: 9 }}>{st.title}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.55, color: '#5a6675' }}>{st.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 05 Pricing teaser ── */}
      <section style={{ ...wrap, padding: '24px 28px 72px' }}>
        <div data-reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: 18 }}>05 — Pricing</div>
            <h2 style={h2}>Fixed prices, published.</h2>
          </div>
          <Link href="/pricing" className="navlink" style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--blue)', borderBottom: '1px solid rgba(74,158,255,0.4)', paddingBottom: 3 }}>
            Full price list →
          </Link>
        </div>
        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16 }}>
          {plans.map((p) => {
            const f = p.featured
            return (
              <div key={p.name} className="lift" style={f
                ? { background: 'linear-gradient(150deg,#6fb6ff,#2a7fe6)', border: '1px solid #2a7fe6', borderRadius: 20, padding: '30px 26px', boxShadow: '0 20px 50px -18px rgba(74,158,255,0.6)' }
                : { background: 'var(--glass)', backdropFilter: 'blur(22px)', border: '1px solid var(--glass-border)', borderRadius: 20, padding: '30px 26px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: f ? '#03101f' : 'var(--text-faint)', marginBottom: 14 }}>{p.tag}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, color: f ? '#03101f' : 'var(--text)', marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 42, letterSpacing: '-0.02em', color: f ? '#03101f' : 'var(--text)', marginBottom: 16 }}>{p.price}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.6, color: f ? 'rgba(3,16,31,0.72)' : 'var(--text-muted)' }}>{p.desc}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── CTA band ── */}
      <section style={{ ...wrap, padding: '40px 28px 96px' }} data-reveal>
        <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 28, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(22px)', padding: 'clamp(40px,6vw,80px)', textAlign: 'center' }}>
          <div aria-hidden="true" className="cta-glow" style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 560, height: 360, background: 'radial-gradient(ellipse, rgba(90,120,255,0.28), transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1.0, letterSpacing: '-0.03em', margin: '0 auto', maxWidth: '18ch', color: 'var(--text-strong)' }}>
              Let&apos;s build a site for both worlds.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-dim)', margin: '22px auto 34px', maxWidth: '50ch', lineHeight: 1.6 }}>
              Free 30-minute call. We&apos;ll show how AI sees your site today and map the four layers to your business.
            </p>
            <a href="https://calendly.com/sona-masova23" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)',
              background: bluePill, padding: '16px 32px', borderRadius: 13, boxShadow: '0 14px 36px -10px rgba(74,158,255,0.7)',
            }}>
              Book your free call
            </a>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-faint)', marginTop: 20 }}>sonamasova@lyveca.com</div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
