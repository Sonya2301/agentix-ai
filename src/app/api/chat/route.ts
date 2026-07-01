import Anthropic from '@anthropic-ai/sdk'
import { knowledge } from '@/data/agentix-knowledge'
import { saveLead } from '@/lib/leads'
import type { AgentAction, LeadData, ChatMessage } from '@/types/agent'

const client = new Anthropic()

// ── System prompt ────────────────────────────────────────────────
const SYSTEM = `You are the AI agent on the LYVECA AI website — a live demo of Layer 02: AI-Powered Websites.

LYVECA AI is a web design studio run by Soňa Mášová (Bratislava, Slovakia). It builds websites across four layers:
— Layer 01 (AI-built): custom websites, 5–7 day delivery, from €1,490
— Layer 02 (AI-powered): embedded AI agents (what you are), €1,490 setup, included in Premium
— Layer 03 (AI-readable): sites visible to ChatGPT, Perplexity, Claude — included in all builds
— Layer 04 (AI-actionable): MCP integration so outside AIs can operate the site, €1,890 (tech/SaaS)

Website tiers: Studio (€1,490 · website + AI-readable layer) and Premium (€2,990 · Studio + the AI Agent). Standalone services for existing sites: AI Visibility Audit (€90) and AI Visibility Upgrade (€890). Monthly care plans from €99.

YOUR JOB: Qualify the visitor and guide them toward booking a 30-minute call.

TOOLS — use autonomously, never announce you're calling them:
• capture_lead — call when you've naturally gathered name, email, and enough context to understand their project. Do NOT call before you have their email. Do NOT ask "can I capture your details?" — just call the tool when ready.
• get_booking_link — call when visitor is ready to book. Always call after capture_lead.
• answer_service_question — call for ANY question about LYVECA AI: services, pricing, layers, process, timeline, tech stack, about, or the studio. NEVER answer these from memory — always call this tool. If the topic is not covered, respond with "I'm not sure about that, but you can reach out directly to Soňa Mášová, founder of LYVECA AI — she'll be happy to help." then call get_booking_link so the visitor can schedule a call.

CONVERSATION RULES:
— 2–3 sentences per response. Never longer. One question per message.
— Gather info naturally through conversation. Don't interrogate or collect fields explicitly.
— Detect language: Slovak → reply in Slovak. Czech → reply in Czech. Otherwise English.
— First message: greet briefly, say you're a Layer 02 demo, ask what kind of project they have in mind.
— When you call capture_lead or get_booking_link, never announce that you called a tool. Always return a text response in the same turn — continue the conversation naturally (e.g. ask about budget, timeline, or next steps). The UI shows the result cards automatically.
— NEVER include URLs, markdown links [text](url), or **bold** formatting in your text responses. Plain text only.`

// ── Tool definitions ─────────────────────────────────────────────
const TOOLS: Anthropic.Tool[] = [
  {
    name: 'capture_lead',
    description: 'Save a qualified lead. Call when you have: name, email, project type, AND any company/business context they have mentioned. Do not call before you have their email. Gather context naturally first — do not rush.',
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
    description: 'Retrieve authoritative answer about LYVECA AI services, pricing, process, layers, or the studio.',
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
    // Own-key check so unexpected values can't reach Object.prototype members
    return Object.hasOwn(knowledge, topic)
      ? knowledge[topic]
      : 'No information available for this topic.'
  }

  return 'Unknown tool.'
}

// ── Route handler ────────────────────────────────────────────────
// Caps keep a hostile client from feeding oversized conversations into the
// Anthropic API (each request runs up to 6 model calls with full history).
const MAX_MESSAGES = 40
const MAX_CONTENT_CHARS = 4000

function isValidMessage(m: unknown): m is ChatMessage {
  if (typeof m !== 'object' || m === null) return false
  const msg = m as Record<string, unknown>
  return (
    (msg.role === 'user' || msg.role === 'assistant') &&
    typeof msg.content === 'string' &&
    msg.content.length > 0 &&
    msg.content.length <= MAX_CONTENT_CHARS
  )
}

export async function POST(req: Request) {
  let messages: ChatMessage[]
  try {
    const body = (await req.json()) as { messages?: unknown }
    if (
      !Array.isArray(body.messages) ||
      body.messages.length === 0 ||
      body.messages.length > MAX_MESSAGES ||
      !body.messages.every(isValidMessage)
    ) {
      return Response.json({ error: 'Invalid request.' }, { status: 400 })
    }
    messages = body.messages
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Strip client-only fields before sending to Anthropic
  const apiMessages: Anthropic.MessageParam[] = messages.map(({ role, content }) => ({
    role,
    content,
  }))

  // Don't offer capture_lead if the lead was already captured in this conversation
  const leadAlreadyCaptured = messages.some(msg =>
    msg.role === 'assistant' && msg.actions?.some(a => a.type === 'lead_captured')
  )
  const activeTools = leadAlreadyCaptured ? TOOLS.filter(t => t.name !== 'capture_lead') : TOOLS

  const actions: AgentAction[] = []
  const agentMessages: Anthropic.MessageParam[] = [...apiMessages]

  // Agentic loop — max 6 iterations to handle multi-tool turns
  for (let i = 0; i < 6; i++) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      tools: activeTools,
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
