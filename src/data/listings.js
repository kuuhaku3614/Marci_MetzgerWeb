/**
 * Six real Pahrump listings. Prices, addresses, specs and photos come from
 * their source listings.
 *
 * Two caveats: `listedAt` is a placeholder on every entry — no list date was
 * available — and it only affects the Newest / Oldest sorts; and `status` is
 * "For sale" throughout because none of the sources stated one, so the New and
 * Pending badges are currently unused.
 *
 * All six are Residential, so the Land / High Rise / Residential Lease type
 * filters now return the empty state.
 *
 * A listing with `image: null` falls back to the Placeholder.
 */
export const listings = [
  {
    // Real listing. `yearBuilt` is not shown on the card yet, kept for when it is.
    id: 'birch-4510',
    address: '4510 S Birch Ct',
    city: 'Pahrump',
    zip: '89061',
    price: 334000,
    beds: 3,
    baths: 2,
    sqft: 1644,
    lotAcres: 0.14, // 5,967 sq ft
    yearBuilt: 2018,
    type: 'Residential',
    status: 'For sale',
    listedAt: '2024-07-18', // placeholder — no list date in the source
    featured: true,
    image: '/listing.png',
  },
  {
    // Real listing.
    id: 'gressa-4310',
    address: '4310 S Gressa St',
    city: 'Pahrump',
    zip: '89061',
    price: 335000,
    beds: 3,
    baths: 2,
    sqft: 1611,
    lotAcres: 0.13, // 5,662 sq ft
    yearBuilt: 2008,
    hoaMonthly: 115,
    type: 'Residential',
    status: 'For sale',
    listedAt: '2024-03-02', // placeholder — no list date in the source
    featured: true,
    image: '/listing3.png',
  },
  {
    // Real listing.
    id: 'cactus-canyon-4904',
    address: '4904 E Cactus Canyon Dr',
    city: 'Pahrump',
    zip: '89061',
    price: 499000,
    beds: 2,
    baths: 3,
    sqft: 1981,
    lotAcres: 0.14, // 6,316 sq ft
    yearBuilt: 2018,
    hoaMonthly: 280,
    type: 'Residential',
    status: 'For sale',
    listedAt: '2024-05-11', // placeholder — no list date in the source
    featured: true,
    image: '/listing5.png',
  },
  {
    // Real listing.
    id: 'fairmont-5280',
    address: '5280 Fairmont St',
    city: 'Pahrump',
    zip: '89061',
    price: 629000,
    beds: 4,
    baths: 3,
    sqft: 2352,
    lotAcres: 0.35,
    yearBuilt: 2022,
    hoaMonthly: 23,
    type: 'Residential',
    status: 'For sale',
    listedAt: '2024-01-27', // placeholder — no list date in the source
    featured: true,
    image: '/listing6.png',
  },
  {
    // Real listing.
    id: 'grand-cypress-4417',
    address: '4417 S Grand Cypress Way',
    city: 'Pahrump',
    zip: '89061',
    price: 560000,
    beds: 3,
    baths: 3,
    sqft: 2003,
    lotAcres: 0.18, // 8,015 sq ft
    yearBuilt: 2019,
    hoaMonthly: 280,
    type: 'Residential',
    status: 'For sale',
    listedAt: '2024-04-09', // placeholder — no list date in the source
    featured: true,
    image: '/listing2.png',
  },
  {
    // Real listing. No HOA on this one.
    id: 'banyon-2610',
    address: '2610 Banyon St',
    city: 'Pahrump',
    zip: '89048',
    price: 569000,
    beds: 4,
    baths: 3,
    sqft: 2603,
    lotAcres: 2,
    yearBuilt: 2023,
    type: 'Residential',
    status: 'For sale',
    listedAt: '2024-08-05', // placeholder — no list date in the source
    featured: true,
    image: '/listing4.png',
  },
]

export function formatPrice(price) {
  return `$${price.toLocaleString('en-US')}`
}
