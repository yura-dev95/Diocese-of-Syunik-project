import { AnimatedCard } from '../common/AnimatedCard';
import { Container } from '../common/Container';
import { SectionTitle } from '../common/SectionTitle';

const eras = [
  { period: 'IV–VIII դդ.', title: 'Հավատի արմատավորումը', text: 'Սյունյաց աշխարհում հիմնվում են առաջին եկեղեցիներն ու վանական համայնքները։' },
  { period: 'IX–XIV դդ.', title: 'Հոգևոր և կրթական վերելք', text: 'Տաթևը դառնում է համահայկական կրթության, գիտության և ձեռագրարվեստի կենտրոն։' },
  { period: 'XV–XIX դդ.', title: 'Պահպանություն դժվար ժամանակներում', text: 'Համայնքները շարունակում են պահպանել սրբավայրերը, ծեսն ու պատմական հիշողությունը։' },
  { period: 'Այսօր', title: 'Կենդանի ժառանգություն', text: 'Թեմը վերականգնում է սրբավայրերը և նոր կյանք հաղորդում համայնքներին։' },
];

export function HistoryTimeline() {
  return (
    <section className="bg-episcopal py-24 sm:py-32">
      <Container>
        <SectionTitle eyebrow="Պատմական ակնարկ" title="Տասնյոթ դար՝ հավատքի ճանապարհով" light />
        <div className="mt-14 grid gap-px overflow-hidden border border-parchment/10 bg-parchment/10 md:grid-cols-2 xl:grid-cols-4">
          {eras.map((era, index) => (
            <AnimatedCard className="relative bg-episcopal p-7 sm:p-9" key={era.period}>
              <span className="font-display text-5xl text-gold/20">0{index + 1}</span>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-gold">{era.period}</p>
              <h3 className="mt-4 font-display text-2xl font-bold text-parchment">{era.title}</h3>
              <p className="mt-4 text-sm leading-7 text-parchment/60">{era.text}</p>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
