import Container from '../ui/Container'
import Wordmark from '../ui/Wordmark'
import { NAV_ITEMS } from '../../data/nav'
import { LINK_GOLD, LINK_UNDERLINE, SURFACE_GOLD } from '../ui/hoverStyles'
import { FacebookIcon, InstagramIcon, LinkedInIcon } from '../ui/Icons'

/*
 * Yelp burst — five radiating blades, not the "y" wordmark. Inlined because
 * react-icons is not a dependency of this project and the brief said not to add
 * one. `fill="currentColor"` lets it inherit the gold on hover/focus like the
 * other three marks.
 */
function YelpIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      {/* Blades start 2.8 from the centre so they read as five separate shapes
          rather than merging into a blob at small sizes. */}
      <g transform="translate(11.5 12)">
        <rect x="2.8" y="-1.8" width="8.2" height="3.6" rx="1.8" transform="rotate(-96)" />
        <rect x="2.8" y="-1.8" width="5.2" height="3.6" rx="1.8" transform="rotate(-36)" />
        <rect x="2.8" y="-1.8" width="5.6" height="3.6" rx="1.8" transform="rotate(14)" />
        <rect x="2.8" y="-1.8" width="4.6" height="3.6" rx="1.8" transform="rotate(64)" />
        <rect x="2.8" y="-1.8" width="5" height="3.6" rx="1.8" transform="rotate(174)" />
      </g>
    </svg>
  )
}

const SOCIALS = [
  { label: 'Facebook', Icon: FacebookIcon, href: 'https://www.facebook.com/MarciHomes/' },
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/marcimetzger_theridge/' },
  { label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/marci-metzger-30642496/' },
  { label: 'Yelp', Icon: YelpIcon, href: 'https://www.yelp.com/biz/marci-metzger-the-ridge-realty-pahrump' },
]

function Footer() {
  return (
    <footer className="relative z-10 bg-transparent pb-9 pt-11 md:pb-11 md:pt-16">
      <Container className="flex flex-col gap-7 md:gap-10">
        <div className="flex flex-col items-center gap-7 text-center md:flex-row md:items-start md:justify-between md:gap-12 md:text-left">
          <Wordmark align="center" className="md:items-start" />

          <nav aria-label="Footer" className="flex w-full flex-wrap justify-center gap-x-6 gap-y-4 md:w-auto md:gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                /* `before` widens the tap area to ~28px tall. Padding cannot be
                   used here: LINK_UNDERLINE is positioned against this box, so
                   padding would detach the underline from the text. */
                className={`group relative text-xs font-semibold uppercase leading-none tracking-[0.1em] text-on-navy transition-colors duration-200 before:absolute before:-inset-x-2.5 before:-inset-y-2 before:content-[''] md:text-[13px] ${LINK_GOLD}`}
              >
                {item.label}
                <span aria-hidden="true" className={`${LINK_UNDERLINE} w-0`} />
              </a>
            ))}
          </nav>

          <ul className="flex gap-3 md:gap-3.5">
            {SOCIALS.map(({ label, Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#CBD5E1] backdrop-blur-md transition-all duration-250 ease-out md:h-10 md:w-10 ${SURFACE_GOLD}`}
                >
                  <Icon size={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-px bg-white/10" />

        <p className="text-center text-[10px] font-medium uppercase leading-[1.6] tracking-[0.14em] text-on-navy-dim md:text-left md:text-[11px] md:tracking-[0.16em]">
          Copyright &copy; 2024 Marci Metzger &mdash; All Rights Reserved
        </p>
      </Container>
    </footer>
  )
}

export default Footer
