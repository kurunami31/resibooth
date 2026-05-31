import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { secureSessionStorage, setSecureSession, clearSecureSession } from '../lib/security'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/packages', label: 'Packages' },
  { to: '/admin/transactions', label: 'Transactions' },
  { to: '/admin/printer', label: 'Printer' },
]

export default function AdminLayout() {
  const loc = useLocation()
  const nav = useNavigate()
  const [authed, setAuthed] = useState(() => secureSessionStorage())
  const isLogin = loc.pathname === '/admin'

  const login = () => {
    setSecureSession()
    setAuthed(true)
  }

  const logout = () => {
    clearSecureSession()
    setAuthed(false)
    nav('/admin')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f1ed', display: 'flex', color: '#1c1917' }}>
      {authed && !isLogin && (
        <aside style={{ width: '14rem', minWidth: '14rem', background: '#fff', borderRight: '1px solid rgba(28,25,23,.08)', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem' }}>
          <div style={{ marginBottom: '1.5rem', padding: '0 .5rem' }}>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1c1917', letterSpacing: '.02em' }}>resibooth</div>
            <div style={{ fontSize: '.6875rem', color: 'rgba(28,25,23,.4)', letterSpacing: '.08em', marginTop: '.125rem', textTransform: 'uppercase' }}>Admin Panel</div>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '.125rem', flex: 1 }}>
            {navItems.map((item) => {
              const active = loc.pathname === item.to
              return (
                <Link key={item.to} to={item.to} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.625rem .75rem', borderRadius: '.375rem', fontSize: '.875rem', fontWeight: 600, transition: 'all .12s', background: active ? 'rgba(28,25,23,.06)' : 'transparent', color: active ? '#1c1917' : 'rgba(28,25,23,.5)' }}>
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div style={{ borderTop: '1px solid rgba(28,25,23,.06)', paddingTop: '.75rem', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
            <Link to="/" style={{ padding: '.5rem .75rem', borderRadius: '.375rem', fontSize: '.8125rem', color: 'rgba(28,25,23,.4)' }}>Back to booth</Link>
            <button onClick={logout} style={{ padding: '.5rem .75rem', borderRadius: '.375rem', fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', textAlign: 'left', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit' }}>Logout</button>
          </div>
        </aside>
      )}
      <div style={{ flex: 1, overflow: 'auto', minHeight: '100vh' }}>
        <Outlet context={{ authed, setAuthed: login }} />
      </div>
    </div>
  )
}
