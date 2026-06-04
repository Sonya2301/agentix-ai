import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "../components/CookieBanner";
import AgentWidget from "../components/AgentWidget";

export const metadata: Metadata = {
  title: "AGENSO — AI Web Studio",
  description:
    "We build websites that work in both worlds — for human visitors and for the AI agents replacing them. Three layers: AI-Built, AI-Powered, and Agent-Friendly. Based in Bratislava. Serving globally.",
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
  authors: [{ name: "AGENSO" }],
  creator: "AGENSO",
  metadataBase: new URL("https://aisow.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aisow.vercel.app",
    siteName: "AGENSO",
    title: "AGENSO — Websites built for humans. And for AI.",
    description:
      "60% of searches now end without a click. AI agents skip your homepage and go straight to the data layer. We build websites that work in both worlds.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "AGENSO — AI Web Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AGENSO — Websites built for humans. And for AI.",
    description:
      "60% of searches now end without a click. We build websites that work for human visitors and AI agents.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://aisow.vercel.app",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aisow.vercel.app/#organization",
      name: "AGENSO",
      url: "https://aisow.vercel.app",
      description:
        "AI web studio building three-layer websites: AI-Built, AI-Powered, and Agent-Friendly. Making businesses visible to both human visitors and AI search agents.",
      foundingDate: "2026",
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
          name: "Starter — AI-Built Website",
          price: "1200",
          priceCurrency: "EUR",
          description:
            "Full website build with AI tools including Layer 03 basics: llms.txt, schema.org, AI crawler permissions.",
        },
        {
          "@type": "Offer",
          name: "Studio — AI-Built + AEO/GEO",
          price: "2500",
          priceCurrency: "EUR",
          description:
            "Premium website with full AI search optimization and strategy session.",
        },
        {
          "@type": "Offer",
          name: "AI Agent Add-on",
          price: "1500",
          priceCurrency: "EUR",
          description:
            "Embedded AI lead qualification agent with CRM integration.",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://aisow.vercel.app/#website",
      url: "https://aisow.vercel.app",
      name: "AGENSO",
      publisher: { "@id": "https://aisow.vercel.app/#organization" },
    },
    {
      "@type": "Service",
      name: "Three-Layer AI Website Service",
      provider: { "@id": "https://aisow.vercel.app/#organization" },
      description:
        "Layer 01: AI-Built Websites in 5-7 days. Layer 02: AI-Powered with embedded agents. Layer 03: Agent-Friendly with llms.txt, Schema.org, MCP integration.",
      serviceType: "Web Design and Development",
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      "@id": "https://aisow.vercel.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does a website from AGENSO cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AGENSO has three tiers. Starter is €1,200–€1,500: an AI-built website with Layer 03 basics (llms.txt, schema.org, AI crawler permissions), delivered in 5–7 days. Studio is €2,500–€3,500: everything in Starter plus full AEO/GEO content optimization and a strategy call. Premium is €4,000–€6,000: everything in Studio plus custom design direction, two extra revision rounds, and one month of free maintenance. Add-ons: AI Agent (Layer 02) +€1,500–€2,500; MCP Server Integration (Layer 03 premium) +€2,000–€3,500; monthly maintenance €150–€300.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take AGENSO to build a website?",
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
          name: "Does AGENSO work with clients outside Slovakia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. AGENSO is based in Bratislava, Slovakia, and serves clients globally. All collaboration is remote. The founder, Soňa Mášová, has a background in security consulting at Deloitte, IBM, and Takeda, and works in English, Slovak, and Czech.",
          },
        },
        {
          "@type": "Question",
          name: "What is MCP server integration?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "MCP (Model Context Protocol) is Anthropic's open standard for connecting AI agents to external tools and data. An MCP server on a website exposes its functionality as callable tools — so an AI agent like Claude can book a meeting, retrieve pricing, or check availability directly, without opening a browser. AGENSO offers full MCP integration as a Layer 03 premium add-on starting at +€2,000.",
          },
        },
        {
          "@type": "Question",
          name: "Who is behind AGENSO?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AGENSO is run by Soňa Mášová, based in Bratislava, Slovakia. She is a former security consultant with experience at Deloitte, IBM, and Takeda, now building at the intersection of AI, web development, and design. Contact: sona.masova23@gmail.com. Book a call: calendly.com/sona-masova23.",
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
      </head>
      <body>
        {children}
        <CookieBanner />
        <AgentWidget />
      </body>
    </html>
  );
}
