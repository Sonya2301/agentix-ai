# Layer 02 — AI-Powered Websites
## Implementation Notes — LYVECA AI

---

## What Was Built

A real autonomous AI agent embedded in the Soňa Mášová website. Not a chatbot widget — an agent that uses tools to act. When a visitor provides their name and email through natural conversation, the agent autonomously captures their lead, saves it, and sends an email notification. When they're ready to book, it generates a pre-filled Calendly link and renders it as a button card.

This implementation on the Soňa Mášová site serves as a **live demo** of the Layer 02 product being sold to clients.

---

## File Structure

```
src/
├── types/
│   └── agent.ts              — shared types: AgentAction, ChatMessage, LeadData
├── data/
│   └── agentix-knowledge.ts  — structured knowledge base (pricing, layers, process, about)
├── lib/
│   └── leads.ts              — saveLead(): writes to /data/leads.json + Resend email
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      — POST endpoint: agentic loop with Anthropic tool use
│   └── layout.tsx            — <AgentWidget /> mounted here (appears on all pages)
└── components/
    └── AgentWidget.tsx       — floating chat UI with typewriter effect + action cards
```

---

## How It Works

### The Agentic Loop (route.ts)

1. Widget sends `POST /api/chat` with the full conversation history
2. Route calls Claude (Sonnet) with 3 tools defined
3. If Claude returns `stop_reason: tool_use` → execute the tool(s) server-side, feed results back
4. Claude continues until `stop_reason: end_turn`
5. Route returns `{ text: string, actions: AgentAction[] }` as JSON
6. Widget renders the text (typewriter effect) + any action cards

Max 6 loop iterations to prevent runaway. Uses `claude-sonnet-4-6` — Sonnet is required for reliable tool-use decisions (Haiku is too inconsistent for autonomous tool calling).

### The Three Tools

| Tool | When Claude calls it | What it does |
|------|---------------------|--------------|
| `capture_lead` | Autonomously when it has name + email | Saves lead to `/data/leads.json`, sends Resend email to Soňa |
| `get_booking_link` | When visitor is ready to book | Builds Calendly URL with UTM params + name/email pre-filled |
| `answer_service_question` | When asked about pricing, layers, process, etc. | Returns authoritative answer from knowledge base |

### Action Cards (AgentWidget.tsx)

When `actions` come back with the response:
- `lead_captured` → green card: name, email, tier, notes, "Soňa has been notified"
- `booking_link` → blue card: "Book your slot →" button linking to pre-filled Calendly URL

### Lead Data Saved

```typescript
type LeadData = {
  name?: string
  email?: string
  company?: string
  project_type: 'new-site' | 'redesign' | 'ai-agent-addon' | 'layer03-upgrade' | 'full-stack'
  tier: 'starter' | 'studio' | 'premium' | 'unknown'
  budget?: string
  notes: string
  timestamp: string  // added by saveLead()
}
```

---

## Environment Variables

In `.env.local` (never commit this file):

```
ANTHROPIC_API_KEY=sk-ant-...       # Required — Claude API
RESEND_API_KEY=re_...              # Required for email — lead notifications to Soňa
RESEND_FROM=agent@lyveca.com       # Optional — defaults to onboarding@resend.dev
NOTION_API_KEY=ntn_...             # Required — saves leads to Notion CRM
NOTION_DATABASE_ID=...             # Required — Notion leads database ID
```

**Without RESEND_API_KEY:** leads still save to `/data/leads.json` locally and log to console. No email sent.

**Without NOTION_API_KEY:** Notion save is skipped, leads still go to email + local file.

**On Vercel:** paste all keys in Project Settings → Environment Variables. The file write won't work on serverless (no persistent filesystem) — Resend email + Notion are the primary storage.

**Email from address:** defaults to `onboarding@resend.dev` on Resend's free plan. To use your own domain, add it in Resend dashboard and set `RESEND_FROM=agent@yourdomain.com`.

---

## Knowledge Base Topics

The `answer_service_question` tool pulls from `src/data/agentix-knowledge.ts`.

Available topics: `pricing`, `layer01`, `layer02`, `layer03`, `process`, `about`, `timeline`, `tech-stack`

To update pricing, services, or any factual content — edit this file. The agent will use the updated content immediately (no redeploy needed in dev, redeploy required on Vercel).

---

## Extending for Client Projects (selling Layer 02)

When selling Layer 02 to a client, the implementation for their site replaces:

1. **`agentix-knowledge.ts`** → their business: services, pricing, FAQs, team, locations
2. **System prompt** in `route.ts` → their brand voice, what to qualify for, what action to drive
3. **`saveLead()`** in `leads.ts` → their CRM (HubSpot, Pipedrive), their email, their Notion
4. **`get_booking_link`** → their Calendly URL or any scheduling tool
5. **Widget design** → their brand colors, fonts, tone

The architecture stays identical. Only the content changes.

---

## Agent Behaviour Rules (system prompt)

- 2–3 sentences per response, one question per message
- Detects language: Slovak → Slovak, Czech → Czech, otherwise English
- Never includes URLs, markdown links, or bold formatting in text — plain text only
- Never announces tool calls — action cards render automatically in the UI
- For ANY question about Soňa Mášová / the studio — always calls `answer_service_question`, never answers from memory
- If a topic is not in the knowledge base — says "I'm not sure, but you can reach Soňa directly" and fires `get_booking_link`

---

## Git History

| Commit | What |
|--------|------|
| `4b84caa` | Initial chat widget (streaming, no tool use) — replaced |
| `643d2eb` | Rebuilt as autonomous agent with tool use, action cards, lead storage |
| `76b271e` | Fix markdown in agent responses; Resend email confirmed working |
| `eadf189` | Force agent to always use knowledge base, never answer from memory |
| `41e69fe` | Fallback to Soňa contact + booking link for unknown questions |
| `98bdf77` | Layer 03 AEO/GEO: FAQPage schema, Q&A llms.txt, robots.txt sitemap fix |
| `6aec18b` | Fix robots.txt and sitemap — move to src/app/ (Next.js 16 convention) |
| `f2a0e74` | Rename brand from AGENTIX AI to AGENSO across all files |
| `fdf493f` | Update README and LAYER02 docs |
| `ccbad99` | Add MCP Server — Layer 03 premium (get_pricing, get_service_info, book_meeting) |
| `ec48ce0` | Rename brand from AISOW to AGENSO across all files |
| `41463ef` | Update all URLs to sona-masova.vercel.app |
| `8b6a5ff` | Add MCP live demo — interactive playground in Chapter 5 |
| `70abb82` | Update docs — explain MCP live demo |
| `ab6ca6c` | Add MCP discoverability — /.well-known/mcp.json, llms.txt MCP section, link tags in head |
| `b16b546` | Add mobile responsiveness — compact nav, scrollable chapters, smaller MCP panels |
| `5d3ba99` | Rebrand from AGENSO to Soňa Mášová across all files |
| `864305a` | Update domain to sona-masova.vercel.app, fix knowledge base about text |
| `440b5d4` | Add Notion CRM integration — leads now save to Notion database |
| `d8b16b2` | Rebrand to LYVECA AI — studio name updated across all files, auto-open agent on scroll |
| `363e414` | Update all URLs to lyveca.com, enable indexing, remove company names from schema |
| `3f459eb` | Update docs — Cloudflare DNS migration, correct live URL and indexing status |
| `f75eec0` | Fix duplicate lead capture — remove capture_lead tool once lead is saved |
| `41ad81d` | Fix agent silent after lead capture — require text response in same turn |
| `8b0b6cf` | Improve lead capture timing — wait for company context before capturing |

## Infrastructure Setup (post-deploy, no code commits)

| Date | What |
|------|------|
| 2026-06-06 | Registered lyveca.com on Namecheap (€9.86/yr) |
| 2026-06-06 | Connected lyveca.com to Vercel — A Record @ → 216.198.79.1, CNAME www → cname.vercel-dns.com |
| 2026-06-06 | Added lyvecaai.vercel.app → lyveca.com 307 redirect in Vercel |
| 2026-06-07 | Google Search Console — domain verified via DNS TXT record, sitemap submitted |
| 2026-06-07 | Added www.lyveca.com to Vercel domains |
| 2026-06-07 | Resend domain setup — DKIM + SPF records added to Namecheap for lyveca.com (eu-west-1) |
| 2026-06-07 | Email forwarding: agent@lyveca.com → sona.masova23@gmail.com (Namecheap) |
| 2026-06-07 | RESEND_FROM=agent@lyveca.com set in Vercel environment variables |
| 2026-06-07 | Switched DNS to Cloudflare — added send MX record (feedback-smtp.eu-west-1.amazonses.com), CNAME www → cname.vercel-dns.com |
| 2026-06-07 | Updated Namecheap nameservers to cesar.ns.cloudflare.com + dahlia.ns.cloudflare.com |
| 2026-06-07 | Cloudflare DNS propagated and active — all 11 records verified DNS-only |
| 2026-06-07 | Cloudflare AI crawler setting: "Do not block (allow crawlers)" + robots.txt mode confirmed |
| 2026-06-07 | Resend domain verified ✓ — agent@lyveca.com live and sending (eu-west-1) |
| 2026-06-07 | End-to-end email flow tested — lead captured, Notion entry created, email received at sona.masova23@gmail.com from agent@lyveca.com |
| 2026-06-08 | DMARC record added — `_dmarc.lyveca.com` TXT `v=DMARC1; p=none; rua=mailto:sona.masova23@gmail.com` verified with dig |
| 2026-06-08 | Deleted 5 dead Namecheap MX records (eforward1-5.registrar-servers.com) from Cloudflare |
| 2026-06-08 | Cloudflare Email Routing set up — `sonamasova@lyveca.com` forwards to `sona.masova23@gmail.com` |
| 2026-06-08 | Bing Webmaster Tools — lyveca.com imported from Google Search Console, sitemap submitted, indexing requested |
| 2026-06-08 | sonamasova@lyveca.com email forwarding confirmed working — Gmail filter set to never spam |
| 2026-06-08 | LinkedIn account created with sonamasova@lyveca.com — company page creation blocked by LinkedIn 24h new account limit, retry 2026-06-09 |
| 2026-06-09 | X (Twitter) account created @LyvecaAI — profile set up with avatar, bio, lyveca.com link, first posts published |
| 2026-06-09 | Person schema added to layout.tsx — Soňa Mášová as named entity linked to Organization via founder/worksFor |
| 2026-06-09 | llms.txt contact email updated to sonamasova@lyveca.com |
| 2026-06-09 | avatar.png created (400×400 square) for social profile pictures — matches OG image style |
| 2026-06-09 | LinkedIn company page still blocked — LinkedIn requires 48h+ for new accounts, retry 2026-06-10 |
| 2026-06-10 | sameAs links added to Organization + Person schema — X (@LyvecaAI) and GitHub linked for entity graph corroboration |
| 2026-06-10 | FAQPage email corrected — sonamasova@lyveca.com replaces old sona.masova23@gmail.com in Soňa Mášová Q&A |
| 2026-06-10 | dev.to post published — first external backlink to lyveca.com from DA~90 domain (LyvecaAI account) |
| 2026-06-29 | Pricing restructured (CEE) + synced across knowledge base, MCP `get_pricing`, system prompt, llms.txt, JSON-LD, SEO layer — see PRICING.md |
| 2026-06-29 | 4-layer model adopted (01 Built · 02 Powered · 03 Found · 04 Used); MCP = Layer 04 |
| 2026-06-29 | Subpages added: `/services`, `/pricing`, `/about` (each own metadata + JSON-LD); dead nav fixed; sitemap updated; SubNav + SiteFooter components |
| 2026-06-29 | Docs consolidated: PLAN.md = single source of truth (Fable 5 + handoff as appendices); CONVERSATION.md + FABLE5_CONVO.md removed |
| 2026-06-30 | Deployed to production (lyveca.com) — new pricing, 4-layer model, subpages all live & verified |
| 2026-06-30 | Security headers added in `next.config.ts` (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) — live, ~A- grade. CSP deferred to post-redesign |
| 2026-06-30 | Footer set to honest pre-živnosť note (no business-registration claim); imprint TODO until živnosť registered |

Branch: `dev` → deployed to Vercel via `main`

> **Status & outstanding tasks now live in PLAN.md** (single source of truth). This file is technical/implementation reference only.

---

## What This Proves to Potential Clients

A visitor lands on the Soňa Mášová site, talks to the agent naturally, and without clicking "submit lead form" — their information is captured, Soňa is notified, and a pre-filled booking button appears. The client experiencing this IS the pitch for Layer 02.

The gap between this and a chatbot widget:
- **Chatbot:** responds to messages
- **This agent:** decides when to act, executes tools, produces outcomes (lead saved, meeting booked)

---

## MCP Live Demo (Layer 03 — Chapter 5)

`src/components/MCPPlayground.tsx` — interactive demo built into the scroll experience to show visitors how the MCP server works.

When a visitor clicks a tool button:
- **Left panel** shows the JSON request being sent to the server (typed out live)
- **Right panel** shows the server's response streaming back

This makes the invisible MCP mechanism visible. Instead of explaining what MCP does, the visitor experiences it directly — they become the AI for a moment, sending a real call to a real server and watching real data come back.

Available tools in the demo: `get_pricing`, `book_meeting`, `get_service_info` (topics: layer01, layer02, layer03, process, about).
