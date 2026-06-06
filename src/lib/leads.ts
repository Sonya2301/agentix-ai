import { writeFile, readFile, mkdir } from 'fs/promises'
import path from 'path'
import type { LeadData } from '@/types/agent'

export type Lead = LeadData & { timestamp: string }

async function saveToNotion(lead: Lead): Promise<void> {
  const key = process.env.NOTION_API_KEY
  const dbId = process.env.NOTION_DATABASE_ID
  if (!key || !dbId) {
    console.log('[leads] Notion not configured — skipping')
    return
  }

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: dbId },
      properties: {
        Name: { title: [{ text: { content: lead.name ?? 'Anonymous' } }] },
        Email: { email: lead.email ?? '' },
        Company: { rich_text: [{ text: { content: lead.company ?? '' } }] },
        Project: { rich_text: [{ text: { content: lead.project_type } }] },
        Tier: { select: { name: lead.tier } },
        Budget: { rich_text: [{ text: { content: lead.budget ?? '' } }] },
        Notes: { rich_text: [{ text: { content: lead.notes } }] },
        Status: { status: { name: 'Not started' } },
      },
    }),
  })

  if (!res.ok) console.error('[leads] Notion error:', await res.text())
  else console.log('[leads] Saved to Notion ✓')
}

export async function saveLead(input: LeadData): Promise<void> {
  const lead: Lead = { ...input, timestamp: new Date().toISOString() }

  // Save to Notion CRM
  await saveToNotion(lead)

  // Write to local file — dev only, won't persist on Vercel serverless
  try {
    const dir = path.join(process.cwd(), 'data')
    await mkdir(dir, { recursive: true })
    const file = path.join(dir, 'leads.json')
    let leads: Lead[] = []
    try {
      leads = JSON.parse(await readFile(file, 'utf-8'))
    } catch { /* file doesn't exist yet */ }
    await writeFile(file, JSON.stringify([...leads, lead], null, 2))
  } catch (err) {
    console.error('[leads] file write failed:', err)
  }

  // Email notification via Resend (primary storage for production)
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.log('[leads] No RESEND_API_KEY set — lead:', JSON.stringify(lead, null, 2))
    return
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? 'onboarding@resend.dev',
        to: 'sona.masova23@gmail.com',
        subject: `New lead — ${lead.name ?? 'Anonymous'} · ${lead.tier} tier`,
        html: `
          <div style="font-family:monospace;max-width:560px">
            <h2 style="margin-bottom:20px">New Lead — LYVECA AI Agent</h2>
            <table style="border-collapse:collapse;width:100%;font-size:13px">
              <tr><td style="padding:8px 12px;border:1px solid #ddd;color:#888">Name</td><td style="padding:8px 12px;border:1px solid #ddd">${lead.name ?? '—'}</td></tr>
              <tr><td style="padding:8px 12px;border:1px solid #ddd;color:#888">Email</td><td style="padding:8px 12px;border:1px solid #ddd">${lead.email ?? '—'}</td></tr>
              <tr><td style="padding:8px 12px;border:1px solid #ddd;color:#888">Company</td><td style="padding:8px 12px;border:1px solid #ddd">${lead.company ?? '—'}</td></tr>
              <tr><td style="padding:8px 12px;border:1px solid #ddd;color:#888">Project</td><td style="padding:8px 12px;border:1px solid #ddd">${lead.project_type}</td></tr>
              <tr><td style="padding:8px 12px;border:1px solid #ddd;color:#888">Tier match</td><td style="padding:8px 12px;border:1px solid #ddd">${lead.tier}</td></tr>
              <tr><td style="padding:8px 12px;border:1px solid #ddd;color:#888">Budget</td><td style="padding:8px 12px;border:1px solid #ddd">${lead.budget ?? '—'}</td></tr>
              <tr><td style="padding:8px 12px;border:1px solid #ddd;color:#888">Notes</td><td style="padding:8px 12px;border:1px solid #ddd">${lead.notes}</td></tr>
              <tr><td style="padding:8px 12px;border:1px solid #ddd;color:#888">Time</td><td style="padding:8px 12px;border:1px solid #ddd">${lead.timestamp}</td></tr>
            </table>
            <p style="margin-top:20px">
              <a href="https://calendly.com/sona-masova23" style="color:#3b82f6">Book a follow-up call →</a>
            </p>
          </div>
        `,
      }),
    })
    if (!res.ok) console.error('[leads] Resend error:', await res.text())
  } catch (err) {
    console.error('[leads] email failed:', err)
  }
}
