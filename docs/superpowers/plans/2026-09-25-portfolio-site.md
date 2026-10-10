# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the portfolio described in `docs/superpowers/specs/2026-09-25-portfolio-design.md`.

**Architecture:** Static Astro site. Projects and notes are Markdown content collections validated by Zod schemas; profile data lives in YAML. Plain CSS on theme tokens; the only client JS is the theme toggle and sidebar section highlight. GitHub Actions builds and deploys to GitHub Pages.

**Tech Stack:** Astro 7, TypeScript, Zod (via `astro/zod`), `@fontsource` packages for self-hosted fonts, Node's built-in test runner for the contrast check, Playwright for screenshots.

---

## File map

| Path | Responsibility |
|---|---|
| `astro.config.mjs` | Site URL, base path, static output |
| `src/content.config.ts` | `projects` and `notes` collection schemas |
| `src/content/projects/*.md` | One file per project |
| `src/content/notes/*.md` | One file per note |
| `src/data/profile.yaml` | Name, headline, about, links |
| `src/data/experience.yaml` | Dated work entries |
| `src/data/education.yaml` | Degrees |
| `src/data/skills.yaml` | Grouped skills |
| `src/lib/data.ts` | Loads and types the YAML files |
| `src/lib/contrast.mjs` | WCAG contrast math |
| `src/styles/tokens.css` | Color and type tokens for both themes |
| `src/styles/global.css` | Base elements, layout primitives, shared components |
| `src/layouts/Base.astro` | `<head>`, theme bootstrap script, skip link, top nav, footer |
| `src/components/ThemeToggle.astro` | Toggle button + script |
| `src/components/Tags.astro` | Tool tag list |
| `src/components/ProjectCard.astro` | Card for grids |
| `src/components/ProjectRow.astro` | Row for the home Projects section |
| `src/components/Glance.astro` | "At a glance" panel |
| `src/components/diagrams/*.astro` | Generic SVG diagrams |
| `src/pages/index.astro` | Home, layout A |
| `src/pages/projects/index.astro` | Project grid |
| `src/pages/projects/[slug].astro` | Project template |
| `src/pages/notes/index.astro`, `[slug].astro` | Notes |
| `src/pages/resume.astro` | Resume page |
| `src/pages/404.astro` | Not found |
| `public/resume.pdf` | Phone-free resume |
| `public/CNAME` | Custom domain (added when known) |
| `scripts/check-contrast.test.mjs` | Contrast test over `tokens.css` |
| `.github/workflows/deploy.yml` | CI: check, build, deploy |
| `README.md` | How to add a project and a note |

## Task 1: Scaffold

- [ ] `npm create astro@latest . -- --template minimal --typescript strict --install --no-git --skip-houston`
- [ ] Add deps: `npm i @fontsource-variable/source-serif-4 @fontsource/source-sans-3 @fontsource/jetbrains-mono yaml`
- [ ] Set `site` and `base` in `astro.config.mjs` (base `/Personal-Portfolio` until a custom domain exists; driven by env vars `SITE_URL` and `BASE_PATH`).
- [ ] Run `npm run build`. Expected: build succeeds.
- [ ] Commit.

## Task 2: Tokens and contrast test (test first)

- [ ] Write `scripts/check-contrast.test.mjs`: parse `--bg`, `--surface`, `--text`, `--muted`, `--accent`, `--line` for dark and light blocks from `src/styles/tokens.css`; assert text/muted/accent ≥ 4.5 on bg and surface, accent on the tag tint ≥ 4.5, focus ring (accent) ≥ 3 on bg.
- [ ] Run `node --test scripts/`. Expected: FAIL (tokens file missing).
- [ ] Write `src/lib/contrast.mjs` and `src/styles/tokens.css` with the spec's values.
- [ ] Run `node --test scripts/`. Expected: PASS.
- [ ] Add `"check:contrast": "node --test scripts/"` to `package.json`. Commit.

## Task 3: Content schemas (test first)

- [ ] Write `src/content.config.ts` with the spec's project schema (`metrics` length exactly 3) and a notes schema (`title`, `description`, `date`, `draft`).
- [ ] Add a deliberately bad project file (2 metrics); run `npx astro check && npx astro build`. Expected: FAIL naming `metrics`. Delete the bad file.
- [ ] Commit.

## Task 4: Base layout, theme toggle, global styles

- [ ] `Base.astro`: inline head script sets `data-theme` from `localStorage` (try/catch, default dark); skip link; top nav (hidden on home desktop where the sidebar nav is used); footer.
- [ ] `ThemeToggle.astro`: button with `aria-pressed`, label names the theme it switches to, writes storage in try/catch.
- [ ] `global.css`: grid background, type scale, tags, buttons, focus rings, cards.
- [ ] Build. Commit.

## Task 5: Profile data + home page (layout A)

- [ ] YAML files with the spec's content; `src/lib/data.ts` loads them.
- [ ] `index.astro`: sidebar (photo, name, headline, section nav, Resume/Contact) + sections About, Projects (featured rows), Experience, Education, Skills, Contact. Sidebar sticky ≥ 900px, stacked below.
- [ ] Section highlight script with IntersectionObserver.
- [ ] Build. Commit.

## Task 6: Project template, grid, diagrams, content

- [ ] `Glance.astro`, `ProjectCard.astro`, `ProjectRow.astro`, diagrams (`FleetLoop`, `GuidanceFlow`, `PhoneScreens`, `CardFx`, `Browser`).
- [ ] `projects/[slug].astro`, `projects/index.astro`.
- [ ] Four project Markdown files per spec; copy four Share A Plate screenshots into `src/assets/projects/share-a-plate/`.
- [ ] Build; confirm 4 project pages exist in `dist/projects/`. Commit.

## Task 7: Notes, resume, 404

- [ ] Notes list and page; starter note.
- [ ] Phone-free resume PDF in `public/resume.pdf`; verify with `pdftotext`/strings that no phone number remains.
- [ ] `resume.astro`, `404.astro`.
- [ ] Build. Commit.

## Task 8: Deploy workflow and README

- [ ] `.github/workflows/deploy.yml`: checkout, `withastro/action` (runs build), contrast test, deploy with `actions/deploy-pages`.
- [ ] README: run locally, add a project, add a note, swap resume, confidentiality rules, custom domain steps.
- [ ] Commit.

## Task 9: Verification

- [ ] `npm run check:contrast && npx astro check && npm run build` all pass.
- [ ] Playwright screenshots at 390px and 1280px, dark and light, for `/`, `/projects/agv-fleet-expansion/`, `/notes/`, `/resume/`; check for horizontal overflow (`scrollWidth > clientWidth`).
- [ ] Grep built HTML for banned terms (customer names, phone number).
- [ ] Commit fixes.
