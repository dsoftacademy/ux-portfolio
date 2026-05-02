# UX Portfolio (Next.js 15)

Personal portfolio: Next.js App Router, TypeScript, Tailwind, Sanity CMS, static export for **Cloudflare Pages**.

**Status / architecture:** see [docs/project-brief.md](docs/project-brief.md) (includes ILDS static vs Sanity, CI, env, and release checks).

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in NEXT_PUBLIC_SANITY_*
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Use |
|--------|-----|
| `npm run dev` | Local dev server |
| `npm run lint` | ESLint (Next + **jsx-a11y/recommended**) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run validate` | `lint` + `typecheck` (matches CI) |
| `npm run build` | Production static export to `out/` (needs Sanity env) |

## Documentation

- **[docs/project-brief.md](docs/project-brief.md)** — stack, routes, Sanity model, env, quality checklist
- **[docs/go-no-go.md](docs/go-no-go.md)** — portfolio release gates & completion log

## Pages (high level)

- `/` — Home (hero, work from Sanity, impact, experience)
- `/projects`, `/projects/[slug]`, `/projects/ilds-design-system`
- `/about`, `/contact`
