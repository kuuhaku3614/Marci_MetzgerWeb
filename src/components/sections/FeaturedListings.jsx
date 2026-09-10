import Button from '../ui/Button'
import Container from '../ui/Container'
import ListingCard from './ListingCard'
import SectionHeading from '../ui/SectionHeading'
import Select from '../ui/Select'
import {
  areaOptions,
  bathOptions,
  bedOptions,
  maxPriceOptions,
  minPriceOptions,
  sortOptions,
  typeOptions,
} from '../../data/filterOptions'
import { listings } from '../../data/listings'

function FeaturedListings({ filters, setFilter, reset, results, isFiltered, onEnquire }) {
  return (
    <section id="listings" className="relative z-10 bg-transparent py-14 md:py-24">
      <Container>
        <div className="flex flex-col gap-8 pb-10 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-11">
          <SectionHeading eyebrow="Now on the market" title="Featured Pahrump listings" />
          <p className="text-sm font-medium text-muted">
            Showing <span className="text-ink">{results.length}</span> of {listings.length} listings
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:mb-10 md:grid-cols-4 lg:grid-cols-7 md:p-6">
          <Select label="Location" value={filters.area} onChange={(v) => setFilter('area', v)} options={areaOptions} />
          <Select label="Type" value={filters.type} onChange={(v) => setFilter('type', v)} options={typeOptions} />
          <Select label="Beds" value={filters.beds} onChange={(v) => setFilter('beds', v)} options={bedOptions} />
          <Select label="Baths" value={filters.baths} onChange={(v) => setFilter('baths', v)} options={bathOptions} />
          <Select
            label="Min price"
            value={filters.minPrice}
            onChange={(v) => setFilter('minPrice', v)}
            options={minPriceOptions}
          />
          <Select
            label="Max price"
            value={filters.maxPrice}
            onChange={(v) => setFilter('maxPrice', v)}
            options={maxPriceOptions}
          />
          <Select label="Sort by" value={filters.sort} onChange={(v) => setFilter('sort', v)} options={sortOptions} />
        </div>

        {results.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {results.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onEnquire={onEnquire} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-white/5 px-6 py-20 text-center backdrop-blur-md">
            <h3 className="font-display text-2xl">No listings match those filters.</h3>
            <p className="max-w-[48ch] text-muted">
              Try widening your price range or bedroom count &mdash; or call Marci directly. Plenty moves before it
              reaches the site.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={reset}>Clear filters</Button>
              <Button as="a" href="tel:206-919-6886" variant="ghost">
                Call 206-919-6886
              </Button>
            </div>
          </div>
        )}

        {isFiltered && results.length > 0 && (
          <div className="pt-10">
            <Button variant="ghost" onClick={reset}>
              Clear filters
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}

export default FeaturedListings
