# Design Doc: Datacenter Template Patterns
**Date:** 2026-02-28
**Reference:** https://datacentertemplate.webflow.io/home-pages/home-v1

## Overview
Adapt five UI patterns from the Datacenter Webflow template into Nathan Lundquist's CMMC consultant site. Site is Next.js 15, Tailwind CSS v4, Framer Motion, blue palette (#E7ECEF / #274C77 / #6096BA / #A3CEF1 / #8B8C89).

---

## 1. Scrolling Marquee (replaces TrustStrip)

**Component:** `src/components/MarqueeStrip.tsx`
**Replaces:** `src/components/TrustStrip.tsx`

- Two rows scrolling in opposite directions (left and right)
- Items: CMMC-AB · NIST SP 800-171 · DoD DFARS · CUI Registry · C3PAO Ready · CMMC Level 2 · Zero Trust · DFARS 252.204-7012
- Each item is a rounded pill tag (navy bg `#274C77`, white text) with a dot separator between items
- Rows duplicated (items × 2) so loop is seamless
- CSS keyframe animation `translateX(0) → translateX(-50%)` on row 1, reversed on row 2
- `overflow-hidden` container, no JS required
- `prefers-reduced-motion` pauses animation

---

## 2. Stat Counters (new dark banner section)

**Component:** `src/components/StatsSection.tsx`
**Placement:** Between MarqueeStrip and AboutSnapshot on homepage

- Dark navy background `#1A2F4A`, full-width
- Four stats in a horizontal row:
  - **5+** Years Experience
  - **50+** Clients Served
  - **110** NIST Practices
  - **3** Assessment Levels
- Each stat: large number counts up from 0 to target on scroll entry
- Count-up via Framer Motion `useInView` + `useMotionValue` + `useTransform` (or simple `useState` + `useEffect` interval)
- Suffix (`+`) rendered separately, not animated
- Label text in muted light blue `#A3CEF1`
- Number text in white, large bold font
- Thin vertical dividers between stats

---

## 3. Hero "Free Checklist" Widget (replaces video lightbox)

**Component:** inline in `src/components/HeroSection.tsx`
**Placement:** Bottom-left of hero, below the CTA buttons

- Small horizontal card (grey/white bg with subtle border)
- Layout: [Download icon] | "Download the CMMC L2 Readiness Checklist →"
- Links to `/resources`
- Matches visual weight of datacenter's video widget
- Styled as `inline-flex` pill card, `rounded-xl`, bg `rgba(255,255,255,0.85)`, border `#D4DCE2`

---

## 4. Animated Progress Bars

**Placement:** Inside `src/components/AboutSnapshot.tsx`, below the credential pills
**Trigger:** Animate on scroll entry via Framer Motion `useInView`

Four domain expertise bars:
| Domain | Target % |
|--------|----------|
| CMMC Level 2 Readiness | 95% |
| NIST 800-171 Compliance | 98% |
| CUI Handling & Identification | 90% |
| DoD DFARS Requirements | 85% |

- Bar track: `#D4DCE2` bg, `rounded-full`, height 6px
- Bar fill: `#274C77` → animates width from `0%` to target `%` over 1s with staggered delay
- Label row: domain name left, percentage right
- Stagger delay: 0.1s per bar

---

## 5. Hero Headline (bolder/larger)

**File:** `src/components/HeroSection.tsx`

- Increase `clamp` range: `clamp(2.5rem, 5vw, 4.5rem)` (up from `clamp(2rem, 4vw, 3.75rem)`)
- `font-black` already applied — keep
- Goal: match datacenter's oversized stacked-line headline energy

---

## Homepage Section Order (after changes)

1. HeroSection (with checklist widget)
2. MarqueeStrip (new, replaces TrustStrip)
3. StatsSection (new dark banner)
4. AboutSnapshot (with progress bars)
5. ServicesSnapshot
6. BlogPreview
7. ResourcesPreview
8. TestimonialsSection
9. NewsletterSection
