# Design: Luke's Template Aesthetic Redesign

**Date:** 2026-02-27
**Author:** Nathan Lundquist
**Status:** Approved

## Overview

Rebuild the nathan-site visual layer to match the aesthetic of Luke's Webflow template — numbered service cards, abstract gradient blobs, bolder typography hierarchy, generous whitespace, and portfolio-style layout — while preserving the dark/orange color scheme and frosted glass card effect.

This is a visual-layer rebuild only. No routes, content, or data layer changes. All 7 components and the homepage assembly are rewritten.

---

## Section 1: Typography & Spacing

### Typography Scale
- Hero headline: `clamp(3rem, 8vw, 6rem)`, font-weight 900, letter-spacing -0.03em, line-height 1.0
- Section headings: `clamp(2rem, 5vw, 3.5rem)`, font-weight 900
- Eyebrow labels: `// SERVICES`, `// ABOUT`, etc. — monospace font, 0.75rem, uppercase, color `#FF6B00`, letter-spacing 0.15em
- Body text: 1.125rem, line-height 1.75, color `#888888`

### Spacing
- Section padding: `py-32` (8rem top/bottom) — doubled from current `py-20`
- Max content width: `max-w-6xl` (72rem) — same as current
- Grid gaps: `gap-16` for major sections, `gap-8` for card grids

### SVG Blobs
- 2–3 blobs per page, `rgba(255, 107, 0, 0.06–0.08)` fill, `filter: blur(80–120px)`
- Positioned absolutely, `pointer-events: none`, `z-index: 0`
- All content sits at `z-index: 1` or higher

---

## Section 2: Component Layouts

### Hero
- Left-aligned layout (no centering)
- Eyebrow label `// CMMC CONSULTANT` above headline
- One floating SVG blob (top-right, orange, 8% opacity, blur 120px)
- CTA buttons left-aligned below a short tagline
- No grid background animation (replaced by blob)

### Service Cards
- Grid of 3 cards
- Large muted number `01 / 02 / 03` as background text (font-size ~6rem, opacity 0.07) behind card title
- Top orange accent bar (4px, full width) on each card
- Bold title + one-sentence description + `→ Learn more` link
- Frosted glass background with subtle white border (unchanged from current)

### About Snapshot (homepage)
- Two-column layout: left = large bold stat block (`12+` years, `CMMC RP` cert), right = short bio + link
- `py-32` spacing, no cramped layout

### Blog / Resource Cards
- Full-width card spanning grid column
- Left-side colored tag (`// BLOG` or `// RESOURCE`)
- Bold title, excerpt, right-aligned date or category
- Hover: `translateY(-4px)` + orange border glow

### Navigation
- Existing nav preserved, hover underline grows from left (`scaleX: 0 → 1`, `transform-origin: left`)
- Hamburger menu on mobile (`md:` breakpoint), simple slide-down

### Footer
- Two-column: name + tagline on left, nav links on right
- No mega-footer

---

## Section 3: Animations, Interactions & Responsive

### Entrance Animations (Framer Motion)
- Each section: `y: 40 → 0, opacity: 0 → 1` on `whileInView`, `viewport: { once: true }`
- Service card numbers: staggered fade-in, `0.1s` delay per card

### Hero Blob
- CSS keyframe drift: `translateX ±20px, translateY ±15px`, 12s loop

### Interactions
- Cards: `translateY(-4px)` on hover + orange border glow
- Buttons: `scale(1.05)` hover, `scale(0.95)` active (unchanged)
- Nav links: underline scaleX animation from left, `200ms ease`

### Responsive
- Mobile: single column, hero headline scales via `clamp()`, service card numbers go inline at `text-4xl`
- Blobs hidden on mobile (`hidden md:block`) for performance
- Nav hamburger at `md:` breakpoint

---

## Files to Rewrite

| File | Change |
|---|---|
| `src/app/globals.css` | Add eyebrow label styles, blob utility class, nav hover animation |
| `src/components/HeroSection.tsx` | New left-aligned layout with blob, remove grid animation |
| `src/components/ServicesSnapshot.tsx` | Numbered cards with accent bar |
| `src/components/AboutSnapshot.tsx` | Two-column stat + bio layout |
| `src/components/BlogPreview.tsx` | Tag + full-width card layout |
| `src/components/ResourcesPreview.tsx` | Tag + full-width card layout |
| `src/components/Navbar.tsx` | Add underline hover animation |
| `src/components/Footer.tsx` | Two-column simple footer |
| `src/app/page.tsx` | Reassemble with new section spacing |

---

## Non-Goals
- No route changes
- No content changes
- No new pages
- No data layer changes
- No Framer Motion upgrades (already installed)
