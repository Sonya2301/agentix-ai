import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'GoogleExtendedBot', 'Applebot-Extended', 'cohere-ai'],
        allow: '/',
      },
    ],
    sitemap: 'https://aisow.vercel.app/sitemap.xml',
  }
}
