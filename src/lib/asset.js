/**
 * Resolve a file in /public against the app's base path.
 *
 * Vite rewrites the asset URLs it can see — ES imports, url() inside CSS files,
 * paths in index.html — but not absolute paths written inside JS strings. On
 * GitHub Pages the site is served from /<repo>/ rather than /, so "/photo.png"
 * would resolve to the domain root and 404. Everything under /public goes
 * through here instead.
 *
 * BASE_URL is "/" during local dev and "/<repo>/" in a production build, so the
 * same call is correct in both.
 */
export function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`
}
