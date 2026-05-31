import { useNavigate } from 'react-router-dom'
import { getPackages } from '../../lib/database'
import { Camera, Image, Print, Package, ChevronRight, Mail, Play } from '../../components/Icons'

const steps = [
  { icon: Package, label: 'Choose Package', desc: 'Select from our curated photo packages' },
  { icon: Camera, label: 'Take Photos', desc: 'Step into the booth and capture your moments' },
  { icon: Print, label: 'Get Prints', desc: 'Receive high-quality printed copies instantly' },
  { icon: Mail, label: 'Digital Copy', desc: 'Get a soft copy sent straight to your email' },
]

export default function Landing() {
  const nav = useNavigate()
  const pkgs = getPackages().slice(0, 3)

  return (
    <div className="anim-in">
      <section style={{ padding: '5rem 1.25rem 3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', marginBottom: '1.5rem', padding: '.375rem .875rem', borderRadius: '1.25rem', background: 'rgba(212,90,53,.08)', border: '1px solid rgba(212,90,53,.15)' }}>
          <Camera size={14} />
          <span style={{ fontSize: '.75rem', color: '#d45a35', fontWeight: 600, letterSpacing: '.03em' }}>Self-Service Photo Booth</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-.03em', color: '#1c1917', marginBottom: '1rem' }}>
          Your photos,<br />printed in seconds.
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'rgba(28,25,23,.45)', lineHeight: 1.7, maxWidth: '32rem', margin: '0 auto 2rem' }}>
          Select a package, step inside, and capture your memories. No attendant needed — just you, the camera, and instant prints.
        </p>
        <button className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.0625rem' }} onClick={() => nav('/packages')}>
          <Play size={18} /> Start Your Session
        </button>
      </section>

      <section className="max-w" style={{ padding: '2rem 1.25rem 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '.5rem' }}>How It Works</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.2 }}>Four simple steps</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(11rem, 1fr))', gap: '1rem' }}>
          {steps.map((s, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem', borderColor: 'rgba(28,25,23,.06)' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '.75rem', background: 'rgba(212,90,53,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto .75rem', color: '#d45a35' }}>
                <s.icon size={20} />
              </div>
              <div style={{ fontSize: '.9375rem', fontWeight: 700, marginBottom: '.25rem' }}>{s.label}</div>
              <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', lineHeight: 1.4 }}>{s.desc}</div>
              <div style={{ marginTop: '.5rem', width: '1.25rem', height: '.125rem', background: 'rgba(212,90,53,.3)', margin: '.5rem auto 0', borderRadius: '.0625rem' }} />
            </div>
          ))}
        </div>
      </section>

      <section className="max-w" style={{ padding: '1rem 1.25rem 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '.5rem' }}>Pricing</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.2 }}>Choose your package</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))', gap: '1rem', maxWidth: '48rem', margin: '0 auto' }}>
          {pkgs.map((p: any, i: number) => (
            <div key={p.id} className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem', borderColor: i === 1 ? 'rgba(212,90,53,.2)' : 'rgba(28,25,23,.06)', position: 'relative' }}>
              {i === 1 && <div style={{ position: 'absolute', top: '-.5rem', left: '50%', transform: 'translateX(-50%)', padding: '.125rem .625rem', borderRadius: '.75rem', background: '#d45a35', color: '#fff', fontSize: '.625rem', fontWeight: 700, letterSpacing: '.03em' }}>POPULAR</div>}
              <div style={{ fontSize: '.75rem', color: 'rgba(28,25,23,.4)', marginBottom: '.375rem' }}>{p.name}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1c1917', marginBottom: '.125rem' }}>{p.price}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '.5rem', fontSize: '.75rem', color: 'rgba(28,25,23,.35)', marginBottom: '.75rem' }}>
                <span>{p.copies} print{p.copies > 1 ? 's' : ''}</span>
                <span>&middot;</span>
                <span>{p.frames} photos</span>
              </div>
              {(p.features || []).slice(0, 3).map((f: string, j: number) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.375rem', fontSize: '.75rem', color: 'rgba(28,25,23,.5)', marginBottom: '.25rem' }}>
                  <ChevronRight size={12} /> {f}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '1rem 1.25rem 3rem', textAlign: 'center' }}>
        <p style={{ fontSize: '.9375rem', color: 'rgba(28,25,23,.3)', marginBottom: '1rem', fontStyle: 'italic' }}>No account needed. Pay on site.</p>
        <button className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.0625rem' }} onClick={() => nav('/packages')}>
          <Play size={18} /> Get Started
        </button>
      </section>
    </div>
  )
}
