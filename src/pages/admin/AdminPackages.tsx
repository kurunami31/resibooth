import { useState } from 'react'
import { getPackages, addPkg, setPkg, delPkg } from '../../lib/database'

const defaults = { name: '', type: 'standard', price: 150, copies: 2, extra: 50, frames: 4, template: 'strip', color: '#d45a35', desc: '', features: [] as string[], active: true }

export default function AdminPackages() {
  const [pkgs, setPkgs] = useState(() => getPackages())
  const [edit, setEdit] = useState<any>(null)
  const [form, setForm] = useState({ ...defaults })
  const [showForm, setShow] = useState(false)

  const refresh = () => setPkgs([...getPackages()])

  const openNew = () => { setEdit(null); setForm({ ...defaults }); setShow(true) }
  const openEdit = (p: any) => { setEdit(p); setForm({ ...p, features: p.features || [] }); setShow(true) }

  const save = () => {
    if (edit) { setPkg(edit.id, form) } else { addPkg({ ...form }) }
    setForm({ ...defaults }); setShow(false); refresh()
  }

  const del = (id: number) => {
    if (window.confirm('Delete this package?')) { delPkg(id); refresh() }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1c1917' }}>Packages</h2>
          <p style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.4)', marginTop: '.125rem' }}>{pkgs.length} package{pkgs.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-sm" style={{ background: '#1c1917' }} onClick={openNew}>New Package</button>
      </div>

      {pkgs.map((p: any) => (
        <div key={p.id} style={{ background: '#fff', borderRadius: '.625rem', padding: '1rem 1.25rem', marginBottom: '.5rem', boxShadow: '0 .0625rem .25rem rgba(0,0,0,.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.25rem' }}>
              <div style={{ width: '.5rem', height: '.5rem', borderRadius: '50%', background: p.color || '#d45a35', flexShrink: 0 }} />
              <div style={{ fontSize: '.9375rem', fontWeight: 700, color: '#1c1917' }}>{p.name}</div>
            </div>
            <div style={{ fontSize: '.75rem', color: 'rgba(28,25,23,.4)', marginBottom: '.375rem' }}>{p.price} &middot; {p.copies} copy{p.copies > 1 ? 's' : ''} &middot; {p.frames} frames &middot; {p.template}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.25rem' }}>
              {(p.features || []).map((f: string, i: number) => (
                <span key={i} style={{ fontSize: '.6875rem', padding: '.125rem .5rem', borderRadius: '.75rem', background: 'rgba(28,25,23,.06)', color: 'rgba(28,25,23,.6)' }}>{f}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.375rem', flexShrink: 0 }}>
            <button className="btn-ghost btn-sm" style={{ fontSize: '.75rem', color: 'rgba(28,25,23,.5)', borderColor: 'rgba(28,25,23,.1)' }} onClick={() => openEdit(p)}>Edit</button>
            <button className="btn-ghost btn-sm" style={{ fontSize: '.75rem', color: '#d45a35', borderColor: 'rgba(212,90,53,.2)' }} onClick={() => del(p.id)}>Delete</button>
          </div>
        </div>
      ))}
      {pkgs.length === 0 && <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.2)', textAlign: 'center', padding: '3rem' }}>No packages yet</div>}

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div style={{ width: '100%', maxWidth: '26rem', background: '#fff', borderRadius: '.75rem', padding: '1.5rem', maxHeight: '90vh', overflow: 'auto' }}>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#1c1917', marginBottom: '1rem' }}>{edit ? 'Edit Package' : 'New Package'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              <input placeholder="Package name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ color: '#1c1917', background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.08)' }} />
              <input placeholder="Type (standard/premium)" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={{ color: '#1c1917', background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.08)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
                <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} style={{ color: '#1c1917', background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.08)' }} />
                <input type="number" placeholder="Copies" value={form.copies} onChange={(e) => setForm({ ...form, copies: +e.target.value })} style={{ color: '#1c1917', background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.08)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
                <input type="number" placeholder="Extra per copy" value={form.extra} onChange={(e) => setForm({ ...form, extra: +e.target.value })} style={{ color: '#1c1917', background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.08)' }} />
                <input type="number" placeholder="Frames" value={form.frames} onChange={(e) => setForm({ ...form, frames: +e.target.value })} style={{ color: '#1c1917', background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.08)' }} />
              </div>
              <input placeholder="Template (strip/grid)" value={form.template} onChange={(e) => setForm({ ...form, template: e.target.value })} style={{ color: '#1c1917', background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.08)' }} />
              <input placeholder="Color hex (#d45a35)" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={{ color: '#1c1917', background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.08)' }} />
              <textarea placeholder="Description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} style={{ color: '#1c1917', background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.08)' }} />
              <input placeholder="Features (comma separated)" value={form.features.join(', ')} onChange={(e) => setForm({ ...form, features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} style={{ color: '#1c1917', background: 'rgba(28,25,23,.04)', border: '1px solid rgba(28,25,23,.08)' }} />
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
                <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setShow(false)}>Cancel</button>
                <button className="btn" style={{ flex: 1, background: '#1c1917' }} onClick={save} disabled={!form.name}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
