import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { Container } from '../common/Container';

export function HeritageHero() {
  return (
    <section className="relative isolate min-h-[72svh] overflow-hidden bg-episcopal">
      <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1571687949921-1306bfb24b72?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-center opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-episcopal via-episcopal/80 to-royal/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-episcopal via-transparent to-black/10" />
      <Container className="flex min-h-[72svh] items-end pb-16 pt-28 sm:pb-20">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">
            <MapPin className="size-4" /> Սյունյաց սրբավայրերը
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-parchment sm:text-7xl lg:text-8xl">
            Ժառանգություն, որ շարունակում է խոսել
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-parchment/75 sm:text-lg">
            Բացահայտեք Սյունյաց աշխարհի վանքերը, եկեղեցիներն ու դարերի աղոթքը պահպանող սրբավայրերը։
          </p>
        </motion.div>
      </Container>
      <a className="focus-ring absolute bottom-7 right-7 rounded-full border border-parchment/25 p-4 text-parchment" href="#sanctuaries" aria-label="Տեսնել սրբավայրերը">
        <ChevronDown className="size-4" />
      </a>
    </section>
  );
}
