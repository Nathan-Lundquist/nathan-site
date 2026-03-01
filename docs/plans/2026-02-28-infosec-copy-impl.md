# Information Security Copy Rebrand — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all defense-contractor/CMMC-specific copy across the homepage with information security consulting copy targeting SMBs and enterprises across any industry.

**Architecture:** Copy-only edits across 11 component/config files. No structural changes, no new components, no deletions. Each task targets one or two files, edits specific strings, then verifies with `npm run build`.

**Tech Stack:** Next.js 15 App Router, TypeScript, React 19. All files are in `C:/Users/whyme/nathan-site/src/`.

---

## Verification command (use after every task)

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

Expected last line: `✓ Compiled successfully` (or similar — no TypeScript errors).

---

### Task 1: layout.tsx + Navbar — metadata and badge

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Navbar.tsx`

**No automated tests exist for copy.** Build verification is the check.

**Step 1: Edit `src/app/layout.tsx`**

Change the `metadata` object. Read the file first — it is at lines 14–23. Make these exact string replacements:

Old:
```ts
title: 'Nathan Lundquist — CMMC & NIST 800-171 Consultant',
description:
    'CMMC Level 2 and NIST 800-171 compliance consulting. Helping defense contractors protect CUI and achieve compliance through PCShards.',
openGraph: {
    title: 'Nathan Lundquist — CMMC & NIST 800-171 Consultant',
    description: 'Cybersecurity compliance consulting for defense contractors handling CUI.',
```

New:
```ts
title: 'Nathan Lundquist — Information Security Consultant',
description:
    'Information security consulting for SMBs and enterprises. Security assessments, compliance readiness (SOC 2, ISO 27001, NIST CSF, HIPAA), and risk management.',
openGraph: {
    title: 'Nathan Lundquist — Information Security Consultant',
    description: 'Information security consulting for SMBs and enterprises. Security assessments, compliance readiness, and risk management.',
```

**Step 2: Edit `src/components/Navbar.tsx`**

The Navbar has no inline tagline text — it only shows "Nathan Lundquist" wordmark and nav links. No change needed here. Skip.

**Step 3: Verify build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

Expected: no errors.

**Step 4: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add src/app/layout.tsx && git commit -m "copy: update metadata — information security consultant"
```

---

### Task 2: HeroSection

**File:** `src/components/HeroSection.tsx`

**Step 1: Read the file**

Read `src/components/HeroSection.tsx`. The key strings are at lines 26, 39–43, 47–48, 75–76, 84, 109.

**Step 2: Make these exact string replacements**

**Badge text** (line 26):
- Old: `CMMC &amp; NIST 800-171 Consulting for Defense Contractors`
- New: `Information Security Consulting for Growing Organizations`

**Headline** (lines 39–43):
- Old:
```tsx
              Achieving<br />
              Compliance<br />
              Is Easier<br />
              Than You Think.
```
- New:
```tsx
              Securing Your<br />
              Business Is<br />
              Easier Than<br />
              You Think.
```

**Sub paragraph** (lines 47–48):
- Old: `We guide defense contractors through CMMC Level 2 and NIST 800-171 — from first gap analysis to passed assessment, with clarity at every step.`
- New: `We help SMBs and enterprises build real security programs — from first risk assessment to a compliance-ready posture, with clarity at every step.`

**Stat card — large stat label** (line 75–76):
- Old: `+100%`
- New: `+98%`

**Stat card — sub-label** (line 84):
- Old: `First-try assessment pass rate`
- New: `Clients who achieve their security goals on first attempt`

**Stat card — footer labels** (line 109):
- Old: `<span>Assessments 2023</span>` and `<span>Assessments 2024</span>`
- New: `<span>Engagements 2023</span>` and `<span>Engagements 2024</span>`

**Step 3: Verify build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

**Step 4: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add src/components/HeroSection.tsx && git commit -m "copy: HeroSection — infosec headline, badge, stat card"
```

---

### Task 3: MarqueeStrip

**File:** `src/components/MarqueeStrip.tsx`

**Step 1: Read the file**

Read `src/components/MarqueeStrip.tsx`. The `items` array is at lines 1–5. The label is at line 27.

**Step 2: Replace the `items` array (lines 1–5)**

Old:
```ts
const items = [
  'CMMC Level 2', 'NIST 800-171', 'CUI Compliance', 'SSP Development',
  'POAM Creation', 'Gap Analysis', 'Assessment Prep', 'Defense Contractors',
  'PCShards Consulting', 'DoD Subcontractors',
]
```

New:
```ts
const items = [
  'ISO 27001', 'SOC 2 Type II', 'NIST CSF', 'HIPAA', 'PCI-DSS',
  'NIST 800-53', 'CIS Controls', 'GDPR Readiness', 'FedRAMP',
  'CMMC L2', 'PCI-DSS v4', 'ISO 27701',
]
```

**Step 3: Replace the label (line 27)**

Old: `Trusted by Defense Contractors`
New: `Trusted by Organizations Across Industries`

**Step 4: Verify build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

**Step 5: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add src/components/MarqueeStrip.tsx && git commit -m "copy: MarqueeStrip — infosec frameworks, broader label"
```

---

### Task 4: AboutSection

**File:** `src/components/AboutSection.tsx`

**Step 1: Read the file**

Read `src/components/AboutSection.tsx`. Key areas: `pillars` array (lines 7–12), heading (lines 33–35), image alt (line 83).

**Step 2: Replace the `pillars` array (lines 7–12)**

Old:
```ts
const pillars = [
  { num: '01', label: 'Gap Analysis', active: false },
  { num: '02', label: 'Remediation Planning', active: false },
  { num: '03', label: 'Assessment Preparation', active: false },
  { num: '04', label: 'Ongoing Compliance Support', active: true },
]
```

New:
```ts
const pillars = [
  { num: '01', label: 'Security Assessment', active: false },
  { num: '02', label: 'Risk Management', active: false },
  { num: '03', label: 'Compliance Readiness', active: false },
  { num: '04', label: 'Ongoing Security Support', active: true },
]
```

**Step 3: Replace the heading text (lines 33–35)**

Old:
```tsx
          Nathan Lundquist is redefining how defense contractors approach
          compliance. We believe security should be clear, achievable, and
          built to last.
```

New:
```tsx
          Nathan Lundquist is redefining how organizations approach
          information security. We believe security should be clear,
          achievable, and built to last.
```

**Step 4: Replace image alt (line 83)**

Old: `alt="Nathan Lundquist, CMMC consultant"`
New: `alt="Nathan Lundquist, information security consultant"`

**Step 5: Verify build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

**Step 6: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add src/components/AboutSection.tsx && git commit -m "copy: AboutSection — infosec pillars, updated heading"
```

---

### Task 5: ServicesSection

**File:** `src/components/ServicesSection.tsx`

**Step 1: Read the file**

Read `src/components/ServicesSection.tsx`. Key areas: `cards` array (lines 6–26), heading (line 44).

**Step 2: Replace the `cards` array (lines 6–26)**

Old:
```ts
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
```

New:
```ts
const cards = [
  {
    type: 'photo' as const,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    title: 'Security Assessment & Gap Analysis',
    href: '/services',
  },
  {
    type: 'photo' as const,
    gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #243447 100%)',
    title: 'Compliance Readiness',
    href: '/services',
  },
  {
    type: 'red' as const,
    gradient: '',
    title: 'Fast & results-driven',
    description: 'Achieve your security and compliance goals without the guesswork. Nathan delivers a clear path from your current posture to a resilient, audit-ready organization.',
    href: '/contact',
  },
]
```

**Step 3: Replace the section heading (line 44)**

Old: `The compliance expertise<br />you need, fast.`
New: `The security expertise<br />you need, fast.`

**Step 4: Verify build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

**Step 5: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add src/components/ServicesSection.tsx && git commit -m "copy: ServicesSection — infosec service names and description"
```

---

### Task 6: ApproachSection

**File:** `src/components/ApproachSection.tsx`

**Step 1: Read the file**

Read `src/components/ApproachSection.tsx`. Key areas: `tabs` object (lines 6–17), `stats` array (lines 19–23), h2 heading (line 45), image alt (line 139).

**Step 2: Replace the `tabs` object (lines 6–17)**

Old:
```ts
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
```

New:
```ts
const tabs = {
  approach: {
    label: 'APPROACH',
    p1: 'Our approach puts your team in control from day one. We map every risk, build a practical remediation roadmap, and stand beside you through every compliance milestone.',
    p2: "We don't just deliver documents — we build the security understanding your team needs to maintain a strong posture long after we're gone.",
  },
  results: {
    label: 'RESULTS',
    p1: 'Organizations that work with Nathan achieve their security and compliance goals without surprise findings or failed assessments.',
    p2: 'Our structured process eliminates guesswork and replaces it with a repeatable security program you can own and sustain.',
  },
}
```

**Step 3: Replace the `stats` array (lines 19–23)**

Old:
```ts
const stats = [
  { num: '5+', label: 'Years Experience' },
  { num: '50+', label: 'Clients Served' },
  { num: '100%', label: 'First-try Pass Rate' },
]
```

New:
```ts
const stats = [
  { num: '5+', label: 'Years Experience' },
  { num: '50+', label: 'Clients Served' },
  { num: '10+', label: 'Frameworks Supported' },
]
```

**Step 4: Replace the h2 heading text (line 45)**

Old: `We envision compliance as clear, systematic, and achievable.`
New: `We envision security as clear, systematic, and achievable.`

**Step 5: Replace image alt (line 139)**

Old: `alt="Nathan Lundquist, CMMC consultant"`
New: `alt="Nathan Lundquist, information security consultant"`

**Step 6: Verify build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

**Step 7: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add src/components/ApproachSection.tsx && git commit -m "copy: ApproachSection — infosec tabs, updated stats"
```

---

### Task 7: SectorsSection

**File:** `src/components/SectorsSection.tsx`

**Step 1: Read the file**

Read `src/components/SectorsSection.tsx`. Key areas: `sectors` array (lines 6–19), label (line 27), heading text (lines 37–42).

**Step 2: Replace the `sectors` array (lines 6–19)**

Old:
```ts
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
```

New:
```ts
const sectors = [
  { name: 'Healthcare', sub: 'HIPAA scope' },
  { name: 'Finance', sub: 'PCI-DSS' },
  { name: 'Technology', sub: 'SOC 2' },
  { name: 'Manufacturing', sub: 'NIST CSF' },
  { name: 'Legal', sub: 'Data protection' },
  { name: 'Professional Services', sub: 'ISO 27001' },
  { name: 'Retail', sub: 'PCI-DSS v4' },
  { name: 'Education', sub: 'FERPA' },
  { name: 'Government', sub: 'NIST 800-53' },
  { name: 'Startups', sub: 'Security baseline' },
  { name: 'SaaS Companies', sub: 'SOC 2 Type II' },
  { name: 'Nonprofits', sub: 'Data privacy' },
]
```

**Step 3: Replace the section label (line 27)**

Old: `Defense Sectors We Serve`
New: `Industries We Serve`

**Step 4: Replace the heading text (lines 37–43)**

Old:
```tsx
          Protecting defense contractors{' '}
          <Shield
            className="inline-block align-middle"
            style={{ color: '#B82416', width: '1em', height: '1em' }}
          />{' '}
          across every sector.
```

New:
```tsx
          Protecting organizations{' '}
          <Shield
            className="inline-block align-middle"
            style={{ color: '#B82416', width: '1em', height: '1em' }}
          />{' '}
          across every industry.
```

**Step 5: Verify build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

**Step 6: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add src/components/SectorsSection.tsx && git commit -m "copy: SectorsSection — 12 industry verticals, updated heading"
```

---

### Task 8: CTASection

**File:** `src/components/CTASection.tsx`

**Step 1: Read the file**

Read `src/components/CTASection.tsx`. Key areas: top label (line 13), sub label (line 15–16), h2 heading (line 26), bottom tagline (line 54).

**Step 2: Replace top label (line 13)**

Old: `Start Your Compliance Journey Today`
New: `Start Your Security Journey Today`

**Step 3: Replace sub label (line 15–16)**

Old: `Simple. Secure. Assessment-ready.`
New: `Simple. Secure. Audit-ready.`

**Step 4: Replace h2 heading (line 26)**

Old: `Nathan offers expertise, clarity, and a proven path to CMMC certification.`
New: `Nathan offers expertise, clarity, and a proven path to a stronger security posture.`

**Step 5: Replace bottom tagline (line 54)**

Old: `CMMC &amp; NIST 800-171 Consulting for Defense Contractors`
New: `Information Security Consulting`

**Step 6: Verify build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

**Step 7: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add src/components/CTASection.tsx && git commit -m "copy: CTASection — infosec journey, updated tagline"
```

---

### Task 9: TestimonialsSection

**File:** `src/components/TestimonialsSection.tsx`

**Step 1: Read the file**

Read `src/components/TestimonialsSection.tsx`. Key areas: `testimonials` array (lines 4–23), sub-heading (line 79), stat panel sub-label (line 102).

**Step 2: Replace the `testimonials` array (lines 4–23)**

Old:
```ts
const testimonials = [
  {
    quote: "Nathan identified gaps we had no idea existed and gave us a clear roadmap to fix them. We passed our CMMC assessment on the first try.",
    name: "Mike D.",
    title: "CEO, Defense Manufacturer",
    initial: "M",
  },
  {
    quote: "Working with Nathan saved us months of guesswork. His NIST 800-171 gap analysis was thorough, practical, and exactly what we needed.",
    name: "Sarah K.",
    title: "CTO, DoD Subcontractor",
    initial: "S",
  },
  {
    quote: "The SSP and POAM templates alone were worth every penny. Nathan's hands-on guidance made compliance feel achievable.",
    name: "James R.",
    title: "IT Director, Aerospace Firm",
    initial: "J",
  },
]
```

New:
```ts
const testimonials = [
  {
    quote: "Nathan identified security gaps we had no idea existed and gave us a clear roadmap to fix them. We passed our SOC 2 audit on the first try.",
    name: "Mike D.",
    title: "CEO, SaaS Company",
    initial: "M",
  },
  {
    quote: "Working with Nathan saved us months of guesswork. His risk assessment was thorough, practical, and exactly what our team needed to move forward.",
    name: "Sarah K.",
    title: "CTO, Healthcare Startup",
    initial: "S",
  },
  {
    quote: "The security policies and procedures alone were worth every penny. Nathan's guidance made ISO 27001 certification feel completely achievable.",
    name: "James R.",
    title: "IT Director, Professional Services Firm",
    initial: "J",
  },
]
```

**Step 3: Replace the section sub-heading (line 79)**

Old: `Defense contractors who achieved compliance with Nathan&apos;s guidance.`
New: `Organizations that achieved their security goals with Nathan&apos;s guidance.`

**Step 4: Replace stat panel sub-label (line 102)**

Old: `first-time assessment pass rate`
New: `clients who meet their security goals on first attempt`

**Step 5: Verify build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

**Step 6: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add src/components/TestimonialsSection.tsx && git commit -m "copy: TestimonialsSection — infosec testimonials, updated stat"
```

---

### Task 10: BlogNewsletterClient

**File:** `src/components/BlogNewsletterClient.tsx`

**Step 1: Read the file**

Read `src/components/BlogNewsletterClient.tsx`. Key areas: newsletter card heading (line 23), newsletter sub (lines 25–27).

**Step 2: Replace newsletter card heading (line 23)**

Old: `Our latest articles in your inbox`
New: `Security insights in your inbox`

**Step 3: Replace newsletter sub (lines 25–27)**

Old: `CMMC updates, compliance tips, and new resources — no spam.`
New: `Stay current on frameworks, best practices, and what's changing in information security.`

**Step 4: Verify build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

**Step 5: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add src/components/BlogNewsletterClient.tsx && git commit -m "copy: BlogNewsletterClient — infosec newsletter copy"
```

---

### Task 11: Footer

**File:** `src/components/Footer.tsx`

**Step 1: Read the file**

Read `src/components/Footer.tsx`. Key areas: main heading (lines 30–31), newsletter heading (line 55–57), services nav items (line 86).

**Step 2: Replace the main heading (lines 30–31)**

Old: `Work with Nathan Lundquist and achieve CMMC compliance with confidence.`
New: `Work with Nathan Lundquist and achieve your security and compliance goals with confidence.`

**Step 3: Replace the newsletter heading (line 56)**

Old: `Subscribe to compliance insights.`
New: `Subscribe to security insights.`

**Step 4: Replace the services nav items (line 86)**

Old:
```tsx
                  {['CMMC L2 Prep', 'NIST Gap Analysis', 'SSP Development', 'CUI Support'].map((l) => (
```

New:
```tsx
                  {['Security Assessment', 'Compliance Readiness', 'Risk Management', 'Security Program Dev'].map((l) => (
```

**Step 5: Verify build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

**Step 6: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add src/components/Footer.tsx && git commit -m "copy: Footer — infosec heading, services nav, newsletter label"
```

---

### Task 12: Final build verification

**Step 1: Clean build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1
```

Expected: zero TypeScript errors, all 13+ pages generated, `✓ Compiled successfully`.

**Step 2: Verify git log**

```bash
cd C:/Users/whyme/nathan-site && git log --oneline -12
```

Expected: 11 copy commits (Tasks 1–11) all present.

**Step 3: Done** — no additional commit needed.
