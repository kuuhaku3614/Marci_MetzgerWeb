import Button from '../ui/Button'
import Container from '../ui/Container'
import { Eyebrow } from '../ui/SectionHeading'
import { asset } from '../../lib/asset'

function LetsMove() {
  return (
    <section id="lets-move" className="relative z-10 bg-transparent py-14 md:py-24">
      <Container className="grid items-center gap-8 md:grid-cols-[1fr_0.9fr] md:gap-[76px]">
        <div className="flex flex-col items-start gap-5 md:gap-6">
          <Eyebrow tone="gold">Let&rsquo;s move</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.625rem)] tracking-[-0.012em] text-ink">
            Moving out to the valley?
          </h2>
          <p className="max-w-[48ch] text-[19px] leading-[1.6] text-on-navy">
            An hour from Las Vegas, with room to breathe. We live, work, and play in this community &mdash; happy to
            help you find where to put your hard-earned dollars.
          </p>
          <Button as="a" href="#contact" variant="gold" className="mt-1.5">
            Talk to Marci about relocating
          </Button>
        </div>

        <img
          src={asset('gallery_photo3.webp')}
          alt="Single-storey homes with a pool, backing onto open desert and mountains outside Pahrump"
          loading="lazy"
          className="h-[200px] w-full rounded-2xl object-cover md:h-[400px]"
        />
      </Container>
    </section>
  )
}

export default LetsMove
