import Button from '../ui/Button'
import Container from '../ui/Container'
import Select from '../ui/Select'
import { Eyebrow } from '../ui/SectionHeading'
import { PhoneIcon, SearchIcon } from '../ui/Icons'
import { areaOptions, bedOptions, maxPriceOptions, typeOptions } from '../../data/filterOptions'

/*
 * The hero photograph is no longer rendered here — it is the page background
 * (see PageBackground.jsx), so this content sits directly on it. That is what
 * keeps exactly one element in the DOM rendering the photo.
 */
function Hero({ filters, setFilter }) {
  return (
    <section id="top" className="relative z-10 bg-transparent pt-12 md:pt-20">
      <Container>
        <div className="flex max-w-[46rem] flex-col items-start gap-5 md:gap-6">
          <Eyebrow tone="soft">Marci Metzger &middot; The Ridge Realty Group</Eyebrow>
          <h1 className="text-[clamp(2.375rem,6vw,4.125rem)] font-semibold leading-[1.02] tracking-[-0.022em]">
            Pahrump&rsquo;s realtor for nearly three decades.
          </h1>
          <p className="max-w-[46ch] text-[19px] leading-[1.6] text-muted">
            Ninety families helped in 2021 alone. Buying your first place, selling the family home, or moving out to
            the valley &mdash; you&rsquo;ll have a pro at your service.
          </p>
          <div className="flex flex-col gap-3.5 pt-1.5 sm:flex-row">
            {/* <Button as="a" href="#listings">
              Search listings
            </Button> */}
            <Button as="a" href="tel:206-919-6886" variant="ghost">
              <PhoneIcon />
              Call 206-919-6886
            </Button>
          </div>
        </div>

        <form
          className="mt-10 flex flex-col gap-3.5 rounded-2xl border border-white/10 border-t-2 border-t-accent bg-white/5 p-5 backdrop-blur-md md:mt-14 md:flex-row md:items-end md:gap-[18px] md:p-7"
          onSubmit={(event) => event.preventDefault()}
        >
          <Select
            label="Location"
            className="md:flex-1"
            value={filters.area}
            onChange={(value) => setFilter('area', value)}
            options={areaOptions}
          />
          <Select
            label="Property type"
            className="md:flex-1"
            value={filters.type}
            onChange={(value) => setFilter('type', value)}
            options={typeOptions}
          />
          <div className="grid grid-cols-2 gap-3.5 md:contents">
            <Select
              label="Bedrooms"
              className="md:flex-1"
              value={filters.beds}
              onChange={(value) => setFilter('beds', value)}
              options={bedOptions}
            />
            <Select
              label="Max price"
              className="md:flex-1"
              value={filters.maxPrice}
              onChange={(value) => setFilter('maxPrice', value)}
              options={maxPriceOptions}
            />
          </div>
          <Button as="a" href="#listings" className="h-[50px] shrink-0">
            <SearchIcon />
            Search
          </Button>
        </form>
      </Container>
    </section>
  )
}

export default Hero
