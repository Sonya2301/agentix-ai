'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Global scroll-reveal driver. Watches every [data-reveal] element and adds
// .is-visible when it scrolls into view. Re-scans on client-side navigation.
export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'))
    if (els.length === 0) return

    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible')
          io.unobserve(en.target)
        }
      })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 })

    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [pathname])

  return null
}
