# AGENTIX AI

> AI web studio building websites that work for both human visitors and AI agents.

Live: [agentix-ai.vercel.app](https://agentix-ai.vercel.app) · Repo: [github.com/Sonya2301/agentix-ai](https://github.com/Sonya2301/agentix-ai)

---

## What This Is

Portfolio and business website for AGENTIX AI — a solo AI web studio based in Bratislava, Slovakia. The site itself is a demonstration of all three service layers:

- **Layer 01** — Built with AI tools (Claude Code), delivered fast
- **Layer 02** — Book a call via Calendly integration
- **Layer 03** — Agent-friendly: `llms.txt`, Schema.org JSON-LD, AI crawler permissions, auto-generated sitemap

---

## The Experience

A Three.js scroll-driven galaxy animation with 6 content chapters:

| Scroll | Chapter |
|--------|---------|
| 0–15% | Loading circle → galaxy spiral forms |
| 15–35% | Brand reveal — *Agentix AI* |
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
| Vercel | Hosting + auto-deploy |

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/Sonya2301/agentix-ai.git
cd agentix-ai

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Metadata, Schema.org JSON-LD, fonts
│   ├── page.tsx            # Main page + SEO semantic HTML layer
│   ├── globals.css         # CSS variables, fonts, animations
│   └── sitemap.ts          # Auto-generated sitemap
├── components/
│   ├── GalaxyExperience.tsx  # Three.js galaxy + all scroll chapters
│   └── GalaxyWrapper.tsx     # Next.js dynamic import wrapper (ssr: false)
public/
├── llms.txt                # AI agent sitemap (Layer 03)
└── robots.txt              # AI crawler permissions (Layer 03)
```

---

## Layer 03 — AEO/SEO Setup

This site is built to be visible to both traditional search engines and AI agents.

| File | Purpose | URL |
|------|---------|-----|
| `llms.txt` | Describes the site for AI agents | `/llms.txt` |
| `robots.txt` | Explicitly allows GPTBot, ClaudeBot, PerplexityBot | `/robots.txt` |
| `sitemap.ts` | Auto-generated XML sitemap | `/sitemap.xml` |
| Schema.org JSON-LD | Organization + Service structured data | In `<head>` |

**AI crawlers explicitly allowed:** GPTBot, ClaudeBot, PerplexityBot, GoogleExtendedBot, Applebot-Extended, cohere-ai

---

## Contact

- Email: sona.masova23@gmail.com
- Book a call: [calendly.com/sona-masova23](https://calendly.com/sona-masova23)
- Location: Bratislava, Slovakia
