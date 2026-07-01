import Link from 'next/link'

// The "L" mark + wordmark. size scales the mark; wordmark size fixed per use.
export default function Logo({ mark = 30, word = 18 }: { mark?: number; word?: number }) {
  return (
    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{
        width: mark, height: mark, borderRadius: mark * 0.3,
        display: 'inline-grid', placeItems: 'center',
        background: 'var(--grad-blue)', color: 'var(--ink)',
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: mark * 0.53,
        boxShadow: '0 6px 18px -6px rgba(74,158,255,0.7)',
      }}>L</span>
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: word,
        letterSpacing: '-0.01em', color: 'var(--text-strong)',
      }}>
        LYVECA<span style={{ color: 'var(--text-faint)', fontWeight: 500 }}> AI</span>
      </span>
    </Link>
  )
}
