import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { z } from 'zod/v3'
import { knowledge } from '@/data/agentix-knowledge'

function createServer() {
  const mcp = new McpServer({ name: 'Soňa Mášová', version: '1.0.0' })

  mcp.registerTool('get_pricing', {
    description: 'Get full pricing for all Soňa Mášová tiers and add-ons.',
  }, async () => ({
    content: [{ type: 'text' as const, text: knowledge.pricing }],
  }))

  mcp.registerTool('get_service_info', {
    description: 'Get information about Soňa Mášová services, layers, process, timeline, or the studio.',
    inputSchema: {
      topic: z.enum(['layer01', 'layer02', 'layer03', 'process', 'about', 'timeline', 'tech-stack'])
        .describe('The topic to look up'),
    },
  }, async ({ topic }) => ({
    content: [{ type: 'text' as const, text: knowledge[topic] ?? 'No information available.' }],
  }))

  mcp.registerTool('book_meeting', {
    description: 'Get a Calendly link to book a 30-minute call with Soňa Mášová, owner of Soňa Mášová.',
    inputSchema: {
      name: z.string().optional().describe('Your name'),
      email: z.string().optional().describe('Your email address'),
    },
  }, async ({ name, email }) => {
    const params = new URLSearchParams({ utm_source: 'mcp', utm_medium: 'layer03' })
    if (name) params.set('name', name)
    if (email) params.set('email', email)
    const url = `https://calendly.com/sona-masova23?${params}`
    return {
      content: [{ type: 'text' as const, text: `Book a 30-minute call with Soňa Mášová: ${url}` }],
    }
  })

  return mcp
}

async function handle(req: Request): Promise<Response> {
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless — required for Vercel serverless
  })
  await createServer().connect(transport)
  return transport.handleRequest(req)
}

export { handle as GET, handle as POST, handle as DELETE }
