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
      {/* Large radial gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, rgba(212,90,53,.06) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(212,90,53,.04) 0%, transparent 50%)', pointerEvents: 'none' }} />

      {/* Animated rotating rings — bolder */}
      <div className="anim-rotate-slow" style={{ position: 'absolute', top: '-15%', right: '-10%', width: '32rem', height: '32rem', borderRadius: '50%', border: '2px solid rgba(212,90,53,.12)', pointerEvents: 'none' }} />
      <div className="anim-rotate-reverse" style={{ position: 'absolute', top: '-6%', right: '-2%', width: '18rem', height: '18rem', borderRadius: '50%', border: '3px dotted rgba(212,90,53,.1)', pointerEvents: 'none' }} />
      <div className="anim-rotate-slow" style={{ position: 'absolute', bottom: '-12%', left: '-8%', width: '26rem', height: '26rem', borderRadius: '50%', border: '2px solid rgba(212,90,53,.08)', pointerEvents: 'none' }} />
      <div className="anim-rotate-reverse" style={{ position: 'absolute', bottom: '-5%', left: '-3%', width: '14rem', height: '14rem', borderRadius: '50%', border: '3px dashed rgba(212,90,53,.07)', pointerEvents: 'none' }} />

      {/* Floating squares — bolder */}
      <div className="anim-float" style={{ position: 'absolute', top: '15%', left: '8%', width: '2rem', height: '2rem', border: '2px solid rgba(212,90,53,.18)', borderRadius: '.375rem', transform: 'rotate(20deg)', pointerEvents: 'none' }} />
      <div className="anim-float-delayed" style={{ position: 'absolute', bottom: '20%', right: '10%', width: '2.5rem', height: '2.5rem', border: '2px solid rgba(212,90,53,.14)', borderRadius: '.375rem', transform: 'rotate(-15deg)', pointerEvents: 'none' }} />
      <div className="anim-float" style={{ position: 'absolute', top: '60%', left: '4%', width: '1.25rem', height: '1.25rem', border: '2px solid rgba(212,90,53,.1)', borderRadius: '.25rem', transform: 'rotate(45deg)', pointerEvents: 'none' }} />
      <div className="anim-float-delayed" style={{ position: 'absolute', top: '25%', right: '5%', width: '1rem', height: '1rem', background: 'rgba(212,90,53,.1)', borderRadius: '.25rem', transform: 'rotate(10deg)', pointerEvents: 'none' }} />

      {/* Triangles — bolder */}
      <div className="anim-float" style={{ position: 'absolute', top: '35%', right: '12%', width: 0, height: 0, borderLeft: '1rem solid transparent', borderRight: '1rem solid transparent', borderBottom: '1.5rem solid rgba(212,90,53,.12)', pointerEvents: 'none' }} />
      <div className="anim-float-delayed" style={{ position: 'absolute', bottom: '38%', left: '6%', width: 0, height: 0, borderLeft: '.75rem solid transparent', borderRight: '.75rem solid transparent', borderTop: '1.25rem solid rgba(212,90,53,.08)', pointerEvents: 'none' }} />

      {/* Plus signs */}
      <div className="anim-float-delayed" style={{ position: 'absolute', top: '22%', left: '30%', fontSize: '1.25rem', color: 'rgba(212,90,53,.12)', fontWeight: 300, pointerEvents: 'none' }}>+</div>
      <div className="anim-float" style={{ position: 'absolute', bottom: '28%', right: '25%', fontSize: '1rem', color: 'rgba(212,90,53,.1)', fontWeight: 300, pointerEvents: 'none' }}>+</div>

      {/* Dots — bigger and bolder */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', width: '.5rem', height: '.5rem', borderRadius: '50%', background: 'rgba(212,90,53,.2)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '18%', right: '22%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.15)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '25%', width: '.5rem', height: '.5rem', borderRadius: '50%', background: 'rgba(212,90,53,.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '35%', right: '30%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.13)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '6%', width: '.25rem', height: '.25rem', borderRadius: '50%', background: 'rgba(212,90,53,.1)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '6%', left: '35%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.16)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '8%', right: '40%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.14)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '42%', right: '6%', width: '.25rem', height: '.25rem', borderRadius: '50%', background: 'rgba(212,90,53,.12)', pointerEvents: 'none' }} />

      {/* Cross lines */}
      <div className="anim-float" style={{ position: 'absolute', top: '12%', left: '50%', width: '2px', height: '4rem', background: 'rgba(212,90,53,.1)', pointerEvents: 'none' }} />
      <div className="anim-float-delayed" style={{ position: 'absolute', bottom: '12%', left: '35%', width: '3.5rem', height: '2px', background: 'rgba(212,90,53,.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '48%', right: '15%', width: '2.5rem', height: '2px', background: 'rgba(212,90,53,.07)', pointerEvents: 'none' }} />

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
      <div className="anim-pulse-width" style={{ position: 'absolute', bottom: '8%', left: '50%', width: '3rem', height: '2px', background: 'rgba(212,90,53,.25)', pointerEvents: 'none', transform: 'translateX(-50%)' }} />
    </div>
  )
}
