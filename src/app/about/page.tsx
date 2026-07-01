import type { Metadata } from 'next'
import SubNav from '../../components/SubNav'
import SiteFooter from '../../components/SiteFooter'
import CTABand from '../../components/CTABand'

export const metadata: Metadata = {
  title: 'About — LYVECA AI',
  description:
    'LYVECA AI is an AI web studio founded by Soňa Mášová in Bratislava, Slovakia — a former security consultant building websites for the age of AI agents.',
  alternates: { canonical: 'https://lyveca.com/about' },
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'Person',
    name: 'Soňa Mášová',
    jobTitle: 'Founder, LYVECA AI',
    worksFor: { '@type': 'Organization', name: 'LYVECA AI', url: 'https://lyveca.com' },
    email: 'sonamasova@lyveca.com',
    sameAs: ['https://x.com/LyvecaAI', 'https://github.com/Sonya2301'],
  },
}

const wrap: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 28px' }
const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--blue-bright)',
}

const principles: { no: string; title: string; body: string; tint: boolean }[] = [
  { no: '01', title: 'Built for both audiences', tint: false, body: 'Every page is designed for the human reading it and the agent parsing it. Neither is an afterthought.' },
  { no: '02', title: 'Fast, fixed, finished', tint: true, body: 'Clear scope, fixed price, live in 5–7 days. No open-ended retainers, no hourly surprises.' },
  { no: '03', title: 'No stock, no templates', tint: false, body: 'Custom design and custom visuals generated in your brand. Your site shouldn’t look like anyone else’s.' },
]

export default function AboutPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <SubNav />

      <header style={{ ...wrap, padding: '72px 28px 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, ...eyebrow, fontSize: 11.5, color: 'var(--blue)', background: 'rgba(74,158,255,0.10)', border: '1px solid rgba(74,158,255,0.22)', padding: '7px 13px', borderRadius: 100, marginBottom: 26 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', animation: 'pulse 2s infinite' }} />
          About · one studio, one operator
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px,5.6vw,80px)', lineHeight: 1.0, letterSpacing: '-0.03em', margin: 0, maxWidth: '15ch', color: 'var(--text-strong)' }}>
          Security rigor, AI craft,{' '}
          <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 600, background: 'linear-gradient(110deg,#cfe8ff,#2a7fe6 55%,#2a7fe6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>design taste.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.5vw,18px)', lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: '58ch', margin: '24px 0 0' }}>
          A rare combination in any market — and, bundled into one web studio in Slovakia, one that didn&apos;t exist until now.
        </p>
      </header>

      {/* Bio: terminal card + prose */}
      <section style={{ ...wrap, padding: '16px 28px 56px' }}>
        <div data-reveal style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 32, alignItems: 'start' }} className="about-bio">
          <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#2a7fe6', opacity: 0.8 }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a3740' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#3a3740' }} />
              <span style={{ marginLeft: 8 }}>~ / whoami</span>
            </div>
            <pre style={{ margin: 0, padding: 22, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.85, color: 'var(--text-body)', overflowX: 'auto' }}>
<span style={{ color: 'var(--text-faint)' }}>$</span> whoami{'\n'}
<span style={{ color: 'var(--blue)' }}>Soňa Mášová</span> — founder &amp; operator{'\n\n'}
<span style={{ color: 'var(--text-faint)' }}>$</span> cat background.log{'\n'}
[ex] security consultant{'\n'}
[ex] enterprise &amp; pharma{'\n'}
[now] AI builder &amp; web studio{'\n\n'}
<span style={{ color: 'var(--text-faint)' }}>$</span> cat obsession.txt{'\n'}
AI, agents, and where the web is going.{'\n\n'}
<span style={{ color: 'var(--text-faint)' }}>$</span> location --now{'\n'}
Bratislava, SK · serving globally<span style={{ color: '#2a7fe6', animation: 'blink 1.1s step-end infinite' }}>_</span>
            </pre>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(26px,3.2vw,40px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 22px', color: 'var(--text)' }}>
              Run by one person who&apos;s done the hard parts.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)', margin: '0 0 18px' }}>
              LYVECA AI is run by Soňa Mášová — a former security consultant who worked with global enterprises
              before becoming obsessed with AI, agents, and where the web is heading.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)', margin: 0 }}>
              That mix — security discipline, hands-on AI development, and real design taste — is what makes a
              LYVECA site fast, findable, and built to be trusted by both people and machines.
            </p>
          </div>
        </div>
      </section>

      {/* How we think: light bubbles */}
      <section style={{ ...wrap, padding: '16px 28px 56px' }}>
        <div style={{ ...eyebrow, marginBottom: 24 }}>How we think</div>
        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
          {principles.map((p) => (
            <div key={p.no} className="lift" style={p.tint
              ? { background: 'linear-gradient(160deg,#eef4ff,#dbe8ff)', border: '1px solid #bcd8ff', borderRadius: 20, padding: '28px 26px' }
              : { background: '#ffffff', border: '1px solid #dbe6f2', borderRadius: 20, padding: '28px 26px', boxShadow: '0 18px 40px -24px rgba(40,90,150,0.4)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: p.tint ? '#3a6fae' : '#2f6fb5', marginBottom: 18 }}>{p.no}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19, color: '#182430', marginBottom: 12 }}>{p.title}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.65, color: '#5a6675' }}>{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Who we work with: dark glass */}
      <section style={{ ...wrap, padding: '16px 28px 72px' }}>
        <div style={{ ...eyebrow, marginBottom: 24 }}>Who we work with</div>
        <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
          {[
            { t: 'Agencies & freelancers', d: 'Marketing agencies and freelancers who need a fast, reliable white-label web partner they can put in front of clients without worrying.' },
            { t: 'Tech, security & SaaS', d: 'Cybersecurity startups and SaaS businesses with €500K–€5M ARR who need a site that matches the quality of their product — and is visible to AI search.' },
          ].map((c) => (
            <div key={c.t} className="lift" style={{ background: 'var(--glass)', backdropFilter: 'blur(22px)', border: '1px solid var(--glass-border)', borderRadius: 20, padding: '32px 28px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--text)', marginBottom: 14 }}>{c.t}</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-dim)', margin: 0 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        title="Let's talk about your site."
        copy="Free 30-minute call. No pitch deck, just a clear plan for both your visitors and the agents."
        email
      />
      <SiteFooter />

      <style>{`@media (max-width: 760px){ .about-bio{ grid-template-columns:1fr !important; } }`}</style>
    </div>
  )
}
