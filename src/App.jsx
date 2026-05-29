import { useEffect, useMemo, useState, useCallback } from 'react'
import CinematicCanvas from './components/CinematicCanvas.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import CardSwapStack from './components/CardSwapStack.jsx'
import { portalSections, timelineEntries } from './data/sections.js'

// Extended scroll ranges: each element gets more scroll space to stay on screen longer
const phaseStops = [
  { id: 'hero', start: 0, end: 3.5 },
  { id: 'portal', start: 3.5, end: 9 },
  { id: 'timeline', start: 9, end: 14 },
  { id: 'finale', start: 14, end: 17 },
]

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function useScrollScene() {
  const [scene, setScene] = useState({
    y: 0,
    vh: window.innerHeight || 800,
    vw: window.innerWidth || 800,
    reducedMotion: false,
    scrollVelocity: 0,
  })

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let ticking = false
    let lastY = window.scrollY || 0
    let lastTime = performance.now()

    const update = () => {
      ticking = false
      const now = performance.now()
      const currentY = window.scrollY || 0
      const dt = Math.max(1, now - lastTime)
      const velocity = Math.abs(currentY - lastY) / dt

      setScene({
        y: currentY,
        vh: window.innerHeight || 800,
        vw: window.innerWidth || 800,
        reducedMotion: motionQuery.matches,
        scrollVelocity: velocity,
      })

      lastY = currentY
      lastTime = now
    }

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    motionQuery.addEventListener?.('change', update)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      motionQuery.removeEventListener?.('change', update)
    }
  }, [])

  return scene
}

function phaseProgress(y, vh, start, end) {
  return clamp((y / vh - start) / (end - start))
}

// Blend opacity with overlapping windows so phases cross-fade smoothly
function computeBlend(unit, start, end, blendSize = 0.3) {
  const fadeIn = clamp((unit - (start - blendSize)) / blendSize)
  const fadeOut = 1 - clamp((unit - end) / blendSize)
  return clamp(fadeIn * fadeOut)
}

// Parallax offset: content drifts through the phase for depth
function parallaxOffset(progress, intensity = 60) {
  return (1 - progress) * intensity
}

function SkipLink() {
  return (
    <a className="skip-link" href="#main-content">
      Skip to portfolio content
    </a>
  )
}

function HeroPhase({ progress, active, reducedMotion, scrollVelocity, blend }) {
  const effectiveProgress = active ? progress : Math.min(progress + 0.1, 1)

  // Parallax: wave-field drifts slower
  const waveDrift = parallaxOffset(progress, 18)

  return (
    <section
      className={`phase hero-phase ${active ? 'is-active' : ''}`}
      style={{ opacity: blend }}
      aria-label="Cosmic opening"
    >
      <div className="wave-field" style={{ '--parallax-wave': `${waveDrift}px` }} />
      <CinematicCanvas
        variant="hero"
        progress={effectiveProgress}
        active={active}
        reducedMotion={reducedMotion}
        scrollVelocity={scrollVelocity}
      />
    </section>
  )
}

/* ── Card Swap Phase ── */

function RingPortalPhase({ progress, active, blend }) {
  const [selected, setSelected] = useState(() => {
    const maxIndex = portalSections.length - 1
    return Math.min(
      maxIndex,
      Math.floor(clamp(progress, 0, 1) * portalSections.length),
    )
  })

  // Scroll-driven index
  const scrollIndex = clamp(
    Math.floor(progress * portalSections.length),
    0,
    portalSections.length - 1,
  )

  useEffect(() => {
    if (active) {
      setSelected(scrollIndex)
    }
  }, [active, scrollIndex])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!active) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((prev) => Math.min(prev + 1, portalSections.length - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((prev) => Math.max(prev - 1, 0))
      }
    },
    [active],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <section
      className={`phase portal-phase ${active ? 'is-active' : ''}`}
      style={{ opacity: blend }}
      aria-labelledby="card-swap-title"
    >
      <div className="portal-stage card-swap-stage-wrap">
        <CardSwapStack sections={portalSections} activeIndex={selected} entranceProgress={progress} />
        <span id="card-swap-title" className="sr-only">
          Portfolio sections — scroll to flip through
        </span>
      </div>
    </section>
  )
}

/* ── Timeline — Semi-circle wave from top-left to bottom-left ── */

function TimelinePhase({ progress, active, blend }) {
  // Eased progress: smoothstep gives more time at the start and end of the range
  const easedProgress = progress * progress * (3 - 2 * progress)
  const activeDot = clamp(
    Math.round(easedProgress * (timelineEntries.length - 1)),
    0,
    timelineEntries.length - 1,
  )

  // Dot positions along a quadratic bezier curve from top-left (inwards) to bottom-left (inwards)
  const dotPositions = useMemo(() =>
    timelineEntries.map((_, i) => {
      const t = i / (timelineEntries.length - 1)
      // Quadratic bezier: P0=(40,0), P1=(200, 500), P2=(40, 1000)
      // Starts/ends 40px in from left edge, bulging to 200 at midpoint
      const x = 40 + 2 * (200 - 40) * t * (1 - t)
      const y = 1000 * t
      return { x, y }
    }),
  [timelineEntries])

  // SVG path: quadratic bezier from inwards position
  const wavePath = 'M 40,0 Q 200,500 40,1000'

  return (
    <section
      className={`phase timeline-phase ${active ? 'is-active' : ''}`}
      style={{ opacity: blend }}
      aria-labelledby="timeline-title"
    >
      <div
        className="timeline-wrap"
        role="progressbar"
        aria-label="Portfolio journey progress"
        aria-valuemin={0}
        aria-valuemax={timelineEntries.length - 1}
        aria-valuenow={activeDot}
      >
        <svg
          className="thread"
          viewBox="10 0 220 1000"
          preserveAspectRatio="xMinYMin meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 200, 255, 0.15)" />
              <stop offset="40%" stopColor="rgba(0, 255, 255, 0.7)" />
              <stop offset="60%" stopColor="rgba(0, 255, 255, 0.7)" />
              <stop offset="100%" stopColor="rgba(0, 200, 255, 0.15)" />
            </linearGradient>
          </defs>
          {/* Glow underneath */}
          <path d={wavePath} className="thread-glow" />
          {/* Main wave line */}
          <path d={wavePath} className="thread-path" />
        </svg>
        {dotPositions.map((pos, index) => (
          <span
            key={timelineEntries[index][0]}
            className={`timeline-dot ${activeDot === index ? 'is-active' : ''}`}
            style={{
            left: `${(pos.x + 10) / 2.5}%`,
            top: `${pos.y / 10}%`,
              animationDelay: `${index * 120}ms`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      <article
        className="timeline-card"
        style={{ transform: `translateX(${(1 - progress) * 180}px)` }}
      >
        <p className="section-count">Journey</p>
        <h2 id="timeline-title">{timelineEntries[activeDot][0]}</h2>
        <p>{timelineEntries[activeDot][1]}</p>
      </article>
    </section>
  )
}

/* ── Finale ── */

function FinalePhase({ progress, active, reducedMotion, blend }) {
  return (
    <section
      className={`phase finale-phase ${active ? 'is-active' : ''}`}
      style={{ opacity: blend }}
      aria-labelledby="thanks-title"
    >
      <CinematicCanvas
        variant="zipper"
        progress={progress}
        active={active}
        reducedMotion={reducedMotion}
      />
      <h2
        id="thanks-title"
        className={progress > 0.72 || reducedMotion ? 'thanks visible' : 'thanks'}
      >
        THANK YOU
      </h2>
    </section>
  )
}

/* ── App ── */

export default function App() {
  const { y, vh, reducedMotion, scrollVelocity } = useScrollScene()
  const currentUnit = y / vh
  const phase =
    phaseStops.find((item) => currentUnit >= item.start && currentUnit < item.end) ||
    phaseStops.at(-1)

  const blend = {
    hero: computeBlend(currentUnit, 0, 3.5),
    portal: computeBlend(currentUnit, 3.5, 9),
    timeline: computeBlend(currentUnit, 9, 14),
    finale: computeBlend(currentUnit, 14, 17),
  }

  const progress = {
    hero: phaseProgress(y, vh, 0, 3.5),
    portal: phaseProgress(y, vh, 3.5, 9),
    timeline: phaseProgress(y, vh, 9, 14),
    finale: phaseProgress(y, vh, 14, 17),
  }

  return (
    <>
      <SkipLink />
      <CursorGlow />
      <div className="scroll-space" aria-hidden="true" />
      <main id="main-content" className="stage">
        <HeroPhase
          progress={progress.hero}
          active={phase.id === 'hero'}
          blend={blend.hero}
          reducedMotion={reducedMotion}
          scrollVelocity={scrollVelocity}
        />
        <RingPortalPhase
          progress={progress.portal}
          active={phase.id === 'portal'}
          blend={blend.portal}
        />
        <TimelinePhase
          progress={progress.timeline}
          active={phase.id === 'timeline'}
          blend={blend.timeline}
        />
        <FinalePhase
          progress={progress.finale}
          active={phase.id === 'finale'}
          blend={blend.finale}
          reducedMotion={reducedMotion}
        />
      </main>
    </>
  )
}
