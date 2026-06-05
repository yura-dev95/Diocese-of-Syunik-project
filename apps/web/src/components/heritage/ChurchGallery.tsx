import { motion } from 'framer-motion';
import type { ChurchGalleryImage } from '../../types/church';
import { Container } from '../common/Container';
import { SectionTitle } from '../common/SectionTitle';

export function ChurchGallery({ images }: { images: ChurchGalleryImage[] }) {
  if (images.length === 0) return null;

  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <SectionTitle eyebrow="Պատկերասրահ" title="Սրբավայրի մանրամասները" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <motion.figure
              className={`group relative overflow-hidden bg-episcopal ${index === 0 ? 'md:col-span-2 lg:row-span-2' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              key={image.id}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <img alt={image.alt} className={`w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100 ${index === 0 ? 'h-full min-h-80' : 'aspect-[4/3]'}`} loading="lazy" src={image.url} />
              {image.caption && <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-episcopal p-5 pt-14 text-xs text-parchment/75">{image.caption}</figcaption>}
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
