import { motion } from 'framer-motion';
import { Cross } from 'lucide-react';
import { Container } from '../common/Container';

export function DioceseHero() {
  return (
    <section className="relative isolate min-h-[65svh] overflow-hidden bg-episcopal">
      <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-episcopal via-episcopal/90 to-royal/30" />
      <Container className="flex min-h-[65svh] items-end pb-16 pt-24">
        <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-gold"><Cross className="size-4" /> Հոգևոր առաջնորդություն</p>
          <h1 className="mt-6 font-display text-5xl font-bold text-parchment sm:text-7xl">Սյունյաց թեմ և հոգևորականներ</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment/70">Մայր Աթոռ Սուրբ Էջմիածնի օրհնությամբ՝ հավատքի, ծառայության և համայնքային կյանքի կենդանի կենտրոն Սյունյաց աշխարհում։</p>
        </motion.div>
      </Container>
    </section>
  );
}
