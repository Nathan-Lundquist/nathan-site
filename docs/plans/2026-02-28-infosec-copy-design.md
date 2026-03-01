# Design Doc: Information Security Copy Rebrand

**Date:** 2026-02-28
**Scope:** Copy-only changes across all homepage components — no structural or visual changes.
**Approach:** Option B — Broaden with compliance DNA. Nathan serves SMBs and enterprises across any industry, using compliance frameworks (SOC 2, ISO 27001, NIST CSF, HIPAA, PCI-DSS) as the core differentiator. Defense-specific language removed entirely.

---

## Positioning

**Core message:** Nathan Lundquist helps SMBs and enterprises build real security programs and navigate compliance frameworks. Compliance expertise is the differentiator; any organization is the audience.

**Tagline:** `INFORMATION SECURITY CONSULTING`

---

## Component Copy Changes

### layout.tsx (metadata)

```tsx
title: 'Nathan Lundquist — Information Security Consultant'
description: 'Information security consulting for SMBs and enterprises. Security assessments, compliance readiness (SOC 2, ISO 27001, NIST CSF, HIPAA), and risk management.'
```

---

### Navbar

- Badge/tagline: `INFORMATION SECURITY CONSULTING`

---

### HeroSection

- **Badge:** `Information Security Consulting for Growing Organizations`
- **Headline:**
  ```
  Securing Your
  Business Is
  Easier Than
  You Think.
  ```
- **Sub:** `We help SMBs and enterprises build real security programs — from first risk assessment to a compliance-ready posture, with clarity at every step.`
- **CTAs:** `GET A CONSULTATION →` (unchanged) / `FREE RESOURCES` (unchanged)
- **Stat card:**
  - Large stat: `+98%`
  - Label: `Clients who achieve their security goals on first attempt`
  - Footer row: `Engagements 2023` / `Engagements 2024`
- **Alt text (headshots):** `Nathan Lundquist, information security consultant`

---

### MarqueeStrip

- **Label:** `TRUSTED BY ORGANIZATIONS ACROSS INDUSTRIES`
- **Pills:** Replace defense-specific items with framework/standard names:
  `ISO 27001` / `SOC 2 Type II` / `NIST CSF` / `HIPAA` / `PCI-DSS` / `NIST 800-53` / `CIS Controls` / `GDPR Readiness` / `FedRAMP` / `CMMC L2` / `PCI-DSS v4` / `ISO 27701`

---

### AboutSection

- **Label:** `ABOUT NATHAN`
- **Heading:** `Nathan Lundquist is redefining how organizations approach information security. We believe security should be clear, achievable, and built to last.`
- **Pillars:**
  ```
  01  Security Assessment
  02  Risk Management
  03  Compliance Readiness
  04  Ongoing Security Support    ← active
  ```
- **CTA:** `OUR SERVICES →` (unchanged)
- **Image alt:** `Nathan Lundquist, information security consultant`

---

### ServicesSection

- **Label:** `SERVICES`
- **Heading:** `The security expertise you need, fast.`
- **Card 1 (dark gradient):** `Security Assessment & Gap Analysis`
- **Card 2 (dark gradient):** `Compliance Readiness`
- **Card 3 (red):**
  - Title: `Fast & results-driven`
  - Body: `Achieve your security and compliance goals without the guesswork. Nathan delivers a clear path from your current posture to a resilient, audit-ready organization.`

---

### ApproachSection

- **Heading:** `We envision security as clear, systematic, and achievable.`
- **APPROACH tab:**
  ```
  Our approach puts your team in control from day one. We map every
  risk, build a practical remediation roadmap, and stand beside you
  through every compliance milestone.

  We don't just deliver documents — we build the security understanding
  your team needs to maintain a strong posture long after we're gone.
  ```
- **RESULTS tab:**
  ```
  Organizations that work with Nathan achieve their security and
  compliance goals without surprise findings or failed assessments.

  Our structured process eliminates guesswork and replaces it with
  a repeatable security program you can own.
  ```
- **Stats row:**
  ```
  5+           50+          10+
  Years        Clients       Frameworks
  Experience   Served        Supported
  ```

---

### SectorsSection

- **Label:** `INDUSTRIES WE SERVE`
- **Heading:** `Protecting organizations [Shield icon] across every industry.`
- **CTA:** `LEARN MORE →` (unchanged)
- **12 industry cards:**

| Name | Sub |
|---|---|
| Healthcare | HIPAA scope |
| Finance | PCI-DSS |
| Technology | SOC 2 |
| Manufacturing | NIST CSF |
| Legal | Data protection |
| Professional Services | ISO 27001 |
| Retail | PCI-DSS v4 |
| Education | FERPA |
| Government | NIST 800-53 |
| Startups | Security baseline |
| SaaS Companies | SOC 2 Type II |
| Nonprofits | Data privacy |

---

### CTASection

- **Top label:** `START YOUR SECURITY JOURNEY TODAY`
- **Sub:** `Simple. Secure. Audit-ready.`
- **Main heading:**
  ```
  Nathan offers expertise, clarity,
  and a proven path to a stronger
  security posture.
  ```
- **CTA button:** `GET A CONSULTATION TODAY →` (unchanged)
- **Bottom tagline:** `INFORMATION SECURITY CONSULTING`

---

### TestimonialsSection

- **No copy changes needed** — testimonial quotes are generic enough to apply to any security engagement.
- Only change: stat panel label `"first-time assessment pass rate"` → `"clients who meet their security goals on first attempt"` (if stat panel contains that text)

---

### BlogNewsletterClient / BlogNewsletterSection

- **Label:** `LATEST INSIGHTS` (unchanged)
- **Newsletter card heading:** `Security insights in your inbox.` (was `Our latest articles in your inbox`)
- **Subscribe sub:** `Stay current on frameworks, best practices, and what's changing in information security.`

---

### Footer

- **Heading:** `Work with Nathan Lundquist and achieve your security and compliance goals with confidence.`
- **Bottom tagline:** `INFORMATION SECURITY CONSULTING`
- **Services nav column:**
  - Security Assessment
  - Compliance Readiness
  - Risk Management
  - Security Program Dev

---

## Files to Modify

| File | Type of change |
|---|---|
| `src/app/layout.tsx` | Metadata title + description |
| `src/components/Navbar.tsx` | Badge text |
| `src/components/HeroSection.tsx` | Badge, headline, sub, stat card |
| `src/components/MarqueeStrip.tsx` | Label + pill items |
| `src/components/AboutSection.tsx` | Heading, pillars, image alt |
| `src/components/ServicesSection.tsx` | Heading, card titles, red card description |
| `src/components/ApproachSection.tsx` | Main heading, tab content, stats labels |
| `src/components/SectorsSection.tsx` | Label, heading, 12 sector cards |
| `src/components/CTASection.tsx` | Top label, sub, main heading, bottom tagline |
| `src/components/TestimonialsSection.tsx` | Stat panel sub-label (minor) |
| `src/components/BlogNewsletterClient.tsx` | Newsletter heading + sub |
| `src/components/Footer.tsx` | Main heading, services nav, bottom tagline |

---

## Out of Scope

- No structural changes
- No visual/design changes
- No new components
- Inner pages (`/about`, `/services`, `/contact`, `/blog`, `/resources`) — separate task
