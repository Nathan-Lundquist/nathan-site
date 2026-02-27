# Luke's Template Aesthetic Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild nathan-site's visual layer to match Luke's Webflow template — numbered service cards, SVG blobs, eyebrow labels, bolder type hierarchy, more whitespace — while keeping the dark/orange color scheme and frosted glass cards.

**Architecture:** Pure visual-layer swap. No routes, APIs, MDX content, or data layer changes. All 8 components + globals.css are rewritten in-place. Framer Motion is already installed. Build must pass (`npm run build`) after every task.

**Tech Stack:** Next.js 16, Tailwind v4 (CSS `@theme` blocks — no tailwind.config.ts), Framer Motion, TypeScript, Lucide React

---

## Task 1: globals.css — Design System Updates

**Files:**
- Modify: `src/app/globals.css`

**What changes:**
- Update `section-heading` font-size to `clamp(2rem, 5vw, 3.5rem)`
- Add `.eyebrow` utility class (monospace, orange, uppercase, tracking-widest)
- Add `.blob` utility class (absolute, pointer-events-none, orange fill with blur)
- Add `.nav-link` utility class with underline scale animation
- Keep all existing classes (`.card`, `.btn-primary`, `.btn-outline`, `.tag`, `.tag-accent`, `.accent-line`)

**Step 1: Edit globals.css**

Replace the `section-heading` rule and add new utilities at the end of `@layer components`:

```css
/* UPDATE existing section-heading (line 149-156) */
.section-heading {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: #F5F5F5;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

/* ADD after accent-line block */
.eyebrow {
  display: block;
  font-size: 0.75rem;
  font-family: var(--font-mono-var), monospace;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FF6B00;
  margin-bottom: 1rem;
}

.blob {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
  background: rgba(255, 107, 0, 0.07);
  filter: blur(100px);
}

.nav-link {
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #888888;
  transition: color 0.2s;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background-color: #FF6B00;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}
.nav-link:hover {
  color: #FF6B00;
}
.nav-link:hover::after {
  transform: scaleX(1);
}
```

**Step 2: Verify build passes**

```bash
cd /c/Users/whyme/nathan-site && npm run build
```
Expected: `✓ Compiled successfully` with 0 errors.

**Step 3: Commit**

```bash
cd /c/Users/whyme/nathan-site
git add src/app/globals.css
git commit -m "style: add eyebrow, blob, nav-link utilities to design system"
```

---

## Task 2: Navbar.tsx — Underline Hover Animation

**Files:**
- Modify: `src/components/Navbar.tsx`

**What changes:**
- Desktop nav links: replace inline `onMouseEnter`/`onMouseLeave` with `.nav-link` class
- Remove the `style={{ color: '#888888' }}` and event handlers from each link

**Step 1: Rewrite Navbar.tsx**

```tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Shield } from 'lucide-react'

const links = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 w-full z-50"
      style={{
        backgroundColor: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #222222',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-black text-lg tracking-tight"
          style={{ color: '#F5F5F5' }}
        >
          <Shield className="w-5 h-5" style={{ color: '#FF6B00' }} />
          <span>
            NATHAN<span style={{ color: '#FF6B00' }}>.</span>LUNDQUIST
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm py-2 px-4">
            Get a Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          style={{ color: '#F5F5F5' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-4 py-6 flex flex-col gap-4"
          style={{
            backgroundColor: '#111111',
            borderTop: '1px solid #222222',
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary text-sm w-fit"
            onClick={() => setOpen(false)}
          >
            Get a Consultation
          </Link>
        </div>
      )}
    </nav>
  )
}
```

**Step 2: Verify build**

```bash
cd /c/Users/whyme/nathan-site && npm run build
```
Expected: 0 errors.

**Step 3: Commit**

```bash
cd /c/Users/whyme/nathan-site
git add src/components/Navbar.tsx
git commit -m "style: add underline scale animation to nav links"
```

---

## Task 3: HeroSection.tsx — Left-Aligned Layout + Blob

**Files:**
- Modify: `src/components/HeroSection.tsx`

**What changes:**
- Remove centered layout (`justify-center`, `text-center`, `mx-auto` on inner div)
- Remove animated grid background
- Remove radial vignette
- Add floating SVG blob (top-right, orange, blur 120px) — CSS keyframe drift
- Add `// CMMC CONSULTANT` eyebrow label above headline
- Increase headline font-size to `clamp(3rem, 8vw, 6rem)`
- Change CTAs from `justify-center` to left-aligned

**Step 1: Add blob keyframe to globals.css**

At the end of the existing `@keyframes` blocks (after `bounceSlow`):

```css
@keyframes blobDrift {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-20px, 15px); }
  66% { transform: translate(20px, -10px); }
}
```

Also add to `@theme`:
```css
--animate-blob-drift: blobDrift 12s ease-in-out infinite;
```

**Step 2: Rewrite HeroSection.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Floating blob — top right */}
      <div
        className="blob hidden md:block"
        style={{
          width: '600px',
          height: '600px',
          top: '-100px',
          right: '-150px',
          animationName: 'blobDrift',
          animationDuration: '12s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-32 w-full">
        {/* Eyebrow */}
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          // CMMC CONSULTANT
        </motion.span>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-black tracking-tight mb-6 leading-none"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            color: '#F5F5F5',
            letterSpacing: '-0.03em',
          }}
        >
          CMMC &amp;{' '}
          <span style={{ color: '#FF6B00' }}>NIST 800-171</span>
          <br />
          Compliance Expert
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl max-w-xl mb-10 leading-relaxed"
          style={{ color: '#888888' }}
        >
          I help defense contractors achieve and maintain CMMC Level 2
          compliance — protecting CUI and keeping you in the contract game.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/contact" className="btn-primary text-base">
            Get a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/resources" className="btn-outline text-base">
            Free Resources
          </Link>
        </motion.div>

        {/* PCShards attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-sm"
          style={{ color: '#888888' }}
        >
          Consulting through{' '}
          <a
            href="https://pcshards.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline"
            style={{ color: '#FF6B00' }}
          >
            PCShards
          </a>
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="w-6 h-6" style={{ color: '#888888' }} />
      </motion.div>
    </section>
  )
}
```

**Step 3: Verify build**

```bash
cd /c/Users/whyme/nathan-site && npm run build
```
Expected: 0 errors.

**Step 4: Commit**

```bash
cd /c/Users/whyme/nathan-site
git add src/app/globals.css src/components/HeroSection.tsx
git commit -m "style: rebuild hero — left-aligned, blob, eyebrow, larger type"
```

---

## Task 4: ServicesSnapshot.tsx — Numbered Cards

**Files:**
- Modify: `src/components/ServicesSnapshot.tsx`

**What changes:**
- Add `01 / 02 / 03` as background number text (large, muted, `opacity: 0.07`)
- Add top orange accent bar (4px height, full width) to each card
- Remove lucide icons
- Add `→ Learn more` link to each card
- Replace `accent-line + section-heading` header with eyebrow + bigger heading
- Stagger entrance: numbers fade in with 0.1s delay per card

**Step 1: Rewrite ServicesSnapshot.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    num: '01',
    title: 'CMMC Level 2 Assessment Prep',
    description:
      'Full readiness assessment and remediation planning before your C3PAO assessment. Know exactly where you stand.',
    href: '/services',
  },
  {
    num: '02',
    title: 'NIST 800-171 Gap Analysis',
    description:
      'Identify gaps in your CUI environment against all 110 practices. Get a prioritized remediation roadmap.',
    href: '/services',
  },
  {
    num: '03',
    title: 'Compliance Roadmap & Remediation',
    description:
      'Hands-on guidance building your SSP, POAM, and implementing technical controls across your environment.',
    href: '/services',
  },
]

export default function ServicesSnapshot() {
  return (
    <section className="section" style={{ borderTop: '1px solid #222222' }}>
      <span className="eyebrow">// SERVICES</span>
      <h2 className="section-heading mb-4">How I Can Help</h2>
      <p className="mb-16 max-w-xl text-lg" style={{ color: '#888888' }}>
        Practical, no-BS compliance consulting for defense contractors who need
        results — not just paperwork.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-6 group relative overflow-hidden flex flex-col"
            style={{ transition: 'transform 0.2s ease, border-color 0.2s, background 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{ height: '3px', backgroundColor: '#FF6B00' }}
            />

            {/* Background number */}
            <span
              className="absolute top-4 right-4 font-black leading-none select-none"
              style={{
                fontSize: '5rem',
                color: '#F5F5F5',
                opacity: 0.07,
                lineHeight: 1,
              }}
            >
              {s.num}
            </span>

            <div className="relative z-10 flex flex-col flex-1 mt-4">
              <h3
                className="font-black text-xl mb-3 leading-snug transition-colors group-hover:text-[#FF6B00]"
                style={{ color: '#F5F5F5' }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#888888' }}>
                {s.description}
              </p>
              <Link
                href={s.href}
                className="inline-flex items-center gap-1 text-sm font-bold mt-6 transition-colors"
                style={{ color: '#FF6B00' }}
              >
                Learn more <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <Link href="/contact" className="btn-primary">
        Work With Me <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  )
}
```

**Step 2: Verify build**

```bash
cd /c/Users/whyme/nathan-site && npm run build
```
Expected: 0 errors.

**Step 3: Commit**

```bash
cd /c/Users/whyme/nathan-site
git add src/components/ServicesSnapshot.tsx
git commit -m "style: numbered service cards with accent bar and eyebrow"
```

---

## Task 5: AboutSnapshot.tsx — Stats + Bio Two-Column

**Files:**
- Modify: `src/components/AboutSnapshot.tsx`

**What changes:**
- Replace headshot placeholder with a bold stat block (left col): `12+` years, `CMMC RP` cert badge, `110` NIST practices
- Right col keeps bio paragraph + credentials tags + link
- Replace `accent-line + section-heading` with eyebrow + heading
- `py-32` spacing via `section` class (already handles this — just keep it)

**Step 1: Rewrite AboutSnapshot.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const stats = [
  { value: '12+', label: 'Years in Cybersecurity' },
  { value: '110', label: 'NIST 800-171 Practices' },
  { value: 'CMMC RP', label: 'Registered Practitioner' },
]

const credentials = [
  'CMMC Registered Practitioner',
  'NIST 800-171 Specialist',
  'CUI Program Expert',
  'DoD Contractor Support',
]

export default function AboutSnapshot() {
  return (
    <section className="section" style={{ borderTop: '1px solid #222222' }}>
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: Stats */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span
                className="block font-black leading-none"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: '#FF6B00',
                  letterSpacing: '-0.03em',
                }}
              >
                {s.value}
              </span>
              <span
                className="block text-sm font-mono uppercase tracking-widest mt-1"
                style={{ color: '#888888' }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: Bio */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">// ABOUT</span>
          <h2 className="section-heading mb-6">Who I Am</h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: '#888888' }}>
            I&apos;m Nathan Lundquist — a cybersecurity professional specializing
            in CMMC Level 2 assessment preparation and NIST SP 800-171
            compliance for defense contractors. Through PCShards, I help
            organizations identify gaps, build remediation roadmaps, and stay
            compliant so they can keep winning DoD contracts.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {credentials.map((c) => (
              <span key={c} className="tag-accent">
                {c}
              </span>
            ))}
          </div>
          <Link href="/about" className="btn-outline inline-flex items-center gap-2">
            Full Bio <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Verify build**

```bash
cd /c/Users/whyme/nathan-site && npm run build
```
Expected: 0 errors.

**Step 3: Commit**

```bash
cd /c/Users/whyme/nathan-site
git add src/components/AboutSnapshot.tsx
git commit -m "style: about section — stats block left, bio right, eyebrow label"
```

---

## Task 6: BlogPreview.tsx — Tag + Full-Width Cards

**Files:**
- Modify: `src/components/BlogPreview.tsx`

**What changes:**
- Replace 3-column grid with single-column stacked cards
- Add left-side `// BLOG` tag to each card
- Add `translateY(-4px)` hover lift
- Replace `accent-line` with eyebrow label

**Step 1: Rewrite BlogPreview.tsx**

```tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBlogPosts } from '@/lib/mdx'

export default function BlogPreview() {
  const posts = getBlogPosts().slice(0, 3)

  return (
    <section className="section" style={{ borderTop: '1px solid #222222' }}>
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="eyebrow">// INSIGHTS</span>
          <h2 className="section-heading">Latest Thinking</h2>
        </div>
        <Link
          href="/blog"
          className="font-bold text-sm flex items-center gap-1 hover:underline hidden md:flex"
          style={{ color: '#FF6B00' }}
        >
          All Posts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card p-6 group flex gap-6 items-start"
            style={{ display: 'flex', transition: 'transform 0.2s ease, border-color 0.2s, background 0.2s' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')}
          >
            <span
              className="shrink-0 font-mono text-xs font-bold uppercase tracking-widest pt-1"
              style={{ color: '#FF6B00' }}
            >
              // BLOG
            </span>
            <div className="flex-1 min-w-0">
              <h3
                className="font-black text-lg mb-1 leading-snug transition-colors group-hover:text-[#FF6B00]"
                style={{ color: '#F5F5F5' }}
              >
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
                {post.description}
              </p>
            </div>
            <span
              className="shrink-0 text-xs font-mono hidden md:block pt-1"
              style={{ color: '#555555' }}
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              })}
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/blog"
        className="md:hidden mt-6 inline-flex items-center gap-1 font-bold text-sm"
        style={{ color: '#FF6B00' }}
      >
        All Posts <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  )
}
```

**Step 2: Verify build**

```bash
cd /c/Users/whyme/nathan-site && npm run build
```
Expected: 0 errors.

**Step 3: Commit**

```bash
cd /c/Users/whyme/nathan-site
git add src/components/BlogPreview.tsx
git commit -m "style: blog preview — stacked cards with tag label and lift hover"
```

---

## Task 7: ResourcesPreview.tsx — Tag + Full-Width Cards

**Files:**
- Modify: `src/components/ResourcesPreview.tsx`

**What changes:**
- Same stacked-card layout as BlogPreview
- Left-side `// RESOURCE` tag
- Remove `backgroundColor: 'rgba(17,17,17,0.5)'` section tint (looks inconsistent now)
- Keep Download button

**Step 1: Rewrite ResourcesPreview.tsx**

```tsx
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { getResources } from '@/lib/mdx'

export default function ResourcesPreview() {
  const resources = getResources().slice(0, 3)

  return (
    <section className="section" style={{ borderTop: '1px solid #222222' }}>
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="eyebrow">// RESOURCES</span>
          <h2 className="section-heading">Free Downloads</h2>
        </div>
        <Link
          href="/resources"
          className="font-bold text-sm flex items-center gap-1 hover:underline hidden md:flex"
          style={{ color: '#FF6B00' }}
        >
          All Resources <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {resources.map((r) => (
          <div
            key={r.slug}
            className="card p-6 flex gap-6 items-start"
            style={{ transition: 'transform 0.2s ease, border-color 0.2s, background 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span
              className="shrink-0 font-mono text-xs font-bold uppercase tracking-widest pt-1"
              style={{ color: '#FF6B00' }}
            >
              // RESOURCE
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-lg mb-1" style={{ color: '#F5F5F5' }}>
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#888888' }}>
                {r.description}
              </p>
              {r.fileUrl && (
                <a
                  href={r.fileUrl}
                  download
                  className="btn-outline text-sm py-2 inline-flex items-center gap-2 w-fit"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              )}
            </div>
            <span className="tag-accent shrink-0">{r.free ? 'FREE' : 'PREMIUM'}</span>
          </div>
        ))}
      </div>

      <Link
        href="/resources"
        className="md:hidden mt-6 inline-flex items-center gap-1 font-bold text-sm"
        style={{ color: '#FF6B00' }}
      >
        All Resources <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  )
}
```

**Step 2: Verify build**

```bash
cd /c/Users/whyme/nathan-site && npm run build
```
Expected: 0 errors.

**Step 3: Commit**

```bash
cd /c/Users/whyme/nathan-site
git add src/components/ResourcesPreview.tsx
git commit -m "style: resources preview — stacked cards with tag label"
```

---

## Task 8: Footer.tsx — Simplified Two-Column

**Files:**
- Modify: `src/components/Footer.tsx`

**What changes:**
- Keep existing structure but simplify to two columns: brand left, nav + social right
- No changes to links or social icons — just tighter layout
- This is already close to the design; minor spacing cleanup only

No structural rewrite needed — existing Footer already matches the two-column spec. Skip if the current footer looks good after the other changes land.

If footer needs cleanup, just adjust spacing: change `py-12` to `py-10` and remove the verbose "Navigation" / "Connect" section headers if they feel heavy.

**Commit if changes made:**

```bash
cd /c/Users/whyme/nathan-site
git add src/components/Footer.tsx
git commit -m "style: footer spacing cleanup"
```

---

## Task 9: page.tsx — Homepage Assembly

**Files:**
- Modify: `src/app/page.tsx`

**What changes:**
- Verify import order is: HeroSection, ServicesSnapshot, AboutSnapshot, BlogPreview, ResourcesPreview
- No layout changes needed — all sections already render in sequence

**Step 1: Read current page.tsx**

Read `src/app/page.tsx` to confirm component order. If the order is already correct, no change is needed.

**Step 2: Final build + visual check**

```bash
cd /c/Users/whyme/nathan-site && npm run build
```
Expected: All 13 pages compile, 0 errors.

Then start dev server and visually verify at http://localhost:3000:

```bash
cd /c/Users/whyme/nathan-site && npm run dev
```

Check: hero left-aligned with blob, numbered service cards, stats about section, stacked blog/resource cards, nav underline hover.

**Step 3: Final commit**

```bash
cd /c/Users/whyme/nathan-site
git add -A
git commit -m "feat: complete Luke's template aesthetic redesign"
git push
```

---

## Summary

| Task | Component | Key Change |
|---|---|---|
| 1 | globals.css | Eyebrow, blob, nav-link utilities |
| 2 | Navbar | Underline scale hover animation |
| 3 | HeroSection | Left-aligned, blob, eyebrow, larger type |
| 4 | ServicesSnapshot | Numbered cards, accent bar |
| 5 | AboutSnapshot | Stats block left, bio right |
| 6 | BlogPreview | Stacked cards with `// BLOG` tag |
| 7 | ResourcesPreview | Stacked cards with `// RESOURCE` tag |
| 8 | Footer | Minor spacing cleanup (optional) |
| 9 | page.tsx | Verify assembly + final build |
