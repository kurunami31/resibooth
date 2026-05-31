import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const nav = useNavigate()

  return (
    <div
      className="anim-in"
      onClick={() => nav('/packages')}
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
        background:
          'radial-gradient(circle at 20% 30%, rgba(28,25,23,.02) 0%, transparent 50%),' +
          'radial-gradient(circle at 80% 70%, rgba(28,25,23,.02) 0%, transparent 50%),' +
          'repeating-linear-gradient(0deg, transparent, transparent 2rem, rgba(28,25,23,.02) 2rem, rgba(28,25,23,.02) 2.0625rem),' +
          'repeating-linear-gradient(90deg, transparent, transparent 2rem, rgba(28,25,23,.02) 2rem, rgba(28,25,23,.02) 2.0625rem)',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '6%',
        left: '8%',
        width: '3rem',
        height: '3rem',
        border: '2px dashed rgba(28,25,23,.06)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '10%',
        width: '.25rem',
        height: '.25rem',
        background: 'rgba(28,25,23,.06)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '4rem',
        height: '4rem',
        border: '1.5px dashed rgba(28,25,23,.05)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '22%',
        right: '12%',
        width: '.25rem',
        height: '.25rem',
        background: 'rgba(28,25,23,.06)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '5%',
        width: '1px',
        height: '4rem',
        background: 'rgba(28,25,23,.04)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '6%',
        width: '1px',
        height: '3rem',
        background: 'rgba(28,25,23,.04)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '15%',
        width: '2.5rem',
        height: '1px',
        background: 'rgba(28,25,23,.04)',
        pointerEvents: 'none',
      }} />

      <img
        src="/logo.png"
        alt="RESIBOOTH"
        style={{
          width: '20rem',
          height: '20rem',
          objectFit: 'contain',
          display: 'block',
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      />

      <div
        style={{
          width: '14rem',
          height: '4.5rem',
          borderRadius: '1rem',
          border: '2.5px solid #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '1rem',
          color: '#1c1917',
          background: 'transparent',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Start
      </div>
    </div>
  )
}
