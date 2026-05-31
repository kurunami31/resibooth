import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPackages } from '../../lib/database'
import { useStore } from '../../store/resibooth'
import { Package, ArrowLeft, ChevronRight } from '../../components/Icons'

export default function Packages() {
  const nav = useNavigate()
  const cfg = useStore((s) => s.cfg)
  const [pkgs] = useState(() => getPackages())
  const [sel, setSel] = useState<number | null>(null)
  const [email, setEmail] = useState('')

  const cont = () => {
    const p: any = pkgs.find((x: any) => x.id === sel)
    if (!p) return
    cfg({ pkgId: p.id, pkgName: p.name, pkgType: p.type, template: p.template, total: p.frames, copies: p.copies, copiesInc: p.copies, extra: p.extra, amount: p.price, method: 'pending', status: 'pending', txId: null, sid: `s${Date.now()}`, filter: 'none', email })
    nav('/copies')
  }

  return (
    <div className="anim-up" style={{ paddingTop: '2rem' }}>
      <div className="max-w-sm" style={{ marginBottom: '1.5rem' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '.375rem' }}>Step 1 of 5</span>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Choose your package</h2>
        <p style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', marginTop: '.25rem' }}>Select a package and enter your email for the digital copy</p>
      </div>

      <div className="max-w-sm" style={{ marginBottom: '1rem' }}>
        {pkgs.map((p: any, i: number) => {
          const on = sel === p.id
          const pal = [null, '#2a9d8f', '#b87a4b'][i] || '#d45a35'
          return (
            <button key={p.id} onClick={() => setSel(p.id)}
              style={{
                width: '100%', textAlign: 'left', cursor: 'pointer', color: '#1c1917', fontFamily: 'inherit',
                display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.125rem',
                marginBottom: '.625rem', borderRadius: '.75rem', transition: 'all .15s',
                background: on ? 'rgba(28,25,23,.04)' : 'rgba(28,25,23,.02)',
                border: on ? `1.5px solid ${pal}` : '1px solid rgba(28,25,23,.06)',
              }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '.5rem', background: `${pal}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: pal, flexShrink: 0 }}>
                <Package size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '.25rem' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{p.price}</div>
                </div>
                <div style={{ fontSize: '.75rem', color: 'rgba(28,25,23,.4)', marginBottom: '.375rem', lineHeight: 1.4 }}>{p.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.25rem' }}>
                  {(p.features || []).map((f: string, j: number) => (
                    <span key={j} className="tag tag-amber" style={{ fontSize: '.6875rem' }}>{f}</span>
                  ))}
                </div>
                {on && <div style={{ marginTop: '.5rem', fontSize: '.75rem', color: pal, fontWeight: 600 }}>Selected</div>}
              </div>
            </button>
          )
        })}
      </div>

      <div className="max-w-sm" style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontSize: '.75rem', color: 'rgba(28,25,23,.4)', fontWeight: 600, display: 'block', marginBottom: '.375rem' }}>Email (for digital copy)</label>
        <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
          style={{ background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.1)', color: '#1c1917' }} />
      </div>

      <div className="max-w-sm" style={{ display: 'flex', gap: '.75rem', paddingBottom: '2rem' }}>
        <button className="btn-ghost" style={{ flex: 1 }} onClick={() => nav('/')}><ArrowLeft size={14} /> Back</button>
        <button className="btn" style={{ flex: 2, opacity: sel ? 1 : .3, pointerEvents: sel ? 'auto' : 'none' }} onClick={cont}>Continue</button>
      </div>
    </div>
  )
}
