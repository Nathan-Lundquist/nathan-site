# Design Doc: Cerulean Color Theme

**Date:** 2026-02-28
**Scope:** Replace the red (#B82416) Vexel color scheme with Cerulean blue across the entire site. Three token swaps — no structural changes.

---

## Color Token Swaps

| Token | Old (Red) | New (Cerulean) | Role |
|---|---|---|---|
| `--color-red` | `#B82416` | `#006FC6` | Primary accent — buttons, labels, headings |
| `--color-cream` | `#FEF4EE` | `#E8F4FD` | Hero bg, sectors bg, card tints |
| `--color-peach` | `#F9C8AF` | `#B3D7F5` | Secondary button bg, inactive states |

---

## All Occurrences to Replace

### In `src/app/globals.css`
- Token definitions in `@theme` block
- `.btn-primary`, `.btn-secondary`, `.btn-outline-white`, `.btn-black` (hover states)
- `.section-label` color

### In all `src/components/*.tsx` files (inline style values)
- Every `#B82416` → `#006FC6`
- Every `#FEF4EE` → `#E8F4FD`
- Every `#F9C8AF` → `#B3D7F5`

### In all `src/app/**/*.tsx` files (inner pages)
- Same three replacements

### Tailwind arbitrary value classes (in JSX className strings)
- `text-[#B82416]` → `text-[#006FC6]`
- `bg-[#B82416]` → `bg-[#006FC6]`
- `hover:text-[#B82416]` → `hover:text-[#006FC6]`
- `border-[#B82416]` → `border-[#006FC6]`
- `text-[#FEF4EE]` → `text-[#E8F4FD]`
- `bg-[#FEF4EE]` → `bg-[#E8F4FD]`
- `text-[#F9C8AF]` → `text-[#B3D7F5]`
- `bg-[#F9C8AF]` → `bg-[#B3D7F5]`

---

## Files Expected to Change

All source files containing the old hex values:
- `src/app/globals.css`
- `src/components/Navbar.tsx`
- `src/components/HeroSection.tsx`
- `src/components/MarqueeStrip.tsx`
- `src/components/AboutSection.tsx`
- `src/components/ServicesSection.tsx`
- `src/components/ApproachSection.tsx`
- `src/components/SectorsSection.tsx`
- `src/components/CTASection.tsx`
- `src/components/TestimonialsSection.tsx`
- `src/components/BlogNewsletterClient.tsx`
- `src/components/Footer.tsx`
- Inner pages in `src/app/`

---

## Out of Scope
- No structural changes
- No copy changes
- No font changes
- `#1A1A1A`, `#333333`, `#646464`, `#E5E5E5`, `#FFFFFF` tokens unchanged
