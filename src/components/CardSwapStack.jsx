import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ── Slot geometry ── */

function makeSlot(i, distX, distY, total) {
  return {
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i,
  }
}

/* ── CardSwapStack ── */

export default function CardSwapStack({ sections, activeIndex, entranceProgress }) {
  const cardRefs = useRef([])
  const orderRef = useRef(sections.map((_, i) => i))
  const animating = useRef(false)
  const prevIdx = useRef(0)
  const entranceFired = useRef(false)

  const total = sections.length
  const distX = 48
  const distY = 35

  /* Entrance animation: cards fall from above with wobble, staggered one by one */
  // Triggered when the user first scrolls into the portal phase (progress ~0-0.15)
  useEffect(() => {
    if (entranceFired.current) return
    if (entranceProgress == null || entranceProgress <= 0) return

    entranceFired.current = true

    const tl = gsap.timeline()

    sections.forEach((_, i) => {
      const el = cardRefs.current[i]
      if (!el) return
      const slot = makeSlot(i, distX, distY, total)

      // Start position: above viewport, each card starts higher up
      gsap.set(el, {
        x: 0,
        y: -(window.innerHeight * 0.45 + i * 60),
        z: 0,
        xPercent: -50,
        yPercent: -50,
        skewY: 0,
        opacity: 0,
        scale: 0.5 + i * 0.04,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true,
      })

      // Animate to slot position with elastic wobble
      tl.to(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        scale: 1 - i * 0.05,
        opacity: 1 - i * 0.18,
        duration: 1.6,
        ease: 'elastic.out(0.7, 0.6)',
      }, i * 0.28)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entranceProgress])

  /* Scroll-driven swap */
  useEffect(() => {
    if (activeIndex === prevIdx.current || animating.current) return

    const direction = activeIndex > prevIdx.current ? 'forward' : 'backward'
    animating.current = true

    if (direction === 'forward') {
      forwardSwap()
    } else {
      backwardSwap()
    }

    prevIdx.current = activeIndex
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  /* ── Forward: front card drops, rest promote ── */

  function forwardSwap() {
    const frontId = orderRef.current[0]
    const frontEl = cardRefs.current[frontId]
    if (!frontEl) { animating.current = false; return }

    const tl = gsap.timeline({
      onComplete: () => {
        orderRef.current = [...orderRef.current.slice(1), frontId]
        const backSlot = makeSlot(total - 1, distX, distY, total)
        gsap.set(frontEl, {
          zIndex: backSlot.zIndex,
          scale: 1 - (total - 1) * 0.05,
          opacity: 1 - (total - 1) * 0.18,
        })
        animating.current = false
      },
    })

    /* Drop the front card */
    tl.to(frontEl, {
      y: `+=${window.innerHeight * 0.55}`,
      opacity: 0,
      scale: 0.6,
      duration: 1.4,
      ease: 'elastic.out(0.55, 0.85)',
    }, 0)

    /* Promote all other cards forward one slot */
    const rest = orderRef.current.slice(1)
    rest.forEach((id, i) => {
      const el = cardRefs.current[id]
      if (!el) return
      const slot = makeSlot(i, distX, distY, total)
      tl.set(el, { zIndex: slot.zIndex }, 0)
      tl.to(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        scale: 1 - i * 0.05,
        opacity: 1 - i * 0.18,
        duration: 1.2,
        ease: 'elastic.out(0.55, 0.85)',
      }, 0)
    })

    /* Return dropped card to back of stack */
    const backSlot = makeSlot(total - 1, distX, distY, total)
    tl.to(frontEl, {
      x: backSlot.x,
      y: backSlot.y,
      z: backSlot.z,
      opacity: 1 - (total - 1) * 0.18,
      scale: 1 - (total - 1) * 0.05,
      duration: 1.6,
      ease: 'elastic.out(0.55, 0.85)',
    }, 0.35)
  }

  /* ── Backward: back card rises, rest demote ── */

  function backwardSwap() {
    const backId = orderRef.current[total - 1]
    const backEl = cardRefs.current[backId]
    if (!backEl) { animating.current = false; return }

    const [front, ...middle] = orderRef.current
    const rest = [...middle.slice(0, -1)] // everything except front and back

    const tl = gsap.timeline({
      onComplete: () => {
        orderRef.current = [backId, front, ...middle.slice(0, -1)]
        const frontSlot = makeSlot(0, distX, distY, total)
        gsap.set(backEl, {
          zIndex: frontSlot.zIndex,
          scale: 1,
          opacity: 1,
        })
        animating.current = false
      },
    })

    /* Pull back card up from below */
    const origBackSlot = makeSlot(total - 1, distX, distY, total)
    gsap.set(backEl, { zIndex: 0 })

    tl.to(backEl, {
      y: `-=${window.innerHeight * 0.55}`,
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: 'elastic.out(0.55, 0.85)',
    }, 0)

    /* Demote front card to slot 1, rest shift back by one */
    const frontEl = cardRefs.current[front]
    if (frontEl) {
      const slot1 = makeSlot(1, distX, distY, total)
      tl.set(frontEl, { zIndex: slot1.zIndex }, 0)
      tl.to(frontEl, {
        x: slot1.x, y: slot1.y, z: slot1.z,
        scale: 1 - 1 * 0.05,
        opacity: 1 - 1 * 0.18,
        duration: 1.2,
        ease: 'elastic.out(0.55, 0.85)',
      }, 0)
    }

    rest.forEach((id, i) => {
      const el = cardRefs.current[id]
      if (!el) return
      const slot = makeSlot(i + 2, distX, distY, total)
      tl.set(el, { zIndex: slot.zIndex }, 0)
      tl.to(el, {
        x: slot.x, y: slot.y, z: slot.z,
        scale: 1 - (i + 2) * 0.05,
        opacity: 1 - (i + 2) * 0.18,
        duration: 1.2,
        ease: 'elastic.out(0.55, 0.85)',
      }, 0)
    })

    /* Place rising card at front */
    const frontSlot = makeSlot(0, distX, distY, total)
    tl.to(backEl, {
      x: frontSlot.x,
      y: frontSlot.y,
      z: frontSlot.z,
      duration: 1.6,
      ease: 'elastic.out(0.55, 0.85)',
    }, 0.35)
  }

  return (
    <div className="card-swap-stage" aria-label="Portfolio sections">
      {sections.map((section, i) => (
        <div
          key={i}
          ref={(el) => { cardRefs.current[i] = el }}
          className="swap-card"
          aria-hidden={i !== activeIndex ? 'true' : undefined}
        >
          <div className="swap-card-inner">
            <p className="swap-card-count">
              0{i + 1} / 0{total}
            </p>
            <h2 className="swap-card-title">{section.title}</h2>
            <p className="swap-card-summary">{section.summary}</p>
            {section.details.length > 0 && (
              <ul className="swap-card-details">
                {section.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
