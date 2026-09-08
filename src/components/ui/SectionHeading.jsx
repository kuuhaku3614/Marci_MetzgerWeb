export function Eyebrow({ tone = 'muted', className = '', children }) {
  const color =
    tone === 'gold' ? 'text-accent' : tone === 'navy' ? 'text-on-navy' : tone === 'soft' ? 'text-accent-soft' : 'text-muted'
  return (
    <span className={`text-xs font-semibold uppercase leading-none tracking-[0.18em] ${color} ${className}`}>
      {children}
    </span>
  )
}

function SectionHeading({ eyebrow, title, tone = 'light', id, className = '' }) {
  const onDark = tone === 'dark'
  return (
    <div className={`flex flex-col gap-3.5 ${className}`}>
      {eyebrow && <Eyebrow tone={onDark ? 'gold' : 'soft'}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="text-[clamp(1.75rem,3.5vw,2.625rem)] tracking-[-0.012em] text-ink"
      >
        {title}
      </h2>
    </div>
  )
}

export default SectionHeading
