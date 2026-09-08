import { asset } from '../../lib/asset'

const LOGO = asset('Name_signature.png')

/*
 * The supplied logo is pure black artwork on a transparent background, so it
 * is invisible against the dark canvas. Rather than filter-hacking it to
 * white, the file is used as an alpha MASK and filled with a palette token —
 * the mark then takes its colour from the theme exactly.
 *
 * The file also carries a lot of uneven transparent padding: the ink occupies
 * only 608x109 of the 733x196 canvas (44px left / 81px right, 33px top / 54px
 * bottom). Left as-is the mark renders small and visually off-centre, so the
 * mask is scaled and offset to crop to the ink. The element box is therefore
 * the ink itself, at its true 5.58:1 ratio.
 *
 *   scale    = canvas / ink            -> 733/608, 196/109
 *   position = padding / (canvas-ink)  -> 44/125,  33/87
 */
const MASK = {
  WebkitMaskImage: `url(${LOGO})`,
  maskImage: `url(${LOGO})`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: '120.6% 179.8%',
  maskSize: '120.6% 179.8%',
  WebkitMaskPosition: '35.2% 37.9%',
  maskPosition: '35.2% 37.9%',
}

function Wordmark({ tone = 'light', className = '', align = 'start' }) {
  const fill = tone === 'gold' ? 'bg-accent' : 'bg-ink'

  return (
    <div className={`flex ${align === 'center' ? 'items-center' : 'items-start'} ${className}`}>
      <span
        role="img"
        aria-label="Marci Metzger Homes"
        className={`block h-6 w-[134px] shrink-0 sm:h-9 sm:w-[201px] ${fill}`}
        style={MASK}
      />
    </div>
  )
}

export default Wordmark
