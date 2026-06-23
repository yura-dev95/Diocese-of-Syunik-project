import { motion, useScroll, useTransform } from 'framer-motion';
import { Church, FileText, Sparkles, UserRound } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImageUrl from '../../assets/tatev.jpg';
import { useI18n } from '../../i18n/I18nContext';
import { Container } from '../common/Container';

const quickLinks = [
  {
    href: '/heritage',
    icon: Church,
    title: 'Եկեղեցիներ',
    description: 'Բոլոր սրբավայրերը',
  },
  {
    href: '/news-contact',
    icon: FileText,
    title: 'Նորություններ',
    description: 'Թեմի լուրեր',
  },
  {
    href: '/spiritual-life',
    icon: Sparkles,
    title: 'Միջոցառումներ',
    description: 'Օրացույց',
  },
  {
    href: '/diocese',
    icon: UserRound,
    title: 'Հոգևորականներ',
    description: 'Ցանկ',
  },
];

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const { localize } = useI18n();

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-parchment pb-24 pt-2 sm:pb-28 lg:pb-32">
      <Container>
        <div className="relative">
          <motion.div
            className="relative min-h-[560px] overflow-hidden border border-gold/20 bg-episcopal shadow-sacred sm:min-h-[620px] lg:min-h-[590px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              aria-label={localize('Սյունիքի լեռների և վանական համալիրի տեսարան')}
              className="absolute -inset-y-[8%] inset-x-0"
              role="img"
              style={{ y: backgroundY }}
            >
              <img
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover object-top blur-md"
                decoding="async"
                src={heroImageUrl}
              />
              <img
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-top"
                decoding="async"
                src={heroImageUrl}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-episcopal/95 via-episcopal/70 to-episcopal/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-episcopal/45 via-transparent to-parchment/10" />
            <div className="absolute left-0 top-28 hidden h-[calc(100%-7rem)] w-8 bg-gold sm:block" />

            <div className="relative z-10 flex min-h-[560px] flex-col justify-center px-8 py-20 sm:min-h-[620px] sm:px-16 lg:min-h-[590px] lg:px-20">
              <motion.div
                className="max-w-3xl pt-10 sm:pt-16 lg:pt-12"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="font-display text-5xl font-bold leading-[1.05] text-parchment sm:text-6xl lg:text-7xl">
                  {localize('Սյունյաց թեմ')}
                </h1>
                <p className="mt-5 font-display text-2xl font-semibold uppercase leading-tight text-parchment sm:text-3xl">
                  {localize('Հայ Առաքելական Սուրբ Եկեղեցի')}
                </p>
                <p className="mt-8 max-w-xl text-lg font-semibold leading-8 text-parchment/90 sm:text-xl">
                  {localize('Մեր համայնքով, մեր սրբավայրերով, մեր հավատքով Քրիստոսում ենք մեկ։')}
                </p>
                <Link
                  className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-8 text-base font-bold text-white shadow-lg shadow-episcopal/25 transition hover:bg-[#caa764]"
                  to="/diocese"
                >
                  {localize('Կարդալ ավելին')}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <div className="relative z-20 mx-auto -mt-14 grid max-w-6xl overflow-hidden rounded-md border border-gold/20 bg-parchment/95 shadow-xl shadow-episcopal/10 backdrop-blur md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  className="focus-ring group flex min-h-28 items-center gap-5 border-b border-gold/20 px-7 py-5 transition hover:bg-white/75 md:[&:nth-child(2n)]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0"
                  key={item.href}
                  to={item.href}
                >
                  <Icon className="size-10 shrink-0 text-gold transition group-hover:text-royal" strokeWidth={1.7} />
                  <span>
                    <span className="block text-xl font-bold leading-tight text-episcopal">{localize(item.title)}</span>
                    <span className="mt-1 block text-sm font-semibold text-ink/75">{localize(item.description)}</span>
                  </span>
                  <span className="sr-only">{index + 1}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
