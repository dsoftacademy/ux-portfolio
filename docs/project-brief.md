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
- `/projects` — Project grid (Sanity + bespoke cards for static flagship case studies)
- `/projects/[slug]` — CMS-driven case study (GROQ + Portable Text / images). **Slugs `ilds-design-system` and `il-takecare` are excluded** from this route so bespoke pages own them (`generateStaticParams` in `src/app/projects/[slug]/page.tsx`).
- `/projects/ilds-design-system` — **Static** ILDS case study (`IldsCaseStudy`).
- `/projects/il-takecare` — **Static** IL TakeCare case study (`IltcCaseStudy`, `IltcMorph`, `IltcImpact`).
- `/about`, `/contact` — Static pages
- **Sanity Studio** — `basePath: '/studio'` in `sanity.config.ts`; embed under `src/app/studio` when you wire the dev route

---

## CMS vs static (ILDS & IL TakeCare)

- **Sanity `project` rows** with slugs **`ilds-design-system`** or **`il-takecare`** may still appear on grids; the repo prepends **bespoke** entries and filters duplicate slugs, with local art (`ilds-cover.png`, `iltc-cover.svg`) when CMS has no image.
- **Full narratives** live in **`src/components/ilds/`** and **`src/components/iltc/`** (not Portable Text in Sanity). CMS-driving later means structured fields + removing the static route / `generateStaticParams` exclusions for that slug.

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
- **Go / No-Go board:** [docs/go-no-go.md](go-no-go.md) — case-study gates (ILDS, TakeCare, NYSA), site quality, application readiness, completion log.
- **Docs hub:** Add deeper notes under `docs/` (deploy runbooks, content workflow) and link from here.
