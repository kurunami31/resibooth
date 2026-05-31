import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const nav = useNavigate()

  return (
    <div
      onClick={() => nav('/landing')}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: '2rem',
        cursor: 'pointer',
        userSelect: 'none',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        background: '#fff',
      }}
    >
      {/* Large decorative circles */}
      <div style={{ position: 'absolute', top: '-12%', right: '-8%', width: '28rem', height: '28rem', borderRadius: '50%', border: '1px solid rgba(212,90,53,.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-8%', right: '-4%', width: '20rem', height: '20rem', borderRadius: '50%', border: '1px solid rgba(212,90,53,.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-6%', width: '24rem', height: '24rem', borderRadius: '50%', border: '1px solid rgba(212,90,53,.05)', pointerEvents: 'none' }} />

      {/* Small decorative dots scattered */}
      <div style={{ position: 'absolute', top: '15%', left: '12%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.12)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '25%', right: '14%', width: '.25rem', height: '.25rem', borderRadius: '50%', background: 'rgba(212,90,53,.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '18%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.1)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '35%', right: '16%', width: '.25rem', height: '.25rem', borderRadius: '50%', background: 'rgba(212,90,53,.07)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '45%', left: '6%', width: '.1875rem', height: '.1875rem', borderRadius: '50%', background: 'rgba(212,90,53,.06)', pointerEvents: 'none' }} />

      {/* Vertical accent lines */}
      <div style={{ position: 'absolute', top: '12%', left: '50%', width: '1px', height: '6rem', background: 'rgba(212,90,53,.08)', pointerEvents: 'none', transform: 'translateX(-50%)' }} />

      {/* Logo */}
      <img
        src="/logo.png"
        alt="RESIBOOTH"
        style={{
          width: '16rem',
          height: '16rem',
          objectFit: 'contain',
          display: 'block',
          marginBottom: '2rem',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Title */}
      <h1 style={{
        fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
        fontWeight: 900,
        color: '#1c1917',
        letterSpacing: '-.03em',
        margin: 0,
        marginBottom: '.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        RESIBOOTH
      </h1>
      <p style={{
        fontSize: '1rem',
        color: 'rgba(28,25,23,.4)',
        letterSpacing: '.15em',
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: '2.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        Photo Studio
      </p>

      {/* Start button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '.75rem',
        padding: '1rem 2.5rem',
        borderRadius: '3rem',
        border: '2px solid #1c1917',
        background: 'transparent',
        position: 'relative',
        zIndex: 1,
        transition: 'all .2s',
        cursor: 'pointer',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#1c1917'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1c1917' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '.02em', fontFamily: 'inherit' }}>Tap to Start</span>
      </div>

      {/* Bottom accent */}
      <div style={{ position: 'absolute', bottom: '8%', left: '50%', width: '3rem', height: '1px', background: 'rgba(212,90,53,.15)', pointerEvents: 'none', transform: 'translateX(-50%)' }} />
    </div>
  )
}
