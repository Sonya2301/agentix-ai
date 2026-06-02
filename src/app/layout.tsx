import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "../components/CookieBanner";

export const metadata: Metadata = {
  title: "AGENTIX AI — AI Web Studio",
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
  authors: [{ name: "AGENTIX AI" }],
  creator: "AGENTIX AI",
  metadataBase: new URL("https://agentix-ai-five.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agentix-ai-five.vercel.app",
    siteName: "AGENTIX AI",
    title: "AGENTIX AI — Websites built for humans. And for AI.",
    description:
      "60% of searches now end without a click. AI agents skip your homepage and go straight to the data layer. We build websites that work in both worlds.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "AGENTIX AI — AI Web Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AGENTIX AI — Websites built for humans. And for AI.",
    description:
      "60% of searches now end without a click. We build websites that work for human visitors and AI agents.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://agentix-ai-five.vercel.app",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://agentix-ai-five.vercel.app/#organization",
      name: "AGENTIX AI",
      url: "https://agentix-ai-five.vercel.app",
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
      "@id": "https://agentix-ai-five.vercel.app/#website",
      url: "https://agentix-ai-five.vercel.app",
      name: "AGENTIX AI",
      publisher: { "@id": "https://agentix-ai-five.vercel.app/#organization" },
    },
    {
      "@type": "Service",
      name: "Three-Layer AI Website Service",
      provider: { "@id": "https://agentix-ai-five.vercel.app/#organization" },
      description:
        "Layer 01: AI-Built Websites in 5-7 days. Layer 02: AI-Powered with embedded agents. Layer 03: Agent-Friendly with llms.txt, Schema.org, MCP integration.",
      serviceType: "Web Design and Development",
      areaServed: "Worldwide",
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
      </body>
    </html>
  );
}
