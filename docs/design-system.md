# Anantapur Design System

The single source of truth for typography, color, motion, radius, and shadow used across this portfolio. Any tool — human, Claude, Cursor, future contributor — must consume this system and never introduce raw hex values, ad-hoc `clamp()`, Tailwind palette colors, or new font families.

**Authoritative files**
- `src/styles/tokens.css` — machine-applied CSS custom properties.
- `src/styles/globals.css` — imports tokens, sets base body/heading rules.
- `docs/design-system.md` — this document; the contract.

If a component cannot express what it needs with existing tokens, **add a token here and in `tokens.css` first**, then use it. Do not patch around the system at the call site.

---

## 1. Foundations

### 1.1 Font families
| Token | Family | Usage |
|---|---|---|
| `--font-sans` | Inter | All body and heading text. Default for everything. |
| `--font-mono` | Geist Mono | Eyebrows, labels, technical metadata, code. **Never** for body or headings. |

No `font-serif`. No third family. Importing another font is a system change that requires updating this document.

### 1.2 Type scale (fluid)
Headings, body, and meta sizes are defined as CSS variables in `tokens.css`. Always use the variable; never inline a `clamp()` or fixed pixel size.

| Token | Role | Value | Tracking | Leading |
|---|---|---|---|---|
| `--fs-display` | Page hero H1 only | `clamp(2.25rem, 7vw, 5.5rem)` | `--tr-display` (-0.03em) | `--lh-display` (1.04) |
| `--fs-h1` | Section title (rare) | `clamp(2rem, 5.5vw, 4rem)` | `--tr-h1` (-0.025em) | `--lh-h1` (1.08) |
| `--fs-h2` | Section heading | `clamp(1.85rem, 3.5vw, 3.35rem)` | `--tr-h2` (-0.02em) | `--lh-h2` (1.12) |
| `--fs-h3` | Sub-section | `clamp(1.25rem, 2vw, 1.75rem)` | `--tr-h3` (-0.01em) | `--lh-h3` (1.2) |
| `--fs-h4` | Card / inline title | `clamp(1.05rem, 1.4vw, 1.25rem)` | `0` | `--lh-h4` (1.3) |
| `--fs-body-lg` | Lead paragraph | `clamp(1.05rem, 1.2vw, 1.15rem)` | `0` | `--lh-body` (1.65) |
| `--fs-body` | Body | `1rem` | `0` | `--lh-body` (1.65) |
| `--fs-body-sm` | Caption / helper | `0.875rem` | `0` | `1.55` |
| `--fs-eyebrow` | Eyebrow / label (mono, uppercase) | `0.6875rem` | `--tr-eyebrow` (0.22em) | `1` |
| `--fs-meta` | Tiny meta (mono) | `0.625rem` | `--tr-meta` (0.18em) | `1` |

**Forbidden:** any `text-[clamp(...)]`, `text-[Xpx]`, or `text-[Xrem]` inline class anywhere outside `tokens.css`. Any letter-spacing other than the `--tr-*` tokens.

**Heading components.** Once P3 lands (`src/components/typography/Heading.tsx`), all headings flow through `<Display>`, `<H1>`, `<H2>`, `<H3>`, `<H4>`, `<Eyebrow>`, `<Meta>`. Inline `<h1>`–`<h6>` with custom classes is a regression.

### 1.3 Color tokens

#### Neutrals (theme-aware)
| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#0C0C10` | `#F5F5F2` | Page background |
| `--surface` | `#16161C` | `#FFFFFF` | Card surface |
| `--surface-2` | `#1E1E26` | `#FAFAF7` | Elevated / nested surface |
| `--border` | white 8% | ink 8% | Default hairline |
| `--border-strong` | white 16% | ink 16% | Hover / focus border |
| `--text` | `#F0F0F4` | `#111827` | Primary text |
| `--text-muted` | white 70% | ink 68% | Body secondary |
| `--text-subtle` | white 55% | ink 55% | Tertiary / metadata |
| `--text-faint` | white 32% | ink 35% | Placeholder / decorative |

**Legacy aliases** `--text-2..5` remain only to keep the codebase compiling during P3. New code must use the semantic names above.

#### Brand
| Token | Dark | Light | Use |
|---|---|---|---|
| `--accent` | `#7C7EF5` | `#4F46E5` | Primary action / link / focus ring |
| `--accent-2` | `#818CF8` | `#6366F1` | Gradient mid-stop |
| `--accent-3` | `#A78BFA` | `#818CF8` | Gradient end-stop |
| `--accent-rgb` | `124, 126, 245` | `79, 70, 229` | For `rgba(var(--accent-rgb), α)` |

**Project brand ramps.** Each case study has its own ramp scoped via a `data-project` attribute on the case-study root. Inside that subtree, `--accent` is automatically remapped — components that consume `--accent` need no change.

| Scope | `--accent` becomes | Use |
|---|---|---|
| `<article data-project="iltc">` | `--brand-iltc` (`#EC6625` / dark `#D9531A`) | IL TakeCare |
| `<article data-project="ilds">` | `--brand-ilds` (`#7C7EF5` / dark `#4F46E5`) | IL Design System |

To add a third case study: add `--brand-foo`, `--brand-foo-2`, `--brand-foo-3` to `tokens.css` and a `[data-project='foo']` block. No component edits required.

#### Semantic state
| Token | Dark | Light | Use |
|---|---|---|---|
| `--success` | `#22C55E` | `#16A34A` | Live status, positive metrics |
| `--warning` | `#F59E0B` | `#B45309` | Caution |
| `--danger` | `#F87171` | `#DC2626` | Form errors, negative metrics |
| `--info` | `#38BDF8` | `#0284C7` | Neutral notice |

**Forbidden:** `text-red-*`, `bg-red-*`, `text-green-*`, `text-zinc-*`, `text-neutral-*`, `text-gray-*`, `text-white`, `text-black`, raw `#hex` outside `tokens.css`. Exception: vendor mockups / SVG artwork that isn't part of the page chrome (e.g., screenshot mockups inside a phone frame).

### 1.4 Radius
| Token | Value |
|---|---|
| `--r-sm` | 8px |
| `--r-md` | 12px |
| `--r-lg` | 16px |
| `--r-xl` | 20px |
| `--r-2xl` | 24px |
| `--r-full` | pill |

**Forbidden:** `rounded-[Xpx]` inline.

### 1.5 Shadow
| Token | Use |
|---|---|
| `--shadow-sm` | Resting card |
| `--shadow-md` | Elevated card on hover |
| `--shadow-lg` | Modal / popover |
| `--shadow-accent` | Primary button glow |

### 1.6 Motion
| Token | Value | Use |
|---|---|---|
| `--ease-out` | cubic-bezier(0.23, 1, 0.32, 1) | Default for entrances and hovers |
| `--ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) | Loops / two-way transitions |
| `--dur-fast` | 150ms | Hover, focus, micro-interaction |
| `--dur-base` | 300ms | Default |
| `--dur-slow` | 500ms | Theme transition, large layout |
| `--dur-xslow` | 700ms | Hero parallax, image reveals |

**Reduced motion is a hard requirement.**
1. `tokens.css` ships a global `@media (prefers-reduced-motion: reduce)` override that flattens animations to ~0ms. This is the floor, not the ceiling.
2. Every interactive transform (`hover:scale-*`, `hover:-translate-*`, `transition-transform`) must be wrapped in Tailwind's `motion-safe:` variant.
3. Components that drive Framer Motion must read `useReducedMotion()` and render a static branch when reduced motion is on. Existing pattern in [`FadeIn`](../src/components/FadeIn.tsx), [`Counter`](../src/components/iltc/IltcImpact.tsx), [`IltcMorph`](../src/components/iltc/IltcMorph.tsx).

---

## 2. Component canon

### 2.1 What is canonical
| Component | Canon location | Notes |
|---|---|---|
| Button (`primary`, `secondary`) | `src/components/Button.tsx` | Polymorphic link/button. Do not reimplement gradient buttons inline. |
| Section + SectionWrapper | `src/components/Section.tsx`, `src/components/SectionWrapper.tsx` | Wraps every page section. |
| ProjectCard | `src/components/ProjectCard.tsx` | One implementation. |
| Theme toggle | `src/components/ThemeToggle.tsx` | One implementation. |
| Skip link + chrome | `src/components/AppChrome.tsx` | The site's only `<main>`. Do not nest. |
| Headings (P3) | `src/components/typography/Heading.tsx` | Will own all heading typography. |

### 2.2 What is NOT canonical (current debt)
- `src/components/Typography.tsx` — `H1`/`H2`/`H3` exist but unused. **Slated for replacement in P3** by the new `Heading` family. Do not import this file in new code.
- `SECTION_H2` string constants in `IltcCaseStudy.tsx` and `IldsCaseStudy.tsx` — duplicated. **Slated for replacement in P3** by `<H2 />`.
- `StageLabel`, `StatCard`, `Counter` — currently per-case-study. **Candidates for canonicalization in P5** if reuse becomes valuable.

---

## 3. Layout & responsiveness

### 3.1 Container
- Default content max-width is `1200px`, applied via `SectionWrapper`. Do not reimplement.
- Hero may break out (full-bleed) but content stays at `≤ 1200px`.

### 3.2 Breakpoints
Tailwind defaults: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`. Use these. Do not introduce custom breakpoints.

### 3.3 Touch + pointer
Any interaction whose primary state-change is `:hover` (StatCard watermark, Hero tilt, Experience row, HeroFloor parallax) **must** have a touch fallback that either:
- Renders the hover state as the default on `(hover: none)`, or
- Replaces the gesture with a tap (toggle on click).

Mouse-only effects ship a gutted experience to ~60% of recruiter traffic and are not acceptable.

---

## 4. Accessibility floor (WCAG 2.1 AA)

Required on every page:
- One `<main id="main-content">` per document. Provided by `AppChrome`. Pages must use a `<div>` or `<article>` as their root, not a second `<main>`.
- Skip-to-content link in chrome. Already provided.
- Focus-visible rings on every interactive element using `--accent` (`focus-visible:ring-2 focus-visible:ring-[var(--accent)]`).
- Heading order is `h1 → h2 → h3 …` with no level skips. Each route has exactly one `<h1>`.
- All non-decorative images have `alt`; decorative SVGs have `aria-hidden="true"`.
- Reduced motion respected (see §1.6).
- Color contrast: body text ≥ 4.5:1, large text (≥ 18.66px / 14pt bold) ≥ 3:1. Use the semantic neutral tokens; they are tuned for AA on both themes.

---

## 5. The contract for tools (Cursor, Claude, future contributors)

When making any visual change in this codebase:

1. **Read this document and `src/styles/tokens.css` first.**
2. **Use tokens.** Never inline raw hex, `rgb()`, `rgba()` (except `rgba(var(--accent-rgb), α)`), `clamp()`, or pixel font sizes. Never use Tailwind palette classes (`text-red-*`, `bg-zinc-*`, `text-white`, `text-black`).
3. **Use canonical components** (§2.1). If a pattern is duplicated three times, lift it into a component before adding the fourth.
4. **Honor `motion-safe:`** on every hover transform. Honor `useReducedMotion()` in every Framer Motion component.
5. **Heading hierarchy is sacred.** Each route has one `<h1>`. Do not skip levels.
6. **If you need a value that does not exist in this document, propose a token edit before writing the component.** Do not patch around the system.
7. **Project brand colors live in scopes.** Inside a case study, use `--accent` and rely on the `data-project` scope to remap it.

A change that violates these rules is a regression even if it ships a feature.

---

## 6. Changelog

| Date | Change |
|---|---|
| 2026-05-04 | P0 — Spec lands. `tokens.css` + this document + `CLAUDE.md` contract. No component changes yet. |
| 2026-05-04 | P1 — Reduced-motion global guard, semantic state tokens (`--success`, `--danger`), 404 themed, all `text-red-*`/`#22C55E`/`text-zinc-*` migrated, `motion-safe:` on hover transforms. |
