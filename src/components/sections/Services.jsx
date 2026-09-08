import Container from '../ui/Container'
import { asset } from '../../lib/asset'
import SectionHeading from '../ui/SectionHeading'

/*
 * Photos are matched to cards by subject rather than by filename order — the
 * numbering does not follow the card order, and this pairing mirrors how the
 * original site used them.
 */
const SERVICES = [
  {
    title: 'Real estate done right',
    photo: 'service3.png',
    alt: 'Styled living room with a white table, books and a potted plant',
    body: 'Nervous about your property adventure? Don’t be. Whether you’re getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, our team ensures you get the best experience possible!',
  },
  {
    title: 'Commercial & residential',
    photo: 'service2.png',
    alt: 'Modern white house with a lawn and pool, overlooking a valley',
    body: 'Large or small, condo or mansion, we can find it and get at the price that’s right. Fixer-uppers? Luxury? We can help with all of it! We live, work, and play in this community. Happy to help you find where to put your hard-earned dollars.',
  },
  {
    title: 'Rely on expertise',
    photo: 'service.png',
    alt: 'Agent shaking hands with a smiling couple across a table',
    body: 'If you have questions about affordability, credit, and loan options, trust us to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way.',
  },
]

function Services() {
  return (
    <section id="services" className="relative z-10 bg-transparent py-14 md:py-24">
      <Container>
        <SectionHeading eyebrow="How we help" title="Our services" className="pb-10 md:pb-12" />

        <div className="grid gap-9 md:grid-cols-3 md:gap-8">
          {SERVICES.map((service) => (
            <div key={service.title} className="flex flex-col gap-4 md:gap-[22px]">
              <img
                src={asset(service.photo)}
                alt={service.alt}
                loading="lazy"
                className="h-[190px] w-full rounded-2xl border border-white/10 object-cover md:h-[230px]"
              />
              <h3 className="font-display text-[22px] font-semibold md:text-2xl">{service.title}</h3>
              <p className="text-muted">{service.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Services
