# Datacenter Patterns Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add five UI patterns from the datacenter template: scrolling marquee, animated stat counters, hero checklist widget, animated progress bars, and a bolder hero headline.

**Architecture:** All changes are self-contained React components or inline additions. New components (MarqueeStrip, StatsSection) are created fresh. Existing components (HeroSection, AboutSnapshot) get new sections added. Homepage page.tsx is updated to wire in new components and remove TrustStrip.

**Tech Stack:** Next.js 15, React, Framer Motion (already installed), Tailwind CSS v4, Lucide React, TypeScript

---

## Task 1: Create MarqueeStrip component (replaces TrustStrip)

**Files:**
- Create: `src/components/MarqueeStrip.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create the component**

```tsx
// src/components/MarqueeStrip.tsx
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
            key={i}
            className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{ backgroundColor: '#274C77', color: '#FFFFFF' }}
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
      className="py-8 px-0 border-b"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#D4DCE2', overflow: 'hidden' }}
    >
      <Row />
      <Row reverse />
    </section>
  )
}
```

**Step 2: Add CSS keyframes to globals.css**

Open `src/app/globals.css` and add at the bottom:

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes marquee-reverse {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

.marquee-row {
  animation: marquee 28s linear infinite;
}
.marquee-row-reverse {
  animation: marquee-reverse 28s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-row,
  .marquee-row-reverse {
    animation: none;
  }
}
```

**Step 3: Update page.tsx — swap TrustStrip for MarqueeStrip**

In `src/app/page.tsx`:
- Remove: `import TrustStrip from '@/components/TrustStrip'`
- Add: `import MarqueeStrip from '@/components/MarqueeStrip'`
- Replace `<TrustStrip />` with `<MarqueeStrip />`

**Step 4: Verify visually**

Dev server should be running at http://localhost:3000. Check the section below the hero shows two rows of scrolling pills animating in opposite directions.

**Step 5: Commit**

```bash
cd C:/Users/whyme/nathan-site
git add src/components/MarqueeStrip.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: replace TrustStrip with animated MarqueeStrip"
```

---

## Task 2: Create StatsSection component (dark counter banner)

**Files:**
- Create: `src/components/StatsSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create the component**

```tsx
// src/components/StatsSection.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  { value: 5,   suffix: '+', label: 'Years Experience' },
  { value: 50,  suffix: '+', label: 'Clients Served' },
  { value: 110, suffix: '',  label: 'NIST Practices' },
  { value: 3,   suffix: '',  label: 'Assessment Levels' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1200
    const step = 16
    const increment = value / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, step)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section
      className="py-16 px-6"
      style={{ backgroundColor: '#1A2F4A' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid rgba(163,206,241,0.15)' : undefined,
              }}
            >
              <p
                className="font-black leading-none mb-2"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#FFFFFF' }}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p
                className="text-sm font-medium uppercase tracking-wider"
                style={{ color: '#A3CEF1' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Update page.tsx — add StatsSection after MarqueeStrip**

In `src/app/page.tsx`:
- Add: `import StatsSection from '@/components/StatsSection'`
- Add `<StatsSection />` between `<MarqueeStrip />` and `<AboutSnapshot />`

**Step 3: Verify visually**

Scroll to the dark navy banner. Numbers should start at 0 and count up to their target values as the section enters the viewport.

**Step 4: Commit**

```bash
git add src/components/StatsSection.tsx src/app/page.tsx
git commit -m "feat: add animated StatsSection counter banner"
```

---

## Task 3: Add checklist widget to HeroSection

**Files:**
- Modify: `src/components/HeroSection.tsx`

**Step 1: Read the current file**

Read `src/components/HeroSection.tsx` to find the CTAs block (around line 91–108).

**Step 2: Add the widget below the CTAs div**

Find the closing `</div>` of the `{/* CTAs */}` block (the `flex flex-wrap gap-3 mb-10` div). Add this immediately after it, before the `{/* Social proof */}` div:

```tsx
{/* Checklist widget */}
<Link
  href="/resources"
  className="inline-flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:opacity-90 mb-10"
  style={{
    backgroundColor: 'rgba(255,255,255,0.85)',
    border: '1px solid #D4DCE2',
    backdropFilter: 'blur(8px)',
  }}
>
  <span
    className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
    style={{ backgroundColor: '#DCEEFB' }}
  >
    <Download className="w-4 h-4" style={{ color: '#274C77' }} />
  </span>
  <span className="text-sm font-semibold" style={{ color: '#274C77' }}>
    Download the CMMC L2 Readiness Checklist
  </span>
  <ArrowRight className="w-4 h-4 shrink-0" style={{ color: '#6096BA' }} />
</Link>
```

**Step 3: Ensure Download is imported from lucide-react**

At the top of HeroSection.tsx, the import line currently reads:
```tsx
import { Plus } from 'lucide-react'
```
Update it to:
```tsx
import { Plus, Download, ArrowRight } from 'lucide-react'
```

**Step 4: Verify visually**

The hero should now show a small card widget below the CTA buttons, before the social proof avatars.

**Step 5: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: add checklist download widget to hero"
```

---

## Task 4: Add animated progress bars to AboutSnapshot

**Files:**
- Modify: `src/components/AboutSnapshot.tsx`

**Step 1: Read the current file**

Read `src/components/AboutSnapshot.tsx` to see the current structure (credential pills + Full Bio button).

**Step 2: Add progress bars data and ProgressBar component**

At the top of the file (after imports), add:

```tsx
const expertiseBars = [
  { label: 'CMMC Level 2 Readiness',       pct: 95 },
  { label: 'NIST 800-171 Compliance',       pct: 98 },
  { label: 'CUI Handling & Identification', pct: 90 },
  { label: 'DoD DFARS Requirements',        pct: 85 },
]
```

Add a `ProgressBar` sub-component before the default export:

```tsx
function ProgressBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium" style={{ color: '#274C77' }}>{label}</span>
        <span className="text-sm font-semibold" style={{ color: '#6096BA' }}>{pct}%</span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ backgroundColor: '#D4DCE2', height: '6px' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: '#274C77' }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
```

**Step 3: Insert bars into the component**

In `AboutSnapshot`, find the `{/* Content */}` motion.div. After the credentials `flex flex-wrap gap-2 mb-8` div and before the `<Link>Full Bio</Link>`, add:

```tsx
{/* Progress bars */}
<div className="mb-8 max-w-lg">
  {expertiseBars.map((bar, i) => (
    <ProgressBar key={bar.label} label={bar.label} pct={bar.pct} delay={i * 0.1} />
  ))}
</div>
```

**Step 4: Verify visually**

Scroll to the About section. Bars should animate from 0% to their target widths on first view.

**Step 5: Commit**

```bash
git add src/components/AboutSnapshot.tsx
git commit -m "feat: add animated expertise progress bars to AboutSnapshot"
```

---

## Task 5: Increase hero headline size

**Files:**
- Modify: `src/components/HeroSection.tsx`

**Step 1: Find the h1 fontSize style**

In `HeroSection.tsx`, find:
```
fontSize: 'clamp(2rem, 4vw, 3.75rem)'
```

**Step 2: Replace with larger clamp**

```
fontSize: 'clamp(2.5rem, 5vw, 4.5rem)'
```

**Step 3: Verify visually**

Hero headline should be visibly larger and more impactful, closer to datacenter template's oversized stacked type.

**Step 4: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: increase hero headline size for bolder impact"
```

---

## Final Verification

After all tasks:

1. Full page scroll at http://localhost:3000
2. Check marquee rows animate smoothly in opposite directions
3. Scroll to dark stats banner — numbers count up from 0
4. Hero shows checklist widget below CTAs
5. About section shows progress bars animate on scroll
6. Hero headline is noticeably larger
7. No console errors
