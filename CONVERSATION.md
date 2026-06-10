# Session Handoff — June 10, 2026

Use this file to brief a new chat with full context. Paste it or reference it at the start.

---

## Who You Are

Soňa Mášová — founder of LYVECA AI (lyveca.com). AI web studio selling three-layer websites:
- Layer 01 — AI-built websites (Claude Code, Next.js, Vercel, 5–7 days, from €1,200)
- Layer 02 — AI-powered websites (embedded Claude agent, lead capture, Calendly, Notion CRM)
- Layer 03 — Agent-friendly websites (llms.txt, Schema.org, MCP server, AEO/GEO)

The lyveca.com site is a live demo of all three layers. It IS the pitch.

Contact: sonamasova@lyveca.com (forwards to sona.masova23@gmail.com via Cloudflare)
X: @LyvecaAI
GitHub: github.com/Sonya2301/agentix-ai
dev.to: dev.to/lyvecaaicom

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework — note: has breaking changes vs older Next.js |
| React 19 | UI |
| Three.js | Galaxy scroll animation |
| Tailwind CSS v4 | Styling |
| TypeScript | Type safety |
| Vercel | Hosting, auto-deploy from main branch |
| Anthropic Claude API (claude-sonnet-4-6) | AI agent (Layer 02) |
| Resend (eu-west-1) | Lead email from agent@lyveca.com |
| Notion API | Lead CRM storage |
| @modelcontextprotocol/sdk | MCP Server (Layer 03) |
| Cloudflare | DNS + Email Routing |

**Branch workflow:** `dev` → all work. `main` → Vercel production.
Merge to main only when actual site files change (src/, public/, config).
Doc-only changes (README, LAYER02) → dev only.

---

## Environment Variables (never commit)

In `.env.local` and Vercel project settings:
- `ANTHROPIC_API_KEY` — Claude API
- `RESEND_API_KEY` — lead email notifications
- `RESEND_FROM=agent@lyveca.com`
- `NOTION_API_KEY` — Notion CRM
- `NOTION_DATABASE_ID` — leads database

---

## What's Live on the Site

### Layer 02 — AI Agent
- Floating chat widget on all pages (AgentWidget.tsx)
- Three tools: `capture_lead`, `get_booking_link`, `answer_service_question`
- Leads save to Notion + email via Resend to sona.masova23@gmail.com
- Knowledge base in `src/data/agentix-knowledge.ts` — edit this to update pricing/services

### Layer 03 — Agent-Friendly
- `/llms.txt` — AI agent README, contact: sonamasova@lyveca.com
- Schema.org JSON-LD in layout.tsx: Organization + Person + WebSite + Service + FAQPage
  - Organization has `sameAs`: X, GitHub
  - Person (Soňa Mášová) has `sameAs`: X, GitHub — linked bidirectionally via founder/worksFor
- `/robots.txt` — explicitly allows GPTBot, ClaudeBot, PerplexityBot, GoogleExtendedBot, Applebot-Extended, cohere-ai
- `/sitemap.xml` — auto-generated
- `/api/mcp` — MCP Server with 3 tools: get_pricing, get_service_info, book_meeting
- `/.well-known/mcp.json` — MCP discovery manifest
- `<link rel="mcp">` in head

---

## Infrastructure (all done)

- lyveca.com on Namecheap, DNS on Cloudflare
- Vercel hosting, auto-deploy from main
- Google Search Console — verified, sitemap submitted
- Bing Webmaster Tools — submitted
- Cloudflare AI crawlers — set to allow (do not block)
- DMARC, DKIM, SPF all configured for lyveca.com
- Email forwarding: sonamasova@lyveca.com → sona.masova23@gmail.com
- Gmail filter: lyveca.com → never spam, always mark important
- Resend domain verified — agent@lyveca.com sending live

---

## External Presence (built so far)

| Platform | Status | Handle/URL |
|----------|--------|------------|
| X (Twitter) | Live | @LyvecaAI — profile complete, first posts published |
| dev.to | Live | dev.to/lyvecaaicom — first post published 2026-06-10 |
| LinkedIn company page | Blocked | Account created with sonamasova@lyveca.com, 48h+ restriction, retry |
| Indie Hackers | Blocked | Need 3–5 genuine comments to earn posting access (3–7 days) |
| GitHub | Live | github.com/Sonya2301/agentix-ai (public repo) |

---

## What Was Done This Session (June 10)

1. **sameAs added to schema** — Organization and Person now link to X and GitHub in JSON-LD. AI engines use sameAs to corroborate identity across sources.
2. **FAQPage email fixed** — old sona.masova23@gmail.com replaced with sonamasova@lyveca.com in the "Who is Soňa Mášová?" answer.
3. **dev.to post published** — "I built my website to be readable by AI agents — here's the full technical stack". First external backlink to lyveca.com from a DA~90 domain. lyveca.com appears as a live demo link.
4. **Workflow rule established** — doc-only changes (README, LAYER02) go to dev only. Only push to main when src/, public/, or config files change.

Commits this session:
- `b2006a7` — Add sameAs links to schema, fix contact email in FAQPage

---

## Outstanding Tasks

| Item | Priority | Notes |
|------|----------|-------|
| LinkedIn company page | High | 48h+ passed — retry today. sonamasova@lyveca.com account, work experience added |
| LinkedIn content | High | 3 posts/week once company page is live. Screen recording of site + agent demo |
| X post — share dev.to article | Medium | Post dev.to link on @LyvecaAI to drive early engagement signals |
| Indie Hackers post | Medium | Draft ready. Need 3–5 genuine comments first. Draft: "I built an AI web studio that sells AI visibility — using AI to build itself" |
| AI search audit | Medium | Ask "do you know lyveca ai" in Perplexity + ChatGPT Browse — retest ~2026-06-13 |
| Product Hunt launch | Medium | High-DA backlink + discovery event — prepare listing |
| MCP registry listing | Low | Submit to Anthropic MCP directory when available |

---

## Key Behavioral Rules (must stay in effect)

- **Never push to Vercel without explicit user confirmation** — always ask before merging to main
- **Doc-only changes (README, LAYER02) go to dev only** — no Vercel deploy needed
- **Never commit .env.local** — API keys only referenced by variable name
- **Never show full API key values** — ANTHROPIC_API_KEY, RESEND_API_KEY, NOTION_API_KEY, NOTION_DATABASE_ID

---

## Dev.to Post URL

https://dev.to/lyvecaaicom/i-built-my-website-to-be-readable-by-ai-agents-heres-the-full-technical-stack-bc8

Share this on X (@LyvecaAI) to drive early engagement — dev.to promotes posts with early traffic signals.

---

## Next Chat Starting Point

Good next actions to pick up:
1. Try LinkedIn company page (48h+ restriction should be lifted)
2. Post dev.to article link on X
3. AI search audit in Perplexity — ask "do you know lyveca ai" and "find me a web studio that builds agent-friendly websites"
4. Start Indie Hackers commenting to earn posting access
