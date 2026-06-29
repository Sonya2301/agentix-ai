import type { Metadata } from 'next'
import Link from 'next/link'
import SubNav from '../../components/SubNav'
import SiteFooter from '../../components/SiteFooter'

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

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(22px,3vw,30px)',
  color: 'var(--text)', marginBottom: 14,
}
const para: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontSize: 15.5, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 16,
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <SubNav />
      <main style={{ maxWidth: 780, margin: '0 auto', padding: '64px 24px 0' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          About
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(32px,5vw,56px)', color: 'var(--text)', margin: '16px 0 24px' }}>
          A studio for the age of AI agents.
        </h1>

        <p style={para}>
          LYVECA AI is a one-person AI web studio founded by Soňa Mášová in Bratislava, Slovakia,
          serving clients globally. It builds websites that work for two audiences at once: the humans
          who read them, and the AI agents that increasingly read them on people&apos;s behalf.
        </p>

        <section style={{ marginTop: 40 }}>
          <h2 style={sectionTitle}>Why LYVECA exists</h2>
          <p style={para}>
            Search is changing faster than most websites are. A growing share of queries are answered
            by ChatGPT, Perplexity, Claude, and Google&apos;s AI Overviews — the visitor never reaches a
            homepage. At the same time, AI agents are starting to act on people&apos;s behalf: comparing,
            booking, buying. Most websites are built only for human eyes, and are effectively invisible
            and unusable to this new layer of the internet.
          </p>
          <p style={para}>
            LYVECA builds for both worlds — fast, beautiful sites for people, and a machine-readable,
            machine-actionable layer for AI. This very site is the proof: an AI agent lives on it, and
            its data is callable by other AIs through a live MCP server.
          </p>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={sectionTitle}>The person behind it</h2>
          <p style={para}>
            Soňa Mášová spent years as a security consultant working with global enterprises before
            turning to where the web is heading — AI, agents, and the tooling around them. That mix is
            unusual: security depth, hands-on AI development, and design taste in one person.
          </p>
          <p style={para}>
            For security and compliance-minded clients, it means someone who speaks their language —
            GDPR, trust, data handling. For technical clients, it means working with someone who
            understands the stack and doesn&apos;t need hand-holding. Work is remote, in English, Slovak,
            or Czech.
          </p>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={sectionTitle}>How I work</h2>
          <ul style={{ ...para, paddingLeft: 20, listStyle: 'disc' }}>
            <li>Fixed, transparent pricing — no hidden fees, no surprise quotes.</li>
            <li>Fast delivery — most sites live in 5–7 days, not weeks.</li>
            <li>Honest about AI visibility — it&apos;s setup plus measurement over time, never an overnight promise.</li>
            <li>Direct — you work with the person building your site, start to finish.</li>
          </ul>
        </section>

        <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/services" style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em',
            color: 'var(--text)', border: '1px solid var(--border)', padding: '13px 26px', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            What I build
          </Link>
          <a href="https://calendly.com/sona-masova23" style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em',
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
