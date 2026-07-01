// Animated aurora background for the homepage hero: five blurred radial blobs
// drifting slowly over the dark base, with a dark scrim above them for legibility.
// Drift is frozen under prefers-reduced-motion via the global media query.
export default function Aurora() {
  const blob: React.CSSProperties = {
    position: 'absolute', borderRadius: '50%',
  }
  return (
    <>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, filter: 'blur(24px)', pointerEvents: 'none' }}>
        <div style={{ ...blob, top: '-30%', left: '-20%', width: '70%', height: '95%',
          background: 'radial-gradient(circle, #e458ac 0%, rgba(228,88,172,0.5) 34%, transparent 66%)',
          animation: 'drift1 36s ease-in-out infinite' }} />
        <div style={{ ...blob, top: '-32%', right: '-20%', width: '72%', height: '98%',
          background: 'radial-gradient(circle, #5f7ce8 0%, rgba(95,124,232,0.5) 34%, transparent 66%)',
          animation: 'drift2 42s ease-in-out infinite' }} />
        <div style={{ ...blob, top: '-6%', left: '22%', width: '56%', height: '72%',
          background: 'radial-gradient(circle, #9152e0 0%, rgba(145,82,224,0.4) 32%, transparent 64%)',
          animation: 'drift3 39s ease-in-out infinite' }} />
        <div style={{ ...blob, bottom: '-34%', left: '-22%', width: '72%', height: '98%',
          background: 'radial-gradient(circle, #2f6fe6 0%, rgba(47,111,230,0.5) 34%, transparent 66%)',
          animation: 'drift4 44s ease-in-out infinite' }} />
        <div style={{ ...blob, bottom: '-36%', right: '-20%', width: '70%', height: '95%',
          background: 'radial-gradient(circle, #ff7a55 0%, rgba(255,122,85,0.45) 32%, transparent 64%)',
          animation: 'drift1 48s ease-in-out infinite reverse' }} />
      </div>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 46% 44% at 50% 50%, rgba(8,7,9,0.72), rgba(8,7,9,0.22) 60%, transparent 100%)',
      }} />
    </>
  )
}
