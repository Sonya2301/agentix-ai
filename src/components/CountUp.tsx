'use client'
import { useEffect, useRef, useState } from 'react'

// Counts a number up from 0 to `value` when it first scrolls into view.
// Respects prefers-reduced-motion (shows the final value immediately).
export default function CountUp({
  value, decimals = 0, suffix = '', prefix = '', duration = 1400, style,
}: {
  value: number
  decimals?: number
  suffix?: string
  prefix?: string
  duration?: number
  style?: React.CSSProperties
}) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) { setN(value); return }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !done.current) {
          done.current = true
          const start = performance.now()
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setN(value * eased)
            if (p < 1) requestAnimationFrame(tick)
            else setN(value)
          }
          requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.4 })

    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return <span ref={ref} style={style}>{prefix}{n.toFixed(decimals)}{suffix}</span>
}
