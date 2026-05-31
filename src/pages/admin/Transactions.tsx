import { useState } from 'react'
import { getTxs, clearTxs } from '../../lib/database'
import { sanitize } from '../../lib/security'
import { Image } from '../../components/Icons'

export default function Transactions() {
  const [txs, setTxs] = useState(() => getTxs())
  const [q, setQ] = useState('')
  const [filt, setFilt] = useState<'all' | 'paid' | 'printed'>('all')
  const [sort, setSort] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest')

  const refresh = () => setTxs([...getTxs()])

  const clearAll = () => {
    if (window.confirm('Clear all transactions? This cannot be undone.')) {
      clearTxs()
      refresh()
    }
  }

  const filtered = txs
    .filter((t: any) => {
      if (filt !== 'all' && t.status !== filt) return false
      if (q) { const l = q.toLowerCase(); return (t.pkg || '').toLowerCase().includes(l) || (t.sid || '').toLowerCase().includes(l) || (t.ref || '').toLowerCase().includes(l) }
      return true
    })
    .sort((a: any, b: any) => {
      if (sort === 'newest') return (b.created || '').localeCompare(a.created)
      if (sort === 'oldest') return (a.created || '').localeCompare(b.created)
      if (sort === 'highest') return b.amount - a.amount
      return a.amount - b.amount
    })

  const total = filtered.reduce((s: number, t: any) => s + t.amount, 0)

  const csv = () => {
    const h = 'ID,Package,Amount,Copies,Method,Status,Reference,Date\n'
    const r = filtered.map((t: any) => `${t.id},${t.pkg},${t.amount},${t.copies},${t.method},${t.status},${t.ref || ''},${t.created}`).join('\n')
    const b = new Blob([h + r], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'transactions.csv'; a.click()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1c1917' }}>Transactions</h2>
        <p style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', marginTop: '.125rem' }}>{filtered.length} records &middot; {total} total</p>
      </div>

      <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.75rem', flexWrap: 'wrap' }}>
        <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value.replace(/[<>]/g, ''))} maxLength={100} style={{ flex: 1, minWidth: '12rem', color: '#1c1917', background: '#fff', border: '1px solid rgba(28,25,23,.08)' }} />
        <select value={sort} onChange={(e) => setSort(e.target.value as any)} style={{ width: 'auto', minWidth: '8rem', color: '#1c1917', background: '#fff', border: '1px solid rgba(28,25,23,.08)' }}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest</option>
          <option value="lowest">Lowest</option>
        </select>
        <button className="btn-ghost btn-sm" style={{ fontSize: '.75rem' }} onClick={csv}>Export</button>
        <button className="btn-ghost btn-sm" style={{ fontSize: '.75rem', color: '#d45a35', borderColor: 'rgba(212,90,53,.2)' }} onClick={clearAll}>Clear All</button>
      </div>

      <div style={{ display: 'flex', gap: '.25rem', marginBottom: '1rem' }}>
        {(['all', 'paid', 'printed'] as const).map((f) => (
          <button key={f} onClick={() => setFilt(f)} style={{ padding: '.375rem .75rem', borderRadius: '.3125rem', fontSize: '.75rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', borderColor: filt === f ? '#1c1917' : 'rgba(28,25,23,.08)', background: filt === f ? '#1c1917' : 'transparent', color: filt === f ? '#fff' : 'rgba(28,25,23,.5)', fontFamily: 'inherit', textTransform: 'capitalize' }}>{f}</button>
        ))}
      </div>

      {filtered.map((t: any) => (
        <div key={t.id} style={{ background: '#fff', borderRadius: '.5rem', padding: '.75rem 1rem', marginBottom: '.375rem', boxShadow: '0 .0625rem .125rem rgba(0,0,0,.02)', display: 'flex', gap: '.75rem', alignItems: 'center' }}>
          {t.photoUrl ? (
            <div style={{ flexShrink: 0 }}>
              <img src={t.photoUrl} alt="" style={{ width: '3rem', height: '3rem', borderRadius: '.375rem', objectFit: 'cover', display: 'block', cursor: 'pointer', border: '1px solid rgba(28,25,23,.06)' }}
                onClick={() => window.open(t.photoUrl, '_blank')} />
            </div>
          ) : (
            <div style={{ width: '3rem', height: '3rem', borderRadius: '.375rem', background: 'rgba(28,25,23,.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(28,25,23,.15)', flexShrink: 0 }}>
              <Image size={16} />
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.25rem' }}>
              <div style={{ fontSize: '.875rem', fontWeight: 700, color: '#1c1917' }}>{sanitize(t.pkg)}</div>
              <div style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#1c1917' }}>{t.amount}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.6875rem', color: 'rgba(28,25,23,.35)' }}>
              <span>{sanitize(t.sid)} &middot; {sanitize(t.method)} &middot; {t.copies} copy{t.copies > 1 ? 's' : ''}</span>
              <span>{new Date(t.created).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.6875rem', marginTop: '.25rem' }}>
              <span style={{ color: t.status === 'paid' ? '#2a9d8f' : '#d45a35', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.03em' }}>{t.status}</span>
              <div style={{ display: 'flex', gap: '.375rem', alignItems: 'center' }}>
                {t.ref && <span style={{ color: 'rgba(28,25,23,.3)' }}>{sanitize(t.ref)}</span>}
                {t.photoUrl && (
                  <button onClick={() => window.open(t.photoUrl, '_blank')}
                    style={{ fontSize: '.6875rem', color: '#d45a35', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', padding: 0, fontWeight: 600 }}>
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {filtered.length === 0 && <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.2)', textAlign: 'center', padding: '3rem' }}>No transactions found</div>}
    </div>
  )
}
