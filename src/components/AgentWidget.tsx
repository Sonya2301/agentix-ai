'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const INITIAL: Message = {
  role: 'assistant',
  content: "Hi. I'm the AGENTIX AI agent — a live demo of Layer 02.\n\nWhat kind of website project are you thinking about?",
}

export default function AgentWidget() {
  const [open, setOpen]       = useState(false)
  const [visible, setVisible] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 280)
  }, [open])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok) throw new Error('Request failed')

      const reader  = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: updated[updated.length - 1].content + chunk,
          }
          return updated
        })
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const lastIsEmpty = messages[messages.length - 1]?.content === '' && loading

  return (
    <>
      {/* ── Panel ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="AGENTIX AI chat agent"
        style={{
          position: 'fixed', bottom: 92, right: 28,
          width: 'min(360px, calc(100vw - 40px))',
          maxHeight: 'min(520px, calc(100vh - 140px))',
          zIndex: 300,
          background: 'rgba(8, 8, 14, 0.97)',
          border: '1px solid rgba(59,130,246,0.28)',
          backdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.08)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(59,130,246,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%', background: '#10b981',
              boxShadow: '0 0 8px rgba(16,185,129,0.7)',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.16em', textTransform: 'uppercase', color: '#e8e8f0',
            }}>AGENTIX AI · AGENT</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              letterSpacing: '0.1em', color: '#3b82f6', textTransform: 'uppercase',
            }}>Layer 02 Demo</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#6b6b8a', fontSize: 14, padding: 2, lineHeight: 1,
                transition: 'color 0.15s',
              }}
            >✕</button>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '14px 14px 6px',
          display: 'flex', flexDirection: 'column', gap: 10,
          minHeight: 0,
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '84%',
                padding: '9px 13px',
                background: msg.role === 'user'
                  ? 'rgba(59,130,246,0.18)'
                  : 'rgba(255,255,255,0.035)',
                border: `1px solid ${msg.role === 'user' ? 'rgba(59,130,246,0.32)' : 'rgba(255,255,255,0.07)'}`,
                fontFamily: 'var(--font-sans)', fontSize: 13,
                lineHeight: 1.65, color: msg.role === 'user' ? '#c4d8f8' : '#d4d4e8',
                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              }}>
                {msg.content}
                {loading && i === messages.length - 1 && msg.role === 'assistant' && msg.content !== '' && (
                  <span style={{
                    display: 'inline-block', width: 2, height: 12,
                    background: '#3b82f6', marginLeft: 2, verticalAlign: 'middle',
                    animation: 'agentBlink 1s step-end infinite',
                  }} />
                )}
              </div>
            </div>
          ))}

          {/* Typing dots */}
          {lastIsEmpty && (
            <div style={{ display: 'flex', gap: 5, padding: '6px 4px' }}>
              {[0, 1, 2].map(d => (
                <div key={d} style={{
                  width: 5, height: 5, borderRadius: '50%', background: '#3b82f6',
                  animation: `agentBounce 1.2s ease-in-out ${d * 0.18}s infinite`,
                }} />
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '10px 12px',
          borderTop: '1px solid rgba(59,130,246,0.1)',
          display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0,
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
              border: '1px solid rgba(59,130,246,0.15)', outline: 'none',
              color: '#e8e8f0', fontFamily: 'var(--font-sans)', fontSize: 13,
              padding: '8px 11px', resize: 'none', lineHeight: 1.5,
              maxHeight: 80, overflowY: 'auto',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.45)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(59,130,246,0.15)')}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            style={{
              width: 36, height: 36, flexShrink: 0,
              background: input.trim() && !loading ? '#3b82f6' : 'rgba(59,130,246,0.15)',
              border: 'none',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              color: '#fff', fontSize: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close AI agent chat' : 'Chat with AI agent'}
        aria-expanded={open}
        style={{
          position: 'fixed', bottom: 28, right: 28,
          width: 52, height: 52, borderRadius: '50%',
          background: open ? 'rgba(8,8,14,0.97)' : '#3b82f6',
          border: `1px solid ${open ? 'rgba(59,130,246,0.4)' : '#3b82f6'}`,
          cursor: 'pointer', zIndex: 300,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open
            ? '0 0 0 rgba(59,130,246,0)'
            : '0 0 28px rgba(59,130,246,0.5), 0 0 60px rgba(59,130,246,0.15)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.75)',
          transition: 'opacity 0.4s ease, transform 0.4s ease, background 0.2s, box-shadow 0.2s',
        }}
      >
        <span style={{
          fontSize: open ? 18 : 20, lineHeight: 1,
          transition: 'font-size 0.2s',
          color: open ? '#6b6b8a' : '#fff',
        }}>
          {open ? '✕' : '◈'}
        </span>
      </button>

      <style>{`
        @keyframes agentBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes agentBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.6; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
