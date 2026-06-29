# LYVECA AI — Master Plan & Go-Forward
*Updated 2026-06-29. The single source of truth for status, strategy, and next steps. Pricing lives in PRICING.md; agent/technical details in LAYER02.md; site overview & how-to-run in README.md. The Fable 5 strategy session and prior session handoff are preserved as appendices at the bottom.*

---

## 0. Where things actually stand

**The product is built and ahead of schedule. The business has not started.**

- **Built & live (verified):** Layer 01 (AI-built site), Layer 02 (autonomous agent — lead capture, Notion CRM, Resend email, booking), Layer 03 (llms.txt, schema, robots, sitemap, **MCP server with 3 working tools**). Infrastructure complete (domain, DNS, email, analytics, GSC, Bing). lyveca.com is a strong live demo of all layers.
- **Not started:** the other two business pillars — **Lead Generation** (zero outbound ever sent) and **Monetization** (€0 revenue, every lead in `leads.json` is a test). No case studies, no testimonials, no signed clients.
- **Known gaps in the code/docs (June 29):**
  1. **Pricing strategy not implemented.** Live site (knowledge base + MCP `get_pricing` + agent system prompt + llms.txt) still serves OLD ranges (€1,200–1,500 etc.). The new CEE structure in PRICING.md — merged Studio, AI Visibility Upgrade, MCP, 2 retainers — exists only on paper.
  2. **Nav buttons dead** (`GalaxyExperience.tsx` — Services/Pricing/About are non-clickable `<span>`s) and the site is **one indexable page** (bad for the AEO story we sell).
  3. **Stale email** `sona.masova23@gmail.com` still in the agent's `about` knowledge.
  4. Pricing is a **researched hypothesis, not validated** — never price-tested on a real buyer.

**The one sentence that matters:** the product cannot get more ready; everything from here is selling. The critical path is **one paying client → one case study → that case study makes all other channels (LinkedIn, dev.to, Product Hunt) actually convert.**

---

## 1. Guiding principles (keep in force)

1. **Selling is the bottleneck, not the product.** Cap further product/polish at ~20% of time. A week with zero outreach is a failed week.
2. **Pilot pricing is the real launch price.** With 0 proof you cannot charge the standard list cold. Cold sequence: **free Audit → small paid pilot → case study → then list pricing.** (See PRICING.md §3.)
3. **Lead gen via personal LinkedIn (DMs only); brand content via company page + X.** A new company account has no reach and looks like spam. Stay low-profile (no face): screen-recordings of the agent/MCP are the content. DMs are private.
4. **Lead with interaction, not visibility.** The agent + MCP are provable on the call *today*. AI search citations take weeks-to-months — never promise them instantly.
5. **Never push to `main`/Vercel without explicit confirmation.** Doc-only changes stay on `dev`. Never commit `.env.local`; never expose key values.

---

## 2. The plan — three tracks, run in parallel

### TRACK A — Make the product match the strategy (buildable now; ~1 day; Claude can do)
*Stop the live site quoting abandoned prices and missing your best entry product, before any prospect sees it.*

- [ ] **A1 — Confirm final pricing** (USER — blocks A2). PRICING.md numbers are now locked pending your go-ahead.
- [ ] **A2 — Sync pricing to all 4 places:** `agentix-knowledge.ts`, MCP `get_pricing`, agent system prompt, `public/llms.txt`. Single source of truth = `agentix-knowledge.ts`.
- [ ] **A3 — Add Audit + AI Visibility Upgrade as real products** the agent and MCP can describe/sell (today they don't exist live).
- [ ] **A4 — Fix nav + build subpages** `/services`, `/pricing`, `/about` — fixes dead buttons AND multiplies indexable surface for AEO. Each page gets its own schema + llms.txt entry.
- [ ] **A5 — Fix stale email** in `agentix-knowledge.ts` (`about`) → `sonamasova@lyveca.com`.
- [ ] **A6 (optional, later) — Demo upgrades:** Cal.com direct booking (agent *books* the slot) + Stripe payment-link tool. Strong differentiators; do after A1–A5.

### TRACK B — Become legally & operationally sellable (USER; days 1–3)
- [ ] **B1 — Confirm/create živnosť** so you can invoice (blocks every close).
- [ ] **B2 — 1-page contract + invoice template** (50/50 terms).
- [ ] **B3 — Notion proposal 1-pager + briefing/intake form.**
- [ ] **B4 — Stripe account** (Slovak sole trader; unblocks A6).
- [ ] **B5 — Record the universal demo asset** (60–90s): Claude connector → `lyveca.com/api/mcp` → ask pricing → lead lands in Notion. Feeds every DM, post, proposal.

### TRACK C — Start the engine (USER; daily from day 1 — this is the whole game)
- [ ] **C1 — Prospect list of 50:** agencies (white-label), tech/SaaS (Layer 02/04 showcase), visible local brands. Skip low-signal targets.
- [ ] **C2 — Outbound templates** (LinkedIn DM + platform proposal). Hook = the free Audit finding.
- [ ] **C3 — 15–20 DMs/day** from personal LinkedIn + 3–5 proposals/day (nakoduj.to, Pretlak, Upwork, freelance.cz).
- [ ] **C4 — 3 posts/week** from company page + X. First post = the MCP/agent screen recording.
- [ ] **C5 — Every warm reply:** run the free Audit on THEIR site → offer a pilot (Upgrade €490 / Studio €990 / Premium €1,790) for a contractual case study + testimonial.
- [ ] **C6 — Retest AI discovery weekly** ("do you know lyveca ai") — an experiment, NOT a launch gate.

---

## 3. Sequencing — first 14 days

| Days | Focus | Tracks |
|---|---|---|
| **1–3** | Get sellable + product matches strategy | A1→A5, B1–B5 in parallel |
| **1–14 (daily)** | Outreach engine every day | C2→C5 |
| **4–10** | Demo upgrades + first warm replies → pilot proposals | A6, C5 |
| **Ongoing weekly** | Content + discovery retest | C4, C6 |

**Forcing metric (track weekly):** DMs sent / proposals sent / replies / calls booked / audits run / pilots closed. **If DMs sent = 0, the week failed** regardless of anything else.

**"Lyveca is a real player" =** 3 pilot case studies live → switch pilot→standard CEE pricing (PRICING.md Phase B) → raise (Phase C) → reintroduce international pricing (Phase D) at month 4–6.

---

## 4. Open decisions needed from you

1. **Green-light Track A** — sync the locked PRICING.md numbers into the live code? (Needs a `main` deploy eventually — I'll ask before pushing.)
2. **Track A6 now or later** — build Cal.com + Stripe demo upgrades before or after outreach starts?
3. **Adopt the new slogan** ("Websites built for humans — and for AI") + propagate the 4-layer naming to README/LAYER02/site copy?

---

## 5. Consolidated outstanding tasks (was split across LAYER02 + session handoff)

| Item | Priority | Notes |
|---|---|---|
| **Sync new pricing live** (Track A2/A3) | High | Live site still on old numbers |
| **Nav fix + subpages** (Track A4) | High | Dead buttons; one indexable page |
| **Fix stale email** (Track A5) | Med | `about` knowledge still old gmail |
| LinkedIn company page | High | Account exists; was blocked by new-account limit — retry |
| LinkedIn content | High | 3 posts/week; screen recording of site + agent |
| Share dev.to post on X | Med | Drives early engagement signals |
| Indie Hackers post | Med | Need 3–5 genuine comments first to earn access |
| AI search audit (weekly) | Med | Perplexity/ChatGPT: "do you know lyveca ai" |
| Product Hunt launch | Med | High-DA backlink + discovery; prepare listing |
| MCP registry listing | Low | Submit to Anthropic MCP directory when available |

---

## 6. What NOT to do (failure patterns)

- Don't add more product polish / rebrands (already 3 rebrands; near-zero marginal return).
- Don't fight the LinkedIn company-page battle — use the personal profile for DMs now.
- Don't treat the weekly AI-visibility test as a launch gate — slow experiment on a new domain.
- Don't quote the standard price list cold — pilot pricing until 3 case studies exist.
- Don't sell guaranteed AI citations — sell setup + measurement.

---

## 7. Operational reference (env, infra, presence)

**Env vars (names only — never commit values):** `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `RESEND_FROM=agent@lyveca.com`, `NOTION_API_KEY`, `NOTION_DATABASE_ID`. In `.env.local` + Vercel.

**Branch workflow:** `dev` = all work; `main` = Vercel production. Merge to main only when src/public/config change; doc-only stays on dev.

**Infrastructure (done):** lyveca.com on Namecheap, DNS on Cloudflare, Vercel hosting/auto-deploy, GSC verified + sitemap, Bing submitted, Cloudflare AI crawlers allowed, DMARC/DKIM/SPF set, email forwarding sonamasova@lyveca.com → sona.masova23@gmail.com, Resend domain verified (agent@lyveca.com).

**External presence:** X @LyvecaAI (live), dev.to/lyvecaaicom (live), GitHub Sonya2301/agentix-ai (public), LinkedIn company page (was blocked — retry), Indie Hackers (need comments first).

*Full historical context and the strategic reasoning behind this plan are preserved in the appendices below.*

---

# APPENDIX A — Session Handoff (archived from CONVERSATION.md, June 10 2026)

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


---

# APPENDIX B — Full Fable 5 Strategy Transcript (archived from FABLE5_CONVO.md)

# FABLE 5 — Conversation Transcript

*Saved verbatim. This is a conversation conducted with the Fable 5 model, covering LYVECA AI strategy, product audit, competitor pricing research, and the resulting pricing strategy.*

---

## USER

go to demo folder, there is CONVERSATION md file which covers previous convos, there is also READ md file which covers info about the website, and there is also LAYER md file which covers all the other information about the AI features we built in the website, here is also attached business plan, tell me what is missing in order to achieve the goals which were set, how we proceed further, how to get to the point we will be able to sell this service and lyveca AI will be a real player

## ASSISTANT

I've read CONVERSATION.md, README.md, LAYER02.md, checked data/leads.json, and compared everything against the business plan. Here's the honest assessment.

### TLDR: The product is ahead of plan. The business hasn't started yet.

You've built in ~6 weeks what the plan scheduled across 12 months — Layer 02 (live agent with tool use, Notion CRM, Resend) was planned for month 3–6, Layer 03 (MCP server, llms.txt, schema) for month 6–12. Both are live today. lyveca.com is a genuinely strong demo.

But the plan has three pillars — **Offer / Lead Generation / Monetization** — and only the first one exists. Every lead in leads.json is a test (your own emails, `@test.com`). Revenue is €0, and per the plan's own timeline you're at roughly day 40 of 90, where the first close was expected at days 30–45. The gap isn't knowledge or product. It's that **outbound has never started**.

### Gap analysis against the plan

| Plan requirement (Week 1–4) | Status |
| --- | --- |
| Upwork profile | ❌ Not created |
| nakoduj.to + Pretlak + freelance.cz profiles | ❌ Not created |
| Prospect list of 50 agencies/freelancers | ❌ Doesn't exist |
| 3 demo websites in different niches | ⚠️ Only 1 (lyveca.com itself) |
| Outbound message templates | ❌ Not written |
| 15–20 LinkedIn DMs/day | ❌ Zero sent |
| 3 LinkedIn posts/week | ❌ Zero (company page blocked) |
| Discovery calls | ❌ Zero booked |
| Proposal template (Notion 1-pager) | ❌ Doesn't exist |

And things the plan assumes but never lists, which you need before you can legally take money:

- **Business registration** — živnosť or s.r.o. in Slovakia, so you can invoice. Without this you can't close even if someone says yes tomorrow.
- **Contract + invoice templates** — the 50% deposit / 50% on delivery terms need a one-page agreement.
- **Briefing form** — the Notion intake form from the plan's Phase 1 Discovery.
- **Social proof** — zero testimonials, zero case studies. The site sells a service nobody has visibly bought yet.

### One strategic correction: LinkedIn

You've spent 3+ days fighting LinkedIn's new-account restriction on an account created with sonamasova@lyveca.com. This is the wrong battle. The plan's LinkedIn strategy works through a **personal profile with an existing network** — your real profile with 5+ years of Deloitte/Takeda/IBM history and real connections. A brand-new account has zero network, zero reach, and looks like spam when it DMs people. Company pages get almost no organic reach anyway; they're a checkbox, not a channel. Post and DM from your established personal profile starting today, and let the company page resolve whenever LinkedIn allows it.

### How to proceed — next 14 days

The critical path to "Lyveca is a real player" is one thing: **a first paying client**, because that converts the demo into a case study, and the case study is what makes everything else (LinkedIn content, dev.to, Product Hunt) convert.

**Days 1–3 — make yourself sellable:**

1. Set up živnosť paperwork (or confirm it exists), draft a 1-page contract + invoice template.
2. Create profiles on nakoduj.to, Pretlak, Upwork, freelance.cz — portfolio piece = lyveca.com with a 60-second screen recording of the agent capturing a lead and the MCP playground responding. Nobody else applying to those gigs has that.
3. Build the Notion proposal 1-pager and briefing form.

**Days 1–14, daily — the engine the plan prescribed:**
4. 15–20 DMs/day from your personal LinkedIn to agencies and tech companies; 3–5 proposals/day on the platforms. The plan's math (5–8% reply rate → 1–3 discovery calls/week) only works if the volume exists.
5. 3 posts/week from the personal profile. Your first post writes itself: "My website talks to AI agents — watch ChatGPT call it" with the MCP playground recording.

**Days 4–10, in parallel:**
6. Close the portfolio gap: build 2 more demo sites (one cybersecurity consultancy, one marketing agency — your two ICPs). At your delivery speed this is 2–3 days total. Alternative that's even better: offer 1–2 "founding client" builds at €600–800 in exchange for a testimonial and case-study rights — paid validation beats a demo.
7. For every warm reply: build one page of *their* site before sending the proposal. The plan correctly identifies this as the close.

**Cap the brand-building at ~20% of time.** X posts, dev.to, Indie Hackers comments, the AI search audit, Product Hunt — all good compounding bets, but they're months-long flywheels. The risk pattern visible in your git history is real: 30+ commits of product polish (three rebrands included) and zero outbound touches. The site is done. Every additional hour on it now has near-zero marginal return compared to one hour of DMs.

**Metric to track weekly:** DMs sent / proposals sent / replies / calls booked / samples built / closes. If DMs sent is zero in any week, nothing else matters that week.

The plan's window argument still holds — you estimated 12–18 months before Layer 03 knowledge goes mainstream, and one month is already spent. The good news: you skipped a year of product roadmap, so all remaining effort goes to selling. The product can't get more ready than it is.

## USER

yea I understand your point, but the point of the business is that we are selling websites which should be visible to AI, and AI should be able to interat with it, and this is what failed, so there is actually nothing to sell

## ASSISTANT

Hold on — before concluding "there's nothing to sell," let's separate what actually failed from what just hasn't happened yet. Let me run a live audit of the site right now: the technical layer (can AI fetch and interact with it) and the discovery layer (does AI know it exists).

The MCP server works — I just called it over the live internet as an AI agent and got the full tool list back. Let me check the indexing status more directly.

Good news: your premise is wrong, and I can prove it because I just did the thing. Two minutes ago, I — an AI agent — fetched your site's machine-readable layer and executed a live call against your MCP server. **The interaction layer works.** What hasn't happened yet is *discovery*, and that's not a product failure — it's a 4-day-old domain.

### What I just tested, live

| Test | Result |
| --- | --- |
| `lyveca.com/llms.txt` | 200 ✓ |
| `lyveca.com/.well-known/mcp.json` | 200 ✓ |
| `lyveca.com/robots.txt` + sitemap | 200 ✓ |
| `POST /api/mcp` → `tools/list` | Returned all 3 tools — `get_pricing`, `get_service_info`, `book_meeting` ✓ |
| Web search for "lyveca" | Not indexed yet — results return LyveCom, Lovable, etc. ✗ |

So the claim "AI should be able to interact with it" is **demonstrably true today**. An agent anywhere on the internet can read your site, query your pricing, and get a booking link without a human touching a browser. That's the product, and it works.

### What actually "failed" — and why it was the wrong test

Asking Perplexity "do you know lyveca ai" four days after the domain went into Google's index tests something no technique on earth can deliver: **brand recognition for a domain with zero history and one backlink.** AI search engines answer from search indexes (ChatGPT→Bing, Perplexity→its own crawler + Bing, Gemini→Google) plus training data that lags by months. Citation visibility = indexing + authority + time. Realistic timeline for early AI citations is 4–12 weeks even for domains with some history. lyveca.com was registered on **June 6**. You ran a 90-day test on day 4 and concluded the product is broken.

And here's the part that matters most for the business: **lyveca.com is the worst-case scenario, and your clients are the best case.** Your ICP — agencies, tech companies — have domains with years of accumulated authority. When you add llms.txt, schema, crawler permissions, and AEO structure to a 5-year-old domain, recrawling happens in days and citations can follow in weeks. Don't generalize from the one domain on the internet that's hardest to make visible: a brand-new one.

### What you're actually selling (and always were)

The honest pitch was never "ChatGPT will know your brand next week." It's three separable claims:

1. **"AI agents can interact with your site today"** — provable in 30 seconds on a sales call. The MCP call I just made *is* the demo. This works now.
2. **"Your site is structurally eligible to be cited"** — most sites aren't (blocked crawlers, no structured data). This is deliverable and verifiable on day one: schema validators, crawler hits in server logs, indexed pages.
3. **"Citation visibility grows over 60–90 days, and we measure it"** — this is exactly how SEO has been sold for 25 years. Nobody refunded SEO because rankings took 3 months. You sell the system plus measurement, not instant fame.

Two more things. First, check your **Cloudflare analytics** for GPTBot/ClaudeBot/PerplexityBot hits — if AI crawlers have already fetched lyveca.com, that's another proof point for the deck. Second, this "failure" is actually your best content asset: **document lyveca.com going from invisible to AI-cited, week by week, in public.** "I'm making a brand-new domain visible to AI search and posting the receipts" is a build-in-public series no Slovak competitor can copy, and every weekly update is proof-of-work for prospects watching.

So my previous assessment stands, reinforced: the product works, I just verified it from the outside as an AI agent. Retest discovery weekly (next: ~June 13 per your own plan) and treat it as a tracked experiment, not a launch gate. Meanwhile, the thing blocking revenue is still zero outreach — and now you have a live, externally-verified demo to put in every DM.

Sources: LyveCom, Lovable, Webstudio AI — the unrelated results currently outranking "lyveca," which is the indexing gap, not an interaction failure.

## USER

Few things - 1. So the claim "AI should be able to interact with it" is demonstrably true today. An agent anywhere on the internet can read your site, query your pricing, and get a booking link without a human touching a browser. That's the product, and it works. - how do we get a proof that AI can do this with the site] - for this claim, can you tell me how do we actually test it and make it visible to the client himself, 2. can we buy an existing domain and do another demo there 3. I understand that we should do it on my own linkedin, but i still work for corporate, can we do it without my face being included, and build the page for the LYVECA without the human face? 4.I want to have API for paying on the site, and for the AI to directly book the date, or something like that, is it possible? 5. we have to add underlying pages, cause top right buttons do not work 6. i wanted to check the pricing, if it make sense, with using exa AI, can you do research of competitors and see how much they charge in eastern europe f.e cause slovakia is not the only place i will be selling this

## ASSISTANT

Let me tackle these in order — first a quick look at the broken nav buttons in the code, then live competitor pricing research with Exa. Loading the Exa tools and checking the nav now.

All research done. Here are answers to all six, grounded in the code and live market data.

### 1. How to prove "AI can interact with the site" — visibly, to a client

The proof I ran earlier (curl) is for technical people. For clients, you make *them* do it with tools they recognize:

- **Claude connector demo (the strongest one):** In claude.ai or Claude Desktop → Settings → Connectors → add custom connector → `https://lyveca.com/api/mcp`. Then ask Claude: *"What does LYVECA charge for a Studio website?"* — and the client watches Claude call your MCP server and answer with your real pricing. On a sales call, have them do this on **their** account. They just watched a third-party AI product transact with your website.
- **ChatGPT test:** ask ChatGPT *"Read https://lyveca.com/llms.txt and tell me what this company sells and how I'd book a call."* It fetches and answers correctly. Same in Perplexity.
- **The before/after close:** run the identical test against the **prospect's own site** in front of them. Theirs fails or returns garbage; yours works. That contrast is the entire pitch in 60 seconds.
- **Crawler receipts:** check Cloudflare Analytics → traffic by bot — if GPTBot/ClaudeBot/PerplexityBot have already crawled lyveca.com, screenshot it. "AI companies are already reading my site" is a slide.
- **Record it once:** a 60–90s screen recording of the Claude connector demo + a lead landing in Notion is your universal asset for DMs, LinkedIn, X, and proposals.

### 2. Buying an aged domain for a second demo

Yes, and it's a cheap, smart experiment. Sources: ExpiredDomains.net, GoDaddy Auctions, Sedo, Dynadot — a clean aged domain runs €50–500. Check before buying: archive.org history (relevant, non-spammy past), backlink profile (no casino/pharma spam), and that it's still indexed. Caveats: Google partially devalues repurposed domains, so authority doesn't fully transfer — but an aged, already-indexed domain will get recrawled and picked up by AI search far faster than lyveca.com's cold start.

Even better framing: run it as a **controlled experiment** — same Layer 03 treatment on (a) brand-new lyveca.com and (b) the aged domain, track citation pickup weekly, publish the comparison. That's both your proof dataset and months of content. And the best version of an "aged domain demo" is a real client's existing site — which the productized offer in §6 gets you.

### 3. LinkedIn without your face, while employed

Yes, workable — with one honest caveat: **your name is already public.** It's in the Person schema, the FAQPage ("Who is Soňa Mášová?"), the footer, dev.to, and the Calendly link. So the realistic goal is *low-profile*, not anonymous. Practical setup:

- **Public content = LYVECA company page + X**, posting as the brand: screen recordings, demos, build-in-public threads. No face needed anywhere — your content is literally screen captures of Claude Code and the agent working, which performs well for a dev-tool-style brand.
- **Private outreach = your personal LinkedIn account, DMs only.** DMs are invisible to your employer and your feed. You never have to post a thing from your personal profile. This solves the reach problem (company pages can't DM) without exposure.
- **Check the legal side once:** under the Slovak Labour Code (§83), side business needs employer consent only when it competes with the employer's line of business — web design vs. pharma security almost certainly doesn't, but read your Takeda contract's conflict-of-interest clause so you know where you stand.

### 4. Payments API + AI booking the date directly — yes, both

- **Payments:** Stripe Checkout / Payment Links. The agent (and the MCP server) gets a new tool — `create_payment_link` — that generates a Stripe link for, say, the 50% Starter deposit. Client clicks, pays, you get a webhook. Works today, ~half a day to build, needs a Stripe account (supports Slovak sole traders — another reason to sort the živnosť). Fully agent-initiated payments (Stripe's Agent Toolkit, the OpenAI/Stripe Agentic Commerce Protocol) are emerging — great Layer 03 roadmap content, but link-based checkout is the honest, working version now.
- **Direct booking:** Calendly's API can't hard-book a slot (it only makes scheduling links — what you have now). **Cal.com** can — its API supports creating confirmed bookings programmatically. Switch booking from Calendly to Cal.com (free tier exists), and the MCP `book_meeting` tool goes from "here's a link" to **"Claude just put a meeting in my calendar."** That's a demo nobody in your market can show.

Both are upgrades to src/app/api/mcp/route.ts and the agent's tools — I can build them when you say go.

### 5. The broken nav buttons

Confirmed: "Services / Pricing / About" at GalaxyExperience.tsx:473-477 are `<span>`s with no handlers — decorative. Fix in two parts: quick win is scroll-to-chapter anchors (Services → chapter 3, Pricing → chapter 4, About → chapter 1). The right fix is real subpages — `/services`, `/pricing`, `/about` — because a single scroll page gives Google and AI engines almost no indexable surface; separate pages each get their own meta, schema, and llms.txt entries, which directly serves your Layer 03 story. I'd build both (anchors + pages). Say the word and I'll do it on `dev`.

### 6. Pricing research — CEE and Europe (live Exa data, June 2026)

**Layer 01 — websites.** Your €1,200–1,500 Starter sits at the *top* of the CEE mass market and at the *bottom* of the Western market:

| Market | Simple business site | Professional/custom | Source examples |
| --- | --- | --- | --- |
| Slovakia | €400–800 | €700–2,500; agencies €2,000–7,000 | TvorimeWeby, Webinžinierstvo, Digistartup (from €1,200 = their top tier) |
| Czechia | €600–1,200 (15–30k Kč) | €1,200–3,200 (30–80k Kč); agencies €2,000+ | vyrobawebu.cz, oxystudio |
| Poland | €90–430 (400–1,850 zł) | €430–1,900; premium agencies to €7,900 | StronyExpress, Soluma, Studio Kreatywnych Stron |
| Germany/Western EU | from €1,000 | €2,000–10,000+ | Byteweb (DE): sites from €1,000, custom from €5,000 |

Implication: in SK/CZ/PL you're selling a premium product into a price-sensitive market — the differentiator (AI layers, 5–7 days) has to carry it. For DACH/UK/international clients your pricing is a bargain. The plan's instinct to target international was right; the research confirms it.

**Layer 02 — your AI agent add-on at €1,500–2,500 is actually underpriced** for what it does. European market for agents that *take actions* (not FAQ bots): Lithuania €2,500–5,000 with CRM integration, Bulgaria from €1,800–2,800, France €3,000–10,000 for "agent with actions," Netherlands €8K–20K for single-purpose agents, Germany subscriptions €149–449/month. Recommendation: keep ~€1,500 as the CEE/founding-client price, quote **€2,500–3,500 internationally**, and add a managed option (~€150–250/mo) — there's clear market precedent for recurring agent revenue.

**Layer 03 — this is the big finding.** AEO/GEO is now a priced, established category: one-time audits €80–2,000; professional implementation of exactly your stack (llms.txt, schema, crawler config, answer-structure content) sells for **€1,500–3,000 standalone**, full rollouts €5,000–25,000 (Context Studios in Germany — who, validation alert, run your exact playbook including 22 public MCP tools); monitoring retainers €350/mo (AEOScore) up to €1,000–10,000/mo for mid-market agencies. Your MCP integration at €2,000–3,500 is comfortably within market.

Two pricing actions fall out of this:

1. **Productize an "AI Visibility Sprint" at €1,500–2,500** — audit + llms.txt + schema + crawler config + before/after report, delivered in a week, **for businesses that already have a website**. This is probably your easiest first sale: no rebuild decision needed, market-validated price, every business with an existing site is a prospect, and it's an upsell path into the full rebuild later. Your current offer makes people buy a whole new website to get the AI layer — this unbundles it.
2. **Add the recurring layer:** AI visibility monitoring at €250–350/mo on top of your maintenance retainer. Validated by AEOScore's Guard product, and it compounds toward the €5K MRR goal far more reliably than one-off builds.

**Suggested order from here:** I build the subpages + nav fix and the Cal.com/Stripe MCP tools on `dev` (your call to confirm), you record the Claude-connector demo once they're live, and the AI Visibility Sprint goes on the new `/services` page as the entry-level offer.

## USER

create a pricing strategy based on what you know

## ASSISTANT

I'll build the full strategy and save it as a doc in the repo (dev branch, doc-only — not committing until you say so).

**[Wrote PRICING.md — 125 lines, international-calibrated version]**

```markdown
# LYVECA AI — Pricing Strategy
*Drafted 2026-06-10. Based on live Exa market research (CEE + Western EU, June 2026), the business plan, and current product state.*

---

## 1. Positioning Logic

Market data places LYVECA between two worlds:

| | CEE mass market | LYVECA | Western EU agencies |
|---|---|---|---|
| Basic business site | €400–800 | — | from €1,000–2,000 |
| Professional/custom site | €700–2,500 | €1,490–4,990 | €2,000–10,000+ |
| AI agent (takes actions) | rare | €1,990–2,990 | €3,000–10,000 |
| AEO/GEO implementation | almost nonexistent | €1,490 sprint | €1,500–8,000 |

**Conclusion:** LYVECA does not compete on price in CEE (impossible — €79 sites exist) and does not need to. The pricing is calibrated for **international buyers** (DACH, UK, US, Nordics) where it reads as a bargain, while CEE deals happen through founding-client discounts, not a cheaper list.

**One public price list, in EUR, fixed prices (not ranges).** Transparent pricing is itself a differentiator (most agencies hide behind "request a quote") and fixed numbers signal a productized service. Ranges invite negotiation; fixed prices invite a yes/no.

---

## 2. The Product Ladder

Ordered by commitment level. Each rung is an upsell path to the next.

### Rung 0 — AI Visibility Audit — **€190** (or free in outreach)
The wedge. Test prospect's site across ChatGPT, Perplexity, Claude + crawler config + schema check. PDF report, 10 prioritized findings, 48h delivery.
- Market: €80–300 (farandwide €80, audit tier €750–2,000)
- **In cold outreach the headline finding is free** ("ChatGPT can't find you — here's the screenshot"), full report is €190 credited against any other purchase.
- Purpose: not revenue — pipeline. Every audit ends with a Sprint or build proposal.

### Rung 1 — AI Visibility Sprint — **€1,490** (one-time, 1 week)
For businesses that **already have a website**. No rebuild needed — the unbundled Layer 03:
llms.txt + Schema.org/JSON-LD + AI crawler permissions + answer-structure fixes on top 5 pages + before/after verification report.
- Market: professional AEO implementation sells €1,500–3,000 standalone (AEOScore sprint €1,500–3,000, Context Studios guided €5,000–10,000)
- **This is the easiest first sale in the catalog** — biggest addressable market (every business with a site), no rebuild decision, validated price point.

### Rung 2 — Website builds (Layer 01, always includes Layer 03 basics)
| Tier | Price | Includes |
|---|---|---|
| **Starter** | **€1,490** | 5–7 day build, all 4 phases, llms.txt + schema + AI crawlers included |
| **Studio** | **€2,990** | Starter + priority delivery + strategy call + full AEO/GEO content optimization |
| **Premium** | **€4,990** | Studio + custom design + AI agent (Layer 02) included + 2 extra revisions + 1 month maintenance free |

Premium exists primarily as an **anchor** — it makes Studio look reasonable and bundles the agent so the add-on feels discounted by comparison.

### Rung 3 — AI Agent add-on (Layer 02) — **€1,990 setup + €190/mo managed**
Embedded autonomous agent: lead qualification, knowledge base, booking, CRM, email notifications.
- Market: action-taking agents €1,800–10,000 across EU (BOVO €3,000–10,000, Lithuania €2,500–5,000 w/ CRM); managed chatbot subscriptions €149–449/mo (Lomageek DE)
- The €190/mo is **not optional in practice**: it covers API tokens, monitoring, knowledge-base updates, monthly conversation report. Frame as "the agent's salary — €6/day for a 24/7 employee."
- International quote: €2,990 setup. CEE/founding: €1,990.

### Rung 4 — MCP Integration (Layer 03 premium) — **€2,490**
MCP server, agent-callable tools, discovery manifest, Cal.com direct booking, Stripe payment link tool. For tech/SaaS clients.
- Nobody in CEE sells this. Context Studios (DE) charges €10,000–25,000 for full rollouts. €2,490 is deliberately aggressive to win lighthouse case studies; raise after 2–3 delivered.

### Rung 5 — Retainers (the path to MRR)
| Plan | Price | Includes |
|---|---|---|
| **Care** | €150/mo | Patches, backups, updates, uptime |
| **Care+** | €250/mo | Care + content updates + SEO monitoring |
| **Visibility Guard** | €350/mo | Care+ + monthly AI-visibility re-audit, citation tracking (ChatGPT/Perplexity/Claude), delta report |

- Visibility Guard is market-validated at exactly €350/mo (AEOScore Guard).
- **3-month minimum on all retainers.** No month-to-month.

---

## 3. Founding Client Program (months 1–2 only)

The cold-start problem: zero case studies. Solve it with explicit, time-boxed scarcity — never silent discounting.

- **First 3 clients: −30%** (Starter €990, Studio €1,990, Sprint €990)
- In exchange (contractual): named case study + testimonial + permission to show before/after metrics
- Publicly framed: "3 founding slots — June 2026" — creates urgency, explains the discount, protects the list price.
- After slot 3, the discount **dies publicly and visibly** (post about it).

---

## 4. Terms & Rules

1. **50% deposit / 50% on delivery.** No work before deposit. (Standard across all researched CEE providers.)
2. **Never discount price — adjust scope.** "Below budget? Let's remove a page / start with the Sprint." The only exception is the founding program.
3. All prices net of VAT, EUR only, Stripe payment link on every invoice.
4. Revisions: 2 rounds included, then €250/round — stated in the proposal, prevents scope death-spirals.
5. Rush delivery (48–72h): +40%. Speed is the product; rushing it costs extra.
6. Every proposal shows **all three layers** with prices, even when only Layer 01 is being bought — plants the upsell roadmap.

---

## 5. Path to €5K/month (the math)

| Month | Mix | One-time | MRR | Total/mo |
|---|---|---|---|---|
| 1 | 2 founding deals (1 Sprint €990 + 1 Starter €990) | €1,980 | 0 | ~€2,000 |
| 2 | 1 founding Studio €1,990 + 1 Sprint €1,490 + 2 retainers start | €3,480 | €300 | ~€3,800 |
| 3 | 1 Studio €2,990 + 1 Agent add-on €1,990 + retainers grow | €4,980 | €700–900 | **€5,700–5,900** |
| 6 (target) | 1–2 builds/mo + Sprint flow | €3,500–5,000 | €1,500–2,000 | €5,000–7,000 |

Key insight: **Sprints fill the gaps between builds** (1 week, no rebuild decision, huge market) and **retainers are the floor** — at 8–10 retainer clients (€1,800–2,500 MRR), half the €5K goal is guaranteed before any new sale in a given month.

12-month client LTV under this ladder: Sprint €1,490 → Starter/Studio build → Agent €1,990+€190/mo → MCP €2,490 → Guard €350/mo ≈ **€9,500–13,500**, consistent with the business plan's €8,150–16,900 estimate.

---

## 6. Price Increases

- After 3 published case studies: builds +20% (Starter €1,790, Studio €3,490), Sprint €1,790.
- After 5 MCP deliveries or first inbound international lead: MCP €3,490.
- Review every quarter against the AEO market — it is repricing upward fast (US retainers already $2K–30K/mo).

---

## 7. Implementation Checklist (when adopted)

Pricing lives in **three places** that must stay in sync — single source of truth is `src/data/agentix-knowledge.ts`:

- [ ] `src/data/agentix-knowledge.ts` — agent's `pricing` topic (Layer 02 answers)
- [ ] MCP `get_pricing` tool response — `src/app/api/mcp/route.ts`
- [ ] Pricing chapter on site — `src/components/GalaxyExperience.tsx` (and future `/pricing` page)
- [ ] llms.txt pricing section — `public/llms.txt`
- [ ] Proposal template (Notion) — same numbers
- [ ] Add Sprint + Audit as new offerings to site, knowledge base, and MCP tools
```

Done — full strategy saved to PRICING.md (on `dev`, not committed yet). The core decisions:

### The strategy in brief

**Positioning: price for international, discount for CEE — never the reverse.** The research showed your prices sit above the CEE mass market (€400–800 basic sites) but at the floor of the Western market (€2,000–10,000). So: one public price list in EUR, calibrated for DACH/UK/US buyers, and CEE deals happen through a *named, time-boxed* founding program — not a cheaper list that caps you forever.

**Fixed prices, not ranges.** "€1,200–€1,500" invites negotiation; "€1,490" invites a yes or no. Transparent fixed pricing is also rare among agencies (most hide behind "request a quote") — it's a differentiator the Slovak research confirmed.

**The product ladder** — biggest change is two new entry products *below* the website build:

| Rung | Product | Price | Why |
| --- | --- | --- | --- |
| 0 | AI Visibility Audit | €190 (headline finding free in outreach) | Pipeline, not revenue — every audit ends in a proposal |
| 1 | **AI Visibility Sprint** | €1,490, 1 week | Layer 03 unbundled for sites that already exist — your easiest first sale, market-validated at €1,500–3,000 |
| 2 | Builds: Starter / Studio / Premium | €1,490 / €2,990 / €4,990 | Premium is the anchor and bundles the agent |
| 3 | AI Agent add-on | €1,990 + **€190/mo managed** | Agents-with-actions sell for €3K–10K in EU — you're still cheap |
| 4 | MCP Integration | €2,490 | Deliberately aggressive vs Context Studios' €10K–25K; raise after 3 deliveries |
| 5 | Retainers: Care / Care+ / **Visibility Guard** | €150 / €250 / €350/mo | Guard is validated at exactly €350/mo by AEOScore |

**Cold-start solved with scarcity, not silent discounts:** first 3 clients get −30% in exchange for a contractual case study + testimonial, publicly framed as "3 founding slots — June 2026," and the discount dies visibly after slot 3.

**The €5K math:** Sprints fill gaps between builds (1-week delivery, every existing website is a prospect), and retainers build the floor — at 8–10 retainer clients you have €1,800–2,500 MRR guaranteed before any new sale that month. Realistic month-3 total under this ladder: ~€5,700–5,900.

**Hard rules:** 50/50 payment, never discount price (adjust scope instead), 2 revision rounds then €250/round, rush delivery +40%, every proposal shows all three layers even if they're only buying one.

One operational note: pricing currently lives in three places that must stay in sync — agentix-knowledge.ts (agent answers), the MCP `get_pricing` tool, and the site's pricing chapter — plus llms.txt. The checklist at the bottom of PRICING.md covers all of them. When you confirm the numbers, I'll update all four in one pass, and the Sprint/Audit products should go into the new `/pricing` and `/services` pages when I build the nav fix.

## USER

can we make this only for CEE, cause i will start (not stay) in slovakia, I have also 0 case studies on real people and companies

## ASSISTANT

Right — that changes the calibration meaningfully. CEE-first with zero case studies means lower entry points, a pilot program doing the heavy lifting, and a staged path back up to the international list. Czech data point worth knowing: Czechia actually pays *more* than Slovakia (professional sites 30–80k CZK ≈ €1,200–3,200), so "CEE" isn't uniformly cheap. Rewriting the strategy now.

**[Rewrote PRICING.md — 145 lines, CEE-launch version]**

```markdown
# LYVECA AI — Pricing Strategy (CEE Launch)
*Drafted 2026-06-10. Calibrated for starting in Slovakia/CEE with zero case studies. Based on live Exa market research (June 2026). International pricing is Phase 3 — see §7.*

---

## 1. Positioning Logic — CEE Reality

| Market | Basic site | Professional/custom | Agency tier | Notes |
|---|---|---|---|---|
| Slovakia | €400–800 | €700–2,500 | €2,000–7,000 | Commodity floor at €79–499 exists |
| Czechia | €600–1,200 | **€1,200–3,200** | €2,000+ | Pays more than SK — priority market #2 |
| Poland | €90–430 | €430–1,900 | up to €7,900 | Most price-sensitive, deprioritize |
| AI agents (CEE/Baltics) | — | €500–2,500 simple/RAG | €2,500–5,000 w/ CRM | Lithuania, Bulgaria data |
| AEO/AI visibility (SK) | €60 (SlovakNET) | ~nonexistent | — | wooacademy sells llms.txt only |

**Three rules fall out of this:**
1. **Sit at the top of the freelancer band, below the agency band** (€1,000–2,500 sweet spot). The €79-site crowd is not competition; agencies are slower and don't have the AI story.
2. **Zero case studies = the first 3 deals buy proof, not margin.** Pilot program (§3) is the actual launch pricing; the list below is what pilots graduate into.
3. **Fixed prices, published.** Transparency is rare in SK (most agencies hide pricing) and itself a differentiator. Fixed numbers, not ranges — ranges invite haggling, which CEE buyers will do anyway; don't open the door.

All prices EUR (Slovakia is eurozone; quote CZK equivalent in Czech proposals). Net prices — as non-VAT-payer (živnosť under turnover threshold), prices are final, which undercuts VAT-registered agencies by 23% in effective cost to small clients. Say this in proposals.

---

## 2. The CEE Price List (standard — after pilot slots fill)

### Rung 0 — AI Visibility Audit — **€90** (free headline finding in outreach)
Test their site in ChatGPT/Perplexity/Claude + crawler + schema check. PDF, 10 findings, 48h.
- The DM hook is free: *"I asked ChatGPT about your company — here's what it said (nothing). Screenshot attached."* Full report €90, credited against any purchase.
- Benchmark: SlovakNET sells basic AI SEO from €60; farandwide report €80. €90 is in-market.

### Rung 1 — AI Visibility Sprint — **€890** (one-time, 1 week)
For businesses that **already have a website** — llms.txt + Schema.org JSON-LD + AI crawler permissions + answer-structure fixes on top 5 pages + before/after report.
- Nobody in CEE sells this as a package. Western price is €1,500–3,000; €890 is the CEE-adjusted wedge.
- **Easiest first sale in the catalog**: no rebuild decision, 1-week delivery, every business with a site qualifies. Sells especially well to *agencies* as white-label (they resell at 2×).

### Rung 2 — Website builds (Layer 01, Layer 03 basics always included)
| Tier | Price | Includes |
|---|---|---|
| **Starter** | **€1,190** | 5–7 day build, all 4 phases, llms.txt + schema + AI crawlers included |
| **Studio** | **€2,190** | Starter + priority delivery + strategy call + full AEO/GEO content optimization |
| **Premium** | **€3,490** | Studio + custom design + AI agent (Layer 02) included + 2 extra revisions + 1 month maintenance free |

- Starter sits exactly at SK "kompletné riešenie" tier (Digistartup od €1,200) and bottom of CZ professional band — defensible, not premium-shock.
- Premium is the **anchor**: makes Studio look reasonable and makes the €1,490 agent add-on feel discounted (it's "included" up there).

### Rung 3 — AI Agent add-on (Layer 02) — **€1,490 setup + €149/mo managed**
Embedded autonomous agent: lead qualification, knowledge base, booking, CRM, email notifications.
- CEE benchmarks: Lithuania €2,500–5,000 with CRM integration; Bulgaria from €1,800. €1,490 undercuts both while German managed-bot subscriptions (€149–449/mo) validate the monthly.
- €149/mo is **effectively mandatory**: API tokens, monitoring, knowledge updates, monthly conversation report. Pitch: *"a 24/7 employee for €5 a day."*

### Rung 4 — MCP Integration (Layer 03 premium) — **€1,890**
MCP server, agent-callable tools, discovery manifest, direct booking (Cal.com), payment links (Stripe). For tech/SaaS clients only — don't pitch to local SMEs.
- Nobody in CEE sells this at all. Priced to win lighthouse case studies; this number rises fastest later (§7).

### Rung 5 — Retainers (the MRR floor)
| Plan | Price | Includes |
|---|---|---|
| **Care** | €99/mo | Patches, backups, updates, uptime |
| **Care+** | €169/mo | Care + content updates + SEO monitoring |
| **Visibility Guard** | €249/mo | Care+ + monthly AI-visibility re-audit, citation tracking, delta report |

- SK maintenance market is €30–100/mo (Adorea €49/mo) — Care at €99 is top-of-market, justified by the AI layer. Guard has no CEE competitor (Western benchmark: €350/mo).
- **3-month minimum, all plans.** No month-to-month.

---

## 3. Pilot Program — the real launch pricing (first 3 clients)

With zero case studies, the discount is not generosity — it's payment for proof. Explicit, contractual, time-boxed:

| Pilot deal | Price (−40%) | They give back |
|---|---|---|
| Sprint | **€490** | Named case study + testimonial + before/after metrics rights |
| Starter build | **€690** | Same + screen-recording rights for content |
| Studio build | **€1,290** | Same + a referral intro to 2 contacts |

- Publicly framed: **"3 pilot slots — June/July 2026"** on the site and in outreach. Scarcity is real (capacity is real), explains the price, protects the list.
- Pilot retainers at 50% for 3 months (Care €49, Guard €129) — gets the MRR engine started.
- When slot 3 closes, **announce it** ("pilot program closed, standard pricing from August") — the close itself is a post and a price-credibility signal.
- Pilot targets should be *strategic*: 1 agency (white-label channel), 1 tech/SaaS company (Layer 02/03 showcase), 1 visible local brand (recognition). A kebab shop testimonial doesn't sell a €2,190 Studio site; pick pilots that look like the clients you want.

---

## 4. Terms & Rules

1. **50% deposit / 50% on delivery.** No work before deposit — pilots included.
2. **Never discount price — adjust scope.** Below budget? Remove pages, or start with the Sprint. Pilots are the only exception, and they're a program, not a discount.
3. Revisions: 2 rounds included, then €190/round — stated in every proposal.
4. Rush delivery (48–72h): +40%. Speed is the product; rushing it costs extra.
5. Every proposal shows **all three layers with prices**, even when only Layer 01 is bought — plants the upsell roadmap.
6. White-label for agencies: standard prices −15%, no public credit, agency resells at their margin. (73% of agencies outsource builds — this is the volume channel.)

---

## 5. Path to €5K/month at CEE prices (honest math)

| Month | Mix | One-time | MRR | Total/mo |
|---|---|---|---|---|
| 1 | 2 pilots (Sprint €490 + Starter €690) | €1,180 | €50 | ~€1,200 |
| 2 | Pilot Studio €1,290 + Sprint €890 + Starter €1,190 | €3,370 | €250 | ~€3,600 |
| 3 | Studio €2,190 + Agent €1,490 + Sprint €890 | €4,570 | €450 | **~€5,000** |
| 4–6 | 1–2 builds + 1–2 sprints/mo, retainers compound | €3,000–4,500 | €800–1,400 | €4,500–6,000 |

- CEE prices mean roughly **2× the deal volume** vs the international list for the same revenue — that's the cost of starting local, and the reason Phase 3 exists.
- Sprints are the volume filler (1 week each, huge market); retainers are the floor — at 10 retainer clients (€1,200–1,800 MRR) a third of the goal is locked before any sale that month.
- 12-month client LTV on this ladder: Sprint €890 → build €1,190–2,190 → Agent €1,490 + €149/mo → Guard €249/mo ≈ **€6,500–9,500**.

---

## 6. Sales framing per rung (what to actually say)

- **Audit → Sprint:** "ChatGPT answers 2.5 billion prompts a day and recommends your competitors, because it can't read your site. One week, €890, and it can."
- **Sprint → Build:** "Your site is now readable by AI. It's still slow/dated for humans — here's what a rebuild fixes."
- **Build → Agent:** "Your site captured 0 leads last night. With the agent it qualifies visitors and books meetings while you sleep — €5/day."
- **Agent → MCP:** (tech clients only) "AI agents are becoming buyers. Your site can be the first in your industry they can actually transact with."
- **Anything → Guard:** "AI search results shift monthly. Guard tells you the moment you lose a citation — and gets it back."

---

## 7. Phase Transitions — when prices change

| Phase | Trigger | Action |
|---|---|---|
| **A — Pilot** (now) | — | §3 pricing, 3 slots, contractual case studies |
| **B — CEE standard** (slot 3 closed) | 3 case studies live on site | §2 list applies, announce pilot closure publicly |
| **C — CEE raise** | 5+ delivered projects, steady pipeline | Builds +20% (Starter €1,490, Studio €2,690), Sprint €1,190 |
| **D — International** (target: month 4–6) | First inbound international lead OR 2 strong English case studies | Reintroduce international list: Starter €1,490 / Studio €2,990 / Premium €4,990, Sprint €1,490, Agent €2,990+€190, MCP €2,490, Guard €350. CEE keeps Phase C prices — two-market pricing by quote, one public list (international) once mix shifts |

Czechia note: Czech buyers pay €1,200–3,200 for professional sites — quote Czech deals at CEE list **without** hesitation or extra discounting; if anything, CZ is where Phase C lands first.

---

## 8. Implementation Checklist (when adopted)

Pricing lives in several places that must stay in sync — single source of truth is `src/data/agentix-knowledge.ts`:

- [ ] `src/data/agentix-knowledge.ts` — agent's `pricing` topic (Layer 02 answers)
- [ ] MCP `get_pricing` tool — `src/app/api/mcp/route.ts`
- [ ] Pricing chapter on site — `src/components/GalaxyExperience.tsx` (and future `/pricing` page)
- [ ] `public/llms.txt` pricing section
- [ ] Proposal template (Notion) — same numbers
- [ ] Add Audit + Sprint as products: site, knowledge base, MCP tools
- [ ] Add "3 pilot slots" banner/section to site while Phase A is open
```

Rewritten — PRICING.md is now a CEE-launch strategy. What changed and why:

### The key moves

**Pilot program replaces the founding discount as the real launch pricing.** With zero case studies, your first 3 deals are buying proof, not margin — so it's explicit and contractual: Sprint **€490**, Starter **€690**, Studio **€1,290** (−40%), in exchange for a named case study, testimonial, and metrics rights. Publicly framed as "3 pilot slots — June/July 2026," and when slot 3 closes you *announce* the closure — that post is itself a credibility signal. One important detail: pick pilots strategically — 1 agency (white-label channel), 1 tech/SaaS company (shows off Layers 02/03), 1 visible local brand. A kebab-shop testimonial won't sell a €2,190 Studio site later.

**The standard CEE list (what pilots graduate into):**

| Product | Price |
| --- | --- |
| AI Visibility Audit | €90 (headline finding free in DMs) |
| AI Visibility Sprint | €890 |
| Starter / Studio / Premium build | €1,190 / €2,190 / €3,490 |
| AI Agent add-on | €1,490 + €149/mo managed |
| MCP Integration | €1,890 |
| Care / Care+ / Visibility Guard retainers | €99 / €169 / €249/mo |

This sits at the top of the Slovak freelancer band, below agencies — the €79-site crowd isn't your competition and you don't chase them. The Sprint at €890 has literally no CEE competitor (wooacademy sells llms.txt alone; SlovakNET sells €60 audits).

**Honest €5K math at CEE prices:** it works by month 3 (~€5,000) but requires roughly **2× the deal volume** the international list would need — that's the cost of starting local, and it's also the argument baked into the doc for Phase D: reintroducing the international list (Starter €1,490, Studio €2,990, Agent €2,990) at month 4–6, triggered by 2 strong English case studies or the first inbound international lead. You start in Slovakia; the pricing is built to leave with you.

**Two CEE-specific edges worth using in proposals:** as a non-VAT-payer your prices are final — effectively 23% cheaper than VAT-registered agencies for small clients. And Czechia pays *more* than Slovakia (€1,200–3,200 professional band), so quote Czech deals at full list without flinching — CZ is likely where your first price raise lands.

The doc also includes per-rung sales lines (§6) and the sync checklist (§8) — pricing currently lives in the knowledge base, the MCP tool, the site chapter, and llms.txt, so when you confirm these numbers I'll update all four in one pass, including adding the Audit and Sprint as new products the agent can sell.

## USER

can we save this conversation word to word?

## ASSISTANT

*Failed to authenticate. API Error: 401 The socket connection was closed unexpectedly.*

## USER

can we save this conversation word to word?

## ASSISTANT

*There's an issue with the selected model (claude-fable-5[1m]). It may not exist or you may not have access to it.*

## USER

can you swit model to opus 4.8

## ASSISTANT

*There's an issue with the selected model (claude-fable-5[1m]). It may not exist or you may not have access to it.*

## USER

HEY

## ASSISTANT

*There's an issue with the selected model (claude-fable-5[1m]). It may not exist or you may not have access to it.*

---

*End of transcript. The Fable 5 session became unavailable (model access / 401 errors) before it could save the conversation; this file was saved afterwards in an Opus 4.8 session.*
