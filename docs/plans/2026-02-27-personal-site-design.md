# Nathan Lundquist Personal Site — Design Document
**Date:** 2026-02-27
**Status:** Approved

## Overview
Personal brand site for Nathan Lundquist, CMMC L2 / NIST 800-171 compliance consultant. Primary goal: establish Nathan as a cybersecurity expert and drive consulting leads to PCShards (pcshards.com). Secondary goal: provide ongoing value through blog posts and free downloadable resources.

---

## Pages & Structure

| Route | Purpose |
|---|---|
| `/` | Hero, about snapshot, services snapshot, blog preview, resources preview, CTA |
| `/about` | Full bio, credentials, certifications, headshot |
| `/services` | CMMC L2 / NIST 800-171 offerings, link to pcshards.com |
| `/blog` | Article listing with tag filtering |
| `/blog/[slug]` | Individual MDX blog post |
| `/resources` | Downloadable docs, checklists, templates, guides |
| `/contact` | Contact form → email via Resend API |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + CSS custom properties |
| Content | MDX files in `/content/blog/` and `/content/resources/` |
| Animations | Framer Motion |
| Contact Form | React Hook Form + Resend |
| Icons | Lucide React |
| Deployment | Vercel (free tier) |
| Analytics | Vercel Analytics |

---

## Design System

### Color Palette
```
--bg:       #0A0A0A   (near black — primary background)
--surface:  #111111   (cards, section backgrounds)
--accent:   #FF6B00   (electric orange — primary CTA, highlights)
--text:     #F5F5F5   (off-white — primary text)
--muted:    #888888   (secondary text, metadata)
--border:   #222222   (subtle separators)
```

### Typography
- Headings: Heavy weight, large scale — commanding presence
- Body: Clean, readable sans-serif
- Accent text: Mono font for technical/credential details

### Visual Style
- Bold & unique — stands out from typical blue security sites
- High contrast dark background with electric orange accents
- Subtle animated circuit/grid background on hero (CSS-based)
- Sharp-edged cards with bold hover effects
- Scroll-reveal animations via Framer Motion
- Mobile-first, fully responsive

---

## Homepage Layout

### Hero (100vh)
- Animated grid background
- H1: "CMMC & NIST 800-171 Compliance Expert"
- Subheading: Nathan Lundquist — Cybersecurity Consultant
- CTAs: [Get a Consultation] → /contact | [View Resources] → /resources
- Scroll indicator

### About Snapshot
- 2-column: headshot + bio
- Credential badge chips (CMMC RP, certifications, years experience)
- Link to /about

### Services (3 cards)
- CMMC Level 2 Assessment Prep
- NIST 800-171 Gap Analysis
- Compliance Roadmap & Remediation
- Each with "Work With Me" CTA → pcshards.com

### Blog Preview
- 3 latest posts, large card layout
- Tag chips: CMMC, NIST, InfoSec, News
- "View All Posts" link

### Resources Preview
- Featured free downloads
- "Free" badge for credibility
- "Browse All Resources" link

### Footer
- Nathan Lundquist | Powered by PCShards
- Nav links: About, Blog, Resources, Contact
- Social: LinkedIn, GitHub

---

## Content Structure

```
/content
  /blog
    YYYY-MM-DD-post-title.mdx    (frontmatter: title, date, tags, description, coverImage)
  /resources
    resource-name.mdx            (frontmatter: title, description, fileUrl, category, free)
/public
  /downloads                     (PDFs, templates)
  /images                        (headshot, og-image, etc.)
```

---

## Key Interactions
- Contact form submits to Resend → forwards to Nathan's email
- Blog/resources filterable by tag
- Resources have direct PDF download links
- All CTAs funnel toward /contact or pcshards.com
