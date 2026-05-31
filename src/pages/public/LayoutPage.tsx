import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/resibooth'
import { RefreshCw } from '../../components/Icons'

export default function LayoutPage() {
  const nav = useNavigate()
  const c = useStore((s) => s.config)
  const patch = useStore((s) => s.patch)

  if (!c?.photos?.length) {
    nav('/camera')
    return null
  }

  const photos = c.photos
  const copies = c.copies || 1

  const finish = () => {
    patch({ template: 'strip' })
    nav('/printing')
  }

  return (
    <div className="anim-up" style={{ paddingTop: '1.5rem' }}>
      <div className="max-w-sm" style={{ marginBottom: '1rem' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '.375rem' }}>Preview</span>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Receipt strip preview</h2>
      </div>

      <div className="max-w-sm" style={{ marginBottom: '1rem' }}>
        <div className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: '#f4f1ed',
            borderRadius: '.375rem',
            padding: '.75rem',
            width: '12rem',
            boxShadow: '0 .25rem 1.5rem rgba(0,0,0,.3)',
            position: 'relative',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '.5rem' }}>
              <img src="/logo.png" alt="RESIBOOTH" style={{ width: '1.25rem', height: '1.25rem', objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' }} />
            </div>
            {photos.map((src, i) => (
              <div key={i}>
                <div style={{
                  border: '1px solid rgba(28,25,23,.08)',
                  borderRadius: '.1875rem',
                  overflow: 'hidden',
                  marginBottom: i < photos.length - 1 ? '.5rem' : 0,
                }}>
                  <img src={src} alt="" style={{ width: '100%', display: 'block' }} />
                </div>
                {i < photos.length - 1 && (
                  <div style={{ textAlign: 'center', fontSize: '.4375rem', color: 'rgba(28,25,23,.2)', marginBottom: '.5rem', fontFamily: 'monospace' }}>
                    - - - - - - - - -
                  </div>
                )}
              </div>
            ))}
            <div style={{ fontFamily: 'monospace', fontSize: '.4375rem', color: 'rgba(28,25,23,.3)', textAlign: 'center', marginTop: '.5rem', borderTop: '1px dashed rgba(28,25,23,.08)', paddingTop: '.5rem' }}>
              x{copies} {Math.floor(photos.length)} photos
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '.375rem', color: 'rgba(28,25,23,.2)', textAlign: 'center', marginTop: '.25rem' }}>
              [ cut here ]
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-sm" style={{ display: 'flex', gap: '.75rem', paddingBottom: '2rem' }}>
        <button className="btn-ghost" style={{ flex: 1 }} onClick={() => nav('/camera')}><RefreshCw size={14} /> Retake</button>
        <button className="btn" style={{ flex: 2 }} onClick={finish}>Continue to Print</button>
      </div>
    </div>
  )
}
