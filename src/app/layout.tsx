import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "../components/CookieBanner";
import AgentWidget from "../components/AgentWidget";
import ScrollReveal from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "LYVECA AI — Websites built for humans. And for AI.",
  description:
    "We build websites that work in both worlds — for human visitors and for the AI agents replacing them. Four layers: AI-Built, AI-Powered, AI-Readable, and AI-Actionable. Based in Bratislava. Serving globally.",
  keywords: [
    "AI web design",
    "AI website builder",
    "agent-friendly website",
    "llms.txt",
    "MCP integration",
    "AEO optimization",
    "GEO optimization",
    "AI search visibility",
    "ChatGPT website",
    "Next.js agency",
    "web design Slovakia",
  ],
  authors: [{ name: "Soňa Mášová" }],
  creator: "Soňa Mášová",
  metadataBase: new URL("https://lyveca.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lyveca.com",
    siteName: "LYVECA AI",
    title: "LYVECA AI — Websites built for humans. And for AI.",
    description:
      "60% of searches now end without a click. AI agents skip your homepage and go straight to the data layer. We build websites that work in both worlds.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LYVECA AI — AI Web Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LYVECA AI — Websites built for humans. And for AI.",
    description:
      "60% of searches now end without a click. We build websites that work for human visitors and AI agents.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://lyveca.com",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lyveca.com/#organization",
      name: "LYVECA AI",
      url: "https://lyveca.com",
      sameAs: [
        "https://x.com/LyvecaAI",
        "https://github.com/Sonya2301/agentix-ai",
      ],
      description:
        "AI web studio building four-layer websites: AI-Built, AI-Powered, AI-Readable, and AI-Actionable. Making businesses visible to and usable by both human visitors and AI search agents.",
      foundingDate: "2026",
      founder: { "@id": "https://lyveca.com/#sona" },
      areaServed: "Worldwide",
      knowsAbout: [
        "AI website development",
        "Agent-friendly web design",
        "llms.txt implementation",
        "MCP server integration",
        "AEO optimization",
        "GEO optimization",
        "Claude Code development",
      ],
      offers: [
        {
          "@type": "Offer",
          name: "AI Visibility Upgrade",
          price: "890",
          priceCurrency: "EUR",
          description:
            "One-week upgrade making an existing website readable and citable by AI search engines (schema, AI-readable content, crawler access). No rebuild.",
        },
        {
          "@type": "Offer",
          name: "Studio — AI-Built Website",
          price: "1490",
          priceCurrency: "EUR",
          description:
            "AI-built website with the AI-readable layer (llms.txt, schema.org, AI crawler permissions), strategy call, and AEO content optimization.",
        },
        {
          "@type": "Offer",
          name: "Premium — Studio + AI Agent",
          price: "2990",
          priceCurrency: "EUR",
          description:
            "Studio plus an embedded AI Agent, custom design direction, two extra revision rounds, and one month free maintenance.",
        },
        {
          "@type": "Offer",
          name: "AI Agent Add-on",
          price: "1490",
          priceCurrency: "EUR",
          description:
            "Embedded AI lead-qualification and booking agent. Included in Premium.",
        },
        {
          "@type": "Offer",
          name: "MCP Integration",
          price: "1890",
          priceCurrency: "EUR",
          description:
            "Layer 04 — makes the site actionable by outside AI agents via an MCP server. For tech/SaaS clients.",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://lyveca.com/#website",
      url: "https://lyveca.com",
      name: "LYVECA AI",
      publisher: { "@id": "https://lyveca.com/#organization" },
    },
    {
      "@type": "Service",
      name: "Four-Layer AI Website Service",
      provider: { "@id": "https://lyveca.com/#organization" },
      description:
        "Layer 01: AI-Built Websites in 5-7 days. Layer 02: AI-Powered with embedded agents. Layer 03: AI-Readable with llms.txt and Schema.org. Layer 04: AI-Actionable with MCP server integration.",
      serviceType: "Web Design and Development",
      areaServed: "Worldwide",
    },
    {
      "@type": "Person",
      "@id": "https://lyveca.com/#sona",
      name: "Soňa Mášová",
      jobTitle: "Founder",
      worksFor: { "@id": "https://lyveca.com/#organization" },
      email: "sonamasova@lyveca.com",
      url: "https://lyveca.com",
      sameAs: [
        "https://x.com/LyvecaAI",
        "https://github.com/Sonya2301",
      ],
      knowsAbout: [
        "AI website development",
        "Agent-friendly web design",
        "AEO optimization",
        "GEO optimization",
        "Cybersecurity consulting",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://lyveca.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does a website from LYVECA AI cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LYVECA AI has two website tiers plus standalone services. Studio is €1,490: an AI-built website with the AI-readable layer (llms.txt, schema.org, AI crawler permissions), a strategy call, and AEO content optimization, delivered in 5–7 days. Premium is €2,990: everything in Studio plus an embedded AI Agent, custom design direction, two extra revision rounds, and one month of free maintenance. For existing websites: AI Visibility Audit €90 and AI Visibility Upgrade €890. Add-ons: AI Agent (Layer 02) €1,490 setup; MCP Integration (Layer 04) €1,890. Monthly care plans from €99.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take LYVECA AI to build a website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Layer 01 (AI-built website): 5–7 days from briefing to live. Layer 02 add-on (embedded AI agent): +3–5 days. Layer 03 basics are included in every Layer 01 build with no extra time. Full MCP Server integration: +2–4 weeks.",
          },
        },
        {
          "@type": "Question",
          name: "What is an agent-friendly website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An agent-friendly website is structured so AI agents like ChatGPT, Perplexity, and Claude can read, understand, and cite it — not just human visitors. This includes: llms.txt (a plain-text file describing the site to AI agents), Schema.org JSON-LD (structured business data AI engines can reference), and AI crawler permissions in robots.txt (explicitly allowing GPTBot, ClaudeBot, PerplexityBot). The premium tier adds MCP Server integration, which lets AI agents call the site as a tool — booking meetings, getting pricing, checking availability — without a browser.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between Layer 01, Layer 02, and Layer 03?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Layer 01 is the build layer: custom websites built with AI tools (Claude Code, Next.js) in 5–7 days instead of 4–6 weeks. Layer 02 is the intelligence layer: an embedded AI agent on the website that qualifies leads, answers questions, and books meetings 24/7 without a human. Layer 03 is the visibility layer: making the site readable and citable by AI search engines like ChatGPT, Perplexity, and Claude — so the business appears in AI-generated answers, not just traditional search results.",
          },
        },
        {
          "@type": "Question",
          name: "What is llms.txt and why does it matter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "llms.txt is a plain-text file at the root of a website (like /llms.txt) that tells AI agents what the site is, what services are offered, and how to contact the business. It is the AI equivalent of a README. When someone asks ChatGPT or Perplexity to find a web design studio, the AI reads llms.txt to understand the business before deciding whether to recommend it.",
          },
        },
        {
          "@type": "Question",
          name: "Does LYVECA AI work with clients outside Slovakia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. LYVECA AI is based in Bratislava, Slovakia, and serves clients globally. All collaboration is remote. The founder, Soňa Mášová, has a background in security consulting at global enterprises, and works in English, Slovak, and Czech.",
          },
        },
        {
          "@type": "Question",
          name: "What is MCP server integration?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "MCP (Model Context Protocol) is Anthropic's open standard for connecting AI agents to external tools and data. An MCP server on a website exposes its functionality as callable tools — so an AI agent like Claude can book a meeting, retrieve pricing, or check availability directly, without opening a browser. LYVECA AI offers full MCP integration as Layer 04 (AI-actionable) for €1,890.",
          },
        },
        {
          "@type": "Question",
          name: "Who is Soňa Mášová?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Soňa Mášová is an AI web studio founder based in Bratislava, Slovakia. She is a former security consultant with experience at global enterprises, now building at the intersection of AI, web development, and design. Contact: sonamasova@lyveca.com. Book a call: calendly.com/sona-masova23.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <link rel="mcp" href="https://lyveca.com/api/mcp" />
        <link rel="mcp-discovery" href="https://lyveca.com/.well-known/mcp.json" />
      </head>
      <body>
        {children}
        <ScrollReveal />
        <CookieBanner />
        <AgentWidget />
      </body>
    </html>
  );
}
