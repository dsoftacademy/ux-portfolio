# UX Portfolio — project brief

**Purpose:** Personal UX / design leadership portfolio for **Pratishek Bansal** (strategic design, AI-first products, design systems). Marketing site with case-study project pages backed by a headless CMS.

**Last reviewed:** May 2026

---

## Project status

| Area | State |
|------|--------|
| **Branch** | `main` in sync with `origin` |
| **CI** | GitHub Actions runs `npm ci` + `npm run validate` (ESLint + `tsc`) on push and PRs to `main` (`.github/workflows/ci.yml`) |
| **Deploy** | Static export (`next build` → `out/`) on **Cloudflare Pages**; set the same `NEXT_PUBLIC_*` env vars as in `.env.example` in the Pages project |
| **Build** | Local `npm run build` requires Sanity env (or equivalent) for GROQ fetches at build time |
| **Accessibility** | Recent pass: landmark/heading semantics, experience timeline contrast (`--text-4` + no row-level opacity dimming), `jsx-a11y/recommended` in ESLint; Lighthouse used as release gate |
| **About** | Profile image: `public/images/profile.jpg` → `/images/profile.jpg` in `about/page.tsx` |
| **Secrets** | `.env.local` is **not** tracked; `.env.example` documents public vars only |

**Recent commits (themes):** profile asset, gitignore + untrack secrets, docs hub + CI, stricter a11y linting, experience contrast fix.

---

## Stack

| Layer | Choice |
|--------|--------|
| Framework | **Next.js 15** (App Router), **React 19**, **TypeScript** |
| Styling | **Tailwind CSS**, CSS variables (theming), **Inter** + **Geist Mono** |
| Motion | **Framer Motion** |
| CMS | **Sanity v4** (`next-sanity`, `@sanity/image-url`, Vision in `sanity.config.ts`) |
| Deploy | **Static export** (`output: 'export'` in `next.config.js`) → **Cloudflare Pages** (unoptimized images for static hosting) |
| Analytics | Optional **Umami** via `NEXT_PUBLIC_UMAMI_WEBSITE_ID` in `src/app/layout.tsx` |

---

## Routes (App Router)

- `/` — Home: hero, skill marquee, impact, experience, selected work from Sanity `project` documents
- `/projects` — Project grid (Sanity)
- `/projects/[slug]` — CMS-driven case study (GROQ + Portable Text / images). **Slug `ilds-design-system` is excluded** from this route so it does not duplicate the bespoke page (`generateStaticParams` filter in `src/app/projects/[slug]/page.tsx`).
- `/projects/ilds-design-system` — **Static** ILDS case study: `src/app/projects/ilds-design-system/page.tsx` renders `IldsCaseStudy` (no Sanity body fetch).
- `/about`, `/contact` — Static pages
- **Sanity Studio** — `basePath: '/studio'` in `sanity.config.ts`; embed under `src/app/studio` when you wire the dev route

---

## CMS vs static (ILDS)

- **Sanity `project` with slug `ilds-design-system`** can still appear on the **home** and **`/projects`** grids (title, excerpt, category, link to `/projects/ilds-design-system`). The repo uses a local hero fallback image `public/images/ilds-cover.png` when CMS image is missing.
- **Full ILDS narrative** (phases, audit, numbers, components) lives in **`src/components/ilds/`** and is **not** edited through Sanity today. To CMS-drive ILDS later, you would replace or hydrate `IldsCaseStudy` with Portable Text + structured fields and remove the static route / `generateStaticParams` exclusion.

---

## Sanity content model

Registered in `src/sanity/schemaTypes/index.ts`:

- **project** — Case studies (slug, images, category, rich content)
- **siteSettings** — Global copy (title, tagline, meta, contact links)
- **post**, **author**, **category**, **blockContent** — Blog-style structure (structure builder in `structure.ts`)

Fetch: `src/sanity/lib/client.ts`, images: `src/sanity/lib/image.ts`.

---

## Environment

Copy **`.env.example`** → **`.env.local`** (never commit `.env.local`). Set `NEXT_PUBLIC_SANITY_*` and optional `NEXT_PUBLIC_UMAMI_WEBSITE_ID`. Cloudflare Pages should mirror the same public env vars.

---

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run validate     # lint + TypeScript (CI-friendly)
npm run build        # static `out/` — needs .env.local or CI env for Sanity fetches
```

---

## Quality & releases

- **Lint:** `jsx-a11y/recommended` plus Next defaults; keep `npm run lint` clean before merge.
- **Accessibility / performance:** Run Lighthouse (or axe DevTools) on `/`, `/projects`, `/about`, and `/projects/ilds-design-system` before major releases; static export has no server runtime, so checks are client-side only.
- **Docs hub:** Add deeper notes under `docs/` (deploy runbooks, content workflow) and link from here.
