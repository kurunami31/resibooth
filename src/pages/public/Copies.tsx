import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/resibooth'
import { Copy, ArrowLeft } from '../../components/Icons'

export default function Copies() {
  const nav = useNavigate()
  const c = useStore((s) => s.config)
  const patch = useStore((s) => s.patch)

  useEffect(() => { if (!c) nav('/packages') }, [c, nav])
  if (!c) return null

  const inc = c.copiesInc
  const [n, setN] = useState(c.copies)
  const extra = n > inc ? (n - inc) * c.extra : 0
  const total = n <= inc ? c.amount : c.amount + extra

  return (
    <div className="anim-up" style={{ paddingTop: '2rem' }}>
      <div className="max-w-sm" style={{ marginBottom: '1.5rem' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '.375rem' }}>Step 2 of 5</span>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Number of copies</h2>
        <p style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', marginTop: '.25rem' }}>{inc} print{inc > 1 ? 's' : ''} included, {c.extra} each additional</p>
      </div>

      <div className="max-w-sm" style={{ marginBottom: '1rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1.5rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '.75rem', background: 'rgba(212,90,53,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d45a35', marginBottom: '1rem' }}>
            <Copy size={20} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1rem' }}>
            <button onClick={() => setN(Math.max(1, n - 1))} style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(28,25,23,.06)', border: '1px solid rgba(28,25,23,.1)', color: '#1c1917', fontSize: '1.25rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&minus;</button>
            <div style={{ width: '5rem', height: '5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 900, background: 'rgba(28,25,23,.04)', border: '1.5px solid rgba(28,25,23,.1)' }}>{n}</div>
            <button onClick={() => setN(Math.min(20, n + 1))} style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(28,25,23,.06)', border: '1px solid rgba(28,25,23,.1)', color: '#1c1917', fontSize: '1.25rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>
          <div style={{ fontSize: '.75rem', color: 'rgba(28,25,23,.4)' }}>
            {n <= inc ? `${n} copy${n > 1 ? 's' : ''} included` : `${inc} included + ${n - inc} additional (${Math.round(extra)})`}
          </div>
        </div>
      </div>

      <div className="max-w-sm" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem' }}>
          <div>
            <div className="section-label" style={{ fontSize: '.6875rem' }}>Total Payment</div>
            <div style={{ fontSize: '.6875rem', color: 'rgba(28,25,23,.3)', marginTop: '.125rem' }}>{n} print{n > 1 ? 's' : ''}</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1c1917' }}>{Math.round(total)}</div>
        </div>
      </div>

      <div className="max-w-sm" style={{ display: 'flex', gap: '.75rem', paddingBottom: '2rem' }}>
        <button className="btn-ghost" style={{ flex: 1 }} onClick={() => nav('/packages')}><ArrowLeft size={14} /> Back</button>
        <button className="btn" style={{ flex: 2 }} onClick={() => { patch({ copies: n, amount: Math.round(total) }); nav('/payment') }}>Proceed</button>
      </div>
    </div>
  )
}
