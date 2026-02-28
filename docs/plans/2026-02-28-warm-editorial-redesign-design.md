# Warm Editorial Redesign — Design Document

**Date:** 2026-02-28
**Goal:** Replace orange accent (#FF6B00) across the entire site with a warm editorial palette — black primary actions, taupe (#8C7A6B) for editorial/label roles, and a clean warm-grey supporting system.

---

## Problem

The current site uses orange (#FF6B00) for CTAs, heading accents, icon colors, credential pills, hover states, and section labels. Orange is energetic but generic. The user wants the refined simplicity of PIXU's black/white/grey palette with one warm accent for personality.

## Design Decision

**Warm Editorial** approach: taupe `#8C7A6B` replaces orange in editorial/label roles only. Black `#0A0A0A` handles all action/CTA roles. This keeps the site feeling premium and restrained while avoiding the coldness of pure monochrome.

---

## Color System

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#EFEFEF` | Page background (unchanged) |
| `--color-surface` | `#FFFFFF` | Card / section bg |
| `--color-surface-warm` | `#F0EDE9` | Pill bg / warm grey surface |
| `--color-black` | `#0A0A0A` | Primary CTAs, strong headings |
| `--color-heading` | `#111111` | Section headings |
| `--color-body` | `#555555` | Body text |
| `--color-muted` | `#999999` | Timestamps, secondary labels |
| `--color-border` | `#E5E5E5` | Borders, dividers |
| `--color-accent` | `#8C7A6B` | **Taupe** — section labels, pills, editorial hovers |
| `--color-accent-light` | `#F0EDE9` | Taupe pill backgrounds |
| `--color-charcoal` | `#444444` | Icons, secondary elements |

**Removed:** `#FF6B00` orange, `#FFF0E6` orange-tinted bg, `rgba(255,107,0,x)` borders

---

## Component-by-Component Changes

### Navbar
- Shield icon: orange → charcoal `#444444`
- "Get a Consultation" CTA pill: already black — unchanged
- Nav link hover: orange → `#111111`

### HeroSection
- "Hey, I'm Nathan —" heading: unchanged black
- "CMMC & NIST 800-171" span: orange → plain black (bold weight carries the emphasis)
- "Available for Consulting" badge dot: keep green (functional status indicator)
- "Available for Consulting" text: grey → taupe `#8C7A6B`
- "Get a Consultation" CTA: already black — unchanged
- "Free Resources" outline CTA: hover → black (unchanged)
- Avatar "NL" circle: orange → black `#0A0A0A`
- Floating stats card "PCShards" label: orange → taupe `#8C7A6B`
- Spinning badge text fill: `#333333` — unchanged (already charcoal)

### TrustStrip
- Pill backgrounds: white → warm grey `#F0EDE9`
- Pill text: grey → taupe `#8C7A6B`
- Pill borders: remove orange tint → `#E5E5E5`

### AboutSnapshot
- Credential pill bg: `#FFF0E6` → `#F0EDE9`
- Credential pill text: orange → taupe `#8C7A6B`
- Credential pill border: orange rgba → `rgba(140,122,107,0.2)`
- "Full Bio" CTA: orange fill → black fill

### ServicesSnapshot
- "My Expertise" label: grey → taupe `#8C7A6B`
- Service title hover: orange → `#111111`
- "Details →" link hover: orange → `#111111`
- "Work With Me" CTA: orange fill → black fill

### BlogPreview
- "Latest Insights" label: grey → taupe `#8C7A6B`
- Tag pills: grey bg + grey text — unchanged (already neutral)
- Post title hover: orange → `#111111`
- "All Posts" link arrow: orange → `#111111`

### ResourcesPreview
- "Resources" label: grey → taupe `#8C7A6B`
- "FREE" badge: orange tint bg/text → black bg, white text (cleaner)
- Download button: orange → black
- "All Resources" link hover: orange → `#111111`

### TestimonialsSection
- Large quotemark: orange → charcoal `#333333`
- Arrow buttons border hover: orange → `#111111`
- Section label: grey → taupe `#8C7A6B`

### NewsletterCTA
- Already dark section — "Subscribe" button: unchanged black bg
- Section label "Stay in the loop" keeps white on dark

### Footer
- Shield/logo accent dot: orange → charcoal
- Any orange links → taupe `#8C7A6B` on dark bg

### Inner Pages (about, services, blog, blog/[slug], contact, resources)
- All orange fill CTAs → black fill, white text
- All orange text links → taupe `#8C7A6B` (inline), `#111111` (hover)
- All orange icons → charcoal `#444444`
- All orange-tinted pill bgs → warm grey `#F0EDE9`
- All orange pill text → taupe `#8C7A6B`
- Blog post prose link color: orange → taupe `#8C7A6B`
- Contact form focus border: orange → `#111111`
- Contact trust badge pills: orange tint → warm grey + taupe

---

## globals.css Changes

- Update `--color-accent` from `#FF6B00` to `#8C7A6B`
- Update `--color-accent-hover` from `#FF8C33` to `#6B5A50`
- Update `.btn-primary` bg from orange → black `#0A0A0A`, text stays white
- Update `.btn-primary:hover` bg from orange → `#333333`
- Update `.tag-accent` bg from orange → black `#0A0A0A`
- Update `::selection` bg from orange → `#0A0A0A`

---

## Success Criteria

- Zero instances of `#FF6B00` or `rgba(255,107,0` remaining in any source file
- All CTAs are black filled pills with white text
- Section labels use taupe `#8C7A6B`
- Credential/trust pills use warm grey bg + taupe text
- Site feels cohesive, premium, and distinctly editorial
