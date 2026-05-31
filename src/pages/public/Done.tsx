import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/resibooth'
import { Check, Mail, Image } from '../../components/Icons'

export default function Done() {
  const nav = useNavigate()
  const c = useStore((s) => s.config)

  return (
    <div className="anim-up" style={{ paddingTop: '3rem' }}>
      <div className="max-w-sm" style={{ textAlign: 'center' }}>
        <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(42,157,143,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2a9d8f', margin: '0 auto 1rem' }}>
          <Check size={24} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '.375rem', letterSpacing: '-.02em' }}>Thank You</h2>
        <p style={{ fontSize: '.875rem', color: 'rgba(28,25,23,.4)', marginBottom: '.25rem' }}>{c?.pkgName} session complete</p>
        <p style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.3)', marginBottom: '1.5rem' }}>Please collect your photos below</p>

        {c?.layoutImg && (
          <div className="card" style={{ padding: '.5rem', width: '12rem', margin: '0 auto 1.5rem' }}>
            <div style={{ width: '100%', aspectRatio: '2/3', borderRadius: '.375rem', overflow: 'hidden', border: '1px solid rgba(28,25,23,.06)' }}>
              <img src={c.layoutImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        )}

        {c?.photos && c.photos.length > 0 && (
          <div style={{ display: 'flex', gap: '.375rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {c.photos.slice(0, 4).map((p: string, i: number) => (
              <img key={i} src={p} alt="" style={{ width: '3rem', height: '3rem', borderRadius: '.375rem', objectFit: 'cover', border: '1px solid rgba(28,25,23,.08)' }} />
            ))}
          </div>
        )}

        {c?.email && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', marginBottom: '1.5rem' }}>
            <Mail size={14} /> Digital copy sent to {c.email}
          </div>
        )}

        <button className="btn" style={{ width: '100%' }} onClick={() => { window.location.href = '/' }}>
          New Session
        </button>
      </div>
    </div>
  )
}
