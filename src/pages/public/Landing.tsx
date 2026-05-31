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
      {/* Hero */}
      <section style={{ padding: '4rem 1.25rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '30rem', height: '30rem', borderRadius: '50%', border: '1px solid rgba(212,90,53,.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '25rem', height: '25rem', borderRadius: '50%', border: '1px solid rgba(212,90,53,.04)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', marginBottom: '1.5rem', padding: '.375rem .875rem', borderRadius: '1.25rem', background: 'rgba(212,90,53,.08)', border: '1px solid rgba(212,90,53,.15)' }}>
          <Camera size={14} />
          <span style={{ fontSize: '.75rem', color: '#d45a35', fontWeight: 600, letterSpacing: '.03em' }}>Self-Service Photo Booth</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-.03em', color: '#1c1917', marginBottom: '1rem' }}>
          Your photos,<br />printed in seconds.
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'rgba(28,25,23,.45)', lineHeight: 1.7, maxWidth: '32rem', margin: '0 auto 2rem', position: 'relative' }}>
          Select a package, step inside, and capture your memories. No attendant needed — just you, the camera, and instant prints.
        </p>
        <button className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.0625rem', position: 'relative' }} onClick={() => nav('/packages')}>
          <Play size={18} /> Start Your Session
        </button>
      </section>

      {/* How It Works */}
      <section className="max-w" style={{ padding: '2rem 1.25rem 4rem' }}>
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

      {/* Pricing */}
      <section className="max-w" style={{ padding: '1rem 1.25rem 4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '.5rem' }}>Pricing</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.2 }}>Choose your package</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))', gap: '1.25rem', maxWidth: '52rem', margin: '0 auto' }}>
          {pkgs.map((p: any, i: number) => (
            <div key={p.id} className="card" style={{
              textAlign: 'center', padding: '2rem 1.25rem',
              borderColor: i === 1 ? 'rgba(212,90,53,.25)' : 'rgba(28,25,23,.06)',
              position: 'relative',
            }}>
              {i === 1 && (
                <div style={{
                  position: 'absolute', top: '-.5rem', left: '50%', transform: 'translateX(-50%)',
                  padding: '.125rem .75rem', borderRadius: '.75rem', background: '#d45a35', color: '#fff',
                  fontSize: '.625rem', fontWeight: 700, letterSpacing: '.04em', whiteSpace: 'nowrap',
                }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontSize: '.75rem', color: 'rgba(28,25,23,.4)', marginBottom: '.375rem', fontWeight: 600, letterSpacing: '.03em', textTransform: 'uppercase' }}>{p.name}</div>
              <div style={{ fontSize: '2.75rem', fontWeight: 900, color: '#1c1917', marginBottom: '.125rem', letterSpacing: '-.02em' }}>{p.price}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '.5rem', fontSize: '.75rem', color: 'rgba(28,25,23,.35)', marginBottom: '1rem' }}>
                <span>{p.copies} print{p.copies > 1 ? 's' : ''}</span>
                <span>&middot;</span>
                <span>{p.frames} photos</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(28,25,23,.06)', paddingTop: '.75rem', marginBottom: '.75rem' }}>
                {(p.features || []).slice(0, 3).map((f: string, j: number) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.375rem', fontSize: '.75rem', color: 'rgba(28,25,23,.5)', marginBottom: '.375rem' }}>
                      <span style={{ color: '#d45a35', display: 'flex', flexShrink: 0 }}><ChevronRight size={12} /></span> {f}
                    </div>
                ))}
              </div>
              <button className="btn btn-sm" style={{ width: '100%' }} onClick={() => nav('/packages')}>Select</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '1rem 1.25rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '28rem', margin: '0 auto', padding: '2.5rem 1.5rem', borderRadius: '1rem', background: 'rgba(28,25,23,.02)', border: '1px solid rgba(28,25,23,.04)' }}>
          <p style={{ fontSize: '.9375rem', color: 'rgba(28,25,23,.4)', marginBottom: '.5rem' }}>Ready to capture your memories?</p>
          <p style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.25)', marginBottom: '1.25rem' }}>No account needed. Pay on site.</p>
          <button className="btn" style={{ padding: '.875rem 2.5rem', fontSize: '1rem' }} onClick={() => nav('/packages')}>
            <Play size={16} /> Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '1rem 1.25rem 2rem', textAlign: 'center', fontSize: '.6875rem', color: 'rgba(28,25,23,.2)', letterSpacing: '.03em' }}>
        RESIBOOTH &middot; Self-Service Photo Booth
      </footer>
    </div>
  )
}
