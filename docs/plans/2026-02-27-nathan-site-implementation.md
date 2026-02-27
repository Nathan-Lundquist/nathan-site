# Nathan Lundquist Personal Site — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bold, modern personal brand site for Nathan Lundquist that drives CMMC/NIST consulting leads to PCShards.

**Architecture:** Next.js 14 App Router with MDX content files, Tailwind CSS for styling, Framer Motion for animations, and Resend for contact form email delivery. All content (blog posts, resources) lives as MDX files in `/content/` — no CMS needed.

**Tech Stack:** Next.js 14, Tailwind CSS, MDX (next-mdx-remote), Framer Motion, React Hook Form, Resend, Lucide React, Vercel Analytics

---

## Task 1: Scaffold the Project

**Files:**
- Create: `C:/Users/whyme/nathan-site/` (project root)

**Step 1: Initialize Next.js project**

```bash
cd C:/Users/whyme
npx create-next-app@latest nathan-site --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd nathan-site
```

**Step 2: Install dependencies**

```bash
npm install framer-motion next-mdx-remote gray-matter lucide-react react-hook-form @hookform/resolvers zod resend
npm install -D @tailwindcss/typography
```

**Step 3: Initialize git and commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 14 project with dependencies"
```

---

## Task 2: Design System — Tailwind Config & CSS Variables

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

**Step 1: Update tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#111111',
        accent: '#FF6B00',
        'accent-hover': '#FF8C33',
        'text-primary': '#F5F5F5',
        'text-muted': '#888888',
        border: '#222222',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'grid-fade': 'gridFade 8s ease-in-out infinite',
      },
      keyframes: {
        gridFade: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
```

**Step 2: Update globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg: #0A0A0A;
    --surface: #111111;
    --accent: #FF6B00;
    --text: #F5F5F5;
    --muted: #888888;
    --border: #222222;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg text-text-primary antialiased;
  }

  ::selection {
    @apply bg-accent text-bg;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    @apply bg-bg;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-border rounded-full;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-accent;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-bg font-bold px-6 py-3 transition-all duration-200 hover:scale-105 active:scale-95;
  }

  .btn-outline {
    @apply inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-bg font-bold px-6 py-3 transition-all duration-200;
  }

  .card {
    @apply bg-surface border border-border hover:border-accent transition-colors duration-200;
  }

  .tag {
    @apply inline-block text-xs font-mono font-bold px-2 py-1 bg-border text-text-muted uppercase tracking-wider;
  }

  .tag-accent {
    @apply inline-block text-xs font-mono font-bold px-2 py-1 bg-accent text-bg uppercase tracking-wider;
  }

  .section {
    @apply py-20 px-4 max-w-6xl mx-auto;
  }

  .section-heading {
    @apply text-4xl md:text-5xl font-black text-text-primary mb-4 tracking-tight;
  }

  .accent-line {
    @apply block w-12 h-1 bg-accent mb-8;
  }
}
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add design system — tailwind config and CSS variables"
```

---

## Task 3: Layout — Navbar & Footer Components

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create Navbar.tsx**

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
    <nav className="fixed top-0 w-full z-50 bg-bg/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight">
          <Shield className="w-5 h-5 text-accent" />
          <span>NATHAN<span className="text-accent">.</span>LUNDQUIST</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="text-text-muted hover:text-accent font-medium transition-colors text-sm tracking-wide uppercase">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm py-2 px-4">
            Get a Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-text-primary" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-t border-border px-4 py-6 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="text-text-muted hover:text-accent font-medium uppercase text-sm tracking-wide"
              onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm w-fit" onClick={() => setOpen(false)}>
            Get a Consultation
          </Link>
        </div>
      )}
    </nav>
  )
}
```

**Step 2: Create Footer.tsx**

```tsx
import Link from 'next/link'
import { Shield, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 font-black text-lg mb-2">
              <Shield className="w-5 h-5 text-accent" />
              <span>NATHAN<span className="text-accent">.</span>LUNDQUIST</span>
            </div>
            <p className="text-text-muted text-sm max-w-xs">
              CMMC L2 & NIST 800-171 compliance consultant. Helping organizations protect CUI and achieve compliance.
            </p>
            <div className="flex items-center gap-1 mt-3 text-text-muted text-sm">
              <span>Consulting via</span>
              <a href="https://pcshards.com" target="_blank" rel="noopener noreferrer"
                className="text-accent hover:underline font-bold">PCShards</a>
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="font-bold text-xs uppercase tracking-widest text-text-muted mb-4">Navigation</p>
              {['/about', '/services', '/blog', '/resources', '/contact'].map(href => (
                <Link key={href} href={href}
                  className="block text-text-muted hover:text-accent text-sm capitalize mb-2 transition-colors">
                  {href.replace('/', '')}
                </Link>
              ))}
            </div>
            <div>
              <p className="font-bold text-xs uppercase tracking-widest text-text-muted mb-4">Connect</p>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted hover:text-accent text-sm mb-2 transition-colors">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href="https://github.com/Nathan-Lundquist" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted hover:text-accent text-sm transition-colors">
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-2 text-text-muted text-xs">
          <p>© {new Date().getFullYear()} Nathan Lundquist. All rights reserved.</p>
          <p>Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  )
}
```

**Step 3: Update layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Nathan Lundquist — CMMC & NIST 800-171 Consultant',
  description: 'CMMC Level 2 and NIST 800-171 compliance consulting. Helping defense contractors protect CUI and achieve compliance through PCShards.',
  openGraph: {
    title: 'Nathan Lundquist — CMMC & NIST 800-171 Consultant',
    description: 'Cybersecurity compliance consulting for defense contractors.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add navbar and footer layout components"
```

---

## Task 4: MDX Content Setup

**Files:**
- Create: `src/lib/mdx.ts`
- Create: `content/blog/2026-02-27-cmmc-level-2-overview.mdx`
- Create: `content/blog/2026-02-27-nist-800-171-gap-analysis.mdx`
- Create: `content/resources/cmmc-l2-checklist.mdx`
- Create: `public/downloads/.gitkeep`

**Step 1: Create MDX utility library**

```typescript
// src/lib/mdx.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  coverImage?: string
  content: string
}

export interface Resource {
  slug: string
  title: string
  description: string
  category: string
  fileUrl?: string
  free: boolean
  content: string
}

export function getBlogPosts(): BlogPost[] {
  const dir = path.join(contentDir, 'blog')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug: file.replace('.mdx', ''),
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        coverImage: data.coverImage,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPost | null {
  const file = path.join(contentDir, 'blog', `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  return { slug, title: data.title, date: data.date, description: data.description, tags: data.tags || [], content }
}

export function getResources(): Resource[] {
  const dir = path.join(contentDir, 'resources')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug: file.replace('.mdx', ''),
      title: data.title,
      description: data.description,
      category: data.category,
      fileUrl: data.fileUrl,
      free: data.free ?? true,
      content,
    }
  })
}
```

**Step 2: Create sample blog posts**

```mdx
---
title: "CMMC Level 2: What Defense Contractors Need to Know in 2026"
date: "2026-02-27"
description: "A practical breakdown of CMMC Level 2 requirements, the assessment process, and how to prepare your organization."
tags: ["CMMC", "Compliance", "DoD"]
---

CMMC Level 2 aligns with NIST SP 800-171 and covers 110 practices across 14 domains...
```

```mdx
---
title: "How to Conduct a NIST 800-171 Gap Analysis"
date: "2026-02-20"
description: "Step-by-step guide to identifying compliance gaps in your CUI environment against NIST 800-171 Rev 2."
tags: ["NIST", "Gap Analysis", "CUI"]
---

A gap analysis is the first step toward CMMC compliance...
```

**Step 3: Create sample resource**

```mdx
---
title: "CMMC Level 2 Readiness Checklist"
description: "A comprehensive checklist covering all 110 NIST 800-171 practices mapped to CMMC Level 2 domains."
category: "CMMC"
fileUrl: "/downloads/cmmc-l2-checklist.pdf"
free: true
---

Use this checklist to assess your current compliance posture...
```

**Step 4: Create content directories and commit**

```bash
mkdir -p content/blog content/resources public/downloads
git add .
git commit -m "feat: add MDX content library and sample content"
```

---

## Task 5: Homepage — Hero Section

**Files:**
- Create: `src/components/HeroSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create HeroSection.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A0A0A_100%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-surface border border-accent/30 px-4 py-2 mb-8 text-accent text-xs font-mono uppercase tracking-widest"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          Available for Consulting Engagements
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-none"
        >
          CMMC &{' '}
          <span className="text-accent">NIST 800-171</span>
          <br />
          Compliance Expert
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I help defense contractors achieve and maintain CMMC Level 2 compliance —
          protecting CUI and keeping you in the contract game.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact" className="btn-primary text-base">
            Get a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/resources" className="btn-outline text-base">
            Free Resources
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-text-muted text-sm"
        >
          Consulting through{' '}
          <a href="https://pcshards.com" target="_blank" rel="noopener noreferrer"
            className="text-accent hover:underline font-bold">PCShards</a>
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="w-6 h-6 text-text-muted" />
      </motion.div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add hero section with animated grid and CTAs"
```

---

## Task 6: Homepage — About Snapshot, Services & Blog Preview

**Files:**
- Create: `src/components/AboutSnapshot.tsx`
- Create: `src/components/ServicesSnapshot.tsx`
- Create: `src/components/BlogPreview.tsx`
- Create: `src/components/ResourcesPreview.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create AboutSnapshot.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Award } from 'lucide-react'

const credentials = ['CMMC RP', 'NIST 800-171', 'CUI Compliance', 'DoD Contractor Support']

export default function AboutSnapshot() {
  return (
    <section className="section border-t border-border">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Image placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square max-w-sm bg-surface border border-border flex items-center justify-center text-text-muted">
            <div className="text-center">
              <div className="w-24 h-24 bg-border rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-black text-accent">NL</span>
              </div>
              <p className="text-sm font-mono">headshot.jpg</p>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-accent text-bg p-4 font-black text-sm">
            10+ Years<br />in Cybersecurity
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="accent-line" />
          <h2 className="section-heading">Who I Am</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            I'm Nathan Lundquist — a cybersecurity professional specializing in CMMC Level 2
            assessment preparation and NIST SP 800-171 compliance for defense contractors.
            Through my company PCShards, I help organizations identify gaps, build remediation
            roadmaps, and stay compliant so they can keep winning DoD contracts.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {credentials.map(c => (
              <span key={c} className="flex items-center gap-1 tag-accent">
                <Award className="w-3 h-3" /> {c}
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

**Step 2: Create ServicesSnapshot.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ClipboardCheck, Search, Map, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: ClipboardCheck,
    title: 'CMMC Level 2 Assessment Prep',
    description: 'Full readiness assessment and remediation planning before your C3PAO assessment. Know exactly where you stand.',
  },
  {
    icon: Search,
    title: 'NIST 800-171 Gap Analysis',
    description: 'Identify gaps in your CUI environment against all 110 practices. Get a prioritized remediation roadmap.',
  },
  {
    icon: Map,
    title: 'Compliance Roadmap & Remediation',
    description: 'Hands-on guidance building your SSP, POAM, and implementing technical controls across your environment.',
  },
]

export default function ServicesSnapshot() {
  return (
    <section className="section border-t border-border">
      <span className="accent-line" />
      <h2 className="section-heading">How I Can Help</h2>
      <p className="text-text-muted mb-12 max-w-xl">
        Practical, no-BS compliance consulting for defense contractors who need results — not just paperwork.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-6 group"
          >
            <s.icon className="w-8 h-8 text-accent mb-4" />
            <h3 className="font-black text-lg mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{s.description}</p>
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

**Step 3: Create BlogPreview.tsx**

```tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBlogPosts } from '@/lib/mdx'

export default function BlogPreview() {
  const posts = getBlogPosts().slice(0, 3)

  return (
    <section className="section border-t border-border">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="accent-line" />
          <h2 className="section-heading">Latest Insights</h2>
        </div>
        <Link href="/blog" className="text-accent hover:underline font-bold text-sm flex items-center gap-1">
          All Posts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 group block">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
            <h3 className="font-black text-lg mb-2 group-hover:text-accent transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">{post.description}</p>
            <p className="text-text-muted text-xs font-mono">{new Date(post.date).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

**Step 4: Create ResourcesPreview.tsx**

```tsx
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { getResources } from '@/lib/mdx'

export default function ResourcesPreview() {
  const resources = getResources().slice(0, 3)

  return (
    <section className="section border-t border-border bg-surface/50">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="accent-line" />
          <h2 className="section-heading">Free Resources</h2>
        </div>
        <Link href="/resources" className="text-accent hover:underline font-bold text-sm flex items-center gap-1">
          All Resources <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {resources.map(r => (
          <div key={r.slug} className="card p-6">
            <span className="tag-accent mb-4 block w-fit">{r.free ? 'FREE' : 'PREMIUM'}</span>
            <h3 className="font-black text-lg mb-2">{r.title}</h3>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">{r.description}</p>
            {r.fileUrl && (
              <a href={r.fileUrl} download className="btn-outline text-sm py-2 inline-flex items-center gap-2">
                <Download className="w-4 h-4" /> Download
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
```

**Step 5: Assemble page.tsx**

```tsx
import HeroSection from '@/components/HeroSection'
import AboutSnapshot from '@/components/AboutSnapshot'
import ServicesSnapshot from '@/components/ServicesSnapshot'
import BlogPreview from '@/components/BlogPreview'
import ResourcesPreview from '@/components/ResourcesPreview'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSnapshot />
      <ServicesSnapshot />
      <BlogPreview />
      <ResourcesPreview />
    </>
  )
}
```

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add homepage sections — about, services, blog, resources"
```

---

## Task 7: Inner Pages — About, Services, Blog, Resources, Contact

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/services/page.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/app/resources/page.tsx`
- Create: `src/app/contact/page.tsx`

**Step 1: About page**

```tsx
// src/app/about/page.tsx
import { Award, Shield, BookOpen } from 'lucide-react'

const certifications = [
  'CMMC Registered Practitioner (RP)',
  'NIST SP 800-171 Implementation',
  'CUI Program Specialist',
  'DoD Contractor Compliance',
]

export default function AboutPage() {
  return (
    <div className="section pt-24">
      <span className="accent-line" />
      <h1 className="section-heading">About Nathan</h1>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6 text-text-muted leading-relaxed">
          <p>
            I'm Nathan Lundquist — a cybersecurity professional with over a decade of experience
            helping organizations protect sensitive information and navigate complex compliance frameworks.
          </p>
          <p>
            I specialize in CMMC Level 2 assessment preparation and NIST SP 800-171 compliance
            for defense contractors and organizations handling Controlled Unclassified Information (CUI).
            Through my company PCShards, I provide hands-on consulting that goes beyond checklists —
            I help you understand what compliance means for your specific environment and build
            sustainable security practices.
          </p>
          <p>
            My approach is direct and practical. I've seen too many organizations fail assessments
            because they focused on paperwork instead of actual security posture. I help you get both right.
          </p>
        </div>
        <div>
          <h2 className="font-black text-xl mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" /> Credentials
          </h2>
          <ul className="space-y-3">
            {certifications.map(c => (
              <li key={c} className="flex items-start gap-2 text-sm text-text-muted">
                <Shield className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Services page**

```tsx
// src/app/services/page.tsx
import Link from 'next/link'
import { ClipboardCheck, Search, Map, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: ClipboardCheck,
    title: 'CMMC Level 2 Assessment Prep',
    description: 'End-to-end readiness support before your C3PAO assessment. Includes mock assessment, gap remediation, SSP review, and POAM development.',
    deliverables: ['Gap Assessment Report', 'SSP Review & Updates', 'POAM Development', 'Evidence Package Prep'],
  },
  {
    icon: Search,
    title: 'NIST 800-171 Gap Analysis',
    description: 'Comprehensive analysis of your current security practices against all 110 NIST 800-171 Rev 2 requirements.',
    deliverables: ['Gap Analysis Report', 'Risk Scoring', 'Prioritized Remediation Plan', 'Executive Summary'],
  },
  {
    icon: Map,
    title: 'Compliance Roadmap & Remediation',
    description: 'Ongoing compliance support including technical control implementation guidance, policy development, and staff training.',
    deliverables: ['Compliance Roadmap', 'Policy Templates', 'Technical Implementation Guide', 'Training Materials'],
  },
]

export default function ServicesPage() {
  return (
    <div className="section pt-24">
      <span className="accent-line" />
      <h1 className="section-heading">Services</h1>
      <p className="text-text-muted max-w-2xl mb-16 leading-relaxed">
        All consulting engagements are delivered through <a href="https://pcshards.com"
        className="text-accent hover:underline font-bold" target="_blank" rel="noopener noreferrer">PCShards</a>.
      </p>
      <div className="space-y-6 mb-16">
        {services.map(s => (
          <div key={s.title} className="card p-8">
            <div className="flex items-start gap-6">
              <s.icon className="w-10 h-10 text-accent shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="font-black text-2xl mb-3">{s.title}</h2>
                <p className="text-text-muted leading-relaxed mb-6">{s.description}</p>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3">Deliverables</p>
                  <div className="flex flex-wrap gap-2">
                    {s.deliverables.map(d => <span key={d} className="tag">{d}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card p-8 text-center">
        <h2 className="font-black text-2xl mb-4">Ready to Get Compliant?</h2>
        <p className="text-text-muted mb-6">Let's discuss your environment and build a plan that works.</p>
        <Link href="/contact" className="btn-primary">
          Schedule a Consultation <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
```

**Step 3: Blog listing page**

```tsx
// src/app/blog/page.tsx
import Link from 'next/link'
import { getBlogPosts } from '@/lib/mdx'

export default function BlogPage() {
  const posts = getBlogPosts()
  return (
    <div className="section pt-24">
      <span className="accent-line" />
      <h1 className="section-heading">Blog</h1>
      <p className="text-text-muted mb-12">CMMC news, NIST guidance, and cybersecurity insights.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 group block">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
            <h2 className="font-black text-xl mb-2 group-hover:text-accent transition-colors">{post.title}</h2>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">{post.description}</p>
            <p className="text-text-muted text-xs font-mono">{new Date(post.date).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

**Step 4: Blog post page**

```tsx
// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPost, getBlogPosts } from '@/lib/mdx'

export async function generateStaticParams() {
  return getBlogPosts().map(p => ({ slug: p.slug }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()
  return (
    <div className="section pt-24 max-w-3xl">
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>
      <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{post.title}</h1>
      <p className="text-text-muted font-mono text-sm mb-12">{new Date(post.date).toLocaleDateString()}</p>
      <article className="prose prose-invert prose-orange max-w-none">
        <MDXRemote source={post.content} />
      </article>
    </div>
  )
}
```

**Step 5: Resources page**

```tsx
// src/app/resources/page.tsx
import { Download } from 'lucide-react'
import { getResources } from '@/lib/mdx'

export default function ResourcesPage() {
  const resources = getResources()
  return (
    <div className="section pt-24">
      <span className="accent-line" />
      <h1 className="section-heading">Resources</h1>
      <p className="text-text-muted mb-12">Free guides, checklists, and templates for CMMC and NIST compliance.</p>
      <div className="grid md:grid-cols-3 gap-6">
        {resources.map(r => (
          <div key={r.slug} className="card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="tag">{r.category}</span>
              <span className="tag-accent">{r.free ? 'FREE' : 'PREMIUM'}</span>
            </div>
            <h2 className="font-black text-xl mb-2">{r.title}</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">{r.description}</p>
            {r.fileUrl && (
              <a href={r.fileUrl} download className="btn-primary text-sm justify-center">
                <Download className="w-4 h-4" /> Download Free
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add about, services, blog, and resources pages"
```

---

## Task 8: Contact Page with Resend Form

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/app/api/contact/route.ts`
- Add to `.env.local`: `RESEND_API_KEY=your_key_here`

**Step 1: Create API route**

```typescript
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, company, message, service } = await req.json()

  try {
    await resend.emails.send({
      from: 'Contact Form <noreply@yourdomain.com>',
      to: 'nathan@pcshards.com',
      subject: `New Consultation Request — ${service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
```

**Step 2: Create Contact page**

```tsx
// src/app/contact/page.tsx
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, ArrowRight, CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  service: string
  message: string
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSubmitted(true)
  }

  return (
    <div className="section pt-24">
      <span className="accent-line" />
      <h1 className="section-heading">Get a Consultation</h1>
      <div className="grid md:grid-cols-3 gap-16">
        <div className="md:col-span-2">
          {submitted ? (
            <div className="card p-12 text-center">
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="font-black text-2xl mb-2">Message Received</h2>
              <p className="text-text-muted">I'll be in touch within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Name *</label>
                  <input {...register('name', { required: true })}
                    className="w-full bg-surface border border-border focus:border-accent outline-none px-4 py-3 text-text-primary transition-colors" />
                  {errors.name && <p className="text-accent text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email *</label>
                  <input type="email" {...register('email', { required: true })}
                    className="w-full bg-surface border border-border focus:border-accent outline-none px-4 py-3 text-text-primary transition-colors" />
                  {errors.email && <p className="text-accent text-xs mt-1">Required</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Company</label>
                <input {...register('company')}
                  className="w-full bg-surface border border-border focus:border-accent outline-none px-4 py-3 text-text-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Service Needed *</label>
                <select {...register('service', { required: true })}
                  className="w-full bg-surface border border-border focus:border-accent outline-none px-4 py-3 text-text-primary transition-colors">
                  <option value="">Select a service</option>
                  <option value="CMMC Level 2 Assessment Prep">CMMC Level 2 Assessment Prep</option>
                  <option value="NIST 800-171 Gap Analysis">NIST 800-171 Gap Analysis</option>
                  <option value="Compliance Roadmap & Remediation">Compliance Roadmap & Remediation</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Message *</label>
                <textarea {...register('message', { required: true })} rows={5}
                  placeholder="Tell me about your environment, current challenges, and timeline..."
                  className="w-full bg-surface border border-border focus:border-accent outline-none px-4 py-3 text-text-primary transition-colors resize-none" />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
                {isSubmitting ? 'Sending...' : <><span>Send Message</span> <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="font-black text-xl mb-4">Contact Info</h2>
            <div className="space-y-3 text-text-muted text-sm">
              <a href="mailto:nathan@pcshards.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 text-accent" /> nathan@pcshards.com
              </a>
            </div>
          </div>
          <div className="card p-6">
            <h3 className="font-black mb-2">Response Time</h3>
            <p className="text-text-muted text-sm">I respond to all inquiries within 1 business day.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add contact page with Resend email integration"
```

---

## Task 9: GitHub Repo & Vercel Deployment

**Step 1: Create GitHub repo**

```bash
cd C:/Users/whyme/nathan-site
gh repo create nathan-site --public --source=. --remote=origin --push
```

**Step 2: Deploy to Vercel**

```bash
npm install -g vercel
vercel --yes
```

Follow prompts — link to your Vercel account. Add env var `RESEND_API_KEY` in Vercel dashboard → Settings → Environment Variables.

**Step 3: Add Vercel Analytics**

```bash
npm install @vercel/analytics
```

In `layout.tsx`, add:
```tsx
import { Analytics } from '@vercel/analytics/react'
// inside <body>: <Analytics />
```

**Step 4: Final commit**

```bash
git add .
git commit -m "feat: add Vercel analytics"
git push
```

---

## Setup Checklist Before Going Live

- [ ] Add real headshot to `public/images/headshot.jpg` and update `AboutSnapshot.tsx`
- [ ] Get a Resend API key at resend.com (free tier: 3,000 emails/month)
- [ ] Update LinkedIn URL in `Footer.tsx`
- [ ] Add `RESEND_API_KEY` to Vercel environment variables
- [ ] Update `from:` email in `api/contact/route.ts` with your verified domain
- [ ] Add real bio content to `about/page.tsx`
- [ ] Write first real blog post in `content/blog/`
- [ ] Create first real PDF resource and add to `public/downloads/`
- [ ] Point your domain to Vercel (Vercel dashboard → Domains)
