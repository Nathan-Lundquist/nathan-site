# Warm Editorial Palette Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all orange (#FF6B00) with a warm editorial palette — black CTAs, taupe (#8C7A6B) for labels/pills, charcoal (#444444) for icons — across every file in the site.

**Architecture:** Pure find-and-replace of color values, file by file. No structural changes. The dev server at localhost:3000 is already running — verify each task visually before committing.

**Tech Stack:** Next.js 15, React, Tailwind CSS v4, inline styles

---

### Task 1: Update globals.css color tokens and utility classes

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Update the @theme tokens**

Find and replace in `src/app/globals.css`:
```css
/* BEFORE */
  --color-accent: #FF6B00;
  --color-accent-hover: #FF8C33;

/* AFTER */
  --color-accent: #8C7A6B;
  --color-accent-hover: #6B5A50;
```

**Step 2: Update ::selection**

```css
/* BEFORE */
  ::selection {
    background-color: #FF6B00;
    color: #FFFFFF;
  }

/* AFTER */
  ::selection {
    background-color: #0A0A0A;
    color: #FFFFFF;
  }
```

**Step 3: Update scrollbar hover**

```css
/* BEFORE */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #FF6B00;
  }

/* AFTER */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #8C7A6B;
  }
```

**Step 4: Update .btn-primary**

```css
/* BEFORE */
  .btn-primary {
    ...
    background-color: #FF6B00;
    color: #0A0A0A;
    ...
  }
  .btn-primary:hover {
    background-color: #FF8C33;
    ...
  }

/* AFTER */
  .btn-primary {
    ...
    background-color: #0A0A0A;
    color: #FFFFFF;
    ...
  }
  .btn-primary:hover {
    background-color: #333333;
    ...
  }
```

**Step 5: Update .btn-outline**

```css
/* BEFORE */
  .btn-outline {
    ...
    border: 1px solid #FF6B00;
    color: #FF6B00;
    ...
  }
  .btn-outline:hover {
    background-color: #FF6B00;
    color: #0A0A0A;
  }

/* AFTER */
  .btn-outline {
    ...
    border: 1px solid #0A0A0A;
    color: #0A0A0A;
    ...
  }
  .btn-outline:hover {
    background-color: #0A0A0A;
    color: #FFFFFF;
  }
```

**Step 6: Update .tag-accent**

```css
/* BEFORE */
  .tag-accent {
    ...
    background-color: #FF6B00;
    color: #0A0A0A;
    ...
  }

/* AFTER */
  .tag-accent {
    ...
    background-color: #0A0A0A;
    color: #FFFFFF;
    ...
  }
```

**Step 7: Verify no orange remains in globals.css**

Run: `grep -n "FF6B00\|FF8C33\|FFF0E6" src/app/globals.css`
Expected: no output (zero matches)

**Step 8: Commit**

```bash
git add src/app/globals.css
git commit -m "style: update globals.css — replace orange with warm editorial palette"
```

---

### Task 2: Navbar and Footer

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`

**Step 1: Update Navbar.tsx**

Change the Shield icon color and nav link hover from orange to charcoal/dark:

```tsx
/* Navbar.tsx — Shield icon */
/* BEFORE */
<Shield className="w-5 h-5" style={{ color: '#FF6B00' }} />

/* AFTER */
<Shield className="w-5 h-5" style={{ color: '#444444' }} />
```

```tsx
/* Navbar.tsx — desktop link hover */
/* BEFORE */
onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6B00')}
onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}

/* AFTER */
onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
```

**Step 2: Update Footer.tsx**

```tsx
/* Footer.tsx — brand shield icon */
/* BEFORE */
<Shield className="w-5 h-5" style={{ color: '#FF6B00' }} />

/* AFTER */
<Shield className="w-5 h-5" style={{ color: '#444444' }} />
```

```tsx
/* Footer.tsx — brand name dot */
/* BEFORE */
NATHAN<span style={{ color: '#FF6B00' }}>.</span>LUNDQUIST

/* AFTER */
NATHAN<span style={{ color: '#8C7A6B' }}>.</span>LUNDQUIST
```

```tsx
/* Footer.tsx — PCShards link */
/* BEFORE */
<a ... style={{ color: '#FF6B00' }}>PCShards</a>

/* AFTER */
<a ... style={{ color: '#8C7A6B' }}>PCShards</a>
```

```tsx
/* Footer.tsx — Linkedin icon */
/* BEFORE */
<Linkedin className="w-4 h-4" style={{ color: '#FF6B00' }} />

/* AFTER */
<Linkedin className="w-4 h-4" style={{ color: '#444444' }} />
```

```tsx
/* Footer.tsx — Github icon */
/* BEFORE */
<Github className="w-4 h-4" style={{ color: '#FF6B00' }} />

/* AFTER */
<Github className="w-4 h-4" style={{ color: '#444444' }} />
```

**Step 3: Verify in browser**

Navigate to http://localhost:3000 — navbar shield should be charcoal, footer logo dot should be taupe, social icons charcoal.

**Step 4: Verify no orange**

Run: `grep -n "FF6B00" src/components/Navbar.tsx src/components/Footer.tsx`
Expected: no output

**Step 5: Commit**

```bash
git add src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "style: navbar and footer — replace orange with charcoal/taupe"
```

---

### Task 3: HeroSection and TrustStrip

**Files:**
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/components/TrustStrip.tsx`

**Step 1: Update HeroSection.tsx — heading accent span**

The "CMMC & NIST 800-171" line currently uses an orange `<span>`. Remove the color — it becomes bold black:

```tsx
/* BEFORE */
<span style={{ color: '#FF6B00' }}>CMMC &amp; NIST 800-171</span>

/* AFTER */
<span>CMMC &amp; NIST 800-171</span>
```

**Step 2: Update HeroSection.tsx — NL avatar circle**

The first avatar ("NL") is orange. Make it black:

```tsx
/* BEFORE */
{['#FF6B00', '#1A1A1A', '#555555', '#999999'].map((color, i) => (

/* AFTER */
{['#0A0A0A', '#333333', '#666666', '#999999'].map((color, i) => (
```

**Step 3: Update HeroSection.tsx — PCShards stat label**

```tsx
/* BEFORE */
<p className="text-sm font-bold leading-none" style={{ color: '#FF6B00' }}>PCShards</p>

/* AFTER */
<p className="text-sm font-bold leading-none" style={{ color: '#8C7A6B' }}>PCShards</p>
```

**Step 4: Update TrustStrip.tsx — pill styling**

TrustStrip currently has neutral grey pills — no orange to remove. But update the label text to taupe to match the design system:

```tsx
/* BEFORE */
<p className="text-center text-xs font-mono uppercase tracking-widest mb-6" style={{ color: '#999999' }}>
  Specializations &amp; Frameworks
</p>

/* AFTER */
<p className="text-center text-xs font-mono uppercase tracking-widest mb-6" style={{ color: '#8C7A6B' }}>
  Specializations &amp; Frameworks
</p>
```

**Step 5: Verify in browser**

Navigate to http://localhost:3000 — hero heading should be fully black (no orange span), NL avatar is black, PCShards label is warm taupe.

**Step 6: Verify no orange**

Run: `grep -n "FF6B00\|FFF0E6" src/components/HeroSection.tsx src/components/TrustStrip.tsx`
Expected: no output

**Step 7: Commit**

```bash
git add src/components/HeroSection.tsx src/components/TrustStrip.tsx
git commit -m "style: hero and trust strip — replace orange with black/taupe"
```

---

### Task 4: AboutSnapshot and ServicesSnapshot

**Files:**
- Modify: `src/components/AboutSnapshot.tsx`
- Modify: `src/components/ServicesSnapshot.tsx`

**Step 1: Update AboutSnapshot.tsx — credential pills**

```tsx
/* BEFORE */
style={{
  backgroundColor: '#FFF0E6',
  color: '#FF6B00',
  border: '1px solid rgba(255,107,0,0.2)',
}}

/* AFTER */
style={{
  backgroundColor: '#F0EDE9',
  color: '#8C7A6B',
  border: '1px solid rgba(140,122,107,0.2)',
}}
```

**Step 2: Update AboutSnapshot.tsx — "Full Bio" CTA**

```tsx
/* BEFORE */
style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}

/* AFTER */
style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
```

**Step 3: Update ServicesSnapshot.tsx — section label**

```tsx
/* BEFORE */
<p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#999999' }}>
  My Expertise
</p>

/* AFTER */
<p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#8C7A6B' }}>
  My Expertise
</p>
```

**Step 4: Update ServicesSnapshot.tsx — service title hover**

```tsx
/* BEFORE */
className="font-bold text-lg mb-1 transition-colors group-hover:text-[#FF6B00]"

/* AFTER */
className="font-bold text-lg mb-1 transition-colors group-hover:text-[#111111]"
```

**Step 5: Update ServicesSnapshot.tsx — Details link hover**

```tsx
/* BEFORE */
onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6B00')}
onMouseLeave={(e) => (e.currentTarget.style.color = '#999999')}

/* AFTER */
onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
onMouseLeave={(e) => (e.currentTarget.style.color = '#999999')}
```

**Step 6: Update ServicesSnapshot.tsx — "Work With Me" CTA**

```tsx
/* BEFORE */
style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}

/* AFTER */
style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
```

**Step 7: Verify in browser**

Scroll through homepage — credential pills warm grey/taupe, "Full Bio" and "Work With Me" buttons black.

**Step 8: Verify no orange**

Run: `grep -n "FF6B00\|FFF0E6" src/components/AboutSnapshot.tsx src/components/ServicesSnapshot.tsx`
Expected: no output

**Step 9: Commit**

```bash
git add src/components/AboutSnapshot.tsx src/components/ServicesSnapshot.tsx
git commit -m "style: about and services snapshots — replace orange with black/taupe"
```

---

### Task 5: BlogPreview, ResourcesPreview, TestimonialsSection, NewsletterCTA

**Files:**
- Modify: `src/components/BlogPreview.tsx`
- Modify: `src/components/ResourcesPreview.tsx`
- Modify: `src/components/TestimonialsSection.tsx`
- Modify: `src/components/NewsletterCTA.tsx`

**Step 1: Update BlogPreview.tsx — "All Posts" link**

```tsx
/* BEFORE */
style={{ color: '#FF6B00' }}  // on the "All Posts" Link

/* AFTER */
style={{ color: '#8C7A6B' }}
```

**Step 2: Update BlogPreview.tsx — tag pills**

```tsx
/* BEFORE */
style={{
  backgroundColor: '#FFF0E6',
  color: '#FF6B00',
}}

/* AFTER */
style={{
  backgroundColor: '#F0EDE9',
  color: '#8C7A6B',
}}
```

**Step 3: Update BlogPreview.tsx — post title hover**

```tsx
/* BEFORE */
className="font-black text-lg mb-2 leading-snug transition-colors group-hover:text-[#FF6B00]"

/* AFTER */
className="font-black text-lg mb-2 leading-snug transition-colors group-hover:text-[#111111]"
```

**Step 4: Update BlogPreview.tsx — section label**

```tsx
/* BEFORE */
<p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#999999' }}>
  Latest Insights
</p>

/* AFTER */
<p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#8C7A6B' }}>
  Latest Insights
</p>
```

**Step 5: Update ResourcesPreview.tsx — "All Resources" link**

```tsx
/* BEFORE */
style={{ color: '#FF6B00' }}  // on the "All Resources" Link

/* AFTER */
style={{ color: '#8C7A6B' }}
```

**Step 6: Update ResourcesPreview.tsx — FREE badge**

```tsx
/* BEFORE */
style={{
  backgroundColor: '#FFF0E6',
  color: '#FF6B00',
}}

/* AFTER */
style={{
  backgroundColor: '#0A0A0A',
  color: '#FFFFFF',
}}
```

**Step 7: Update ResourcesPreview.tsx — section label**

```tsx
/* BEFORE */
<p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#999999' }}>
  Resources
</p>

/* AFTER */
<p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#8C7A6B' }}>
  Resources
</p>
```

**Step 8: Update TestimonialsSection.tsx — section label**

```tsx
/* BEFORE */
<p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#999999' }}>
  Client Feedback
</p>

/* AFTER */
<p className="text-sm font-mono uppercase tracking-widest pt-2" style={{ color: '#8C7A6B' }}>
  Client Feedback
</p>
```

**Step 9: Update TestimonialsSection.tsx — quotemark and card bg**

```tsx
/* BEFORE */
<span className="text-6xl leading-none font-serif" style={{ color: '#FF6B00' }}>&ldquo;</span>

/* AFTER */
<span className="text-6xl leading-none font-serif" style={{ color: '#333333' }}>&ldquo;</span>
```

Also update the card background from green-tinted to neutral warm:

```tsx
/* BEFORE */
backgroundColor: '#F0F7F4',

/* AFTER */
backgroundColor: '#F5F2EF',
```

**Step 10: Update NewsletterCTA.tsx — subscribe button**

```tsx
/* BEFORE */
style={{ backgroundColor: '#FF6B00', color: '#0A0A0A' }}

/* AFTER */
style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A' }}
```

**Step 11: Update NewsletterCTA.tsx — success message**

```tsx
/* BEFORE */
<p className="font-semibold" style={{ color: '#FF6B00' }}>Thanks! You're on the list.</p>

/* AFTER */
<p className="font-semibold" style={{ color: '#FFFFFF' }}>Thanks! You're on the list.</p>
```

**Step 12: Update NewsletterCTA.tsx — link hovers**

```tsx
/* BEFORE */
className="text-sm transition-colors hover:text-[#FF6B00]"  // (appears 4 times — all links)

/* AFTER */
className="text-sm transition-colors hover:text-[#FFFFFF]"  // (all 4 instances)
```

**Step 13: Verify in browser**

Scroll through the full homepage — blog tags warm grey/taupe, quotemark dark, testimonial card warm beige, newsletter subscribe button white.

**Step 14: Verify no orange**

Run: `grep -rn "FF6B00\|FFF0E6\|F0F7F4" src/components/BlogPreview.tsx src/components/ResourcesPreview.tsx src/components/TestimonialsSection.tsx src/components/NewsletterCTA.tsx`
Expected: no output

**Step 15: Commit**

```bash
git add src/components/BlogPreview.tsx src/components/ResourcesPreview.tsx src/components/TestimonialsSection.tsx src/components/NewsletterCTA.tsx
git commit -m "style: blog, resources, testimonials, newsletter — replace orange with warm editorial palette"
```

---

### Task 6: Inner pages — about, services, blog, contact, resources

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/resources/page.tsx`

**Step 1: about/page.tsx — icons and links**

```tsx
/* Shield and Award icons */
/* BEFORE */
style={{ color: '#FF6B00' }}  // Award icon
style={{ color: '#FF6B00' }}  // Shield icons in list

/* AFTER */
style={{ color: '#444444' }}  // Award icon
style={{ color: '#444444' }}  // Shield icons in list
```

```tsx
/* PCShards inline link */
/* BEFORE */
style={{ color: '#FF6B00' }}

/* AFTER */
style={{ color: '#8C7A6B' }}
```

```tsx
/* "PCShards" stat label in stats card */
/* BEFORE */
<p className="text-sm font-bold" style={{ color: '#FF6B00' }}>PCShards</p>

/* AFTER */
<p className="text-sm font-bold" style={{ color: '#8C7A6B' }}>PCShards</p>
```

```tsx
/* Expertise card headings */
/* BEFORE */
<h3 className="font-black mb-2" style={{ color: '#FF6B00' }}>

/* AFTER */
<h3 className="font-black mb-2" style={{ color: '#8C7A6B' }}>
```

```tsx
/* "Work With Me" CTA */
/* BEFORE */
style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}

/* AFTER */
style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
```

**Step 2: services/page.tsx — icons and CTA**

```tsx
/* Service icons */
/* BEFORE */
<s.icon className="w-8 h-8 mt-1" style={{ color: '#FF6B00' }} />

/* AFTER */
<s.icon className="w-8 h-8 mt-1" style={{ color: '#444444' }} />
```

```tsx
/* PCShards inline link */
/* BEFORE */
style={{ color: '#FF6B00' }}

/* AFTER */
style={{ color: '#8C7A6B' }}
```

```tsx
/* "Schedule a Consultation" CTA */
/* BEFORE */
style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}

/* AFTER */
style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}
```

Wait — the services CTA is in a dark `#111111` block. Keep the CTA orange there? No — replace with white:

```tsx
/* "Schedule a Consultation" CTA (on dark bg) */
/* BEFORE */
style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}

/* AFTER */
style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A' }}
```

**Step 3: blog/page.tsx — tag pills and hover**

```tsx
/* Tag pills */
/* BEFORE */
style={{ backgroundColor: '#F0F0F0', color: '#555555' }}  // already neutral — no change needed

/* Post card hover — currently uses onMouseEnter inline style with orange */
/* Check for any FF6B00 and replace */
```

Run: `grep -n "FF6B00" src/app/blog/page.tsx`

If any found, replace with `#111111` for hover states or `#8C7A6B` for label/pill text.

**Step 4: blog/[slug]/page.tsx — prose link color**

```tsx
/* BEFORE */
'--tw-prose-links': '#FF6B00',

/* AFTER */
'--tw-prose-links': '#8C7A6B',
```

```tsx
/* "Schedule a Consultation" CTA on dark bg */
/* BEFORE */
style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}

/* AFTER */
style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A' }}
```

**Step 5: contact/page.tsx — form focus, icons, trust badges, CTA**

```tsx
/* Focus border in inputClass string */
/* BEFORE */
focus:border-[#FF6B00]

/* AFTER */
focus:border-[#0A0A0A]
```

```tsx
/* Error alert border/text */
/* BEFORE */
border: '1px solid rgba(255,107,0,0.3)',
color: '#FF6B00',
backgroundColor: 'rgba(255,107,0,0.08)',

/* AFTER */
border: '1px solid rgba(0,0,0,0.2)',
color: '#333333',
backgroundColor: 'rgba(0,0,0,0.04)',
```

```tsx
/* Validation error text */
/* BEFORE */
style={{ color: '#FF6B00' }}  // all 4 validation error <p> tags

/* AFTER */
style={{ color: '#333333' }}
```

```tsx
/* Mail icon */
/* BEFORE */
<Mail className="w-4 h-4" style={{ color: '#FF6B00' }} />

/* AFTER */
<Mail className="w-4 h-4" style={{ color: '#444444' }} />
```

```tsx
/* Clock and Shield icons */
/* BEFORE */
<Clock className="w-4 h-4" style={{ color: '#FF6B00' }} />
<Shield className="w-4 h-4" style={{ color: '#FF6B00' }} />

/* AFTER */
<Clock className="w-4 h-4" style={{ color: '#444444' }} />
<Shield className="w-4 h-4" style={{ color: '#444444' }} />
```

```tsx
/* Trust badge pills */
/* BEFORE */
style={{ backgroundColor: '#FFF0E6', color: '#FF6B00', border: '1px solid rgba(255,107,0,0.2)' }}

/* AFTER */
style={{ backgroundColor: '#F0EDE9', color: '#8C7A6B', border: '1px solid rgba(140,122,107,0.2)' }}
```

```tsx
/* PCShards inline link */
/* BEFORE */
style={{ color: '#FF6B00' }}

/* AFTER */
style={{ color: '#8C7A6B' }}
```

**Step 6: resources/page.tsx — FREE badge, download CTA, CTA block**

```tsx
/* FREE badge — currently has orange tint */
/* Find and replace: */
/* BEFORE */
backgroundColor: r.free ? '#FFF0E6' : '#111111',
color: r.free ? '#FF6B00' : '#FFFFFF',
border: r.free ? '1px solid rgba(255,107,0,0.2)' : 'none',

/* AFTER */
backgroundColor: r.free ? '#0A0A0A' : '#444444',
color: '#FFFFFF',
border: 'none',
```

```tsx
/* Download button */
/* BEFORE */
style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}

/* AFTER */
style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
```

```tsx
/* "Work With Me" CTA on dark bg */
/* BEFORE */
style={{ backgroundColor: '#FF6B00', color: '#FFFFFF' }}

/* AFTER */
style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A' }}
```

**Step 7: Final verification — grep for any remaining orange**

Run: `grep -rn "FF6B00\|FFF0E6\|FF8C33" src/`
Expected: **zero matches**

If any are found, fix them before committing.

**Step 8: Visual check**

Navigate to each page in browser:
- http://localhost:3000 — hero heading black, pills taupe, CTAs black
- http://localhost:3000/about — icons charcoal, expertise labels taupe, CTA black
- http://localhost:3000/services — icons charcoal, CTA white-on-dark
- http://localhost:3000/blog — tags warm grey/taupe
- http://localhost:3000/contact — focus border dark, trust pills taupe
- http://localhost:3000/resources — FREE badge black, download btn black

**Step 9: Commit**

```bash
git add src/app/about/page.tsx src/app/services/page.tsx src/app/blog/page.tsx "src/app/blog/[slug]/page.tsx" src/app/contact/page.tsx src/app/resources/page.tsx
git commit -m "style: inner pages — replace orange with warm editorial palette"
```
