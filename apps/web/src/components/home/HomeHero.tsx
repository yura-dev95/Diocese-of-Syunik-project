import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, MapPin, Play, Volume2 } from 'lucide-react';
import { useRef } from 'react';
import { homeStats } from '../../constants/home';
import { useI18n } from '../../i18n/I18nContext';
import { Button } from '../common/Button';
import { Container } from '../common/Container';

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const { localize } = useI18n();

  return (
    <section ref={ref} className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-episcopal">
      <motion.div
        aria-label={localize('Սյունիքի լեռների և վանական համալիրի տեսանյութի տեղապահ')}
        className="absolute -inset-y-[12%] inset-x-0 -z-20 bg-[url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-center"
        role="img"
        style={{ y: backgroundY }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-episcopal via-episcopal/80 to-episcopal/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-episcopal via-transparent to-black/20" />
      <div className="absolute -right-32 top-24 size-[32rem] rounded-full border border-gold/20" />
      <div className="absolute -right-12 top-44 size-[22rem] rounded-full border border-gold/15" />

      <Container className="flex min-h-[calc(100svh-5rem)] items-end pb-24 pt-24 sm:items-center sm:py-24">
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gold sm:text-xs">
            <span className="h-px w-10 bg-gold" /> {localize('Հայ Առաքելական Սուրբ Եկեղեցի · Սյունյաց թեմ')}
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.08] text-parchment sm:text-6xl lg:text-8xl">
            {localize('Հավատք, որ պահպանում է')} <span className="text-gold">{localize('Սյունյաց աշխարհը')}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-parchment/75 sm:text-lg">
            {localize('Դարավոր ժառանգությունից դեպի կենդանի համայնք՝ ճանաչեք Սյունյաց թեմի սրբավայրերը, ծառայությունն ու հոգևոր կյանքը։')}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/heritage" variant="light">{localize('Բացահայտել ժառանգությունը')}</Button>
            <Button href="/spiritual-life" className="gap-2 border-parchment/30 text-parchment hover:bg-parchment/10" variant="secondary">
              <Play className="size-4 fill-current" /> {localize('Դիտել թեմի ուղերձը')}
            </Button>
          </div>
          <div className="mt-12 grid max-w-3xl grid-cols-3 gap-px overflow-hidden border border-parchment/15 bg-parchment/15 backdrop-blur-md">
            {homeStats.map((stat) => (
              <div className="bg-episcopal/55 px-3 py-4 sm:px-5 sm:py-5" key={stat.label}>
                <p className="font-display text-xl font-bold text-gold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-[9px] font-semibold uppercase leading-4 tracking-[0.1em] text-parchment/55 sm:text-[10px]">{localize(stat.label)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
      <div className="absolute right-6 top-6 hidden items-center gap-3 rounded-full border border-parchment/20 bg-episcopal/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-parchment/70 backdrop-blur-md md:flex">
        <MapPin className="size-3.5 text-gold" /> {localize('Սյունիք, Հայաստան')}
        <span className="h-3 w-px bg-parchment/20" />
        <Volume2 className="size-3.5" />
      </div>
      <a className="focus-ring absolute bottom-6 right-6 hidden rounded-full border border-parchment/30 p-4 text-parchment transition hover:bg-parchment/10 sm:block" href="#welcome" aria-label={localize('Անցնել հաջորդ բաժին')}>
        <ArrowDown className="size-4" />
      </a>
    </section>
  );
}
