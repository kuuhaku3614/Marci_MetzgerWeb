# Marci Metzger Homes — Revamp Plan

> **Current status: Phase B complete — the revamped home page is built and verified.**
> Next action: none blocking. The remaining work is real content (see Open items) and a
> decision on whether to add routing for the Listings / Let's Move / About pages.

| Phase | What | Status |
| --- | --- | --- |
| 0 | Project scaffold — React + Vite + Tailwind v4 | ✅ Done |
| 0.5 | Grayscale wireframe of the existing site | ✅ Done |
| A | Visual mockup canvas for review | ✅ Done — [open the canvas](https://claude.ai/code/artifact/a66d156c-c6a3-4810-801e-4df7c2537acc) |
| B | Implement the approved design in React | ✅ Done |

---

## Context

The repo holds a faithful grayscale wireframe of the existing Marci Metzger realtor site (13 components in `src/components/`, bare Tailwind, no design tokens). The wireframe proved the structure; this plan replaces it with a designed, conversion-oriented home page.

The existing site has real assets — a strong serif wordmark, 30 years of local authority, hard numbers ($28.5M closed, 90 clients in 2021) — but the design squanders them:

| Problem | Consequence |
| --- | --- |
| Hero is a photo with no value proposition | A full viewport before the visitor learns anything |
| Search tool is the 5th section | The buyer's primary task is buried |
| Hamburger-only nav on desktop | 4 nav items hidden on a 1920px screen |
| No listings anywhere | A real estate site with zero property cards |
| Proof buried in ~11px centered gray prose | The strongest sales asset reads as filler |
| No testimonials | Missing the top trust lever for a local service business |
| Two social bands; hours stated twice | Redundancy dilutes the page |
| Menu lacks focus trap/Esc/scroll lock; form is divs | Fails keyboard and screen-reader users |

**Outcome:** a single, deeply polished home page that leads with a value proposition and a working search, surfaces proof early, shows real property cards, and adds the trust content the original lacks.

## Decisions (locked)

- **Type:** Playfair Display (display) + Manrope (UI/body)
- **Palette:** Navy, cream & gold
- **Scope:** Home page only; nav links scroll to anchors
- **Listings:** Mock JSON data with working client-side filtering
- **Sequence:** Canvas first (done) → implement

---

## Phase A — Design canvas ✅

Published: **[Marci Metzger Homes Revamp](https://claude.ai/code/artifact/a66d156c-c6a3-4810-801e-4df7c2537acc)**

Three artboards — desktop home flow, mobile home flow, and a foundations sheet (palette, type scale, components, spacing). Static mockups; search and filters are drawn, not functional.

Fixed during this phase: three colors that failed contrast (including a gold required-asterisk), and all three artboard heights, which were clipping their footers.

---

## Phase B — Implementation ✅

- [x] **B1. Fonts** — Google Fonts `<link>` in `index.html`
- [x] **B2. Tokens** — `@theme` block in `src/index.css`
- [x] **B3. UI primitives** — `src/components/ui/`: `Button`, `Container`, `SectionHeading`/`Eyebrow`, `Stat`, `Select`, `Wordmark`, `Icons`, `Placeholder`
- [x] **B4. Data** — `src/data/listings.js`, `filterOptions.js`, `nav.js`; `src/hooks/useListingFilters.js`
- [x] **B5. Sections** — 14 components in `src/components/sections/`
- [x] **B6. Compose** — `src/App.jsx`
- [x] **B7. Accessibility pass** — focus trap, Esc, scroll lock, focus restore, real form controls, skip link, focus rings
- [x] **B8. Verify** — lint + build clean; checked at 1280 / 900 / 390 px; filters and menu driven in a real browser

The old flat wireframe components in `src/components/` were deleted; everything now lives
under `ui/` and `sections/`.

### Bugs found and fixed during verification

- **`hidden` on a `Button` did nothing.** The component's base class sets `inline-flex`, and
  both are unconditional display utilities — Tailwind's output order decided the winner, so
  the header phone button stayed visible at 390px and squeezed the wordmark onto two lines.
  Responsive visibility now lives on a wrapper element. Worth remembering: **never put
  `hidden` directly on `<Button>`.**
- **"Featured" sort fell back to price,** so the cheapest listing led the grid. The tiebreak
  was dropped; `Array.sort` is stable, so featured listings now keep their curated order
  from `listings.js`.
- **Focus restore relied on `document.activeElement`,** which is unset when the menu is opened
  programmatically. It now restores to an explicit `triggerRef`.

### B2 — Design tokens (`src/index.css`)

```css
@import "tailwindcss";

@theme {
  --color-ground:   #FBF8F1;  /* cream page ground */
  --color-surface:  #FFFFFF;  /* cards, inputs */
  --color-ink:      #10233D;  /* deep navy — headings, body, primary fill */
  --color-ink-deep: #0B1A2E;  /* footer, gallery band */
  --color-muted:    #4E5F73;  /* secondary text */
  --color-accent:   #C9A227;  /* gold */
  --color-line:     #E3DCCD;  /* hairline borders */
  --color-on-navy:  #A9BBD0;  /* body text on navy */

  --font-display: "Playfair Display", ui-serif, Georgia, serif;
  --font-sans:    "Manrope", ui-sans-serif, system-ui, sans-serif;
}
```

#### Contrast rules — measured, not estimated

| Combination | Ratio | Verdict |
| --- | --- | --- |
| Gold on cream | 2.28:1 | ❌ **Never use as text** |
| Gold on navy | 6.53:1 | ✅ |
| Navy on gold | 7.23:1 | ✅ |
| Ink on cream | 14.89:1 | ✅ |
| Muted on cream | 6.17:1 | ✅ |
| Slate (`on-navy`) on navy | 8.05:1 | ✅ |

Gold is permitted only as (a) a fill behind navy text, (b) hairlines and decorative marks, (c) text on navy. **Primary CTA** = navy fill + cream text. **Secondary CTA** = gold fill + navy text.

### Type scale

| Role | Font | Size | Notes |
| --- | --- | --- | --- |
| Hero H1 | Playfair 600 | `clamp(2.75rem, 6vw, 4.125rem)` | lh 1.02, tracking −0.022em |
| Section H2 | Playfair 500 | `clamp(1.75rem, 3.5vw, 2.625rem)` | lh 1.14 |
| Card H3 | Manrope 600 | 1.125rem | |
| Eyebrow | Manrope 600 | 0.75rem | uppercase, tracking 0.18em |
| Lead | Manrope 400 | 1.1875rem | lh 1.6 |
| Body | Manrope 400 | **1.0625rem (17px)** | lh 1.65, **left-aligned** |
| Meta | Manrope 500 | 0.875rem | |

Two deliberate reversals of the original: body type goes from ~11px to 17px, and multi-line paragraphs stop being centered.

### Spacing & layout

| Token | Value |
| --- | --- |
| Content max-width | 1200px |
| Gutter (desktop / mobile) | 48px / 22px |
| Section padding (desktop / mobile) | 96px / 56px |
| Card grid gap | 32px |
| Corner radius | 2px |
| Min touch target (mobile) | 44px |
| Card columns (mobile / md / lg) | 1 / 2 / 3 |

### B5 — Section order

Ordered by visitor priority rather than the original's arbitrary sequence:

1. **Sticky header** — wordmark, inline nav (desktop), phone CTA; hamburger below `lg`
2. **Hero** — eyebrow, H1, subhead, **integrated search bar**, call CTA
3. **Proof bar** — 30 Years · 90 Clients in 2021 · $28.5M Closed in 2021 · Top residential sales, last 5 yrs
4. **Featured Listings** — property cards from mock data *(new)*
5. **Meet Marci** — two-column portrait + bio + credentials, left-aligned
6. **Get It Sold** — one feature card + two smaller, existing copy verbatim
7. **Let's Move to Pahrump** — relocation teaser *(new; gives the nav item real content)*
8. **Services** — three cards, existing copy verbatim
9. **Testimonials** — three quotes + aggregate rating *(new)*
10. **Gallery** — recent sales / the valley
11. **Credentials strip** — Ridge, Equal Housing, REALTOR® MLS, Pahrump Valley
12. **Contact + Map** — two-column, **one** consolidated hours block, `tel:` links
13. **Footer** — nav, social, copyright
14. **Mobile sticky call bar** — fixed bottom Call/Text, below `md` *(new)*

Removed from the original: the duplicate social band, and the redundant second hours line ("Open today" and "Open daily" said the same thing).

### B4 — Listings data

`src/data/listings.js` — ~9 entries shaped `{ id, address, city, price, beds, baths, sqft, lotAcres, type, status, featured, image: null }`.

Sample set used in the mockup — single-family, land parcels and manufactured homes, $179k–$625k, which reflects that market:

| Address | Price | Specs | Type | Status |
| --- | --- | --- | --- | --- |
| 2381 Homestead Rd | $389,000 | 3bd / 2ba / 1,842 sqft | Single family | New |
| 5410 Bell Vista Ave | $625,000 | 4bd / 3ba / 2,960 sqft | Single family | For sale |
| 1120 Calvada Blvd | $245,000 | 3bd / 2ba / 1,404 sqft | Manufactured | Pending |
| 3705 Manse Rd | $179,900 | 2.5 acres | Land | For sale |
| 890 Wilson Rd | $415,000 | 3bd / 2ba / 2,110 sqft | Single family | For sale |
| 6215 Winery Rd | $549,000 | 4bd / 3ba / 2,640 sqft | Single family | New |

Filtering: client-side `useMemo` — location, type, beds, baths, min/max price, sort. No new dependencies. The hero search bar and the listings grid share one state hook, so hero search scrolls to and filters the grid.

### B7 — Accessibility

- **Menu:** focus trap, Esc to close, body scroll lock, `aria-modal`, focus returns to the trigger — all four missing today
- **Forms:** real `<input>` / `<select>` / `<textarea>` with associated `<label>`, not the wireframe's presentational divs
- Skip-to-content link; `:focus-visible` rings; semantic landmarks; correct heading order
- `prefers-reduced-motion` respected on all transitions

### Reuse

`Placeholder` ([src/components/Placeholder.jsx](src/components/Placeholder.jsx)) is already the shared image primitive. Keep its API, restyle it to the cream/navy palette, and keep routing every image and the map through it — real photography then drops in as a one-component change.

---

## Open items — need real content from the client

These are bracketed placeholders in the mockup. Nothing was fabricated.

- [ ] **Testimonials** — three real quotes from Yelp or Zillow, with names and dates
- [ ] **Star rating** — the actual aggregate rating and where it's from
- [ ] **Listings** — swap sample data for real MLS records
- [ ] **Photography** — hero, portrait, listing photos, gallery, section images
- [ ] **Verify "REALTOR FOR NEARLY 3 DECADES"** — the source screenshot was too low-res to read with certainty ("30" vs "3")
- [ ] **Verify the address** — "3190 HW 160, Suite F" read from the same low-res source

---

## Verification — results

1. ✅ `npm run lint` and `npm run build` both clean
2. ✅ Rendered at **1280**, **900** and **390** px and checked against the canvas
   - ⚠️ Chrome headless clamps the window to a ~500px minimum. Capture mobile by loading the
     page in a 390px-wide same-origin `<iframe>` on a wider window — a bare
     `--window-size=390` silently lies about the layout, which is exactly how the header bug
     above was nearly missed.
3. ✅ Menu driven in a real browser: dialog opens with `aria-modal`, focus moves inside, Tab
   wraps from last to first, `Escape` closes, `body` overflow is locked while open and
   restored after, focus returns to the hamburger
4. ✅ Filters driven in a real browser:
   - Max price $250k → 9 → **3** results, all ≤ $250k
   - Type = Land → **1** result ($179,900 Manse Rd)
   - Min $400k + Max $250k → **0** results, empty state renders with a Clear filters action
5. ✅ Contrast verified numerically before the palette was committed; no gold text sits on cream

### Re-running these checks

`npm run dev`, then point headless Chrome at a small same-origin harness page that iframes
`/` at the target width. Because the frame is same-origin you can script into
`iframe.contentDocument` to set `<select>` values (use the native value setter plus a
bubbling `change` event so React sees it) and to click the menu — that is how items 3 and 4
above were verified rather than eyeballed.
