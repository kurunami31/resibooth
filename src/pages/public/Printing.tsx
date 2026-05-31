import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/resibooth'
import { setTx } from '../../lib/database'
import { Printer, Check, RefreshCw } from '../../components/Icons'
import { EMAIL_CONFIG } from '../../lib/email'
import { checkEmailRate } from '../../lib/security'
import { requestPrinter, connectPrinter, printReceipt, isSerialSupported } from '../../lib/printer'

export default function Printing() {
  const nav = useNavigate()
  const c = useStore((s) => s.config)
  const [progress, setProgress] = useState(0)
  const [visibleIdx, setVisibleIdx] = useState(0)
  const [done, setDone] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [thermalStatus, setThermalStatus] = useState<'idle' | 'connecting' | 'printing' | 'done' | 'error'>('idle')
  const [thermalErr, setThermalErr] = useState('')

  const photos = c?.photos || []
  const copies = Math.min(c?.copies || 1, 5)
  const totalItems = photos.length * copies + 2

  useEffect(() => {
    if (!c) { nav('/packages'); return }
    if (done) return
    if (!photos.length) { nav('/camera'); return }

    let i = 0
    const t = setInterval(() => {
      i++
      const pct = Math.min(100, Math.round((i / (totalItems + 3)) * 100))
      setProgress(pct)
      if (i <= totalItems) setVisibleIdx(i)
      if (i >= totalItems + 3) {
        clearInterval(t)
        if (c.txId) setTx(c.txId, { status: 'printed' })
        setDone(true); setProgress(100)
        sendEmail()
      }
    }, 400)
    return () => clearInterval(t)
  }, [done, c, photos.length])

  const sendEmail = async () => {
    if (!c?.email) return
    if (!checkEmailRate()) { console.warn('Email rate limit exceeded'); setEmailSent(true); return }
    try {
      const { default: emailjs } = await import('@emailjs/browser')

      // Try to upload to ImgBB, fall back to embedding data URL
      let photoUrl = ''
      try {
        if (c.layoutImg) {
          const fd = new FormData()
          fd.append('image', c.layoutImg.split(',')[1])
          const res = await fetch('https://api.imgbb.com/1/upload?key=cf6a04b1df22c9ef114021da256e0255', { method: 'POST', body: fd })
          const json = await res.json()
          if (json.success) photoUrl = json.data.url
        }
      } catch {}

      const imgTag = photoUrl
        ? `<img src="${photoUrl}" style="width:100%;display:block" />`
        : c.layoutImg
          ? `<img src="${c.layoutImg}" style="width:100%;display:block" />`
          : ''

      const html = `
        <div style="max-width:480px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif;background:#f4f1ed;padding:24px">
          <div style="text-align:center;font-size:13px;color:#d45a35;letter-spacing:4px;font-weight:700;margin-bottom:4px;text-transform:uppercase">RESIBOOTH</div>
          <div style="text-align:center;font-size:10px;color:#bbb;letter-spacing:2px;margin-bottom:20px;text-transform:uppercase">Photo Studio</div>

          <div style="background:#fff;border-radius:8px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.08)">
            <div style="font-size:18px;font-weight:800;color:#1c1917;margin-bottom:4px">Your photos are ready!</div>
            <div style="font-size:12px;color:#999;margin-bottom:16px">Thank you for visiting ResiBOOTH</div>

            ${imgTag ? `<div style="margin-bottom:16px;border:1px solid #eee;border-radius:6px;overflow:hidden">${imgTag}</div>` : ''}

            <div style="border-top:1px dashed #ddd;padding-top:12px">
              <table style="width:100%;font-size:12px;color:#666">
                <tr><td style="padding:3px 0;color:#999">Session</td><td style="padding:3px 0;text-align:right;font-weight:600;color:#1c1917;font-family:monospace">#${c.sid}</td></tr>
                <tr><td style="padding:3px 0;color:#999">Package</td><td style="padding:3px 0;text-align:right;font-weight:600;color:#1c1917">${c.pkgName}</td></tr>
                <tr><td style="padding:3px 0;color:#999">Copies</td><td style="padding:3px 0;text-align:right;font-weight:600;color:#1c1917">${c.copies}</td></tr>
              </table>
            </div>
          </div>

          <div style="text-align:center;font-size:10px;color:#bbb;margin-top:16px;line-height:1.6">
            <div style="margin-bottom:4px">- - - - - - - - - - - - - - -</div>
            <div>Visit us again at ResiBOOTH</div>
          </div>
        </div>`

      await emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, {
        to_email: c.email,
        from_name: 'ResiBOOTH',
        message: 'Your photos are ready!',
        html_body: html,
        session_id: c.sid,
        package_name: c.pkgName,
      }, EMAIL_CONFIG.publicKey)
    } catch (e) { console.error('Email error:', e) }
    setEmailSent(true)
  }

  const printThermal = async () => {
    setThermalStatus('connecting')
    setThermalErr('')
    try {
      const port = await requestPrinter()
      if (!port) { setThermalStatus('idle'); return }
      await connectPrinter(port)
      setThermalStatus('printing')
      await printReceipt(port, photos, copies)
      await port.close()
      setThermalStatus('done')
    } catch (e: any) {
      setThermalStatus('error')
      setThermalErr(e.message || 'Print failed')
    }
  }

  if (!c) return null

  const thermalBtn = (
    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '.5rem', alignItems: 'center' }}>
      {thermalStatus === 'idle' && (
        <button className="btn-ghost" onClick={printThermal}>
          <Printer size={14} /> Print via Thermal Printer
        </button>
      )}
      {thermalStatus === 'connecting' && <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)' }}>Select printer in the dialog...</div>}
      {thermalStatus === 'printing' && <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)' }}>Printing to thermal printer...</div>}
      {thermalStatus === 'done' && <div style={{ fontSize: '.8125rem', color: '#2a9d8f' }}>Thermal print complete</div>}
      {thermalStatus === 'error' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '.75rem', color: '#d45a35', marginBottom: '.5rem' }}>{thermalErr}</div>
          <button className="btn-ghost btn-sm" onClick={printThermal}>Retry</button>
        </div>
      )}
    </div>
  )

  return (
    <div className="anim-up" style={{ paddingTop: '1.5rem' }}>
      <div className="max-w-sm" style={{ textAlign: 'center' }}>
        {done ? (
          <>
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(42,157,143,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2a9d8f', margin: '0 auto 1rem' }}>
              <Check size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '.25rem' }}>Print Complete</h2>
            <p style={{ fontSize: '.875rem', color: 'rgba(28,25,23,.4)', marginBottom: '.25rem' }}>{c.copies} cop{c.copies > 1 ? 'ies' : 'y'} printed</p>
            <div style={{ fontSize: '.75rem', color: '#2a9d8f', marginBottom: '1.5rem' }}>You can now collect your receipt below.</div>
            <div style={{ marginBottom: '1.5rem' }}>
              <ReceiptStrip photos={photos} copies={copies} emailSent={emailSent} email={c.email} done />
            </div>
            {isSerialSupported() && thermalBtn}
            <button className="btn" style={{ marginTop: '1rem' }} onClick={() => nav('/done')}>Done</button>
          </>
        ) : (
          <>
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(28,25,23,.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(28,25,23,.3)', margin: '0 auto 1rem', border: '1.5px solid rgba(28,25,23,.06)' }}>
              <Printer size={20} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '.25rem' }}>Printing</h2>
            <p style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', marginBottom: '1rem' }}>Thermal printer — {c.copies} cop{c.copies > 1 ? 'ies' : 'y'}</p>
            <div style={{ width: '80%', maxWidth: '16rem', margin: '0 auto 1rem', height: '.375rem', borderRadius: '.1875rem', background: 'rgba(28,25,23,.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '.1875rem', background: '#d45a35', width: `${progress}%`, transition: 'width .4s ease' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>{progress}%</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <ReceiptStrip photos={photos} copies={copies} visibleIdx={visibleIdx} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ReceiptStrip({ photos, copies, visibleIdx, done, emailSent, email }: {
  photos: string[]
  copies: number
  visibleIdx?: number
  done?: boolean
  emailSent?: boolean
  email?: string
}) {
  let itemNum = 0
  const isVisible = () => {
    itemNum++
    if (done) return true
    return itemNum <= (visibleIdx || 0)
  }

  let idx = 0

  const header = () => {
    const v = done || (visibleIdx || 0) > idx
    idx++
    return v
  }

  return (
    <div style={{
      background: '#f4f1ed',
      borderRadius: '.5rem',
      padding: '1rem .75rem',
      width: '12rem',
      margin: '0 auto',
      boxShadow: '0 .25rem 1rem rgba(0,0,0,.3)',
      transition: 'opacity .3s',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '.5rem', minHeight: '1.25rem' }}>
        {header() && (
          <img src="/logo.png" alt="RESIBOOTH" style={{ width: '1.25rem', height: '1.25rem', objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' }} />
        )}
      </div>

      {Array.from({ length: copies }).map((_, ci) => (
        <div key={ci}>
          {header() && (
            <div style={{ fontFamily: 'monospace', fontSize: '.4375rem', color: 'rgba(28,25,23,.3)', textAlign: 'center', marginBottom: '.25rem' }}>
              Copy {ci + 1} of {copies}
            </div>
          )}
          {photos.map((src, pi) => {
            const v = isVisible()
            return (
              <div key={pi}>
                {v && (
                  <div style={{
                    border: '1px solid rgba(28,25,23,.08)',
                    borderRadius: '.1875rem',
                    overflow: 'hidden',
                    marginBottom: pi < photos.length - 1 ? '.375rem' : 0,
                  }}>
                    <img src={src} alt="" style={{ width: '100%', display: 'block' }} />
                  </div>
                )}
                {v && pi < photos.length - 1 && (
                  <div style={{ textAlign: 'center', fontSize: '.4375rem', color: 'rgba(28,25,23,.15)', marginBottom: '.375rem', fontFamily: 'monospace' }}>
                    - - - - - - - - -
                  </div>
                )}
              </div>
            )
          })}
          {ci < copies - 1 && header() && (
            <div style={{ borderTop: '1px dashed rgba(28,25,23,.15)', margin: '.5rem 0' }} />
          )}
        </div>
      ))}

      {header() && (
        <div style={{ fontFamily: 'monospace', fontSize: '.4375rem', color: 'rgba(28,25,23,.3)', textAlign: 'center', marginTop: '.5rem', borderTop: '1px dashed rgba(28,25,23,.08)', paddingTop: '.5rem' }}>
          {photos.length} photos x{copies}
        </div>
      )}
      {header() && (
        <div style={{ fontFamily: 'monospace', fontSize: '.375rem', color: 'rgba(28,25,23,.2)', textAlign: 'center', marginTop: '.25rem' }}>
          [ cut here ]
        </div>
      )}

      {done && email && (
        <div style={{ marginTop: '.5rem', fontSize: '.625rem', color: emailSent ? '#2a9d8f' : 'rgba(28,25,23,.3)', textAlign: 'center' }}>
          {emailSent ? 'Digital copy sent to ' + email : 'Sending digital copy...'}
        </div>
      )}
    </div>
  )
}
