import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/resibooth'
import { CreditCard, ArrowLeft, Check } from '../../components/Icons'

export default function Payment() {
  const nav = useNavigate()
  const c = useStore((s) => s.config)
  const patch = useStore((s) => s.patch)

  useEffect(() => { if (!c) nav('/packages') }, [c, nav])
  if (!c) return null

  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)

  const pay = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    patch({ method: 'pending', status: 'paid' })
    setPaid(true); setLoading(false)
    setTimeout(() => nav('/confirm'), 1200)
  }

  return (
    <div className="anim-up" style={{ paddingTop: '2rem' }}>
      <div className="max-w-sm" style={{ marginBottom: '1.5rem' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '.375rem' }}>Step 3 of 5</span>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Payment</h2>
        <p style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', marginTop: '.25rem' }}>Pay {c.amount} for {c.pkgName}</p>
      </div>

      <div className="max-w-sm" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ minHeight: '16rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem 1.5rem' }}>
          {paid ? (
            <>
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(42,157,143,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2a9d8f' }}>
                <Check size={24} />
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>Payment received</div>
              <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)' }}>Redirecting to confirmation...</div>
            </>
          ) : (
            <>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '.75rem', background: 'rgba(212,90,53,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d45a35' }}>
                <CreditCard size={24} />
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{c.amount}</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.5)', marginBottom: '.5rem', lineHeight: 1.5 }}>
                  Payment integration requires a separate merchant account.<br />
                  <span style={{ color: 'rgba(28,25,23,.3)', fontSize: '.75rem' }}>GCash / Cash acceptor will be configured here.</span>
                </div>
              </div>
              <button className="btn" style={{ width: '100%' }} onClick={pay} disabled={loading}>
                {loading ? 'Processing...' : 'Simulate Payment'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="max-w-sm" style={{ textAlign: 'center', paddingBottom: '2rem' }}>
        <button className="btn-ghost" onClick={() => nav('/copies')}><ArrowLeft size={14} /> Back</button>
      </div>
    </div>
  )
}
