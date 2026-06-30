# LYVECA AI — AI Web Studio

> Building websites that work for both human visitors and AI agents.

Live: [lyveca.com](https://lyveca.com) · Repo: [github.com/Sonya2301/agentix-ai](https://github.com/Sonya2301/agentix-ai)

---

## What This Is

Portfolio and business website for LYVECA AI — a solo AI web studio founded by Soňa Mášová, based in Bratislava, Slovakia. The site itself is a live demonstration of all four service layers:

- **Layer 01 — AI-Built** — Built with AI tools (Claude Code), delivered fast
- **Layer 02 — AI-Powered** — Autonomous AI agent: lead qualification, booking, knowledge base *(live)*
- **Layer 03 — AI-Readable** — `llms.txt`, Schema.org JSON-LD, FAQPage schema, AI crawler permissions, sitemap *(live)*
- **Layer 04 — AI-Actionable** — MCP server exposing the site as callable tools for outside AI agents *(live)*

> One-line pitch: **Built by AI · Powered by AI · Found by AI · Used by AI.** Pricing and strategy live in `PRICING.md`; status and roadmap in `PLAN.md`.

---

## The Experience

A Three.js scroll-driven galaxy animation with 7 content chapters:

| Scroll | Chapter |
|--------|---------|
| 0–13% | Loading circle → galaxy spiral forms |
| 13–27% | Brand reveal — *Soňa Mášová* |
| 27–43% | The Shift — market stats |
| 43–58% | Four Layers — the service |
| 58–72% | Pricing — teaser + "See full pricing →" link to `/pricing` |
| 72–86% | MCP Live Demo — interactive playground |
| 86–100% | CTA — Book a call |

Plus standalone content pages (static, each with own metadata + JSON-LD): **`/services`**, **`/pricing`**, **`/about`**, and `/cookies-policy`.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework |
| React 19 | UI |
| Three.js | Galaxy particle animation |
| Tailwind CSS v4 | Styling |
| TypeScript | Type safety |
| Vercel | Hosting + auto-deploy from main branch |
| Anthropic Claude API | AI agent (Layer 02) |
| Resend | Lead email notifications (Layer 02) |
| Notion API | Lead CRM storage (Layer 02) |
| MCP SDK (`@modelcontextprotocol/sdk`) | MCP Server (Layer 04) |

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/Sonya2301/agentix-ai.git
cd agentix-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local  # then fill in your keys
```

Required keys in `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...   # Required — powers the AI agent
RESEND_API_KEY=re_...          # Required — lead email notifications
NOTION_API_KEY=ntn_...         # Required — saves leads to Notion CRM
NOTION_DATABASE_ID=...         # Required — your Notion leads database ID
```

```bash
# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
next.config.ts                  # Security headers (HSTS, X-Frame-Options, nosniff, etc.) — CSP pending redesign
src/
├── app/
│   ├── layout.tsx              # Metadata, Schema.org JSON-LD (Org/Person/Service/Offers/FAQ), fonts, AgentWidget mount
│   ├── page.tsx                # Homepage + SEO semantic HTML layer (crawlable subpage links)
│   ├── globals.css             # CSS variables, fonts, animations
│   ├── sitemap.ts              # Sitemap incl. /services /pricing /about (Layer 03)
│   ├── robots.ts               # AI crawler permissions (Layer 03)
│   ├── services/page.tsx       # Subpage: the 4 layers in depth (+ Service JSON-LD)
│   ├── pricing/page.tsx        # Subpage: full pricing table (+ OfferCatalog JSON-LD)
│   ├── about/page.tsx          # Subpage: studio story, manifesto, proof (+ AboutPage JSON-LD)
│   ├── api/
│   │   ├── chat/route.ts       # Layer 02: agentic loop, tool execution
│   │   └── mcp/route.ts        # Layer 04: MCP Server (get_pricing, get_service_info, book_meeting)
│   └── cookies-policy/page.tsx # GDPR cookies policy page
├── components/
│   ├── GalaxyExperience.tsx    # Three.js galaxy + all scroll chapters + nav
│   ├── GalaxyWrapper.tsx       # Next.js dynamic import wrapper (ssr: false)
│   ├── CookieBanner.tsx        # GDPR cookie banner + Google Analytics
│   ├── AgentWidget.tsx         # Layer 02: floating chat UI + action cards
│   ├── MCPPlayground.tsx       # Layer 04: interactive MCP demo (Chapter 5)
│   ├── SubNav.tsx              # Top nav for content subpages
│   └── SiteFooter.tsx          # Shared footer + legal note (imprint TODO at živnosť)
├── data/
│   └── agentix-knowledge.ts    # Layer 02: knowledge base — SINGLE SOURCE OF TRUTH for pricing
├── lib/
│   └── leads.ts                # Layer 02: saveLead() — file + Resend email
└── types/
    └── agent.ts                # Layer 02: shared types
public/
├── llms.txt                    # AI agent README (Layer 03) — pricing kept in sync with knowledge base
├── og-image.png / og-image.svg # Social sharing preview image (+ source)
└── avatar.png / avatar.svg     # Square profile picture (400×400) for X, LinkedIn, About page
data/
└── leads.json                  # Local lead storage (dev only; all entries are test data)
```

---

## Branch Workflow

```
dev   ← all development work happens here
main  ← production branch, auto-deploys to Vercel
```

To go live: merge `dev` into `main` and push.

---

## Layers 03 & 04 — AEO/SEO + MCP Setup

| File | Purpose | URL |
|------|---------|-----|
| `public/llms.txt` | Describes the site for AI agents (Q&A format, MCP section) | `/llms.txt` |
| `src/app/robots.ts` | Explicitly allows GPTBot, ClaudeBot, PerplexityBot | `/robots.txt` |
| `src/app/sitemap.ts` | XML sitemap incl. `/services` `/pricing` `/about` | `/sitemap.xml` |
| Schema.org JSON-LD | Organization + Person + Service + Offers + FAQPage; per-page schema on subpages | In `<head>` |
| `next.config.ts` | HTTP security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) | All routes |
| `og-image.png` | Social preview image for LinkedIn/Twitter (1200×630 PNG) | `/og-image.png` |
| `src/app/api/mcp/route.ts` | **Layer 04** — MCP Server, 3 callable tools for AI agents | `/api/mcp` |
| `public/.well-known/mcp.json` | MCP discovery endpoint — lists tools and server URL | `/.well-known/mcp.json` |
| `<link rel="mcp">` in `<head>` | HTML discovery for agents that parse pages | In every page |

**AI crawlers explicitly allowed:** GPTBot, ClaudeBot, PerplexityBot, GoogleExtendedBot, Applebot-Extended, cohere-ai

> **Security headers:** 5 design-independent headers are live (see `next.config.ts`). Content-Security-Policy (CSP) is intentionally deferred until after the planned design overhaul, since it depends on exactly what the final site loads.

### MCP Live Demo (Chapter 5)

`src/components/MCPPlayground.tsx` — interactive demo embedded in the scroll experience.

Visitors click a tool button and watch two panels update in real time:
- **Left (REQUEST)** — the JSON message the AI sent to the server, typed out character by character
- **Right (RESPONSE)** — the data the server returned, streamed back line by line

Three tools to try: `get_pricing`, `book_meeting`, `get_service_info` (with topic pills: layer01, layer02, layer03, process, about).

This makes the invisible MCP mechanism visible — visitors experience exactly what an AI agent does when it calls the site.

> **Note:** Indexing is enabled. Google Search Console verified and sitemap submitted.

---

## Analytics & GDPR

- Google Analytics (GA4) — ID: `G-TFRNGLH75Q`
- Analytics only loads **after user accepts cookies** (GDPR compliant)
- Cookie consent stored in `localStorage`
- Cookies policy page at `/cookies-policy`

---

## Contact

- Email: sonamasova@lyveca.com (forwards to sona.masova23@gmail.com via Cloudflare Email Routing)
- Agent email: agent@lyveca.com (Resend, eu-west-1 — lead notifications sent from here)
- X: [@LyvecaAI](https://x.com/LyvecaAI)
- dev.to: [dev.to/lyvecaaicom](https://dev.to/lyvecaaicom)
- Book a call: [calendly.com/sona-masova23](https://calendly.com/sona-masova23)
- Location: Bratislava, Slovakia
