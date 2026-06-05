import { ArrowRight, HeartHandshake, Users } from 'lucide-react';
import { currentSocialProgram } from '../../constants/home';
import { useI18n } from '../../i18n/I18nContext';
import { AnimatedCard } from '../common/AnimatedCard';
import { Button } from '../common/Button';
import { Container } from '../common/Container';

function formatDram(value: number, formatNumber: (value: number) => string) {
  return `${formatNumber(value)} ֏`;
}

export function SocialProgramSection() {
  const progress = Math.round((currentSocialProgram.raised / currentSocialProgram.goal) * 100);
  const { formatNumber, localize } = useI18n();

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <AnimatedCard className="relative isolate overflow-hidden bg-forest px-6 py-10 text-parchment shadow-sacred sm:px-10 sm:py-14 lg:px-14">
          <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest via-forest/95 to-forest/65" />
          <div className="absolute -right-24 -top-24 size-72 rounded-full border border-gold/20" />
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.23em] text-gold">
                <HeartHandshake className="size-4" /> {localize('Գործող սոցիալական ծրագիր')}
              </p>
              <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">{localize(currentSocialProgram.title)}</h2>
              <p className="mt-6 max-w-xl leading-8 text-parchment/70">{localize(currentSocialProgram.description)}</p>
              <div className="mt-8 flex items-center gap-3 text-sm text-parchment/70">
                <span className="grid size-10 place-items-center rounded-full border border-gold/30 text-gold"><Users className="size-4" /></span>
                {localize('Աջակցություն կստանա')} <strong className="text-parchment">{formatNumber(currentSocialProgram.families)} {localize('ընտանիք')}</strong>
              </div>
            </div>
            <div className="border border-parchment/15 bg-episcopal/25 p-5 backdrop-blur-md sm:p-7">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{localize('Հավաքված է')}</p>
                  <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">{formatDram(currentSocialProgram.raised, formatNumber)}</p>
                </div>
                <p className="font-display text-3xl text-gold">{progress}%</p>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-parchment/15">
                <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-3 text-xs text-parchment/55">{localize('Նպատակ՝')} {formatDram(currentSocialProgram.goal, formatNumber)}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/social-impact" className="flex-1" variant="light">{localize('Աջակցել հիմա')}</Button>
                <Button href="/social-impact" className="flex-1 gap-2 border-parchment/30 text-parchment hover:bg-parchment/10" variant="secondary">
                  {localize('Ծրագրի մասին')} <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </Container>
    </section>
  );
}
