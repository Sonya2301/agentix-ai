# Layer 02 — AI-Powered Websites
## Implementation Notes — AGENSO

---

## What Was Built

A real autonomous AI agent embedded in the AGENSO website. Not a chatbot widget — an agent that uses tools to act. When a visitor provides their name and email through natural conversation, the agent autonomously captures their lead, saves it, and sends an email notification. When they're ready to book, it generates a pre-filled Calendly link and renders it as a button card.

This implementation on the AGENSO site serves as a **live demo** of the Layer 02 product being sold to clients.

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
RESEND_FROM=agent@yourdomain.com   # Optional — defaults to onboarding@resend.dev
```

**Without RESEND_API_KEY:** leads still save to `/data/leads.json` locally and log to console. No email sent.

**On Vercel:** paste the same keys in Project Settings → Environment Variables. The file write won't work on serverless (no persistent filesystem) — Resend becomes the only storage. Add a database (Vercel KV, Postgres, Notion API) for production lead storage.

**Email from address:** defaults to `onboarding@resend.dev` on Resend's free plan. To use your own domain, add it in Resend dashboard and set `RESEND_FROM=agent@aisow.ai`.

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
- For ANY question about AGENSO — always calls `answer_service_question`, never answers from memory
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
| `41463ef` | Update all URLs to agen-so.vercel.app |
| `8b6a5ff` | Add MCP live demo — interactive playground in Chapter 5 |

Branch: `dev` → deployed to Vercel via `main`

---

## What This Proves to Potential Clients

A visitor lands on the AGENSO site, talks to the agent naturally, and without clicking "submit lead form" — their information is captured, Soňa is notified, and a pre-filled booking button appears. The client experiencing this IS the pitch for Layer 02.

The gap between this and a chatbot widget:
- **Chatbot:** responds to messages
- **This agent:** decides when to act, executes tools, produces outcomes (lead saved, meeting booked)
