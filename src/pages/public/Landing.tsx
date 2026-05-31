import { useNavigate } from 'react-router-dom'
import { Camera, Package, Print, Mail, Play } from '../../components/Icons'

const steps = [
  { icon: Package, label: 'Choose Package', desc: 'Select from our curated photo packages' },
  { icon: Camera, label: 'Take Photos', desc: 'Step into the booth and capture your moments' },
  { icon: Print, label: 'Get Prints', desc: 'Receive high-quality printed copies instantly' },
  { icon: Mail, label: 'Digital Copy', desc: 'Get a soft copy sent straight to your email' },
]

export default function Landing() {
  const nav = useNavigate()

  return (
    <div className="anim-in" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background decorations */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at 20% 30%, rgba(212,90,53,.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(212,90,53,.03) 0%, transparent 50%)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="anim-rotate-slow" style={{ position: 'fixed', top: '-10%', right: '-5%', width: '28rem', height: '28rem', borderRadius: '50%', border: '2px solid rgba(212,90,53,.08)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="anim-rotate-reverse" style={{ position: 'fixed', bottom: '-8%', left: '-3%', width: '22rem', height: '22rem', borderRadius: '50%', border: '2px dashed rgba(212,90,53,.06)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="anim-float" style={{ position: 'fixed', top: '20%', left: '5%', width: '1.5rem', height: '1.5rem', border: '2px solid rgba(212,90,53,.12)', borderRadius: '.375rem', transform: 'rotate(25deg)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="anim-float-delayed" style={{ position: 'fixed', bottom: '25%', right: '5%', width: '2rem', height: '2rem', border: '2px solid rgba(212,90,53,.1)', borderRadius: '.375rem', transform: 'rotate(-15deg)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="anim-float" style={{ position: 'fixed', top: '40%', right: '8%', width: 0, height: 0, borderLeft: '.875rem solid transparent', borderRight: '.875rem solid transparent', borderBottom: '1.25rem solid rgba(212,90,53,.09)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="anim-float-delayed" style={{ position: 'fixed', bottom: '40%', left: '4%', width: 0, height: 0, borderLeft: '.625rem solid transparent', borderRight: '.625rem solid transparent', borderTop: '1rem solid rgba(212,90,53,.06)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: '12%', left: '30%', width: '.375rem', height: '.375rem', borderRadius: '50%', background: 'rgba(212,90,53,.18)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '18%', right: '25%', width: '.5rem', height: '.5rem', borderRadius: '50%', background: 'rgba(212,90,53,.14)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Hero */}
      <section style={{ padding: '4rem 1.25rem 3rem', textAlign: 'center', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', marginBottom: '1.5rem', padding: '.375rem .875rem', borderRadius: '1.25rem', background: 'rgba(212,90,53,.08)', border: '1px solid rgba(212,90,53,.15)' }}>
          <Camera size={14} />
          <span style={{ fontSize: '.75rem', color: '#d45a35', fontWeight: 600, letterSpacing: '.03em' }}>Self-Service Photo Booth</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-.03em', color: '#1c1917', marginBottom: '1rem' }}>
          Your photos,<br />printed in seconds.
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'rgba(28,25,23,.45)', lineHeight: 1.7, maxWidth: '32rem', margin: '0 auto 1.5rem', position: 'relative' }}>
          Select a package, step inside, and capture your memories. No attendant needed — just you, the camera, and instant prints.
        </p>
        <p style={{ fontSize: '1.125rem', color: '#d45a35', fontWeight: 700, fontStyle: 'italic', marginBottom: '2rem', position: 'relative' }}>
          Capture the moment, keep it forever.
        </p>
        <button className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.0625rem', position: 'relative' }} onClick={() => nav('/packages')}>
          <Play size={18} /> Start Your Session
        </button>
      </section>

      {/* How It Works */}
      <section className="max-w" style={{ padding: '2rem 1.25rem 4rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '.5rem' }}>How It Works</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.2 }}>Four simple steps</h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(11rem, 1fr))',
          gap: '1rem',
          position: 'relative',
        }}>
          {steps.map((s, i) => (
            <div key={i} className="card" style={{
              textAlign: 'center', padding: '1.5rem 1rem', borderColor: 'rgba(28,25,23,.06)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '3rem', height: '3rem', borderRadius: '0 0 0 3rem', background: 'rgba(212,90,53,.04)', pointerEvents: 'none' }} />
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '.75rem', background: 'rgba(212,90,53,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto .75rem', color: '#d45a35' }}>
                <s.icon size={20} />
              </div>
              <div style={{ position: 'absolute', top: '.5rem', left: '.75rem', fontSize: '.625rem', fontWeight: 800, color: 'rgba(212,90,53,.15)' }}>0{i + 1}</div>
              <div style={{ fontSize: '.9375rem', fontWeight: 700, marginBottom: '.25rem' }}>{s.label}</div>
              <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', lineHeight: 1.4 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '1rem 1.25rem 2rem', textAlign: 'center', fontSize: '.6875rem', color: 'rgba(28,25,23,.2)', letterSpacing: '.03em', position: 'relative', zIndex: 1 }}>
        RESIBOOTH &middot; Self-Service Photo Booth
      </footer>
    </div>
  )
}
