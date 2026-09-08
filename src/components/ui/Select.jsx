import { useId } from 'react'
import { ChevronDownIcon } from './Icons'
import { Eyebrow } from './SectionHeading'

function Select({ label, value, onChange, options, className = '' }) {
  const id = useId()
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id}>
        <Eyebrow>{label}</Eyebrow>
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-[50px] w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-3.5 pr-10 text-[15px] font-medium text-ink backdrop-blur-md"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  )
}

export default Select
