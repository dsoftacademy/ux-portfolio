# UX Portfolio — handoff report for Claude

**Generated for:** Continuity with another assistant (Claude or similar).  
**Workspace path (verify locally):** `/Users/pb09/ux-portfolio`  
**Principle:** Facts below are grouped by **source of truth** (git history, working tree, this chat). Where something could drift (env values, `out/`), the report tells you exactly which file or command to re-check.

---

## 1. What this repository is

- **Name / npm package:** `ux-portfolio` (`package.json`).
- **Purpose:** Personal portfolio for **Pratishek Bansal** — UX / design leadership positioning (see default metadata in `src/app/layout.tsx`: title template and description).
- **Runtime model:** **Next.js 15** App Router, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Sanity v4** for content, **styled-components** (Sanity-related), **Geist** mono + **Inter** (`package.json`, `src/app/layout.tsx`).
- **Deploy posture:** **Static HTML export** — `next.config.js` sets `output: 'export'` and `images.unoptimized: true`, with an inline comment stating Cloudflare Pages. Build output directory is **`out/`** (standard for `next export` / static export).

**Verify:** `package.json`, `next.config.js`, `src/app/layout.tsx`.

---

## 2. Repository map (high-signal paths)

| Area | Path | Notes |
|------|------|--------|
| App routes | `src/app/page.tsx`, `about/page.tsx`, `contact/`, `projects/page.tsx`, `projects/[slug]/page.tsx` | Home fetches Sanity `project` docs; projects pages use GROQ + `urlFor` |
| Global UI | `src/components/` (e.g. `AppChrome.tsx`, `Hero.tsx`, `Button.tsx`) | `AppChrome` treats `/studio` as studio shell (`pathname` check) |
| Sanity client | `src/sanity/lib/client.ts`, `src/sanity/lib/image.ts` | Uses `NEXT_PUBLIC_*` env |
| Sanity env | `src/sanity/env.ts` | `projectId`, `dataset`, `apiVersion` (default `2026-03-17` if env missing for API version) |
| Schema | `src/sanity/schemaTypes/` + `index.ts` | `project`, `siteSettings`, `post`, `author`, `category`, `blockContent` |
| Structure | `src/sanity/structure.ts` | Blog group titles |
| Studio config (root) | `sanity.config.ts`, `sanity.cli.ts` | `basePath: '/studio'`; comment still references `app/studio/[[...tool]]/page.tsx` — see **§5 contradiction** |
| Obsidian-style hub (new, untracked) | `_index.md` | Project brief written in this Cursor thread |
| Session notes (untracked) | `.session/plan.md`, **this file** | Automation roadmap + handoff |

**Verify:** List `src/app`, `src/sanity`, repo root configs.

---

## 3. Environment and Sanity (facts without leaking secrets)

Configuration is **not** hard-coded in the repo for the live project id/dataset; it comes from **`.env.local`** (gitignored; do not commit).

Required variables (from `src/sanity/env.ts` and `sanity.cli.ts`):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION` — optional in some code paths; `src/sanity/env.ts` defaults API version to `2026-03-17` if unset.

**Earlier Q&A in this thread (Cursor):** The user asked for the Sanity **project name**. The codebase stores **project ID** and **dataset**, not the human-readable name from the Sanity dashboard. Display name must be read from [Sanity manage](https://www.sanity.io/manage) after identifying the project by ID from `.env.local`.

**Verify:** Open `.env.local` on the user’s machine; compare with `src/sanity/env.ts`.

**Official docs (for API version / Studio):**

- API versioning: https://www.sanity.io/docs/api-versioning  
- Vision plugin: https://www.sanity.io/docs/the-vision-plugin  
- Sanity CLI: https://www.sanity.io/docs/cli  

---

## 4. Git history (committed work — **not** from this chat)

The following is from `git log --oneline -15` run in this workspace at handoff time. It describes **prior commits** on `main` (remote tracking `origin/main`). This chat did not create these commits.

| Commit (short) | Message |
|----------------|---------|
| `809a18d` | fix: sync lockfile for cloudflare npm ci |
| `2eaa9fd` | feat: add umami analytics tracking |
| `cec0d93` | fix: enable static export for sanity project routing |
| `bc16bd1` | refactor: remove local sanity studio to streamline build |
| `649fc86` | fix: sync lock file with package.json |
| `f881554` | fix: enable static export for cloudflare |
| `fbaacb9` | feat: complete portfolio foundation and sanity integration |
| … | (older: lint, design system, home/about, favicon, etc.) |

**Reason `bc16bd1` matters:** The commit message states local Sanity Studio was **removed** to streamline build. That aligns with **no** `src/app/studio/...` route found in the tree at handoff, while `sanity.config.ts` still comments that Studio is mounted on `/app/studio/...` — the comment is likely **stale**.

**Verify:** `git log`, `git show bc16bd1`, search for `studio` under `src/app`.

---

## 5. Working tree state (at handoff)

From `git status -sb` at handoff:

- **Modified:** `.DS_Store` (macOS folder metadata — not functional project source).
- **Untracked:** `_index.md`, `.session/` (including `plan.md` and this report), `out/` (static export artifacts from `npm run build` or equivalent).

**Implication:** `_index.md` and `.session/*` exist on disk but are **not** committed unless the user adds them.

**Verify:** `git status`.

---

## 6. Session plan already on disk (`.session/plan.md`)

This file predates or parallels the chat; content as read at handoff:

- **Goal:** Figma → Gemma draft → Sanity CMS → Published case study.
- **Phases:** 1–3 marked done (Next on Cloudflare, Sanity connected, `figma_pipeline.py` created); 4–5 pending (first E2E test, first case study published).
- **Current task:** First end-to-end test of `figma_pipeline.py`.
- **Key files called out:** Automation in **separate repo** `~/ai-system-setup/pipelines/figma_pipeline.py`; Sanity schemas under `src/sanity/schemaTypes/`; drafts in Obsidian `~/Documents/PratishekVault/Portfolio-Project/case-studies/`.

**Verify:** `/Users/pb09/ux-portfolio/.session/plan.md` (path may differ if repo moved).

---

## 7. This Cursor conversation — **chronological log** (what “we” did here)

Only the items below are attributable to **this** assistant thread. Everything in §4 is separate (git history).

| # | User request | Action | Artifact / outcome |
|---|----------------|--------|---------------------|
| 1 | Ask: Sanity **project name** | Answered from codebase | **Fact:** No dashboard “name” in repo; connection uses `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET`. Human name → Sanity manage UI. **No file edits.** |
| 2 | Write Obsidian **`_index` brief** | Created hub note at repo root | **File:** `_index.md` (content: stack, routes, Sanity model, env, commands). **Status:** untracked until user commits. |
| 3 | **`/recall`** | Short session recap | **No file edits.** |
| 4 | Full report for Claude | This document | **File:** `.session/claude-handoff-report.md` |

**What we did *not* do in this thread:** No schema changes, no Next pages changed, no Sanity dataset operations, no `figma_pipeline.py` edits, no dependency bumps, no deploy config changes.

---

## 8. Commands to reproduce verification

```bash
cd /Users/pb09/ux-portfolio
git status -sb
git log --oneline -20
npm run build    # regenerates out/; requires valid .env.local for Sanity fetches at build time if pages fetch CMS
```

Local dev:

```bash
npm run dev
# http://localhost:3000
```

---

## 9. Consistency checklist (intentional “don’t mix up” section)

1. **Studio route:** `sanity.config.ts` says Studio is on `/studio` **and** comments reference `app/studio/...`; **actual** `src/app` listing at handoff had **no** studio subtree — consistent with git message **remove local sanity studio**. Trust the tree + `bc16bd1`, treat the long comment as outdated until a studio route is re-added.
2. **`_index.md` vs README:** `README.md` still describes some pages as “placeholders”; the live home page uses Sanity (`src/app/page.tsx`). Prefer code + `_index.md` over README for current behavior.
3. **Secrets:** Project ID value belongs in `.env.local` only; this report does **not** duplicate it so it stays safe to share in plain text if needed.
4. **Automation pipeline:** `plan.md` points to **`~/ai-system-setup/`** — outside this repo. Do not assume those files exist inside `ux-portfolio`.

---

## 10. Quick reference links

| Topic | URL |
|--------|-----|
| Sanity project dashboard | https://www.sanity.io/manage |
| Sanity API versioning | https://www.sanity.io/docs/api-versioning |
| Sanity CLI | https://www.sanity.io/docs/cli |
| Vision plugin | https://www.sanity.io/docs/the-vision-plugin |
| Next.js static export | https://nextjs.org/docs/app/building-your-application/deploying/static-exports |

---

## 11. Claude QA Brief (ILDS case study, May 2026)

Use this section as the exact handoff prompt/context for Claude to run end-to-end checks.

### Scope to test

- Route: `/projects/ilds-design-system`
- Files under test:
  - `src/components/ilds/IldsCaseStudy.tsx`
  - `src/components/ilds/AuditMatrix.tsx`
  - `src/components/ilds/ImpactCounters.tsx`
  - `src/components/ilds/ScrollMorph.tsx`

### Non-negotiable data rules (confirmed by user)

1. **Audit dimensions**
   - Full audit is **28 dimensions**.
   - Matrix table shown on page is a **subset snapshot of 20 high-signal dimensions**.
2. **Legacy baseline**
   - Legacy system coverage is exactly **19.9%** (not approximate).
   - This is framed as a **gap / flaw**, not a success metric.
3. **Component adoption bars**
   - Total adopters can be 7 in analytics context, but UI chart intentionally shows **top 6 ranked teams only**.
   - No claim that chart represents all teams.

### Expected on-page metric values

- Hero stats:
  - `19.9%` Legacy coverage vs benchmark
  - `20` Components built
  - `23` Projects using
  - `46.8K` Inserts/week
- Headline metrics:
  - Projects using `23`
  - Components built `20`
  - Variables published `112`
  - Variable inserts `4.7M`
  - Style inserts `1.17M`
  - Weekly inserts `46.8K`
- Adoption bars header:
  - `Six teams ranked by component insertions (6,08,749/year)`
- Top-6 component insertion rows:
  - PMT Design Team `5,05,360` (`83%`)
  - IL Nysa `85,356` (`14%`)
  - Project Orion `10,181` (`2%`)
  - Lombard Creative `4,191` (`1%`)
  - AutoNinja CRM `2,649` (`<1%`)
  - IL Design System 2.0 `1,012` (`<1%`)

### Visual/story QA checklist for Claude

- **Narrative integrity**
  - Confirms chaos -> stakes -> decision -> foundations -> architecture -> proof flow.
  - Flags any sentence that can be read as contradictory to the confirmed rules above.
- **Data consistency**
  - Verifies no approximate language on core claims (`roughly`, `~`, `about`, etc.).
  - Verifies `28 dimensions` and `20 snapshot` appear together correctly.
  - Verifies component chart is explicitly top-team ranked view.
- **Visual consistency**
  - Section labels and section headings are visibly larger and readable.
  - No metric/caption mismatch between cards, bars, and narrative text.
  - ScrollMorph labels align with current story metrics (`23 PROJECTS · 4.7M INSERTS`, `COMPONENTS · 20`, `TOKENS · 112`).
- **Accessibility/UX sanity**
  - No regressions in heading hierarchy and landmark structure.
  - Counter values remain understandable with reduced motion (static fallback text present).

### Build verification status at handoff

- `npm run build` passes successfully.
- Lint checks pass for touched ILDS component files.

*End of handoff report. Re-run §8 if you need timestamps or commit hashes after new commits.*
