# Cursor — Action plan for Phases P2 → P4

This is a self-contained brief for Cursor (or any future contributor) to finish the design-system unification work. **Read [`docs/design-system.md`](design-system.md) and [`CLAUDE.md`](../CLAUDE.md) before starting any phase.** Those are the contract; this is the execution plan.

P0 (spec lands) and P1 (a11y + theme correctness) are already merged. The remaining phases are P2 (color tokenization), P3 (typography unification), and P4 (mobile + content polish). Each phase ships as one PR.

---

## How to work in this codebase

- **Static export.** `next.config.js` has `output: 'export'` and `images.unoptimized: true`. `next/image` will not optimize. Ship pre-optimized assets.
- **Validate before ending.** `npm run validate` (lint + typecheck) and `npm run build` must both pass.
- **Manual verification.** After any visual change, start the dev server and walk through these six routes: `/`, `/projects`, `/projects/il-takecare`, `/projects/ilds-design-system`, `/about`, `/contact`, `/404` (or any unknown path). Toggle dark / light. Resize to 375 / 768 / 1024 / 1440. Screenshot anything that looks off.
- **Commit style.** Conventional. Examples: `refactor(tokens): tokenize accent gradients`, `feat(typography): introduce Heading components`, `perf(images): convert ILTC assets to AVIF/WebP`.

---

# Phase P2 — Color tokenization

**Goal:** Eliminate every hardcoded brand hex outside `src/styles/tokens.css`. Components should consume `--accent`, `--accent-2`, `--accent-3`, and the project-scoped `data-project` mechanism.

**Scope:** ~85 hex occurrences across the components below. Visual output should be **pixel-identical** at the end of the phase. Open `git diff` and confirm the only delta is hex → token references.

## P2.1 — Site-wide accent ramp

Replace these three hexes with tokens **everywhere they appear**:

| Hex | Replacement |
|---|---|
| `#6366F1` | `var(--accent-2)` (in dark; in light this maps to `#6366F1` already) |
| `#818CF8` | `var(--accent-3)` |
| `#A78BFA` | `var(--accent-3)` (or extend tokens to add `--accent-4` if you need a fourth stop) |

For shadows / glows like `rgba(99,102,241,0.25)`, replace with `rgba(var(--accent-rgb), 0.25)`.

### Files to edit

| File | Sites | Pattern |
|---|---|---|
| [`src/components/Button.tsx`](../src/components/Button.tsx) | line 40 | `from-[#6366F1] to-[#818CF8] … shadow-[0_6px_20px_rgba(99,102,241,0.25)]` → `from-[var(--accent-2)] to-[var(--accent-3)] … shadow-[0_6px_20px_rgba(var(--accent-rgb),0.25)]` |
| [`src/app/about/page.tsx`](../src/app/about/page.tsx) | line ~82 | inline gradient button uses the same hex pair — same swap |
| [`src/components/Hero.tsx`](../src/components/Hero.tsx) | search the file | `#6366F1`, `#818CF8`, `#A78BFA` in inline gradients / outlines |
| [`src/components/HeroArtifacts.tsx`](../src/components/HeroArtifacts.tsx) | search the file | hardcoded white/black/purple in mockup chrome — see exception below |
| [`src/components/StatCard.tsx`](../src/components/StatCard.tsx) | line ~72 | watermark gradient + stat number gradient |
| [`src/components/Impact.tsx`](../src/components/Impact.tsx) | similar pair to StatCard |
| [`src/components/ilds/IldsCaseStudy.tsx`](../src/components/ilds/IldsCaseStudy.tsx) | hero gradient `from-[#7C7EF5] via-[#A78BFA] to-[#EC4899]` | this is the **ILDS brand ramp** — see P2.3 |

### Exception
Mockup UIs inside HeroArtifacts (phone frames / fake screenshots) intentionally use raw white/black to look like a foreign UI. Keep those. Only swap the hexes that are part of the page chrome itself (button, card border, focus ring).

### Acceptance
```bash
# After P2.1, this should return only the three tokens.css matches:
grep -rn "#6366F1\|#818CF8\|#A78BFA" src/
```
…and visually `/` should look identical.

## P2.2 — ILTC brand scope

Currently `#EC6625` (orange), `#F08C46`, `#F5A06A` are hardcoded ~35 times across `IltcCaseStudy.tsx`, `IltcImpact.tsx`, `IltcMorph.tsx`. Replace with the existing `--brand-iltc*` tokens via a `data-project` scope.

### Steps
1. **Add `data-project="iltc"` to the case study root.**
   - File: [`src/components/iltc/IltcCaseStudy.tsx`](../src/components/iltc/IltcCaseStudy.tsx)
   - The root element (already a `<div>` after the P0 nested-`<main>` fix) becomes `<div data-project="iltc">…</div>`.
   - This automatically remaps `--accent` → `--brand-iltc` *only inside this subtree* (see [`tokens.css`](../src/styles/tokens.css) `[data-project='iltc']` block).

2. **Bulk replace inside `src/components/iltc/`:**
   | Hex | Replacement |
   |---|---|
   | `#EC6625` | `var(--accent)` |
   | `#F08C46` | `var(--accent-2)` |
   | `#F5A06A` | `var(--accent-3)` |
   | `rgba(236,102,37,…)` | `rgba(var(--accent-rgb), …)` |

3. **For SVG `fill="..."` and `stroke="..."` attributes** (Framer / inline SVG can't read CSS vars in attributes pre-render), keep them as `currentColor` and set `color: var(--accent)` on the parent. Where that's awkward, use inline `style={{ color: 'var(--accent)' }}` and `fill="currentColor"`.

4. **Renamed gradient stops.** Where you see things like `from-[#EC6625] via-[#F08C46] to-[#F5A06A]`, rewrite as `from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)]`.

### Acceptance
- `grep -rn "#EC6625\|#F08C46\|#F5A06A" src/components/iltc/` returns nothing.
- ILTC case study looks identical to before in dark mode.
- In light mode, the orange should read as `#D9531A` (slightly darker — this is intentional for AA contrast, see [`tokens.css`](../src/styles/tokens.css)).

## P2.3 — ILDS brand scope

Same pattern. ILDS uses a purple → pink ramp.

### Steps
1. Add `data-project="ilds"` to the ILDS case study root in [`src/components/ilds/IldsCaseStudy.tsx`](../src/components/ilds/IldsCaseStudy.tsx).
2. The hero gradient `from-[#7C7EF5] via-[#A78BFA] to-[#EC4899]` becomes `from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)]` — the `data-project="ilds"` scope binds those to `--brand-ilds`, `--brand-ilds-2`, `--brand-ilds-3` (purple → purple → pink).
3. Replace any other ILDS-specific hex in `src/components/ilds/` similarly.

### Acceptance
- `grep -rn "#7C7EF5\|#A78BFA\|#EC4899\|#DB2777" src/components/ilds/` returns nothing.
- ILDS case study looks identical.

## P2.4 — Audit pass

```bash
# After P2 complete, this should be empty (only tokens.css should match):
grep -rEn "#[0-9A-Fa-f]{3,6}" src/components/ src/app/ | grep -v "tokens.css"
```

A few exceptions are acceptable and should be **commented inline** to explain why:
- Mockup UIs inside phone frames (e.g., `HeroArtifacts.tsx` showing fake "search…" UI).
- Vendor SVG artwork that has its own palette.

---

# Phase P3 — Typography unification

**Goal:** One canonical heading system. No inline `clamp()`, no inline `text-[size]`, no duplicated `SECTION_H2` constants.

## P3.1 — Build the Heading components

Create `src/components/typography/Heading.tsx`:

```tsx
import * as React from "react"
import { cn } from "@/lib/cn"

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4"
  className?: string
  children: React.ReactNode
}

export function Display({ className, children, as: Tag = "h1" }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-extrabold text-[var(--text)]",
        "text-[length:var(--fs-display)] leading-[var(--lh-display)] tracking-[var(--tr-display)]",
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function H1({ className, children, as: Tag = "h1" }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-extrabold text-[var(--text)]",
        "text-[length:var(--fs-h1)] leading-[var(--lh-h1)] tracking-[var(--tr-h1)]",
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function H2({ className, children, as: Tag = "h2" }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-extrabold text-[var(--text)]",
        "text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--tr-h2)]",
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function H3({ className, children, as: Tag = "h3" }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-bold text-[var(--text)]",
        "text-[length:var(--fs-h3)] leading-[var(--lh-h3)] tracking-[var(--tr-h3)]",
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function H4({ className, children, as: Tag = "h4" }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-bold text-[var(--text)]",
        "text-[length:var(--fs-h4)] leading-[var(--lh-h4)]",
        className
      )}
    >
      {children}
    </Tag>
  )
}

type LabelProps = { className?: string; children: React.ReactNode }

export function Eyebrow({ className, children }: LabelProps) {
  return (
    <p
      className={cn(
        "font-mono uppercase font-bold text-[var(--accent)]",
        "text-[length:var(--fs-eyebrow)] tracking-[var(--tr-eyebrow)]",
        className
      )}
    >
      {children}
    </p>
  )
}

export function Meta({ className, children }: LabelProps) {
  return (
    <span
      className={cn(
        "font-mono uppercase text-[var(--text-subtle)]",
        "text-[length:var(--fs-meta)] tracking-[var(--tr-meta)]",
        className
      )}
    >
      {children}
    </span>
  )
}
```

## P3.2 — Migrate every heading to the new components

This is the bulk of P3. Work file-by-file.

### Migration table

| Site | Current | New |
|---|---|---|
| [`Hero.tsx:45`](../src/components/Hero.tsx) | `<h1 className="text-[clamp(40px,5.5vw,64px)]…">` | `<Display>…</Display>` (will be slightly larger — that is intentional, the Hero deserves the display scale) |
| [`Hero.tsx`] eyebrow `"PRINCIPAL UX/UI DESIGN"` | inline `font-mono text-[11px] uppercase tracking-[0.3em]` | `<Eyebrow>…</Eyebrow>` |
| [`about/page.tsx:36`](../src/app/about/page.tsx) | `<h1 className="text-[clamp(2rem,6vw,4.5rem)]…">` | `<Display>…</Display>` |
| [`IltcCaseStudy.tsx:120`](../src/components/iltc/IltcCaseStudy.tsx) | `<h1 className="text-[clamp(2.25rem,7vw,5.5rem)]…">` | `<Display>…</Display>` |
| [`IldsCaseStudy.tsx:103`](../src/components/ilds/IldsCaseStudy.tsx) | same `<h1>` pattern | `<Display>…</Display>` |
| `SECTION_H2` constant — IltcCaseStudy line 16, IldsCaseStudy line 13 | string `text-[1.85rem] sm:text-[2.1rem] md:text-[2.65rem] lg:text-[3.35rem] font-extrabold tracking-tight` | **Delete the constants.** Replace every `<h2 className={…SECTION_H2…}>` with `<H2>`. |
| StageLabel index, eyebrow labels (case studies + ProjectCard + Section) | various inline `text-[11px] font-bold uppercase tracking-[0.22em]` | `<Eyebrow>` |
| `text-[10px] uppercase tracking-widest` metadata | various | `<Meta>` |
| [`Section.tsx`](../src/components/Section.tsx) section title | inline classes | `<H2>` |
| [`Typography.tsx`](../src/components/Typography.tsx) | unused `H1` / `H2` / `H3` | **DELETE the file** after migration. |

### Conventions during migration
- One `<Display>` (`<h1>`) per route. Walk every page and confirm.
- Section titles use `<H2>`.
- Sub-section titles use `<H3>`.
- Card titles use `<H4>`.
- Eyebrows above titles use `<Eyebrow>`.
- Tiny meta (`9px`–`11px` uppercase) uses `<Meta>`.

### Custom sizes
If a heading legitimately needs a one-off override (rare), pass `className` — but **only utility classes**, never an inline `text-[clamp(...)]`. If the case is common enough to repeat, add a token to `tokens.css` and update this doc.

## P3.3 — Heading hierarchy fixes

While migrating, fix these specific issues identified in the audit:

1. **ILTC case study has two near-duplicate `<h2>`s** for "From revamp to results…" — [IltcCaseStudy.tsx:355](../src/components/iltc/IltcCaseStudy.tsx#L355) (narrative section 09) and [IltcCaseStudy.tsx:386](../src/components/iltc/IltcCaseStudy.tsx#L386) (Impact section). Differentiate copy: the narrative one becomes "Why the redesign worked" or similar; the Impact one remains "Outcomes in numbers" / "From revamp to results."
2. **Case study pages have no `<h1>`** — they start with `<h2>`. After P3.2 the top headline is a `<Display>` (`<h1>`), so this fixes itself. Verify by checking each route's accessibility tree in DevTools.
3. **Section.tsx** — currently uses `<h2>` for sections that may or may not be the page's primary heading. Keep as `<h2>`; routes that mount `Section` always have a `Hero`/`Display` providing the `<h1>`.

## P3.4 — Eyebrow/Meta letter-spacing cleanup

After eyebrows go through `<Eyebrow>`, `tracking-[0.22em]` / `tracking-[0.3em]` / `tracking-widest` should be gone. Sweep:

```bash
grep -rEn "tracking-\[0\.[0-9]+em\]|tracking-widest" src/components/ src/app/
```

…and if any survive, either route them through `<Eyebrow>` / `<Meta>` or remove them.

## P3.5 — Acceptance

- `grep -rEn "text-\[clamp\(" src/components/ src/app/` returns **nothing**.
- `grep -n "SECTION_H2" src/` returns nothing.
- `src/components/Typography.tsx` is deleted.
- Each route has exactly one `<h1>` (verify in DevTools accessibility tree).
- `npm run validate && npm run build` pass.
- Visual diff: heading sizes may shift 1–2px from before; Hero specifically gets slightly larger (uses `--fs-display` now). Confirm acceptable, or tune `--fs-display` in `tokens.css` if not.

---

# Phase P4 — Mobile + content polish

**Goal:** Close the three remaining recruiter-visible gaps: mobile interaction, missing back-links, image weight.

## P4.1 — Touch-friendly hover effects

Anywhere a hover reveals state that mobile users never see, add a touch fallback. Use the `(hover: none)` media query as the canonical way to detect touch-primary devices.

### Sites to fix

| File | Issue | Fix |
|---|---|---|
| [`Hero.tsx`](../src/components/Hero.tsx) | mouse-tilt 3D effect (`onMouseMove`) | On `(hover: none)`, render the static / final tilt state (or no tilt). Add a CSS class `.hero-tilt` and gate the JS with `if (window.matchMedia('(hover: hover)').matches)`. |
| [`HeroFloor.tsx`](../src/components/HeroFloor.tsx) | parallax orbs follow mouse | Same — disable mouse listener on touch; render at static neutral position. |
| [`StatCard.tsx`](../src/components/StatCard.tsx) | watermark only appears on hover | On `(hover: none)`, show watermark by default at lower opacity. |
| [`Experience.tsx`](../src/components/Experience.tsx) | row translateX on hover | On `(hover: none)`, no transform; provide a tap state (focus visible) instead. |
| [`HeroArtifacts.tsx`](../src/components/HeroArtifacts.tsx) | 13 SVG artifacts off-canvas on mobile | Below `md:`, hide the entire artifact layer (`hidden md:block`). They add weight without being seen. |

### Pattern
```tsx
// In a component that uses onMouseMove:
const canHover = typeof window !== 'undefined'
  ? window.matchMedia('(hover: hover)').matches
  : true
useEffect(() => {
  if (!canHover) return
  // ... mouse listener
}, [canHover])
```

```css
/* Or pure CSS — preferred when possible */
@media (hover: none) {
  .stat-card .watermark { opacity: 0.5; }
  .experience-row { transform: none !important; }
}
```

## P4.2 — Back-links on case studies

ILTC and ILDS detail pages currently have no "Back to projects" link.

### Add to both
At the top of each case study root (just inside `data-project="…"`), add:

```tsx
<div className="mb-8">
  <Link
    href="/projects"
    className="group inline-flex items-center gap-2 font-mono text-[length:var(--fs-eyebrow)] uppercase tracking-[var(--tr-eyebrow)] text-[var(--text-subtle)] transition-colors hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
  >
    <span className="transition-transform motion-safe:group-hover:-translate-x-1" aria-hidden>&larr;</span>
    Back to projects
  </Link>
</div>
```

Files: [`IltcCaseStudy.tsx`](../src/components/iltc/IltcCaseStudy.tsx), [`IldsCaseStudy.tsx`](../src/components/ilds/IldsCaseStudy.tsx).

## P4.3 — Image weight

The biggest user-visible perf win. The 11 PNGs ≥1 MB account for ~25 MB on the ILTC case study alone.

### Plan
1. **Re-export the heavy assets to AVIF + WebP + a small PNG fallback.** The largest offenders, in priority order:
   | File | Current size | Target sizes |
   |---|---|---|
   | `iltc-feat-cohort.png` | 4.7 MB | AVIF ~250 KB, WebP ~400 KB, PNG fallback ~600 KB |
   | `iltc-feat-lifestyle.png` | 3.4 MB | same |
   | `iltc-feat-core.png` | 2.3 MB | same |
   | `iltc-screen-winback.png` | 2.3 MB | AVIF ~150 KB, WebP ~250 KB |
   | `iltc-screen-new.png` | 2.0 MB | same |
   | `iltc-cover-hero.png` | 1.7 MB | same |
   | `iltc-mockup.png` | 1.8 MB | same |
   | `iltc-screen-active.png` | 1.6 MB | same |
   | `s08-cohort-active.png` | 1.8 MB | same |
   | `s08-cohort-winback.png` | 1.6 MB | same |
   | `s08-cohort-new.png` | 1.4 MB | same |
   | `s08-telematics.png` | 1.3 MB | same |
   | `iltc-feat-wellness.png` | 1.1 MB | same |

2. **Tooling.** Use `sharp` (Node) or `cwebp`/`avifenc` CLI. Recommended one-off script `scripts/optimize-images.mjs`:
   ```js
   import sharp from 'sharp'
   import { readdir } from 'node:fs/promises'
   import path from 'node:path'

   const dir = 'public/images'
   const files = (await readdir(dir)).filter(f => /^(iltc-|s08-).*\.png$/.test(f))
   for (const f of files) {
     const src = path.join(dir, f)
     const stem = f.replace(/\.png$/, '')
     await sharp(src).avif({ quality: 55 }).toFile(path.join(dir, `${stem}.avif`))
     await sharp(src).webp({ quality: 78 }).toFile(path.join(dir, `${stem}.webp`))
     // Keep PNG as fallback for older browsers, but resize to max 1600px wide:
     await sharp(src).resize({ width: 1600, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true }).toFile(path.join(dir, `${stem}-fallback.png`))
   }
   ```
   Run once: `npm i -D sharp && node scripts/optimize-images.mjs`. Commit the new files. Delete the originals only after the swap is in place and verified.

3. **Replace `<img>` tags with `<picture>`** in the case study components. Pattern:
   ```tsx
   <picture>
     <source type="image/avif" srcSet="/images/iltc-feat-cohort.avif" />
     <source type="image/webp" srcSet="/images/iltc-feat-cohort.webp" />
     <img
       src="/images/iltc-feat-cohort-fallback.png"
       alt="…"
       width={1600}
       height={1000}
       loading="lazy"
       decoding="async"
       className="…"
     />
   </picture>
   ```
   `width` / `height` prevents CLS. `loading="lazy"` everywhere except the very first hero image (use `loading="eager"` + `fetchpriority="high"` for that one).

4. **Above-the-fold hero image** (`iltc-cover-hero.png`): preload it.
   ```tsx
   // In the case study page metadata:
   export const metadata = {
     // ...
   }
   // In <head>: <link rel="preload" as="image" href="/images/iltc-cover-hero.avif" type="image/avif" />
   ```

### Acceptance
- `du -sh public/images` drops from ~40 MB to ~5 MB.
- `npm run build` succeeds.
- Lighthouse on `/projects/il-takecare`: LCP under 2.5s on a throttled 4G profile (was probably 5–8s before).
- No visual regression at the rendered sizes.

## P4.4 — Cohort grid mobile height

[`IltcCaseStudy.tsx:1197`](../src/components/iltc/IltcCaseStudy.tsx#L1197) has `height: clamp(600px, 99.21vw, 1500px)`. On a 375px-wide phone the floor is still 600px tall — three of these stacked is brutal.

Change to:
```tsx
style={{ height: 'clamp(min(70dvh, 600px), 99.21vw, 1500px)' }}
```

…or drop the floor entirely on small viewports:
```tsx
className="aspect-[3/4] md:aspect-auto md:h-[clamp(600px,99.21vw,1500px)]"
```

Pick whichever reads cleaner.

## P4.5 — Acceptance for P4

- Touch-only walkthrough on iPhone Safari simulator (or actual iPhone): Hero, StatCard watermark, Experience row, Cohort grid all behave well; nothing depends on hover.
- ILTC and ILDS pages have a visible Back link at the top.
- Network panel on `/projects/il-takecare`: page weight under 5 MB total (was ~30 MB).
- Lighthouse mobile: Performance ≥ 80, Accessibility ≥ 95.

---

# Phase order recommendation

P0 ✅ → P1 ✅ → **P3 → P2 → P4**.

Reasoning:
- **P3 next** is the most recruiter-visible work (typography unification turns the codebase into evidence of design-system thinking) and has the highest "one PR, big effect" ratio.
- **P2** is a quiet refactor that is safer once `<Display>` / `<H2>` etc. are in place and many heading-adjacent files are already touched.
- **P4** is the perf + mobile pass — best done last so we're not optimizing images that we then re-crop, and so reduced-motion + mobile fallbacks land on the final layout.

Each phase should be a single PR with the acceptance checks above passing.

---

# Definition of done (the whole programme)

- `grep -rEn "#[0-9A-Fa-f]{3,6}" src/components/ src/app/ | grep -v "tokens.css"` → only commented exceptions.
- `grep -rEn "text-\[clamp\(|text-\[1[0-9]px\]|text-\[2[0-9]px\]|tracking-\[0\.[0-9]+em\]" src/components/ src/app/` → empty.
- `grep -rn "text-red-\|text-zinc-\|text-neutral-\|text-gray-\|text-white\|text-black" src/components/ src/app/ | grep -v "// EXCEPTION"` → empty (or commented).
- All hover transforms use `motion-safe:`. All Framer Motion components honor `useReducedMotion()`.
- Each route has exactly one `<h1>`.
- ILTC and ILDS pages weigh under 5 MB each.
- Mobile (375px) walkthrough has no broken interactions.
- Light + dark themes both render every route correctly.
- `npm run validate && npm run build` clean.
