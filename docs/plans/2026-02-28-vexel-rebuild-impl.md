# Vexel-Style Homepage Rebuild — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild Nathan Lundquist's homepage to match the Vexel template's editorial design — cream hero, red accent, sharp rectangular buttons, Space Grotesk font, and 9 sections adapted for CMMC consulting.

**Architecture:** Replace all current homepage components with Vexel-inspired equivalents. Font swapped to Space Grotesk, colors to Vexel palette (#B82416 red, #FEF4EE cream, #F9C8AF peach). Two new components (AboutSection, SectorsSection), two deleted (StatsSection, ProcessSection), rest rewritten.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion v12, Lucide React, Space Grotesk via next/font/google.

**Design reference:** `docs/plans/2026-02-28-vexel-rebuild-design.md`

**Verify after each task:** `npm run dev` is running on localhost:3000 — check the section visually.

---

### Task 1: Foundation — Font + Color Tokens + Button Utilities

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: Update layout.tsx — swap to Space Grotesk**

Replace the entire file:

```tsx
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Nathan Lundquist — CMMC & NIST 800-171 Consultant',
  description:
    'CMMC Level 2 and NIST 800-171 compliance consulting. Helping defense contractors protect CUI and achieve compliance through PCShards.',
  openGraph: {
    title: 'Nathan Lundquist — CMMC & NIST 800-171 Consultant',
    description: 'Cybersecurity compliance consulting for defense contractors handling CUI.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

**Step 2: Update globals.css — new color tokens, button utilities, remove old tokens**

Replace the entire file:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-red: #B82416;
  --color-cream: #FEF4EE;
  --color-peach: #F9C8AF;
  --color-black: #1A1A1A;
  --color-body: #333333;
  --color-muted: #646464;
  --color-border: #E5E5E5;
  --font-sans: var(--font-space-grotesk), system-ui, sans-serif;
}

@layer base {
  body {
    font-family: var(--font-sans);
    color: #333333;
    background-color: #FFFFFF;
    -webkit-font-smoothing: antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center gap-2 bg-[#B82416] text-white px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-90;
  }
  .btn-secondary {
    @apply inline-flex items-center gap-2 bg-[#F9C8AF] text-[#B82416] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-90;
  }
  .btn-outline-white {
    @apply inline-flex items-center gap-2 border border-white text-white bg-transparent px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-90;
  }
  .btn-black {
    @apply inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-90;
  }
  .section-label {
    @apply text-xs font-bold uppercase tracking-[0.15em] text-[#B82416] mb-5;
  }

  /* Marquee animation */
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
}
```

**Step 3: Commit**

```bash
cd /c/Users/whyme/nathan-site
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: swap to Space Grotesk, Vexel color tokens, button utilities"
```

---

### Task 2: Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

**Step 1: Rewrite Navbar.tsx**

```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ borderBottom: '1px solid #E5E5E5' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-base" style={{ color: '#1A1A1A' }}>
          <span
            className="w-8 h-8 flex items-center justify-center text-white text-xs font-black"
            style={{ backgroundColor: '#B82416' }}
          >
            NL
          </span>
          <span className="hidden sm:block tracking-tight">Nathan Lundquist</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors hover:text-[#B82416]"
              style={{ color: '#333333' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="btn-black hidden sm:inline-flex">
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            className="md:hidden p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t" style={{ borderColor: '#E5E5E5' }}>
          <nav className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium py-1"
                style={{ color: '#333333' }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary w-fit mt-2" onClick={() => setOpen(false)}>
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: rewrite Navbar — Vexel style, Space Grotesk, black CTA"
```

---

### Task 3: HeroSection

**Files:**
- Modify: `src/components/HeroSection.tsx`

**Step 1: Rewrite HeroSection.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="min-h-screen flex flex-col justify-between pt-16"
      style={{ backgroundColor: '#FEF4EE' }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-12 items-start pt-16 pb-8">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-8">
              <Shield className="w-5 h-5 shrink-0" style={{ color: '#B82416' }} />
              <div className="w-px h-5" style={{ backgroundColor: '#E5E5E5' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#1A1A1A' }}>
                CMMC &amp; NIST 800-171 Consulting for Defense Contractors
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-black leading-none mb-10"
              style={{
                fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
                color: '#B82416',
                letterSpacing: '-0.02em',
              }}
            >
              Achieving<br />
              Compliance<br />
              Is Easier<br />
              Than You Think.
            </h1>

            {/* Sub */}
            <p className="text-lg leading-relaxed mb-8 max-w-md" style={{ color: '#333333' }}>
              We guide defense contractors through CMMC Level 2 and NIST 800-171 —
              from first gap analysis to passed assessment, with clarity at every step.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Get a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/resources" className="btn-secondary">
                Free Resources
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — Stat Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-end items-start pt-4"
          >
            <div
              className="w-full max-w-sm bg-white p-6"
              style={{ border: '1px solid #E5E5E5' }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#B82416' }}>
                  +100%
                </span>
                <div className="flex gap-3 text-xs" style={{ color: '#646464' }}>
                  <span>Q1</span>
                  <span>Q2</span>
                  <span className="font-bold" style={{ color: '#B82416' }}>Q3</span>
                </div>
              </div>
              <p className="text-xs mb-6" style={{ color: '#B82416' }}>First-try assessment pass rate</p>

              {/* Dot matrix chart */}
              <div className="grid mb-6" style={{ gridTemplateColumns: 'repeat(20, 1fr)', gap: '3px' }}>
                {Array.from({ length: 100 }).map((_, i) => {
                  const col = i % 20
                  const row = Math.floor(i / 20)
                  const threshold = Math.floor((col / 19) * 4)
                  const active = row >= (4 - threshold)
                  return (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: 5,
                        height: 5,
                        backgroundColor: active ? '#B82416' : '#F9C8AF',
                      }}
                    />
                  )
                })}
              </div>

              {/* Card footer */}
              <div className="flex justify-between text-xs" style={{ color: '#646464' }}>
                <span>Assessments 2023</span>
                <span>Assessments 2024</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll for more */}
      <div className="max-w-7xl mx-auto px-6 w-full pb-6 flex justify-end">
        <span className="text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2" style={{ color: '#B82416' }}>
          Scroll for more <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: rewrite HeroSection — cream bg, red headline, dot matrix stat card"
```

---

### Task 4: MarqueeStrip

**Files:**
- Modify: `src/components/MarqueeStrip.tsx`

**Step 1: Update styling to Vexel pill style**

```tsx
export default function MarqueeStrip() {
  const items = [
    'CMMC Level 2', 'NIST 800-171', 'CUI Compliance', 'SSP Development',
    'POAM Creation', 'Gap Analysis', 'Assessment Prep', 'Defense Contractors',
    'PCShards Consulting', 'DoD Subcontractors',
  ]

  const Row = () => (
    <div className="flex items-center gap-4 shrink-0">
      {items.map((item) => (
        <span
          key={item}
          className="whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-widest shrink-0"
          style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
        >
          {item}
        </span>
      ))}
    </div>
  )

  return (
    <section className="py-10 overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}>
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#B82416' }}>
        Trusted by Defense Contractors
      </p>
      <div className="flex">
        <div className="flex animate-marquee gap-4">
          <Row /><Row />
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/MarqueeStrip.tsx
git commit -m "feat: update MarqueeStrip — Vexel pill style, red label"
```

---

### Task 5: AboutSection (new)

**Files:**
- Create: `src/components/AboutSection.tsx`

**Step 1: Create AboutSection.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const pillars = [
  { num: '01', label: 'Gap Analysis', active: false },
  { num: '02', label: 'Remediation Planning', active: false },
  { num: '03', label: 'Assessment Preparation', active: false },
  { num: '04', label: 'Ongoing Compliance Support', active: true },
]

export default function AboutSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <p className="section-label">About Nathan</p>

        {/* Full-width heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-black leading-tight mb-16"
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            color: '#1A1A1A',
            maxWidth: '900px',
          }}
        >
          Nathan Lundquist is redefining how defense contractors approach
          compliance. We believe security should be clear, achievable, and
          built to last.
        </motion.h2>

        {/* Two-column */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — numbered list */}
          <div>
            <div className="flex flex-col" style={{ borderTop: '1px solid #E5E5E5' }}>
              {pillars.map((p) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 py-5"
                  style={{ borderBottom: '1px solid #E5E5E5' }}
                >
                  <span className="text-xs font-bold w-6 shrink-0" style={{ color: '#B82416' }}>
                    {p.num}
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{ color: p.active ? '#B82416' : '#F9C8AF' }}
                  >
                    {p.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/services" className="btn-primary">
                Our Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right — headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div
              className="overflow-hidden w-full"
              style={{
                aspectRatio: '3/4',
                backgroundColor: '#FEF4EE',
                backgroundImage: 'url(/headshot.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/AboutSection.tsx
git commit -m "feat: create AboutSection — numbered pillars, headshot, Vexel layout"
```

---

### Task 6: ServicesSection (3-card layout)

**Files:**
- Modify: `src/components/ServicesSection.tsx`

**Step 1: Rewrite ServicesSection.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const cards = [
  {
    type: 'photo' as const,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    title: 'Gap Analysis & Readiness',
    href: '/services',
  },
  {
    type: 'photo' as const,
    gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #243447 100%)',
    title: 'NIST 800-171 & SSP',
    href: '/services',
  },
  {
    type: 'red' as const,
    gradient: '',
    title: 'Fast & results-driven',
    description: 'Achieve CMMC Level 2 certification without the guesswork. Nathan delivers a clear path from current state to assessment-ready.',
    href: '/contact',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="section-label">Services</p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1A1A1A' }}
            >
              The compliance expertise<br />you need, fast.
            </motion.h2>
          </div>
          <Link href="/services" className="btn-secondary shrink-0">
            All Services
          </Link>
        </div>

        {/* Three cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={card.href}
                className="block relative overflow-hidden group"
                style={{ aspectRatio: '3/4' }}
              >
                {card.type === 'photo' ? (
                  <>
                    {/* Dark gradient bg */}
                    <div
                      className="absolute inset-0"
                      style={{ background: card.gradient }}
                    />
                    {/* Subtle dot overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                      <span className="text-white font-bold text-lg leading-tight">
                        {card.title}
                      </span>
                      <div
                        className="w-10 h-10 flex items-center justify-center shrink-0 ml-3"
                        style={{ backgroundColor: '#FFFFFF' }}
                      >
                        <ArrowRight className="w-4 h-4" style={{ color: '#B82416' }} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Red card */}
                    <div className="absolute inset-0" style={{ backgroundColor: '#B82416' }} />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <h3 className="text-white font-black leading-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                        {card.title}
                      </h3>
                      <div>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                          {card.description}
                        </p>
                        <div className="flex justify-end">
                          <div
                            className="w-10 h-10 flex items-center justify-center"
                            style={{ backgroundColor: '#FFFFFF' }}
                          >
                            <ArrowRight className="w-4 h-4" style={{ color: '#B82416' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ServicesSection.tsx
git commit -m "feat: rewrite ServicesSection — 3-card layout, dark photo cards + red card"
```

---

### Task 7: ApproachSection (toggle tabs + stats)

**Files:**
- Modify: `src/components/ApproachSection.tsx`

**Step 1: Rewrite ApproachSection.tsx**

```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

const tabs = {
  approach: {
    label: 'APPROACH',
    p1: 'Our approach puts your team in control from day one. We map every gap, build a practical remediation roadmap, and stand beside you through every assessment milestone.',
    p2: "We don't just deliver documents — we build the understanding your team needs to maintain compliance long after we're gone.",
  },
  results: {
    label: 'RESULTS',
    p1: 'Defense contractors who work with Nathan achieve CMMC Level 2 certification without surprise findings or failed assessments.',
    p2: 'Our structured process eliminates guesswork and replaces it with a repeatable system you can own and sustain.',
  },
}

const stats = [
  { num: '5+', label: 'Years Experience' },
  { num: '50+', label: 'Clients Served' },
  { num: '100%', label: 'First-try Pass Rate' },
]

export default function ApproachSection() {
  const [active, setActive] = useState<'approach' | 'results'>('approach')
  const reducedMotion = useReducedMotion()
  const tab = tabs[active]

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <p className="section-label">Our Approach</p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black leading-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#1A1A1A' }}
            >
              We envision compliance as clear, systematic, and achievable.
            </motion.h2>

            {/* Toggle tabs */}
            <div
              className="flex items-center gap-6 mb-8"
              role="tablist"
              aria-label="Approach tabs"
            >
              {(['approach', 'results'] as const).map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active === key}
                  onClick={() => setActive(key)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors"
                  style={{ color: active === key ? '#B82416' : '#646464' }}
                >
                  {/* Toggle pill */}
                  <span
                    className="w-10 h-5 rounded-full flex items-center transition-colors shrink-0"
                    style={{
                      backgroundColor: active === key ? '#B82416' : '#E5E5E5',
                      padding: '2px',
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded-full bg-white transition-transform"
                      style={{ transform: active === key ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </span>
                  {tabs[key].label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div
              role="tabpanel"
              aria-label={tab.label}
              tabIndex={0}
              className="mb-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#333333' }}>
                    {tab.p1}
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: '#646464' }}>
                    {tab.p2}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stats */}
            <div className="pt-8" style={{ borderTop: '1px solid #E5E5E5' }}>
              <div className="grid grid-cols-3 gap-6">
                {stats.map((s) => (
                  <div key={s.num}>
                    <p
                      className="font-black leading-none mb-1"
                      style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#B82416' }}
                    >
                      {s.num}
                    </p>
                    <p className="text-xs leading-snug" style={{ color: '#646464' }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — headshot on cream */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden"
            style={{
              aspectRatio: '3/4',
              backgroundColor: '#FEF4EE',
              backgroundImage: 'url(/headshot.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ApproachSection.tsx
git commit -m "feat: rewrite ApproachSection — toggle tabs, stats row, Vexel layout"
```

---

### Task 8: SectorsSection (new — replaces globe section)

**Files:**
- Create: `src/components/SectorsSection.tsx`

**Step 1: Create SectorsSection.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

const sectors = [
  { name: 'Aerospace', sub: 'CUI handling' },
  { name: 'Manufacturing', sub: 'CMMC scope' },
  { name: 'IT Services', sub: 'System security' },
  { name: 'R&D', sub: 'CUI protection' },
  { name: 'Systems Integration', sub: 'Access control' },
  { name: 'Engineering', sub: 'NIST mapping' },
  { name: 'Defense Electronics', sub: 'Asset inventory' },
  { name: 'Cyber Services', sub: 'Incident response' },
  { name: 'Software Dev', sub: 'Secure SDLC' },
  { name: 'Logistics', sub: 'Supply chain' },
  { name: 'Prime Contractors', sub: 'Flow-down reqs' },
  { name: 'Consulting Firms', sub: 'Advisory scope' },
]

export default function SectorsSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FEF4EE' }}>
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <p className="section-label text-center">Defense Sectors We Serve</p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-black leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1A1A1A' }}
        >
          Protecting defense contractors{' '}
          <Shield
            className="inline-block align-middle"
            style={{ color: '#B82416', width: '1em', height: '1em' }}
          />{' '}
          across every sector.
        </motion.h2>

        {/* CTA */}
        <div className="flex justify-center mb-16">
          <Link href="/about" className="btn-primary">
            Learn More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {sectors.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-white p-5"
              style={{ border: '1px solid #E5E5E5' }}
            >
              <p className="font-bold text-sm leading-tight mb-1" style={{ color: '#1A1A1A' }}>
                {s.name}
              </p>
              <p className="text-xs" style={{ color: '#646464' }}>
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/SectorsSection.tsx
git commit -m "feat: create SectorsSection — cream bg, sector grid, inline shield icon"
```

---

### Task 9: CTASection (full red)

**Files:**
- Modify: `src/components/CTASection.tsx`

**Step 1: Rewrite CTASection.tsx**

```tsx
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

export default function CTASection() {
  const bars = [60, 80, 55, 90, 70, 95, 65, 100, 75, 110, 85, 130, 105, 150, 120, 170]

  return (
    <section className="relative overflow-hidden py-24 px-6" style={{ backgroundColor: '#B82416' }}>
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top label */}
        <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Start Your Compliance Journey Today
        </p>
        <p className="text-sm font-bold uppercase tracking-[0.12em] mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Simple. Secure. Assessment-ready.
        </p>

        {/* Main heading + CTA row */}
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <h2
              className="font-black leading-tight mb-8 text-white"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              Nathan offers expertise, clarity, and a proven path to CMMC certification.
            </h2>
            <Link href="/contact" className="btn-outline-white">
              Get a Consultation Today <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bar chart decoration */}
          <div className="flex items-end gap-2 h-40 justify-end" aria-hidden="true">
            {bars.map((h, i) => (
              <div
                key={i}
                className="w-1 shrink-0"
                style={{ height: `${h}px`, backgroundColor: 'rgba(255,255,255,0.35)' }}
              />
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-12 pt-8 flex items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <div
            className="w-8 h-8 flex items-center justify-center text-white text-xs font-black shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            NL
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            CMMC &amp; NIST 800-171 Consulting for Defense Contractors
          </span>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/CTASection.tsx
git commit -m "feat: rewrite CTASection — full red, white text, bar chart decoration"
```

---

### Task 10: TestimonialsSection style update

**Files:**
- Modify: `src/components/TestimonialsSection.tsx`

**Step 1: Update colors + button styles to Vexel palette**

Replace all styled values in TestimonialsSection.tsx:
- `backgroundColor: '#274C77'` → `backgroundColor: '#B82416'` (stat panel)
- `backgroundColor: '#4768FA'` (any remaining old accent) → `#B82416`
- `backgroundColor: '#EEF2F8'` / `#F0F3FD'` → `backgroundColor: '#FEF4EE'`
- `color: '#6096BA'` / `#6B84FB'` → `color: '#B82416'`
- `backgroundColor: '#EEF2F8'` pill bg → `backgroundColor: '#FEF4EE'`
- `border: '1px solid #D4DCE2'` / `#D3D8E9'` → `border: '1px solid #E5E5E5'`
- Section label: add `<p className="section-label">Testimonials</p>` above heading
- Heading color: `#090F1C` → `#1A1A1A`
- Body text: `#374151` → `#333333`
- Avatar bg: `#274C77` → `#B82416`
- `'Customer story'` pill: `backgroundColor: '#FEF4EE', color: '#B82416'`

Read the current file first, apply targeted edits for each color swap.

**Step 2: Commit**

```bash
git add src/components/TestimonialsSection.tsx
git commit -m "feat: update TestimonialsSection — Vexel red/cream palette"
```

---

### Task 11: BlogNewsletterClient style update

**Files:**
- Modify: `src/components/BlogNewsletterClient.tsx`

**Step 1: Update colors + button styles**

- Section label: add `<p className="section-label">Latest Insights</p>` above heading
- "Browse all →" link: `style={{ color: '#B82416' }}`
- Subscribe button: change to `className="btn-secondary"` (peach)
- Email input: remove box borders, use `borderBottom: '1px solid #E5E5E5'` only, no rounded
- Category badge bg: `#FEF4EE`, color: `#B82416`
- Date text: `#646464`
- Any old accent colors (`#4768FA`, `#6B84FB`) → `#B82416`

Read the current file first, apply targeted edits.

**Step 2: Commit**

```bash
git add src/components/BlogNewsletterClient.tsx
git commit -m "feat: update BlogNewsletterClient — Vexel red/cream palette"
```

---

### Task 12: Footer rewrite

**Files:**
- Modify: `src/components/Footer.tsx`

**Step 1: Rewrite Footer.tsx**

```tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="px-6 pt-20 pb-10" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E5E5' }}>
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">

          {/* Left */}
          <div>
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <span
                className="w-8 h-8 flex items-center justify-center text-white text-xs font-black"
                style={{ backgroundColor: '#B82416' }}
              >
                NL
              </span>
              <span className="font-bold text-sm" style={{ color: '#1A1A1A' }}>Nathan Lundquist</span>
            </Link>

            <h3
              className="font-black leading-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#1A1A1A', maxWidth: '420px' }}
            >
              Work with Nathan Lundquist and achieve CMMC compliance with confidence.
            </h3>

            <Link href="/contact" className="btn-primary mb-12 w-fit">
              Get a Consultation <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex flex-col gap-3 mt-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#646464' }}>Email</p>
                <a href="mailto:nathan@pcshards.com" className="text-sm font-medium underline" style={{ color: '#1A1A1A' }}>
                  nathan@pcshards.com
                </a>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#646464' }}>Location</p>
                <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>Metro Detroit, MI</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-10">
            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-lg mb-4" style={{ color: '#1A1A1A' }}>
                Subscribe to compliance insights.
              </h4>
              <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 px-0 py-3 text-sm outline-none bg-transparent"
                  style={{ borderBottom: '1px solid #1A1A1A', color: '#1A1A1A' }}
                />
                <button type="submit" className="btn-secondary shrink-0 ml-4">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Nav columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#1A1A1A' }}>Company</p>
                <div className="flex flex-col gap-2">
                  {['About', 'Resources', 'Blog'].map((l) => (
                    <Link key={l} href={`/${l.toLowerCase()}`} className="text-sm transition-colors hover:text-[#B82416]" style={{ color: '#646464' }}>
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#1A1A1A' }}>Services</p>
                <div className="flex flex-col gap-2">
                  {['CMMC L2 Prep', 'NIST Gap Analysis', 'SSP Development', 'CUI Support'].map((l) => (
                    <Link key={l} href="/services" className="text-sm transition-colors hover:text-[#B82416]" style={{ color: '#646464' }}>
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#1A1A1A' }}>Support</p>
                <div className="flex flex-col gap-2">
                  {[['FAQ', '/resources'], ['Contact', '/contact'], ['Legal', '/']].map(([l, h]) => (
                    <Link key={l} href={h} className="text-sm transition-colors hover:text-[#B82416]" style={{ color: '#646464' }}>
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#1A1A1A' }}>Social</p>
                <div className="flex flex-col gap-2">
                  {[['LinkedIn', 'https://linkedin.com'], ['Twitter / X', 'https://x.com'], ['GitHub', 'https://github.com']].map(([l, h]) => (
                    <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-[#B82416]" style={{ color: '#646464' }}>
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-8 text-xs"
          style={{ borderTop: '1px solid #E5E5E5', color: '#646464' }}
        >
          <p>© Nathan Lundquist. All Rights Reserved.</p>
          <p>via <span className="font-semibold" style={{ color: '#1A1A1A' }}>PCShards</span></p>
        </div>
      </div>
    </footer>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: rewrite Footer — Vexel multi-column layout, newsletter, contact"
```

---

### Task 13: Wire up page.tsx + delete unused components

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/StatsSection.tsx`
- Delete: `src/components/ProcessSection.tsx`
- Delete: `src/components/TrustStrip.tsx`
- Delete: `src/components/ResourcesPreview.tsx`

**Step 1: Rewrite page.tsx**

```tsx
import HeroSection from '@/components/HeroSection'
import MarqueeStrip from '@/components/MarqueeStrip'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ApproachSection from '@/components/ApproachSection'
import SectorsSection from '@/components/SectorsSection'
import CTASection from '@/components/CTASection'
import TestimonialsSection from '@/components/TestimonialsSection'
import BlogNewsletterSection from '@/components/BlogNewsletterSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />           {/* 01 — cream #FEF4EE */}
      <MarqueeStrip />          {/* 02 — white */}
      <AboutSection />          {/* 03 — white */}
      <ServicesSection />        {/* 04 — white */}
      <ApproachSection />        {/* 05 — white/cream */}
      <SectorsSection />         {/* 06 — cream #FEF4EE */}
      <CTASection />             {/* 07 — red #B82416 */}
      <TestimonialsSection />    {/* 08 — white */}
      <BlogNewsletterSection />  {/* 09 — white */}
    </>
  )
}
```

**Step 2: Delete unused components**

```bash
cd /c/Users/whyme/nathan-site
git rm src/components/StatsSection.tsx src/components/ProcessSection.tsx src/components/TrustStrip.tsx src/components/ResourcesPreview.tsx
```

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire up Vexel homepage — 9 sections, remove StatsSection/ProcessSection/TrustStrip/ResourcesPreview"
```

---

## Verification

After all 13 tasks, visit `http://localhost:3000` and confirm:
- [ ] Cream hero with red massive headline and dot matrix stat card
- [ ] Sharp rectangular buttons throughout (no rounded corners)
- [ ] Space Grotesk font rendering everywhere
- [ ] MarqueeStrip has red label + rectangular pills
- [ ] AboutSection: numbered list with peach/red items + headshot
- [ ] ServicesSection: 3 cards (2 dark gradient + 1 red)
- [ ] ApproachSection: toggle switches + red stats + headshot right
- [ ] SectorsSection: cream bg + white sector cards
- [ ] CTASection: full red + bar chart decoration
- [ ] Footer: multi-column, newsletter form, red logo block
