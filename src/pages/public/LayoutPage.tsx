import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/resibooth'
import { RefreshCw } from '../../components/Icons'
import { useEffect, useRef, useCallback } from 'react'

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = rej
    img.src = src
  })
}

export default function LayoutPage() {
  const nav = useNavigate()
  const c = useStore((s) => s.config)
  const patch = useStore((s) => s.patch)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendered = useRef(false)

  if (!c?.photos?.length) {
    nav('/camera')
    return null
  }

  const photos = c.photos
  const copies = c.copies || 1

  const generateStrip = useCallback(async () => {
    if (rendered.current) return
    rendered.current = true
    const imgs = await Promise.all(photos.map(loadImg))
    const stripW = 384
    const pad = 16
    const gap = 8
    const photoH = imgs.map((img) => Math.round((stripW - pad * 2) * (img.height / img.width)))
    const totalH = pad * 2 + photoH.reduce((a, b) => a + b + gap, 0) - gap + 60 + 8

    const cvs = document.createElement('canvas')
    cvs.width = stripW
    cvs.height = totalH
    const ctx = cvs.getContext('2d')!
    ctx.fillStyle = '#f4f1ed'
    ctx.fillRect(0, 0, stripW, totalH)

    const logo = await loadImg('/logo.png')
    ctx.drawImage(logo, stripW / 2 - 10, 12, 20, 20)

    let y = pad + 28
    imgs.forEach((img, i) => {
      const h = photoH[i]
      const x = pad
      ctx.drawImage(img, x, y, stripW - pad * 2, h)
      y += h + gap
      if (i < imgs.length - 1) {
        ctx.strokeStyle = 'rgba(28,25,23,.2)'
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(stripW / 2 - 30, y - gap / 2)
        ctx.lineTo(stripW / 2 + 30, y - gap / 2)
        ctx.stroke()
        ctx.setLineDash([])
      }
    })

    ctx.font = '10px monospace'
    ctx.fillStyle = 'rgba(28,25,23,.3)'
    ctx.textAlign = 'center'
    ctx.fillText(`x${copies} ${photos.length} photos`, stripW / 2, y + 16)
    ctx.font = '8px monospace'
    ctx.fillStyle = 'rgba(28,25,23,.2)'
    ctx.fillText('[ cut here ]', stripW / 2, y + 34)

    const dataUrl = cvs.toDataURL('image/jpeg', 0.85)
    patch({ layoutImg: dataUrl })

    if (canvasRef.current) {
      canvasRef.current.width = stripW
      canvasRef.current.height = totalH
      canvasRef.current.getContext('2d')!.drawImage(cvs, 0, 0)
    }
  }, [photos, copies, patch])

  useEffect(() => {
    generateStrip().catch(console.error)
  }, [generateStrip])

  const finish = () => {
    nav('/printing')
  }

  return (
    <div className="anim-up" style={{ paddingTop: '1.5rem' }}>
      <div className="max-w-sm" style={{ marginBottom: '1rem' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '.375rem' }}>Preview</span>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Receipt strip preview</h2>
      </div>

      <div className="max-w-sm" style={{ marginBottom: '1rem' }}>
        <div className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
          <canvas ref={canvasRef} style={{ maxWidth: '12rem', borderRadius: '.375rem', boxShadow: '0 .25rem 1.5rem rgba(0,0,0,.3)' }} />
        </div>
      </div>

      <div className="max-w-sm" style={{ display: 'flex', gap: '.75rem', paddingBottom: '2rem' }}>
        <button className="btn-ghost" style={{ flex: 1 }} onClick={() => nav('/camera')}><RefreshCw size={14} /> Retake</button>
        <button className="btn" style={{ flex: 2 }} onClick={finish}>Continue to Print</button>
      </div>
    </div>
  )
}
