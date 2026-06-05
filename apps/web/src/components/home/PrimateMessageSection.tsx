import { ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import { AnimatedCard } from '../common/AnimatedCard';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { SectionTitle } from '../common/SectionTitle';

export function PrimateMessageSection() {
  const { localize } = useI18n();

  return (
    <section className="relative overflow-hidden bg-episcopal py-24 sm:py-32">
      <div className="absolute -right-48 -top-48 size-[38rem] rounded-full border border-gold/10" />
      <div className="absolute -right-24 -top-24 size-[26rem] rounded-full border border-gold/10" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] xl:gap-20">
        <AnimatedCard className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-t-[12rem] border border-gold/30 bg-royal shadow-2xl">
          <img
            alt={localize('Սյունյաց թեմի առաջնորդի լուսանկարի տեղապահ')}
            className="size-full object-cover opacity-75"
            loading="lazy"
            src="https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1200&q=85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-episcopal via-episcopal/5 to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 border-l border-gold pl-5 text-parchment">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{localize('Թեմակալ առաջնորդ')}</p>
            <p className="mt-2 font-display text-xl">{localize('Սյունյաց թեմ')}</p>
          </div>
        </AnimatedCard>
        <div>
          <Quote className="mb-7 size-11 text-gold" strokeWidth={1.1} />
          <SectionTitle
            eyebrow="Առաջնորդի ուղերձը"
            title="Մեր եկեղեցու դռները բաց են յուրաքանչյուրի առաջ"
            description="Սյունյաց թեմի առաքելությունն է պահպանել մեր հայրերի հավատքը և այն դարձնել կենդանի ուժ՝ ընտանիքների, երիտասարդների ու համայնքների կյանքում։"
            light
          />
          <blockquote className="mt-8 border-l border-gold/60 pl-6 font-display text-xl italic leading-9 text-parchment/85 sm:text-2xl">
            {localize('«Թող Սյունյաց աշխարհի լույսը խաղաղություն բերի յուրաքանչյուր տուն, իսկ մեր միասնական ծառայությունը՝ հույս յուրաքանչյուր մարդու»։')}
          </blockquote>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Button href="/diocese" variant="light">{localize('Կարդալ ամբողջ ուղերձը')}</Button>
            <Link className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-bold text-gold hover:text-parchment" to="/diocese">
              {localize('Ծանոթանալ թեմակալ առաջնորդին')} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
