import { MessageIcon, PhoneIcon } from '../ui/Icons'
import { LINK_GOLD } from '../ui/hoverStyles'

const PHONE = '206-919-6886'

/**
 * Fixed to the bottom of the viewport below `md`. The page reserves space
 * for it with padding so the footer is never covered.
 */
function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 backdrop-blur-xl md:hidden">
      <a
        href={`tel:${PHONE}`}
        className={`flex h-[60px] items-center justify-center gap-2.5 bg-[#0A1628]/80 text-sm font-semibold tracking-[0.05em] text-ink transition-colors duration-200 ${LINK_GOLD}`}
      >
        <span className="text-accent">
          <PhoneIcon size={17} />
        </span>
        Call
      </a>
      <a
        href={`sms:${PHONE}`}
        className={`flex h-[60px] items-center justify-center gap-2.5 bg-[#0A1628]/80 text-sm font-semibold tracking-[0.05em] text-ink transition-colors duration-200 ${LINK_GOLD}`}
      >
        <span className="text-accent">
          <MessageIcon size={17} />
        </span>
        Text
      </a>
    </div>
  )
}

export default StickyCallBar
