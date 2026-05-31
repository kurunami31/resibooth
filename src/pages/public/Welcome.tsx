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
      {/* Animated rotating rings */}
      <div className="anim-rotate-slow" style={{ position: 'absolute', top: '-15%', right: '-10%', width: '32rem', height: '32rem', borderRadius: '50%', border: '1px solid rgba(212,90,53,.06)', pointerEvents: 'none' }} />
      <div className="anim-rotate-reverse" style={{ position: 'absolute', top: '-8%', right: '-4%', width: '20rem', height: '20rem', borderRadius: '50%', border: '1px solid rgba(212,90,53,.04)', pointerEvents: 'none' }} />
      <div className="anim-rotate-slow" style={{ position: 'absolute', bottom: '-12%', left: '-8%', width: '26rem', height: '26rem', borderRadius: '50%', border: '1px solid rgba(212,90,53,.05)', pointerEvents: 'none' }} />

      {/* Geometric accents — squares */}
      <div className="anim-float" style={{ position: 'absolute', top: '18%', left: '10%', width: '1.5rem', height: '1.5rem', border: '1.5px solid rgba(212,90,53,.1)', borderRadius: '.25rem', transform: 'rotate(15deg)', pointerEvents: 'none' }} />
      <div className="anim-float-delayed" style={{ position: 'absolute', bottom: '22%', right: '12%', width: '2rem', height: '2rem', border: '1.5px solid rgba(212,90,53,.08)', borderRadius: '.25rem', transform: 'rotate(-10deg)', pointerEvents: 'none' }} />

      {/* Geometric accents — triangles (CSS borders) */}
      <div className="anim-float" style={{ position: 'absolute', top: '30%', right: '8%', width: 0, height: 0, borderLeft: '.75rem solid transparent', borderRight: '.75rem solid transparent', borderBottom: '1.25rem solid rgba(212,90,53,.06)', pointerEvents: 'none' }} />
      <div className="anim-float-delayed" style={{ position: 'absolute', bottom: '35%', left: '6%', width: 0, height: 0, borderLeft: '.6rem solid transparent', borderRight: '.6rem solid transparent', borderTop: '1rem solid rgba(212,90,53,.04)', pointerEvents: 'none' }} />

      {/* Dots grid */}
      <div style={{ position: 'absolute', top: '12%', left: '20%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.1)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '22%', right: '18%', width: '.25rem', height: '.25rem', borderRadius: '50%', background: 'rgba(212,90,53,.07)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '18%', left: '22%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.09)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '30%', right: '20%', width: '.25rem', height: '.25rem', borderRadius: '50%', background: 'rgba(212,90,53,.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '55%', left: '8%', width: '.1875rem', height: '.1875rem', borderRadius: '50%', background: 'rgba(212,90,53,.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '8%', left: '45%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '35%', width: '.25rem', height: '.25rem', borderRadius: '50%', background: 'rgba(212,90,53,.06)', pointerEvents: 'none' }} />

      {/* Cross lines */}
      <div className="anim-float" style={{ position: 'absolute', top: '14%', left: '50%', width: '1px', height: '5rem', background: 'rgba(212,90,53,.06)', pointerEvents: 'none' }} />
      <div className="anim-float-delayed" style={{ position: 'absolute', bottom: '14%', left: '40%', width: '3rem', height: '1px', background: 'rgba(212,90,53,.06)', pointerEvents: 'none' }} />

      {/* Logo */}
      <img
        src="/logo.png"
        alt=""
        style={{
          width: '16rem',
          height: '16rem',
          objectFit: 'contain',
          display: 'block',
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Subtitle only */}
      <p style={{
        fontSize: '1rem',
        color: 'rgba(28,25,23,.4)',
        letterSpacing: '.15em',
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: '3rem',
        position: 'relative',
        zIndex: 1,
        fontWeight: 500,
      }}>
        Photo Studio
      </p>

      {/* Pixel font button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.75rem',
        padding: '1rem 2.5rem',
        borderRadius: '3rem',
        border: '2.5px solid #000',
        background: 'transparent',
        position: 'relative',
        zIndex: 1,
        transition: 'all .25s',
        cursor: 'pointer',
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '.75rem',
        color: '#1c1917',
        letterSpacing: '.02em',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#1c1917'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1c1917' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        Tap to Start
      </div>

      {/* Bottom accent line */}
      <div className="anim-pulse-width" style={{ position: 'absolute', bottom: '8%', left: '50%', width: '3rem', height: '1.5px', background: 'rgba(212,90,53,.15)', pointerEvents: 'none', transform: 'translateX(-50%)' }} />
    </div>
  )
}
