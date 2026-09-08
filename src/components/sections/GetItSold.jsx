import Container from '../ui/Container'
import { asset } from '../../lib/asset'
import SectionHeading from '../ui/SectionHeading'

const SUPPORTING = [
  {
    title: 'Don’t just list it…',
    photo: 'exterior.png',
    alt: 'Tile-roofed home lit up at dusk, with a pool and covered patio',
    body: 'Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips of every possible buyer, getting you top dollar for your home.',
  },
  {
    title: 'Guide to buyers',
    photo: 'keys.png',
    alt: 'House keys on a red house-shaped keyring, resting on weathered wood',
    body: 'Nobody knows the market like we do. Enjoy having a pro at your service. Market analysis, upgrades lists, contractors on speed dial, & more!',
  },
]

function GetItSold() {
  return (
    <section id="sell" className="relative z-10 bg-transparent py-14 md:py-24">
      <Container>
        <SectionHeading eyebrow="For sellers" title="Get it sold" className="pb-10 md:pb-12" />

        <div className="mb-5 grid overflow-hidden rounded-2xl border border-white/10 border-t-2 border-t-accent bg-white/5 backdrop-blur-md md:mb-8 md:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col items-start justify-center gap-5 p-7 md:p-14">
            <h3 className="font-display text-[23px] font-semibold md:text-[32px]">
              Top residential sales, last 5 years
            </h3>
            <p className="text-muted">
              We helped nearly 90 clients in 2021, and closed 28.5 million in sales! Our team works hard everyday to
              grow and learn, so that we may continue to excel in our market. Our clients deserve our best, &amp; we
              want to make sure our best is better every year.
            </p>
          </div>
          <img
            src={asset("interior.png")}
            alt="Open-plan kitchen with a marble island, opening onto the living area and garden"
            loading="lazy"
            className="h-[180px] w-full object-cover md:h-full md:min-h-[340px]"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-8">
          {SUPPORTING.map((item) => (
            <div key={item.title} className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <img
                src={asset(item.photo)}
                alt={item.alt}
                loading="lazy"
                className="h-[180px] w-full border-b border-white/10 object-cover md:h-[210px]"
              />
              <div className="flex flex-col gap-3.5 p-6 pb-7 md:p-9">
                <h3 className="font-display text-[23px] font-semibold md:text-[26px]">{item.title}</h3>
                <p className="text-muted">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default GetItSold
