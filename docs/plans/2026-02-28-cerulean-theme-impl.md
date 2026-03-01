# Cerulean Color Theme — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the red Vexel color scheme (`#B82416` red, `#FEF4EE` cream, `#F9C8AF` peach) with cerulean blue (`#006FC6`, `#E8F4FD`, `#B3D7F5`) across every source file.

**Architecture:** Three global find-and-replace passes using sed across all `.tsx` and `.css` files in `src/`. No structural changes — only hex color values change. Also update the color comments in `page.tsx`.

**Tech Stack:** Next.js 15, Tailwind CSS v4, TypeScript. Colors appear as inline `style={{ color: '#B82416' }}` props, Tailwind arbitrary-value classes like `text-[#B82416]`, and CSS `@theme` token values.

---

## Verification command (use after the task)

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -8
```

Expected: `✓ Compiled successfully`, zero TypeScript errors.

---

### Task 1: Global color replacement — all three tokens

**Files:** All `src/**/*.tsx` and `src/app/globals.css`

This task does three sed passes to swap all three color tokens everywhere they appear in source files.

**Step 1: Run the three replacement passes**

```bash
cd C:/Users/whyme/nathan-site

# Pass 1: red → cerulean
find src/ -type f \( -name "*.tsx" -o -name "*.css" \) | xargs sed -i 's/#B82416/#006FC6/g'

# Pass 2: cream → light cerulean
find src/ -type f \( -name "*.tsx" -o -name "*.css" \) | xargs sed -i 's/#FEF4EE/#E8F4FD/g'

# Pass 3: peach → soft cerulean
find src/ -type f \( -name "*.tsx" -o -name "*.css" \) | xargs sed -i 's/#F9C8AF/#B3D7F5/g'
```

**Step 2: Verify zero occurrences of old colors remain**

```bash
cd C:/Users/whyme/nathan-site && grep -r "#B82416\|#FEF4EE\|#F9C8AF" src/ --include="*.tsx" --include="*.css"
```

Expected: **no output** (zero matches). If any remain, re-run the relevant sed pass.

**Step 3: Spot-check key files**

```bash
# Check globals.css tokens
grep -A2 "color-red\|color-cream\|color-peach" src/app/globals.css

# Check CTASection background (was red, now cerulean)
grep "backgroundColor" src/components/CTASection.tsx | head -3

# Check HeroSection headline color
grep "color.*006FC6" src/components/HeroSection.tsx | head -3
```

Expected globals.css output:
```
--color-red: #006FC6;
--color-cream: #E8F4FD;
--color-peach: #B3D7F5;
```

**Step 4: Update page.tsx color comments**

Open `src/app/page.tsx` and update the inline comments that reference old colors:

Old:
```tsx
      <HeroSection />           {/* 01 — cream #FEF4EE */}
      <SectorsSection />        {/* 06 — cream #FEF4EE */}
      <CTASection />            {/* 07 — red #B82416 */}
```

New:
```tsx
      <HeroSection />           {/* 01 — light cerulean #E8F4FD */}
      <SectorsSection />        {/* 06 — light cerulean #E8F4FD */}
      <CTASection />            {/* 07 — cerulean #006FC6 */}
```

**Step 5: Run build**

```bash
cd C:/Users/whyme/nathan-site && npm run build 2>&1 | tail -10
```

Expected: clean build, no TypeScript errors.

**Step 6: Commit**

```bash
cd C:/Users/whyme/nathan-site && git add -A && git commit -m "feat: swap red theme to cerulean (#006FC6, #E8F4FD, #B3D7F5)"
```

Report the commit hash.
