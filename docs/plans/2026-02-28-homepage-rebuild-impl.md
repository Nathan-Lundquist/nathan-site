# Homepage Full Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current homepage with a 9-section layout matching the datacenter template structure using Nathan's brand colors.

**Architecture:** Each section is an independent React component. New components are created fresh; existing ones are rewritten in-place. The section divider pattern (thin border + label + number) is repeated inline across all sections except Hero and Marquee. page.tsx is updated last after all components exist.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, Tailwind CSS v4, Framer Motion v12, Lucide React

---

## Design Reference

Design doc: `docs/plans/2026-02-28-homepage-rebuild-design.md`

### Color palette
| Token | Value | Usage |
|---|---|---|
| Navy | `#274C77` | CTA bg, icon accent, primary text |
| Steel | `#6096BA` | Links, tags, highlights |
| Light | `#A3CEF1` | Muted accents |
| Grey | `#8B8C89` | Body text |
| Near-black | `#0A0B0D` | Headings |
| Deep navy | `#0D1824` | Dark section bg (03, 07) |
| Blue-grey | `#EEF2F8` | Stats section bg (05) |
| White | `#FFFFFF` | Page/section bg |
| Border | `#D4DCE2` | Dividers, card borders |

### Section divider pattern (every section except 01 and 02)
```tsx
<div className="flex justify-between items-center pt-6 mb-8" style={{ borderTop: '1px solid #D4DCE2' }}>
  <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Label text</span>
  <span className="font-mono text-xs text-gray-300">02</span>
</div>
```
On dark sections (`#0D1824`), override colors inline:
```tsx
<div className="flex justify-between items-center pt-6 mb-8" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
  <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>Label</span>
  <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>03</span>
</div>
```

### CTA button styles
```tsx
// Primary (navy fill)
<Link href="/contact" className="inline-flex items-center gap-2 bg-[#274C77] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80">
  Get a Consultation <ArrowRight className="w-4 h-4" />
</Link>

// Secondary (outline)
<Link href="/contact" className="inline-flex items-center gap-2 border border-[#274C77] text-[#274C77] px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80">
  View results <ArrowRight className="w-4 h-4" />
</Link>

// Inverted (white fill, navy text — for dark sections)
<Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#274C77] px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80">
  Get a Consultation <ArrowRight className="w-4 h-4" />
</Link>
```

---

## Task 1: Update HeroSection — white bg, new headline, remove decorations

**Files:**
- Modify: `src/components/HeroSection.tsx`

**What changes:**
- Background: `#E7ECEF` → `#FFFFFF`
- Remove the entire background decoration `<div>` (dot grid + two rotating SVG rings)
- Heading: Replace current "Hey, I'm Nathan..." copy with three-stacked-line headline:
  ```tsx
  <h1 className="font-black leading-none tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#0A0B0D' }}>
    Compliance.<br />
    Precision.<br />
    Results.
  </h1>
  ```
- Subtext: Update to `"Specialized CMMC Level 2 and NIST 800-171 compliance consulting for defense contractors."`
- CTAs: Change from `<Plus>` icon to `<ArrowRight>` icon, keep same link targets
- Social proof avatars: Change `border: '2px solid #E7ECEF'` → `border: '2px solid #F3F4F6'`
- Keep everything else: available badge, checklist download widget, photo card, floating stats

**Step 1: Open the file**

Read `src/components/HeroSection.tsx` to confirm current state.

**Step 2: Make all changes in one edit**

Replace the entire file with this content:

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Download, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT: text content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Available badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #D4DCE2', color: '#6096BA' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22C55E' }} />
              Available for Consulting
            </div>

            {/* Heading */}
            <h1
              className="font-black leading-none tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#0A0B0D' }}
            >
              Compliance.<br />
              Precision.<br />
              Results.
            </h1>

            {/* Sub */}
            <p className="text-lg mb-8 max-w-md leading-relaxed" style={{ color: '#6B7280' }}>
              Specialized CMMC Level 2 and NIST 800-171 compliance consulting for defense contractors.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#274C77] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
              >
                Get a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 border border-[#274C77] text-[#274C77] px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
              >
                Free Resources <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Checklist widget */}
            <Link
              href="/resources"
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl transition-opacity hover:opacity-90 mb-10"
              style={{
                backgroundColor: 'rgba(255,255,255,0.85)',
                border: '1px solid #D4DCE2',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style={{ backgroundColor: '#DCEEFB' }}>
                <Download className="w-4 h-4" style={{ color: '#274C77' }} />
              </span>
              <span className="text-sm font-semibold" style={{ color: '#274C77' }}>
                Download the CMMC L2 Readiness Checklist
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" style={{ color: '#6096BA' }} />
            </Link>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {(['#274C77', '#6096BA', '#A3CEF1', '#8B8C89'] as const).map((color, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ backgroundColor: color, border: '2px solid #F3F4F6' }}
                  >
                    {['NL', 'D', 'S', '+'][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: '#8B8C89' }}>
                Trusted by <strong style={{ color: '#274C77' }}>50+</strong> defense contractors
              </p>
            </div>
          </motion.div>

          {/* RIGHT: photo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div
              className="relative rounded-3xl overflow-hidden w-full max-w-sm"
              style={{ aspectRatio: '3/4', backgroundColor: '#DCEEFB' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/headshot.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }}
              />
              {/* Floating stats card */}
              <div
                className="absolute bottom-4 left-4 right-4 px-4 py-3 rounded-2xl flex justify-between items-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <div className="text-center">
                  <p className="text-xs mb-0.5" style={{ color: '#8B8C89' }}>Experience</p>
                  <p className="text-xl font-black leading-none" style={{ color: '#274C77' }}>5+</p>
                </div>
                <div className="w-px h-8" style={{ backgroundColor: '#D4DCE2' }} />
                <div className="text-center">
                  <p className="text-xs mb-0.5" style={{ color: '#8B8C89' }}>Clients</p>
                  <p className="text-xl font-black leading-none" style={{ color: '#274C77' }}>50+</p>
                </div>
                <div className="w-px h-8" style={{ backgroundColor: '#D4DCE2' }} />
                <div className="text-center">
                  <p className="text-xs mb-0.5" style={{ color: '#8B8C89' }}>Via</p>
                  <p className="text-sm font-bold leading-none" style={{ color: '#6096BA' }}>PCShards</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
```

**Step 3: Verify dev server compiles**

Run: `npm run dev` (if not already running) and open http://localhost:3000 — hero should show white bg and three-line stacked headline.

**Step 4: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: rebuild hero — white bg, stacked headline, remove rings"
```

---

## Task 2: Update MarqueeStrip — add "Trusted by Defense Contractors" label

**Files:**
- Modify: `src/components/MarqueeStrip.tsx`

**What changes:**
- Add `border-t` + centered label `"Trusted by Defense Contractors"` above the two marquee rows
- Remove `border-b` from section (keep white bg, keep `overflow: 'hidden'`)

**Step 1: Replace the file**

```tsx
const items = [
  'CMMC-AB',
  'NIST SP 800-171',
  'DoD DFARS',
  'CUI Registry',
  'C3PAO Ready',
  'CMMC Level 2',
  'Zero Trust',
  'DFARS 252.204-7012',
  'POAM',
  'SSP',
]

function Row({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-2">
      <div
        className={reverse ? 'marquee-row-reverse' : 'marquee-row'}
        style={{ display: 'flex', gap: '0.75rem', width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{ backgroundColor: '#EEF2F8', color: '#274C77', border: '1px solid #D4DCE2' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <section
      className="py-8 px-0"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #D4DCE2',
        borderBottom: '1px solid #D4DCE2',
        overflow: 'hidden',
      }}
    >
      <p className="text-center text-xs uppercase tracking-widest font-medium text-gray-400 mb-6 px-6">
        Trusted by Defense Contractors
      </p>
      <Row />
      <Row reverse />
    </section>
  )
}
```

Note: pills changed from dark navy fill to light `#EEF2F8` with border to match the datacenter template's lighter aesthetic.

**Step 2: Visual check**

Refresh http://localhost:3000 — "Trusted by Defense Contractors" label should appear above the two rows.

**Step 3: Commit**

```bash
git add src/components/MarqueeStrip.tsx
git commit -m "feat: add trusted-by label to MarqueeStrip"
```

---

## Task 3: Create ServicesSection — dark bg, 2×2 card grid

**Files:**
- Create: `src/components/ServicesSection.tsx`

**Step 1: Create the file**

```tsx
import Link from 'next/link'
import { ArrowRight, Shield, FileSearch, Map, Lock, CheckCircle } from 'lucide-react'

const cards = [
  {
    icon: Shield,
    title: 'CMMC L2 Assessment Prep',
    bullets: ['Readiness gap analysis', 'Remediation roadmap', 'Pre-assessment review'],
  },
  {
    icon: FileSearch,
    title: 'NIST 800-171 Gap Analysis',
    bullets: ['All 110 practices', 'CUI environment scope', 'Prioritized findings'],
  },
  {
    icon: Map,
    title: 'Compliance Roadmap',
    bullets: ['SSP development', 'POAM creation', 'Control implementation'],
  },
  {
    icon: Lock,
    title: 'CUI Program Support',
    bullets: ['CUI identification', 'Handling procedures', 'Training & docs'],
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0D1824' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div
          className="flex justify-between items-center pt-6 mb-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Our services
          </span>
          <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>02</span>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-black leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF' }}>
            Complete compliance solutions
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            From initial gap analysis to assessment day — everything you need to achieve CMMC Level 2 certification.
          </p>
        </div>

        {/* 2×2 card grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div className="mb-5">
                  <Icon className="w-7 h-7" style={{ color: '#6096BA' }} />
                </div>
                <h3 className="font-bold text-lg mb-4" style={{ color: '#FFFFFF' }}>
                  {card.title}
                </h3>
                <ul className="space-y-2">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#6096BA' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#274C77] px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
          >
            Get a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ServicesSection.tsx
git commit -m "feat: create ServicesSection — dark 2x2 card grid"
```

---

## Task 4: Create ApproachSection — numbered tabs + content panel

**Files:**
- Create: `src/components/ApproachSection.tsx`

**Step 1: Create the file**

```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const tabs = [
  {
    number: '01',
    label: 'Gap Analysis',
    title: 'Identify every compliance gap',
    description:
      'We map your current environment against all 110 NIST SP 800-171 practices and CMMC Level 2 requirements. You get a clear, prioritized list of what needs to be addressed — no guesswork.',
    bullets: ['CUI data flow mapping', 'Control-by-control assessment', 'Risk-ranked gap list'],
  },
  {
    number: '02',
    label: 'Remediation Planning',
    title: 'Build a roadmap you can actually execute',
    description:
      'Each gap gets a concrete remediation task with owner, timeline, and effort estimate. We help you build your System Security Plan (SSP) and Plan of Action & Milestones (POAM) simultaneously.',
    bullets: ['SSP drafting assistance', 'POAM creation & tracking', 'Technical control guidance'],
  },
  {
    number: '03',
    label: 'Assessment Prep',
    title: 'Walk into your C3PAO audit confident',
    description:
      'We conduct a final pre-assessment review simulating what your C3PAO will examine. Evidence collection, interviewer prep, and last-mile remediation — so there are no surprises.',
    bullets: ['Mock assessment walkthrough', 'Evidence package review', 'Assessor interview prep'],
  },
]

export default function ApproachSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div className="flex justify-between items-center pt-6 mb-12" style={{ borderTop: '1px solid #D4DCE2' }}>
          <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Our approach</span>
          <span className="font-mono text-xs text-gray-300">03</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div>
            <h2
              className="font-black leading-tight mb-4"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#0A0B0D' }}
            >
              Built for defense contractors
            </h2>
            <p className="text-base mb-8" style={{ color: '#6B7280' }}>
              A structured, no-guesswork path from compliance gaps to assessment-ready.
            </p>
            <div className="mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#274C77] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
              >
                Get a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tab list */}
            <div className="space-y-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab.number}
                  onClick={() => setActive(i)}
                  className="w-full text-left px-4 py-4 rounded-lg transition-all"
                  style={{
                    borderLeft: active === i ? '3px solid #274C77' : '3px solid transparent',
                    backgroundColor: active === i ? '#F0F5FA' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs" style={{ color: active === i ? '#6096BA' : '#9CA3AF' }}>
                      {tab.number}
                    </span>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: active === i ? '#0A0B0D' : '#9CA3AF' }}
                    >
                      {tab.label}
                    </span>
                    {active === i && (
                      <ArrowRight className="w-4 h-4 ml-auto" style={{ color: '#274C77' }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right column: content panel */}
          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: '#F0F5FA', minHeight: 320 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-mono text-xs mb-3" style={{ color: '#6096BA' }}>
                  {tabs[active].number}
                </p>
                <h3 className="font-black text-xl mb-3" style={{ color: '#0A0B0D' }}>
                  {tabs[active].title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#6B7280' }}>
                  {tabs[active].description}
                </p>
                <ul className="space-y-2">
                  {tabs[active].bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm font-medium" style={{ color: '#274C77' }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#6096BA' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ApproachSection.tsx
git commit -m "feat: create ApproachSection — numbered tabs with animated panel"
```

---

## Task 5: Rebuild StatsSection — light bg, horizontal bar charts

**Files:**
- Modify: `src/components/StatsSection.tsx` (full rewrite)

**What changes:** Replace the dark navy counter grid with a light `#EEF2F8` layout that has section divider, left heading + right CTA, and three stats with animated horizontal bars + counter numbers.

**Step 1: Replace the file**

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const stats = [
  { value: '5+',  label: 'Years Experience',  pct: 85 },
  { value: '50+', label: 'Clients Served',    pct: 92 },
  { value: '110', label: 'NIST Practices',    pct: 100 },
]

function StatBar({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()

  return (
    <div ref={ref}>
      {/* Animated bar */}
      <div className="h-0.5 w-full mb-4 overflow-hidden rounded-full" style={{ backgroundColor: '#D4DCE2' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: '#274C77' }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: reducedMotion ? 1 : stat.pct / 100 } : { scaleX: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1.2, delay: index * 0.15, ease: 'easeOut' }}
        />
      </div>
      {/* Number + label */}
      <p className="font-black mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0A0B0D', lineHeight: 1 }}>
        {stat.value}
      </p>
      <p className="text-sm font-medium" style={{ color: '#6B7280' }}>{stat.label}</p>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEF2F8' }} aria-label="Company statistics">
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div className="flex justify-between items-center pt-6 mb-12" style={{ borderTop: '1px solid #D4DCE2' }}>
          <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Results</span>
          <span className="font-mono text-xs text-gray-300">04</span>
        </div>

        {/* Heading row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#0A0B0D' }}>
              Compliance results
            </h2>
            <p className="mt-2 text-base" style={{ color: '#6B7280' }}>
              Measurable outcomes for defense contractors we&apos;ve worked with.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#274C77] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80 shrink-0"
          >
            Get a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Three stat bars */}
        <div className="grid md:grid-cols-3 gap-10">
          {stats.map((stat, i) => (
            <StatBar key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/StatsSection.tsx
git commit -m "feat: rebuild StatsSection — light bg, horizontal bar charts"
```

---

## Task 6: Create ProcessSection — step slideshow with auto-advance

**Files:**
- Create: `src/components/ProcessSection.tsx`

**Step 1: Create the file**

```tsx
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    label: 'Step 01',
    title: 'Requirements Analysis',
    description:
      'We review your contracts, identify CUI scope, and map applicable CMMC practices to your environment before any assessment work begins.',
  },
  {
    label: 'Step 02',
    title: 'Gap Remediation',
    description:
      'We work through your prioritized gap list systematically — implementing technical controls, updating policies, and building your SSP and POAM in parallel.',
  },
  {
    label: 'Step 03',
    title: 'Assessment Ready',
    description:
      'Final pre-assessment review simulates your C3PAO audit. We verify evidence packages, walk through likely assessor questions, and confirm you are ready.',
  },
]

export default function ProcessSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div className="flex justify-between items-center pt-6 mb-12" style={{ borderTop: '1px solid #D4DCE2' }}>
          <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Our process</span>
          <span className="font-mono text-xs text-gray-300">05</span>
        </div>

        {/* Heading + CTAs */}
        <div className="text-center mb-12">
          <h2
            className="font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0A0B0D' }}
          >
            The path to CMMC compliance
          </h2>
          <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: '#6B7280' }}>
            A proven three-step process that takes you from compliance gaps to assessment-ready.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#274C77] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
            >
              Get a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-[#274C77] text-[#274C77] px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
            >
              View services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Step card */}
        <div
          className="rounded-2xl p-10 relative overflow-hidden"
          style={{ backgroundColor: '#F0F5FA', minHeight: 280 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-mono text-xs mb-3" style={{ color: '#6096BA' }}>
                {steps[active].label}
              </p>
              <h3 className="font-black text-2xl mb-4" style={{ color: '#0A0B0D' }}>
                {steps[active].title}
              </h3>
              <p className="text-base leading-relaxed max-w-xl" style={{ color: '#6B7280' }}>
                {steps[active].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex gap-2 mt-8">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: active === i ? '#274C77' : '#D4DCE2',
                  transform: active === i ? 'scale(1.25)' : 'scale(1)',
                }}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ProcessSection.tsx
git commit -m "feat: create ProcessSection — auto-advancing step slideshow"
```

---

## Task 7: Create CTASection — dark bg, contact info

**Files:**
- Create: `src/components/CTASection.tsx`

**Step 1: Create the file**

```tsx
import Link from 'next/link'
import { ArrowRight, Mail, MapPin } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0D1824' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <h2
              className="font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF' }}
            >
              Achieve CMMC compliance with confidence
            </h2>
            <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Whether you&apos;re starting your compliance journey or preparing for a C3PAO assessment,
              Nathan provides the expertise and hands-on guidance to get you there.
            </p>
            <div className="mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#274C77] px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
              >
                Get a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              <a
                href="mailto:nathan@pcshards.com"
                className="flex items-center gap-3 text-sm transition-opacity hover:opacity-80"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <Mail className="w-4 h-4 shrink-0" style={{ color: '#6096BA' }} />
                nathan@pcshards.com
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <MapPin className="w-4 h-4 shrink-0" style={{ color: '#6096BA' }} />
                Metro Detroit, MI
              </div>
            </div>
          </div>

          {/* Right column: decorative dot grid */}
          <div className="hidden md:flex items-center justify-center" aria-hidden="true">
            <div
              className="w-full max-w-xs aspect-square rounded-3xl"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(96,150,186,0.35) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            />
          </div>
        </div>

        {/* Section divider at bottom */}
        <div
          className="flex justify-between items-center mt-16 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Work with Nathan
          </span>
          <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>06</span>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/CTASection.tsx
git commit -m "feat: create CTASection — dark bg, contact info, dot grid"
```

---

## Task 8: Rebuild TestimonialsSection — bento grid layout

**Files:**
- Modify: `src/components/TestimonialsSection.tsx` (full rewrite)

**What changes:** Replace the three-column equal-card grid with a bento layout:
- Top row: large quote card (2/3 width) + stat panel (1/3 width, `#274C77` bg)
- Bottom row: two equal smaller quote cards

**Step 1: Replace the file**

```tsx
'use client'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "Nathan identified gaps we had no idea existed and gave us a clear roadmap to fix them. We passed our CMMC assessment on the first try.",
    name: "Mike D.",
    title: "CEO, Defense Manufacturer",
    initial: "M",
    large: true,
  },
  {
    quote: "Working with Nathan saved us months of guesswork. His NIST 800-171 gap analysis was thorough, practical, and exactly what we needed.",
    name: "Sarah K.",
    title: "CTO, DoD Subcontractor",
    initial: "S",
    large: false,
  },
  {
    quote: "The SSP and POAM templates alone were worth every penny. Nathan's hands-on guidance made compliance feel achievable.",
    name: "James R.",
    title: "IT Director, Aerospace Firm",
    initial: "J",
    large: false,
  },
]

function QuoteCard({
  quote, name, title, initial, delay = 0
}: {
  quote: string; name: string; title: string; initial: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col rounded-2xl p-7"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #D4DCE2', height: '100%' }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white shrink-0"
          style={{ backgroundColor: '#274C77' }}
        >
          {initial}
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: '#0A0B0D' }}>{name}</p>
          <p className="text-xs" style={{ color: '#8B8C89' }}>{title}</p>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full ml-auto shrink-0" style={{ backgroundColor: '#EEF2F8', color: '#6096BA' }}>
          Customer story
        </span>
      </div>
      <blockquote className="text-sm leading-relaxed flex-1" style={{ color: '#374151' }}>
        &ldquo;{quote}&rdquo;
      </blockquote>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div className="flex justify-between items-center pt-6 mb-12" style={{ borderTop: '1px solid #D4DCE2' }}>
          <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Testimonials</span>
          <span className="font-mono text-xs text-gray-300">07</span>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0A0B0D' }}>
            What clients say
          </h2>
          <p className="mt-3 text-base" style={{ color: '#6B7280' }}>
            Defense contractors who achieved compliance with Nathan&apos;s guidance.
          </p>
        </div>

        {/* Bento grid */}
        {/* Top row: large quote (2/3) + stat panel (1/3) */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <QuoteCard {...testimonials[0]} delay={0} />
          </div>

          {/* Stat panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-7 flex flex-col items-center justify-center text-center"
            style={{ backgroundColor: '#274C77' }}
          >
            <p className="font-black leading-none mb-3" style={{ fontSize: 'clamp(3.5rem, 7vw, 5rem)', color: '#FFFFFF' }}>
              100%
            </p>
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
              first-time assessment pass rate
            </p>
          </motion.div>
        </div>

        {/* Bottom row: two equal cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <QuoteCard {...testimonials[1]} delay={0.15} />
          <QuoteCard {...testimonials[2]} delay={0.25} />
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/TestimonialsSection.tsx
git commit -m "feat: rebuild TestimonialsSection — bento grid with stat panel"
```

---

## Task 9: Create BlogNewsletterSection — merged blog + newsletter

**Files:**
- Create: `src/components/BlogNewsletterSection.tsx`

This is a server component (no `'use client'`) because the blog post list comes from `getBlogPosts()` (sync/server-side). The newsletter form is extracted into a small `'use client'` sub-component inside the same file.

**Step 1: Create the file**

```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { getBlogPosts } from '@/lib/mdx'

function NewsletterCard() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div
      className="rounded-2xl p-8 flex flex-col h-full"
      style={{ backgroundColor: '#F0F5FA', border: '1px solid #D4DCE2' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#DCEEFB' }}>
          <Mail className="w-4 h-4" style={{ color: '#274C77' }} />
        </div>
        <span className="text-sm font-semibold" style={{ color: '#274C77' }}>Newsletter</span>
      </div>
      <h3 className="font-black text-lg mb-2" style={{ color: '#0A0B0D' }}>
        Our latest articles in your inbox
      </h3>
      <p className="text-sm mb-6 flex-1" style={{ color: '#6B7280' }}>
        CMMC updates, compliance tips, and new resources — no spam.
      </p>
      {submitted ? (
        <p className="text-sm font-semibold" style={{ color: '#274C77' }}>Thanks! You&apos;re on the list.</p>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
          className="space-y-3"
        >
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-full outline-none"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D4DCE2',
              color: '#0A0B0D',
            }}
          />
          <button
            type="submit"
            className="w-full px-5 py-2.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 bg-[#274C77] text-white transition-opacity hover:opacity-80"
          >
            Subscribe <ArrowRight className="w-3 h-3" />
          </button>
        </form>
      )}
    </div>
  )
}

export default function BlogNewsletterSection() {
  const posts = getBlogPosts().slice(0, 2)

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section divider */}
        <div className="flex justify-between items-center pt-6 mb-12" style={{ borderTop: '1px solid #D4DCE2' }}>
          <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Latest insights</span>
          <span className="font-mono text-xs text-gray-300">08</span>
        </div>

        {/* Heading row */}
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-black" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#0A0B0D' }}>
            Insights &amp; articles
          </h2>
          <Link href="/blog" className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: '#6096BA' }}>
            Browse all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left 2/3: blog posts stacked */}
          <div className="md:col-span-2 space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex gap-5 p-5 rounded-2xl transition-opacity hover:opacity-80 group"
                style={{ backgroundColor: '#F9FAFB', border: '1px solid #D4DCE2' }}
              >
                {/* Thumbnail placeholder */}
                <div className="w-24 h-20 rounded-xl shrink-0" style={{ backgroundColor: '#EEF2F8' }} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: '#DCEEFB', color: '#6096BA' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-sm leading-snug mb-1" style={{ color: '#0A0B0D' }}>
                    {post.title}
                  </h3>
                  <p className="text-xs font-mono" style={{ color: '#9CA3AF' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Right 1/3: newsletter card */}
          <div>
            <NewsletterCard />
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Important note on `'use client'`:** The file is marked `'use client'` at the top because the `NewsletterCard` uses `useState`. This means `getBlogPosts()` must work in a client component — check if it does any Node.js-only fs operations. If so, pass the posts as a prop from the parent server component instead (see the fallback pattern below the main implementation). For now, proceed with the inline approach and fix if the build throws an error.

**Fallback pattern if getBlogPosts fails in client component:**

If you see a build error about `fs` or Node.js modules in client components, split into two files:

1. Keep `src/components/BlogNewsletterSection.tsx` as a **server component** (no `'use client'`):
```tsx
import { getBlogPosts } from '@/lib/mdx'
import BlogNewsletterClient from './BlogNewsletterClient'
export default function BlogNewsletterSection() {
  const posts = getBlogPosts().slice(0, 2)
  return <BlogNewsletterClient posts={posts} />
}
```

2. Create `src/components/BlogNewsletterClient.tsx` with `'use client'` and the form/UI, accepting `posts` as a prop.

**Step 2: Commit**

```bash
git add src/components/BlogNewsletterSection.tsx
git commit -m "feat: create BlogNewsletterSection — merged blog preview + newsletter"
```

---

## Task 10: Update page.tsx + remove old components

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/ServicesSnapshot.tsx`
- Delete: `src/components/AboutSnapshot.tsx`
- Delete: `src/components/NewsletterCTA.tsx`
- Delete: `src/components/BlogPreview.tsx`

**Step 1: Replace page.tsx**

```tsx
import HeroSection from '@/components/HeroSection'
import MarqueeStrip from '@/components/MarqueeStrip'
import ServicesSection from '@/components/ServicesSection'
import ApproachSection from '@/components/ApproachSection'
import StatsSection from '@/components/StatsSection'
import ProcessSection from '@/components/ProcessSection'
import CTASection from '@/components/CTASection'
import TestimonialsSection from '@/components/TestimonialsSection'
import BlogNewsletterSection from '@/components/BlogNewsletterSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />        {/* 01 - white */}
      <MarqueeStrip />       {/* 02 - white */}
      <ServicesSection />    {/* 03 - dark #0D1824 */}
      <ApproachSection />    {/* 04 - white */}
      <StatsSection />       {/* 05 - #EEF2F8 */}
      <ProcessSection />     {/* 06 - white */}
      <CTASection />         {/* 07 - dark #0D1824 */}
      <TestimonialsSection />{/* 08 - white */}
      <BlogNewsletterSection />{/* 09 - white */}
    </>
  )
}
```

**Step 2: Delete old components**

```bash
rm src/components/ServicesSnapshot.tsx
rm src/components/AboutSnapshot.tsx
rm src/components/NewsletterCTA.tsx
rm src/components/BlogPreview.tsx
```

**Step 3: Verify build compiles cleanly**

```bash
npm run build
```

Expected: no TypeScript errors, no missing module errors. If `getBlogPosts` fails in client component, apply the fallback pattern from Task 9.

**Step 4: Visual check**

Run `npm run dev` and review all 9 sections scroll from top to bottom.

**Step 5: Commit**

```bash
git add src/app/page.tsx
git rm src/components/ServicesSnapshot.tsx src/components/AboutSnapshot.tsx src/components/NewsletterCTA.tsx src/components/BlogPreview.tsx
git commit -m "feat: wire up new homepage — 9-section datacenter layout, remove old components"
```

---

## Final verification

After all 10 tasks are committed:

1. Run `npm run build` — confirm zero errors
2. Run `npm run dev` — scroll through homepage, verify:
   - Section 01: white bg, three-line stacked headline "Compliance. Precision. Results."
   - Section 02: white bg, "Trusted by Defense Contractors" label, two marquee rows
   - Section 03: dark `#0D1824` bg, "Our services / 02" divider, 2×2 card grid
   - Section 04: white bg, "Our approach / 03" divider, three numbered tabs
   - Section 05: `#EEF2F8` bg, "Results / 04" divider, horizontal bar charts animate on scroll
   - Section 06: white bg, "Our process / 05" divider, step card auto-advances every 4s
   - Section 07: dark `#0D1824` bg, CTA + contact info + dot grid, "Work with Nathan / 06" bottom divider
   - Section 08: white bg, "Testimonials / 07" divider, bento grid with stat panel
   - Section 09: white bg, "Latest insights / 08" divider, blog cards + newsletter form
3. Check mobile responsiveness at 375px width
