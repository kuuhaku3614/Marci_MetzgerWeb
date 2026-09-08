import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import Container from '../ui/Container'
import Wordmark from '../ui/Wordmark'
import { CloseIcon, PhoneIcon } from '../ui/Icons'
import { NAV_ITEMS } from '../../data/nav'
import { LINK_GOLD, LINK_UNDERLINE, SURFACE_GOLD } from '../ui/hoverStyles'

const PHONE = '206-919-6886'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return undefined

    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const getFocusable = () =>
      panelRef.current ? [...panelRef.current.querySelectorAll('a[href], button:not([disabled])')] : []

    getFocusable()[0]?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      // Restore to the trigger itself; activeElement is unreliable here.
      trigger?.focus()
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md">
      <Container className="flex h-[70px] items-center justify-between gap-4 md:h-[88px] md:gap-10">
        <a href="#top" aria-label="Marci Metzger Homes — home">
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-[34px] lg:flex">
          {NAV_ITEMS.map((item, index) => {
            const active = index === 0
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative pb-1.5 text-[13px] font-semibold uppercase leading-none tracking-[0.1em] transition-colors duration-200 ${LINK_GOLD} ${
                  active ? 'border-b-2 border-accent text-ink' : 'text-muted'
                }`}
              >
                {item.label}
                {/* The active item already carries a permanent gold rule, so only
                    the others get the hover sweep. */}
                {!active && <span aria-hidden="true" className={`${LINK_UNDERLINE} w-0`} />}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Visibility lives on the wrapper: `hidden` on the Button itself
              would collide with the component's own `inline-flex`. */}
          <span className="hidden sm:block">
            <Button as="a" href={`tel:${PHONE}`} size="sm">
              <PhoneIcon />
              {PHONE}
            </Button>
          </span>

          <a
            href={`tel:${PHONE}`}
            aria-label={`Call ${PHONE}`}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-ink backdrop-blur-md transition-all duration-250 ease-out sm:hidden ${SURFACE_GOLD}`}
          >
            <PhoneIcon size={18} />
          </a>

          <button
            type="button"
            ref={triggerRef}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className={`flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-xl border border-white/10 bg-white/5 px-3 text-ink backdrop-blur-md transition-all duration-250 ease-out lg:hidden ${SURFACE_GOLD}`}
          >
            {/* bg-current so the bars follow the button's hover colour */}
            <span className="block h-px w-full bg-current" />
            <span className="block h-px w-full bg-current" />
            <span className="block h-px w-full bg-current" />
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 bg-[#0A1628]/95 backdrop-blur-xl"
        >
          <Container className="flex h-full flex-col pt-8">
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink backdrop-blur-md transition-all duration-250 ease-out ${SURFACE_GOLD}`}
              >
                <CloseIcon />
              </button>
            </div>

            <nav aria-label="Site" className="mt-14 flex flex-col gap-8">
              {NAV_ITEMS.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl uppercase tracking-[0.1em] transition-colors duration-200 ${LINK_GOLD} ${
                    index === 0 ? 'font-semibold text-ink' : 'text-muted'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <Button as="a" href={`tel:${PHONE}`} className="mt-12 self-start" onClick={() => setMenuOpen(false)}>
              <PhoneIcon />
              Call {PHONE}
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}

export default Header
