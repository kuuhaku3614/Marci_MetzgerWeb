import Container from '../ui/Container'
import Stat from '../ui/Stat'

const STATS = [
  { value: '30', label: 'Years selling Pahrump' },
  { value: '90', label: 'Clients helped in 2021' },
  { value: '$28.5M', label: 'Closed in 2021' },
  { value: '#1', label: 'Top residential sales, last 5 yrs' },
]

function ProofBar() {
  return (
    <section className="relative z-10 mt-14 bg-transparent py-10 md:mt-[88px] md:py-[54px]">
      <Container className="grid grid-cols-2 gap-7 md:grid-cols-4 md:gap-10">
        {STATS.map((stat) => (
          <Stat key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </Container>
    </section>
  )
}

export default ProofBar
