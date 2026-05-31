import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/resibooth'
import { getPkg } from '../../lib/database'
import { Check, ArrowLeft, Camera } from '../../components/Icons'

export default function Confirm() {
  const nav = useNavigate()
  const c = useStore((s) => s.config)
  useEffect(() => { if (!c) nav('/packages') }, [c, nav])
  if (!c) return null

  const pkg: any = getPkg(c.pkgId)
  const features: string[] = pkg?.features || []

  return (
    <div className="anim-up" style={{ paddingTop: '2rem' }}>
      <div className="max-w-sm" style={{ marginBottom: '1.5rem' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '.375rem' }}>Step 4 of 5</span>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Confirm your session</h2>
      </div>

      <div className="max-w-sm" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <Row label="Package" value={c.pkgName} />
          <Row label="Total" value={`${c.amount}`} highlight />
          <Row label="Copies" value={`${c.copies}`} />
          <Row label="Email" value={c.email || 'Not provided'} />
          <Row label="Status" value={c.status === 'paid' ? 'Paid' : 'Pending'} />
          {features.length > 0 && (
            <div style={{ marginTop: '.75rem' }}>
              <div className="section-label" style={{ marginBottom: '.5rem', fontSize: '.6875rem' }}>Includes</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.25rem' }}>
                {features.map((f: string, i: number) => <span key={i} className="tag tag-amber" style={{ fontSize: '.6875rem' }}>{f}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-sm" style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', paddingBottom: '2rem' }}>
        <button className="btn" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }} onClick={() => nav('/camera')}>
          <Camera size={18} /> Start Photo Session
        </button>
        <button className="btn-ghost" onClick={() => nav('/payment')}><ArrowLeft size={14} /> Back</button>
      </div>
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.625rem 0', borderBottom: '1px solid rgba(28,25,23,.04)' }}>
      <div style={{ fontSize: '.75rem', color: 'rgba(28,25,23,.45)' }}>{label}</div>
      <div style={{ fontSize: highlight ? '1.25rem' : '.875rem', fontWeight: highlight ? 800 : 500, color: highlight ? '#1c1917' : '#1c1917' }}>{value}</div>
    </div>
  )
}
