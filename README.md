# AISOW

> AI web studio building websites that work for both human visitors and AI agents.

Live: [agentix-ai-five.vercel.app](https://agentix-ai-five.vercel.app) · Repo: [github.com/Sonya2301/agentix-ai](https://github.com/Sonya2301/agentix-ai)

---

## What This Is

Portfolio and business website for AISOW — a solo AI web studio based in Bratislava, Slovakia. The site itself is a live demonstration of all three service layers:

- **Layer 01** — Built with AI tools (Claude Code), delivered fast
- **Layer 02** — Autonomous AI agent: lead qualification, booking, knowledge base *(live)*
- **Layer 03** — Agent-friendly: `llms.txt`, Schema.org JSON-LD, AI crawler permissions, auto-generated sitemap

---

## The Experience

A Three.js scroll-driven galaxy animation with 6 content chapters:

| Scroll | Chapter |
|--------|---------|
| 0–15% | Loading circle → galaxy spiral forms |
| 15–35% | Brand reveal — *AISOW* |
| 35–55% | The Shift — market stats |
| 55–72% | Three Layers — the service |
| 72–87% | Pricing |
| 87–100% | CTA — Book a call |

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
```

```bash
# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Metadata, Schema.org JSON-LD, fonts, AgentWidget mount
│   ├── page.tsx                # Main page + SEO semantic HTML layer
│   ├── globals.css             # CSS variables, fonts, animations
│   ├── sitemap.ts              # Auto-generated sitemap (Layer 03)
│   ├── robots.ts               # AI crawler permissions (Layer 03)
│   ├── api/chat/
│   │   └── route.ts            # Layer 02: agentic loop, tool execution
│   └── cookies-policy/
│       └── page.tsx            # GDPR cookies policy page
├── components/
│   ├── GalaxyExperience.tsx    # Three.js galaxy + all scroll chapters
│   ├── GalaxyWrapper.tsx       # Next.js dynamic import wrapper (ssr: false)
│   ├── CookieBanner.tsx        # GDPR cookie banner + Google Analytics
│   └── AgentWidget.tsx         # Layer 02: floating chat UI + action cards
├── data/
│   └── agentix-knowledge.ts    # Layer 02: knowledge base (pricing, layers, process)
├── lib/
│   └── leads.ts                # Layer 02: saveLead() — file + Resend email
└── types/
    └── agent.ts                # Layer 02: shared types
public/
├── llms.txt                    # AI agent sitemap (Layer 03)
└── og-image.svg                # Social sharing preview image
data/
└── leads.json                  # Local lead storage (dev only)
```

---

## Branch Workflow

```
dev   ← all development work happens here
main  ← production branch, auto-deploys to Vercel
```

To go live: merge `dev` into `main` and push.

---

## Layer 03 — AEO/SEO Setup

| File | Purpose | URL |
|------|---------|-----|
| `public/llms.txt` | Describes the site for AI agents (Q&A format) | `/llms.txt` |
| `src/app/robots.ts` | Explicitly allows GPTBot, ClaudeBot, PerplexityBot | `/robots.txt` |
| `src/app/sitemap.ts` | Auto-generated XML sitemap | `/sitemap.xml` |
| Schema.org JSON-LD | Organization + Service + FAQPage structured data | In `<head>` |
| `og-image.svg` | Social preview image for LinkedIn/Twitter | `/og-image.svg` |

**AI crawlers explicitly allowed:** GPTBot, ClaudeBot, PerplexityBot, GoogleExtendedBot, Applebot-Extended, cohere-ai

> **Note:** `noindex` is currently active — site will not be indexed by search engines until ready for public launch.

---

## Analytics & GDPR

- Google Analytics (GA4) — ID: `G-TFRNGLH75Q`
- Analytics only loads **after user accepts cookies** (GDPR compliant)
- Cookie consent stored in `localStorage`
- Cookies policy page at `/cookies-policy`

---

## Contact

- Email: sona.masova23@gmail.com
- Book a call: [calendly.com/sona-masova23](https://calendly.com/sona-masova23)
- Location: Bratislava, Slovakia
