import { useState } from 'react'

export default function Printer() {
  const [state] = useState({
    name: 'DNP DS620', status: 'online', paper: 65, ink: 42,
    model: 'DS-RX1HS', prints: 1247,
  })

  return (
    <div style={{ padding: '2rem', maxWidth: '40rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1c1917' }}>Printer Monitor</h2>
        <p style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', marginTop: '.125rem' }}>{state.name}</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '.625rem', padding: '1.5rem', boxShadow: '0 .0625rem .25rem rgba(0,0,0,.03)', marginBottom: '.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '.75rem', height: '.75rem', borderRadius: '50%', background: state.status === 'online' ? '#2a9d8f' : '#d45a35' }} />
          <div>
            <div style={{ fontSize: '.9375rem', fontWeight: 700, color: '#1c1917' }}>{state.status === 'online' ? 'Online' : 'Offline'}</div>
            <div style={{ fontSize: '.75rem', color: 'rgba(28,25,23,.35)' }}>{state.name} &middot; {state.model} &middot; {state.prints} total prints</div>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <Bar label="Paper" value={state.paper} />
          <Bar label="Ink Ribbon" value={state.ink} />
        </div>

        {state.paper < 20 && (
          <div style={{ padding: '.5rem .75rem', borderRadius: '.375rem', background: 'rgba(212,90,53,.08)', border: '1px solid rgba(212,90,53,.15)', fontSize: '.75rem', color: '#d45a35' }}>
            Paper level low &mdash; refill soon
          </div>
        )}
      </div>

      <div style={{ background: '#fff', borderRadius: '.625rem', padding: '1.25rem', boxShadow: '0 .0625rem .25rem rgba(0,0,0,.03)', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '.8125rem', fontWeight: 700, color: '#1c1917', marginBottom: '.75rem' }}>Actions</div>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          {['Test Print', 'Clean Head', 'Feed Paper', 'Reset'].map((a) => (
            <button key={a} className="btn-ghost btn-sm" style={{ fontSize: '.75rem' }} onClick={() => alert(`Command sent: ${a}`)}>{a}</button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: '.6875rem', color: 'rgba(28,25,23,.2)', textAlign: 'center' }}>
        Last checked: {new Date().toLocaleTimeString()}
      </div>
    </div>
  )
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ marginBottom: '.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', marginBottom: '.25rem' }}>
        <span style={{ color: 'rgba(28,25,23,.5)' }}>{label}</span>
        <span style={{ fontWeight: 700, color: '#1c1917' }}>{value}%</span>
      </div>
      <div style={{ height: '.375rem', borderRadius: '.1875rem', background: 'rgba(28,25,23,.06)', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: '.1875rem', background: value < 20 ? '#d45a35' : '#1c1917', width: `${value}%`, transition: 'width .5s' }} />
      </div>
    </div>
  )
}
