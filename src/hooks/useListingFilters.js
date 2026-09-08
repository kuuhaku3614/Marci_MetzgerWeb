import { useCallback, useMemo, useState } from 'react'
import { ANY } from '../data/filterOptions'
import { listings } from '../data/listings'

const INITIAL = {
  area: ANY,
  type: ANY,
  beds: ANY,
  baths: ANY,
  minPrice: ANY,
  maxPrice: ANY,
  sort: 'newest',
}

// Land has no beds/baths; treat those as 0 so it sorts to the bottom of a
// "low to high" bedroom sort rather than throwing off the comparison.
const count = (value) => value ?? 0
const listed = (listing) => new Date(listing.listedAt).getTime()

const SORTERS = {
  newest: (a, b) => listed(b) - listed(a),
  oldest: (a, b) => listed(a) - listed(b),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'beds-asc': (a, b) => count(a.beds) - count(b.beds),
  'beds-desc': (a, b) => count(b.beds) - count(a.beds),
  'baths-asc': (a, b) => count(a.baths) - count(b.baths),
  'baths-desc': (a, b) => count(b.baths) - count(a.baths),
}

/**
 * One source of truth for the hero search bar and the listings grid, so a
 * search started in the hero lands on an already-filtered grid.
 */
export function useListingFilters() {
  const [filters, setFilters] = useState(INITIAL)

  const setFilter = useCallback((key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }, [])

  const reset = useCallback(() => setFilters(INITIAL), [])

  const isFiltered = Object.entries(filters).some(([key, value]) => key !== 'sort' && value !== ANY)

  const results = useMemo(() => {
    const matched = listings.filter((listing) => {
      if (filters.area !== ANY && listing.city !== filters.area) return false
      if (filters.type !== ANY && listing.type !== filters.type) return false
      if (filters.beds !== ANY && count(listing.beds) < Number(filters.beds)) return false
      if (filters.baths !== ANY && count(listing.baths) < Number(filters.baths)) return false
      if (filters.minPrice !== ANY && listing.price < Number(filters.minPrice)) return false
      if (filters.maxPrice !== ANY && listing.price > Number(filters.maxPrice)) return false
      return true
    })

    return matched.sort(SORTERS[filters.sort] ?? SORTERS.newest)
  }, [filters])

  return { filters, setFilter, reset, results, isFiltered }
}
