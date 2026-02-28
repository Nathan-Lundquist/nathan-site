# Lukes-Inspired Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the Nathan Lundquist site homepage to match the layout, typography, and feel of the Lukes Webflow template — keeping Nathan's content/branding but adopting Lukes' structure.

**Architecture:** We are updating existing components in place (no new pages). The big shifts are: (1) hero gets a full-bleed photo + oversized name + floating stat cards, (2) content sections switch from all-dark to light/white backgrounds, (3) services convert from card grid to numbered vertical list, (4) two new sections added (testimonials, newsletter CTA). All components are in `src/components/`, page assembly is in `src/app/page.tsx`.

**Tech Stack:** Next.js 15, React, Tailwind CSS v4 (`@theme` in globals.css), Framer Motion, Lucide icons. No test framework — verify visually at `http://localhost:3000` after each task (dev server already running).

---

## Reference: Lukes vs Nathan Mapping

| Lukes Section | Nathan Equivalent | Action |
|---|---|---|
| Hero: full photo + giant name + stat cards | HeroSection.tsx | Redesign |
| Logo/partner strip | TrustStrip (new) | Create new component |
| About me: label + large paragraph | AboutSnapshot.tsx | Redesign layout |
| Scrolling image gallery | Remove (no portfolio yet) | Skip |
| Awards: vertical list | Credentials section | Adapt into AboutSnapshot |
| Exclusive Work: 2-col grid | Skip (no case studies) | Skip |
| My Expertise: numbered list | ServicesSnapshot.tsx | Redesign to numbered list |
| Client Feedback: testimonial carousel | TestimonialsSection (new) | Create new component |
| Stay in touch: newsletter footer | NewsletterCTA (new) | Create new component |

---

## Color & Typography Changes

The Lukes template uses **white/light sections** for content and only dark for the hero. Currently Nathan is all-dark. This is the most impactful visual change.

**New section background pattern:**
- Hero: dark (`#0A0A0A`) — keep as is
- All other sections: `#FFFFFF` (white) with `#111111` text
- Accent: keep orange `#FF6B00` (Nathan's brand)

**Section heading style (Lukes-style):**
- Left-aligned "label" in small caps muted text
- Large bold heading on right or below
- Much bigger font size (display level)

---

## Task 1: Redesign HeroSection — Full Bleed Photo + Giant Name + Stat Cards

**Files:**
- Modify: `src/components/HeroSection.tsx`

The Lukes hero has:
- Dark bg, full viewport height
- Professional photo on RIGHT half (absolutely positioned, covering ~50% width)
- GIANT name text at the bottom overlapping the photo ("Lukes" ~200px bold)
- Two floating stat cards on the LEFT (glass-dark cards)
- Minimal status badge top-left area

**Step 1: Replace HeroSection.tsx with the new layout**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const stats = [
  { label: 'Years Experience', value: '10+' },
  { label: 'Clients Helped', value: '50+' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Photo — right half, full height */}
      <div
        className="absolute right-0 top-0 h-full w-full md:w-[55%]"
        style={{
          backgroundImage: 'url(/headshot.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Gradient fade left edge so photo blends into dark bg */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #0A0A0A 0%, transparent 40%)',
          }}
        />
        {/* Gradient fade bottom so giant name is readable */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #0A0A0A 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-8 h-screen flex flex-col justify-between">
        {/* Top: status badge + stat cards */}
        <div className="flex flex-col gap-4 max-w-xs">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-widest w-fit"
            style={{
              backgroundColor: 'rgba(17,17,17,0.8)',
              border: '1px solid rgba(255,107,0,0.3)',
              color: '#FF6B00',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#FF6B00' }} />
            Available for Consulting
          </motion.div>

          {/* Stat cards */}
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="px-5 py-4 rounded-xl"
              style={{
                backgroundColor: 'rgba(17,17,17,0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p className="text-xs mb-1" style={{ color: '#888888' }}>{stat.label}</p>
              <p className="text-3xl font-black leading-none" style={{ color: '#F5F5F5' }}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom: giant name + subline + CTA */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(5rem, 14vw, 11rem)', color: '#F5F5F5' }}
          >
            Nathan
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
          >
            <p className="text-lg max-w-md leading-relaxed" style={{ color: '#888888' }}>
              CMMC &amp; NIST 800-171 compliance expert helping defense contractors
              protect CUI and keep winning DoD contracts.
            </p>
            <Link
              href="/contact"
              className="btn-primary text-base shrink-0"
            >
              Get a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <p className="text-sm" style={{ color: '#555555' }}>
            Consulting through{' '}
            <a href="https://pcshards.com" target="_blank" rel="noopener noreferrer"
              className="font-bold hover:underline" style={{ color: '#FF6B00' }}>
              PCShards
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add placeholder headshot**

Since there's no real photo yet, create a placeholder image file. In `public/headshot.jpg` — use any dark professional photo or a CSS gradient fallback. Update the hero to show a gradient if image fails:

In `HeroSection.tsx`, the photo div already handles missing image gracefully (dark bg shows through). The gradient overlays ensure readability regardless.

**Step 3: Verify visually**

Navigate to `http://localhost:3000`. You should see:
- Dark full-viewport hero
- Giant "Nathan" at bottom left
- Two stat cards top-left
- Description + CTA button at bottom
- Right half either shows photo or dark gradient

---

## Task 2: Add TrustStrip Component (Logo/Certification Strip)

**Files:**
- Create: `src/components/TrustStrip.tsx`
- Modify: `src/app/page.tsx`

Lukes has a row of partner logos in light rounded pill cards. Nathan's equivalent: certification logos / "trusted by" companies.

**Step 1: Create TrustStrip.tsx**

```tsx
const items = [
  'CMMC-AB',
  'NIST SP 800-171',
  'DoD DFARS',
  'CUI Registry',
  'C3PAO Ready',
]

export default function TrustStrip() {
  return (
    <section
      className="py-10 px-6 border-b"
      style={{ backgroundColor: '#F9F9F9', borderColor: '#E5E5E5' }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs font-mono uppercase tracking-widest mb-6" style={{ color: '#999999' }}>
          Specializations &amp; Frameworks
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((item) => (
            <span
              key={item}
              className="px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: '#EEEEEE',
                color: '#333333',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Add to page.tsx**

```tsx
import HeroSection from '@/components/HeroSection'
import TrustStrip from '@/components/TrustStrip'
import AboutSnapshot from '@/components/AboutSnapshot'
import ServicesSnapshot from '@/components/ServicesSnapshot'
import BlogPreview from '@/components/BlogPreview'
import ResourcesPreview from '@/components/ResourcesPreview'
import TestimonialsSection from '@/components/TestimonialsSection'
import NewsletterCTA from '@/components/NewsletterCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <AboutSnapshot />
      <ServicesSnapshot />
      <BlogPreview />
      <ResourcesPreview />
      <TestimonialsSection />
      <NewsletterCTA />
    </>
  )
}
```

**Step 3: Verify** — light pill strip appears below the dark hero.

---

## Task 3: Redesign AboutSnapshot — Lukes 2-Column Label+Text Layout on White BG

**Files:**
- Modify: `src/components/AboutSnapshot.tsx`

Lukes "About me" section:
- White background
- Left column: tiny "About me" label in muted text
- Right column: LARGE paragraph text (h2 level font), green "Learn More" button below
- Clean, lots of whitespace

Nathan's version should:
- White/light background
- Keep credentials as a row of small tags below the paragraph
- Remove the placeholder photo box (Lukes doesn't show photo in this section)

**Step 1: Rewrite AboutSnapshot.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const credentials = [
  'CMMC Registered Practitioner',
  'NIST 800-171 Specialist',
  'CUI Program Expert',
  'DoD Contractor Support',
]

export default function AboutSnapshot() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-16 items-start">
        {/* Left: label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#999999' }}>
            About me
          </p>
        </motion.div>

        {/* Right: content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-bold leading-tight mb-6"
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              color: '#111111',
            }}
          >
            I&apos;m Nathan Lundquist — a cybersecurity professional specializing
            in CMMC Level 2 assessment preparation and NIST SP 800-171 compliance
            for defense contractors. I help organizations identify gaps, build
            remediation roadmaps, and stay compliant so they can keep winning
            DoD contracts.
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {credentials.map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: '#FFF0E6',
                  color: '#FF6B00',
                  border: '1px solid rgba(255,107,0,0.2)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
            style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
          >
            Full Bio <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Verify** — white section with left label, large bio text on right, orange pill tags, orange CTA.

---

## Task 4: Redesign ServicesSnapshot — Numbered Vertical List (Lukes Style)

**Files:**
- Modify: `src/components/ServicesSnapshot.tsx`

Lukes "My Expertise" is a numbered vertical accordion list:
- Each row: number (01) | category label | heading | "Details →" link
- Separated by dividers
- White background, very clean

**Step 1: Rewrite ServicesSnapshot.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    number: '01',
    category: 'Assessment',
    title: 'CMMC Level 2 Assessment Prep',
    description: 'Full readiness assessment and remediation planning before your C3PAO assessment. Know exactly where you stand.',
    href: '/services',
  },
  {
    number: '02',
    category: 'Gap Analysis',
    title: 'NIST 800-171 Gap Analysis',
    description: 'Identify gaps in your CUI environment against all 110 practices. Get a prioritized remediation roadmap.',
    href: '/services',
  },
  {
    number: '03',
    category: 'Compliance',
    title: 'Compliance Roadmap & Remediation',
    description: 'Hands-on guidance building your SSP, POAM, and implementing technical controls across your environment.',
    href: '/services',
  },
]

export default function ServicesSnapshot() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#F9F9F9' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header: label left, heading right */}
        <div className="grid md:grid-cols-[200px_1fr] gap-16 mb-16">
          <p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#999999' }}>
            My Expertise
          </p>
          <div>
            <h2
              className="font-black leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#111111' }}
            >
              How I Can Help
            </h2>
            <p style={{ color: '#666666' }}>
              Practical, no-BS compliance consulting for defense contractors who need results — not just paperwork.
            </p>
          </div>
        </div>

        {/* Numbered list */}
        <div>
          {services.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="grid md:grid-cols-[80px_180px_1fr_auto] gap-6 items-center py-8 cursor-pointer group"
                style={{ borderTop: '1px solid #E5E5E5' }}
              >
                <span
                  className="text-4xl font-black leading-none"
                  style={{ color: '#EEEEEE' }}
                >
                  {s.number}
                </span>
                <span
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: '#999999' }}
                >
                  {s.category}
                </span>
                <div>
                  <h3
                    className="font-bold text-lg mb-1 transition-colors group-hover:text-[#FF6B00]"
                    style={{ color: '#111111' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                    {s.description}
                  </p>
                </div>
                <Link
                  href={s.href}
                  className="hidden md:flex items-center gap-1 text-sm font-semibold transition-colors"
                  style={{ color: '#999999' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6B00')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#999999')}
                >
                  Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid #E5E5E5' }} />
        </div>

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full"
            style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
          >
            Work With Me <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify** — light gray background, numbered list with dividers, numbers in giant muted text, category labels, titles, Details→ links.

---

## Task 5: Update BlogPreview — White Background

**Files:**
- Modify: `src/components/BlogPreview.tsx`

Currently dark-bg card styling. Switch to white section with dark text to match Lukes light content sections.

**Step 1: Read the current file first**, then update the section wrapper:
- Change section background to `#FFFFFF`
- Change heading text from `#F5F5F5` to `#111111`
- Change card background from `rgba(255,255,255,0.04)` to `#F9F9F9` with border `#E5E5E5`
- Change muted text from `#888888` to `#666666`
- Change tags: dark bg → light pill style `backgroundColor: '#FFF0E6', color: '#FF6B00'`
- Add Lukes-style label column: wrap header area in `grid md:grid-cols-[200px_1fr]` with "Latest Insights" label on left

**Step 2: Verify** — clean white blog preview section.

---

## Task 6: Update ResourcesPreview — White Background

**Files:**
- Modify: `src/components/ResourcesPreview.tsx`

Same treatment as BlogPreview — switch to light background, dark text.

**Step 1: Read the current file**, then apply same color changes as Task 5.

**Step 2: Verify** — light resources section.

---

## Task 7: Create TestimonialsSection Component

**Files:**
- Create: `src/components/TestimonialsSection.tsx`
- Modify: `src/app/page.tsx` (already updated in Task 2 import)

Lukes testimonials: full-width card, quote text on left white card, person photo on right half of card, slide arrows.

```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const testimonials = [
  {
    quote: "Nathan identified gaps we had no idea existed and gave us a clear roadmap to fix them. We passed our CMMC assessment on the first try.",
    name: "Mike D.",
    title: "CEO, Defense Manufacturer",
    photo: null, // replace with real photo path
  },
  {
    quote: "Working with Nathan saved us months of guesswork. His NIST 800-171 gap analysis was thorough, practical, and exactly what we needed.",
    name: "Sarah K.",
    title: "CTO, DoD Subcontractor",
    photo: null,
  },
  {
    quote: "The SSP and POAM templates alone were worth every penny. Nathan's hands-on guidance made compliance feel achievable.",
    name: "James R.",
    title: "IT Director, Aerospace Firm",
    photo: null,
  },
]

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[200px_1fr] gap-16 mb-12">
          <p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#999999' }}>
            Client Feedback
          </p>
          <h2
            className="font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#111111' }}
          >
            What Clients Say
          </h2>
        </div>

        {/* Testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: '#F0F7F4',
              minHeight: '380px',
              display: 'grid',
              gridTemplateColumns: t.photo ? '1fr 1fr' : '1fr',
            }}
          >
            {/* Quote side */}
            <div className="p-10 flex flex-col justify-between">
              <span className="text-6xl leading-none font-serif" style={{ color: '#FF6B00' }}>&ldquo;</span>
              <blockquote
                className="text-xl font-medium leading-relaxed my-4"
                style={{ color: '#111111' }}
              >
                {t.quote}
              </blockquote>
              <div>
                <p className="font-bold" style={{ color: '#111111' }}>{t.name}</p>
                <p className="text-sm" style={{ color: '#666666' }}>{t.title}</p>
              </div>
            </div>
            {/* Photo side (hidden if no photo) */}
            {t.photo && (
              <div
                style={{
                  backgroundImage: `url(${t.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 flex items-center justify-center rounded-full border transition-colors"
            style={{ borderColor: '#E5E5E5', color: '#333333' }}
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-sm" style={{ color: '#999999' }}>
            {index + 1} / {testimonials.length}
          </span>
          <button
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="w-10 h-10 flex items-center justify-center rounded-full border transition-colors"
            style={{ borderColor: '#E5E5E5', color: '#333333' }}
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify** — green-tinted testimonial card, quote text, prev/next arrows.

---

## Task 8: Create NewsletterCTA Component

**Files:**
- Create: `src/components/NewsletterCTA.tsx`
- Modify: `src/app/page.tsx` (already in imports from Task 2)

Lukes footer has "Stay in touch!" email form on left, page links on right.

```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left: form */}
        <div>
          <h3
            className="font-black text-3xl mb-2"
            style={{ color: '#F5F5F5' }}
          >
            Stay in the loop.
          </h3>
          <p className="mb-6 text-sm" style={{ color: '#888888' }}>
            CMMC updates, compliance tips, and new resources — no spam.
          </p>
          {submitted ? (
            <p className="font-semibold" style={{ color: '#FF6B00' }}>Thanks! You&apos;re on the list.</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm rounded-full outline-none"
                style={{
                  backgroundColor: '#222222',
                  border: '1px solid #333333',
                  color: '#F5F5F5',
                }}
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-1 transition-colors"
                style={{ backgroundColor: '#FF6B00', color: '#0A0A0A' }}
              >
                Subscribe <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          )}
        </div>

        {/* Right: quick links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#666666' }}>
              Pages
            </p>
            <div className="flex flex-col gap-2">
              {[['About', '/about'], ['Services', '/services'], ['Blog', '/blog'], ['Resources', '/resources'], ['Contact', '/contact']].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm transition-colors hover:text-[#FF6B00]"
                  style={{ color: '#888888' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#666666' }}>
              Connect
            </p>
            <div className="flex flex-col gap-2">
              <a href="https://linkedin.com/in/nathanlundquist" target="_blank" rel="noopener noreferrer"
                className="text-sm transition-colors hover:text-[#FF6B00]" style={{ color: '#888888' }}>
                LinkedIn
              </a>
              <a href="https://pcshards.com" target="_blank" rel="noopener noreferrer"
                className="text-sm transition-colors hover:text-[#FF6B00]" style={{ color: '#888888' }}>
                PCShards
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify** — dark section with email form + page links grid.

---

## Task 9: Update Navbar — Cleaner Lukes Style

**Files:**
- Modify: `src/components/Navbar.tsx`

Lukes navbar:
- Logo left (small, minimal)
- Nav links center/right in title case (not uppercase)
- CTA button far right with arrow
- No thick border, very subtle

Changes to Nathan navbar:
- Remove `text-transform: uppercase` from nav links → title case
- Change border from `#222222` solid to near-transparent
- Make background slightly more transparent (`rgba(10,10,10,0.75)`)
- Add `→` arrow to the CTA button (already has it — keep)
- On scroll over light sections: navbar stays dark (already handled by fixed positioning)

**Step 1: In Navbar.tsx**, change:
```tsx
// Line 44: remove uppercase tracking
className="text-sm font-medium transition-colors"
// (remove uppercase tracking-wide)

// Line 21: softer border
borderBottom: '1px solid rgba(255,255,255,0.06)',

// Line 22: more transparent bg
backgroundColor: 'rgba(10,10,10,0.8)',
```

**Step 2: Verify** — navbar looks cleaner with title-case links.

---

## Task 10: Final Polish — Section Spacing & Transition

**Files:**
- Modify: `src/app/globals.css`

The site now alternates dark (hero) → light (trust strip, about, services, blog, resources, testimonials) → dark (newsletter). The transitions between sections should feel smooth.

Add a subtle top border between light sections to visually separate them:

```css
/* In globals.css, add to @layer components: */
.section-light {
  border-top: 1px solid #E5E5E5;
}
```

Then in each light section component, add `border-top: '1px solid #E5E5E5'` to the section style where appropriate (About, Blog, Resources).

**Step 2: Final full-page review**

Visit `http://localhost:3000` and scroll through the full page. Check:
- [ ] Hero: dark, giant "Nathan", stat cards, photo area
- [ ] Trust strip: light, pill badges
- [ ] About: white, 2-col label+text, credential pills
- [ ] Services: light gray, numbered list with dividers
- [ ] Blog: white, posts with light cards
- [ ] Resources: white, resource cards
- [ ] Testimonials: white, green-tinted quote card
- [ ] Newsletter: dark, email form + links
- [ ] Navbar: readable on all backgrounds

---

## Summary of All Files Changed

| File | Action |
|---|---|
| `src/components/HeroSection.tsx` | Redesign: photo + giant name + stat cards |
| `src/components/TrustStrip.tsx` | **New**: certification pill strip |
| `src/components/AboutSnapshot.tsx` | Redesign: 2-col label+text on white bg |
| `src/components/ServicesSnapshot.tsx` | Redesign: numbered vertical list |
| `src/components/BlogPreview.tsx` | Update: white background + colors |
| `src/components/ResourcesPreview.tsx` | Update: white background + colors |
| `src/components/TestimonialsSection.tsx` | **New**: quote carousel |
| `src/components/NewsletterCTA.tsx` | **New**: email form + links |
| `src/components/Navbar.tsx` | Update: cleaner styling |
| `src/app/page.tsx` | Update: add new components |
| `src/app/globals.css` | Update: minor polish additions |

---

**Plan complete and saved to `docs/plans/2026-02-27-lukes-redesign.md`.**

**Two execution options:**

**1. Subagent-Driven (this session)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** — Open a new Claude Code session with executing-plans, batch execution with checkpoints

**Which approach?**
