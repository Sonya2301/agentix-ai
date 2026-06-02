export type LeadData = {
  name?: string
  email?: string
  company?: string
  project_type: string
  tier: string
  budget?: string
  notes: string
}

export type AgentAction =
  | { type: 'lead_captured'; data: LeadData }
  | { type: 'booking_link'; data: { url: string; tier: string } }

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  actions?: AgentAction[]
}
