import Container from '../ui/Container'
import { asset } from '../../lib/asset'
import SectionHeading from '../ui/SectionHeading'

// All six supplied photos, each used once.
const PHOTOS = [
  { file: 'gallery_photo1.webp', alt: 'Aerial view of the golf course, lake and clubhouse at the centre of the community' },
  { file: 'gallery_photo2.webp', alt: 'Living room with floor-to-ceiling windows looking out over the desert' },
  { file: 'gallery_photo3.webp', alt: 'Single-storey homes with a pool, backing onto open desert and mountains' },
  { file: 'gallery_photo4.webp', alt: 'Tile-roofed home with a walled pool yard, seen from above' },
  { file: 'gallery_photo5.webp', alt: 'Community clubhouse and sports courts beside the fairways' },
  { file: 'gallery_photo6.webp', alt: 'Clubhouse, tennis and pickleball courts beside the golf course' },
]

function Gallery() {
  return (
    <section id="gallery" className="relative z-10 bg-transparent py-14 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Photo gallery"
          title="Recent sales & the valley"
          tone="dark"
          className="pb-10 md:pb-11"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {PHOTOS.map((photo) => (
            <div
              key={photo.file}
              className="aspect-3/2 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img
                src={asset(photo.file)}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Gallery
