const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ size = 16, children, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  )
}

export function PhoneIcon({ size }) {
  return (
    <Svg size={size} {...stroke}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3z" />
    </Svg>
  )
}

export function MessageIcon({ size }) {
  return (
    <Svg size={size} {...stroke}>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20.5l1.4-5A8 8 0 1 1 21 12z" />
    </Svg>
  )
}

export function SearchIcon({ size }) {
  return (
    <Svg size={size} {...stroke}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.3-4.3" />
    </Svg>
  )
}

export function ChevronDownIcon({ size }) {
  return (
    <Svg size={size} {...stroke}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  )
}

export function ArrowRightIcon({ size }) {
  return (
    <Svg size={size} {...stroke}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  )
}

export function CheckIcon({ size }) {
  return (
    <Svg size={size} {...stroke} strokeWidth={2}>
      <path d="M4 12l5 5L20 7" />
    </Svg>
  )
}

export function StarIcon({ size = 16 }) {
  return (
    <Svg size={size} fill="currentColor">
      <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.7l5.9-.9z" />
    </Svg>
  )
}

export function ImageIcon({ size = 18 }) {
  return (
    <Svg size={size} {...stroke} strokeWidth={1.5}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 16l-5-5-4.5 4.5" />
      <path d="M3 18l4-4 2.5 2.5" />
    </Svg>
  )
}

export function MapIcon({ size = 18 }) {
  return (
    <Svg size={size} {...stroke} strokeWidth={1.5}>
      <path d="M9 20l-5.5 2V6L9 4l6 2 5.5-2v16L15 22z" />
      <path d="M9 4v16M15 6v16" />
    </Svg>
  )
}

export function CloseIcon({ size = 22 }) {
  return (
    <Svg size={size} {...stroke} strokeWidth={1.7}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  )
}

export function FacebookIcon({ size = 17 }) {
  return (
    <Svg size={size} fill="currentColor">
      <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H7v3h2v9h3v-9h2.5l.5-3H12V6.6c0-.6.4-1.1 1-1.1h2z" />
    </Svg>
  )
}

export function InstagramIcon({ size = 17 }) {
  return (
    <Svg size={size} {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function LinkedInIcon({ size = 17 }) {
  return (
    <Svg size={size} {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10.5v6M7.5 7.2v.01M11.5 16.5v-3.5a2.2 2.2 0 0 1 4.4 0v3.5" />
    </Svg>
  )
}
