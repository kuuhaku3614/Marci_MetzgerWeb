import { useCallback, useEffect, useState } from 'react'
import Contact from './components/sections/Contact'
import Credentials from './components/sections/Credentials'
import FeaturedListings from './components/sections/FeaturedListings'
import Footer from './components/sections/Footer'
import Gallery from './components/sections/Gallery'
import GetItSold from './components/sections/GetItSold'
import Header from './components/sections/Header'
import Hero from './components/sections/Hero'
import LetsMove from './components/sections/LetsMove'
import MeetMarci from './components/sections/MeetMarci'
import PageBackground from './components/ui/PageBackground'
import ProofBar from './components/sections/ProofBar'
import Services from './components/sections/Services'
import StickyCallBar from './components/sections/StickyCallBar'
// import Testimonials from './components/sections/Testimonials'
import { useListingFilters } from './hooks/useListingFilters'
import { listings } from './data/listings'

/*
 * A shared link carries the listing as ?listing=<id> - a query param rather
 * than a fragment, so it cannot collide with the #contact handler below and
 * trigger two competing scrolls. Read during the initial render so the
 * contact form has it on its very first effect, with no extra pass.
 */
function enquiryFromUrl() {
  const id = new URLSearchParams(window.location.search).get('listing')
  const listing = id ? listings.find((item) => item.id === id) : null
  return listing ? { listing, nonce: 0, fromLink: true } : null
}

function App() {
  const { filters, setFilter, reset, results, isFiltered } = useListingFilters()

  // Which listing the visitor asked about. `nonce` makes a repeat click on the
  // same card a fresh request rather than an identical, ignored value.
  const [enquiry, setEnquiry] = useState(enquiryFromUrl)

  const requestEnquiry = useCallback((listing) => {
    setEnquiry({ listing, nonce: Date.now(), fromLink: false })
  }, [])

  /*
   * The browser resolves a URL fragment before React has rendered the
   * sections, so opening /#contact directly would otherwise land at the top
   * of the page. Re-apply it once, after the sections exist.
   */
  useEffect(() => {
    const { hash } = window.location
    // A ?listing= link does its own offset-aware scroll; don't fight it.
    if (!hash || hash === '#top' || enquiryFromUrl()) return
    try {
      document.querySelector(hash)?.scrollIntoView({ block: 'start' })
    } catch {
      /* not a valid CSS selector — nothing to scroll to */
    }
  }, [])

  return (
    /*
     * Owns the one shared background. `overflow-x-clip` rather than
     * `overflow-x-hidden`: hidden would turn this into a scroll container and
     * break the sticky header, clip contains the overflow without doing that.
     */
    <div className="relative isolate overflow-x-clip bg-[#0A1628] pb-[60px] md:pb-0">
      <PageBackground />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ground"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="relative z-10">
        <Hero filters={filters} setFilter={setFilter} />
        <ProofBar />

        <MeetMarci />
        <GetItSold />
        <LetsMove />
        <Services />
        {/* <Testimonials /> */}
        <Gallery />
        <Credentials />
        <FeaturedListings
          filters={filters}
          setFilter={setFilter}
          reset={reset}
          results={results}
          isFiltered={isFiltered}
          onEnquire={requestEnquiry}
        />
        <Contact enquiry={enquiry} />
      </main>

      <Footer />
      {/* The call bar is fixed, so the wrapper's bottom padding — not main's —
          is what keeps it from covering the end of the footer. */}
      <StickyCallBar />
    </div>
  )
}

export default App
