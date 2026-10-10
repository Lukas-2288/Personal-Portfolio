# Lukas Sagmani · Portfolio

Personal portfolio site, built with [Astro](https://docs.astro.build) and deployed to GitHub Pages. Every push to `main` rebuilds and publishes the site.

## Run it on your computer

You need [Node.js](https://nodejs.org) 22 or newer.

```sh
npm install        # once, after cloning
npm run dev        # starts a preview at http://localhost:4321/Personal-Portfolio/
```

The preview updates as you save files. Press `Ctrl+C` to stop it.

Before you push, run the same checks the deploy runs:

```sh
npm run verify     # contrast check + content check + build
```

If something is wrong, the error names the file and the field.

## Add a project (about 20 minutes)

1. **Copy the template.** Copy `docs/templates/project.md` to `src/content/projects/`, and give it a short file name with dashes, such as `conveyor-retrofit.md`. The file name becomes the address: `/projects/conveyor-retrofit/`.
2. **Fill in the top section** (between the `---` lines). This becomes the **At a glance** panel:
   - `summary`: two or three plain sentences. Write it for a recruiter.
   - `metrics`: exactly three results, each a short value and a label.
   - `featured: true` also lists the project on the home page.
   - `confidential: true` for any customer work. See the rules below.
3. **Write the body** under the second `---`. This becomes **Technical details**. Use `###` headings such as Scope, Approach, Troubleshooting and Result.
4. **Optional screenshots:** put them in `src/assets/projects/<file-name>/` and list them under `gallery`, with `alt` text for each.
5. **Check it:** run `npm run dev` and open the page. Then run `npm run verify`.
6. **Publish:** commit and push to `main`. The site updates in about two minutes.

## Add a note

Notes are switched off until you publish the first one. Then a **Notes** link appears in the menu and the newest three notes show on the home page, with no other changes needed.

1. Copy `docs/templates/note.md` to `src/content/notes/` with a dashed file name, such as `why-traffic-control-matters.md`.
2. Fill in `title`, `description` and `date`, then write the note in Markdown.
3. Set `draft: true` to keep it off the site while you're still writing.
4. Run `npm run verify`, then commit and push.

## Edit the rest of the site

| To change | Edit |
|---|---|
| Name, headline, About text, email and links | `src/data/profile.yaml` |
| Work history | `src/data/experience.yaml` |
| Education | `src/data/education.yaml` |
| Skills | `src/data/skills.yaml` |
| Photo | Replace `src/assets/lukas-sagmani.jpg` (square, at least 400×400) |
| Resume | Replace `public/resume.pdf`. **Remove your phone number first.** Keep the file name. |
| Colors and fonts | `src/styles/tokens.css`, then run `npm run check:contrast` |

## Confidentiality rules for customer work

These apply to anything from Daifuku or any other employer's customer sites:

- **Never name the customer.** Write "major U.S. automotive plant" or similar.
- **Never name internal software or tools.** Describe what they do ("fleet-control software", "path logic in AutoCAD").
- **Never name hardware vendors.**
- **No real layouts, drawings, screenshots or photos** from customer sites. If a picture helps, draw a generic diagram from scratch.
- Set `confidential: true` so the page shows the confidentiality note.

### Drawing a generic diagram

Diagrams are plain SVG pasted into the Markdown. They pick up the site's colors in both themes through these classes: `dg-box`, `dg-box-accent`, `dg-text`, `dg-small`, `dg-label`, `dg-arrow`, `dg-path`, `dg-track`, `dg-accent`, `dg-muted`. Copy the troubleshooting flow in `src/content/projects/agv-fleet-expansion.md` as a starting point. Keep the whole `<figure>` block free of blank lines.

## Custom domain

Until the domain is connected, the site is at `https://lukas-2288.github.io/Personal-Portfolio/`.

To connect a domain such as `yourdomain.com`:

1. **Verify the domain with GitHub** (protects it from takeover): GitHub → your profile picture → **Settings** → **Pages** → **Add a domain**. Add the TXT record it shows at your domain registrar, then click **Verify**.
2. **Add the domain to the repo:** repo → **Settings** → **Pages** → **Custom domain** → enter `yourdomain.com` → **Save**.
3. **Add DNS records** at your registrar:

   | Type | Host / Name | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `lukas-2288.github.io` |

   Delete any other A, AAAA or CNAME records for `@` and `www` (registrars often add "parking" records). Don't add wildcard (`*`) records.
4. **Point the site at the domain:**
   - Create `public/CNAME` containing one line: `yourdomain.com`.
   - In `astro.config.mjs`, set `SITE` to `'https://yourdomain.com'` and `BASE` to `'/'`.
   - Commit and push.
5. **Wait for DNS**, usually minutes and up to 24 hours. Check with `dig yourdomain.com +short`; it should list the four `185.199.x.153` addresses.
6. **Turn on HTTPS:** repo → **Settings** → **Pages** → check **Enforce HTTPS**. The box becomes available once GitHub has issued the certificate, which can take up to 24 hours.

## How it's built

- `src/content/projects/`, `src/content/notes/`: one Markdown file per project or note, checked against the schemas in `src/content.config.ts`.
- `src/pages/`: one file per page. `projects/[slug].astro` is the project page template.
- `src/components/`: shared pieces (At a glance panel, cards, diagrams, theme toggle).
- `src/styles/tokens.css`: colors and fonts for both themes. `scripts/check-contrast.test.mjs` checks every pair meets WCAG AA.
- `.github/workflows/deploy.yml`: runs `npm run verify` and deploys on every push to `main`.
