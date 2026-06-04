'use client'
import { useState, useRef } from 'react'

const TOPICS = ['layer01', 'layer02', 'layer03', 'process', 'about'] as const
type Topic = typeof TOPICS[number]

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }

export function MCPPlayground() {
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [topic, setTopic] = useState<Topic>('layer01')
  const [requestText, setRequestText] = useState('')
  const [responseText, setResponseText] = useState('')
  const [phase, setPhase] = useState<'idle' | 'typing' | 'calling' | 'streaming' | 'done'>('idle')
  const abortRef = useRef(false)

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

  return (
    <div style={{ width: '100%', maxWidth: 860, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      <span style={{ ...mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3b82f6' }}>
        Live Demo · MCP Server
      </span>
      <p style={{ ...mono, fontSize: 12, color: '#6b6b8a', letterSpacing: '0.06em', textAlign: 'center' }}>
        Click a tool — watch an AI call your site in real time
      </p>

      {/* Tool buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        <ToolButton label="get_pricing" active={activeTool === 'get_pricing'} phase={phase}
          onClick={() => runTool('get_pricing', {})} />
        <ToolButton label="book_meeting" active={activeTool === 'book_meeting'} phase={phase}
          onClick={() => runTool('book_meeting', {})} />
      </div>

      {/* get_service_info — topic pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ ...mono, fontSize: 10, color: '#6b6b8a', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 4 }}>
          get_service_info:
        </span>
        {TOPICS.map(t => (
          <button key={t} onClick={() => { setTopic(t); runTool('get_service_info', { topic: t }) }}
            style={{
              ...mono, fontSize: 10, letterSpacing: '0.08em',
              padding: '5px 10px',
              background: activeTool === 'get_service_info' && topic === t
                ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.05)',
              border: `1px solid ${activeTool === 'get_service_info' && topic === t ? '#3b82f6' : 'rgba(59,130,246,0.2)'}`,
              color: activeTool === 'get_service_info' && topic === t ? '#e8e8f0' : '#6b6b8a',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* Two panels */}
      <div style={{ display: 'flex', gap: 12, width: '100%', flexWrap: 'wrap' }}>
        <Panel label="REQUEST" text={requestText} phase={phase} side="left" />
        <Panel label="RESPONSE" text={responseText} phase={phase} side="right" />
      </div>
    </div>
  )
}

function ToolButton({ label, active, phase, onClick }: { label: string; active: boolean; phase: string; onClick: () => void }) {
  const busy = active && phase !== 'idle' && phase !== 'done'
  return (
    <button onClick={onClick} style={{
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'lowercase',
      padding: '8px 18px',
      background: active ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.05)',
      border: `1px solid ${active ? '#3b82f6' : 'rgba(59,130,246,0.2)'}`,
      color: active ? '#e8e8f0' : '#6b6b8a',
      cursor: busy ? 'wait' : 'pointer',
      transition: 'all 0.15s',
    }}>
      {busy ? '...' : label}
    </button>
  )
}

function Panel({ label, text, phase, side }: { label: string; text: string; phase: string; side: 'left' | 'right' }) {
  const isLeft = side === 'left'
  const showCursor = isLeft
    ? phase === 'typing'
    : phase === 'streaming'

  const placeholder = isLeft
    ? '// click a tool above'
    : '// response will appear here'

  return (
    <div style={{
      flex: '1 1 300px', minHeight: 200,
      background: 'rgba(10,10,15,0.85)',
      border: '1px solid rgba(59,130,246,0.15)',
      backdropFilter: 'blur(12px)',
      padding: 16,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3b82f6' }}>
        {label}
        {phase === 'calling' && isLeft && <span style={{ color: '#f59e0b', marginLeft: 8 }}>● sending</span>}
      </span>
      <pre style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.7,
        color: text ? (isLeft ? '#9898b4' : '#10b981') : '#3b3b5a',
        margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', flex: 1,
      }}>
        {text || placeholder}
        {showCursor && <span style={{ animation: 'blink 1s step-end infinite', color: '#3b82f6' }}>▌</span>}
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
