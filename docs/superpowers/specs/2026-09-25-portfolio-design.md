# Portfolio site design

Approved 2026-09-25. Personal portfolio for Lukas Sagmani, linked from his resume. Readers: recruiters and engineering teams, equally.

## Goal

Show Lukas as someone who connects software with physical automation. A recruiter gets the full picture of any project in 30 seconds; an engineer can read the technical details below it.

Done means: live on the custom domain, works on phone and desktop, passes WCAG AA contrast in both themes, and adding a project takes under 30 minutes.

## Stack

- Astro 7, static output. No UI framework, no Tailwind. Plain CSS on custom-property tokens.
- Content collections with Zod schemas: `src/content/projects/*.md`, `src/content/notes/*.md`. Bad frontmatter fails the build with a readable error.
- Profile data (experience, education, skills, links) in `src/data/*.yaml`, editable without touching components.
- JavaScript only for the theme toggle and the sidebar's current-section highlight. The site works without it.
- Deploy: GitHub Actions (`withastro/action`) to GitHub Pages on push to `main`. Custom domain via `public/CNAME`.
- Node 22 locally.

## Sitemap

| URL | Content |
|---|---|
| `/` | One page, layout A. Sticky left sidebar: photo, name, headline, section links, Resume and Contact buttons, theme toggle. Right column sections: About, Projects (featured), Experience, Education, Skills, Contact. Below 900px the sidebar becomes a normal top block. |
| `/projects/` | Card grid of all projects. |
| `/projects/<slug>/` | Project page from the template below. |
| `/notes/` | List of notes, newest first. |
| `/notes/<slug>/` | One note. |
| `/resume/` | PDF embedded on wide screens; download and open buttons on all screens. The web copy has no phone number. |
| `/404` | Not-found page with a link home. |

About, Skills and Contact are sections of `/`, not separate pages. The top nav on inner pages links to `/#about`, `/#skills`, `/#contact`.

## Design tokens

Dark is the default. Light is opt-in through the toggle.

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#111417` | `#F7F8FA` |
| `--surface` | `#171B20` | `#FFFFFF` |
| `--line` | `#272D34` | `#DCE0E5` |
| `--text` | `#E6E8EB` | `#16191D` |
| `--muted` | `#A3ABB5` | `#545C66` |
| `--accent` | `#5CC0CF` | `#17697A` |

- Headings: Source Serif 4, weight 600. Body: Source Sans 3, 17px, line-height 1.65, max width about 65ch. Labels and tags: JetBrains Mono, 12px, uppercase, 0.06em tracking.
- Technical accents: faint 48px background grid, mono section labels, tool tags tinted with the accent, generic line diagrams in SVG.
- Every text/background pair used must be at least 4.5:1, and borders or focus rings at least 3:1. A script (`npm run check:contrast`) verifies the token pairs in both themes and runs in CI.
- Theme choice: an inline script in `<head>` reads `localStorage` inside try/catch and sets `data-theme` before first paint. If storage is blocked or empty, the page is dark.
- Motion: none beyond hover and focus transitions. Honors `prefers-reduced-motion`.

## Project page template

Frontmatter (validated):

```yaml
title: string
kind: "Work project" | "Team project" | "Personal project" | "Hackathon project"
role: string
dates: string              # display text, e.g. "Aug–Sep 2026"
sortDate: date             # for ordering, e.g. 2026-09-30
duration: string?          # e.g. "8 weeks on site"
team: string?
summary: string            # 2–3 plain sentences
metrics: [{ value, label }] # exactly 3
tags: string[]
featured: boolean          # listed on the home page
confidential: boolean      # shows the confidentiality note
cover: image?              # card thumbnail; falls back to a generic SVG
links: { repo?, demo? }
```

Page order:

1. Breadcrumb, kind label, title.
2. **At a glance** panel: role, dates, team; three metrics; summary; confidentiality note when `confidential: true`; "Jump to technical details" link.
3. Divider.
4. **Technical details**: the Markdown body (tools, approach, troubleshooting, decisions). Always visible, not collapsed.
5. Previous/next project links.

## Content at launch

- **AGV Fleet Expansion** (work, featured, confidential). From the brief. Generic loop diagram and a troubleshooting flow diagram, both drawn from scratch.
- **Share A Plate: Mutual Exchange** (team of 4, Fall 2025, featured). Brief plus resume detail. Screenshots from the team repo for now. No repo link while the repo is private.
- **UniPay** (WSU hackathon, Jan 2025, team of 2). Repo `lillytoma/UniPay`.
- **Book Showcase** (personal, Apr 2024). Demo `lukasbookwebsite.netlify.app`, repo `Lukas-2288/Book-Website`.
- **Experience**: Daifuku North America (Apr 2026–now), JVIS USA / Mayco International (Feb–Apr 2026), OneStream Software (Jun–Aug 2024), FIRST Robotics Competition judge (Mar 2024).
- **Education**: B.S. Computer Science, Wayne State University, 2021–2025, GPA 3.50, Dean's List Fall 2024 and Winter 2025.
- **Headline**: "I connect software with automated vehicles on the plant floor."
- **Looking for**: growing deeper into robotics and automation. No job-seeking language.
- **Starter note**: "How automated vehicles follow floor magnets." Generic, no vendor or customer detail.
- **Contact**: lsagmani2003@gmail.com, linkedin.com/in/sagmani, github.com/Lukas-2288. No phone number anywhere.

## Confidentiality rules (enforced in content and README)

- Never name the customer. Use "major U.S. automotive plant."
- Never name internal Daifuku software or tools. Describe what they do.
- Never name hardware vendors.
- No real layouts, drawings, screenshots or photos from customer sites. Diagrams are generic and drawn from scratch.

## Verification

- `astro check` and `astro build` pass.
- Contrast script passes in both themes.
- Screenshots at 390px and 1280px in dark and light for home, a project page, notes and resume; no horizontal scroll, nothing clipped.
- Keyboard: visible focus on every link and button; skip-to-content link.
- Timed walkthrough of the README's "add a project" steps.

## Open items (not blocking the build)

- Repo is private. GitHub Pages on a free account needs a public repo (or GitHub Pro). Ask before changing visibility.
- Custom domain: pending from Lukas.
- Updated resume PDF with Daifuku: pending. Launch uses a phone-free copy of the current resume.

## Revisions after review (2026-10-10)

- Notes are off at launch: the starter note is removed. The Notes menu link, home section and `/notes/` page appear automatically once a published note exists; until then `/notes/` redirects home.
- UniPay removed. GoDiscover added (personal project, featured), with a new `card-deck` thumbnail replacing `payment-card`.
- About: dropped the "logs first, then hardware, then logic" sentence.
- GoDiscover is description-only: no demo link, repo link or screenshots, because Lukas no longer holds the rights to the project.
- Launch: repo made public; site served from `lukas-2288.github.io/Personal-Portfolio` until a custom domain is added.
