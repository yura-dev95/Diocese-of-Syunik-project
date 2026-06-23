import { motion } from 'framer-motion';
import type { ComponentType, PropsWithChildren } from 'react';
import { Container } from './Container';

interface PageHeroProps extends PropsWithChildren {
  eyebrow: string;
  title: string;
  description?: string;
  imageUrl?: string;
  icon?: ComponentType<{ className?: string }>;
}

export function PageHero({ eyebrow, title, description, imageUrl, icon: Icon, children }: PageHeroProps) {
  return (
    <section className="bg-parchment pb-10 pt-2">
      <Container>
        <div className="relative isolate min-h-[430px] overflow-hidden border border-gold/20 bg-episcopal shadow-sacred sm:min-h-[500px]">
          {imageUrl && (
            <div
              aria-hidden="true"
              className="absolute -inset-y-[8%] inset-x-0 -z-20 bg-cover bg-center"
              style={{ backgroundImage: `url("${imageUrl}")` }}
            />
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-episcopal/95 via-episcopal/76 to-episcopal/12" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-episcopal/45 via-transparent to-parchment/10" />
          <div className="absolute left-0 top-24 hidden h-[calc(100%-6rem)] w-6 bg-gold sm:block" />

          <Container className="flex min-h-[430px] items-end px-8 pb-14 pt-24 sm:min-h-[500px] sm:px-14 sm:pb-16">
            <motion.div
              className="max-w-4xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
                {Icon && <Icon className="size-4" />} {eyebrow}
              </p>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-parchment sm:text-6xl lg:text-7xl">
                {title}
              </h1>
              {description && <p className="mt-6 max-w-2xl text-base leading-8 text-parchment/78 sm:text-lg">{description}</p>}
              {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
            </motion.div>
          </Container>
        </div>
      </Container>
    </section>
  );
}
