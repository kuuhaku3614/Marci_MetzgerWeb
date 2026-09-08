import { GOLD_GLOW, SURFACE_GOLD } from './hoverStyles'

const VARIANTS = {
  // Solid fills keep their own colour shift and gain the shared gold glow.
  primary: `bg-ink text-ground border-transparent hover:bg-white focus-visible:bg-white ${GOLD_GLOW}`,
  gold: `bg-accent text-ink-deep border-transparent hover:brightness-110 focus-visible:brightness-110 ${GOLD_GLOW}`,
  // Ghost is a bordered surface, so it takes the same treatment as icon buttons.
  ghost: `bg-white/5 text-ink border-white/20 backdrop-blur-md ${SURFACE_GOLD}`,
}

const SIZES = {
  md: 'h-[54px] px-7',
  sm: 'h-[46px] px-[22px]',
}

function Button({ as: Tag = 'button', variant = 'primary', size = 'md', full = false, className = '', children, ...props }) {
  return (
    <Tag
      /*
       * `transition-all` rather than `transition-colors`: the gold glow is a
       * box-shadow, which colour-only transitions do not animate.
       *
       * `cursor-pointer` is explicit because Tailwind v4's Preflight no longer
       * applies it to <button>, so buttons otherwise inherit the browser's
       * default arrow. Harmless on the `as="a"` variants.
       */
      className={`inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border text-sm font-semibold tracking-[0.05em] transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60 ${
        VARIANTS[variant]
      } ${SIZES[size]} ${full ? 'w-full' : ''} ${className}`}
      {...(Tag === 'button' && !props.type ? { type: 'button' } : null)}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Button
