import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { homePillars } from '../../constants/home';
import { useI18n } from '../../i18n/I18nContext';
import { AnimatedCard } from '../common/AnimatedCard';
import { Container } from '../common/Container';
import { SectionTitle } from '../common/SectionTitle';

export function MissionSection() {
  const { localize } = useI18n();

  return (
    <section className="bg-parchment bg-parchment py-24 sm:py-32" id="welcome">
      <Container>
        <SectionTitle
          eyebrow="Մեր առաքելությունը"
          title="Դարավոր եկեղեցի՝ այսօրվա մարդու կողքին"
          description="Սյունյաց թեմը հոգևոր տուն է, պատմական հիշողության պահապան և գործուն ծառայության կենտրոն։"
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {homePillars.map((pillar, index) => (
            <AnimatedCard className="group border border-gold/25 bg-parchment/80 p-7 shadow-sm transition duration-500 hover:-translate-y-1 hover:bg-white/75 hover:shadow-sacred sm:p-9" key={pillar.title}>
              <div className="flex items-start justify-between gap-5">
                <span className="grid size-14 place-items-center rounded-full bg-episcopal text-gold">
                  <pillar.icon className="size-6" strokeWidth={1.5} />
                </span>
                <span className="font-display text-sm text-gold/70">0{index + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-bold text-episcopal">{localize(pillar.title)}</h3>
              <p className="mt-4 leading-7 text-ink/60">{localize(pillar.text)}</p>
              <Link className="focus-ring mt-7 inline-flex items-center gap-2 rounded-md text-sm font-bold text-royal opacity-70 transition group-hover:gap-3 group-hover:opacity-100" to={pillar.href}>
                {localize('Իմանալ ավելին')} <ArrowRight className="size-4" />
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
