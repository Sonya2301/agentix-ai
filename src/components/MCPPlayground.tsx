'use client'
import { useState, useRef, useEffect } from 'react'

const TOPICS = ['layer01', 'layer02', 'layer03', 'process', 'about'] as const
type Topic = typeof TOPICS[number]

const tools = [
  { name: 'get_pricing', label: 'get_pricing()', desc: 'Return the full price list' },
  { name: 'get_service_info', label: 'get_service_info()', desc: 'Describe the four layers' },
  { name: 'book_meeting', label: 'book_meeting()', desc: 'Return a booking link' },
] as const

export function MCPPlayground() {
  const [activeTool, setActiveTool] = useState<string>('get_pricing')
  const [topic, setTopic] = useState<Topic>('layer01')
  const [requestText, setRequestText] = useState('')
  const [responseText, setResponseText] = useState('')
  const [phase, setPhase] = useState<'idle' | 'typing' | 'calling' | 'streaming' | 'done'>('idle')
  const abortRef = useRef(false)
  const started = useRef(false)

  async function runTool(toolName: string, args: Record<string, unknown>) {
    abortRef.current = true
    await new Promise(r => setTimeout(r, 20))
    abortRef.current = false

    setActiveTool(toolName)
    setRequestText('')
    setResponseText('')
    setPhase('typing')

    const reqObj = { jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: toolName, arguments: args } }
    const reqStr = JSON.stringify(reqObj, null, 2)

    await typeOut(reqStr, setRequestText, 10)
    if (abortRef.current) return

    setPhase('calling')

    let responseContent = ''
    try {
      const res = await fetch('/api/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/event-stream' },
        body: JSON.stringify(reqObj),
      })
      const raw = await res.text()
      const dataLine = raw.split('\n').find(l => l.startsWith('data: '))
      if (dataLine) {
        const json = JSON.parse(dataLine.slice(6))
        responseContent = json?.result?.content?.[0]?.text ?? raw
      } else {
        responseContent = raw
      }
    } catch {
      responseContent = 'Error calling MCP server.'
    }

    if (abortRef.current) return
    setPhase('streaming')
    await typeOut(responseContent, setResponseText, 5)
    setPhase('done')
  }

  // Auto-play get_pricing shortly after mount (matches the design brief).
  useEffect(() => {
    if (started.current) return
    started.current = true
    const t = setTimeout(() => runTool('get_pricing', {}), 700)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleTool(name: string) {
    if (name === 'get_service_info') runTool(name, { topic })
    else runTool(name, {})
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 0.85fr) 1.15fr', gap: 36, alignItems: 'start' }} className="mcp-grid">
      {/* Left — heading + tool buttons */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(26px,3.4vw,42px)', lineHeight: 1.06, letterSpacing: '-0.02em', margin: '0 0 16px', color: 'var(--text)' }}>
          Be the AI for a second.
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.7, color: 'var(--text-dim)', margin: '0 0 24px', maxWidth: '42ch' }}>
          This site runs a real MCP server. Outside AI agents can call it to get pricing, read services,
          and book a meeting — no browser needed. Pick a tool and watch the call happen.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tools.map(t => {
            const active = activeTool === t.name
            const busy = active && phase !== 'idle' && phase !== 'done'
            return (
              <button key={t.name} onClick={() => handleTool(t.name)} style={{
                display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'left',
                padding: '14px 16px', borderRadius: 13, cursor: busy ? 'wait' : 'pointer',
                border: `1px solid ${active ? 'rgba(74,158,255,0.45)' : 'rgba(255,255,255,0.1)'}`,
                background: active ? 'rgba(74,158,255,0.10)' : 'rgba(255,255,255,0.03)',
                color: 'var(--text)', transition: 'all 0.15s',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5 }}>{t.label}</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, color: 'var(--text-muted)' }}>{t.desc}</span>
              </button>
            )
          })}
        </div>

        {/* get_service_info topic pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, alignItems: 'center', marginTop: 14 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 2 }}>topic:</span>
          {TOPICS.map(tp => {
            const on = activeTool === 'get_service_info' && topic === tp
            return (
              <button key={tp} onClick={() => { setTopic(tp); runTool('get_service_info', { topic: tp }) }} style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em',
                padding: '5px 10px', borderRadius: 100, cursor: 'pointer', transition: 'all 0.15s',
                background: on ? 'rgba(74,158,255,0.18)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${on ? 'rgba(74,158,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                color: on ? 'var(--text)' : 'var(--text-muted)',
              }}>{tp}</button>
            )
          })}
        </div>
      </div>

      {/* Right — REQUEST / RESPONSE panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="mcp-panels">
        <Panel label="▸ REQUEST" labelColor="var(--blue-bright)" text={requestText} phase={phase} side="left" />
        <Panel label="◂ RESPONSE" labelColor="#6fd0a8" text={responseText} phase={phase} side="right" />
      </div>

      <style>{`
        @media (max-width: 860px) {
          .mcp-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .mcp-panels { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function Panel({ label, labelColor, text, phase, side }: { label: string; labelColor: string; text: string; phase: string; side: 'left' | 'right' }) {
  const isLeft = side === 'left'
  const showCursor = isLeft ? phase === 'typing' : phase === 'streaming'
  return (
    <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '11px 15px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', color: labelColor }}>
        {label}
        {phase === 'calling' && isLeft && <span style={{ color: 'var(--yellow)', marginLeft: 8 }}>● sending</span>}
      </div>
      <pre style={{
        margin: 0, padding: 16, fontFamily: 'var(--font-mono)', fontSize: 11.5, lineHeight: 1.65,
        color: text ? (isLeft ? '#cfccd6' : '#a8e6c8') : '#3b3b5a',
        whiteSpace: 'pre-wrap', wordBreak: 'break-word', minHeight: 200,
      }}>
        {text || (isLeft ? '// pick a tool' : '// response appears here')}
        {showCursor && <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--blue-bright)' }}>▋</span>}
      </pre>
    </div>
  )
}

function typeOut(text: string, setter: (s: string) => void, msPerChar: number): Promise<void> {
  return new Promise(resolve => {
    let i = 0
    const interval = setInterval(() => {
      i += 3
      setter(text.slice(0, i))
      if (i >= text.length) {
        setter(text)
        clearInterval(interval)
        resolve()
      }
    }, msPerChar)
  })
}
