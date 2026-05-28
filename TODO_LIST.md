# HARRY JEES PORTFOLIO — EXTENSIVE TODO LIST

**Total Tasks:** 73  
**Status:** Planning Phase  
**Last Updated:** May 28, 2026

---

## PHASE A: FOUNDATION & SCAFFOLDING (Tasks 1-8)
**Goal:** Project skeleton with all tooling, hooks, utilities, and configuration.

### Task 1 — Initialize Vite + React Project
- [ ] Run `npm create vite@latest . -- --template react`
- [ ] Install core dependencies: framer-motion, zustand
- [ ] Install dev dependencies: tailwindcss, postcss, autoprefixer
- [ ] Verify project runs with `npm run dev`
- [ ] Verify clean build with `npm run build`

### Task 2 — Configure TailwindCSS
- [ ] Run `npx tailwindcss init -p`
- [ ] Configure `tailwind.config.js` with content paths
- [ ] Add `@tailwind` directives to `src/styles/index.css`
- [ ] Add custom design tokens (colors, spacing, fonts) to config
- [ ] Verify Tailwind classes work in a test component

### Task 3 — Configure Vite
- [ ] Set up path aliases (`@/` → `src/`)
- [ ] Configure build optimization (manual chunks, CSS splitting)
- [ ] Set up environment variable handling
- [ ] Configure PostCSS with TailwindCSS and autoprefixer

### Task 4 — Create Zustand Store (`src/store/usePortfolioStore.js`)
- [ ] Create store with scroll state slice (position, velocity, direction)
- [ ] Create phase management slice (activePhase, phaseProgress)
- [ ] Create section navigation slice (activeSection)
- [ ] Create device capabilities slice (deviceTier, isReducedMotion, isMobile)
- [ ] Create animation controls slice (isTransitioning, particleCount)
- [ ] Export all actions (setScrollPosition, setActivePhase, etc.)

### Task 5 — Create Custom Hooks
- [ ] **`useScrollVelocity.js`** — Track scroll speed and direction with debouncing
- [ ] **`useParallax.js`** — Calculate parallax offset based on scroll depth
- [ ] **`useWindowSize.js`** — Responsive dimensions with debounced resize
- [ ] **`useDeviceTier.js`** — Detect device capability (high/medium/low)

### Task 6 — Create Utility Functions
- [ ] **`utils/particles.js`** — createParticle, updateParticles, renderParticles, pool management
- [ ] **`utils/noise.js`** — Perlin noise implementation (2D), waveGenerator
- [ ] **`utils/easing.js`** — easeOutCubic, easeOutBack, easeOutExpo, easeOutQuad
- [ ] **`utils/constants.js`** — Design tokens (colors, spacing, counts, durations, thresholds)

### Task 7 — Create Global Styles
- [ ] **`src/styles/index.css`** — Tailwind directives, base styles, font imports
- [ ] **`src/styles/animations.css`** — @keyframes for wavy gradient, particle wobble, zipper glow
- [ ] **`src/styles/a11y.css`** — Focus styles, skip-link, sr-only, reduced-motion
- [ ] Add CSS custom properties for design tokens in index.css

### Task 8 — Create Phase Component Scaffolding
- [ ] Create PhaseManager component (orchestrates active phase)
- [ ] Create placeholder components: Hero, Welcome, RingPortal, Timeline, Zipper
- [ ] Create App.jsx with PhaseManager and basic layout
- [ ] Create main.jsx with React.StrictMode
- [ ] Wire up components with basic rendering to verify structure

---

## PHASE B: PARTICLE ENGINE & HERO (Tasks 9-19)
**Goal:** Reusable particle system and Phase 1 cosmic opening.

### Task 9 — Build ParticleEngine Core (`src/components/shared/ParticleEngine.jsx`)
- [ ] Create Canvas ref with 2D context
- [ ] Implement particle creation factory (position, velocity, size, opacity)
- [ ] Implement particle update loop (position += velocity * deltaTime)
- [ ] Implement particle rendering (arc drawing with opacity)
- [ ] Add particle pooling (reuse dead particles, avoid GC)
- [ ] Add cleanup on unmount (cancelAnimationFrame)

### Task 10 — Implement Perlin Noise Integration
- [ ] Integrate noise.js with particle wobble calculation
- [ ] Add per-particle phase offset for varied movement
- [ ] Implement amplitude/frequency control from constants

### Task 11 — Implement Hero Section Layout
- [ ] Create full-viewport hero container with black background
- [ ] Add particle planet container centered on screen
- [ ] Implement responsive positioning (200px desktop, 120px mobile)
- [ ] Add z-index layering (background 1, particles 2)

### Task 12 — Implement Wavy Gradient Background
- [ ] Create gradient overlay with linear-gradient (transparent → white 3% → transparent)
- [ ] Add continuous subtle wave animation (8s ease-in-out infinite)
- [ ] Implement translateY oscillation: 0% → -20px → 20px → 0%

### Task 13 — Implement Particle Planet Cluster
- [ ] Create 300 particles (desktop) clustered around center using Gaussian distribution
- [ ] Implement individual particle size variation (2-4px)
- [ ] Add Perlin noise-based floating animation (amplitude: 2-4px, frequency: 0.3Hz)
- [ ] Set particle opacity range (0.8 - 1.0)
- [ ] Add subtle glow effect (drop-shadow)

### Task 14 — Implement Scroll Velocity Detection
- [ ] In `useScrollVelocity.js`: track timestamp-delta between scroll events
- [ ] Calculate velocity in px/ms
- [ ] Implement direction detection (up/down)
- [ ] Add configurable threshold (0.5 px/ms for explosion trigger)
- [ ] Debounce to max 30Hz update rate

### Task 15 — Implement Particle Explosion Logic
- [ ] Detect scroll velocity > 0.5 px/ms
- [ ] Calculate explosion force: scrollVelocity × 5 (capped at 20)
- [ ] Calculate particle launch angle: atan2(particle.y - centerY, particle.x - centerX)
- [ ] Apply velocity to each particle with friction deceleration (-0.1 px/ms²)
- [ ] Fade opacity to 0 over 2000ms
- [ ] Clamp max travel distance (~2000px)

### Task 16 — Implement Post-Explosion Reset
- [ ] After explosion completes (opacity = 0), reset particles to center cluster
- [ ] Reset opacity and size to initial values
- [ ] Allow re-explosion on next scroll trigger
- [ ] Add smooth re-formation animation

### Task 17 — Implement Canvas Resize Handling
- [ ] Resize canvas to fill container on window resize
- [ ] Recalculate center position for particle cluster
- [ ] Debounce resize handler (200ms)

### Task 18 — Implement Device Tier Adaptation for Particles
- [ ] High tier: 300 particles, full effects, Perlin noise
- [ ] Medium tier: 200 particles, reduced glow, simplified movement
- [ ] Low tier: 100 particles, no Perlin noise, minimal effects
- [ ] Use `useDeviceTier` hook to dynamically adjust

### Task 19 — Test Particle Engine Performance
- [ ] Verify 60 FPS on desktop with 300 particles
- [ ] Verify 60 FPS on mobile emulation with 100 particles
- [ ] Test explosion trigger at various scroll speeds
- [ ] Test resize handling

---

## PHASE C: BINARY RAIN & WELCOME TEXT (Tasks 20-27)
**Goal:** Phase 2 with binary rain, sticky template, and text formation.

### Task 20 — Build BinaryRain Canvas Component
- [ ] Create `src/components/ui/BinaryRain.jsx` with Canvas rendering
- [ ] Generate grid-based character layout (columns × rows)
- [ ] Randomly assign "0" or "1" to each position
- [ ] Implement falling animation at 2px/frame velocity
- [ ] Loop characters: when they fall off bottom, reset to top with new character

### Task 21 — Implement Binary Rain Visual Styling
- [ ] Set character font to Courier New, monospace
- [ ] Set character size to 16px (desktop), 12px (mobile)
- [ ] Set color to #00FF00 with 0.8 opacity
- [ ] Add subtle green glow (text-shadow: 0 0 4px rgba(0,255,0,0.5))
- [ ] Set horizontal spacing to 20px gap between columns
- [ ] Set vertical spacing to 20px gap between rows

### Task 22 — Implement "HARRY JEES" Sticky Template
- [ ] Define text path using Canvas measureText
- [ ] Get pixel data from rendered text to create collision map
- [ ] Detect falling binary characters overlapping template
- [ ] On collision: stop character descent, fix position, increase opacity
- [ ] Track fill progress (how many template cells are filled)
- [ ] Add visual feedback (glow) when character lands

### Task 23 — Implement Particle-to-Text Formation
- [ ] Select 40-60 particles from Hero phase explosion
- [ ] Calculate target text positions for "WELCOME TO MY PORTFOLIO"
- [ ] Animate particles from current position to target over 1200ms
- [ ] Use easeOutBack easing for bouncy settle
- [ ] Once all particles arrive, render completed text

### Task 24 — Implement Welcome Text Styling
- [ ] Set font to Courier New Bold
- [ ] Set size to 48px (desktop), 32px (tablet), 24px (mobile)
- [ ] Set color to #FFFFFF at 100% opacity
- [ ] Add glow effect (text-shadow: 0 0 20px rgba(255,255,255,0.5))
- [ ] Center vertically and horizontally
- [ ] Add parallax tilt effect (up to 5° X, 8° Y rotation)

### Task 25 — Implement Welcome Text Fade Out
- [ ] Trigger on scroll past Phase 2
- [ ] Fade opacity 100% → 0% over 1000ms
- [ ] Scale transform 1.0 → 0.95 during fade
- [ ] Coordinate with Phase 3 ring portal transition

### Task 26 — Implement Phase 2 Transition Logic
- [ ] Detect scroll entering Phase 2 area (~100vh)
- [ ] Gradually fade in binary rain background
- [ ] Start sticky template formation
- [ ] On template full, trigger text formation animation
- [ ] On text complete, idle until user scrolls further

### Task 27 — Test Binary Rain & Welcome
- [ ] Verify binary rain falls smoothly at consistent speed
- [ ] Verify "HARRY JEES" fills with sticky characters
- [ ] Verify text formation animation plays correctly
- [ ] Test on mobile (reduced particle/text sizes)
- [ ] Verify fade-out triggers on scroll

---

## PHASE D: RING PORTAL NAVIGATION (Tasks 28-39)
**Goal:** Phase 3 — interactive ASCII ring with 5 sections.

### Task 28 — Build ASCIICircle Canvas Component
- [ ] Create `src/components/ui/ASCIICircle.jsx`
- [ ] Calculate circumference based on radius (responsive: 320-800px)
- [ ] Distribute ~500 ASCII characters evenly around circle
- [ ] Render characters with rotation tangent to circle
- [ ] Set character size to 12px (desktop), 10px (mobile)
- [ ] Set character opacity to 0.4 (subtle background)
- [ ] Character set: `!@#$%^&*()_+-=[]{}|;:',.<>?/~` + letters/numbers

### Task 29 — Implement Ring Glow Effect
- [ ] Add outer border: 2px solid rgba(0, 255, 255, 0.3)
- [ ] Add box-shadow glow: 0 0 20px rgba(0, 255, 255, 0.2)
- [ ] Add inset shadow: 0 0 20px rgba(0, 255, 255, 0.1)
- [ ] Apply blur(1px) filter for softness

### Task 30 — Implement 5 Interactive Ring Points
- [ ] Create `src/components/ui/RingPoint.jsx`
- [ ] Position 5 points at 0°, 72°, 144°, 216°, 288° (85% of ring radius)
- [ ] Point size: 16px diameter (interactive area)
- [ ] Point color: #00FFFF with 8px blur glow
- [ ] Label each point: About Me, Skills, Projects, Experience, Contact
- [ ] Add hover state: size 20px, intensified glow
- [ ] Add active state: size 24px, bright white, animated pulse

### Task 31 — Implement Ring Rotation Logic
- [ ] Calculate rotation angle when a point is selected
- [ ] Normalize to shortest rotation path (< 180°)
- [ ] Animate rotation over 800ms with easeOutBack easing
- [ ] Intensify ring glow during rotation
- [ ] Disable interaction during rotation animation

### Task 32 — Implement Click-Based Section Navigation
- [ ] Add onClick handler to each RingPoint
- [ ] Set activeSection in Zustand store
- [ ] Trigger ring rotation to bring selected point to top (0°)
- [ ] Update section content display

### Task 33 — Implement Scroll-Based Section Navigation
- [ ] Track scroll progress within Phase 3 (500vh area)
- [ ] Map scroll progress to section index (0-4)
- [ ] Trigger ring rotation on section change
- [ ] Debounce section changes to prevent rapid cycling
- [ ] Add smooth scroll snap within phase boundaries

### Task 34 — Create Section Content Data
- [ ] Create `src/data/sections.js` with content for all 5 sections:
  - **About Me**: Bio, background, personal story
  - **Skills**: Technical skills, proficiency levels, categories
  - **Projects**: Key projects with descriptions and links
  - **Experience**: Work history, roles, achievements
  - **Contact**: Contact form or information

### Task 35 — Build SectionContent Component
- [ ] Create `src/components/ui/SectionContent.jsx`
- [ ] Display section title (Courier New Bold, 42px, #FFFFFF)
- [ ] Display section description (system sans-serif, 16px, 87% white)
- [ ] Add fade-in animation on new section (600ms, easeOutCubic)
- [ ] Add fade-out animation on section exit (400ms)
- [ ] Implement responsive sizing (max-width 600px desktop, 90% tablet)
- [ ] Center content vertically and horizontally

### Task 36 — Implement Content Parallax Depth
- [ ] Calculate parallax offset based on scroll position within phase
- [ ] Apply 1.5x parallax factor (foreground moves faster than background)
- [ ] Use CSS transform translateZ + translateY for depth effect
- [ ] Update in real-time during scroll

### Task 37 — Implement Dust Dissolution Animation
- [ ] On section exit, break text into dust particles
- [ ] Generate 1 particle per 2 characters of text
- [ ] Random initial velocity (2-4 px/ms, ±180° cone)
- [ ] Apply horizontal wind force (varies by scroll direction)
- [ ] Fade opacity to 0 over 800ms with drag deceleration
- [ ] Particle size: 1-3px, color: #FFFFFF

### Task 38 — Implement Phase Transition (End of Ring Portal)
- [ ] Detect scroll past Phase 3 area
- [ ] Fade out ring portal (opacity to 0 over 800ms)
- [ ] Prepare Phase 4 elements behind
- [ ] Update activePhase in store

### Task 39 — Test Ring Portal & Navigation
- [ ] Verify ASCII ring renders with correct character distribution
- [ ] Test all 5 interactive points with click navigation
- [ ] Test scroll-based section switching
- [ ] Verify content displays with proper animation
- [ ] Test dust dissolution on section change
- [ ] Verify ring rotation easing and glow behavior
- [ ] Test on mobile (responsive ring sizing)

---

## PHASE E: PARALLAX TIMELINE (Tasks 40-49)
**Goal:** Phase 4 with wiggly SVG thread, dots, and info cards.

### Task 40 — Build WigglyThread SVG Component
- [ ] Create `src/components/ui/WigglyThread.jsx`
- [ ] Generate SVG path with Perlin noise offset
- [ ] Create vertical line with segments every 20px
- [ ] Apply noise-based wiggle (±6px from center)
- [ ] Set line color: #FFFFFF, opacity: 0.6, stroke-width: 2px
- [ ] Set container: absolute, left 50%, full height

### Task 41 — Build TimelineDot Component
- [ ] Create `src/components/ui/TimelineDot.jsx`
- [ ] Position dots spaced 60px apart vertically (15-20 dots)
- [ ] Inactive state: 12px circle, #FFFFFF, opacity 0.8
- [ ] Active state: 18px circle, #00FFFF, glow effect
- [ ] Add smooth transition between states (400ms, easeOutBack)
- [ ] Add glow box-shadow on active: 0 0 12px rgba(0,255,255,0.6)

### Task 42 — Implement Active Dot Detection
- [ ] Calculate which section/viewport area is currently visible
- [ ] Map scroll position to dot index
- [ ] Update active dot with highlight animation
- [ ] Ensure smooth transitions between dots
- [ ] Handle edge cases (start/end of timeline)

### Task 43 — Implement Timeline Parallax Offset
- [ ] Apply 0.3x scroll speed ratio to timeline container
- [ ] Calculate parallaxOffset = scrollPosition × 0.3
- [ ] Apply as translateY transform
- [ ] Ensure timeline always visible within phase viewport

### Task 44 — Implement Timeline Tilt Animation
- [ ] Calculate tilt based on scroll position within section
- [ ] Max tilt angle: 15° (varies by section progress)
- [ ] Apply rotateY with perspective(1000px)
- [ ] Animate over 600ms on section change
- [ ] Use easeOutCubic easing

### Task 45 — Build InfoCard Component
- [ ] Create `src/components/ui/InfoCard.jsx`
- [ ] Card width: 320px (desktop), 280px (tablet), 100% (mobile)
- [ ] Background: rgba(0,0,0,0.8) with backdrop-filter blur(10px)
- [ ] Border: 1px solid rgba(255,255,255,0.1)
- [ ] Border-radius: 8px, padding: 24px
- [ ] Position: right side of timeline (desktop), below (mobile)

### Task 46 — Implement InfoCard Animation
- [ ] Appear animation: 600ms, opacity 0→1, translateX(20px)→0
- [ ] Disappear animation: 400ms, opacity 1→0, translateX(0)→(-20px)
- [ ] Easing: easeOutCubic for both
- [ ] Trigger on active dot change
- [ ] Content inside: title (18px bold white), description (14px gray)

### Task 47 — Create Timeline Section Content
- [ ] Define 15-20 timeline entries with:
  - Milestone/event title
  - Date/year
  - Short description
  - Category/icon indicator
- [ ] Import and use in Timeline component

### Task 48 — Implement Mobile Timeline Layout
- [ ] Stack timeline elements vertically on mobile
- [ ] Info cards below timeline dots (not beside)
- [ ] Simplified parallax (reduced or disabled)
- [ ] Larger touch targets for mobile interaction

### Task 49 — Test Timeline Component
- [ ] Verify wiggly thread renders with Perlin noise
- [ ] Test dot active/inactive transitions
- [ ] Verify parallax offset moves correctly
- [ ] Test tilt animation on section change
- [ ] Verify info cards appear/disappear smoothly
- [ ] Test on mobile layout

---

## PHASE F: ZIPPER REVEAL FINALE (Tasks 50-57)
**Goal:** Phase 5 with character wave, zipper, and "THANK YOU" finale.

### Task 50 — Build CharacterWave Canvas Component
- [ ] Create `src/components/ui/CharacterWave.jsx`
- [ ] Generate ASCII character grid: 40×30 (desktop)
- [ ] Character set: ASCII printable (32-126), randomly assigned
- [ ] Set font: Courier New, 20px (desktop)
- [ ] Set color: #FFFFFF, opacity 0.8
- [ ] Grid spacing: 16px (x), 24px (y)

### Task 51 — Implement Wave Animation
- [ ] Apply sine-based vertical oscillation to each character
- [ ] Wave amplitude: 8px
- [ ] Frequency: 2Hz
- [ ] Phase offset increases left-to-right for wave effect
- [ ] Update in requestAnimationFrame loop

### Task 52 — Build ZipperBlade Component
- [ ] Create `src/components/ui/ZipperBlade.jsx`
- [ ] Horizontal line: full viewport width, 4px height
- [ ] Color: #00FFFF with glow (box-shadow 0 0 20px cyan)
- [ ] Gradient edges: fade from transparent to solid cyan
- [ ] Position: absolute, horizontal center, z-index 5

### Task 53 — Implement Zipper Upward Motion
- [ ] Trigger when user scrolls to Phase 5
- [ ] Start position: bottom of viewport (y = 100vh)
- [ ] End position: top (y = -4px)
- [ ] Duration: 2000ms with easeOutExpo easing
- [ ] Initial velocity: 50px/ms → decelerating to ~5px/ms

### Task 54 — Implement Character Tear-Away Effect
- [ ] Characters above zipper blade: fade out (opacity → 0)
- [ ] Characters below zipper blade: remain visible
- [ ] Transition zone: 20px soft fade edge at blade position
- [ ] Smooth interpolation within transition zone

### Task 55 — Implement "THANK YOU" Finale Message
- [ ] Create `src/components/ui/ThankYou.jsx`
- [ ] Text: "THANK YOU"
- [ ] Font: Courier New Bold, 64px (desktop)
- [ ] Color: #FFFFFF
- [ ] Position: centered on screen
- [ ] Animation: fade in 500ms after zipper completes
- [ ] Duration: 1200ms, opacity 0→1, scale 0.95→1.0
- [ ] Glow effect: text-shadow 0 0 30px rgba(255,255,255,0.6)

### Task 56 — Implement Phase 4 → Phase 5 Transition
- [ ] Detect scroll entering Phase 5
- [ ] Fade out timeline elements
- [ ] Fade in character wave background
- [ ] Trigger zipper animation
- [ ] On zipper complete, show "THANK YOU"

### Task 57 — Test Zipper Reveal
- [ ] Verify character wave animates smoothly
- [ ] Test zipper blade upward motion with easing
- [ ] Verify character tear-away effect at blade position
- [ ] Test "THANK YOU" appears after correct delay
- [ ] Verify smooth Phase 4 → Phase 5 transition

---

## PHASE G: POLISH, PERFORMANCE & ACCESSIBILITY (Tasks 58-68)
**Goal:** Optimize, audit, and polish the entire application.

### Task 58 — Performance Profiling
- [ ] Profile each phase with Chrome DevTools Performance tab
- [ ] Verify 60 FPS sustained during all animations
- [ ] Identify and fix any layout thrashing
- [ ] Check for excessive re-renders (React DevTools profiler)
- [ ] Optimize any jank or frame drops

### Task 59 — Implement Code Splitting
- [ ] Use React.lazy() + Suspense for each phase component
- [ ] Add loading fallbacks for each lazy-loaded component
- [ ] Configure Vite manual chunks for optimal splitting
- [ ] Verify chunk sizes on production build

### Task 60 — Optimize Bundle Size
- [ ] Run `npm run build` and analyze bundle with vite-bundle-analyzer
- [ ] Tree-shake unused Framer Motion imports
- [ ] Minimize Canvas-related dependencies
- [ ] Target: < 200KB gzipped total

### Task 61 — Implement Accessibility: Reduced Motion
- [ ] Add `prefers-reduced-motion` media query detection
- [ ] Disable all particle animations when reduced motion is preferred
- [ ] Replace scroll transitions with instant content switches
- [ ] Simplify or remove parallax effects
- [ ] Test with OS-level reduced motion setting enabled

### Task 62 — Implement Accessibility: Keyboard Navigation
- [ ] Make all ring points keyboard-focusable (tabIndex)
- [ ] Add keyboard handlers (Enter/Space to activate points)
- [ ] Implement focus trapping within active section
- [ ] Add skip-to-content link at top of page
- [ ] Test full tab-navigation flow

### Task 63 — Implement Accessibility: ARIA & Screen Readers
- [ ] Add ARIA labels to ring portal navigation
- [ ] Add role="progressbar" to timeline with current/valuenow
- [ ] Add aria-live regions for dynamic content changes
- [ ] Add descriptive labels to all interactive elements
- [ ] Test with screen reader (VoiceOver/NVDA)

### Task 64 — Implement Accessibility: Focus Management
- [ ] Add visible focus indicators (3px #0099FF outline)
- [ ] Ensure focus order follows logical navigation
- [ ] Manage focus when sections change
- [ ] Add aria-hidden to decorative elements

### Task 65 — Implement Accessibility: Color Contrast
- [ ] Verify all text meets 4.5:1 contrast ratio
- [ ] Adjust binary rain green from #00FF00 to #00DD00
- [ ] Test with high contrast mode enabled
- [ ] Ensure focus indicators have sufficient contrast

### Task 66 — Cross-Browser Testing
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Fix any browser-specific rendering issues
- [ ] Test Canvas API compatibility across browsers

### Task 67 — Mobile Optimization & Testing
- [ ] Test on real mobile devices (iOS and Android)
- [ ] Verify touch interactions (tap ring points, scroll timeline)
- [ ] Check performance on low-end mobile devices
- [ ] Ensure proper viewport meta tag
- [ ] Test orientation change handling
- [ ] Verify responsive breakpoints

### Task 68 — Code Cleanup & Documentation
- [ ] Remove all console.log statements
- [ ] Add JSDoc comments to key functions
- [ ] Remove unused imports and variables
- [ ] Format code consistently
- [ ] Add README.md with setup instructions

---

## PHASE H: DEPLOYMENT (Tasks 69-73)
**Goal:** Deploy to Vercel with full configuration.

### Task 69 — Configure Vercel
- [ ] Create `vercel.json` with build/output settings
- [ ] Add caching headers for static assets
- [ ] Configure SPA fallback (rewrites to index.html)
- [ ] Add environment variable template (`.env.example`)

### Task 70 — Set Up Environment Variables
- [ ] Create `.env.local` with development variables
- [ ] Create `.env.production` template
- [ ] Document required environment variables

### Task 71 — Production Build & Preview
- [ ] Run `npm run build` successfully
- [ ] Test production build locally (`npx serve dist`)
- [ ] Verify all assets load correctly
- [ ] Test all phases in production mode

### Task 72 — Deploy to Vercel
- [ ] Push to GitHub repository
- [ ] Connect repository to Vercel
- [ ] Configure build settings in Vercel dashboard
- [ ] Deploy to production
- [ ] Verify live site works
- [ ] Set up custom domain (if applicable)

### Task 73 — Post-Deployment Monitoring
- [ ] Enable Vercel Analytics
- [ ] Verify Core Web Vitals in Vercel dashboard
- [ ] Monitor for any errors
- [ ] Set up performance budgets in CI

---

## PROGRESS TRACKING

| Phase | Tasks | Completed | % Done |
|-------|-------|-----------|--------|
| A: Foundation | 1-8 | 0 | 0% |
| B: Particle Engine & Hero | 9-19 | 0 | 0% |
| C: Binary Rain & Welcome | 20-27 | 0 | 0% |
| D: Ring Portal | 28-39 | 0 | 0% |
| E: Parallax Timeline | 40-49 | 0 | 0% |
| F: Zipper Reveal | 50-57 | 0 | 0% |
| G: Polish & A11y | 58-68 | 0 | 0% |
| H: Deployment | 69-73 | 0 | 0% |
| **Total** | **1-73** | **0** | **0%** |

---

**TODO List Version:** 1.0  
**Status:** Ready for Execution  
**Next Step:** Begin Phase A — Foundation Setup (Task 1: Initialize Vite + React project)
