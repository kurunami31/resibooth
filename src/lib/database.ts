import CryptoJS from 'crypto-js'

const KEY = 'resibooth'

function load(): any {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
}

function save(data: any) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

function stamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19)
}

function id(items: any[]) {
  return Math.max(0, ...items.map((i: any) => i.id)) + 1
}

export function initDB() {
  const db = load()
  let changed = false

  if (!db.packages?.length) {
    db.packages = [
      { id: 1, type: 'A', name: 'Type A - Classic', desc: 'Classic 2x6 film strip, 4 photos, 1 print', price: 100, copies: 1, extra: 30, features: ['2x6 Film Strip', '4 Photos', '1 Print', 'Sprocket Holes'], template: 'strip', frames: 4, color: '#667eea', sort: 1 },
      { id: 2, type: 'B', name: 'Type B - Standard', desc: '4x6 postcard, 4 photos, 2 prints, premium filters', price: 180, copies: 2, extra: 25, features: ['4x6 Postcard', '4 Photos', '2 Prints', 'Premium Filters', 'Custom Frames'], template: 'postcard', frames: 4, color: '#764ba2', sort: 2 },
      { id: 3, type: 'C', name: 'Type C - Premium', desc: 'Both formats, 4 photos, 4 prints, all filters', price: 300, copies: 4, extra: 20, features: ['Both Formats', '4 Photos', '4 Prints', 'All Filters', 'Digital Copy', 'Priority'], template: 'both', frames: 4, color: '#e040a0', sort: 3 },
    ]
    changed = true
  }
  if (!db.users?.length) {
    db.users = [{ id: 1, user: 'admin', pass: CryptoJS.SHA256('admin123').toString(), name: 'Administrator' }]
    changed = true
  }
  if (!db.settings) {
    db.settings = { printer: '', port: '9100', type: 'dnp', currency: 'PHP', tax: '0', gcash: '', timeout: '60000' }
    changed = true
  }
  if (!db.transactions) db.transactions = []
  if (!db.sessions) db.sessions = []
  if (!db.photos) db.photos = []
  if (!db.printer) db.printer = []

  if (changed) save(db)
}

// ─── Packages ──────────────────────────────────────────────

export function getPackages() {
  return load().packages || []
}
export function getPkg(id: number) {
  return load().packages.find((p: any) => p.id === id)
}
export function addPkg(data: any) {
  const db = load()
  data.id = id(db.packages)
  db.packages.push(data)
  save(db)
}
export function setPkg(id: number, data: any) {
  const db = load()
  const i = db.packages.findIndex((p: any) => p.id === id)
  if (i >= 0) { db.packages[i] = { ...db.packages[i], ...data }; save(db) }
}
export function delPkg(id: number) {
  const db = load()
  db.packages = db.packages.filter((p: any) => p.id !== id)
  save(db)
}

// ─── Transactions ──────────────────────────────────────────

export function addTx(data: any) {
  const db = load()
  data.id = id(db.transactions)
  data.date = stamp()
  db.transactions.push(data)
  save(db)
  return data
}
export function setTx(id: number, data: any) {
  const db = load()
  const i = db.transactions.findIndex((t: any) => t.id === id)
  if (i >= 0) { db.transactions[i] = { ...db.transactions[i], ...data }; save(db) }
}
export function getTxs(opts?: { q?: string; from?: string }) {
  let list = [...load().transactions]
  if (opts?.q) { const s = opts.q.toLowerCase(); list = list.filter((t: any) => t.pkg?.toLowerCase().includes(s) || t.ref?.toLowerCase().includes(s)) }
  if (opts?.from) list = list.filter((t: any) => t.date >= (opts.from || ''))
  return list.sort((a: any, b: any) => b.date?.localeCompare(a.date))
}

// ─── Sessions / Photos ─────────────────────────────────────

export function addSession(s: any) {
  const db = load()
  db.sessions.push({ ...s, date: stamp() })
  save(db)
}
export function addPhoto(p: any) {
  const db = load()
  p.id = id(db.photos)
  p.date = stamp()
  db.photos.push(p)
  save(db)
}
export function getPhotos(sid: string) {
  return load().photos.filter((p: any) => p.sid === sid).sort((a: any, b: any) => a.num - b.num)
}

// ─── Settings ─────────────────────────────────────────────

export function getSetting(k: string) { return load().settings?.[k] || '' }
export function setSetting(k: string, v: string) { const db = load(); db.settings[k] = v; save(db) }
export function allSettings() { return { ...load().settings } }

// ─── Auth ─────────────────────────────────────────────────

export function login(user: string, pass: string) {
  const h = CryptoJS.SHA256(pass).toString()
  const u = load().users.find((u: any) => u.user === user && u.pass === h)
  return u ? { id: u.id, user: u.user, name: u.name } : null
}

// ─── Dashboard ────────────────────────────────────────────

export function dashboard() {
  const db = load()
  const today = new Date().toISOString().slice(0, 10)
  const month = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10)
  const done = db.transactions.filter((t: any) => t.status === 'paid')
  const total = done.reduce((s: number, t: any) => s + t.amount, 0)
  const daily = done.filter((t: any) => t.date?.startsWith(today))
  const monthly = done.filter((t: any) => t.date >= month)
  const pkgs: Record<string, number> = {}
  done.forEach((t: any) => pkgs[t.pkg] = (pkgs[t.pkg] || 0) + 1)
  const top = Object.entries(pkgs).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'N/A'
  const lp = db.printer?.[db.printer.length - 1]
  return {
    sales: daily.reduce((s: number, t: any) => s + t.amount, 0),
    customers: new Set(daily.map((t: any) => t.sid)).size,
    revenue: monthly.reduce((s: number, t: any) => s + t.amount, 0),
    total: done.length,
    top,
    paper: lp?.paper ?? 100,
    ink: lp?.ink ?? 100,
    recent: [...done].reverse().slice(0, 10),
  }
}

// ─── Printer ──────────────────────────────────────────────

export function logPrint(paper: number, ink: number, status: string, err?: string, sid?: string) {
  const db = load()
  db.printer.push({ id: Date.now(), sid, status, paper, ink, err: err || '', date: stamp() })
  save(db)
}
export function printerStatus() {
  const p = load().printer
  return p?.length ? p[p.length - 1] : null
}

// ─── Download ─────────────────────────────────────────────

export function download(url: string, name: string) {
  const a = document.createElement('a')
  a.href = url; a.download = name
  document.body.appendChild(a); a.click(); a.remove()
}
