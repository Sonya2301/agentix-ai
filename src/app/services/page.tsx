import type { Metadata } from 'next'
import Link from 'next/link'
import SubNav from '../../components/SubNav'
import SiteFooter from '../../components/SiteFooter'

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

const layers = [
  {
    num: '01', verb: 'Built', color: 'var(--green)', name: 'AI-Built Websites',
    summary: 'A fast, custom website that humans love to use.',
    body: 'Production-grade websites built with AI tools (Claude Code, Next.js, Vercel) — not templates, not WordPress. Delivered in 5–7 days instead of the 4–6 weeks a traditional agency takes. Includes responsive design, AI-written copy from your brief, custom visuals (no stock photos), analytics, sitemap, GDPR, and domain setup.',
    who: 'Everyone — this is the foundation of every project.',
  },
  {
    num: '02', verb: 'Powered', color: 'var(--amber)', name: 'AI-Powered Websites',
    summary: 'An AI agent that works for your visitors, 24/7.',
    body: 'Not a chatbot widget — an autonomous agent embedded in your site that qualifies leads, answers questions from your knowledge base, captures contact details, and books meetings, without a human in the loop. It decides when to act and uses tools to do it. The agent on this very site is a live demo.',
    who: 'Businesses that get inbound traffic and want it converted around the clock.',
  },
  {
    num: '03', verb: 'Found', color: 'var(--accent)', name: 'AI-Readable Websites',
    summary: 'So ChatGPT, Perplexity and Claude can find and recommend you.',
    body: 'Most websites are invisible to AI search — blocked crawlers, no structured data. We make yours readable and citable: Schema.org structured data, answer-structured content, AI crawler permissions, and llms.txt. Included in every build, or added to a site you already have as the AI Visibility Upgrade. This is setup plus measurement — visibility grows over weeks, the way SEO has always worked.',
    who: 'Every business that wants to appear in AI-generated answers.',
  },
  {
    num: '04', verb: 'Used', color: '#a855f7', name: 'AI-Actionable Websites',
    summary: 'So outside AI agents can operate your site directly.',
    body: 'The frontier layer. We add an MCP (Model Context Protocol) server that turns your website into callable tools — an external AI agent can get your pricing, check availability, and book a meeting without ever opening a browser. Almost no one in the region offers this. The MCP server on this site is live and callable right now.',
    who: 'Tech and SaaS companies who want to be the first in their industry AI agents can transact with.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SubNav />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 24px 0' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          Services
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(32px,5vw,56px)', color: 'var(--text)', margin: '16px 0 20px' }}>
          Four layers. One studio.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 680 }}>
          A website today has two audiences: the humans who read it and the AI agents that increasingly
          read it for them. We build for both — across four layers. Take one, or stack them.
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.08em', color: 'var(--text-muted)', marginTop: 18 }}>
          Built by AI · Powered by AI · Found by AI · Used by AI
        </p>

        {layers.map(({ num, verb, color, name, summary, body, who }) => (
          <section key={num} style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color, letterSpacing: '0.1em' }}>{num} — {verb}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(24px,3.5vw,36px)', color: 'var(--text)', marginBottom: 12 }}>{name}</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text)', lineHeight: 1.6, marginBottom: 14, fontWeight: 500 }}>{summary}</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: 14 }}>{body}</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-dim)' }}>Best for:</strong> {who}
            </p>
          </section>
        ))}

        <section style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 28, color: 'var(--text)', marginBottom: 14 }}>How it works</h2>
          <ol style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Briefing — a 30-minute call and a short brief on your brand, goals, and audience.</li>
            <li>AI copy — all text drafted by AI from your brief, then refined.</li>
            <li>AI-assisted build — the full site designed and developed with AI tools.</li>
            <li>Visuals — custom imagery in your brand style, no stock photos.</li>
            <li>Launch — domain, analytics, search console, sitemap, schema, AI crawlers, GDPR. Live in 5–7 days.</li>
          </ol>
        </section>

        <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/pricing" style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em',
            color: 'var(--text)', border: '1px solid var(--border)', padding: '13px 26px', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            See pricing
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
