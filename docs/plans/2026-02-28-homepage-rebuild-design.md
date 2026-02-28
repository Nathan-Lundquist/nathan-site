# Design Doc: Homepage Full Rebuild (Datacenter Template Style)
**Date:** 2026-02-28
**Reference:** https://datacentertemplate.webflow.io/home-pages/home-v1
**Approach:** Faithful 1:1 layout replication with Nathan's brand colors

## Overview

Replace the current homepage with a full rebuild that matches the datacenter template's section structure, layout patterns, and numbered section divider system — using Nathan's existing brand colors (#274C77 navy, #6096BA steel, #A3CEF1 light, #8B8C89 grey).

---

## Design System Changes

### Colors
- **Page background:** `#FFFFFF` (was `#E7ECEF`)
- **Dark sections:** `#0D1824` deep navy (sections 03, 07)
- **Light stat section:** `#EEF2F8` blue-grey (section 05)
- **Heading color:** `#0A0B0D` near-black (was `#274C77`)
- **Body text:** `#6B7280` grey
- **CTA blue:** `#274C77` filled, `#FFFFFF` text, with `>` arrow
- **Accent:** `#6096BA` for links, tags, highlights

### Typography
- Remove Playfair Display serif italic accents from headings
- All headings: Inter Black / font-black, no italic
- Section numbers: JetBrains Mono, muted grey

### Section Divider Pattern (used on EVERY section)
```
─────────────────────────────────────────────────────
Our services                                        02
```
- `1px solid #D4DCE2` top border
- Category label left: `text-xs uppercase tracking-widest text-gray-400 font-medium`
- Section number right: `font-mono text-xs text-gray-300`
- `pb-6` below the divider before section content

### CTA Button Style
- Primary: `bg-[#274C77] text-white px-5 py-2.5 rounded-full font-semibold text-sm` + `ArrowRight` icon
- Secondary: outlined `border border-[#274C77] text-[#274C77]` same sizing

---

## Section Map

### Section 01 — Hero (white bg)
**Component:** `src/components/HeroSection.tsx` (update existing)

- Remove: dot grid, rotating SVG rings, `#E7ECEF` background
- Add: white `#FFFFFF` background, minimal
- Keep: photo card right side, checklist download widget, social proof avatars
- Update heading: `"Compliance.\nPrecision.\nResults."` — three stacked lines, massive black type
- Keep subtext and CTAs but update CTA style to arrow variant
- No section divider on hero (same as reference)
- Available badge: keep green pulse dot

---

### Section 02 — "Trusted by Defense Contractors" (white bg)
**Component:** `src/components/MarqueeStrip.tsx` (update existing)

- Add heading label above: `"Trusted by Defense Contractors"` — small, centered, grey
- Keep two-row pill marquee (existing items)
- Thin border-top and border-bottom framing the section

---

### Section 03 — Services Dark (bg `#0D1824`)
**Component:** `src/components/ServicesSection.tsx` (NEW — replaces ServicesSnapshot)

- Section divider: `Our services / 02`
- White centered heading: `"Complete compliance solutions"`
- White subtext
- 2×2 card grid, each card:
  - Dark card bg: `rgba(255,255,255,0.05)`, border `rgba(255,255,255,0.1)`, `rounded-2xl`
  - Icon area (Lucide icon in `#6096BA`)
  - Card title (white, bold)
  - 3 bullet features (light text with checkmark icons)
- Cards:
  1. CMMC L2 Assessment Prep — Shield, bullets: Readiness gap analysis / Remediation roadmap / Pre-assessment review
  2. NIST 800-171 Gap Analysis — FileSearch, bullets: All 110 practices / CUI environment scope / Prioritized findings
  3. Compliance Roadmap — Map, bullets: SSP development / POAM creation / Control implementation
  4. CUI Program Support — Lock, bullets: CUI identification / Handling procedures / Training & docs
- `Get a Consultation >` CTA centered below grid

---

### Section 04 — Approach Tabs (white bg)
**Component:** `src/components/ApproachSection.tsx` (NEW)

- Section divider: `Our approach / 03`
- Bold heading left: `"Built for defense contractors"`
- Subtext left: `"A structured, no-guesswork path from compliance gaps to assessment-ready."`
- `Get a Consultation >` button left
- Left column: three numbered tabs:
  - `01  Gap Analysis` — click to activate
  - `02  Remediation Planning` — click to activate
  - `03  Assessment Prep` — click to activate
  - Active tab: bold text, right arrow, `#274C77` left border
  - Inactive: muted grey
- Right column: light bg panel (`#F0F5FA`, `rounded-2xl`) showing selected tab content:
  - Title + description + 3 feature bullets for each tab
- `'use client'` with `useState` for active tab
- Framer Motion `AnimatePresence` for panel fade transition

---

### Section 05 — Stats (bg `#EEF2F8`)
**Component:** `src/components/StatsSection.tsx` (REPLACE existing dark version)

- Section divider: `Results / 04`
- Heading left: `"Compliance results"` in `#0A0B0D`
- Subtext left
- `Get a Consultation >` CTA right
- Three stats below in a row:
  - Each stat: animated horizontal bar (thin, `#274C77`) + large bold number + label below
  - `5+ Years Experience`, `50+ Clients Served`, `110 NIST Practices`
- Bar animation: `motion.div` `scaleX` 0→1 on scroll, `once: true`
- `prefers-reduced-motion` guard

---

### Section 06 — Process (white bg)
**Component:** `src/components/ProcessSection.tsx` (NEW)

- Section divider: `Our process / 05`
- Centered heading: `"The path to CMMC compliance"`
- Centered subtext
- Two CTAs centered: `Get a Consultation >` + `View results` (outline)
- Large rounded image card (`#F0F5FA` bg, `rounded-2xl`):
  - Three step tabs at bottom as dot indicators
  - Each step shows: step image/illustration + `"Step 01"` label
  - Steps: Requirements Analysis / Gap Remediation / Assessment Ready
- `'use client'`, auto-advances every 4s or clickable dots

---

### Section 07 — CTA Dark (bg `#0D1824`)
**Component:** `src/components/CTASection.tsx` (NEW — replaces dark StatsSection banner)

- Section divider at BOTTOM: `Work with Nathan / 06` (same as datacenter pattern)
- Left column:
  - White heading: `"Achieve CMMC compliance with confidence"`
  - White subtext
  - `Get a Consultation >` CTA (white bg, navy text — inverted)
  - Contact block: email link (`nathan@pcshards.com` or similar) + `Metro Detroit, MI`
- Right column: CSS decorative element — dot grid pattern or subtle cube wireframe SVG

---

### Section 08 — Testimonials (white bg)
**Component:** `src/components/TestimonialsSection.tsx` (REPLACE existing)

- Section divider: `Testimonials / 07`
- Centered heading: `"What clients say"`
- Centered subtext
- Bento grid (3-panel):
  - Large panel (2/3 width): Mike D. quote + "CEO, Defense Manufacturer" + abstract illustration
  - Stat panel (1/3 width): `"100%"` large + `"first-time assessment pass rate"` + `#274C77` bg, white text
  - Two smaller cards below (full width): Sarah K. + James R. side by side
    - Each: `"Customer stories"` label + quote text + avatar + name/title

---

### Section 09 — Blog + Newsletter (white bg)
**Component:** `src/components/BlogNewsletterSection.tsx` (NEW — merges BlogPreview + NewsletterCTA)

- Section divider: `Latest insights / 08`
- Heading: `"Insights & articles"` + `"Browse all →"` link right
- Left 2/3: two blog post cards stacked vertically
  - Each: image thumbnail placeholder (grey bg) + category badge + title + date
- Right 1/3: newsletter card
  - `"Our latest articles in your inbox"` heading
  - Subtext
  - Email input + subscribe button
  - Decorative compliance illustration

---

## Homepage Section Order (page.tsx)

```tsx
<HeroSection />         // 01 - white
<MarqueeStrip />        // 02 - white (updated label)
<ServicesSection />     // 03 - dark #0D1824
<ApproachSection />     // 04 - white
<StatsSection />        // 05 - #EEF2F8 (rebuilt)
<ProcessSection />      // 06 - white
<CTASection />          // 07 - dark #0D1824
<TestimonialsSection /> // 08 - white (rebuilt)
<BlogNewsletterSection /> // 09 - white (merged)
```

## Components to Delete / Archive
- `ServicesSnapshot.tsx` — replaced by `ServicesSection.tsx`
- `AboutSnapshot.tsx` — content moved to ApproachSection tabs
- `NewsletterCTA.tsx` — merged into BlogNewsletterSection
- `BlogPreview.tsx` — merged into BlogNewsletterSection

## Components to Keep / Update
- `HeroSection.tsx` — update (white bg, new headline, remove rings/dots)
- `MarqueeStrip.tsx` — update (add label)
- `StatsSection.tsx` — full replace (light bg, bar chart style)
- `TestimonialsSection.tsx` — full replace (bento grid)
- `Navbar.tsx` — keep (already good)
- `Footer.tsx` — keep (already good)
