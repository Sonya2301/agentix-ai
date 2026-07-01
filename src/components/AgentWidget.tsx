'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { ChatMessage, AgentAction } from '@/types/agent'

// ── Typewriter hook ──────────────────────────────────────────────
function useTypewriter(text: string, active: boolean, speed = 14): string {
  const [out, setOut] = useState(active ? '' : text)

  useEffect(() => {
    if (!active) { setOut(text); return }
    setOut('')
    let i = 0
    const id = setInterval(() => {
      i++
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, active, speed])

  return out
}

// ── Action cards ─────────────────────────────────────────────────
function LeadCard({ data }: { data: Extract<AgentAction, { type: 'lead_captured' }>['data'] }) {
  return (
    <div style={{
      marginTop: 10, padding: '12px 14px',
      border: '1px solid rgba(16,185,129,0.28)',
      background: 'rgba(16,185,129,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#10b981' }}>
          Lead captured
        </span>
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#9898b4', lineHeight: 1.7 }}>
        {(data.name || data.email) && (
          <div>{[data.name, data.email].filter(Boolean).join(' · ')}</div>
        )}
        <div style={{ textTransform: 'capitalize' }}>
          {data.tier} tier · {data.project_type.replace(/-/g, ' ')}
        </div>
        {data.notes && (
          <div style={{ marginTop: 4, color: '#6b6b8a', fontSize: 11 }}>
            {data.notes.length > 110 ? data.notes.slice(0, 110) + '…' : data.notes}
          </div>
        )}
      </div>
      <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: '#10b981' }}>
        Soňa has been notified
      </div>
    </div>
  )
}

function BookingCard({ data }: { data: Extract<AgentAction, { type: 'booking_link' }>['data'] }) {
  return (
    <div style={{
      marginTop: 10, padding: '12px 14px',
      border: '1px solid rgba(59,130,246,0.28)',
      background: 'rgba(59,130,246,0.05)',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 6 }}>
        Schedule a call
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#9898b4', marginBottom: 10 }}>
        Free 30 minutes · Calendly · pre-filled with your context
      </div>
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block', padding: '8px 18px',
          background: '#3b82f6', color: '#fff', textDecoration: 'none',
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}
      >
        Book your slot →
      </a>
    </div>
  )
}

// ── Message bubble ───────────────────────────────────────────────
function Bubble({ msg, animate }: { msg: ChatMessage; animate: boolean }) {
  const text = useTypewriter(msg.content, animate && msg.role === 'assistant')
  const isUser = msg.role === 'user'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '84%', padding: '9px 13px',
        background: isUser ? 'rgba(59,130,246,0.16)' : 'rgba(255,255,255,0.035)',
        border: `1px solid ${isUser ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.07)'}`,
        fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.65,
        color: isUser ? '#c4d8f8' : '#d4d4e8',
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
      }}>
        {text}
        {animate && msg.role === 'assistant' && text.length < msg.content.length && (
          <span style={{
            display: 'inline-block', width: 2, height: 12,
            background: '#3b82f6', marginLeft: 2, verticalAlign: 'middle',
            animation: 'agentBlink 0.8s step-end infinite',
          }} />
        )}
      </div>

      {/* Action cards */}
      {msg.actions?.map((action, i) => (
        <div key={i} style={{ maxWidth: '90%', width: '90%' }}>
          {action.type === 'lead_captured' && <LeadCard data={action.data} />}
          {action.type === 'booking_link'  && <BookingCard data={action.data} />}
        </div>
      ))}
    </div>
  )
}

// ── Working indicator ────────────────────────────────────────────
function WorkingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 4px' }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {[0, 1, 2].map(d => (
          <div key={d} style={{
            width: 5, height: 5, borderRadius: '50%', background: '#3b82f6',
            animation: `agentBounce 1.2s ease-in-out ${d * 0.18}s infinite`,
          }} />
        ))}
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b8a' }}>
        Agent working
      </span>
    </div>
  )
}

// ── Main widget ──────────────────────────────────────────────────
const INITIAL: ChatMessage = {
  role: 'assistant',
  content: "Hi. I'm the LYVECA AI agent — a live demo of Layer 02.\n\nWhat kind of website project are you thinking about?",
}

export default function AgentWidget() {
  const [open,    setOpen]    = useState(false)
  const [visible, setVisible] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [lastAssistantIndex, setLastAssistantIndex] = useState(0) // index 0 = initial

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)
  const autoOpened = useRef(false)
  const dismissed  = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (autoOpened.current || dismissed.current) return
      if (window.scrollY > 300) {
        autoOpened.current = true
        setOpen(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 280)
  }, [open])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: ChatMessage = { role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const { text: reply, actions } = (await res.json()) as { text: string; actions: AgentAction[] }
      const assistantMsg: ChatMessage = { role: 'assistant', content: reply, actions }
      const final = [...updated, assistantMsg]
      setMessages(final)
      setLastAssistantIndex(final.length - 1)
    } catch {
      const errorMsg: ChatMessage = { role: 'assistant', content: 'Something went wrong. Please try again.' }
      const final = [...updated, errorMsg]
      setMessages(final)
      setLastAssistantIndex(final.length - 1)
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* ── Chat panel ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="LYVECA AI chat agent"
        style={{
          position: 'fixed', bottom: 92, right: 28,
          width: 'min(368px, calc(100vw - 40px))',
          maxHeight: 'min(540px, calc(100vh - 140px))',
          zIndex: 300,
          background: 'rgba(7, 7, 12, 0.97)',
          border: '1px solid rgba(59,130,246,0.24)',
          backdropFilter: 'blur(28px)',
          display: 'flex', flexDirection: 'column',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(59,130,246,0.06)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '12px 16px', flexShrink: 0,
          borderBottom: '1px solid rgba(59,130,246,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%', background: '#10b981',
              boxShadow: '0 0 8px rgba(16,185,129,0.7)',
            }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#e8e8f0' }}>
              LYVECA AI · AGENT
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: '#3b82f6', textTransform: 'uppercase' }}>
              Layer 02 Demo
            </span>
            <button
              onClick={() => { dismissed.current = true; setOpen(false) }}
              aria-label="Close"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b6b8a', fontSize: 14, padding: 2, lineHeight: 1 }}
            >✕</button>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '14px 14px 8px',
          display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0,
        }}>
          {messages.map((msg, i) => (
            <Bubble key={i} msg={msg} animate={i === lastAssistantIndex} />
          ))}
          {loading && <WorkingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '10px 12px', flexShrink: 0,
          borderTop: '1px solid rgba(59,130,246,0.08)',
          display: 'flex', gap: 8, alignItems: 'flex-end',
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Type a message…"
            rows={1}
            disabled={loading}
            style={{
              flex: 1, background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(59,130,246,0.14)', outline: 'none',
              color: '#e8e8f0', fontFamily: 'var(--font-sans)', fontSize: 13,
              padding: '8px 11px', resize: 'none', lineHeight: 1.5,
              maxHeight: 80, overflowY: 'auto', transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.4)')}
            onBlur={e  => (e.target.style.borderColor = 'rgba(59,130,246,0.14)')}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Send"
            style={{
              width: 36, height: 36, flexShrink: 0, border: 'none',
              background: input.trim() && !loading ? '#3b82f6' : 'rgba(59,130,246,0.14)',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              color: '#fff', fontSize: 15, transition: 'background 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >→</button>
        </div>
      </div>

      {/* ── Floating launcher pill ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close agent' : 'Talk to AI agent'}
        aria-expanded={open}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 300,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '13px 20px', borderRadius: 100, border: 'none',
          background: 'linear-gradient(140deg,#6fb6ff,#2a7fe6)', color: '#03101f',
          fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14,
          cursor: 'pointer',
          boxShadow: '0 16px 40px -10px rgba(74,158,255,0.7)',
          opacity: visible && !open ? 1 : 0,
          transform: visible && !open ? 'scale(1)' : 'scale(0.9)',
          pointerEvents: open ? 'none' : 'auto',
          transition: 'opacity 0.35s ease, transform 0.35s ease, filter 0.2s',
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#03101f', opacity: 0.7 }} />
        Ask the agent
      </button>

      <style>{`
        @keyframes agentBlink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes agentBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
