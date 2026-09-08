import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { StarIcon } from '../ui/Icons'

/**
 * Placeholders on purpose — no client quotes were invented. Replace each
 * bracketed string with a real review from Yelp or Zillow, and set RATING
 * to the genuine aggregate.
 */
const RATING = '[RATING]'

const TESTIMONIALS = [
  {
    id: 'quote-1',
    quote: '[CLIENT TESTIMONIAL — two or three sentences. Pull the strongest review you have from Yelp or Zillow.]',
    attribution: '[Client name] · [Sold in 2024]',
  },
  {
    id: 'quote-2',
    quote: '[CLIENT TESTIMONIAL — ideally from a buyer who relocated to Pahrump, to speak to the section above.]',
    attribution: '[Client name] · [Bought in 2024]',
  },
  {
    id: 'quote-3',
    quote: '[CLIENT TESTIMONIAL — one that mentions speed of sale or price achieved works well here.]',
    attribution: '[Client name] · [Sold in 2023]',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 text-accent" role="img" aria-label={`Rated ${RATING} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} size={18} />
      ))}
    </div>
  )
}

function Testimonials() {
  return (
    <section id="reviews" className="relative z-10 bg-transparent py-14 md:py-24">
      <Container>
        <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-12">
          <SectionHeading eyebrow="What clients say" title="Reviews from the valley" />
          <div className="flex items-center gap-3">
            <Stars />
            <span className="text-sm font-medium text-muted">{RATING} on Yelp &amp; Zillow</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <blockquote
              key={testimonial.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 border-t-2 border-t-accent bg-white/5 p-6 backdrop-blur-md md:gap-5 md:p-9"
            >
              <p className="font-display text-lg leading-[1.5] md:text-xl">{testimonial.quote}</p>
              <footer className="text-sm font-semibold">{testimonial.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Testimonials
