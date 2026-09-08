import { useCallback, useEffect, useRef, useState } from 'react'
import Container from '../ui/Container'
import { asset } from '../../lib/asset'
import SectionHeading from '../ui/SectionHeading'

// Gold is written literally as #C7A75B below: Tailwind only generates classes
// it can see as complete strings, so it cannot come from a JS constant.
const AUTOPLAY_MS = 6000
const SWIPE_PX = 45

/*
 * All six supplied photos, each used once. `alt` is unchanged; kicker/title/
 * description are new caption copy, written to match what is actually in each
 * frame rather than the generic strings in the reference markup.
 */
const SLIDES = [
  {
    file: 'gallery_photo1.webp',
    alt: 'Aerial view of the golf course, lake and clubhouse at the centre of the community',
    kicker: 'The Ridge community',
    title: 'Resort-Style Living',
    description: 'Golf, water features and a clubhouse at the centre of the valley.',
  },
  {
    file: 'gallery_photo2.webp',
    alt: 'Living room with floor-to-ceiling windows looking out over the desert',
    kicker: 'Interior',
    title: 'A View Worth Coming Home To',
    description: 'Light-filled rooms that open straight onto the desert.',
  },
  {
    file: 'gallery_photo3.webp',
    alt: 'Single-storey homes with a pool, backing onto open desert and mountains',
    kicker: 'Recent sale',
    title: 'Room to Breathe',
    description: 'Single-storey homes with pools, backing onto open desert.',
  },
  {
    file: 'gallery_photo4.webp',
    alt: 'Tile-roofed home with a walled pool yard, seen from above',
    kicker: 'Private residence',
    title: 'Built for the Desert',
    description: 'Tile roofs and walled pool yards, made for the climate.',
  },
  {
    file: 'gallery_photo5.webp',
    alt: 'Community clubhouse and sports courts beside the fairways',
    kicker: 'Valley lifestyle',
    title: 'More Than a Home',
    description: 'Courts, fairways and open space a short walk from the door.',
  },
  {
    file: 'gallery_photo6.webp',
    alt: 'Clubhouse, tennis and pickleball courts beside the golf course',
    kicker: 'Community',
    title: 'Where the Valley Gathers',
    description: 'The clubhouse and courts at the heart of the neighbourhood.',
  },
]

const pad = (n) => String(n + 1).padStart(2, '0')

function Gallery() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  // Read once from the media query, then only update from its change event —
  // this keeps setState out of the effect body.
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const thumbRefs = useRef([])
  const stripRef = useRef(null)
  const touchStartX = useRef(0)

  const goTo = useCallback((next) => {
    setIndex((current) => {
      const total = SLIDES.length
      const value = typeof next === 'function' ? next(current) : next
      return ((value % total) + total) % total
    })
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  /*
   * Autoplay. `index` is a dependency on purpose: any change — an arrow, a
   * thumb, a dot, or the timer itself — tears the interval down and starts a
   * fresh 6s, which is what "manual interaction resets the timer" means. The
   * cleanup also covers unmount, so no interval survives navigation away.
   */
  useEffect(() => {
    if (paused || reduced) return undefined
    const timer = setInterval(() => goTo((current) => current + 1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [index, paused, reduced, goTo])

  /*
   * Keep the active thumb in view by scrolling ONLY the strip's own horizontal
   * overflow. `scrollIntoView` cannot be used here: it scrolls every
   * scrollable ancestor, the document included, so each autoplay tick dragged
   * the whole page toward the gallery from wherever the visitor was reading.
   * Below 760px the strip is the only thing that moves; above it there is no
   * overflow and this is a no-op.
   */
  useEffect(() => {
    const strip = stripRef.current
    const thumb = thumbRefs.current[index]
    if (!strip || !thumb) return

    const overflow = strip.scrollWidth - strip.clientWidth
    if (overflow <= 0) return

    const offset = thumb.getBoundingClientRect().left - strip.getBoundingClientRect().left
    const centred = strip.scrollLeft + offset - (strip.clientWidth - thumb.clientWidth) / 2
    strip.scrollTo({
      left: Math.max(0, Math.min(centred, overflow)),
      behavior: reduced ? 'auto' : 'smooth',
    })
  }, [index, reduced])

  const onTouchEnd = (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > SWIPE_PX) goTo((current) => current + (delta < 0 ? 1 : -1))
  }

  const arrowClasses =
    'absolute top-1/2 z-40 grid h-[52px] w-[52px] -translate-y-1/2 cursor-pointer place-items-center ' +
    'rounded-full border border-white/20 bg-[rgba(10,20,29,.65)] text-[29px] leading-none text-white ' +
    'transition-colors duration-200 hover:border-[#C7A75B] focus-visible:border-[#C7A75B] ' +
    'max-[760px]:h-[42px] max-[760px]:w-[42px] max-[760px]:text-[23px]'

  return (
    <section id="gallery" className="relative z-10 bg-transparent py-14 md:py-24">
      <Container>
        <div className="flex flex-col gap-5 pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-9">
          <SectionHeading eyebrow="Photo gallery" title="Recent sales & the valley" tone="dark" />
        </div>

        {/* ---------- Hero stage ---------- */}
        <div
          aria-roledescription="carousel"
          aria-label="Photo gallery"
          className="relative h-[min(55vw,570px)] min-h-[400px] overflow-hidden rounded-[20px] bg-[#111] shadow-[0_24px_60px_rgba(0,0,0,.28)] max-[760px]:h-[72vw] max-[760px]:min-h-[330px] max-[760px]:rounded-[15px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX
          }}
          onTouchEnd={onTouchEnd}
        >
          {SLIDES.map((slide, i) => {
            const active = i === index
            return (
              <div
                key={slide.file}
                aria-hidden={!active}
                className="absolute inset-0"
                style={{
                  opacity: active ? 1 : 0,
                  // Two different durations, so this is a literal transition
                  // rather than Tailwind's single-duration utilities. The slow
                  // scale settle is what stops it reading as a jump cut.
                  transform: reduced ? 'none' : `scale(${active ? 1 : 1.025})`,
                  transition: reduced ? 'opacity .2s linear' : 'opacity .55s, transform .8s',
                }}
              >
                <img src={asset(slide.file)} alt={slide.alt} className="h-full w-full object-cover" />

                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 top-[35%]"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(4,10,15,.92))' }}
                />

                <div className="absolute bottom-[34px] left-10 z-20 max-w-[560px] max-[760px]:bottom-[22px] max-[760px]:left-[22px] max-[760px]:right-[22px]">
                  <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.17em] text-[#C7A75B]">
                    {slide.kicker}
                  </p>
                  <h3 className="mb-2 font-display text-[clamp(28px,3.4vw,46px)] font-medium leading-[1.08] text-[#F8F6F0]">
                    {slide.title}
                  </h3>
                  <p className="text-[15px] leading-[1.55] text-[#E2E5E7] max-[760px]:text-[13px]">
                    {slide.description}
                  </p>
                </div>
              </div>
            )
          })}

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => goTo((current) => current - 1)}
            className={`${arrowClasses} left-[18px] max-[760px]:left-3`}
          >
            <span aria-hidden="true" className="-mt-1">
              &lsaquo;
            </span>
          </button>

          <button
            type="button"
            aria-label="Next photo"
            onClick={() => goTo((current) => current + 1)}
            className={`${arrowClasses} right-[18px] max-[760px]:right-3`}
          >
            <span aria-hidden="true" className="-mt-1">
              &rsaquo;
            </span>
          </button>

          <div
            aria-live="polite"
            /* Below 760px the caption needs the full width, so the counter
               moves to the top-right rather than sitting beside it. */
            className="absolute bottom-[27px] right-7 z-30 rounded-full border border-white/30 bg-[rgba(8,15,21,.38)] px-4 py-2.5 text-[13px] text-[#F8F6F0] backdrop-blur-[10px] max-[760px]:bottom-auto max-[760px]:right-4 max-[760px]:top-4"
          >
            {pad(index)} / {pad(SLIDES.length - 1)}
          </div>
        </div>

        {/* ---------- Thumbnail strip ---------- */}
        <div
          ref={stripRef}
          className="mx-auto mt-6 flex max-w-[1180px] items-center gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[760px]:justify-start max-[760px]:overflow-x-auto max-[760px]:pb-1.5"
        >
          {SLIDES.map((slide, i) => {
            const active = i === index
            return (
              <button
                key={slide.file}
                type="button"
                ref={(node) => {
                  thumbRefs.current[i] = node
                }}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={active ? 'true' : undefined}
                onClick={() => goTo(i)}
                className={`h-[88px] min-w-0 flex-1 cursor-pointer overflow-hidden rounded-[13px] border-2 p-0 transition-all duration-[250ms] max-[760px]:h-[72px] max-[760px]:flex-[0_0_105px] ${
                  active
                    ? 'border-[#C7A75B] opacity-100 -translate-y-0.5'
                    : 'border-transparent opacity-[.68] hover:opacity-100'
                } motion-reduce:transition-none motion-reduce:translate-y-0`}
              >
                <img src={asset(slide.file)} alt="" className="h-full w-full object-cover" />
              </button>
            )
          })}
        </div>

        {/* ---------- Dots ---------- */}
        <div className="mt-6 flex justify-center gap-[9px]">
          {SLIDES.map((slide, i) => {
            const active = i === index
            return (
              <button
                key={slide.file}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                aria-current={active ? 'true' : undefined}
                onClick={() => goTo(i)}
                /* The visible dot is 7px, which is far too small to tap. The
                   padding enlarges the hit area and the matching negative
                   margin cancels it again, so spacing is pixel-identical. */
                className="-mx-1 -my-3 flex cursor-pointer items-center border-0 bg-transparent px-1 py-3"
              >
                <span
                  className={`block h-[7px] transition-all duration-[250ms] motion-reduce:transition-none ${
                    active ? 'w-[23px] rounded-[10px] bg-[#C7A75B]' : 'w-[7px] rounded-full bg-[#52616D]'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Gallery
