# Marci Metzger Homes — Home Page Revamp

A redesign of the home page for **Marci Metzger — The Ridge Realty Group**, a real
estate agent in Pahrump, Nevada.

**Live site:** https://kuuhaku3614.github.io/Marci_MetzgerWeb/
**Original site:** https://marcimetzger.com/

## About

A single-page revamp built from the original site as reference. All of the original
copy is preserved — the "Get It Sold" sales record, "Don't Just List it…", "Guide to
Buyers", the three services, office hours, address, phone and social links — but the
page is rebuilt around a clearer information architecture rather than restyled in
place.

Key changes from the original:

- **Value proposition in the hero**, with the property search moved up from fifth
  place into the first screen, since search is the visitor's primary task.
- **Featured listings** — the original had no property cards at all. Six Pahrump
  listings with working client-side filtering by location, type, beds, baths, price
  and sort order.
- **Proof surfaced early** — 30 years, 90 clients in 2021, $28.5M closed, previously
  buried in small centred grey prose.
- **A photo gallery carousel** with autoplay, thumbnails, dots, keyboard and swipe.
- **Full-width navigation on desktop**; the original hid four nav items behind a
  hamburger even at 1920px.
- **One continuous background surface** — the hero photograph fades into a navy-to-gold
  gradient so the whole page reads as a single canvas.

## Stack

React 19 · Vite 8 · Tailwind CSS v4 (via `@tailwindcss/vite`) · Oxlint

No UI, carousel, animation or component libraries — every interactive piece is built
with `useState`, `useEffect` and `useRef`.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run lint     # oxlint
npm run build    # production build to dist/
npm run preview  # serve the built output
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which lints, builds and publishes `dist/` to GitHub Pages.

The Pages base path is derived from `GITHUB_REPOSITORY` at build time rather than
hard-coded, so renaming the repository does not break the published asset paths.
Files in `public/` are referenced through [`src/lib/asset.js`](src/lib/asset.js), which
reads the same base at runtime.

## Accessibility

- Skip-to-content link, semantic landmarks, one `<h1>` and ordered headings
- Mobile menu has a focus trap, Esc to close, body scroll lock and focus restore
- Real `<label>`-bound form controls; `alt` text on every image
- `prefers-reduced-motion` respected — carousel autoplay and transitions stand down
- Gold is never used as text on light backgrounds, where it fails WCAG AA contrast

## Notes

- The contact form has no mail backend. Submitting confirms receipt on-screen and
  directs the visitor to call or text, rather than silently discarding the message.
- [`src/components/sections/Testimonials.jsx`](src/components/sections/Testimonials.jsx)
  is built but not rendered: it holds placeholder text pending real client reviews.
  No quotes or ratings were invented.
