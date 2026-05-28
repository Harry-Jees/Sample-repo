# HARRY JEES PORTFOLIO - COMPREHENSIVE DESIGN DOCUMENT

**Status:** Final Design Specification  
**Version:** 1.0  
**Last Updated:** May 28, 2026

---

## TABLE OF CONTENTS

1. [Design System Foundation](#1-design-system-foundation)
2. [Layout & Responsive Design](#2-layout--responsive-design)
3. [Typography System](#3-typography-system)
4. [Color Palette & Visual Hierarchy](#4-color-palette--visual-hierarchy)
5. [Phase 1: Cosmic Opening Design](#5-phase-1-cosmic-opening-design)
6. [Phase 2: Welcome & Binary Rain Design](#6-phase-2-welcome--binary-rain-design)
7. [Phase 3: Ring Portal Design](#7-phase-3-ring-portal-design)
8. [Phase 4: Parallax Timeline Design](#8-phase-4-parallax-timeline-design)
9. [Phase 5: Zipper Reveal Design](#9-phase-5-zipper-reveal-design)
10. [Micro-Interactions & States](#10-micro-interactions--states)
11. [Animation Specifications](#11-animation-specifications)
12. [Visual Effects & Filters](#12-visual-effects--filters)
13. [Component Library](#13-component-library)
14. [Responsive Breakpoints](#14-responsive-breakpoints)
15. [Accessibility Design](#15-accessibility-design)

---

## 1. DESIGN SYSTEM FOUNDATION

### 1.1 Design Principles

1. **Minimalist with Maximum Impact** - Clean black background, focused white elements
2. **Motion-Driven Storytelling** - Every animation tells part of the narrative
3. **Performance First** - Smooth 60 FPS animations on all devices
4. **Accessible by Default** - WCAG 2.1 AA compliant from the start
5. **Responsive by Nature** - Seamless experience on mobile to desktop

### 1.2 Grid System

**Base Grid Unit:** 8px (8px spacing scale)

```css
/* All spacing follows 8px increments */
spacing: 8px, 16px, 24px, 32px, 40px, 48px, 56px, 64px, 72px, 80px, 88px, 96px
```

**Margin/Padding Scale:**
- **xs:** 8px
- **sm:** 16px
- **md:** 24px
- **lg:** 32px
- **xl:** 48px
- **2xl:** 64px
- **3xl:** 96px

### 1.3 Viewport Dimensions

| Device | Width | Height | Aspect Ratio |
|--------|-------|--------|--------------|
| Mobile (Small) | 320px | 568px | 9:16 |
| Mobile (Standard) | 375px | 667px | 9:16 |
| Mobile (Large) | 414px | 896px | 9:16 |
| Tablet | 768px | 1024px | 3:4 |
| Laptop | 1366px | 768px | 16:9 |
| Desktop | 1920px | 1080px | 16:9 |
| 4K | 2560px | 1440px | 16:9 |

---

## 2. LAYOUT & RESPONSIVE DESIGN

### 2.1 Page Structure

```
┌─────────────────────────────────────────┐
│         PHASE 1: HERO SECTION           │  (100vh)
│     (Particle Planet + Wavy Gradient)    │
├─────────────────────────────────────────┤
│      PHASE 2: WELCOME + BINARY RAIN     │  (100vh)
│  (Text Formation + "HARRY JEES" Sticky)  │
├─────────────────────────────────────────┤
│      PHASE 3: RING PORTAL NAVIGATION    │  (500vh)
│  (5 Interactive Sections with Content)   │
├─────────────────────────────────────────┤
│    PHASE 4: PARALLAX TIMELINE SECTIONS  │  (300vh)
│   (Sections D, E, F with Wiggly Thread)  │
├─────────────────────────────────────────┤
│      PHASE 5: ZIPPER REVEAL FINALE      │  (100vh)
│    (Character Wave + Thank You Message)  │
└─────────────────────────────────────────┘
```

**Total Page Height:** ~1000vh (approximately 10-12 seconds of scrolling at normal speed)

### 2.2 Safe Areas & Padding

**Desktop (1366px+):**
- Horizontal Padding: 64px (left & right)
- Vertical Padding: 48px (top & bottom)
- Content Max-Width: 1200px (centered)

**Tablet (768px - 1365px):**
- Horizontal Padding: 40px (left & right)
- Vertical Padding: 32px (top & bottom)
- Content Max-Width: 688px (centered)

**Mobile (320px - 767px):**
- Horizontal Padding: 16px (left & right)
- Vertical Padding: 24px (top & bottom)
- Content Max-Width: 100%

### 2.3 Overflow & Clipping

```css
/* Root Container */
html, body {
  width: 100%;
  overflow-x: hidden;      /* Prevent horizontal scroll */
  overflow-y: auto;        /* Allow vertical scroll */
  background-color: #000000;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

/* Sections - Clip content to viewport bounds */
section {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  will-change: transform;
}
```

---

## 3. TYPOGRAPHY SYSTEM

### 3.1 Font Family Hierarchy

**Primary Font (Headings & Display):**
- Font Family: `'Courier New', Courier, monospace`
- Fallback: System monospace fonts
- Reason: Creates technical, sophisticated aesthetic

**Secondary Font (Body Text):**
- Font Family: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`
- Fallback: System sans-serif
- Reason: Excellent readability for long-form content

### 3.2 Type Scale

**Desktop (1366px+):**

| Type | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| H1 | Courier New | 64px | 700 | 1.2 | -1px |
| H2 | Courier New | 48px | 700 | 1.3 | -0.5px |
| H3 | Courier New | 36px | 700 | 1.4 | 0px |
| Body Large | Sans-serif | 18px | 400 | 1.6 | 0.3px |
| Body | Sans-serif | 16px | 400 | 1.6 | 0.2px |
| Body Small | Sans-serif | 14px | 400 | 1.5 | 0.1px |
| Caption | Sans-serif | 12px | 400 | 1.5 | 0px |
| Code | Courier New | 13px | 400 | 1.5 | 0.5px |

**Tablet (768px - 1365px):**
- All sizes: -20% reduction
- H1: 51px | H2: 38px | H3: 29px | Body: 16px

**Mobile (320px - 767px):**
- All sizes: -35% reduction
- H1: 42px | H2: 31px | H3: 24px | Body: 14px

### 3.3 Text Rendering

```css
/* Optimal text rendering */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Prevent text selection where needed */
.no-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
```

### 3.4 Line Length & Readability

**Optimal Line Length:** 60-75 characters
**Max Width for Body Text:** 600px
**Min Width for Body Text:** 300px

---

## 4. COLOR PALETTE & VISUAL HIERARCHY

### 4.1 Core Color Palette

**Background:**
```css
--color-bg-primary: #000000;    /* Pure black */
--color-bg-dark: #0A0A0A;       /* Nearly black for subtle depth */
--color-bg-light: #1A1A1A;      /* Dark gray for secondary areas */
```

**Foreground:**
```css
--color-text-primary: #FFFFFF;      /* Pure white */
--color-text-secondary: #E0E0E0;    /* Off-white (88% opacity white) */
--color-text-tertiary: #B0B0B0;     /* Gray (69% opacity white) */
--color-text-muted: #808080;        /* Muted gray (50% opacity white) */
```

**Accents:**
```css
--color-accent-green: #00FF00;      /* Bright neon green (binary rain) */
--color-accent-cyan: #00FFFF;       /* Bright cyan (ring glow) */
--color-accent-blue: #0099FF;       /* Sky blue (secondary accent) */
--color-accent-purple: #AA00FF;     /* Purple (tertiary accent) */
```

**Transparency:**
```css
--opacity-100: 1.0;      /* Fully opaque */
--opacity-87: 0.87;      /* High contrast text */
--opacity-60: 0.6;       /* Secondary text */
--opacity-38: 0.38;      /* Tertiary text */
--opacity-12: 0.12;      /* Disabled/subtle */
```

### 4.2 Color Specifications by Element

| Element | Color | Opacity | Use Case |
|---------|-------|---------|----------|
| Particle (Inactive) | #FFFFFF | 1.0 | Main particle color |
| Particle (Fading) | #FFFFFF | 0.6 - 0.1 | Particles exiting view |
| Binary Rain (0/1) | #00FF00 | 1.0 | Green digital aesthetic |
| Ring Outline | #00FFFF | 0.3 | Glowing ring border |
| Ring Glow | #00FFFF | 0.15 | Soft diffuse glow |
| Text (Primary) | #FFFFFF | 1.0 | Main content text |
| Text (Secondary) | #FFFFFF | 0.6 | Secondary information |
| Focus Indicator | #0099FF | 1.0 | Keyboard focus outline |
| Loading Bar | #00FF00 | 1.0 | Progress indication |

### 4.3 Visual Hierarchy Levels

**Level 1 (Hero Focus):**
- Color: #FFFFFF at 100% opacity
- Size: 64px (H1)
- Example: "WELCOME TO MY PORTFOLIO" text

**Level 2 (Primary Content):**
- Color: #FFFFFF at 87% opacity
- Size: 48px (H2) or 18px body large
- Example: Section titles, prominent descriptions

**Level 3 (Secondary Content):**
- Color: #FFFFFF at 60% opacity
- Size: 36px (H3) or 16px body
- Example: Body text, descriptions

**Level 4 (Tertiary/Support):**
- Color: #FFFFFF at 38% opacity
- Size: 14px body small
- Example: Captions, metadata, timestamps

**Level 5 (Disabled/Inactive):**
- Color: #FFFFFF at 12% opacity
- Size: Variable
- Example: Disabled buttons, placeholder text

---

## 5. PHASE 1: COSMIC OPENING DESIGN

### 5.1 Container Specifications

**Hero Section Container:**
```css
.hero-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 5.2 Wavy Gradient Background

**Gradient Specifications:**
- Direction: Top to bottom
- Start Color: rgba(255, 255, 255, 0)
- Mid Color: rgba(255, 255, 255, 0.03)
- End Color: rgba(255, 255, 255, 0)
- Animation: Continuous subtle wave

**CSS Implementation:**
```css
.wavy-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, 
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.03) 50%,
    rgba(255, 255, 255, 0) 100%);
  animation: waveGradient 8s ease-in-out infinite;
  z-index: 1;
}

@keyframes waveGradient {
  0%, 100% { transform: translateY(-20px); }
  50% { transform: translateY(20px); }
}
```

### 5.3 Particle Planet Specifications

**Container:**
- Position: Absolute, centered on screen
- Size: 200px diameter (desktop), 120px (mobile)
- Z-index: 2

**Individual Particles:**
- Shape: Circle
- Size: 2-4px diameter
- Color: #FFFFFF
- Opacity: 0.8 - 1.0
- Count: 300 particles (desktop), 100 (mobile)

**Particle Distribution:**
```javascript
// Spatial distribution - clustered around center
// Using Gaussian distribution for natural clustering
const angle = Math.random() * Math.PI * 2;
const radius = Math.random() * Math.random() * 100; // Biased toward center
const x = centerX + Math.cos(angle) * radius;
const y = centerY + Math.sin(angle) * radius;

// Initial velocity (minimal)
const vx = (Math.random() - 0.5) * 0.2;
const vy = (Math.random() - 0.5) * 0.2;
```

**Particle Wiggle Animation:**
- Type: Perlin noise-based floating
- Amplitude: 2-4px
- Frequency: 0.3Hz (period: 3.3 seconds)
- Individual variation: Yes (each particle offset by unique phase)

```javascript
// Perlin noise wiggle
function wiggleParticle(particle, time) {
  const noise = perlinNoise(particle.id, time * 0.3);
  particle.wobbleX = Math.cos(noise * Math.PI * 2) * 3;
  particle.wobbleY = Math.sin(noise * Math.PI * 2) * 3;
}
```

### 5.4 Scroll-Triggered Explosion

**Trigger Condition:**
- Scroll velocity > 0.5px/millisecond
- Scroll direction: Any direction

**Particle Behavior on Explosion:**

1. **Velocity Calculation:**
   ```javascript
   const explosionForce = Math.min(scrollVelocity * 5, 20); // Cap at 20px/ms
   const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
   particle.velocityX = Math.cos(angle) * explosionForce;
   particle.velocityY = Math.sin(angle) * explosionForce;
   ```

2. **Acceleration (Deceleration):**
   - Initial velocity: Based on scroll velocity
   - Acceleration: -0.1px/ms² (friction)
   - Duration: 2000ms (2 seconds)

3. **Opacity Fade:**
   - Start: Particle's current opacity
   - End: 0 (fully transparent)
   - Duration: 2000ms
   - Easing: Linear

4. **Position Bounds:**
   - Particles travel until opacity = 0
   - Maximum travel distance: ~2000px from center

**Easing Curve:**
```css
/* Ease-out cubic for natural deceleration */
transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
```

### 5.5 Visual Effects

**Particle Rendering:**
```javascript
// Canvas rendering
context.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
context.beginPath();
context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
context.fill();
```

**Glow Effect (Optional):**
```css
.particle {
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
}
```

---

## 6. PHASE 2: WELCOME & BINARY RAIN DESIGN

### 6.1 Binary Rain Specifications

**Container:**
- Full viewport dimensions (100vw x 100vh)
- Z-index: 3
- Overflow: Hidden

**Individual Characters:**
- Characters: "0" and "1" (50% each)
- Font: Courier New, monospace
- Size: 16px (desktop), 12px (mobile)
- Color: #00FF00 (bright neon green)
- Opacity: 0.8
- Spacing: 20px (horizontal gap between characters)

**Rain Behavior:**
```javascript
// Character generation and positioning
const charWidth = 16 * 0.6; // Approximate monospace width
const charHeight = 16;

// Grid-based layout
const columns = Math.floor(viewportWidth / (charWidth + 20));
const rows = Math.floor(viewportHeight / (charHeight + 20));

// Each character falls at consistent vertical speed
const fallSpeed = 2; // px per frame @ 60fps = 120px/s
```

**Animation Duration:** Continuous, looping

### 6.2 Sticky Text Template - "HARRY JEES"

**Concept:** Invisible collision zone that "catches" falling binary rain characters

**Technical Implementation:**

1. **Invisible Template Path:**
   ```javascript
   // Define text path using Canvas Text Metrics
   const templateText = "HARRY JEES";
   const fontSize = 64;
   const fontFamily = "Courier New";
   
   // Calculate bounding box and character positions
   const textMetrics = context.measureText(templateText);
   const textWidth = textMetrics.width;
   const textHeight = fontSize;
   
   // Center on screen
   const startX = (viewportWidth - textWidth) / 2;
   const startY = viewportHeight / 2.5;
   ```

2. **Collision Detection:**
   ```javascript
   // Check if falling character overlaps with template path
   function isInTemplate(charX, charY) {
     // Create invisible pixel map from template text
     const imageData = context.getImageData(
       charX - 8, charY - 8, 16, 16
     );
     
     // If pixel exists in template, return true
     for (let i = 3; i < imageData.data.length; i += 4) {
       if (imageData.data[i] > 128) return true;
     }
     return false;
   }
   ```

3. **Sticky Behavior:**
   - Characters that hit template: Stop falling, remain visible
   - Characters that miss: Continue falling and fade out
   - Duration to fill template: ~3-4 seconds
   - Visual feedback: Slight glow when character lands

### 6.3 Text Formation Animation

**"WELCOME TO MY PORTFOLIO" Formation:**

**Source:** 40-60 particles from Phase 1 hero section
**Destination:** Predefined text positions

**Animation Specifications:**
```javascript
// Calculate trajectory for each particle
const startPos = particle.currentPosition;
const endPos = textPositions[index]; // Predefined grid of positions

// Duration: 1200ms
const duration = 1200;
const easing = cubicBezier(0.34, 1.56, 0.64, 1); // Ease-out back
```

**Text Properties:**
- Font: Courier New Bold
- Size: 48px (desktop), 32px (tablet), 24px (mobile)
- Color: #FFFFFF at 100% opacity
- Position: Vertically centered, horizontally centered
- Glow: 8px blur radius, white shadow

**Parallax Tilt (After Formation):**
- X Rotation: Up to 5 degrees
- Y Rotation: Up to 8 degrees
- Z Depth: 3D perspective effect
- Duration: Matches scroll progress

**Fade Out:**
- Trigger: User continues scrolling past formation
- Duration: 1000ms
- Opacity: 100% → 0%
- Transform: Slight scale reduction (1.0 → 0.95)

### 6.4 Visual Specifications

```css
/* Welcome text container */
.welcome-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-family: 'Courier New', monospace;
  font-size: 48px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -1px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  z-index: 5;
}

/* Binary characters */
.binary-char {
  position: absolute;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  color: #00FF00;
  opacity: 0.8;
  text-shadow: 0 0 4px rgba(0, 255, 0, 0.5);
  font-weight: normal;
}
```

---

## 7. PHASE 3: RING PORTAL DESIGN

### 7.1 Ring Container Specifications

**Position & Dimensions:**
- Position: Absolute, centered on screen
- Shape: Perfect circle
- Diameter: 60-80% of viewport (responsive)
  - Desktop: 800px diameter
  - Tablet: 600px diameter
  - Mobile: 320px diameter
- Center Point: (viewportWidth/2, viewportHeight/2)
- Z-index: 4

**Ring Composition:**
- Made up of ASCII characters and symbols
- Characters: Random selection from: `!@#$%^&*()_+-=[]{}|;:',.<>?/~` + letters/numbers
- Total characters in ring: ~500
- Spacing: Evenly distributed around circumference
- Character size: 12px (desktop), 10px (mobile)
- Character opacity: 0.4 (subtle background element)

### 7.2 Ring Rendering Algorithm

**Character Distribution:**
```javascript
// Evenly space characters around circle circumference
const circumference = 2 * Math.PI * radius;
const charWidth = 8; // Approximate monospace char width
const charCount = Math.floor(circumference / charWidth);
const angleStep = (Math.PI * 2) / charCount;

// Position characters
for (let i = 0; i < charCount; i++) {
  const angle = i * angleStep;
  const x = centerX + Math.cos(angle) * radius;
  const y = centerY + Math.sin(angle) * radius;
  const char = getRandomCharacter();
  
  // Rotate text to follow circle
  const rotation = angle + Math.PI / 2;
  
  characters.push({
    char,
    x,
    y,
    rotation,
    opacity: 0.4,
    index: i
  });
}
```

**Glow Effect:**
```css
/* Ring glow */
.ring-glow {
  position: absolute;
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 50%;
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.2),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  filter: blur(1px);
}
```

### 7.3 Interactive Points (5 Sections)

**Position Distribution:**
```
        0° (Top)
     "About Me"
        
         ↓
90° ← Center → 270°
    [RING]
    
        ↑
       360°
```

**Exact Positions:**
- Point 1 (About Me): 0° (top)
- Point 2 (Section A): 72° (upper right)
- Point 3 (Section B): 144° (lower right)
- Point 4 (Section C): 216° (lower left)
- Point 5 (Section D): 288° (upper left)

**Interactive Point Specifications:**
- Radius from center: 85% of ring radius
- Size: 16px diameter (interactive area)
- Visual indicator: Glowing dot + label
- Color: #00FFFF (cyan)
- Glow: 8px blur radius
- Hover state: Increase size to 20px, intensify glow
- Active state: Size 24px, bright white, animated pulse

```javascript
// Calculate position for each point
function getPointPosition(pointIndex, ringRadius) {
  const angle = (pointIndex * 72) * (Math.PI / 180); // 72° = 360°/5
  const distanceFromCenter = ringRadius * 0.85;
  
  return {
    x: centerX + Math.cos(angle) * distanceFromCenter,
    y: centerY + Math.sin(angle) * distanceFromCenter,
    angle
  };
}
```

### 7.4 Ring Rotation Animation

**Trigger:** User scrolls or clicks on a point

**Rotation Logic:**
```javascript
// Rotate ring to bring target point to center-top (0°)
// Current active point is at some angle
// Calculate rotation needed

const currentAngle = activePointIndex * 72; // degrees
const targetAngle = 0; // Always bring to top
const rotationAmount = targetAngle - currentAngle;

// Normalize to shortest path
let rotation = rotationAmount;
if (rotation > 180) rotation -= 360;
if (rotation < -180) rotation += 360;
```

**Animation Specifications:**
- Duration: 800ms
- Easing: Cubic-bezier(0.34, 1.56, 0.64, 1) — ease-out back
- Z-index during rotation: Stays at 4
- Visual feedback: Ring glows brighter during rotation

```css
@keyframes rotateRing {
  from { transform: rotate(0deg); }
  to { transform: rotate(var(--rotation-amount)); }
}
```

### 7.5 Section Content Display

**Content Container:**
- Position: Centered on screen, above ring
- Width: 600px (desktop), 90% (tablet), 100% (mobile)
- Max-height: 60vh
- Background: None (transparent)
- Padding: 0
- Z-index: 5

**Content Animation (Fade In):**
- Duration: 800ms
- Easing: Cubic-bezier(0.2, 0, 0.2, 1) — ease-out
- Opacity: 0% → 100%
- Transform: translateY(20px) → translateY(0)

**Section Title:**
- Font: Courier New Bold
- Size: 42px (desktop)
- Color: #FFFFFF
- Margin-bottom: 24px
- Letter-spacing: -1px

**Section Description:**
- Font: System sans-serif
- Size: 16px
- Color: #FFFFFF at 87% opacity
- Line-height: 1.6
- Max-width: 600px
- Margin: 0 auto

**Content Parallax:**
```javascript
// Text parallax effect - foreground text moves faster than background
// Calculate offset based on scroll position within ring section

const parallaxDepth = 1.5; // Foreground moves 1.5x faster
const scrollOffset = scrollProgress * viewportHeight;
const parallaxOffset = scrollOffset * parallaxDepth;

// Apply to text transform
text.style.transform = `translateZ(50px) translateY(${parallaxOffset}px)`;
```

### 7.6 Dust Dissolution Animation

**Trigger:** User scrolls past section content

**Animation Sequence:**

1. **Disintegration Phase (600ms):**
   - Text breaks apart into dust particles
   - Particles spawn at text position
   - Initial velocity: Random direction (±180° cone)
   - Initial speed: 2-4 px/ms
   - Count: 1 particle per 2 characters

   ```javascript
   // Generate dust particles
   for (let i = 0; i < textLength / 2; i++) {
     const angle = Math.random() * Math.PI * 2;
     const speed = Math.random() * 2 + 2; // 2-4 px/ms
     
     dust.push({
       x: textX + Math.random() * textWidth,
       y: textY,
       vx: Math.cos(angle) * speed,
       vy: Math.sin(angle) * speed,
       opacity: 1.0,
       size: Math.random() * 1.5 + 0.5
     });
   }
   ```

2. **Fade & Wind Phase (800ms):**
   - Particles accelerate horizontally (wind effect)
   - Opacity: 100% → 0%
   - Deceleration: -0.05px/ms² (drag)
   - Wind force: Varies by scroll direction

3. **Particle Properties:**
   - Size: 1-3px
   - Color: #FFFFFF (inherits from text color)
   - Shape: Circles

---

## 8. PHASE 4: PARALLAX TIMELINE DESIGN

### 8.1 Timeline Thread (Wiggly Line)

**Container:**
- Position: Absolute, vertical center
- Width: 8px (line thickness)
- Height: 100% (full viewport height)
- Left position: 50% (centered horizontally)
- Z-index: 3

**Line Specifications:**
- Type: SVG path with Perlin noise offset
- Base shape: Vertical line
- Wiggle amplitude: 4-8px from center
- Wiggle frequency: 0.2Hz (varies with scroll position)
- Color: #FFFFFF
- Opacity: 0.6
- Stroke-width: 2px

**SVG Generation:**
```javascript
function generateWigglyLine(height, width = 8) {
  let path = `M ${width/2} 0`;
  const segments = Math.floor(height / 20); // 20px per segment
  
  for (let i = 0; i < segments; i++) {
    const y = i * 20;
    const noise = perlinNoise(0, i * 0.3) * 6; // ±6px wiggle
    const x = width/2 + noise;
    
    path += ` L ${x} ${y}`;
  }
  
  return path;
}
```

**CSS Styling:**
```css
.timeline-thread {
  position: absolute;
  left: 50%;
  top: 0;
  width: 8px;
  height: 100%;
  transform: translateX(-50%);
  
  svg {
    stroke: #FFFFFF;
    stroke-width: 2;
    opacity: 0.6;
    fill: none;
  }
}
```

### 8.2 Timeline Dots

**Dot Specifications:**
- Shape: Circle
- Size: 12px diameter (inactive), 18px (active)
- Color: #FFFFFF (inactive), #00FFFF (active)
- Opacity: 0.8 (inactive), 1.0 (active)
- Position: Spaced 60px apart vertically
- Total count: 15-20 dots (depends on content)

**Dot Positioning:**
```javascript
// Evenly space dots along timeline
const dotSpacing = 60; // pixels
const dotRadius = 6; // pixels

for (let i = 0; i < totalSections; i++) {
  const y = i * dotSpacing;
  const x = timelineX; // Centered on thread
  
  dots.push({
    x,
    y,
    radius: dotRadius,
    isActive: false,
    opacity: 0.8
  });
}
```

**Active Dot Behavior:**
- Highlights section currently in view
- Increases size smoothly (12px → 18px)
- Changes color to cyan (#00FFFF)
- Emits subtle glow effect
- Duration of size transition: 400ms

```css
.timeline-dot {
  position: absolute;
  border-radius: 50%;
  background-color: #FFFFFF;
  opacity: 0.8;
  transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  
  &.active {
    background-color: #00FFFF;
    width: 18px;
    height: 18px;
    opacity: 1;
    box-shadow: 
      0 0 12px rgba(0, 255, 255, 0.6),
      0 0 24px rgba(0, 255, 255, 0.3);
  }
}
```

### 8.3 Timeline Parallax Effect

**Parallax Offset:**
- Scroll speed ratio: 0.3x (timeline moves at 30% of scroll speed)
- Creates depth illusion: Timeline appears to move slower than content

```javascript
// Calculate parallax offset
const scrolledDistance = scrollPosition;
const parallaxOffset = scrolledDistance * 0.3;

// Apply transform
timeline.style.transform = `translateY(${parallaxOffset}px)`;
```

### 8.4 Timeline Tilt Animation

**Trigger:** Active section changes
**Duration:** 600ms
**Max Tilt Angle:** 15° (varies by scroll position)

**Tilt Calculation:**
```javascript
// Calculate tilt based on scroll position within section
const sectionProgress = (scrollPosition % sectionHeight) / sectionHeight;
const tiltAngle = (sectionProgress - 0.5) * 30; // -15° to +15°

// Apply rotation (only on Y-axis for perspective effect)
timeline.style.transform = `
  translateY(${parallaxOffset}px) 
  perspective(1000px) 
  rotateY(${tiltAngle * 0.3}deg)
`;
```

**Easing:** Cubic-bezier(0.2, 0, 0.2, 1) — ease-out

### 8.5 Section Info Boxes

**Container:**
- Position: Absolute, right side of timeline (desktop)
- Width: 320px (desktop), 280px (tablet), 100% (mobile)
- Background: rgba(0, 0, 0, 0.8)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 8px
- Padding: 24px
- Backdrop-filter: blur(10px)
- Z-index: 4

**Animation (Appear):**
- Duration: 600ms
- Easing: cubic-bezier(0.2, 0, 0.2, 1)
- Opacity: 0% → 100%
- Transform: translateX(20px) → translateX(0)

**Animation (Disappear):**
- Duration: 400ms
- Easing: cubic-bezier(0.2, 0, 0.2, 1)
- Opacity: 100% → 0%
- Transform: translateX(0) → translateX(-20px)

**Content Inside Box:**
- Title: 18px bold white
- Description: 14px gray (#B0B0B0)
- Icon/Indicator: 12px colored circle (section color)

---

## 9. PHASE 5: ZIPPER REVEAL DESIGN

### 9.1 Character Wave Background

**Concept:** Fill entire viewport with animated, waving text characters

**Character Grid:**
- Grid size: 40x30 (desktop), 30x25 (tablet), 20x15 (mobile)
- Character set: ASCII printable characters (32-126)
- Font: Courier New
- Font size: 20px (desktop), 16px (tablet), 12px (mobile)
- Color: #FFFFFF
- Opacity: 0.8
- Spacing: 16px (x), 24px (y)

**Wave Animation:**
```javascript
// Wave motion - vertical oscillation
// Each character oscillates at slightly different amplitude

for (let x = 0; x < gridWidth; x++) {
  for (let y = 0; y < gridHeight; y++) {
    const wavePhase = x * 0.15; // Phase offset by horizontal position
    const waveAmplitude = 8; // ±8px vertical movement
    const frequency = 2; // Hz
    
    const offsetY = Math.sin((time + wavePhase) * frequency) * waveAmplitude;
    const finalY = baseY + y * spacing + offsetY;
  }
}
```

**Wave Properties:**
- Amplitude: 8-12px (vertical movement)
- Frequency: 2Hz (cycle per second)
- Phase offset: Increases left to right for wave effect
- Duration: Continuous until zipper passes

### 9.2 Zipper Blade

**Container:**
- Position: Absolute, horizontal center
- Width: 100vw
- Height: 4px (thickness)
- Z-index: 5

**Visual Design:**
- Shape: Horizontal line with serrated edge (optional)
- Color: #00FFFF
- Glow: 12px blur radius, cyan color
- Opacity: 1.0 (solid)

**Blade Rendering:**
```css
.zipper-blade {
  position: absolute;
  width: 100%;
  height: 4px;
  background: linear-gradient(
    90deg,
    rgba(0, 255, 255, 0) 0%,
    #00FFFF 25%,
    #00FFFF 75%,
    rgba(0, 255, 255, 0) 100%
  );
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.8),
    0 0 40px rgba(0, 255, 255, 0.4),
    inset 0 0 8px rgba(0, 255, 255, 0.5);
  filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.6));
}
```

### 9.3 Zipper Animation Sequence

**Phase 1: Initialization (Trigger at scroll position)**
- Zipper blade appears at bottom (y = 100vh)
- Characters begin waving
- Duration: 0ms

**Phase 2: Upward Motion (2000ms)**
- Start position: bottom (y = 100vh)
- End position: top (y = -4px)
- Velocity curve: Ease-out exponential
  - Initial velocity: 50px/ms
  - Deceleration: -0.03px/ms²
  - Final velocity: ~5px/ms

```javascript
// Zipper motion with easing
function updateZipperPosition(progress) {
  // easeOutExpo easing
  const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
  const startY = viewportHeight;
  const endY = 0;
  const currentY = startY - (startY - endY) * eased;
  
  return currentY;
}
```

**Phase 3: Reveal Effect (Simultaneous with motion)**
- Characters above zipper: Fade out and disappear
- Characters below zipper: Remain visible
- Transition zone: 20px (soft fade edge)

```javascript
// Determine if character is above, below, or at zipper
const zoneHeight = 20;
const distanceFromZipper = characterY - zipperY;

if (distanceFromZipper < -zoneHeight) {
  // Well above zipper - fully transparent
  opacity = 0;
} else if (distanceFromZipper > zoneHeight) {
  // Well below zipper - fully visible
  opacity = 1;
} else {
  // In transition zone - smooth fade
  opacity = (distanceFromZipper + zoneHeight) / (2 * zoneHeight);
}
```

### 9.4 "THANK YOU" Message

**Specifications:**
- Text: "THANK YOU"
- Font: Courier New Bold
- Size: 64px (desktop), 48px (tablet), 36px (mobile)
- Color: #FFFFFF
- Position: Vertically centered, horizontally centered
- Z-index: 6

**Animation (Fade In):**
- Trigger: Zipper reaches top (zipperY = 0)
- Delay: 500ms after zipper completion
- Duration: 1200ms
- Easing: cubic-bezier(0.2, 0, 0.2, 1) — ease-out
- Opacity: 0% → 100%
- Transform: scale(0.95) → scale(1.0)

**Visual Effects:**
- Glow: 16px blur radius white shadow
- Letter-spacing: -1px
- Text-shadow: 0 0 30px rgba(255, 255, 255, 0.6)

```css
@keyframes thankYouAppear {
  from {
    opacity: 0;
    transform: scale(0.95);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

.thank-you {
  animation: thankYouAppear 1200ms cubic-bezier(0.2, 0, 0.2, 1) both;
  animation-delay: 500ms;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
}
```

---

## 10. MICRO-INTERACTIONS & STATES

### 10.1 Hover States

**Interactive Elements (Ring Points, Buttons):**
```css
/* Scale up slightly */
.interactive:hover {
  transform: scale(1.15);
  box-shadow: 0 0 16px rgba(0, 255, 255, 0.8);
  transition: all 200ms cubic-bezier(0.2, 0, 0.2, 1);
}

/* Color shift */
background-color: from #00FFFF (base) to #00FFFF lighter (hover)
```

### 10.2 Active/Focus States

**Keyboard Focus (Accessibility):**
```css
/* Clear focus indicator for keyboard navigation */
*:focus-visible {
  outline: 3px solid #0099FF;
  outline-offset: 4px;
  border-radius: 4px;
}

/* Ring point when focused */
.ring-point:focus-visible {
  outline: 3px solid #00FFFF;
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.8),
    0 0 40px rgba(0, 255, 255, 0.4);
}
```

### 10.3 Loading States

**Page Load Indicator (if needed):**
- Position: Top center of viewport
- Height: 4px (horizontal bar)
- Color: #00FF00
- Animation: Width expanding from 0% to 100% over 2-3 seconds
- Easing: ease-out

### 10.4 Scroll Position Feedback

**Visual Feedback During Scroll:**
- Particle velocity visible through particle movement
- Ring rotation smooth and responsive
- Timeline updates with active dot highlight
- No jank, consistent 60 FPS

---

## 11. ANIMATION SPECIFICATIONS

### 11.1 Easing Functions Reference

**Standard Easing Curves Used:**

1. **Ease-Out Cubic** (for most animations)
   ```css
   cubic-bezier(0.215, 0.61, 0.355, 1)
   ```
   Use for: Particle explosions, content fade-in

2. **Ease-Out Back** (for bouncy returns)
   ```css
   cubic-bezier(0.34, 1.56, 0.64, 1)
   ```
   Use for: Ring rotations, element scaling

3. **Ease-Out Expo** (for fast exits)
   ```css
   cubic-bezier(0.19, 1, 0.22, 1)
   ```
   Use for: Text disappearing, zipper motion

4. **Ease-Out Quad** (subtle)
   ```css
   cubic-bezier(0.25, 0.46, 0.45, 0.94)
   ```
   Use for: Parallax adjustments, small transitions

5. **Linear** (for continuous motion)
   ```css
   linear
   ```
   Use for: Binary rain falling, particle wobble

### 11.2 Animation Duration Standards

| Animation | Duration | Context |
|-----------|----------|---------|
| Particle explosion | 2000ms | Scroll triggered |
| Text formation | 1200ms | Phase 2 welcome |
| Ring rotation | 800ms | Section change |
| Content fade in/out | 600ms | Section display |
| Dot highlight | 400ms | Timeline update |
| Zipper motion | 2000ms | Phase 5 finale |
| Thank you appear | 1200ms | Final message |
| Micro-interactions | 200-300ms | Hover, focus |

### 11.3 Scroll-Based Animations

**Technique:** Map scroll position to animation progress

```javascript
// Linear scroll mapping
const scrollProgress = (scrollPosition - sectionStart) / sectionHeight;
const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

// Apply to animation values
element.style.opacity = clampedProgress;
element.style.transform = `translateY(${clampedProgress * 100}px)`;
```

**Parallax Scroll Mapping:**
```javascript
// Parallax moves at different speed than scroll
const parallaxFactor = 0.3; // Slower movement
const parallaxOffset = scrollPosition * parallaxFactor;
element.style.transform = `translateY(${parallaxOffset}px)`;
```

---

## 12. VISUAL EFFECTS & FILTERS

### 12.1 Glow Effects

**Text Glow (White):**
```css
text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
```

**Element Glow (Cyan):**
```css
box-shadow: 
  0 0 20px rgba(0, 255, 255, 0.6),
  0 0 40px rgba(0, 255, 255, 0.3),
  inset 0 0 10px rgba(0, 255, 255, 0.2);
filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.5));
```

**Particle Glow (Subtle):**
```css
filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
```

### 12.2 Backdrop Filters

**Content Box Frosted Glass:**
```css
background: rgba(0, 0, 0, 0.8);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
```

**Gradient Overlays:**
```css
background: linear-gradient(
  180deg,
  rgba(0, 0, 0, 1) 0%,
  rgba(0, 0, 0, 0.7) 50%,
  rgba(0, 0, 0, 1) 100%
);
```

### 12.3 Blur Effects

**Motion Blur (on fast-moving elements):**
```css
filter: blur(1px);
/* Only apply during active animation */
```

**Focus Blur (depth effect):**
```css
filter: blur(0px); /* Focus */
filter: blur(2px); /* Background */
```

### 12.4 Opacity Transitions

**Fade In/Out:**
- Linear opacity: 0 → 1 (fade in)
- Linear opacity: 1 → 0 (fade out)
- Uses standard easing curves

**Opacity Levels (Predefined):**
```css
--opacity-full: 1;       /* 100% */
--opacity-high: 0.87;    /* 87% */
--opacity-medium: 0.6;   /* 60% */
--opacity-low: 0.38;     /* 38% */
--opacity-very-low: 0.12 /* 12% */
```

---

## 13. COMPONENT LIBRARY

### 13.1 Reusable Component Specifications

#### **Particle Component**
```
Props:
  - x: number (position)
  - y: number (position)
  - size: number (2-4px)
  - opacity: number (0-1)
  - velocity: {x, y}
  - isActive: boolean
  
Rendering:
  - Canvas drawCircle or SVG circle
  - Color: #FFFFFF
  - Glow on demand
```

#### **Timeline Dot Component**
```
Props:
  - position: {x, y}
  - isActive: boolean
  - size: number (12px or 18px)
  - onClick: function
  
Rendering:
  - SVG circle
  - Colors: #FFFFFF (inactive), #00FFFF (active)
  - Smooth transitions on state change
```

#### **Section Container Component**
```
Props:
  - title: string
  - description: string
  - isVisible: boolean
  - parallaxDepth: number
  
Features:
  - Fade in/out animation
  - Parallax offset
  - Auto-size based on content
```

#### **Ring Portal Component**
```
Props:
  - activeIndex: number (0-4)
  - onSectionChange: function
  - sectionData: array of section objects
  
Features:
  - Smooth rotation animation
  - Interactive points
  - Content display with parallax
  - Dust dissolution effect
```

---

## 14. RESPONSIVE BREAKPOINTS

### 14.1 Breakpoint Strategy

**Mobile-First Approach:**
- Base styles for mobile (320px+)
- Progressive enhancement for larger screens

### 14.2 Breakpoint Definitions

```css
/* Mobile: 320px - 767px */
@media (max-width: 767px) {
  /* Mobile-specific styles */
  /* Smaller particles: 100 count */
  /* Smaller fonts: 24px H1 */
  /* Simplified animations for performance */
}

/* Tablet: 768px - 1365px */
@media (min-width: 768px) {
  /* Tablet-specific styles */
  /* Medium particles: 200 count */
  /* Medium fonts: 42px H1 */
}

/* Desktop: 1366px+ */
@media (min-width: 1366px) {
  /* Desktop-specific styles */
  /* Full particles: 300 count */
  /* Large fonts: 64px H1 */
}

/* Large Desktop: 1920px+ */
@media (min-width: 1920px) {
  /* Extra spacing and scaling */
  /* Enhanced visual effects */
}
```

### 14.3 Adaptive Properties

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero Height | 100vh | 100vh | 100vh |
| Ring Diameter | 320px | 600px | 800px |
| Particle Count | 100 | 200 | 300 |
| H1 Font Size | 42px | 51px | 64px |
| Padding | 16px | 40px | 64px |
| Timeline Width | 50% | 60% | 80% |
| Content Max-Width | 100% | 688px | 1200px |

---

## 15. ACCESSIBILITY DESIGN

### 15.1 Color Contrast Requirements

**WCAG AA Compliance (4.5:1 minimum):**
- #FFFFFF on #000000: 21:1 ✅ (Excellent)
- #00FF00 on #000000: 3.28:1 ❌ (Fails - needs adjustment)
- #00FFFF on #000000: 10.3:1 ✅ (Excellent)

**Adjusted Colors for Binary Rain:**
- Change #00FF00 to #00DD00 (slightly darker green)
- New contrast: 5.2:1 ✅ (WCAG AA Pass)

### 15.2 prefers-reduced-motion Support

```css
/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Particle animations disabled */
  .particle-container {
    animation: none;
  }
  
  /* Scrolling transitions instant */
  section {
    scroll-behavior: auto;
  }
}
```

### 15.3 Focus Management

**Focus Order (Tab Navigation):**
1. Ring interactive points (5 points)
2. Section navigation buttons
3. Links in content
4. Any interactive elements

**Focus Styling:**
```css
:focus-visible {
  outline: 3px solid #0099FF;
  outline-offset: 4px;
  border-radius: 4px;
}

/* High contrast focus indicator */
.high-contrast-focus:focus {
  box-shadow: 0 0 0 3px #FFFFFF, 0 0 0 6px #0099FF;
}
```

### 15.4 ARIA Labels & Roles

**Key ARIA Implementations:**

```html
<!-- Ring Portal Navigation -->
<nav role="navigation" aria-label="Portfolio Sections">
  <button aria-label="About Me Section" aria-controls="about-content">
    About
  </button>
</nav>

<!-- Content Sections -->
<section id="about-content" role="region" aria-labelledby="about-title">
  <h1 id="about-title">About Me</h1>
  <!-- Content -->
</section>

<!-- Timeline -->
<div role="progressbar" aria-label="Scroll Progress" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
  <!-- Timeline dots -->
</div>

<!-- Skip Link -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

### 15.5 Screen Reader Optimization

**Content Hierarchy:**
- Proper heading structure: h1 > h2 > h3
- Semantic HTML: Use `<section>`, `<nav>`, `<main>`
- Alternative text for visual-only elements
- Descriptive button labels (not "Click Here")

**Invisible Text for Screen Readers:**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## IMPLEMENTATION CHECKLIST

### Design Handoff Checklist

- [ ] All colors validated for WCAG AA contrast
- [ ] Font sizes tested on all breakpoints
- [ ] Animation durations specified in milliseconds
- [ ] Easing curves defined with bezier values
- [ ] Responsive layouts tested
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Hover/focus states documented
- [ ] Accessibility features implemented
- [ ] Performance optimizations in place
- [ ] Visual effects cross-browser tested

### QA Verification

- [ ] All animations run at 60 FPS
- [ ] No layout shifts (CLS < 0.1)
- [ ] Load time < 3 seconds
- [ ] Bundle size < 200KB gzipped
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Mobile touch interactions smooth
- [ ] Desktop scroll responsive
- [ ] Visual consistency across browsers
- [ ] Responsive design works at all breakpoints

---

## QUICK REFERENCE: COLOR CODES

```
Primary Background:     #000000
Primary Text:           #FFFFFF
Primary Accent (Green): #00DD00 (adjusted for contrast)
Secondary Accent:       #00FFFF
Tertiary Accent:        #0099FF
Muted Text:             #808080
Border Color:           #1A1A1A
```

## QUICK REFERENCE: SPACING SCALE

```
xs  = 8px
sm  = 16px
md  = 24px
lg  = 32px
xl  = 48px
2xl = 64px
3xl = 96px
```

## QUICK REFERENCE: ANIMATION DURATIONS

```
Micro-interactions:  200-300ms
Content transitions: 600-800ms
Complex animations:  1200-2000ms
Easing default:      cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

**Design Document Version:** 1.0  
**Last Updated:** May 28, 2026  
**Status:** Ready for Development
