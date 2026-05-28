import { useEffect, useRef, useCallback, useState } from 'react'

export default function CursorGlow() {
  const ringRef = useRef(null)
  const posRef = useRef({ x: -200, y: -200 })
  const rafRef = useRef(0)
  const animatingRef = useRef(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsDesktop(mq.matches)
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const startAnim = useCallback(() => {
    if (animatingRef.current) return
    animatingRef.current = true

    const animate = () => {
      const ring = ringRef.current
      const p = posRef.current
      if (!ring) {
        animatingRef.current = false
        return
      }

      const cx = parseFloat(ring.dataset.cx || p.x)
      const cy = parseFloat(ring.dataset.cy || p.y)
      const dx = p.x - cx
      const dy = p.y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Smooth follow
      if (dist < 0.5) {
        ring.style.transform = `translate(${p.x - 16}px, ${p.y - 16}px)`
        ring.dataset.cx = String(p.x)
        ring.dataset.cy = String(p.y)
        animatingRef.current = false
        return
      }

      const nx = cx + dx * 0.18
      const ny = cy + dy * 0.18
      ring.dataset.cx = String(nx)
      ring.dataset.cy = String(ny)
      ring.style.transform = `translate(${nx - 16}px, ${ny - 16}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    document.body.style.cursor = 'none'

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!animatingRef.current) startAnim()
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      animatingRef.current = false
    }
  }, [isDesktop, startAnim])

  if (!isDesktop) return null

  return (
    <div
      ref={ringRef}
      className="cursor-ring"
      aria-hidden="true"
    />
  )
}
