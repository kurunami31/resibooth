const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const AMOUNT_RE = /^\d+(\.\d{1,2})?$/

export function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export function validEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254
}

export function validAmount(amount: number): boolean {
  return AMOUNT_RE.test(String(amount)) && amount > 0 && amount < 100000
}

export function validCopies(n: number): boolean {
  return Number.isInteger(n) && n >= 1 && n <= 50
}

let emailTimestamps: number[] = []
export function checkEmailRate(): boolean {
  const now = Date.now()
  emailTimestamps = emailTimestamps.filter(t => now - t < 60000)
  if (emailTimestamps.length >= 3) return false
  emailTimestamps.push(now)
  return true
}

let loginAttempts = 0
let loginLockedUntil = 0
export function checkLoginRate(): boolean {
  if (Date.now() < loginLockedUntil) return false
  return true
}
export function recordLoginAttempt(success: boolean) {
  if (success) {
    loginAttempts = 0
    loginLockedUntil = 0
  } else {
    loginAttempts++
    if (loginAttempts >= 5) {
      loginLockedUntil = Date.now() + 300000
    }
  }
}

export function secureSessionStorage() {
  try {
    const item = sessionStorage.getItem('resibooth_admin')
    if (item) {
      const data = JSON.parse(atob(item))
      if (data.expires && Date.now() > data.expires) {
        sessionStorage.removeItem('resibooth_admin')
        return false
      }
    }
  } catch { return false }
  return true
}

export function setSecureSession(expiresMinutes = 30) {
  const data = JSON.stringify({ v: 1, expires: Date.now() + expiresMinutes * 60000 })
  sessionStorage.setItem('resibooth_admin', btoa(data))
}

export function clearSecureSession() {
  sessionStorage.removeItem('resibooth_admin')
}
