import { asset } from '../../lib/asset'

/**
 * The page's single background surface.
 *
 * This is the ONLY element in the app that renders the hero photograph. Every
 * section above it is transparent, so the photo fades into the navy → gold
 * gradient and the whole page reads as one unbroken canvas.
 *
 * Deliberately not `background-attachment: fixed` — that breaks on iOS Safari.
 * This is an absolutely positioned layer inside the page wrapper instead.
 */
const HERO_PHOTO = asset('background.png')

const HERO_FADE = 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)'

/*
 * Legibility scrim over the hero photo only.
 *
 * The supplied photograph is bright midday — sunlit sky and grass. With just
 * the page gradient's 0.15 top stop over it, every hero text element failed
 * WCAG AA (measured: eyebrow 1.74:1, H1 2.57:1, lead paragraph 2.07:1).
 * This darkens the top of the photo and fades to nothing before the photo's
 * own mask ends, so it adds no seam and leaves the page gradient untouched.
 */
const HERO_SCRIM =
  'linear-gradient(180deg, rgba(10,22,40,0.74) 0%, rgba(10,22,40,0.64) 45%, rgba(10,22,40,0.30) 80%, rgba(10,22,40,0) 100%)'

const VERTICAL_GRADIENT =
  'linear-gradient(180deg, rgba(10,22,40,0.15) 0%, rgba(10,22,40,0.70) 45%, #0A1628 70%, #060F1E 100%)'

const GOLD_GLOWS = [
  'radial-gradient(ellipse at 80% 25%, rgba(201,162,39,0.14), transparent 60%)',
  'radial-gradient(ellipse at 10% 70%, rgba(201,162,39,0.07), transparent 65%)',
].join(', ')

function PageBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <img
        src={HERO_PHOTO}
        alt=""
        className="absolute inset-x-0 top-0 h-screen w-full object-cover"
        style={{ maskImage: HERO_FADE, WebkitMaskImage: HERO_FADE }}
      />
      <div className="absolute inset-x-0 top-0 h-screen" style={{ backgroundImage: HERO_SCRIM }} />
      <div className="absolute inset-0" style={{ backgroundImage: VERTICAL_GRADIENT }} />
      <div className="absolute inset-0" style={{ backgroundImage: GOLD_GLOWS }} />
    </div>
  )
}

export default PageBackground
