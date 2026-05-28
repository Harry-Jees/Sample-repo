# HARRY JEES PORTFOLIO — IMPLEMENTATION PLAN

**Status:** Planning Phase  
**Version:** 1.0  
**Last Updated:** May 28, 2026  
**Source Documents:** `designdoc.md`, `HARRY_JEES_PORTFOLIO_PRD.md`, `specifications.md`

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Architecture & Tech Stack Decisions](#2-architecture--tech-stack-decisions)
3. [Component Tree & Data Flow](#3-component-tree--data-flow)
4. [Development Phases Breakdown](#4-development-phases-breakdown)
5. [State Management Design](#5-state-management-design)
6. [Animation Architecture](#6-animation-architecture)
7. [Responsive Strategy](#7-responsive-strategy)
8. [Performance Budget & Optimization Plan](#8-performance-budget--optimization-plan)
9. [Accessibility Implementation Plan](#9-accessibility-implementation-plan)
10. [Deployment Pipeline](#10-deployment-pipeline)
11. [Testing Strategy](#11-testing-strategy)
12. [Risk Mitigation](#12-risk-mitigation)

---

## 1. PROJECT OVERVIEW

### Vision
A cinematic, narrative-driven portfolio website with 5 immersive phases that transitions users through a cosmic particle system → binary rain with text formation → interactive ASCII ring portal → parallax timeline → dramatic zipper reveal finale.

### Core Design Principles
- **Minimalism with Maximum Impact** — Clean black background, focused white elements, motion-driven storytelling
- **Smoothness Above Complexity** — 60 FPS target, GPU-accelerated animations only
- **Responsive by Design** — Mobile-first progressive enhancement
- **Accessibility First** — WCAG 2.1 AA, prefers-reduced-motion support

### Tech Stack (Finalized from Specs)

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Build Tool | **Vite 5+** | Fast dev server, optimized builds |
| Framework | **React 18+** | Component-based UI, state management |
| Animations | **Framer Motion** | Scroll-triggered, gesture-based animations |
| Graphics | **Canvas API** | Particle systems, binary rain, ASCII ring |
| Styling | **TailwindCSS v3+** | Utility-first responsive design |
| State | **Zustand** | Lightweight centralized state (per specs recommendation) |
| Deployment | **Vercel** | Edge-optimized hosting |

### 5-Phase Experience Architecture

```
┌─────────────────────────────────────────┐
│  PHASE 1: COSMIC OPENING (100vh)        │
│  • Particle planet cluster              │
│  • Wavy gradient background             │
│  • Scroll-triggered explosion           │
├─────────────────────────────────────────┤
│  PHASE 2: WELCOME + BINARY RAIN (100vh) │
│  • Binary rain characters              │
│  • "HARRY JEES" sticky template        │
│  • "WELCOME TO MY PORTFOLIO" text      │
├─────────────────────────────────────────┤
│  PHASE 3: RING PORTAL (500vh)          │
│  • ASCII character ring                │
│  • 5 interactive sections              │
│  • Dust dissolution transitions        │
├─────────────────────────────────────────┤
│  PHASE 4: PARALLAX TIMELINE (300vh)    │
│  • Wiggly SVG thread                   │
│  • Active dot highlighting             │
│  • Info cards with parallax            │
├─────────────────────────────────────────┤
│  PHASE 5: ZIPPER REVEAL (100vh)        │
│  • Character wave background           │
│  • Zipper blade tear-away              │
│  • "THANK YOU" finale                  │
└─────────────────────────────────────────┘
```

---

## 2. ARCHITECTURE & TECH STACK DECISIONS

### 2.1 Why React + Vite over Vanilla JS?
- Component reusability (ParticleEngine reused across all phases)
- Framer Motion integration for scroll-triggered animations
- Zustand for clean scroll/section state management
- Code splitting via React.lazy() for heavy phases
- Better DX with HMR during development

### 2.2 Why Canvas API over Three.js for Particles?
- Lower bundle size (~30KB vs 600KB+ for Three.js)
- Sufficient for 2D particle effects in this project
- Better mobile performance with offscreen canvas
- No WebGL context loss issues on older devices
- Three.js only reserved if 3D effects prove necessary (likely not needed)

### 2.3 Why Zustand over Redux/Context?
- Minimal boilerplate (no providers, reducers, actions)
- Built-in support for derived state (scroll velocity, active phase)
- No re-render cascading like Context
- Direct subscription model for animation performance
- Small bundle (~1KB gzipped)

### 2.4 Why Framer Motion over GSAP?
- Native React integration (no imperative ref management)
- Scroll-triggered animations built-in (useScroll, useMotionValue)
- Gesture support (hover, tap, drag) for ring portal
- Smaller bundle when tree-shaken (~30KB vs 50KB+ GSAP)
- Better SSR support if needed

---

## 3. COMPONENT TREE & DATA FLOW

### 3.1 Full Component Hierarchy

```
<App>
  ├── <PhaseManager>              // Orchestrates which phase is active
  │   ├── <Hero />                 // Phase 1: Cosmic Opening
  │   │   └── <ParticleEngine />   // Shared: Canvas-based particles
  │   ├── <Welcome />              // Phase 2: Binary Rain + Text
  │   │   ├── <BinaryRain />       // Canvas: falling 0/1 characters
  │   │   └── <ParticleEngine />   // Reused for text formation
  │   ├── <RingPortal />           // Phase 3: ASCII ring navigation
  │   │   ├── <ASCIICircle />      // Canvas: character ring
  │   │   ├── <RingPoint /> ×5     // Interactive navigation nodes
  │   │   └── <SectionContent />   // Display area for active section
  │   ├── <Timeline />             // Phase 4: Parallax timeline
  │   │   ├── <WigglyThread />     // SVG path with Perlin noise
  │   │   ├── <TimelineDot /> ×15-20
  │   │   └── <InfoCard />         // Floating content boxes
  │   └── <Zipper />               // Phase 5: Finale reveal
  │       ├── <CharacterWave />    // Canvas: animated ASCII grid
  │       └── <ZipperBlade />      // Glowing cyan line
  │
  ├── <ScrollManager />            // Tracks all scroll state
  ├── <PerformanceDetector />      // Detects device capability
  └── <AccessibilityProvider />    // reduced-motion, keyboard nav
```

### 3.2 Data Flow Diagram

```
User Scroll Input
       │
       ▼
┌──────────────────┐
│  useScrollStore   │ ← Zustand store
│  • scrollPosition │
│  • scrollVelocity │
│  • activePhase    │
│  • activeSection  │
│  • deviceTier     │
└──────┬───────────┘
       │
       ├─────────────────┬─────────────────┬────────────────┐
       ▼                 ▼                 ▼                ▼
┌──────────┐    ┌─────────────┐    ┌────────────┐    ┌──────────┐
│  Hero    │    │   Welcome   │    │ RingPortal │    │ Timeline │
│ Phase 1  │    │   Phase 2   │    │  Phase 3   │    │  Phase 4 │
└──────────┘    └─────────────┘    └────────────┘    └──────────┘
                                                          │
                                                    ┌─────┘
                                                    ▼
                                              ┌──────────┐
                                              │  Zipper  │
                                              │  Phase 5 │
                                              └──────────┘
```

---

## 4. DEVELOPMENT PHASES BREAKDOWN

### Phase A: Foundation & Scaffolding (Tasks 1-8)

**Goal:** Set up the entire project skeleton with all tooling, hooks, utilities, and configuration.

**Includes:**
- Vite + React initialization with TailwindCSS
- Zustand store with all state slices
- Custom hooks (useScrollVelocity, useParallax, useWindowSize, useDeviceTier)
- Utility functions (particles, noise, animations, constants)
- Global CSS with design tokens, animations, responsive breakpoints
- Accessibility provider and reduced-motion detection
- Component scaffolding with phase structure

### Phase B: Particle Engine & Hero (Tasks 9-19)

**Goal:** Build the reusable Canvas-based particle engine and implement Phase 1.

**Includes:**
- ParticleEngine component (creation, physics, rendering, pooling)
- Perlin noise implementation for organic movement
- Hero section with particle planet cluster
- Wavy gradient background animation
- Scroll-velocity-triggered particle explosion
- Responsive particle count adaptation

### Phase C: Binary Rain & Welcome Text (Tasks 20-27)

**Goal:** Implement Phase 2 with binary rain, sticky text template, and text formation.

**Includes:**
- BinaryRain component with Canvas rendering
- Falling character generation and animation loop
- "HARRY JEES" invisible collision template
- Particle-to-text formation animation
- Glowing "WELCOME TO MY PORTFOLIO" text
- Parallax tilt effect on text

### Phase D: Ring Portal Navigation (Tasks 28-39)

**Goal:** Build Phase 3 — the most complex phase with navigation.

**Includes:**
- ASCIICircle component with character distribution
- Ring rotation logic (click/scroll triggered)
- 5 interactive RingPoint components
- SectionContent with fade transitions
- Content data for all 5 sections
- Parallax depth effect on content
- Dust dissolution animation on section exit
- Scroll-based section switching

### Phase E: Parallax Timeline (Tasks 40-49)

**Goal:** Implement Phase 4 with wiggly SVG thread and timeline.

**Includes:**
- WigglyThread SVG component with Perlin noise
- TimelineDot components with active states
- Active dot detection based on scroll position
- InfoCard components with parallax offset
- Timeline tilt effect
- Mobile adaptation of timeline layout

### Phase F: Zipper Reveal Finale (Tasks 50-57)

**Goal:** Build Phase 5 with character wave and dramatic finale.

**Includes:**
- CharacterWave Canvas component
- Wave animation with sine-based oscillation
- ZipperBlade component with glow effect
- Zipper upward motion with easing
- Character tear-away reveal effect
- "THANK YOU" fade-in animation with glow
- Transition from Phase 4 to Phase 5

### Phase G: Polish, Performance & Accessibility (Tasks 58-68)

**Goal:** Optimize everything, add accessibility, and final QA.

**Includes:**
- Performance profiling and optimization
- Reduced-motion support validation
- Keyboard navigation implementation
- Screen reader ARIA labels
- Focus management and skip links
- Cross-browser testing
- Mobile touch optimization
- Bundle size optimization
- Code cleanup and documentation

### Phase H: Deployment (Tasks 69-73)

**Goal:** Deploy to Vercel with proper configuration.

**Includes:**
- Vercel configuration (vercel.json)
- Environment variables setup
- Production build and preview
- Custom domain configuration
- Analytics and monitoring

---

## 5. STATE MANAGEMENT DESIGN

### Zustand Store Schema

```javascript
// usePortfolioStore.js
{
  // Scroll State
  scrollPosition: 0,
  scrollVelocity: 0,
  scrollDirection: 'down', // 'up' | 'down'
  
  // Phase Management
  activePhase: 1, // 1-5
  phaseProgress: 0, // 0-1 per phase
  
  // Section Navigation (Phase 3)
  activeSection: 0, // 0-4 (About Me, Skills, Projects, Experience, Contact)
  
  // Timeline (Phase 4)
  activeTimelineIndex: 0,
  
  // Device Capabilities
  deviceTier: 'high', // 'high' | 'medium' | 'low'
  isReducedMotion: false,
  isMobile: false,
  
  // Animation Controls
  isTransitioning: false,
  particleCount: 300, // Dynamic based on deviceTier
  
  // Actions
  setScrollPosition: (pos) => void,
  setActivePhase: (phase) => void,
  setActiveSection: (section) => void,
  setDeviceTier: (tier) => void,
}
```

### Scroll-to-Phase Mapping

| Scroll Position Range | Active Phase | Phase Height |
|----------------------|--------------|--------------|
| 0 - 100vh | Phase 1 | 100vh |
| 100vh - 200vh | Phase 2 | 100vh |
| 200vh - 700vh | Phase 3 | 500vh |
| 700vh - 1000vh | Phase 4 | 300vh |
| 1000vh - 1100vh | Phase 5 | 100vh |

---

## 6. ANIMATION ARCHITECTURE

### 6.1 Animation Layers

| Layer | Technology | Responsibility |
|-------|-----------|----------------|
| Canvas Animations | requestAnimationFrame | Particle physics, binary rain, ASCII ring, character wave |
| DOM Transitions | Framer Motion | Section fade in/out, ring rotation, dot highlighting |
| CSS Animations | TailwindCSS @keyframes | Wavy gradient, glows, micro-interactions |
| Scroll Effects | Framer Motion useScroll | Parallax offsets, progress tracking |

### 6.2 Easing Functions Reference

| Name | Bezier | Usage |
|------|--------|-------|
| easeOutCubic | `cubic-bezier(0.215, 0.61, 0.355, 1)` | Most animations, content fade |
| easeOutBack | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Ring rotation, dot scaling |
| easeOutExpo | `cubic-bezier(0.19, 1, 0.22, 1)` | Zipper motion, particle explosions |
| easeOutQuad | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Parallax, small transitions |
| linear | `linear` | Binary rain falling, particle wobble |

### 6.3 Animation Duration Standards

| Animation | Duration | Easing |
|-----------|----------|--------|
| Particle explosion | 2000ms | easeOutExpo |
| Text formation | 1200ms | easeOutBack |
| Ring rotation | 800ms | easeOutBack |
| Content fade in | 600ms | easeOutCubic |
| Content fade out | 400ms | easeOutCubic |
| Dot activation | 400ms | easeOutBack |
| Zipper motion | 2000ms | easeOutExpo |
| Thank you appear | 1200ms | easeOutCubic |
| Micro-interactions | 200-300ms | easeOutCubic |

---

## 7. RESPONSIVE STRATEGY

### 7.1 Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| Mobile | 320-767px | Small particles (100), smaller fonts, simplified effects |
| Tablet | 768-1365px | Medium particles (200), tablet fonts, moderate effects |
| Desktop | 1366-1919px | Full particles (300), desktop fonts, all effects |
| Large Desktop | 1920px+ | Enhanced spacing, premium effects |

### 7.2 Adaptive Properties

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Particle count | 100 | 200 | 300 |
| Ring diameter | 320px | 600px | 800px |
| H1 font size | 24px | 32px | 48px |
| Binary rain char size | 12px | 14px | 16px |
| Timeline dots spacing | 40px | 50px | 60px |
| Zipper char grid | 20×15 | 30×25 | 40×30 |

### 7.3 Mobile-Specific Interactions

- Tap-to-trigger for ring portal (instead of hover)
- Swipe detection for section changes
- Larger touch targets (minimum 44×44px)
- Reduced animation durations
- Simplified particle physics (no Perlin noise on low-tier devices)

---

## 8. PERFORMANCE BUDGET & OPTIMIZATION PLAN

### 8.1 Performance Targets

| Metric | Target |
|--------|--------|
| FPS | Stable 60 FPS |
| FCP | < 1.5s |
| LCP | < 2.5s |
| CLS | < 0.1 |
| Bundle Size | < 200KB gzipped |
| Lighthouse (Mobile) | 85+ |

### 8.2 Optimization Techniques

**Rendering:**
- `transform` and `opacity` only for GPU-accelerated animations
- `will-change` on animated elements
- OffscreenCanvas for particle rendering
- requestAnimationFrame with frame skipping on low FPS

**Bundle:**
- Dynamic imports for phase components (React.lazy + Suspense)
- Tree-shaking unused Framer Motion features
- CSS purging via TailwindCSS
- Code splitting by route/phase

**Runtime:**
- Debounced scroll listeners (30Hz max update rate)
- Object pooling for particles (avoid GC pressure)
- Canvas pixel ratio capping (max 2x on high-DPI)
- Device tier detection to disable expensive features

---

## 9. ACCESSIBILITY IMPLEMENTATION PLAN

### 9.1 Requirements Checklist

- [ ] WCAG 2.1 AA color contrast (4.5:1 minimum)
- [ ] prefers-reduced-motion support
- [ ] Full keyboard navigation
- [ ] Screen reader ARIA labels
- [ ] Visible focus indicators
- [ ] Semantic HTML structure
- [ ] Skip-to-content link
- [ ] Proper heading hierarchy

### 9.2 Color Contrast Adjustments

| Color | Background | Ratio | Status |
|-------|-----------|-------|--------|
| #FFFFFF on #000000 | 21:1 | ✅ Pass |
| #00DD00 on #000000 | 5.2:1 | ✅ Pass (adjusted from #00FF00) |
| #00FFFF on #000000 | 10.3:1 | ✅ Pass |

### 9.3 Reduced-Motion Strategy

When `prefers-reduced-motion: reduce` is detected:
- Disable all particle animations (static display)
- Replace scroll transitions with instant snaps
- Remove parallax effects
- Shorten or skip binary rain animation
- Flatten all easing curves to linear

---

## 10. DEPLOYMENT PIPELINE

### 10.1 Vercel Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### 10.2 CI/CD Flow

1. Push to `main` branch on GitHub
2. Vercel auto-detects push
3. Runs `npm run build`
4. Deploys to preview URL
5. Production deploy on merge to `production` branch

---

## 11. TESTING STRATEGY

### 11.1 Testing Approach

- **Visual testing**: Manual browser testing across Chrome, Firefox, Safari, Edge
- **Performance testing**: Lighthouse CI, DevTools Performance tab
- **Responsive testing**: Chrome DevTools device emulation + real device testing
- **Accessibility testing**: axe-core, Lighthouse a11y audit, keyboard-only navigation
- **Animation FPS testing**: requestAnimationFrame frame timing logging

### 11.2 Critical Test Scenarios

1. Scroll velocity → particle explosion intensity
2. Binary rain → "HARRY JEES" sticky collision
3. Ring click → rotation → section display → dust dissolution
4. Timeline dot activation → info card → parallax offset
5. Zipper motion → character fade → "THANK YOU" appearance
6. Mobile viewport → proper scaling and reduced effects
7. prefers-reduced-motion → all animations disabled
8. Keyboard tab → focus ring → section navigation

---

## 12. RISK MITIGATION

| Risk | Severity | Mitigation |
|------|----------|------------|
| Low FPS on mobile devices | High | Dynamic particle reduction, frame skipping, device tier detection |
| Scroll event performance | High | Debounced listeners, passive event listeners, requestAnimationFrame |
| Canvas memory leaks | Medium | Proper cleanup in useEffect return, object pooling |
| Browser incompatibility | Medium | Feature detection, graceful degradation |
| Animation timing drift | Low | Delta-time-based animation, not frame-count-based |
| Large bundle from animation libs | Low | Tree-shaking, dynamic imports, code splitting |
| Accessibility compliance gaps | Medium | Automated a11y testing, manual keyboard audit |

---

## FILES TO BE CREATED

### Source Files (`src/`)

```
src/
├── components/
│   ├── phases/
│   │   ├── Hero.jsx              # Phase 1
│   │   ├── Welcome.jsx           # Phase 2
│   │   ├── RingPortal.jsx        # Phase 3
│   │   ├── Timeline.jsx          # Phase 4
│   │   └── Zipper.jsx            # Phase 5
│   ├── shared/
│   │   ├── ParticleEngine.jsx    # Reusable canvas particle system
│   │   ├── ScrollManager.jsx     # Scroll tracking overlay
│   │   └── PhaseManager.jsx      # Phase orchestration
│   ├── ui/
│   │   ├── RingPoint.jsx         # Interactive ring node
│   │   ├── SectionContent.jsx    # Content display
│   │   ├── BinaryRain.jsx        # Canvas binary rain
│   │   ├── ASCIICircle.jsx       # Canvas ASCII ring
│   │   ├── WigglyThread.jsx      # SVG timeline thread
│   │   ├── TimelineDot.jsx       # Timeline node
│   │   ├── InfoCard.jsx          # Info box
│   │   ├── CharacterWave.jsx     # Canvas character wave
│   │   ├── ZipperBlade.jsx       # Zipper line
│   │   └── ThankYou.jsx          # Final message
│   └── layout/
│       └── SkipLink.jsx          # Accessibility skip link
├── hooks/
│   ├── useScrollVelocity.js
│   ├── useParallax.js
│   ├── useWindowSize.js
│   └── useDeviceTier.js
├── store/
│   └── usePortfolioStore.js
├── utils/
│   ├── particles.js              # Particle creation & physics
│   ├── noise.js                  # Perlin noise
│   ├── easing.js                 # Easing functions
│   └── constants.js              # Design tokens
├── data/
│   └── sections.js               # Section content data
├── styles/
│   ├── index.css                 # Global styles + Tailwind
│   ├── animations.css            # Keyframe animations
│   └── a11y.css                  # Accessibility styles
├── App.jsx
├── App.css
└── main.jsx
```

### Config Files

```
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── package.json
└── .env.example
```

---

**Plan Version:** 1.0  
**Status:** Ready for Execution  
**Next Step:** Begin TODO list execution — Phase A: Foundation Setup
