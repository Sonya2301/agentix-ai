'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { MCPPlayground } from './MCPPlayground'

// ── Scroll chapters ──────────────────────────────────────────────
// 0.00–0.13  Loading → Galaxy formation
// 0.13–0.27  Galaxy stable   → Brand reveal
// 0.27–0.43  Galaxy → Explode → The Shift stats
// 0.43–0.58  Explode → Sphere → Three Layers
// 0.58–0.72  Sphere stable   → Services + Pricing
// 0.72–0.86  Sphere stable   → MCP Live Demo
// 0.86–1.00  Sphere compresses → About + CTA

function easeInOut(t: number): number {
  const c = Math.min(Math.max(t, 0), 1)
  return c < 0.5 ? 2 * c * c : -1 + (4 - 2 * c) * c
}

function invlerp(a: number, b: number, v: number): number {
  return Math.min(Math.max((v - a) / (b - a), 0), 1)
}

// Galaxy sits slightly below center — camera tilts overhead to reveal the spiral disk
const GALAXY_Y = -1.0

function buildGalaxy(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  const ARMS = 3
  for (let i = 0; i < count; i++) {
    // Dense glowing core (inner 15% of particles)
    if (i < count * 0.15) {
      const r = Math.pow(Math.random(), 2) * 1.2
      const a = Math.random() * Math.PI * 2
      pos[i * 3]     = r * Math.cos(a)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.08 + GALAXY_Y
      pos[i * 3 + 2] = r * Math.sin(a)
      continue
    }
    // Spiral arms
    const arm = i % ARMS
    const armAngle = (arm / ARMS) * Math.PI * 2
    const t = (i - count * 0.15) / (count * 0.85)
    const radius = Math.pow(t, 0.5) * 5.8
    const spin   = t * Math.PI * 7 + armAngle
    // Scatter grows with radius for natural arm width
    const scatter = (Math.random() - 0.5) * (0.15 + radius * 0.07)
    pos[i * 3]     = radius * Math.cos(spin) + scatter
    pos[i * 3 + 1] = (Math.random() - 0.5) * 0.10 + GALAXY_Y   // very flat disk
    pos[i * 3 + 2] = radius * Math.sin(spin) + scatter
  }
  return pos
}

function buildSphere(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  const r = 3.2
  for (let i = 0; i < count; i++) {
    const phi   = Math.acos(1 - 2 * (i + 0.5) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = r * Math.cos(phi)
    pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  }
  return pos
}

function buildExplode(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 30
    pos[i * 3 + 1] = (Math.random() - 0.5) * 17
    pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
  }
  return pos
}

function buildCluster(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r     = Math.random() * 0.18
    const phi   = Math.random() * Math.PI
    const theta = Math.random() * Math.PI * 2
    pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = r * Math.cos(phi)
    pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  }
  return pos
}

function lerpPositions(
  from: Float32Array,
  to: Float32Array,
  t: number,
  out: Float32Array
) {
  const e = easeInOut(t)
  for (let i = 0; i < out.length; i++) {
    out[i] = from[i] + (to[i] - from[i]) * e
  }
}

// ── Star texture — soft glowing circle, replaces default squares ──
function createStarTexture(): THREE.CanvasTexture {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const half = size / 2

  // Outer soft glow
  const glow = ctx.createRadialGradient(half, half, 0, half, half, half)
  glow.addColorStop(0,    'rgba(255, 255, 255, 1)')
  glow.addColorStop(0.15, 'rgba(200, 225, 255, 0.95)')
  glow.addColorStop(0.35, 'rgba(130, 180, 255, 0.6)')
  glow.addColorStop(0.65, 'rgba(60,  120, 255, 0.15)')
  glow.addColorStop(1,    'rgba(0,   0,   0,   0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, size, size)

  // Bright hard core
  const core = ctx.createRadialGradient(half, half, 0, half, half, half * 0.12)
  core.addColorStop(0,   'rgba(255, 255, 255, 1)')
  core.addColorStop(0.5, 'rgba(230, 240, 255, 0.9)')
  core.addColorStop(1,   'rgba(255, 255, 255, 0)')
  ctx.fillStyle = core
  ctx.fillRect(0, 0, size, size)

  // Subtle 4-point diffraction spike
  ctx.globalCompositeOperation = 'lighter'
  const spike = (angle: number) => {
    const len = half * 0.9
    const x1 = half + Math.cos(angle) * 1.5
    const y1 = half + Math.sin(angle) * 1.5
    const x2 = half + Math.cos(angle) * len
    const y2 = half + Math.sin(angle) * len
    const spk = ctx.createLinearGradient(half, half, x2, y2)
    spk.addColorStop(0,   'rgba(200, 220, 255, 0.5)')
    spk.addColorStop(0.4, 'rgba(150, 190, 255, 0.2)')
    spk.addColorStop(1,   'rgba(0, 0, 0, 0)')
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = spk
    ctx.lineWidth = 1.5
    ctx.stroke()
  }
  spike(0); spike(Math.PI); spike(Math.PI / 2); spike(-Math.PI / 2)

  return new THREE.CanvasTexture(canvas)
}

// ── Chapter panel style ──────────────────────────────────────────
function panelStyle(visible: boolean): React.CSSProperties {
  return {
    position: 'fixed',
    inset: 0,
    zIndex: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '72px 24px 24px',
    overflowY: 'auto',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0px)' : 'translateY(28px)',
    transition: 'opacity 0.9s ease, transform 0.9s ease',
    pointerEvents: visible ? 'auto' : 'none',
    textAlign: 'center',
  }
}

// ── Stat chip ────────────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '16px 24px',
      border: '1px solid rgba(59,130,246,0.25)',
      background: 'rgba(10,10,15,0.7)',
      backdropFilter: 'blur(12px)',
      minWidth: 120,
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 500, color: '#e8e8f0', lineHeight: 1 }}>{value}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b8a', marginTop: 6 }}>{label}</span>
    </div>
  )
}

// ── Layer badge ──────────────────────────────────────────────────
function LayerBadge({ num, label, color, desc }: { num: string; label: string; color: string; desc: string }) {
  return (
    <div style={{
      padding: '20px 28px',
      border: `1px solid ${color}33`,
      background: 'rgba(10,10,15,0.75)',
      backdropFilter: 'blur(12px)',
      maxWidth: 280,
      textAlign: 'left',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color, marginBottom: 8 }}>{num}</div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: '#e8e8f0', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#9898b4', lineHeight: 1.6 }}>{desc}</div>
    </div>
  )
}

export default function GalaxyExperience() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const scrollRef   = useRef(0)
  const rafRef      = useRef<number>(0)
  // Smooth camera state — mutated directly in rAF, no React re-renders
  const camRef      = useRef({ y: 0, z: 8, lookY: 0 })
  const [chapter, setChapter]   = useState(0)
  const [booted,  setBooted]    = useState(false)
  const [reduced, setReduced]   = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const getChapter = useCallback((p: number) => {
    if (p < 0.13) return 0
    if (p < 0.27) return 1
    if (p < 0.43) return 2
    if (p < 0.58) return 3
    if (p < 0.72) return 4
    if (p < 0.86) return 5
    return 6
  }, [])

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      setBooted(true)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.innerWidth < 768
    const COUNT    = isMobile ? 1800 : 4200

    // ── Three.js bootstrap ──
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 8

    // ── Pre-compute particle states ──
    const galaxyPos  = buildGalaxy(COUNT)
    const spherePos  = buildSphere(COUNT)
    const explodePos = buildExplode(COUNT)
    const clusterPos = buildCluster(COUNT)
    const currentPos = new Float32Array(clusterPos) // start clustered

    // ── Colors: blue-white spectrum ──
    const colors = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random()
      colors[i * 3]     = 0.12 + t * 0.55   // R: low → medium
      colors[i * 3 + 1] = 0.32 + t * 0.50   // G: medium
      colors[i * 3 + 2] = 0.88 + t * 0.12   // B: high → near white
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(currentPos, 3))
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3))

    const starTexture = createStarTexture()

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.22 : 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      map: starTexture,
      alphaTest: 0.001,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Boot: fade in after a brief delay
    setTimeout(() => setBooted(true), 900)

    // ── Scroll handler ──
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? window.scrollY / max : 0
      setChapter(getChapter(scrollRef.current))
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Resize handler ──
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ──
    const startTime = performance.now()

    function tick() {
      rafRef.current = requestAnimationFrame(tick)
      const elapsed = (performance.now() - startTime) / 1000
      const p       = scrollRef.current
      const pos     = geometry.attributes.position.array as Float32Array

      // Map scroll progress → particle morphing
      if (p < 0.15) {
        lerpPositions(clusterPos, galaxyPos, invlerp(0, 0.15, p), pos)
      } else if (p < 0.40) {
        // Galaxy stable — add gentle drift
        lerpPositions(galaxyPos, galaxyPos, 0, pos)
      } else if (p < 0.58) {
        lerpPositions(galaxyPos, explodePos, invlerp(0.40, 0.58, p), pos)
      } else if (p < 0.74) {
        lerpPositions(explodePos, spherePos, invlerp(0.58, 0.74, p), pos)
      } else if (p < 0.93) {
        // Sphere stable
        lerpPositions(spherePos, spherePos, 0, pos)
      } else {
        // Sphere compresses back toward cluster for the final CTA chapter
        lerpPositions(spherePos, clusterPos, invlerp(0.93, 1.0, p), pos)
      }

      geometry.attributes.position.needsUpdate = true

      // Continuous gentle rotation
      points.rotation.y = elapsed * 0.045 + p * 1.4
      points.rotation.x = Math.sin(elapsed * 0.025) * 0.04

      // ── Smooth camera — tilts overhead to reveal spiral, returns frontal for explosion ──
      let tCamY: number, tCamZ: number, tLookY: number

      if (p < 0.15) {
        // Loading → camera sweeps up to overhead angle as galaxy forms
        const t = easeInOut(invlerp(0, 0.15, p))
        tCamY  = t * 2.6
        tCamZ  = 8 - t * 1.5
        tLookY = GALAXY_Y * t
      } else if (p < 0.42) {
        // Galaxy stable — elevated, looking down at the spiral disk
        tCamY  = 2.6
        tCamZ  = 6.5
        tLookY = GALAXY_Y
      } else if (p < 0.58) {
        // Transition to frontal for explosion
        const t = easeInOut(invlerp(0.42, 0.58, p))
        tCamY  = 2.6 * (1 - t)
        tCamZ  = 6.5 + t * 1.5
        tLookY = GALAXY_Y * (1 - t)
      } else {
        // Explosion + sphere: camera stays frontal, zooms in gently
        tCamY  = 0
        tCamZ  = 8 - (p - 0.58) * 3.5
        tLookY = 0
      }

      // Smooth lerp toward targets every frame
      const cam = camRef.current
      cam.y    += (tCamY  - cam.y)    * 0.06
      cam.z    += (tCamZ  - cam.z)    * 0.06
      cam.lookY += (tLookY - cam.lookY) * 0.06

      camera.position.y = cam.y
      camera.position.z = cam.z
      camera.lookAt(0, cam.lookY, 0)

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      starTexture.dispose()
      renderer.dispose()
    }
  }, [getChapter])

  // ── Fallback for reduced-motion users ──
  if (reduced) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 24 }}>AGENSO</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,6vw,64px)', fontStyle: 'italic', color: 'var(--text)', textAlign: 'center', lineHeight: 1.1 }}>
          ChatGPT can&apos;t find<br />your website.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-dim)', maxWidth: 560, textAlign: 'center', marginTop: 24, lineHeight: 1.7 }}>
          60% of searches now end without a click. We build websites that work for both human visitors and AI agents.
        </p>
        <a href="https://calendly.com/sona-masova23" style={{ marginTop: 40, padding: '12px 28px', background: 'var(--accent)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
          Book a Call
        </a>
      </div>
    )
  }

  return (
    <>
      {/* ── Deep space background ── */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, background: '#0a0a0f', zIndex: 0 }} />

      {/* ── Three.js canvas ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
      />

      {/* ── Loading screen ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
          background: '#0a0a0f',
          opacity: booted ? 0 : 1,
          transition: 'opacity 1.2s ease',
          pointerEvents: booted ? 'none' : 'auto',
        }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          border: '1.5px solid transparent',
          borderTopColor: '#3b82f6',
          animation: 'spin 1s linear infinite',
          boxShadow: '0 0 24px rgba(59,130,246,0.5)',
        }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3b82f6' }}>
          AGENSO
        </span>
      </div>

      {/* ── Navigation — always visible after boot ── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          padding: isMobile ? '16px 20px' : '20px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          opacity: booted ? 1 : 0,
          transition: 'opacity 1s ease 0.5s',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.16em', color: '#e8e8f0', textTransform: 'uppercase', fontWeight: 500 }}>
          AGENSO
        </span>
        <div style={{ display: 'flex', gap: isMobile ? 12 : 28, alignItems: 'center' }}>
          {!isMobile && ['Services', 'Pricing', 'About'].map(item => (
            <span key={item} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: '#6b6b8a', textTransform: 'uppercase', cursor: 'default' }}>
              {item}
            </span>
          ))}
          <a
            href="https://calendly.com/sona-masova23"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em',
              color: '#0a0a0f', background: '#3b82f6',
              padding: isMobile ? '8px 14px' : '9px 18px', textTransform: 'uppercase', textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* ── Scroll hint (chapter 0) ── */}
      <div style={{
        ...panelStyle(booted && chapter === 0),
        justifyContent: 'flex-end',
        paddingBottom: 48,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b6b8a' }}>Scroll to enter</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #3b82f6, transparent)' }} />
        </div>
      </div>

      {/* ── Chapter 1: Brand reveal — centered in upper sky, galaxy spiral below ── */}
      <div style={{
        ...panelStyle(chapter === 1),
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '12vh',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(52px, 7vw, 96px)',
          fontWeight: 400,
          letterSpacing: '0.04em',
          color: '#e8e8f0',
          marginBottom: 14,
          textAlign: 'center',
          lineHeight: 1,
        }}>
          AGENSO
        </h1>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'clamp(10px, 1.2vw, 13px)',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#3b82f6', marginBottom: 28, display: 'block', textAlign: 'center',
        }}>
          AI WEB STUDIO
        </span>
        <p style={{
          fontFamily: 'var(--font-sans)', fontWeight: 300,
          fontSize: 'clamp(13px, 1.5vw, 16px)', color: '#6b6b8a',
          letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center',
        }}>
          The universe of possibilities starts here.
        </p>
      </div>

      {/* ── Chapter 2: The Shift ── */}
      <div style={panelStyle(chapter === 2)}>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 'clamp(32px, 5vw, 60px)', color: '#e8e8f0',
          lineHeight: 1.1, marginBottom: 16,
        }}>
          Websites built for humans.<br />And for AI.
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Stat value="60.3%" label="Zero-click searches" />
          <Stat value="59%"   label="Traffic is bots" />
          <Stat value="2×"    label="AI search converts" />
          <Stat value="18%"   label="Referrals from AI" />
        </div>
      </div>

      {/* ── Chapter 3: Three Layers ── */}
      <div style={panelStyle(chapter === 3)}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 20 }}>
          Three layers. One studio.
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', maxWidth: 920 }}>
          <LayerBadge
            num="01 — Now"
            label="AI-Built Websites"
            color="#10b981"
            desc="Fast, beautiful, custom sites built with AI tools. Delivered in 5–7 days."
          />
          <LayerBadge
            num="02 — Upsell"
            label="AI-Powered Websites"
            color="#f59e0b"
            desc="Embedded lead agents that qualify, book, and support 24/7 without a human in the loop."
          />
          <LayerBadge
            num="03 — Premium"
            label="Agent-Friendly Websites"
            color="#3b82f6"
            desc="llms.txt, Schema.org, AEO/GEO, MCP integration. Visible to AI search."
          />
        </div>
      </div>

      {/* ── Chapter 4: Services + Pricing ── */}
      <div style={panelStyle(chapter === 4)}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 20 }}>
          Transparent pricing
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(28px,4vw,48px)', color: '#e8e8f0', marginBottom: 32 }}>
          Simple. Honest. No surprises.
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {[
            { tier: 'Starter',  price: '€1,200',  desc: 'AI-Built + Layer 03 basics' },
            { tier: 'Studio',   price: '€2,500',  desc: 'Starter + AEO/GEO + strategy' },
            { tier: 'Premium',  price: '€4,000',  desc: 'Studio + custom design + 1mo free maintenance' },
            { tier: 'Maintenance', price: '€150/mo', desc: 'Security, updates, AI visibility monitoring' },
          ].map(({ tier, price, desc }) => (
            <div key={tier} style={{
              padding: '20px 24px', minWidth: 180,
              border: '1px solid rgba(59,130,246,0.2)',
              background: 'rgba(10,10,15,0.75)',
              backdropFilter: 'blur(12px)',
              textAlign: 'left',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b8a', marginBottom: 6 }}>{tier}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: '#e8e8f0', marginBottom: 8 }}>{price}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#9898b4', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Chapter 5: MCP Live Demo ── */}
      <div style={panelStyle(chapter === 5)}>
        <MCPPlayground isMobile={isMobile} />
      </div>

      {/* ── Chapter 6: About + CTA ── */}
      <div style={panelStyle(chapter === 6)}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 20 }}>
          The window is now
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 'clamp(28px,4.5vw,56px)', color: '#e8e8f0',
          lineHeight: 1.1, marginBottom: 16, maxWidth: 600,
        }}>
          12–18 months before this becomes mainstream.
        </h2>
        <a
          href="https://calendly.com/sona-masova23"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: '0.12em',
            textTransform: 'uppercase', textDecoration: 'none',
            color: '#0a0a0f', background: '#3b82f6',
            padding: '20px 56px',
            boxShadow: '0 0 60px rgba(59,130,246,0.45)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          Book a Free 30-min Call
        </a>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6b6b8a', marginTop: 16, letterSpacing: '0.08em' }}>
          sona.masova23@gmail.com · Bratislava, Slovakia
        </p>
      </div>
    </>
  )
}
