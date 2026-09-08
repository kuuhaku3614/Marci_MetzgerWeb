/**
 * Shared gold hover/focus treatment.
 *
 * Gold comes from the `accent` token (--color-accent: #c9a227), so the hex is
 * never repeated per element. These are written as complete literal class
 * strings because Tailwind scans source text for whole class names — building
 * them by interpolation would compile to nothing.
 *
 * Every hover rule is paired with `focus-visible` so keyboard users get the
 * same state. Tailwind v4 already wraps `hover:` in `@media (hover: hover)`,
 * so touch devices keep the resting state.
 *
 * Transitions are deliberately NOT included here — call sites declare their
 * own, so these never fight an existing `transition-*` on the same element.
 */

/** Text links: nav labels, inline phone numbers. */
export const LINK_GOLD = 'hover:text-accent focus-visible:text-accent'

/**
 * Underline bar that grows from the left. The parent needs `group relative`;
 * set the resting width (`w-0`) at the call site so an active item can pin
 * itself to `w-full` without two competing width utilities.
 */
export const LINK_UNDERLINE =
  'pointer-events-none absolute -bottom-1.5 left-0 h-px bg-accent transition-[width] duration-300 ease-out group-hover:w-full group-focus-visible:w-full'

/** Bordered surfaces: icon buttons and ghost buttons — border, tint, icon colour and glow. */
export const SURFACE_GOLD =
  'hover:border-accent/60 hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_18px_rgba(201,162,39,0.25)] ' +
  'focus-visible:border-accent/60 focus-visible:bg-accent/10 focus-visible:text-accent ' +
  'focus-visible:shadow-[0_0_18px_rgba(201,162,39,0.25)]'

/**
 * Border, content and glow go gold, but the fill is left untouched — for
 * controls sitting on top of imagery, where `SURFACE_GOLD`'s translucent tint
 * would replace an opaque background and let the picture show through.
 */
export const OUTLINE_GOLD =
  'hover:border-accent/60 hover:text-accent hover:shadow-[0_0_18px_rgba(201,162,39,0.25)] ' +
  'focus-visible:border-accent/60 focus-visible:text-accent ' +
  'focus-visible:shadow-[0_0_18px_rgba(201,162,39,0.25)]'

/** Glow only — for solid fills that already carry their own colour. */
export const GOLD_GLOW =
  'hover:shadow-[0_0_18px_rgba(201,162,39,0.25)] focus-visible:shadow-[0_0_18px_rgba(201,162,39,0.25)]'
