import Anthropic from '@anthropic-ai/sdk'
import { knowledge } from '@/data/agentix-knowledge'
import { saveLead } from '@/lib/leads'
import type { AgentAction, LeadData, ChatMessage } from '@/types/agent'

const client = new Anthropic()

// ── System prompt ────────────────────────────────────────────────
const SYSTEM = `You are the AI agent on Soňa Mášová's website — a live demo of Layer 02: AI-Powered Websites.

Soňa Mášová is a web design studio run by Soňa Mášová (Bratislava, Slovakia). It builds three-layer websites:
— Layer 01: AI-built custom websites, 5–7 day delivery, starting €1,200
— Layer 02: Embedded AI agents (what you are), +€1,500–€2,500
— Layer 03: Agent-friendly sites visible to ChatGPT, Perplexity, Claude. Basics in all tiers.

Tiers: Starter (€1,200–€1,500 · agencies/freelancers), Studio (€2,500–€3,500 · tech/consultancies), Premium (€4,000–€6,000 · SaaS/startups).

YOUR JOB: Qualify the visitor and guide them toward booking a 30-minute call.

TOOLS — use autonomously, never announce you're calling them:
• capture_lead — call when you've naturally gathered name, email, and enough context to understand their project. Do NOT call before you have their email. Do NOT ask "can I capture your details?" — just call the tool when ready.
• get_booking_link — call when visitor is ready to book. Always call after capture_lead.
• answer_service_question — call for ANY question about Soňa Mášová: services, pricing, layers, process, timeline, tech stack, about, or the studio. NEVER answer these from memory — always call this tool. If the topic is not covered, respond with "I'm not sure about that, but you can reach out directly to Soňa Mášová, owner of Soňa Mášová — she'll be happy to help." then call get_booking_link so the visitor can schedule a call.

CONVERSATION RULES:
— 2–3 sentences per response. Never longer. One question per message.
— Gather info naturally through conversation. Don't interrogate or collect fields explicitly.
— Detect language: Slovak → reply in Slovak. Czech → reply in Czech. Otherwise English.
— First message: greet briefly, say you're a Layer 02 demo, ask what kind of project they have in mind.
— When you call capture_lead or get_booking_link, don't comment on it — your next text message continues the conversation naturally. The UI shows the result cards automatically.
— NEVER include URLs, markdown links [text](url), or **bold** formatting in your text responses. Plain text only.`

// ── Tool definitions ─────────────────────────────────────────────
const TOOLS: Anthropic.Tool[] = [
  {
    name: 'capture_lead',
    description: 'Save a qualified lead. Call when you have: name, email, project type. Autonomously decide timing — do not wait to be asked.',
    input_schema: {
      type: 'object' as const,
      properties: {
        name:         { type: 'string', description: 'Visitor name' },
        email:        { type: 'string', description: 'Email address' },
        company:      { type: 'string', description: 'Company, agency, startup, or context' },
        project_type: {
          type: 'string',
          enum: ['new-site', 'redesign', 'ai-agent-addon', 'layer03-upgrade', 'full-stack'],
        },
        tier: {
          type: 'string',
          enum: ['starter', 'studio', 'premium', 'unknown'],
          description: 'Best tier match inferred from conversation',
        },
        budget: { type: 'string', description: 'Budget if mentioned or inferable' },
        notes:  { type: 'string', description: 'Key context: what they need, pain points, timeline' },
      },
      required: ['name', 'email', 'project_type', 'tier', 'notes'],
    },
  },
  {
    name: 'get_booking_link',
    description: 'Generate a pre-filled Calendly link. Call when visitor is ready to book.',
    input_schema: {
      type: 'object' as const,
      properties: {
        project_type: { type: 'string' },
        tier:         { type: 'string' },
        name:         { type: 'string' },
        email:        { type: 'string' },
      },
      required: ['project_type', 'tier'],
    },
  },
  {
    name: 'answer_service_question',
    description: 'Retrieve authoritative answer about Soňa Mášová services, pricing, process, layers, or the studio.',
    input_schema: {
      type: 'object' as const,
      properties: {
        topic: {
          type: 'string',
          enum: ['pricing', 'layer01', 'layer02', 'layer03', 'process', 'about', 'timeline', 'tech-stack'],
        },
      },
      required: ['topic'],
    },
  },
]

// ── Tool execution ───────────────────────────────────────────────
function executeTool(
  name: string,
  input: Record<string, unknown>,
  actions: AgentAction[],
): string {
  if (name === 'capture_lead') {
    const data = input as LeadData
    saveLead(data).catch(console.error) // fire-and-forget
    actions.push({ type: 'lead_captured', data })
    return JSON.stringify({ ok: true, message: 'Lead saved. Soňa has been notified.' })
  }

  if (name === 'get_booking_link') {
    const params = new URLSearchParams({
      utm_source:   'agent',
      utm_medium:   'layer02',
      utm_campaign: String(input.tier ?? 'unknown'),
      utm_content:  String(input.project_type ?? 'general'),
    })
    if (input.name)  params.set('name', String(input.name))
    if (input.email) params.set('email', String(input.email))
    const url = `https://calendly.com/sona-masova23?${params}`
    actions.push({ type: 'booking_link', data: { url, tier: String(input.tier ?? 'unknown') } })
    return JSON.stringify({ ok: true, url, message: 'Booking link generated.' })
  }

  if (name === 'answer_service_question') {
    const topic = String(input.topic)
    return knowledge[topic] ?? 'No information available for this topic.'
  }

  return 'Unknown tool.'
}

// ── Route handler ────────────────────────────────────────────────
export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: ChatMessage[] }

  // Strip client-only fields before sending to Anthropic
  const apiMessages: Anthropic.MessageParam[] = messages.map(({ role, content }) => ({
    role,
    content,
  }))

  const actions: AgentAction[] = []
  const agentMessages: Anthropic.MessageParam[] = [...apiMessages]

  // Agentic loop — max 6 iterations to handle multi-tool turns
  for (let i = 0; i < 6; i++) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      tools: TOOLS,
      messages: agentMessages,
    })

    // Final text response — done
    if (response.stop_reason === 'end_turn') {
      const raw = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map(b => b.text)
        .join('')
      const text = raw
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
      return Response.json({ text, actions })
    }

    // Tool use — execute, feed results back, continue loop
    if (response.stop_reason === 'tool_use') {
      const toolBlocks = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
      )

      const toolResults: Anthropic.ToolResultBlockParam[] = toolBlocks.map(block => ({
        type: 'tool_result' as const,
        tool_use_id: block.id,
        content: executeTool(block.name, block.input as Record<string, unknown>, actions),
      }))

      agentMessages.push({ role: 'assistant', content: response.content })
      agentMessages.push({ role: 'user',      content: toolResults })
    }
  }

  return Response.json({ text: 'Something went wrong. Please try again.', actions: [] })
}
