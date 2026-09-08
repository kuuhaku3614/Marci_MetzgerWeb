export const ANY = 'any'

/*
 * Option lists mirror the MLS dropdowns supplied as reference. The location
 * list is alphabetical and was captured mid-scroll, so it stops at "Goldfield";
 * append the rest of the towns when the full list is available.
 */
export const LOCATIONS = [
  'Alamo',
  'Alton',
  'Amargosa Valley',
  'Beatty',
  'Beryl',
  'Blue Diamond',
  'Boulder City',
  'Brian Head',
  'Cal Nev Ari',
  'Caliente',
  'Cold Creek',
  'Crystal',
  'Duck Creek Village',
  'Dyer',
  'Elko',
  'Ely',
  'Goldfield',
  // The reference list was captured mid-scroll and stops at "Goldfield";
  // Pahrump is added because the real listings are there and the filter
  // would otherwise be unable to reach them.
  'Pahrump',
]

export const PROPERTY_TYPES = ['Land', 'Residential Lease', 'High Rise', 'Residential']

const countOptions = (counts) => [
  { value: ANY, label: 'Any' },
  ...counts.map((count) => ({ value: String(count), label: `${count}+` })),
]

const priceOptions = (label, prices) => [
  { value: ANY, label },
  ...prices.map((price) => ({ value: String(price), label: `$${price / 1000}k` })),
]

export const areaOptions = [
  { value: ANY, label: 'Any' },
  ...LOCATIONS.map((location) => ({ value: location, label: location })),
]

export const typeOptions = [
  { value: ANY, label: 'Any' },
  ...PROPERTY_TYPES.map((type) => ({ value: type, label: type })),
]

export const bedOptions = countOptions([1, 2, 3, 4])
export const bathOptions = countOptions([1, 2, 3])
export const minPriceOptions = priceOptions('No min', [150000, 200000, 250000, 300000, 400000])
export const maxPriceOptions = priceOptions('No max', [250000, 350000, 450000, 550000, 700000])

export const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Least Expensive to Most' },
  { value: 'price-desc', label: 'Most Expensive to Least' },
  { value: 'beds-asc', label: 'Bedrooms (Low to High)' },
  { value: 'beds-desc', label: 'Bedrooms (High to Low)' },
  { value: 'baths-asc', label: 'Bathrooms (Low to High)' },
  { value: 'baths-desc', label: 'Bathrooms (High to Low)' },
]
