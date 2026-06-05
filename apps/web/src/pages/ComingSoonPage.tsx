import { motion } from 'framer-motion';
import { Button } from '../components/common/Button';
import { Container } from '../components/common/Container';

interface ComingSoonPageProps {
  eyebrow: string;
  title: string;
}

export function ComingSoonPage({ eyebrow, title }: ComingSoonPageProps) {
  return (
    <section className="relative grid min-h-[70svh] place-items-center overflow-hidden bg-episcopal py-24 text-center">
      <div className="absolute inset-0 bg-parchment opacity-[0.03]" />
      <div className="absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20" />
      <Container className="relative">
        <motion.p className="text-xs font-bold uppercase tracking-[0.25em] text-gold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{eyebrow}</motion.p>
        <motion.h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold text-parchment sm:text-7xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>{title}</motion.h1>
        <p className="mx-auto mt-6 max-w-xl leading-8 text-parchment/65">Այս բաժնի բովանդակությունն ու գործառույթները կմշակվեն հաջորդ փուլերում՝ հաստատված ճարտարապետության հիման վրա։</p>
        <Button href="/" className="mt-9" variant="light">Վերադառնալ գլխավոր էջ</Button>
      </Container>
    </section>
  );
}
