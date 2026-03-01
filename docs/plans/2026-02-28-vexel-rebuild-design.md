# Design Doc: Vexel-Style Homepage Rebuild

**Date:** 2026-02-28
**Reference:** https://vexel-128.webflow.io/home
**Approach:** Full homepage rebuild matching Vexel's editorial design language, adapted for Nathan Lundquist's CMMC consulting brand.

---

## Design System

### Colors
| Token | Hex | Usage |
|---|---|---|
| `--vx-red` | `#B82416` | Primary accent — buttons, labels, headline color, active states |
| `--vx-cream` | `#FEF4EE` | Hero bg, globe/sectors section bg |
| `--vx-peach` | `#F9C8AF` | Secondary button bg, subtle card accents |
| `--vx-black` | `#1A1A1A` | Headings |
| `--vx-body` | `#333333` | Body text |
| `--vx-muted` | `#646464` | Secondary/muted text |
| `--vx-border` | `#E5E5E5` | Dividers, card borders |
| `--vx-white` | `#FFFFFF` | Section backgrounds, cards |

### Typography
- **Font:** `Space Grotesk` (Google Fonts) — visually matches Overused Grotesk used on Vexel
- **Headings:** font-black (900), very large, tight leading (`leading-none`)
- **Section labels:** `text-xs font-bold uppercase tracking-[0.15em] text-[#B82416]`
- **Body:** 16px, `#333333`, `leading-relaxed`
- Remove: Inter, JetBrains Mono, Playfair Display from layout

### Buttons
All buttons: **uppercase, tracking-widest, no border-radius (sharp rectangular), arrow →**
- **Primary:** `bg-[#B82416] text-white px-6 py-4 text-sm font-bold uppercase tracking-widest`
- **Secondary (peach):** `bg-[#F9C8AF] text-[#B82416] px-6 py-4 text-sm font-bold uppercase tracking-widest`
- **Outline (white on dark):** `border border-white text-white px-6 py-4 text-sm font-bold uppercase tracking-widest`
- Both use `<ArrowRight className="w-4 h-4" />` inline

### Section Label Pattern
```tsx
<p className="text-xs font-bold uppercase tracking-[0.15em] text-[#B82416] mb-6">
  ABOUT NATHAN
</p>
```

---

## Navbar

**Component:** `src/components/Navbar.tsx` (rewrite)

- White background, 1px bottom border `#E5E5E5`
- Logo left (text "NL" mark + "Nathan Lundquist" wordmark)
- Nav links center: `About`, `Services`, `Resources`, `Blog`
- CTA right: black filled rectangular button "GET STARTED →" (`bg-black text-white px-5 py-2.5 text-xs uppercase tracking-widest font-bold`)
- Mobile: hamburger menu

---

## Section 01 — Hero

**Component:** `src/components/HeroSection.tsx` (rewrite)
**Background:** `#FEF4EE` (warm cream)

**Layout:** Full viewport height, two-column on desktop

**Left column (top-left):**
```
[Shield icon] | CMMC & NIST 800-171 CONSULTING FOR DEFENSE CONTRACTORS
```
(small icon badge + all-caps label, same as Vexel's logo + tagline badge)

**Headline (massive, red, two lines):**
```
Achieving Compliance
Is Easier Than You Think.
```
Font: Space Grotesk Black, `clamp(3.5rem, 7vw, 6.5rem)`, color `#B82416`, `leading-none`

**Below headline (left column):**
```
We guide defense contractors through CMMC Level 2 and NIST 800-171 —
from first gap analysis to passed assessment, with clarity at every step.
```
Color: `#333333`, `text-lg`, `leading-relaxed`, `max-w-md`

**CTAs (below sub):**
- Primary: `GET A CONSULTATION →` (red filled)
- Secondary: `FREE RESOURCES` (peach bg)

**Bottom right:** `SCROLL FOR MORE →` (small, red, uppercase)

**Right column:**
Floating stat card (white card, `rounded-xl`, shadow):
```
+100%
First-try assessment pass rate

[dot matrix chart in red — CSS-only dotted grid showing upward trend]

May — Assessments   Jun — Assessments
```
Style matches Vexel's "+326% Growth" card exactly.

---

## Section 02 — Logo Strip

**Component:** `src/components/MarqueeStrip.tsx` (update style only)
**Background:** `#FFFFFF`

- Label: "TRUSTED BY DEFENSE CONTRACTORS" — centered, small, `#B82416` red
- Single row of logos/badges (CMMC-AB, NIST, DoD, PCShards, etc.) — use text pills styled as logo-like items
- Keep existing marquee animation

---

## Section 03 — About Nathan

**Component:** `src/components/AboutSection.tsx` (NEW — replaces old about snapshot)
**Background:** `#FFFFFF`

**Layout:** Full-width heading top, then two-column below

**Label:** `ABOUT NATHAN`

**Full-width heading:**
```
Nathan Lundquist is redefining how defense contractors
approach compliance. We believe security should be
clear, achievable, and built to last.
```
Font size: `clamp(2rem, 3.5vw, 3rem)`, black, bold

**Left column (below):**
Numbered list of 4 items — inactive items in `#F9C8AF` peach, active item in `#B82416` red, bold:
```
01  Gap Analysis
02  Remediation Planning
03  Assessment Preparation
04  Ongoing Compliance Support
```
Each row: number left (`text-xs text-[#B82416]`) + title (`text-xl font-bold`)
Active item on load: `04 Ongoing Compliance Support`
(Purely visual — no interactivity needed, just CSS)

CTA below list: `OUR SERVICES →` (red primary button)

**Right column:**
Headshot photo card — `rounded-xl overflow-hidden`, warm `#FEF4EE` background, `aspect-[3/4]`
(Same `/headshot.jpg` as current hero)

---

## Section 04 — Services Cards

**Component:** `src/components/ServicesSection.tsx` (rewrite)
**Background:** `#FFFFFF`

**Header row:**
- Label: `SERVICES`
- Heading left: `"The compliance expertise you need, fast."` — large black
- Button right: `ALL SERVICES` (peach secondary button)

**Three cards in a row (`md:grid-cols-3 gap-4`):**

**Card 1 — Photo card (dark overlay):**
- Background: dark photo overlay (CSS bg image using placeholder dark gradient)
- Bottom-left white text: `"Gap Analysis & Readiness"`
- Bottom-right: white square arrow button
- `aspect-[3/4] rounded-xl overflow-hidden relative`

**Card 2 — Photo card (dark overlay):**
- Background: dark compliance-themed gradient
- Bottom-left white text: `"NIST 800-171 & SSP"`
- Bottom-right: white square arrow button

**Card 3 — RED card:**
- `bg-[#B82416]` solid
- Top: large white heading `"Fast & results-driven"`
- Below: white body text `"Achieve CMMC Level 2 certification without the guesswork. Nathan delivers a clear path from current state to assessment-ready."`
- Bottom-right: white square arrow button
- `aspect-[3/4] rounded-xl`

(Use dark gradient CSS backgrounds for cards 1 & 2 instead of real photos to avoid asset dependency)

---

## Section 05 — Approach / Vision

**Component:** `src/components/ApproachSection.tsx` (rewrite)
**Background:** `#FFFFFF` left, `#FEF4EE` right

**Layout:** Two columns, ~50/50

**Left column:**
Heading: `"We envision compliance as clear, systematic, and achievable."` — large black bold, `clamp(1.8rem, 3vw, 2.8rem)`

Toggle tabs (styled like Vexel's slider toggles — `rounded-full` pill toggles):
- `APPROACH` (active = red dot/indicator)
- `RESULTS`

Below toggle: paragraph text (changes based on active tab)

**APPROACH tab:**
```
Our approach puts your team in control from day one. We map every
gap, build a practical remediation roadmap, and stand beside you
through every assessment milestone.

We don't just deliver documents — we build the understanding your
team needs to maintain compliance long after we're gone.
```

**RESULTS tab:**
```
Defense contractors who work with Nathan achieve CMMC Level 2
certification without surprise findings or failed assessments.

Our structured process eliminates guesswork and replaces it
with a repeatable system you can own.
```

Stats row (below divider, same in both tabs):
```
5+           50+          100%
Years        Clients       First-try
Experience   Served        Pass Rate
```
Numbers in `#B82416` red, large bold. Labels below in `#646464` muted.

**Right column:**
Headshot or compliance-themed image on `#FEF4EE` cream background, `rounded-xl`, same `/headshot.jpg`

---

## Section 06 — Sectors We Serve

**Component:** `src/components/SectorsSection.tsx` (NEW — adapted from Vexel globe section)
**Background:** `#FEF4EE` (cream)

**Centered content:**

Label: `DEFENSE SECTORS WE SERVE`

Heading (centered, with inline Shield icon):
```
Protecting defense contractors
[🛡] across every sector.
```
Font: large, black, `clamp(2rem, 4vw, 3.5rem)`, with Shield Lucide icon inline in `#B82416`

CTA button centered below: `LEARN MORE →` (red primary)

**2-row grid of white cards (`grid-cols-3 md:grid-cols-6 gap-4`):**
Row 1: Aerospace | Manufacturing | IT Services | R&D | Systems Integration | Engineering
Row 2: Defense Electronics | Cyber Services | Software Dev | Logistics | Consulting | Prime Contractors

Each card: `bg-white rounded-xl p-6`, bold name top, muted sub label below (e.g., "CUI handling", "CMMC scope")

---

## Section 07 — CTA (Full Red)

**Component:** `src/components/CTASection.tsx` (rewrite)
**Background:** `#B82416` (full red)

**Layout:** Left content + right abstract bar chart decoration

**Top-left (small white text):**
```
START YOUR COMPLIANCE JOURNEY TODAY
```

**Sub (white, small):**
```
Simple. Secure. Assessment-ready.
```

**Main heading (massive white):**
```
Nathan offers expertise, clarity,
and a proven path to CMMC certification.
```
Font: `clamp(2.5rem, 5vw, 4rem)`, white, font-black

**CTA button:** `GET A CONSULTATION TODAY →` (white bg, black text — inverted)

**Bottom-left tagline:**
Logo mark + `CMMC & NIST 800-171 CONSULTING FOR DEFENSE CONTRACTORS` (small white caps)

**Right side decoration:**
CSS-only bar chart — 12–16 thin white vertical lines (`w-0.5 bg-white/40`) of increasing heights, `opacity-60`

---

## Section 08 — Testimonials

**Component:** `src/components/TestimonialsSection.tsx` (style update — keep bento grid structure)
**Background:** `#FFFFFF`

Update styling to match Vexel:
- Label: `TESTIMONIALS`
- Cards: sharp rectangular (remove `rounded-2xl` → `rounded-xl` or just `rounded-lg`)
- "Customer stories" pill: `bg-[#FEF4EE] text-[#B82416]`
- Stat panel: `bg-[#B82416]` (keep red, already close)
- Avatar circles: `bg-[#B82416]`

---

## Section 09 — Blog + Newsletter

**Component:** `src/components/BlogNewsletterClient.tsx` (style update)
**Background:** `#FFFFFF`

Update styling to match Vexel:
- Label: `LATEST INSIGHTS`
- "Browse all articles →" link styled as text link with red color
- Newsletter card: white bg, red "SUBSCRIBE" button (peach style)
- Email input: bottom-border only style (`border-b border-[#E5E5E5]` + no other borders)

---

## Footer

**Component:** `src/components/Footer.tsx` (rewrite)
**Background:** `#FFFFFF`

**Layout matches Vexel footer exactly:**

**Top-left:**
- Logo/wordmark
- Large heading: `"Work with Nathan Lundquist and achieve CMMC compliance with confidence."`
- Red CTA button: `GET A CONSULTATION →`
- Contact block:
  - Email label + `nathan@pcshards.com`
  - Location label + `Metro Detroit, MI`

**Top-right:**
- Heading: `"Subscribe to compliance insights."`
- Email input (border-bottom only) + `SUBSCRIBE` peach button

**Navigation columns (4 cols):**
- Company: About, Case Studies, Resources
- Services: CMMC L2 Prep, NIST Gap Analysis, SSP Development, CUI Support
- Support: FAQ, Contact, Legal
- Social: LinkedIn, Twitter/X, GitHub

**Bottom bar:**
- `© Nathan Lundquist. All Rights Reserved.`
- Right: `via PCShards`

---

## Components to Create/Modify/Delete

### Create (new)
- `src/components/AboutSection.tsx`
- `src/components/SectorsSection.tsx`

### Rewrite
- `src/components/Navbar.tsx`
- `src/components/HeroSection.tsx`
- `src/components/ServicesSection.tsx`
- `src/components/ApproachSection.tsx`
- `src/components/CTASection.tsx`
- `src/components/Footer.tsx`

### Style-update only
- `src/components/MarqueeStrip.tsx`
- `src/components/TestimonialsSection.tsx`
- `src/components/BlogNewsletterClient.tsx`

### Delete
- `src/components/StatsSection.tsx` (stats folded into ApproachSection)
- `src/components/ProcessSection.tsx` (replaced by ApproachSection)
- `src/components/TrustStrip.tsx` (unused)
- `src/components/ResourcesPreview.tsx` (unused on homepage)

### Update
- `src/app/layout.tsx` — swap font to Space Grotesk, remove Playfair/JetBrains
- `src/app/globals.css` — new color tokens, button base styles, remove old tokens
- `src/app/page.tsx` — new section order

### New section order in page.tsx
```tsx
<HeroSection />         // 01 — cream #FEF4EE
<MarqueeStrip />        // 02 — white
<AboutSection />        // 03 — white
<ServicesSection />     // 04 — white
<ApproachSection />     // 05 — white/cream split
<SectorsSection />      // 06 — cream #FEF4EE
<CTASection />          // 07 — red #B82416
<TestimonialsSection /> // 08 — white
<BlogNewsletterSection /> // 09 — white
```

---

## globals.css Changes

Remove all old `--color-*` tokens. Add:
```css
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
```

Add `.btn-primary`, `.btn-secondary`, `.btn-outline` utility classes.
Add `@keyframes marquee` (keep existing).

---

## layout.tsx Changes

Replace fonts:
```tsx
import { Space_Grotesk } from 'next/font/google'
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
```
Remove Inter, JetBrains Mono, Playfair Display.
