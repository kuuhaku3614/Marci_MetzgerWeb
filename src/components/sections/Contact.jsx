import { useEffect, useId, useRef, useState } from 'react'
import Button from '../ui/Button'
import Container from '../ui/Container'
import SectionHeading, { Eyebrow } from '../ui/SectionHeading'
import { LINK_GOLD, OUTLINE_GOLD } from '../ui/hoverStyles'
import { ChevronDownIcon, PhoneIcon } from '../ui/Icons'

const OFFICE_ADDRESS = '3190 HW 160, Suite F, Pahrump, NV, 89048'

/*
 * Supplied "share → embed" URL, used verbatim: it carries its own centre,
 * zoom and marker, so it settles the location rather than relying on Google
 * geocoding the address string. No API key and no map library needed.
 */
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d48962.53994229413!2d-116.03938814212594!3d36.204141980032226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s3190%20HW%20160%2C%20Suite%20F%2C%20Pahrump%2C%20NV%2C%2089048!5e1!3m2!1sen!2sph!4v1788863087917!5m2!1sen!2sph'

const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICE_ADDRESS)}`

/** `day` matches Date#getDay() (0 = Sunday) so today can be highlighted. */
const OFFICE_HOURS = [
  { day: 1, label: 'Mon', hours: '08:00 am – 07:00 pm' },
  { day: 2, label: 'Tue', hours: '08:00 am – 07:00 pm' },
  { day: 3, label: 'Wed', hours: '08:00 am – 07:00 pm' },
  { day: 4, label: 'Thu', hours: '08:00 am – 07:00 pm' },
  { day: 5, label: 'Fri', hours: '08:00 am – 07:00 pm' },
  { day: 6, label: 'Sat', hours: '08:00 am – 07:00 pm' },
  { day: 0, label: 'Sun', hours: '08:00 am – 07:00 pm' },
]

/**
 * Summary row that reveals per-day hours in a floating panel.
 *
 * The panel is absolutely positioned, so opening it cannot move the
 * appointments note or anything below it. It stays mounted and toggles
 * visibility rather than unmounting, so the enter/exit transition can run.
 */
function OfficeHoursDropdown() {
  const [open, setOpen] = useState(false)
  // Read once on mount; the panel does not need to re-check across midnight.
  const [today] = useState(() => new Date().getDay())
  const wrapperRef = useRef(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div
      ref={wrapperRef}
      className="group relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        /* -my-1.5 cancels the padding, so the row keeps its exact height while
           the trigger becomes 36px tall to tap. */
        className={`-my-1.5 flex w-full cursor-pointer items-center justify-between gap-3 py-1.5 text-left text-base font-semibold transition-colors duration-200 md:text-[17px] ${LINK_GOLD}`}
      >
        <span>Open daily</span>
        <span className="flex items-center gap-2">
          8:00 am &ndash; 7:00 pm
          <span
            aria-hidden="true"
            className={`transition-transform duration-200 motion-reduce:transition-none group-hover:rotate-180 ${
              open ? 'rotate-180' : ''
            }`}
          >
            <ChevronDownIcon />
          </span>
        </span>
      </button>

      <div
        id={panelId}
        className={`absolute left-0 top-full z-50 mt-2 w-full max-w-sm rounded-xl border border-white/10 bg-[#0D1B2E]/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-md transition duration-200 ease-out motion-reduce:transition-none ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-1 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0'
        }`}
      >
        <dl className="flex flex-col gap-2">
          {OFFICE_HOURS.map((entry) => (
            <div
              key={entry.label}
              className={`flex justify-between gap-4 text-sm ${
                entry.day === today ? 'font-semibold text-accent' : 'text-[#94A3B8]'
              }`}
            >
              <dt>{entry.label}</dt>
              <dd>{entry.hours}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

function Field({ label, required = false, as = 'input', type = 'text' }) {
  const id = useId()
  const Tag = as
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        <Eyebrow>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </Eyebrow>
      </label>
      <Tag
        id={id}
        type={as === 'input' ? type : undefined}
        required={required}
        rows={as === 'textarea' ? 5 : undefined}
        className={`w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-base text-ink backdrop-blur-md ${
          as === 'textarea' ? 'resize-y' : 'h-[52px]'
        }`}
      />
    </div>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative z-10 bg-transparent py-14 md:py-24">
      <Container>
        <SectionHeading eyebrow="Get in touch" title="Call or visit" className="pb-10 md:pb-12" />

        <div className="grid gap-10 md:grid-cols-2 md:gap-[72px]">
          <form className="flex flex-col gap-5" onSubmit={(event) => event.preventDefault()}>
            <Field label="Name" />
            <Field label="Email" required type="email" />
            <Field label="Message" as="textarea" />
            <Button type="submit" className="mt-1 self-start">
              Send message
            </Button>
            <p className="text-xs leading-[1.6] text-on-navy-dim">
              This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>
          </form>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start gap-3.5">
              <h3 className="font-display text-[21px] font-semibold md:text-2xl">
                Marci Metzger &mdash; The Ridge Realty Group
              </h3>
              <p className="text-muted">
                3190 HW 160, Suite F
                <br />
                Pahrump, Nevada 89048, United States
              </p>
              <a
                href="tel:2069196886"
                className={`flex items-center gap-2.5 text-[19px] font-semibold transition-colors duration-200 md:text-xl ${LINK_GOLD}`}
              >
                <span className="text-accent">
                  <PhoneIcon size={18} />
                </span>
                (206) 919-6886
              </a>
            </div>

            <div className="flex flex-col gap-2.5 border-y border-white/10 py-6">
              <Eyebrow>Office hours</Eyebrow>
              <OfficeHoursDropdown />
              <p className="text-sm font-medium text-muted">
                Appointments outside office hours available upon request. Just call!
              </p>
            </div>

            <div className="relative h-[200px] w-full overflow-hidden rounded-2xl border border-white/10 md:h-[230px]">
              <iframe
                title={`Map showing the office at ${OFFICE_ADDRESS}`}
                src={MAP_EMBED}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full border-0"
              />

              {/*
                Top-right keeps this clear of Google's own white "Open in Maps"
                button (top-left) and of its map-data / Terms attribution along
                the bottom, which must not be obscured. OUTLINE_GOLD leaves the
                opaque fill alone on hover so the map never shows through.
              */}
              <a
                href={MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute right-3 top-3 inline-flex cursor-pointer items-center rounded-lg border border-white/10 bg-[#0A1628] px-3 py-2 text-[10px] font-semibold uppercase leading-none tracking-[0.1em] text-ink transition-all duration-250 ease-out ${OUTLINE_GOLD}`}
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Contact
