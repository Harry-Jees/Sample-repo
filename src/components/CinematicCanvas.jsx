import { useEffect, useRef } from 'react'

const DPR_LIMIT = 2

function fitCanvas(canvas) {
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, DPR_LIMIT)
  canvas.width = Math.max(1, Math.floor(rect.width * dpr))
  canvas.height = Math.max(1, Math.floor(rect.height * dpr))
  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return { width: rect.width, height: rect.height, ctx }
}

function makePlanet(width, height, count) {
  const cx = width / 2
  const cy = height / 2
  const radius = Math.min(width, height) * 0.13
  return Array.from({ length: count }, (_, id) => {
    const angle = Math.random() * Math.PI * 2
    const spread = Math.sqrt(Math.random()) * radius
    return {
      id,
      homeX: cx + Math.cos(angle) * spread,
      homeY: cy + Math.sin(angle) * spread,
      x: cx + Math.cos(angle) * spread,
      y: cy + Math.sin(angle) * spread,
      vx: 0,
      vy: 0,
      size: 1.2 + Math.random() * 2.3,
      phase: Math.random() * 8,
      opacity: 0.68 + Math.random() * 0.32,
      startX: cx + Math.cos(angle) * spread,
      startY: cy + Math.sin(angle) * spread,
      startOpacity: 0.68 + Math.random() * 0.32,
      // Text target positions (set later)
      target1X: cx,
      target1Y: cy,
      target2X: cx,
      target2Y: cy,
      blastVx: 0,
      blastVy: 0,
    }
  })
}

/* ── Text particle target cache ── */
let _targetCache = {}
let _targetCacheKey = ''

function getTextTargets(width, height, text, particleCount) {
  const key = `${width.toFixed(0)}x${height.toFixed(0)}_${text}_${particleCount}`
  if (_targetCacheKey === key && _targetCache[key]) {
    return _targetCache[key]
  }

  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = width
  tempCanvas.height = height
  const tempCtx = tempCanvas.getContext('2d')
  const fontSize = Math.min(68, Math.max(28, width * 0.065))
  tempCtx.font = `700 ${fontSize}px "Courier New", monospace`
  tempCtx.textAlign = 'center'
  tempCtx.textBaseline = 'middle'
  tempCtx.fillStyle = '#fff'
  tempCtx.fillText(text, width / 2, height * 0.4)

  const imageData = tempCtx.getImageData(0, 0, width, height)
  const pixels = imageData.data

  // Collect lit pixel positions
  const litPixels = []
  const sampleStep = Math.max(2, Math.floor(width / 300)) // adaptive sampling
  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const idx = (Math.floor(x) + Math.floor(y) * width) * 4
      if (idx < pixels.length && pixels[idx + 3] > 100) {
        litPixels.push({
          x: x + (Math.random() - 0.5) * sampleStep,
          y: y + (Math.random() - 0.5) * sampleStep,
        })
      }
    }
  }

  let targets
  if (litPixels.length === 0) {
    // Fallback: grid formation
    const cols = Math.ceil(Math.sqrt(particleCount))
    const rows = Math.ceil(particleCount / cols)
    const spacingX = width / (cols + 1)
    const spacingY = height * 0.5 / (rows + 1)
    targets = Array.from({ length: particleCount }, (_, i) => ({
      x: spacingX + (i % cols) * spacingX,
      y: height * 0.3 + Math.floor(i / cols) * spacingY,
    }))
  } else if (particleCount <= litPixels.length) {
    // Each particle gets a unique lit pixel
    const indices = new Set()
    targets = []
    for (let i = 0; i < particleCount; i++) {
      let idx
      do {
        idx = Math.floor(Math.random() * litPixels.length)
      } while (indices.has(idx) && indices.size < litPixels.length)
      indices.add(idx)
      targets.push({ ...litPixels[idx] })
    }
  } else {
    // More particles than positions: repeat with slight offsets
    targets = []
    for (let i = 0; i < particleCount; i++) {
      const src = litPixels[i % litPixels.length]
      targets.push({
        x: src.x + (Math.random() - 0.5) * 2,
        y: src.y + (Math.random() - 0.5) * 2,
      })
    }
  }

  _targetCache[key] = targets
  _targetCacheKey = key
  return targets
}

/* ── Main hero draw: full lifecycle ── */
// Stages mapped to progress 0-1:
//   0.00-0.08  → Cluster (tight at center)
//   0.08-0.30  → Blast outward (explosion from center)
//   0.30-0.50  → Form "WELCOME TO MY DASHBOARD" (wiggling dots)
//   0.50-0.72  → Morph to "HARRY JEES" (dots rearrange, still wiggling)
//   0.72-0.90  → Blast away (dots fly outward)
//   0.90-1.00  → Fade out

const P_CLUSTER = 0.08
const P_BLAST = 0.30
const P_FORM1 = 0.50
const P_MORPH = 0.72
const P_BLAST_OUT = 0.90

function drawHero(ctx, width, height, particles, time, progress, scrollVelocity, reducedMotion) {
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)

  // Background gradient
  const gradient = ctx.createRadialGradient(width / 2, height * 0.45, 0, width / 2, height * 0.45, width * 0.55)
  gradient.addColorStop(0, 'rgba(255,255,255,0.07)')
  gradient.addColorStop(0.45, 'rgba(0,255,255,0.025)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  const cx = width / 2
  const cy = height / 2

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    /* ── 1. CLUSTER ── */
    if (progress < P_CLUSTER) {
      const wobble = reducedMotion ? 0 : Math.sin(time * 0.0015 + p.phase) * 3
      p.x += (p.homeX + wobble - p.x) * 0.055
      p.y += (p.homeY + Math.cos(time * 0.0012 + p.phase) * 3 - p.y) * 0.055

    /* ── 2. BLAST ── */
    } else if (progress < P_BLAST) {
      const t = (progress - P_CLUSTER) / (P_BLAST - P_CLUSTER)
      const force = t * 720
      const velocityBonus = reducedMotion ? 0 : Math.min(scrollVelocity * 120, 400)
      const totalForce = force + velocityBonus
      const angle = Math.atan2(p.homeY - cy, p.homeX - cx)
      const wobble = reducedMotion ? 0 : Math.sin(time * 0.0015 + p.phase) * 3
      p.x += (p.homeX + Math.cos(angle) * totalForce + wobble - p.x) * 0.055
      p.y += (p.homeY + Math.sin(angle) * totalForce + Math.cos(time * 0.0012 + p.phase) * 3 - p.y) * 0.055
      // Reset blast velocities for next stage
      p.blastVx = 0
      p.blastVy = 0

    /* ── 3. FORM "WELCOME TO MY DASHBOARD" ── */
    } else if (progress < P_FORM1) {
      const t = (progress - P_BLAST) / (P_FORM1 - P_BLAST)
      const eased = t * t * (3 - 2 * t)
      const wobbleAmp = 3 + (1 - eased) * 4 // more wobble early, settles
      const wobble = reducedMotion ? 0 : Math.sin(time * 0.003 + p.phase) * wobbleAmp
      const wobbleY = reducedMotion ? 0 : Math.cos(time * 0.0025 + p.phase * 1.3) * wobbleAmp
      const lerpSpeed = 0.025 + eased * 0.06
      p.x += (p.target1X + wobble - p.x) * lerpSpeed
      p.y += (p.target1Y + wobbleY - p.y) * lerpSpeed

    /* ── 4. MORPH TO "HARRY JEES" ── */
    } else if (progress < P_MORPH) {
      const t = (progress - P_FORM1) / (P_MORPH - P_FORM1)
      const eased = t * t * (3 - 2 * t)
      const wobble = reducedMotion ? 0 : Math.sin(time * 0.003 + p.phase + t * 2) * 4
      const wobbleY = reducedMotion ? 0 : Math.cos(time * 0.0025 + p.phase * 1.3 + t * 2) * 4
      const lerpSpeed = 0.025 + eased * 0.06
      p.x += (p.target2X + wobble - p.x) * lerpSpeed
      p.y += (p.target2Y + wobbleY - p.y) * lerpSpeed

    /* ── 5. BLAST AWAY ── */
    } else if (progress < P_BLAST_OUT) {
      const t = (progress - P_MORPH) / (P_BLAST_OUT - P_MORPH)
      const eased = t * t
      // Initialize blast velocities on first frame of this stage
      if (p.blastVx === 0 && p.blastVy === 0) {
        const angle = Math.atan2(p.y - cy + (Math.random() - 0.5) * 40, p.x - cx + (Math.random() - 0.5) * 40)
        const speed = 120 + Math.random() * 500
        p.blastVx = Math.cos(angle) * speed
        p.blastVy = Math.sin(angle) * speed
      }
      p.x += p.blastVx * 0.008 * (1 + eased * 2)
      p.y += p.blastVy * 0.008 * (1 + eased * 2)

    /* ── 6. FADE OUT ── */
    } else {
      const fadeT = Math.min(1, (progress - P_BLAST_OUT) / (1 - P_BLAST_OUT))
      if (p.blastVx !== 0 || p.blastVy !== 0) {
        p.x += p.blastVx * 0.008 * (1 - fadeT * 0.5)
        p.y += p.blastVy * 0.008 * (1 - fadeT * 0.5)
      }
    }

    // ── Opacity ──
    let alpha = Math.max(0.05, p.startOpacity)
    if (progress > P_BLAST && progress <= P_FORM1) {
      // During text formation, maintain full brightness
      alpha = Math.max(0.15, p.startOpacity)
    } else if (progress > P_BLAST_OUT) {
      // Fade out during blast away
      const fadeT = Math.min(1, (progress - P_BLAST_OUT) / (1 - P_BLAST_OUT))
      alpha = Math.max(0, p.startOpacity * (1 - fadeT))
    }

    ctx.fillStyle = `rgba(255,255,255,${alpha})`
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function seededRandom(x, y) {
  const h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return h - Math.floor(h)
}

function drawZipper(ctx, width, height, time, progress, reducedMotion) {
  ctx.clearRect(0, 0, width, height)

  const fontSize = width < 700 ? 12 : 18
  const xStep = width < 700 ? 18 : 25
  const yStep = width < 700 ? 20 : 27

  ctx.font = `${fontSize}px "Courier New", monospace`
  ctx.textAlign = 'center'

  const bladeY = height - height * (reducedMotion ? 1 : Math.min(1, progress * 1.2))

  for (let x = 0; x < width + xStep; x += xStep) {
    for (let y = 0; y < height + yStep; y += yStep) {
      const colIndex = Math.floor(x / xStep)
      const rowIndex = Math.floor(y / yStep)
      const r = seededRandom(colIndex * 7, rowIndex * 13)
      const char = String.fromCharCode(33 + Math.floor(r * 68))
      const wave = reducedMotion ? 0 : Math.sin(time * 0.004 + x * 0.03) * 8
      const fade = y + wave < bladeY ? 0.03 : 0.58
      ctx.fillStyle = `rgba(255,255,255,${fade})`
      ctx.fillText(char, x, y + wave)
    }
  }

  const glow = ctx.createLinearGradient(0, bladeY, width, bladeY)
  glow.addColorStop(0, 'rgba(0,255,255,0)')
  glow.addColorStop(0.25, 'rgba(0,255,255,1)')
  glow.addColorStop(0.75, 'rgba(0,255,255,1)')
  glow.addColorStop(1, 'rgba(0,255,255,0)')
  ctx.shadowColor = '#00ffff'
  ctx.shadowBlur = 22
  ctx.fillStyle = glow
  ctx.fillRect(0, bladeY, width, 4)
}

export default function CinematicCanvas({ variant, progress = 0, active = true, reducedMotion = false, scrollVelocity = 0 }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const frameRef = useRef(0)
  const progressRef = useRef(progress)
  const reducedMotionRef = useRef(reducedMotion)
  const scrollVelocityRef = useRef(scrollVelocity)
  const metricsRef = useRef({ width: 0, height: 0, ctx: null })

  // Keep refs in sync with latest values without triggering re-renders
  progressRef.current = progress
  reducedMotionRef.current = reducedMotion
  scrollVelocityRef.current = scrollVelocity

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const metrics = fitCanvas(canvas)
    metricsRef.current = metrics

    // Initialize particles and text targets for hero variant
    if (variant === 'hero') {
      const particleCount = metrics.width < 700 ? 110 : metrics.width < 1200 ? 190 : 300
      const particles = makePlanet(metrics.width, metrics.height, particleCount)
      // Compute text target positions
      const text1 = getTextTargets(metrics.width, metrics.height, 'WELCOME TO MY DASHBOARD', particleCount)
      const text2 = getTextTargets(metrics.width, metrics.height, 'HARRY JEES', particleCount)
      particles.forEach((p, i) => {
        p.target1X = text1[i]?.x ?? metrics.width / 2
        p.target1Y = text1[i]?.y ?? metrics.height * 0.4
        p.target2X = text2[i]?.x ?? metrics.width / 2
        p.target2Y = text2[i]?.y ?? metrics.height * 0.4
        p.blastVx = 0
        p.blastVy = 0
      })
      particlesRef.current = particles
    }

    const onResize = () => {
      metricsRef.current = fitCanvas(canvas)
      if (variant === 'hero') {
        const m = metricsRef.current
        const count = m.width < 700 ? 110 : m.width < 1200 ? 190 : 300
        const particles = makePlanet(m.width, m.height, count)
        const text1 = getTextTargets(m.width, m.height, 'WELCOME TO MY DASHBOARD', count)
        const text2 = getTextTargets(m.width, m.height, 'HARRY JEES', count)
        particles.forEach((p, i) => {
          p.target1X = text1[i]?.x ?? m.width / 2
          p.target1Y = text1[i]?.y ?? m.height * 0.4
          p.target2X = text2[i]?.x ?? m.width / 2
          p.target2Y = text2[i]?.y ?? m.height * 0.4
          p.blastVx = 0
          p.blastVy = 0
        })
        particlesRef.current = particles
      }
    }
    window.addEventListener('resize', onResize)

    const draw = (time) => {
      const m = metricsRef.current
      const p = progressRef.current
      const rm = reducedMotionRef.current
      const sv = scrollVelocityRef.current

      if (variant === 'hero') {
        drawHero(m.ctx, m.width, m.height, particlesRef.current, time, p, sv, rm)
      } else if (variant === 'zipper') {
        drawZipper(m.ctx, m.width, m.height, time, p, rm)
      }

      if (active) {
        frameRef.current = requestAnimationFrame(draw)
      }
    }

    if (active) {
      frameRef.current = requestAnimationFrame(draw)
    } else {
      const m = metricsRef.current
      m.ctx.clearRect(0, 0, m.width, m.height)
      m.ctx.fillStyle = '#000'
      m.ctx.fillRect(0, 0, m.width, m.height)
    }

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, active])

  return <canvas ref={canvasRef} className="cinematic-canvas" aria-hidden="true" />
}
