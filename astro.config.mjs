// @ts-check
import { defineConfig } from 'astro/config';

// Where the site is served from.
// Before the custom domain is connected: GitHub's address plus the repo name as `base`.
// After: set SITE to 'https://yourdomain.com' and BASE to '/'. See README → "Custom domain".
const SITE = 'https://lukas-2288.github.io';
const BASE = '/Personal-Portfolio';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
});
