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

function App() {
  const { filters, setFilter, reset, results, isFiltered } = useListingFilters()

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
        />
        <Contact />
      </main>

      <Footer />
      {/* The call bar is fixed, so the wrapper's bottom padding — not main's —
          is what keeps it from covering the end of the footer. */}
      <StickyCallBar />
    </div>
  )
}

export default App
