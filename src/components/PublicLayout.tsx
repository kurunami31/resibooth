import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Shared background decorations */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at 20% 30%, rgba(212,90,53,.04) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(212,90,53,.03) 0%, transparent 50%)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="anim-rotate-slow" style={{ position: 'fixed', top: '-8%', right: '-3%', width: '20rem', height: '20rem', borderRadius: '50%', border: '2px solid rgba(212,90,53,.06)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="anim-rotate-reverse" style={{ position: 'fixed', bottom: '-6%', left: '-2%', width: '16rem', height: '16rem', borderRadius: '50%', border: '2px dashed rgba(212,90,53,.04)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="anim-float" style={{ position: 'fixed', top: '15%', left: '4%', width: '1.25rem', height: '1.25rem', border: '2px solid rgba(212,90,53,.08)', borderRadius: '.25rem', transform: 'rotate(20deg)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="anim-float-delayed" style={{ position: 'fixed', bottom: '20%', right: '4%', width: '1.5rem', height: '1.5rem', border: '2px solid rgba(212,90,53,.06)', borderRadius: '.25rem', transform: 'rotate(-15deg)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: '8%', left: '25%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.12)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '12%', right: '20%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.1)', pointerEvents: 'none', zIndex: 0 }} />

      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>

      <footer style={{ borderTop: '1px solid rgba(28,25,23,.04)', padding: '2rem 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="max-w">
          <div className="section-label" style={{ fontSize: '.625rem', marginBottom: '.25rem' }}>resibooth &middot; self-service photo booth</div>
          <div style={{ fontSize: '.625rem', color: 'rgba(28,25,23,.15)' }}>All rights reserved</div>
        </div>
      </footer>
    </div>
  )
}
