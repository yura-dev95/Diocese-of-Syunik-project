import { ArrowRight, BookOpenText, CalendarDays, Cross } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import { AnimatedCard } from '../common/AnimatedCard';
import { Container } from '../common/Container';

export function DailyGospelSection() {
  const today = new Date();
  const { formatDate, localize } = useI18n();
  const weekday = formatDate(today, { weekday: 'long' });
  const date = formatDate(today, { day: 'numeric', month: 'long' });

  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <AnimatedCard className="relative overflow-hidden border border-gold/25 bg-parchment/85 shadow-sacred">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="relative min-h-72 overflow-hidden bg-royal p-8 text-parchment sm:p-10 lg:min-h-full">
              <div className="absolute -bottom-20 -right-20 size-64 rounded-full border border-gold/20" />
              <div className="absolute -bottom-8 -right-8 size-40 rounded-full border border-gold/20" />
              <CalendarDays className="size-7 text-gold" strokeWidth={1.4} />
              <p className="mt-10 text-xs font-bold uppercase tracking-[0.23em] text-gold">{localize('Օրվա Ավետարան')}</p>
              <p className="mt-4 font-display text-4xl font-bold capitalize">{weekday}</p>
              <p className="mt-2 text-sm text-parchment/60">{date}</p>
              <div className="mt-10 flex items-center gap-3 border-t border-parchment/15 pt-6 text-xs text-parchment/60">
                <Cross className="size-4 text-gold" /> {localize('Ընթերցվածք՝ Հովհաննես 8։12–20')}
              </div>
            </div>
            <div className="p-8 sm:p-10 lg:p-14">
              <BookOpenText className="size-9 text-gold" strokeWidth={1.3} />
              <blockquote className="mt-7 max-w-3xl font-display text-3xl leading-relaxed text-episcopal sm:text-4xl">
                {localize('«Ես եմ աշխարհի լույսը. ով իմ հետևից է գալիս, խավարի մեջ չի քայլի, այլ կընդունի կյանքի լույսը»։')}
              </blockquote>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-royal">{localize('Հովհաննես 8։12')}</p>
              <p className="mt-7 max-w-2xl leading-8 text-ink/60">
                {localize('Օրվա ընթերցվածքը մեզ հրավիրում է վստահությամբ քայլել Քրիստոսի լույսի մեջ և այդ լույսը փոխանցել մեր կողքին գտնվող մարդուն։')}
              </p>
              <Link className="focus-ring mt-8 inline-flex items-center gap-2 rounded-md text-sm font-bold text-royal hover:text-episcopal" to="/spiritual-life">
                {localize('Կարդալ ամբողջ ընթերցվածքը')} <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </AnimatedCard>
      </Container>
    </section>
  );
}
