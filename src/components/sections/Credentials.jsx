import Container from '../ui/Container'
import { asset } from '../../lib/asset'

/*
 * Logos keep their original brand colours; the white background was removed
 * with true colour-to-alpha (see public/logos/), so antialiased edges keep
 * their real colour and coverage.
 *
 * Resting state is muted. On hover a single logo returns to full colour over a
 * two-layer gold backdrop. The inner warm plate is not decoration: the ink in
 * these marks is dark navy/black (#002040, #000000, #002060, #000040), which is
 * ~1.1:1 on this canvas, so it needs a light surface underneath to be readable.
 */
const CREDENTIALS = [
  { name: 'The Ridge Realty Group', file: 'ridge.png' },
  { name: 'Equal Housing Opportunity', file: 'equalhousing.png' },
  { name: 'REALTOR® · MLS member', file: 'realtor.png' },
  { name: 'Pahrump Valley Chamber of Commerce', file: 'pahrump.png' },
]

const OUTER_GLOW =
  'radial-gradient(circle, rgba(201,162,39,0.30) 0%, rgba(201,162,39,0.12) 45%, transparent 72%)'

/*
 * Measured, not guessed. At the specified 0.14 the plate lifted the backdrop
 * from #0A1628 to #0D1828 — three points — leaving the hovered RIDGE mark at
 * 1.05:1 and Equal Housing (pure black) at 1.18:1 against it. This layer exists
 * precisely to stop dark ink blending into the navy, so it is opaque enough to
 * actually do that; the gold halo above still reads as the glow around it.
 */
const INNER_PLATE =
  'radial-gradient(circle, rgba(245,239,227,0.96) 0%, rgba(245,239,227,0.90) 52%, rgba(245,239,227,0) 74%)'

const BACKDROP =
  'pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none'

function Credentials() {
  return (
    <section className="relative z-10 bg-transparent py-10 md:py-14">
      <Container>
        <ul className="grid grid-cols-2 items-center justify-items-center gap-10 md:grid-cols-4 md:gap-12">
          {CREDENTIALS.map((credential) => (
            <li
              key={credential.file}
              /* `isolate` keeps each backdrop's -z-10 inside its own logo, so
                 hovering one never paints behind a sibling. */
              className="group relative isolate flex cursor-default select-none items-center justify-center"
            >
              <span aria-hidden="true" className={`${BACKDROP} scale-150 blur-2xl`} style={{ backgroundImage: OUTER_GLOW }} />
              <span aria-hidden="true" className={`${BACKDROP} scale-125 blur-md`} style={{ backgroundImage: INNER_PLATE }} />

              <img
                src={asset(`logos/${credential.file}`)}
                alt={credential.name}
                loading="lazy"
                draggable="false"
                /*
                 * `invert` is what makes the resting state visible at all. These
                 * marks are dark ink; grayscale alone left them at 1.04–1.10:1 on
                 * the navy — muted to the point of disappearing. Inverting the
                 * greyscale gives a light monochrome silhouette (~4.4:1), and
                 * hover drops both filters to reveal the true colours.
                 */
                className="h-14 w-auto object-contain opacity-55 grayscale invert transition-all duration-300 ease-out group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:h-16"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default Credentials
