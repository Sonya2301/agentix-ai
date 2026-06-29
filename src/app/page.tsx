import GalaxyWrapper from "../components/GalaxyWrapper";

export default function Home() {
  return (
    <>
      {/* ── SEO / AEO semantic layer ── */}
      {/* Invisible to visual users. Fully readable by search engines,
          AI crawlers (GPTBot, ClaudeBot, PerplexityBot), and screen readers. */}
      <main className="sr-only">
        <h1>LYVECA AI — Websites built for humans. And for AI.</h1>
        <p>
          Websites built for humans. And for AI. We build four-layer websites
          that work for both human visitors and AI search agents.
        </p>

        <section aria-label="The problem">
          <h2>ChatGPT can&apos;t find your website.</h2>
          <p>
            60% of searches now end without a click. AI agents skip your
            homepage entirely and go straight to the data layer. We build
            websites that work in both worlds — for human visitors and for the
            AI agents replacing them.
          </p>
          <ul>
            <li>60.3% of US Google queries now show an AI Overview — the answer never leaves Google.</li>
            <li>59% of retail site traffic is already bots and agents, not humans.</li>
            <li>AI search traffic converts at 2× the rate of traditional organic.</li>
            <li>18% of all organic referral traffic now comes from AI search engines.</li>
          </ul>
        </section>

        <section aria-label="Services — Four Layers">
          <h2>Four layers. One studio.</h2>

          <article>
            <h3>Layer 01 — AI-Built Websites</h3>
            <p>
              Fast, beautiful, custom websites built using AI tools. Delivered
              in 5–7 days. From €1,490.
            </p>
          </article>

          <article>
            <h3>Layer 02 — AI-Powered Websites</h3>
            <p>
              Websites with embedded AI agents that qualify leads, answer
              questions, book meetings, and handle support — 24/7, without a
              human in the loop. €1,490 setup, included in the Premium build.
            </p>
          </article>

          <article>
            <h3>Layer 03 — AI-Readable Websites</h3>
            <p>
              Sites built with llms.txt, Schema.org JSON-LD, AEO/GEO content
              optimization, and AI crawler permissions so AI search engines can
              read, understand, and cite your website. Included in every build,
              or added to an existing site as the AI Visibility Upgrade (€890).
            </p>
          </article>

          <article>
            <h3>Layer 04 — AI-Actionable Websites</h3>
            <p>
              An MCP server that lets outside AI agents operate your site
              directly — get pricing, check availability, and book meetings
              without a browser. MCP Integration €1,890, for tech and SaaS clients.
            </p>
          </article>
        </section>

        <section aria-label="How it works">
          <h2>How we work — 5 steps</h2>
          <ol>
            <li>Client briefing — 30-min call and brand brief.</li>
            <li>AI copy generation — all text written by AI from your brief.</li>
            <li>AI-assisted build — full site designed and developed with AI tools.</li>
            <li>Visual generation — custom images in your brand, no stock photos.</li>
            <li>Deploy and setup — domain, Analytics, Search Console, sitemap, schema, AI crawlers, GDPR. Live in 5–7 days.</li>
          </ol>
        </section>

        <section aria-label="Pricing">
          <h2>Pricing</h2>
          <ul>
            <li>AI Visibility Audit — report on how AI sees your site — €90</li>
            <li>AI Visibility Upgrade — make an existing site AI-readable — €890</li>
            <li>Studio — AI-built website + AI-readable layer — €1,490</li>
            <li>Premium — Studio + embedded AI Agent + custom design — €2,990</li>
            <li>AI Agent Add-on — embedded lead + booking agent — €1,490 setup</li>
            <li>MCP Integration — tech clients — €1,890</li>
            <li>Care plan — uptime, updates, security, monitoring — €99/month</li>
            <li>AI Visibility plan — Care + monthly AI-visibility tracking — €249/month</li>
          </ul>
        </section>

        <section aria-label="Who we work with">
          <h2>Who we work with</h2>
          <p>
            Marketing agencies and freelancers who need a fast, reliable
            white-label web partner. Tech companies, cybersecurity startups,
            and SaaS businesses with €500K–€5M ARR who need websites that
            match the quality of their product and are visible to AI search.
          </p>
        </section>

        <section aria-label="About LYVECA AI">
          <h2>About LYVECA AI</h2>
          <p>
            LYVECA AI is run by Soňa Mášová, a former security consultant (Deloitte, IBM,
            Takeda) who became obsessed with AI, agents, and where the web is
            going. Security background combined with AI developer knowledge and
            design taste — rare in any market, non-existent as a bundled web
            studio service in Slovakia.
          </p>
        </section>

        <section aria-label="Contact">
          <h2>Book a free 30-minute call</h2>
          <p>
            Available via Calendly. Based in Bratislava, Slovakia. Serving
            clients globally. Contact: sonamasova@lyveca.com
          </p>
        </section>
      </main>

      {/* ── Scroll spacer — creates scroll range for Three.js chapters ── */}
      {/* 700vh = 7 viewport heights of scrollable space for the full journey */}
      <div aria-hidden="true" style={{ height: "700vh" }} />

      {/* ── Three.js galaxy experience — client-side only ── */}
      <GalaxyWrapper />
    </>
  );
}
