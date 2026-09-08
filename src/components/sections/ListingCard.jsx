import Placeholder from '../ui/Placeholder'
import { asset } from '../../lib/asset'
import { formatPrice } from '../../data/listings'

const STATUS_STYLES = {
  New: 'bg-accent text-ink-deep',
  Pending: 'bg-ink text-ground',
}

function ListingCard({ listing }) {
  const specs =
    listing.type === 'Land'
      ? [`${listing.lotAcres} acres`, 'Utilities at road']
      : [`${listing.beds} bd`, `${listing.baths} ba`, `${listing.sqft.toLocaleString('en-US')} sqft`]

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
      {/* Real photo when the listing has one, Placeholder until it does. */}
      <div className="relative h-[190px] w-full border-b border-white/10 md:h-[200px]">
        {listing.image ? (
          <img
            src={asset(listing.image)}
            alt={`${listing.address}, ${listing.city}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <Placeholder label="Listing photo" className="h-full w-full border-0" />
        )}

        {STATUS_STYLES[listing.status] && (
          <span
            className={`absolute left-3.5 top-3.5 px-2.5 py-[7px] text-[10px] font-semibold uppercase leading-none tracking-[0.14em] ${
              STATUS_STYLES[listing.status]
            }`}
          >
            {listing.status}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-5 pb-6 md:px-6">
        <p className="font-display text-[25px] font-semibold md:text-[27px]">{formatPrice(listing.price)}</p>
        <h3 className="font-sans text-[17px] font-semibold leading-[1.35] md:text-lg">{listing.address}</h3>
        <p className="text-sm font-medium text-muted">
          {listing.city}, NV {listing.zip} &middot; {listing.type}
        </p>
        <ul className="mt-2 flex gap-4 border-t border-white/10 pt-3 text-sm font-medium text-muted">
          {specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default ListingCard
