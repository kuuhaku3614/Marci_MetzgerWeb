function Stat({ value, label }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-display text-[clamp(2rem,4vw,2.625rem)] font-semibold leading-none text-accent">
        {value}
      </span>
      <span className="text-[11px] font-semibold uppercase leading-[1.45] tracking-[0.13em] text-on-navy md:text-xs">
        {label}
      </span>
    </div>
  )
}

export default Stat
