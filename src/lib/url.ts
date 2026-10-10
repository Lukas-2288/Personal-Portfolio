// Builds links that work whether the site is served from a subfolder
// (lukas-2288.github.io/Personal-Portfolio/) or from a custom domain root.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function url(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
