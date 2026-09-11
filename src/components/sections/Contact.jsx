import { useEffect, useId, useRef, useState } from 'react'
import Button from '../ui/Button'
import Container from '../ui/Container'
import SectionHeading, { Eyebrow } from '../ui/SectionHeading'
import { LINK_GOLD, OUTLINE_GOLD } from '../ui/hoverStyles'
import { ChevronDownIcon, PhoneIcon } from '../ui/Icons'
import { formatPrice } from '../../data/listings'
import { useKeyboardOcclusion } from '../../hooks/useKeyboardOcclusion'

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

function Field({ label, name, inputRef, required = false, as = 'input', type = 'text' }) {
  const id = useId()
  const Tag = as
  const internalRef = useRef(null)
  const ref = inputRef || internalRef

  useKeyboardOcclusion(ref)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        <Eyebrow>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </Eyebrow>
      </label>
      <Tag
        ref={ref}
        id={id}
        name={name}
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

/*
 * Submissions go to Web3Forms, which posts the payload straight to the
 * configured inbox — no server of our own, which suits a statically hosted
 * page. The access key only identifies that inbox and carries no account
 * privileges, so it is safe in client-side code.
 *
 * Replace the placeholder with the key emailed to you by web3forms.com.
 */
const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const FORM_ACCESS_KEY = '6841383a-09e7-48f3-b26d-8e17b27db9d8'

/** The exact wording a card click drops into the message field. */
function buildEnquiry(listing) {
  // Mirrors the card's own spec line, so Land entries never read "undefined bd".
  const specs =
    listing.type === 'Land'
      ? `${listing.lotAcres} acres`
      : `${listing.beds} bd · ${listing.baths} ba · ${listing.sqft.toLocaleString('en-US')} sqft`

  return `Hi Marci, I'm interested in ${listing.address}, ${listing.city}, NV ${listing.zip} (${formatPrice(
    listing.price,
  )} · ${specs}).

I'd like to:
-

Best time to reach me:`
}

function scrollToContact() {
  const section = document.getElementById('contact')
  if (!section) return

  /*
   * The header is sticky, so scrolling the section flush to y=0 would tuck
   * "Call or visit" underneath it. Measure the header instead of hard-coding
   * its 70px / 88px breakpoints.
   */
  const header = document.querySelector('header')
  const offset = (header?.offsetHeight ?? 0) + 16
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({
    top: Math.max(0, section.getBoundingClientRect().top + window.scrollY - offset),
    behavior: reduced ? 'auto' : 'smooth',
  })
}

/*
 * Web3Forms' own script renders any .h-captcha element using their sitekey,
 * so no key is needed in our source. It also injects the hidden
 * h-captcha-response textarea that the server verifies the token from.
 */
const CAPTCHA_SCRIPT = 'https://web3forms.com/client/script.js'

/*
 * A cooldown, deliberately not a one-per-address cap. The listing cards are
 * built to produce several enquiries from one buyer, so a lifetime limit
 * would block the exact behaviour the site is designed for. This only stops
 * accidental double-sends. Real spam never runs this code at all - it posts
 * straight to the API - which is what the captcha is for.
 */
const COOLDOWN_MS = 60000
const COOLDOWN_KEY = 'mm:last-enquiry'

function lastSentAt() {
  try {
    const value = Number(window.localStorage.getItem(COOLDOWN_KEY))
    return Number.isFinite(value) ? value : 0
  } catch {
    // Storage blocked (private mode, site-data off): no cooldown beats no form.
    return 0
  }
}

function rememberSend() {
  try {
    window.localStorage.setItem(COOLDOWN_KEY, String(Date.now()))
  } catch {
    /* nothing to do - the send already succeeded */
  }
}

function statusMessage(status, seconds) {
  switch (status) {
    case 'sent':
      return 'Thanks - your message is on its way. Marci will get back to you shortly.'
    case 'error':
      return 'Something went wrong sending that. Please call or text 206-919-6886 and Marci will help you right away.'
    case 'captcha':
      return 'Please complete the captcha below so Marci knows you are a real person.'
    case 'cooldown':
      return `That message just went through. You can send another in ${seconds} seconds, or call 206-919-6886 if it is urgent.`
    default:
      return ''
  }
}

function ContactForm({ enquiry }) {
  // idle | sending | sent | error | captcha | cooldown
  const [status, setStatus] = useState('idle')
  const [secondsLeft, setSecondsLeft] = useState(0)
  const formRef = useRef(null)
  const messageRef = useRef(null)
  // The last block we inserted, so an untouched prefill can be swapped for a
  // different listing without treating it as something the visitor wrote.
  const lastPrefill = useRef('')

  useEffect(() => {
    const field = messageRef.current
    if (!enquiry || !field) return undefined

    const block = buildEnquiry(enquiry.listing)
    const existing = field.value

    if (!existing.trim() || existing === lastPrefill.current) {
      field.value = block
      lastPrefill.current = block
    } else {
      // Typed text is never destroyed - the listing is appended beneath it.
      field.value = `${existing.replace(/\s+$/, '')}\n\n${block}`
      lastPrefill.current = ''
    }

    // Drop the caret on the "-" bullet so they can start typing immediately.
    const dash = field.value.lastIndexOf('\n-')
    const caret = dash === -1 ? field.value.length : dash + 2

    const apply = () => {
      scrollToContact()
      // preventScroll matters: focusing scrolls the element into view by
      // default, which would fight the smooth scroll we just started.
      field.focus({ preventScroll: true })
      field.setSelectionRange(caret, caret)
    }

    // A shared link arrives mid-load; wait for images so the offset is
    // measured against the settled layout rather than a half-built page.
    if (enquiry.fromLink && document.readyState !== 'complete') {
      window.addEventListener('load', apply, { once: true })
      return () => window.removeEventListener('load', apply)
    }

    apply()
    return undefined
  }, [enquiry])

  /*
   * Loaded here rather than in index.html on purpose: the script upgrades any
   * .h-captcha element it finds at load time, and React has not rendered that
   * element yet while <head> is being parsed.
   */
  useEffect(() => {
    if (document.querySelector(`script[src="${CAPTCHA_SCRIPT}"]`)) return
    const script = document.createElement('script')
    script.src = CAPTCHA_SCRIPT
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    // Cooldown first, so nobody solves a captcha only to be told to wait.
    const remaining = COOLDOWN_MS - (Date.now() - lastSentAt())
    if (remaining > 0) {
      setSecondsLeft(Math.ceil(remaining / 1000))
      setStatus('cooldown')
      return
    }

    // hCaptcha writes its token into this textarea once solved.
    if (!form.querySelector('textarea[name="h-captcha-response"]')?.value) {
      setStatus('captcha')
      return
    }

    const fields = Object.fromEntries(new FormData(form))
    setStatus('sending')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORM_ACCESS_KEY,
          subject: 'New enquiry from the Marci Metzger site',
          ...fields,
        }),
      })

      const result = await response.json()
      if (!result.success) throw new Error(result.message || 'rejected')

      setStatus('sent')
      rememberSend()
      formRef.current?.reset()
      // The token is single-use; without this the next send fails verification.
      window.hcaptcha?.reset()
    } catch {
      // Never leave the visitor guessing: fall back to the phone number.
      setStatus('error')
    }
  }

  const message = statusMessage(status, secondsLeft)

  return (
    /* min-w-0: this form is a grid item, and grid items default to
       min-width:auto, so they refuse to shrink below their widest child. The
       captcha's fixed 302px iframe set that floor and burst the column out of
       the container below ~355px. */
    <form ref={formRef} className="flex min-w-0 flex-col gap-5" onSubmit={handleSubmit}>
      <Field label="Name" name="name" />
      <Field label="Email" name="email" required type="email" />
      <Field label="Message" name="message" as="textarea" inputRef={messageRef} />

      {/* Honeypot: bots complete it, people never see it. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      {/*
        Upgraded into the hCaptcha widget by Web3Forms' script. The widget is a
        fixed ~302px iframe that cannot be told to be narrower, so below 345px
        it is scaled down to fit instead of scrolling sideways.
        w-max lets the inner box size to whatever the widget actually is rather
        than hard-coding its width, and the wrapper clips the untransformed
        layout box so the oversized inner div can never widen the form.
      */}
      {/* overflow-clip, not hidden: hidden makes this a scroll container, so
          focusing the widget could scroll its untransformed layout box and
          shift the scaled render. clip cannot scroll at all. */}
      <div className="max-w-full overflow-clip">
        <div
          className="h-captcha w-max origin-top-left max-[345px]:scale-90 max-[319px]:scale-[0.82]"
          data-captcha="true"
          data-theme="dark"
        />
      </div>

      <Button type="submit" className="mt-1 self-start" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </Button>

      {/* Stays mounted so the result is announced, sr-only until there is one. */}
      <p
        role="status"
        aria-live="polite"
        className={
          message
            ? `rounded-xl border px-4 py-3.5 text-sm leading-[1.6] text-ink ${
                status === 'sent' ? 'border-accent/40 bg-accent/10' : 'border-white/20 bg-white/5'
              }`
            : 'sr-only'
        }
      >
        {message}
      </p>
    </form>
  )
}

function Contact({ enquiry }) {
  return (
    <section id="contact" className="relative z-10 bg-transparent py-14 md:py-24">
      <Container>
        <SectionHeading eyebrow="Get in touch" title="Call or visit" className="pb-10 md:pb-12" />

        <div className="grid gap-10 md:grid-cols-2 md:gap-[72px]">
          <ContactForm enquiry={enquiry} />

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
