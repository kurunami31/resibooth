// ESC/POS thermal printer service using Web Serial API

const ESC = 0x1B
const GS = 0x1D

function cmd(...bytes: number[]) {
  return new Uint8Array(bytes)
}

function text(str: string) {
  const enc = new TextEncoder()
  return enc.encode(str + '\n')
}

function join(...chunks: Uint8Array[]) {
  const total = chunks.reduce((s, c) => s + c.length, 0)
  const r = new Uint8Array(total)
  let offset = 0
  for (const c of chunks) { r.set(c, offset); offset += c.length }
  return r
}

// Image to ESC/POS raster bit image (GS v 0)
function imageToEscPos(imgData: ImageData): Uint8Array {
  const w = imgData.width
  const h = imgData.height
  const xBytes = Math.ceil(w / 8)
  const yDots = h

  // Convert to 1-bit threshold (dither would look better but this is simpler)
  const pixels = new Uint8Array(xBytes * yDots)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4
      const gray = imgData.data[idx] * 0.299 + imgData.data[idx + 1] * 0.587 + imgData.data[idx + 2] * 0.114
      const bit = gray < 160 ? 1 : 0
      const byteIdx = y * xBytes + Math.floor(x / 8)
      pixels[byteIdx] |= bit << (7 - (x % 8))
    }
  }

  const header = cmd(GS, 0x76, 0x30, 0x00, xBytes & 0xFF, (xBytes >> 8) & 0xFF, yDots & 0xFF, (yDots >> 8) & 0xFF)
  return join(header, pixels)
}

// Image to ESC/POS NV bit image (more compatible with some printers)
function imageToNvEscPos(imgData: ImageData): Uint8Array {
  // Same raster conversion as above but using GS L / GS W commands
  return imageToEscPos(imgData)
}

async function loadImage(src: string): Promise<ImageData> {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
  const cvs = document.createElement('canvas')
  // Thermal printer max width is typically 384 dots (48 bytes) for 58mm paper
  // or 576 dots (72 bytes) for 80mm paper. We'll use 384 dots.
  const maxDots = 384
  const scale = maxDots / Math.max(img.width, img.height)
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)
  cvs.width = w
  cvs.height = h
  const ctx = cvs.getContext('2d')!
  ctx.drawImage(img, 0, 0, w, h)
  return ctx.getImageData(0, 0, w, h)
}

export interface PrinterStatus {
  connected: boolean
  portInfo: string
}

export async function listPrinters(): Promise<SerialPort[]> {
  if (!navigator.serial) return []
  try {
    const ports = await navigator.serial.getPorts()
    return ports
  } catch {
    return []
  }
}

export async function requestPrinter(): Promise<SerialPort | null> {
  if (!navigator.serial) {
    throw new Error('Web Serial API not supported. Use Chrome or Edge.')
  }
  try {
    const port = await navigator.serial.requestPort()
    return port
  } catch {
    return null
  }
}

export async function connectPrinter(port: SerialPort): Promise<void> {
  await port.open({ baudRate: 9100 })
}

export async function disconnectPrinter(port: SerialPort): Promise<void> {
  try { await port.close() } catch {}
}

export async function printReceipt(port: SerialPort, photos: string[], copies: number): Promise<void> {
  const writer = port.writable!.getWriter()

  try {
    for (let c = 0; c < copies; c++) {
      // Initialize printer
      await writer.write(cmd(ESC, 0x40))

      // Center align
      await writer.write(cmd(ESC, 0x61, 0x01))

      // Bold text
      await writer.write(cmd(ESC, 0x45, 0x01))
      await writer.write(text('  RESIBOOTH'))
      await writer.write(cmd(ESC, 0x45, 0x00))
      await writer.write(text('  Self-Service Photo Booth'))
      await writer.write(text(''))

      // Print each photo
      for (let i = 0; i < photos.length; i++) {
        const imgData = await loadImage(photos[i])
        const escpos = imageToEscPos(imgData)
        await writer.write(cmd(ESC, 0x61, 0x01)) // center align for image
        await writer.write(escpos)

        if (i < photos.length - 1) {
          await writer.write(text(''))
          await writer.write(text('  - - - - - - - - -'))
          await writer.write(text(''))
        }
      }

      // Left align
      await writer.write(cmd(ESC, 0x61, 0x00))
      await writer.write(text(''))
      await writer.write(text('  Session: #' + Date.now().toString(36).toUpperCase()))
      await writer.write(text('  ' + new Date().toLocaleString()))

      // Separator
      await writer.write(text(''))
      await writer.write(text('  ---------------'))
      await writer.write(text('  Thank you!'))

      if (c < copies - 1) {
        await writer.write(text(''))
        await writer.write(text(''))
        // Cut between copies (GS V 1)
        await writer.write(cmd(GS, 0x56, 0x01))
      }
    }

    // Feed and cut
    await writer.write(cmd(ESC, 0x64, 0x04)) // feed 4 lines
    await writer.write(cmd(GS, 0x56, 0x00))  // full cut
  } finally {
    writer.releaseLock()
  }
}

export function isSerialSupported(): boolean {
  return !!navigator.serial
}
