import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/resibooth'
import { Camera, RefreshCw } from '../../components/Icons'

export default function CameraPage() {
  const nav = useNavigate()
  const c = useStore((s) => s.config)
  const patch = useStore((s) => s.patch)
  const videoRef = useRef<HTMLVideoElement>(null!)
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const [photos, setPhotos] = useState<string[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [err, setErr] = useState('')
  const [count, setCount] = useState<number | null>(null)
  const [flash, setFlash] = useState(false)

  const total = c?.total || 4

  useEffect(() => {
    if (!c) { nav('/packages'); return }
    let active = true
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('error'); setErr('Camera not supported. Use Chrome or Edge.')
      return
    }
    navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 } } })
      .then((s) => {
        if (!active) { s.getTracks().forEach((t) => t.stop()); return }
        if (videoRef.current) { videoRef.current.srcObject = s; setStatus('ready') }
        else { s.getTracks().forEach((t) => t.stop()); setStatus('error'); setErr('Camera element not found') }
      })
      .catch((e) => {
        if (!active) return
        setStatus('error')
        if (e.name === 'NotAllowedError') setErr('Camera access denied. Check browser permissions.')
        else if (e.name === 'NotFoundError') setErr('No camera detected.')
        else if (e.name === 'NotReadableError') setErr('Camera in use by another app.')
        else setErr(e.message || 'Camera unavailable')
      })
    return () => { active = false }
  }, [])

  const capture = useCallback(() => {
    setFlash(true); setTimeout(() => setFlash(false), 300)
    const v = videoRef.current; if (!v?.videoWidth) return
    const cvs = canvasRef.current!
    cvs.width = v.videoWidth; cvs.height = v.videoHeight
    const ctx = cvs.getContext('2d')!
    ctx.save(); ctx.scale(-1, 1); ctx.drawImage(v, -cvs.width, 0); ctx.restore()
    const data = cvs.toDataURL('image/jpeg', .85)
    setPhotos((p) => [...p, data])
  }, [])

  // Auto-start countdown when camera is ready
  useEffect(() => {
    if (status === 'ready' && count === null && photos.length < total) {
      setCount(5)
    }
  }, [status, count, photos.length, total])

  // Countdown logic
  useEffect(() => {
    if (count === null) return
    if (count > 0) {
      const t = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(t)
    }
    // count is 0 — capture, then immediately lock to prevent re-trigger
    capture()
    setCount(null)
    if (photos.length + 1 < total) {
      setTimeout(() => setCount(5), 800)
    }
  }, [count, capture, photos.length, total])

  const done = photos.length >= total

  return (
    <div className="anim-up" style={{ paddingTop: '1.5rem' }}>
      {flash && <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 9999, pointerEvents: 'none', animation: 'fadeIn .3s ease-out reverse' }} />}
      <div className="max-w-sm" style={{ marginBottom: '1rem' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '.375rem' }}>Photo {Math.min(photos.length + 1, total)} of {total}</span>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Take your photos</h2>
      </div>

      <div className="max-w-sm" style={{ marginBottom: '1rem' }}>
        <div style={{ position: 'relative', borderRadius: '.75rem', overflow: 'hidden', background: '#000', aspectRatio: '4/3', border: '1.5px solid rgba(28,25,23,.08)' }}>
          {status === 'loading' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <div style={{ fontSize: '.875rem', color: 'rgba(28,25,23,.4)' }}>Starting camera...</div>
            </div>
          )}
          {status === 'error' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '.75rem', padding: '1rem' }}>
              <Camera size={28} />
              <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.3)', textAlign: 'center', lineHeight: 1.4 }}>{err}</div>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <button className="btn-ghost btn-sm" onClick={() => window.location.reload()}><RefreshCw size={14} /> Retry</button>
                <button className="btn btn-sm" style={{ fontSize: '.75rem', padding: '.5rem .75rem' }} onClick={() => { const fake = (n: number) => { const c = document.createElement('canvas'); c.width = 320; c.height = 240; const x = c.getContext('2d')!; x.fillStyle = '#d45a35'; x.fillRect(0, 0, 320, 240); x.fillStyle = '#fff'; x.font = 'bold 48px sans-serif'; x.textAlign = 'center'; x.fillText(String(n), 160, 140); return c.toDataURL('image/jpeg', .85) }; setPhotos(Array.from({ length: total }, (_, i) => fake(i + 1))) }}>Demo</button>
              </div>
            </div>
          )}
          {done && photos.length > 0 && status !== 'error' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#111' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', marginBottom: '.75rem' }}>
                  {photos.map((p, i) => <img key={i} src={p} alt="" style={{ width: '4rem', height: '4rem', borderRadius: '.375rem', objectFit: 'cover', border: '1px solid rgba(28,25,23,.1)' }} />)}
                </div>
                <div style={{ fontSize: '.875rem', color: 'rgba(28,25,23,.4)' }}>All photos taken</div>
              </div>
            </div>
          )}
          <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', display: status === 'ready' && !done ? 'block' : 'none' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {count !== null && count > 0 && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.3)' }}>
              <div style={{ fontSize: '10rem', fontWeight: 900, color: '#fff', opacity: .9, animation: 'countPulse 1s ease-in-out infinite', textShadow: '0 0 2rem rgba(0,0,0,.5)' }}>{count}</div>
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '.75rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '.375rem' }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} style={{ width: '1.5rem', height: '.25rem', borderRadius: '.125rem', background: photos[i] ? '#d45a35' : 'rgba(255,255,255,.2)', transition: 'background .3s' }} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-sm" style={{ display: 'flex', gap: '.75rem', justifyContent: 'center' }}>
        {done ? (
          <button className="btn" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }} onClick={() => { patch({ photos }); nav('/layout') }}>Continue to Layout</button>
        ) : status === 'ready' && !done ? (
          <div style={{ fontSize: '.8125rem', color: 'rgba(28,25,23,.3)', textAlign: 'center' }}>
            {count !== null && count > 0 ? `Capturing in ${count}...` : 'Processing...'}
          </div>
        ) : null}
      </div>
    </div>
  )
}
