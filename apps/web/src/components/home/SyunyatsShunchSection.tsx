import { motion } from 'framer-motion';
import { Headphones, Pause, Play, Radio, Share2, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { latestPodcast } from '../../constants/home';
import { useI18n } from '../../i18n/I18nContext';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { SectionTitle } from '../common/SectionTitle';

export function SyunyatsShunchSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { localize } = useI18n();

  return (
    <section className="relative overflow-hidden bg-[rgb(245_236_215/var(--tw-bg-opacity,1))] py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <SectionTitle
              eyebrow="Փոդքասթ և ուղիղ եթեր"
              title="Սյունյաց շունչ"
              description="Զրույցներ հավատքի, Սյունյաց ժառանգության և մեր համայնքի կենդանի պատմությունների մասին։"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/spiritual-life" variant="secondary">{localize('Բոլոր թողարկումները')}</Button>
              <Button href="/spiritual-life" className="gap-2" variant="secondary">
                <Radio className="size-4 text-gold" /> {localize('Ուղիղ եթեր')}
              </Button>
            </div>
          </div>

          <motion.article
            className="border border-gold/25 bg-parchment/80 p-5 shadow-2xl shadow-episcopal/10 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="flex flex-col gap-7 sm:flex-row">
              <div className="relative grid aspect-square w-full shrink-0 place-items-center overflow-hidden bg-royal sm:w-48">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(189,151,84,.28),transparent_55%)]" />
                <div className="absolute size-36 rounded-full border border-gold/25" />
                <div className="absolute size-24 rounded-full border border-gold/35" />
                <Headphones className="relative size-10 text-gold" strokeWidth={1.3} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{localize(latestPodcast.episode)} · {localize(latestPodcast.publishedAt)}</p>
                  <button aria-label={localize('Կիսվել թողարկմամբ')} className="focus-ring rounded-full border border-gold/40 p-2.5 text-gold transition hover:bg-gold hover:text-white" type="button">
                    <Share2 className="size-4" />
                  </button>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-[#561731] sm:text-3xl">{localize(latestPodcast.title)}</h3>
                <p className="mt-4 text-sm leading-7 text-[#561731]/65">{localize(latestPodcast.description)}</p>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-4 border-t border-gold/25 pt-6">
              <button
                aria-label={isPlaying ? localize('Դադարեցնել') : localize('Լսել թողարկումը')}
                className="focus-ring grid size-12 shrink-0 place-items-center rounded-full bg-gold text-episcopal transition hover:bg-parchment"
                type="button"
                onClick={() => setIsPlaying((current) => !current)}
              >
                {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
              </button>
              <div className="flex-1">
                <div className="h-1 overflow-hidden rounded-full bg-[#561731]/15">
                  <motion.div className="h-full bg-gold" animate={{ width: isPlaying ? '42%' : '12%' }} transition={{ duration: 1.2 }} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-semibold text-[#561731]/50">
                  <span>{isPlaying ? '12։04' : '03։26'}</span><span>{latestPodcast.duration}</span>
                </div>
              </div>
              <Volume2 className="hidden size-4 text-[#561731]/50 sm:block" />
            </div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
}
