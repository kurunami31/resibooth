import { useRef, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { checkLoginRate, recordLoginAttempt } from '../../lib/security'

export default function AdminLogin() {
  const nav = useNavigate()
  const { setAuthed } = useOutletContext<{ setAuthed: (v: boolean) => void }>()
  const [err, setErr] = useState(false)
  const [locked, setLocked] = useState(false)
  const ref = useRef<HTMLInputElement>(null!)

  const login = () => {
    if (!checkLoginRate()) {
      setLocked(true)
      setTimeout(() => setLocked(false), 300000)
      return
    }
    if (ref.current?.value === 'resibooth2026') {
      recordLoginAttempt(true)
      setAuthed(true)
      nav('/admin/dashboard')
    } else {
      recordLoginAttempt(false)
      setErr(true)
      setTimeout(() => setErr(false), 2000)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: '#f4f1ed' }}>
      <div style={{ width: '100%', maxWidth: '22rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '.5rem', background: '#1c1917', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 800, color: '#f4f1ed', margin: '0 auto .75rem', letterSpacing: '.02em' }}>RB</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1c1917' }}>Admin Access</h2>
          <p style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', marginTop: '.25rem' }}>Enter passcode to continue</p>
        </div>
        <div style={{ background: '#fff', borderRadius: '.75rem', padding: '1.5rem', boxShadow: '0 .125rem .5rem rgba(0,0,0,.04)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            <input ref={ref} type="password" placeholder="Passcode" maxLength={64} onKeyDown={(e) => e.key === 'Enter' && login()} autoFocus style={{ color: '#1c1917', background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.08)' }} />
            {err && <div style={{ fontSize: '.75rem', color: '#d45a35', textAlign: 'center' }}>Invalid passcode</div>}
            {locked && <div style={{ fontSize: '.75rem', color: '#d45a35', textAlign: 'center' }}>Too many attempts. Try again in 5 minutes.</div>}
            <button className="btn" style={{ background: '#1c1917', width: '100%' }} onClick={login}>Login</button>
          </div>
          <div style={{ marginTop: '.75rem', textAlign: 'center' }}>
            <button onClick={() => nav('/')} style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Back to booth</button>
          </div>
        </div>
      </div>
    </div>
  )
}
