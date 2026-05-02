# UX Portfolio — project brief

**Purpose:** Personal UX / design leadership portfolio for **Pratishek Bansal** (strategic design, AI-first products, design systems). Marketing site with case-study project pages backed by a headless CMS.

---

## Stack

| Layer | Choice |
|--------|--------|
| Framework | **Next.js 15** (App Router), **React 19**, **TypeScript** |
| Styling | **Tailwind CSS**, CSS variables (theming), **Inter** + **Geist Mono** |
| Motion | **Framer Motion** |
| CMS | **Sanity v4** (`next-sanity`, `@sanity/image-url`, Vision in `sanity.config.ts`) |
| Deploy | **Static export** (`output: 'export'` in `next.config.js`) → **Cloudflare Pages** (unoptimized images for static hosting) |

---

## Routes (App Router)

- `/` — Home: hero, skill marquee, impact, experience, selected work from Sanity `project` documents
- `/projects` — Project grid
- `/projects/[slug]` — Individual project (GROQ + portable text / images)
- `/projects/ilds-design-system` — ILDS case study (local page + shared components)
- `/about`, `/contact` — Static pages
- **Sanity Studio** — `basePath: '/studio'` in `sanity.config.ts`; embed under `src/app/studio` when you wire the dev route

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

- **Lint:** `jsx-a11y/recommended` is enabled alongside Next defaults; keep `npm run lint` clean before merge.
- **Accessibility / performance:** Run Lighthouse (or axe DevTools) on `/`, `/projects`, and key case studies before major releases; static export has no server runtime, so checks are client-side only.
- **Docs hub:** Add deeper notes under `docs/` (deploy runbooks, content workflow) and link from here.
