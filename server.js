import express from 'express'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = process.env.PORT || 3000

const csp = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net', 'https://www.googletagmanager.com'],
    styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdn.jsdelivr.net'],
    imgSrc: ["'self'", 'data:', 'blob:', 'https://api.imgbb.com', 'https://i.ibb.co'],
    connectSrc: ["'self'", 'https://api.emailjs.com', 'https://api.imgbb.com'],
    fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdn.jsdelivr.net'],
    frameAncestors: ["'none'"],
    formAction: ["'self'"],
  },
})

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(csp)

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests' },
}))

app.use(express.json({ limit: '2mb' }))
app.use(express.static(resolve(__dirname, 'dist'), { maxAge: '1d', etag: true }))

app.post('/api/validate-email', (req, res) => {
  const { email } = req.body
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')
  res.json({ valid, sanitized: valid ? email.toLowerCase().trim() : null })
})

app.use((_req, res) => {
  res.sendFile(resolve(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
