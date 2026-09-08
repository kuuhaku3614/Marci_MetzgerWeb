import Button from '../ui/Button'
import Container from '../ui/Container'
import { asset } from '../../lib/asset'
import { CheckIcon } from '../ui/Icons'
import { Eyebrow } from '../ui/SectionHeading'

const CREDENTIALS = [
  'The Ridge Realty Group, Pahrump',
  'Licensed REALTOR® · MLS member',
  'Equal Housing Opportunity',
]

function MeetMarci() {
  return (
    <section id="about" className="relative z-10 bg-transparent py-14 md:py-24">
      <Container className="grid items-center gap-10 md:grid-cols-[0.85fr_1fr] md:gap-[76px]">
        <img
          src={asset("marci.png")}
          alt="Marci Metzger"
          loading="lazy"
          className="h-[300px] w-full rounded-2xl border border-white/10 object-cover md:h-[520px]"
        />

        <div className="flex flex-col items-start gap-5 md:gap-6">
          <Eyebrow>Realtor for nearly 3 decades</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.625rem)] tracking-[-0.012em]">Meet Marci Metzger</h2>
          <p className="max-w-[52ch] text-muted">
            Marci was a REALTOR, then licensed Broker, in Washington State. Now, she is enjoying the sunshine, and helping clients in Southern Nevada. Having helped buyers and sellers in many markets since 1995, she is a wealth of knowledge.
          </p>
          <p className="max-w-[52ch] text-muted">
            Our clients deserve our best &mdash; and we want to make sure our best is better every year.
          </p>

          <ul className="flex w-full flex-col gap-3 border-y border-white/10 py-6">
            {CREDENTIALS.map((credential) => (
              <li key={credential} className="flex items-center gap-3 text-sm font-medium">
                <span className="text-accent">
                  <CheckIcon />
                </span>
                {credential}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3.5 sm:flex-row">
            {/* <Button as="a" href="#contact">
              Talk to Marci
            </Button> */}
            <Button as="a" href="#contact" variant="ghost">
              Talk to Marci
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default MeetMarci
