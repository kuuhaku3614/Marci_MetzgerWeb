import { ImageIcon } from './Icons'

// Both tones now resolve to the same glass treatment; the prop is kept so
// existing call sites and the component signature are unchanged.
const TONES = {
  cream: 'border-white/10 bg-white/5 text-on-navy-dim backdrop-blur-md',
  navy: 'border-white/10 bg-white/5 text-on-navy-dim backdrop-blur-md',
}

/**
 * Stands in for photography until real images land. Every image and the map
 * routes through here, so swapping in real assets is a one-component change.
 */
function Placeholder({ label = 'Photo', tone = 'cream', icon: Icon = ImageIcon, className = '', children }) {
  return (
    <div
      className={`relative flex items-center justify-center gap-2.5 overflow-hidden border ${TONES[tone]} ${className}`}
    >
      <Icon size={18} />
      <span className="text-[11px] font-medium uppercase leading-none tracking-[0.16em]">{label}</span>
      {children}
    </div>
  )
}

export default Placeholder
