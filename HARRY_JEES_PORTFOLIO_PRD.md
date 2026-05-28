# HARRY JEES PORTFOLIO
## Product Requirements Document (PRD)
## Design Document & Implementation Plan

**Version:** 1.0 | **Date:** May 2026

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Product Requirements Document (PRD)](#product-requirements-document-prd)
3. [Design Document](#design-document)
4. [Technical Architecture & Tech Stack](#technical-architecture--tech-stack)
5. [Implementation Plan & Timeline](#implementation-plan--timeline)
6. [Deployment Strategy](#deployment-strategy)
7. [Performance & Accessibility](#performance--accessibility)
8. [Appendix: Code Structure](#appendix-code-structure)

---

## EXECUTIVE SUMMARY

### Project Overview

This document outlines the complete technical specification, design architecture, and implementation roadmap for Harry Jees' portfolio website—a cutting-edge, visually immersive digital experience featuring advanced particle effects, scroll-triggered animations, and narrative-driven transitions.

The portfolio showcases **5 distinct sections** through an innovative interaction model: particles exploding from a central planet, welcome text formation from binary rain, navigable ring portals with ASCII art, a parallax timeline, and a dramatic zipper-reveal finale. The website is designed to be deployed on **Vercel** with optimal performance for modern browsers.

### Key Features

- ✨ Particle-based cosmic hero section with scroll-triggered explosions
- 🌧️ Dynamic binary rain forming text
- 🎯 Interactive ASCII ring portal navigation
- 📍 Parallax timeline with dust dissolution effect
- ⚡ Character wave animation with zipper reveal finale
- 📱 Fully responsive design
- ⚙️ Performance-optimized (60 FPS target)
- ♿ WCAG 2.1 AA accessibility compliant

---

## PRODUCT REQUIREMENTS DOCUMENT (PRD)

### 2.1 Product Vision

Create an unforgettable, narrative-driven portfolio experience that seamlessly blends technical sophistication with artistic expression, where every interaction tells a story of innovation and creativity.

### 2.2 User Stories & Acceptance Criteria

#### **User Story 1: Visitor Arrives at Portfolio**
**As a** visitor, **I want to** be immediately captivated by a stunning visual experience upon landing, **so that** I'm intrigued to explore further.

**Acceptance Criteria:**
- Hero section loads with black background and animated wavy gradient
- Particle planet (stardust cluster) appears centered on screen
- No scrolling required for initial view
- Particles smoothly animate with subtle floating motion

---

#### **User Story 2: Scroll-Triggered Explosion**
**As a** visitor, **I want** the particle planet to respond dynamically to my scrolling, **so that** my input feels physically connected to the interface.

**Acceptance Criteria:**
- Particle explosion velocity correlates directly with scroll speed
- Particles travel smoothly toward viewport edges
- Fade-out effect creates depth illusion
- Explosion can be triggered multiple times during scroll

---

#### **User Story 3: Welcome Message Formation**
**As a** visitor, **I want** particles to form readable text, **so that** I understand the purpose of the website.

**Acceptance Criteria:**
- Selected particles coalesce into "WELCOME TO MY PORTFOLIO" text
- Text formation is smooth and purposeful (not jarring)
- Text maintains particle aesthetic while being legible

---

#### **User Story 4: Navigation Through 5 Sections**
**As a** visitor, **I want** an intuitive way to explore different portfolio sections, **so that** I can learn about Harry's work and background.

**Acceptance Criteria:**
- Ring portal displays 5 interactive points (About Me, Section A-D)
- Clicking/scrolling to a point rotates the ring and brings that section into focus
- Text/description appears smoothly with parallax depth
- Each section can be independently accessed

---

#### **User Story 5: View Section Content**
**As a** visitor, **I want** to read detailed information about each portfolio section, **so that** I understand the work being showcased.

**Acceptance Criteria:**
- Section text displays with proper formatting and readability
- Content is accompanied by descriptive text
- Parallax effect enhances depth perception
- Text remains visible for adequate reading time

---

#### **User Story 6: Experience Dissolution Effect**
**As a** visitor, **I want** section content to dramatically disappear, **so that** the experience feels dynamic and engaging.

**Acceptance Criteria:**
- After reading, text disintegrates into fine dust particles
- Particles blow away based on scroll direction
- Effect creates smooth visual transition to next section
- No jarring cuts or instant disappearances

---

#### **User Story 7: Navigate Timeline**
**As a** visitor, **I want** a visual timeline of Harry's journey, **so that** I can understand the chronological progression of his work.

**Acceptance Criteria:**
- Dotted vertical line (wiggly thread) appears as timeline
- Dots remain permanent throughout section scrolling
- Timeline tilts and adjusts with parallax effects
- Active section indicator moves along timeline

---

#### **User Story 8: Witness Finale Reveal**
**As a** visitor, **I want** a climactic conclusion to the experience, **so that** I leave with a memorable impression.

**Acceptance Criteria:**
- After final section, screen fills with animated characters/symbols
- Vertical zipper blade moves upward, tearing away character layer
- Reveals clean black background underneath
- "THANK YOU" message fades in at top
- Smooth easing on zipper motion

---

## DESIGN DOCUMENT

### 3.1 Visual Identity

| Element | Specification |
|---------|--------------|
| Primary Background | Pure Black (#000000) |
| Particle Color | White (#FFFFFF) with variable opacity |
| Accent Color (Binary) | Bright Green (#00FF00) |
| Text Color | White (#FFFFFF) |
| Secondary Accent | Cyan (#00FFFF) for ring glow |
| Font Family | Monospace (Courier New, Monaco) |
| Font Size (Body) | 14-16px with 1.6x line height |
| Motion Duration | 300-800ms for most animations |

### 3.2 Phase Breakdown & Visual Specifications

#### **Phase 1: The Cosmic Opening**

- **Background:** Solid black with animated wavy gradient overlay (white, subtle movement)
- **Particle Count:** 200-400 particles forming central cluster
- **Wiggle Animation:** Perlin noise-based floating (amplitude: 2-4px, frequency: 0.3Hz)
- **Explosion Trigger:** Scroll velocity > 0.5px/ms
- **Easing:** Ease-out cubic for expansion velocity

#### **Phase 2: Welcome Text & Binary Rain**

- **Text Formation:** 40-60 particles fly to predefined positions spelling "WELCOME TO MY PORTFOLIO"
- **Formation Duration:** 1200ms
- **Binary Rain:** Falling 0s and 1s at 2px/frame velocity
- **Sticky Template:** "HARRY JEES" held in invisible collision zone
- **Glow Effect:** Text emits soft white glow (blur radius: 8px)

#### **Phase 3: Ring Portal**

- **Ring Radius:** Dynamic, responsive (60-80% of viewport)
- **Character Composition:** ~500 random ASCII characters creating dense texture
- **Ring Glow:** Cyan outline (opacity 0.3, blur 4px)
- **Interactive Points:** 5 positions at 0°, 72°, 144°, 216°, 288°
- **Rotation Easing:** Ease-out cubic (duration: 800ms per rotation)
- **Text Parallax:** Foreground particles move faster than background (ratio: 1.5x)

#### **Phase 4: Parallax Timeline**

- **Thread Type:** Vertical wiggly line (SVG path with Perlin noise)
- **Dot Spacing:** 40-60px apart, total 15-20 dots
- **Parallax Offset:** Timeline moves at 0.3x scroll speed
- **Tilt Angle:** Up to 15° based on scroll position
- **Active Dot:** Highlighted (larger, glowing effect)

#### **Phase 5: Zipper Reveal**

- **Character Wave:** Fills entire viewport with moving, waving ASCII/symbols
- **Wave Amplitude:** 8-12px vertical oscillation
- **Zipper Blade:** Sharp vertical line traveling upward
- **Tear Animation:** High initial velocity (20px/ms), deceleration easing
- **Thank You:** Appears 500ms after zipper completes, centered, large font (48-64px)

---

## TECHNICAL ARCHITECTURE & TECH STACK

### 4.1 Technology Stack Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Node.js 18+ | Backend/build tools |
| Frontend Framework | React 18+ | Component-based UI |
| Animation Engine | Framer Motion 10+ | Scroll & gesture animations |
| Graphics/Particles | Canvas API + Three.js | Particle effects, 3D transforms |
| Scroll Detection | React Scroll Listener | Scroll velocity & position tracking |
| Styling | TailwindCSS + CSS Modules | Responsive design, custom animations |
| Build Tool | Vite 4+ | Fast development, optimized builds |
| Package Manager | npm or pnpm | Dependency management |
| Hosting | Vercel | Serverless deployment, edge optimization |
| Version Control | Git + GitHub | Source control |
| Analytics | Vercel Analytics | Performance monitoring |

### 4.2 Core Libraries & Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.0.0",
    "three": "^r148",
    "tailwindcss": "^3.3.0",
    "@react-three/fiber": "^8.13.0",
    "gsap": "^3.12.0",
    "use-scroll-position": "^1.1.0",
    "classnames": "^2.3.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "vite": "^4.3.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

### 4.3 Project Structure

```
harry-jees-portfolio/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Hero.jsx                 # Phase 1 - Cosmic Opening
│   │   ├── Welcome.jsx              # Phase 2 - Binary Rain & Text
│   │   ├── RingPortal.jsx           # Phase 3 - ASCII Ring
│   │   ├── Timeline.jsx             # Phase 4 - Parallax Timeline
│   │   ├── Zipper.jsx               # Phase 5 - Zipper Reveal
│   │   ├── ParticleSystem.jsx       # Shared particle engine
│   │   └── Section.jsx              # Section content component
│   ├── hooks/
│   │   ├── useScrollVelocity.js     # Scroll speed tracking
│   │   ├── useParallax.js           # Parallax offset calculations
│   │   └── useWindowSize.js         # Responsive dimensions
│   ├── utils/
│   │   ├── particles.js             # Particle creation/physics
│   │   ├── noise.js                 # Perlin noise implementation
│   │   ├── animations.js            # Easing functions
│   │   └── constants.js             # Configuration values
│   ├── styles/
│   │   ├── globals.css              # Global styles
│   │   ├── animations.css           # Keyframe animations
│   │   └── responsive.css           # Media queries
│   ├── App.jsx                      # Main app component
│   └── index.jsx                    # Entry point
├── .env.example                     # Environment template
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # TailwindCSS config
├── vercel.json                      # Vercel deployment config
├── package.json                     # Dependencies & scripts
└── README.md                        # Documentation
```

### 4.4 Key Technical Decisions

#### **Why React?**
- Component reusability (particle system, animations shared across phases)
- State management for scroll position, animation progress, section tracking
- Integration with Framer Motion for scroll-triggered animations
- Large ecosystem of animation libraries
- Excellent performance optimization tools

#### **Why Canvas API + Three.js?**
- **Canvas API:** Lightweight 2D particle rendering, low memory footprint
- **Three.js:** Optional for advanced 3D transforms, scene management
- **Performance:** Offscreen canvas reduces main-thread load
- **Fallback:** Pure Canvas as primary, Three.js for enhanced effects

#### **Why Framer Motion?**
- Scroll-triggered animations with native scroll listener support
- GPU acceleration using transform/opacity for smooth 60 FPS
- Pre-built cubic easing variants matching design specs
- Seamless React component animation
- Minimal learning curve for developers

#### **Why Vite?**
- Fast HMR (Hot Module Replacement) for rapid development
- Optimized builds with tree-shaking and code splitting
- Native Vercel integration with zero-config deployment
- Smaller build output vs webpack
- Modern JavaScript module support

#### **Why Vercel?**
- Serverless architecture, automatic scaling
- Edge optimization for global distribution
- Native analytics and performance monitoring
- Git integration with automatic deployments
- Free tier includes generous bandwidth
- Easy custom domain setup

---

## IMPLEMENTATION PLAN & TIMELINE

### 5.1 Development Phases

#### **Phase A: Foundation Setup (3 days)**
- Initialize Vite + React project
- Install & configure Framer Motion, Three.js, TailwindCSS
- Set up project structure & git repository
- Create custom hooks (useScrollVelocity, useParallax, useWindowSize)
- Implement utility functions (particles, noise, animations)
- Set up global styles & responsive breakpoints

#### **Phase B: Hero & Welcome (4 days)**
- Build ParticleSystem component (creation, physics, rendering)
- Implement Hero phase with particle planet & wavy gradient
- Build scroll velocity detection & explosion logic
- Implement Welcome component with text formation from particles
- Add binary rain effect & "HARRY JEES" sticky text
- Test animations on desktop & mobile

#### **Phase C: Ring Portal (4 days)**
- Build RingPortal component with ASCII character generation
- Implement 5 interactive points (About Me, Section A-D)
- Build rotation logic with scroll/click triggers
- Implement parallax depth effect for text
- Add dust dissolution animation on section exit
- Build section content display with fade in/out
- Test rotation easing & parallax responsiveness

#### **Phase D: Timeline (2 days)**
- Build Timeline component with wiggly thread (SVG + Perlin noise)
- Implement dot positioning & parallax offset
- Build section info boxes that pop up/fade
- Add tilt effect based on scroll position
- Test timeline responsiveness across devices

#### **Phase E: Zipper Reveal (2 days)**
- Build Zipper component with animated character wave
- Implement upward-moving zipper blade with velocity easing
- Add character tear-away animation
- Implement "THANK YOU" fade-in finale
- Test finale timing & visual impact

#### **Phase F: Polish & Optimization (4 days)**
- Performance profiling (60 FPS target, load time < 3s)
- Responsive design testing (mobile, tablet, desktop)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Accessibility audit (keyboard navigation, screen readers)
- Add prefers-reduced-motion support
- SEO optimization (meta tags, Open Graph)
- Code cleanup & documentation

#### **Phase G: Deployment & Launch (3 days)**
- Configure Vercel deployment & environment variables
- Set up custom domain (if applicable)
- Enable analytics & error tracking
- Final QA on production build
- Launch & monitor for issues

### 5.2 Timeline Overview

| Phase | Task | Duration | Dependencies |
|-------|------|----------|--------------|
| A | Foundation Setup | 3 days | None |
| B | Hero & Welcome | 4 days | A |
| C | Ring Portal | 4 days | B |
| D | Timeline | 2 days | C |
| E | Zipper Reveal | 2 days | D |
| F | Polish & Optimization | 4 days | E |
| G | Deployment & Launch | 3 days | F |

**Total Estimated Duration:** 5 weeks (full-time development)

### 5.3 Critical Path & Risk Mitigation

**Critical Path:** A → B → C → D → E → F → G

#### **Key Risks & Mitigation Strategies**

| Risk | Mitigation |
|------|-----------|
| Low FPS on mobile | Use Canvas API with requestAnimationFrame, implement frame skipping, reduce particle count on mobile |
| Large JS bundle | Use dynamic imports, lazy loading for animation libraries, optimize build with Vite |
| Complex scroll calculations | Test extensively on various scroll speeds, implement debouncing, profile with DevTools |
| Browser compatibility | Use Web APIs polyfills, test on 2+ browsers per phase, provide fallbacks |
| Animation jank on older devices | Reduce animation complexity, offer "lite" mode, use will-change CSS property |
| Performance regression | Set up performance budgets in build pipeline, monitor with Lighthouse CI |

---

## DEPLOYMENT STRATEGY

### 6.1 Vercel Deployment Setup

#### **Prerequisites**
- GitHub account with project repository
- Vercel account (free tier sufficient)
- Node.js 18+ installed locally

#### **Deployment Steps**

1. **Push repository to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```

2. **Log in to Vercel.com → Import Project**

3. **Select GitHub repository**

4. **Configure build settings:**
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Node Version: 18.x

5. **Add environment variables:**
   ```
   VITE_API_BASE_URL=https://api.example.com
   VITE_ANALYTICS_ID=your-analytics-id
   VITE_ENVIRONMENT=production
   ```

6. **Deploy → Vercel generates public URL**

### 6.2 Environment Configuration

**Create `.env.local` file in project root:**

```env
VITE_API_BASE_URL=https://api.harryj.dev
VITE_ANALYTICS_ID=your-analytics-id
VITE_ENVIRONMENT=production
VITE_DEBUG=false
```

### 6.3 Performance Optimization on Vercel

- Enable Vercel Edge Functions for global distribution
- Configure caching headers in `vercel.json`
- Enable Image Optimization (if hosting images)
- Use Vercel Analytics to monitor Core Web Vitals
- Enable automatic code splitting in Vite build

#### **vercel.json Configuration**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/:path((?!_next/static|_next/image|favicon.ico).*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## PERFORMANCE & ACCESSIBILITY

### 7.1 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint (FCP) | < 1.5s | Vercel Analytics / Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Web Vitals |
| Frame Rate (Animation) | 60 FPS sustained | DevTools Performance tab |
| Initial Bundle Size | < 200KB gzipped | Vite build stats |
| Time to Interactive (TTI) | < 3.5s | Lighthouse |
| Mobile Performance | Lighthouse > 85 | PageSpeed Insights |

### 7.2 Optimization Strategies

#### **Code Splitting**
- Lazy-load Framer Motion & Three.js only when needed
- Use React.lazy() for component-level splitting
- Separate animation configs from main bundle

#### **Asset Optimization**
- Use CSS custom properties instead of inline styles
- Compress SVG files (ASCII art, timeline)
- Minify JavaScript & CSS
- Use WebP images with fallbacks

#### **Rendering Optimization**
- Use requestAnimationFrame for scroll-based animations
- Implement will-change CSS for animated elements
- Use transform/opacity for animations (GPU accelerated)
- Limit particle count on mobile (100 vs 300 on desktop)
- Debounce scroll listeners (max 30Hz update rate)

### 7.3 Accessibility Considerations

- **Keyboard Navigation:** Ensure all interactive elements are keyboard accessible
- **Screen Reader Support:** Add ARIA labels for complex components
- **Color Contrast:** Ensure 4.5:1 ratio for all text
- **prefers-reduced-motion:** Disable heavy animations for users with vestibular disorders
- **Focus Indicators:** Clear :focus styles on all interactive elements
- **Semantic HTML:** Use proper heading hierarchy (h1, h2, h3)
- **Skip Links:** Add skip-to-content link for keyboard users

#### **Accessibility Implementation**

```jsx
// Example: prefers-reduced-motion support
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const animationProps = prefersReducedMotion ? {
  duration: 0,  // Instant transitions
  animate: { opacity: 1 }
} : {
  duration: 0.8,
  animate: { opacity: 1 }
};
```

---

## APPENDIX: CODE STRUCTURE

### 8.1 Core Component Responsibilities

| Component | Responsibility | Key Props |
|-----------|-----------------|-----------|
| Hero.jsx | Render particle planet, wavy gradient, explosion logic | `{onExplode, scrollVelocity}` |
| Welcome.jsx | Binary rain, text formation, sticky "HARRY JEES" | `{particles, scrollProgress}` |
| RingPortal.jsx | ASCII ring, 5 interactive points, rotation | `{activeSection, onSectionChange}` |
| Timeline.jsx | Wiggly thread, dots, parallax, tilt | `{scrollPosition, activeDot}` |
| Zipper.jsx | Character wave, zipper blade, finale | `{scrollProgress, isVisible}` |
| ParticleSystem.jsx | Particle creation, physics, rendering | `{count, colors, behavior}` |

### 8.2 Custom Hooks

#### **useScrollVelocity()**
Tracks scroll speed and direction.

```javascript
const { velocity, direction, position } = useScrollVelocity();
// Returns: { velocity: number, direction: 'up' | 'down', position: number }
```

#### **useParallax(depth)**
Calculates parallax offset based on scroll position.

```javascript
const { offset, transform } = useParallax(1.5);
// Returns: { offset: number, transform: string }
```

#### **useWindowSize()**
Returns responsive window dimensions.

```javascript
const { width, height, isMobile } = useWindowSize();
// Returns: { width: number, height: number, isMobile: boolean }
```

### 8.3 Utility Functions

#### **particles.js**
```javascript
createParticle(x, y, vx, vy, size, opacity)    // Create single particle
updateParticles(particles, deltaTime)           // Update physics
renderParticles(ctx, particles)                 // Render to canvas
```

#### **noise.js**
```javascript
perlinNoise(x, y)                              // Perlin noise implementation
waveGenerator(time, frequency, amplitude)      // Sine wave with offset
```

#### **animations.js**
```javascript
easeOutCubic(t)                                // 1 - (1-t)³
easeInOutQuad(t)                               // Smooth acceleration/deceleration
easeOutExpo(t)                                 // Fast exit
```

#### **constants.js**
```javascript
PARTICLE_COUNT = 300                           // Desktop: 300, Mobile: 100
ANIMATION_DURATION = 600                       // ms
COLORS = {
  primary: '#FFFFFF',
  accent: '#00FF00',
  secondary: '#00FFFF'
}
SCROLL_VELOCITY_THRESHOLD = 0.5               // px/ms
```

### 8.4 Example Component Structure

```jsx
// Hero.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from './ParticleSystem';
import { useScrollVelocity } from '../hooks/useScrollVelocity';

export default function Hero() {
  const canvasRef = useRef(null);
  const { velocity } = useScrollVelocity();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Initialize particle system
    // Handle scroll-based explosion
    // Render loop
  }, [velocity]);

  return (
    <section className="relative w-full h-screen bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"
      />
    </section>
  );
}
```

---

## GETTING STARTED

### 1. Initialize Project
```bash
npm create vite@latest harry-jees-portfolio -- --template react
cd harry-jees-portfolio
npm install
```

### 2. Install Dependencies
```bash
npm install framer-motion three gsap tailwindcss autoprefixer
npm install -D @tailwindcss/forms
```

### 3. Configure Tailwind
```bash
npx tailwindcss init -p
```

### 4. Start Development
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

### 6. Deploy to Vercel
```bash
npm install -g vercel
vercel
```

---

## CONCLUSION

This comprehensive portfolio website represents a unique fusion of technical sophistication and artistic vision. By following this PRD, design document, and implementation plan, the project will deliver a world-class digital presence that captivates visitors and showcases Harry Jees' skills and creativity.

### Next Steps
1. ✅ Review and approve this document
2. ✅ Set up GitHub repository
3. ✅ Configure development environment
4. ✅ Begin Phase A (Foundation Setup)
5. ✅ Execute 5-week sprint

---

**Document Version:** 1.0  
**Last Updated:** May 28, 2026  
**Status:** Ready for Implementation
