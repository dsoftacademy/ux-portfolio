# CLAUDE.md — Repo contract for AI-assisted edits

This file is the contract every AI tool (Claude Code, Cursor, Copilot, future agents) must obey when touching this codebase. Human contributors should read it too.

## The design system is authoritative

**Before any visual change, read these two files in order:**

1. [`docs/design-system.md`](docs/design-system.md) — the spec.
2. [`src/styles/tokens.css`](src/styles/tokens.css) — the machine-applied tokens.

If a value you need does not exist as a token, **add the token first** in `tokens.css` and document it in the spec. Do not patch around the system at the call site.

## Hard rules — a violation is a regression

These rules apply to every PR that touches `src/**`, `app/**`, or `public/**` in a visual capacity.

### Color
- **No raw hex** in components. Exception: `tokens.css` itself.
- **No Tailwind palette colors** (`text-red-*`, `bg-zinc-*`, `text-neutral-*`, `text-gray-*`, `text-white`, `text-black`).
- Use semantic tokens: `var(--text)`, `var(--text-muted)`, `var(--text-subtle)`, `var(--text-faint)`, `var(--bg)`, `var(--surface)`, `var(--surface-2)`, `var(--border)`, `var(--border-strong)`, `var(--accent)`, `var(--accent-2)`, `var(--accent-3)`, `var(--success)`, `var(--warning)`, `var(--danger)`, `var(--info)`.
- For accent shadows / glows use `rgba(var(--accent-rgb), α)`, not a hardcoded hex.
- Project brand colors (ILTC orange, ILDS pink) are scoped via `data-project="iltc|ilds"` on the case study root. Components consume `--accent`; the scope remaps it.
- Exception: vendor mockups inside phone/screenshot frames may use raw white/black for the screenshot UI itself, not the page chrome.

### Typography
- **No inline `text-[clamp(...)]`, `text-[Xpx]`, `text-[Xrem]`, `tracking-[Xem]`, `leading-[X]`** in components.
- Use the type-scale variables from `tokens.css` (`--fs-*`, `--lh-*`, `--tr-*`).
- After P3 lands, all headings flow through `<Display>` / `<H1>` / `<H2>` / `<H3>` / `<H4>` / `<Eyebrow>` / `<Meta>` from `src/components/typography/Heading.tsx`. Inline `<h1>`–`<h6>` with custom classes is a regression.
- Two font families only: `--font-sans` (Inter) for everything readable, `--font-mono` (Geist Mono) for eyebrows / labels / technical metadata.

### Motion
- Every `hover:scale-*`, `hover:-translate-*`, `transition-transform` must use Tailwind's `motion-safe:` variant.
- Every Framer Motion component reads `useReducedMotion()` and renders a static branch when reduced motion is on.
- A global `prefers-reduced-motion` guard exists in `tokens.css` as a floor — do not rely on it as the only mechanism.

### Accessibility
- Exactly one `<main id="main-content">` per document. `AppChrome` provides it. Page roots use `<div>` or `<article>`.
- Exactly one `<h1>` per route. Heading order does not skip levels.
- Decorative SVGs / icons get `aria-hidden="true"`.
- Focus rings use `--accent`.
- Hover-only interactions need a touch fallback (`@media (hover: none)` default-on, or tap toggle).

### Components
- Reuse canonical components (`Button`, `Section`, `SectionWrapper`, `ProjectCard`, `ThemeToggle`, `AppChrome`). Do not re-implement them inline.
- If a pattern duplicates three times, lift it into a component before adding the fourth.

## Workflow expectations

- Static export — `next.config.js` has `output: 'export'` and `images.unoptimized: true`. `next/image` will not optimize. Ship pre-optimized AVIF/WebP via `<picture>` for any new image asset.
- Run `npm run validate` (lint + typecheck) and `npm run build` before claiming a task complete.
- Commit messages: conventional (`fix(scope): …`, `feat(scope): …`, `style(scope): …`).

## When in doubt

Re-read [`docs/design-system.md`](docs/design-system.md) §5 ("The contract for tools"). If the spec doesn't answer your question, stop and ask before inventing a value.
