import { useState } from 'react'
import { getTxs, getPackages } from '../../lib/database'

export default function Dashboard() {
  const [txs] = useState(() => getTxs())
  const [pkgs] = useState(() => getPackages())

  const today = txs.filter((t: any) => new Date(t.created).toDateString() === new Date().toDateString())
  const week = txs.filter((t: any) => { const d = new Date(t.created); return new Date().getTime() - d.getTime() < 7 * 86400000 })
  const month = txs.filter((t: any) => new Date(t.created).getMonth() === new Date().getMonth())
  const totalRev = txs.reduce((s: number, t: any) => s + t.amount, 0)
  const pop = [...pkgs].sort((a: any, b: any) => txs.filter((t: any) => t.pkgId === b.id).length - txs.filter((t: any) => t.pkgId === a.id).length)[0]

  const stats = [
    { label: 'Today', val: today.reduce((s: number, t: any) => s + t.amount, 0), sub: `${today.length} sale${today.length !== 1 ? 's' : ''}` },
    { label: 'This Week', val: week.reduce((s: number, t: any) => s + t.amount, 0), sub: `${week.length} transaction${week.length !== 1 ? 's' : ''}` },
    { label: 'This Month', val: month.reduce((s: number, t: any) => s + t.amount, 0), sub: `${month.length} total` },
    { label: 'All Time', val: totalRev, sub: `${txs.length} records` },
  ]

  const dayData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i))
    const ds = d.toISOString().slice(0, 10)
    const day = d.toLocaleDateString('en-US', { weekday: 'short' })
    const dayTxs = txs.filter((t: any) => t.created?.startsWith(ds))
    return { day, sales: dayTxs.reduce((s: number, t: any) => s + t.amount, 0) }
  })

  const maxSale = Math.max(...dayData.map((d) => d.sales), 1)
  const pkgDist = pkgs.map((p: any) => ({ name: p.name, count: txs.filter((t: any) => t.pkgId === p.id).length, color: '#1c1917' }))

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1c1917' }}>Dashboard</h2>
        <p style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', marginTop: '.125rem' }}>resibooth &middot; overview</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))', gap: '.75rem', marginBottom: '1.5rem' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '.625rem', padding: '1rem 1.125rem', boxShadow: '0 .0625rem .25rem rgba(0,0,0,.03)' }}>
            <div style={{ fontSize: '.6875rem', color: 'rgba(28,25,23,.35)', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600, marginBottom: '.25rem' }}>{s.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917' }}>{s.val}</div>
            <div style={{ fontSize: '.6875rem', color: 'rgba(28,25,23,.3)', marginTop: '.0625rem' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '.75rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '.625rem', padding: '1.25rem', boxShadow: '0 .0625rem .25rem rgba(0,0,0,.03)' }}>
          <div style={{ fontSize: '.8125rem', fontWeight: 700, color: '#1c1917', marginBottom: '.75rem' }}>Sales (7 days)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.375rem', height: '8rem' }}>
            {dayData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.25rem', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', borderRadius: '.1875rem .1875rem 0 0', background: d.sales > 0 ? '#1c1917' : 'rgba(28,25,23,.04)', height: `${maxSale > 0 ? (d.sales / maxSale) * 100 : 0}%`, minHeight: d.sales > 0 ? '.25rem' : 0, transition: 'height .3s' }} />
                <div style={{ fontSize: '.625rem', color: 'rgba(28,25,23,.3)' }}>{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '.625rem', padding: '1.25rem', boxShadow: '0 .0625rem .25rem rgba(0,0,0,.03)' }}>
          <div style={{ fontSize: '.8125rem', fontWeight: 700, color: '#1c1917', marginBottom: '.75rem' }}>Packages</div>
          {pkgDist.filter((p: any) => p.count > 0).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {pkgDist.filter((p: any) => p.count > 0).sort((a: any, b: any) => b.count - a.count).map((p: any, i: number) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', marginBottom: '.25rem' }}>
                    <span style={{ color: 'rgba(28,25,23,.6)' }}>{p.name}</span>
                    <span style={{ fontWeight: 700, color: '#1c1917' }}>{p.count}</span>
                  </div>
                  <div style={{ height: '.25rem', borderRadius: '.125rem', background: 'rgba(28,25,23,.06)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: '.125rem', background: '#1c1917', width: `${(p.count / Math.max(...pkgDist.map((x: any) => x.count))) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.2)', textAlign: 'center', padding: '2rem 0' }}>No data yet</div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '.625rem', padding: '1rem 1.125rem', boxShadow: '0 .0625rem .25rem rgba(0,0,0,.03)' }}>
          <div style={{ fontSize: '.6875rem', color: 'rgba(28,25,23,.35)', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600, marginBottom: '.25rem' }}>Popular</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1c1917' }}>{pop?.name || 'N/A'}</div>
          <div style={{ fontSize: '.6875rem', color: 'rgba(28,25,23,.3)', marginTop: '.0625rem' }}>{txs.filter((t: any) => t.pkgId === pop?.id).length} purchases</div>
        </div>
        <div style={{ background: '#fff', borderRadius: '.625rem', padding: '1rem 1.125rem', boxShadow: '0 .0625rem .25rem rgba(0,0,0,.03)' }}>
          <div style={{ fontSize: '.6875rem', color: 'rgba(28,25,23,.35)', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600, marginBottom: '.25rem' }}>Average</div>
          <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1c1917' }}>{txs.length ? Math.round(totalRev / txs.length) : 0}</div>
          <div style={{ fontSize: '.6875rem', color: 'rgba(28,25,23,.3)', marginTop: '.0625rem' }}>per transaction</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '.625rem', boxShadow: '0 .0625rem .25rem rgba(0,0,0,.03)' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(28,25,23,.06)' }}>
          <div style={{ fontSize: '.8125rem', fontWeight: 700, color: '#1c1917' }}>Recent Transactions</div>
        </div>
        {txs.slice(0, 8).map((t: any) => (
          <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.75rem 1.25rem', borderBottom: '1px solid rgba(28,25,23,.04)' }}>
            <div>
              <div style={{ fontSize: '.8125rem', fontWeight: 600, color: '#1c1917' }}>{t.pkg}</div>
              <div style={{ fontSize: '.6875rem', color: 'rgba(28,25,23,.35)' }}>{new Date(t.created).toLocaleString()}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '.9375rem', fontWeight: 700, color: '#1c1917' }}>{t.amount}</div>
              <div style={{ fontSize: '.625rem', color: t.status === 'paid' ? '#2a9d8f' : '#d45a35', textTransform: 'uppercase', letterSpacing: '.04em' }}>{t.status}</div>
            </div>
          </div>
        ))}
        {txs.length === 0 && <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.2)', textAlign: 'center', padding: '2rem' }}>No transactions yet</div>}
      </div>
    </div>
  )
}
