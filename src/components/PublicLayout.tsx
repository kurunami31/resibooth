import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{ borderTop: '1px solid rgba(28,25,23,.04)', padding: '2rem 0', textAlign: 'center' }}>
        <div className="max-w">
          <div className="section-label" style={{ fontSize: '.625rem', marginBottom: '.25rem' }}>resibooth &middot; self-service photo booth</div>
          <div style={{ fontSize: '.625rem', color: 'rgba(28,25,23,.15)' }}>All rights reserved</div>
        </div>
      </footer>
    </div>
  )
}
