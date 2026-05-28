# HARRY JEES PORTFOLIO — MASTER DEVELOPMENT SPECIFICATION

## Final Unified PRD + Design System + AI Development Guide

**Author:** Harry Jees
**Version:** 2.0 Final
**Date:** May 2026
**Status:** Production Planning & AI Development Ready

---

# 1. PROJECT OVERVIEW

This project is an immersive cinematic portfolio website designed to create a highly memorable narrative-driven experience through advanced motion design, particle systems, interactive transitions, and futuristic visual storytelling.

The website is intended to feel:

* cinematic,
* futuristic,
* emotional,
* interactive,
* technically sophisticated,
  while still remaining performant and responsive across devices.

This document serves as:

* Product Requirements Document (PRD)
* Design System Specification
* Animation Architecture Guide
* Technical Planning Document
* AI Development Instruction Manual

This specification is intended for:

* Gemini
* Antigravity
* Lovable
* Cursor
* Claude Code
* GPT-based autonomous coding systems
* Human developers

---

# 2. CORE EXPERIENCE GOALS

The website should create:

* awe,
* immersion,
* curiosity,
* elegance,
* narrative flow.

The experience should feel like:

> a futuristic interactive digital story rather than a normal portfolio.

The user should experience:

1. curiosity upon landing,
2. engagement through interaction,
3. emotional progression through transitions,
4. satisfaction through visual continuity,
5. memorable closure at the ending.

---

# 3. DESIGN PHILOSOPHY

## Core Principles

### 1. Minimalism with Maximum Impact

Use minimal colors and clean layouts while relying heavily on motion and timing.

### 2. Motion-Driven Storytelling

Every animation must feel meaningful and connected to the narrative.

### 3. Smoothness Above Complexity

Performance is more important than visual overload.

### 4. Responsive by Design

Every effect should adapt intelligently across devices.

### 5. Accessibility First

Animations must respect accessibility standards and reduced-motion preferences.

---

# 4. VISUAL IDENTITY

## Color Palette

### Background

* Primary Black: `#000000`
* Secondary Dark: `#0A0A0A`

### Text

* Primary White: `#FFFFFF`
* Secondary White: `rgba(255,255,255,0.87)`
* Muted Gray: `#808080`

### Accent Colors

* Neon Green: `#00FF00`
* Cyan Glow: `#00FFFF`
* Soft Blue: `#0099FF`

---

## Typography

### Primary Font

```css
'Courier New', monospace
```

### Secondary Font

```css
System Sans-serif Stack
```

### Typography Feel

* futuristic,
* technical,
* elegant,
* minimal.

---

# 5. EXPERIENCE STRUCTURE

The website consists of 5 cinematic phases.

---

# 6. PHASE 1 — COSMIC OPENING

## Objective

Create a strong emotional first impression.

## Features

* black cinematic background,
* subtle moving white gradient waves,
* central floating particle planet,
* subtle floating motion using Perlin noise,
* scroll-triggered particle explosion.

## Behavior

The particle cluster reacts physically to user scroll velocity.

Fast scrolling causes:

* larger explosions,
* stronger outward movement,
* stronger opacity fading.

## Technical Notes

* Canvas API preferred.
* GPU-accelerated transforms only.
* Mobile particle count reduced dynamically.

---

# 7. PHASE 2 — WELCOME + BINARY RAIN

## Objective

Transition from abstract cinematic visuals into identity introduction.

## Features

* falling binary rain,
* sticky “HARRY JEES” collision template,
* particle-to-text formation,
* glowing “WELCOME TO MY PORTFOLIO” animation.

## Motion Philosophy

The scene should feel:

* elegant,
* intelligent,
* fluid,
  not chaotic.

## Animation Rules

* smooth easing,
* soft glows,
* controlled timing,
* subtle parallax.

---

# 8. PHASE 3 — RING PORTAL NAVIGATION

## Objective

Allow exploration through an interactive futuristic portal system.

## Features

* giant ASCII character ring,
* 5 navigation points,
* rotating portal mechanism,
* section-focused transitions,
* parallax content depth.

## Sections

* About Me
* Skills
* Projects
* Experience
* Contact

## Transition Behavior

When changing sections:

* ring rotates,
* selected node moves into focus,
* content fades in,
* previous content dissolves into particles.

---

# 9. PHASE 4 — PARALLAX TIMELINE

## Objective

Display progression and journey visually.

## Features

* animated vertical timeline,
* wiggly SVG thread,
* glowing active nodes,
* floating info cards,
* layered parallax motion.

## Motion Style

Timeline should feel:

* alive,
* reactive,
* soft,
* cinematic.

---

# 10. PHASE 5 — ZIPPER REVEAL FINALE

## Objective

Deliver a memorable ending sequence.

## Features

* viewport filled with animated ASCII characters,
* wave motion background,
* glowing zipper blade moving upward,
* tearing-away reveal effect,
* final “THANK YOU” reveal.

## Final Mood

The ending should feel:

* peaceful,
* complete,
* cinematic,
* emotionally satisfying.

---

# 11. TECH STACK

## Frontend

* React 18+
* Vite
* TailwindCSS
* Framer Motion

## Graphics

* Canvas API
* Lightweight particle engine

## Optional

Three.js ONLY if absolutely necessary.

Avoid unnecessary WebGL complexity.

---

# 12. PERFORMANCE STRATEGY

## Highest Priority

Smoothness is more important than visual complexity.

---

## Mandatory Performance Rules

### Mobile Optimization

* reduce particles dynamically,
* reduce glow filters,
* reduce blur intensity,
* disable expensive effects on weak devices.

### Rendering Optimization

* use requestAnimationFrame,
* avoid layout-triggering animations,
* animate only transform and opacity,
* avoid excessive re-renders.

### Bundle Optimization

* lazy-load heavy sections,
* dynamic imports,
* aggressive tree-shaking,
* keep bundle lightweight.

---

# 13. ACCESSIBILITY RULES

## Required Standards

WCAG 2.1 AA compliant.

## Requirements

* keyboard navigable,
* screen reader compatible,
* visible focus states,
* proper semantic HTML,
* sufficient color contrast.

---

## Reduced Motion Support

If:

```css
prefers-reduced-motion: reduce
```

Then:

* disable heavy particle effects,
* reduce transitions,
* simplify parallax,
* shorten animations.

---

# 14. MOBILE INTERACTION PHILOSOPHY

Desktop cinematic scrolling must NOT compromise mobile usability.

## Mobile Rules

* shorter animation durations,
* lower visual density,
* larger touch targets,
* reduced particle count,
* optional tap-triggered interactions,
* simpler transitions.

---

# 15. STATE MANAGEMENT ARCHITECTURE

Use lightweight centralized state management.

Recommended:

* Zustand,
  or
* React Context + custom hooks.

Track:

* active phase,
* scroll progress,
* animation state,
* active section,
* device capability mode.

---

# 16. COMPONENT ARCHITECTURE

## Core Components

### Hero

Particle planet and opening sequence.

### Welcome

Binary rain and welcome formation.

### RingPortal

ASCII navigation system.

### Timeline

Parallax timeline experience.

### Zipper

Final reveal sequence.

### ParticleEngine

Shared rendering and physics system.

---

# 17. AI IMPLEMENTATION RULES

IMPORTANT:

The AI system building this project MUST prioritize:

* smoothness,
* maintainability,
* responsiveness,
* scalability,
  over visual excess.

---

## Mandatory Constraints

### DO:

* optimize aggressively,
* use GPU-friendly animations,
* use reusable animation systems,
* use responsive calculations,
* degrade effects gracefully,
* support low-end devices.

### DO NOT:

* overload the DOM,
* use excessive WebGL,
* create unnecessary rerenders,
* stack multiple heavy animation libraries,
* generate bloated code,
* use expensive CSS filters everywhere.

---

# 18. PERFORMANCE FALLBACK STRATEGY

## Low-End Device Detection

If low-performance device detected:

* reduce particles,
* disable advanced blur,
* simplify parallax,
* disable motion-heavy shadows,
* reduce animation frequency.

---

# 19. TARGET PERFORMANCE METRICS

| Metric           | Target          |
| ---------------- | --------------- |
| FPS              | Stable 60 FPS   |
| FCP              | < 1.5s          |
| LCP              | < 2.5s          |
| CLS              | < 0.1           |
| Bundle Size      | < 300KB gzipped |
| Lighthouse Score | 85+ Mobile      |

---

# 20. DEPLOYMENT

## Hosting

Vercel preferred.

## Requirements

* edge optimization,
* CDN caching,
* automatic deployment,
* analytics enabled.

---

# 21. DEVELOPMENT PRIORITY ORDER

## Build Order

1. Foundation setup
2. Particle engine
3. Hero phase
4. Welcome phase
5. Ring portal
6. Timeline
7. Finale
8. Optimization
9. Accessibility
10. Deployment polish

---

# 22. FINAL CREATIVE DIRECTION

The final website should feel like:

* a futuristic interactive cinematic experience,
* a high-end experimental portfolio,
* an emotional technical showcase,
* a digital art piece with strong engineering discipline.

The website must NEVER feel:

* generic,
* template-based,
* cluttered,
* visually noisy,
* gimmicky.

Every animation must feel:

* intentional,
* elegant,
* smooth,
* emotionally connected.

---

# 23. FINAL GOAL

Create a portfolio experience that:

* impresses visually,
* demonstrates technical capability,
* feels memorable,
* remains smooth and performant,
* and leaves visitors emotionally satisfied at the end.

END OF MASTER SPECIFICATION
