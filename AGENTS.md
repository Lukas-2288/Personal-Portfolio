## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project rules

- Content lives in `src/content/` (Markdown) and `src/data/` (YAML). The README explains how to add projects and notes; templates are in `docs/templates/`.
- Run `npm run verify` before committing. It runs the WCAG contrast test, `astro check`, and the build.
- Confidentiality (customer work from any employer): never name the customer ("major U.S. automotive plant"), internal software or tools (describe what they do), or hardware vendors. No real layouts, drawings, screenshots or photos from customer sites; diagrams are generic and drawn from scratch. Set `confidential: true` on such projects.
- No phone number anywhere on the site, including `public/resume.pdf`.
- Don't put claims in Lukas's voice that he hasn't made. Ask him instead.
