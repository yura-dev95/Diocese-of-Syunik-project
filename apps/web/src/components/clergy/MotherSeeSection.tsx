import { ArrowUpRight, Landmark } from 'lucide-react';
import { AnimatedCard } from '../common/AnimatedCard';
import { Container } from '../common/Container';
import { SectionTitle } from '../common/SectionTitle';

const links = [
  ['Մայր Աթոռ Սուրբ Էջմիածին', 'https://www.armenianchurch.org/'],
  ['Ն.Ս.Օ.Տ.Տ. Գարեգին Բ Ամենայն Հայոց Կաթողիկոս', 'https://www.armenianchurch.org/'],
  ['Հայ Եկեղեցու տեղեկատվական համակարգ', 'https://www.armenianchurch.org/'],
  ['Շողակաթ հեռուստաընկերություն', 'https://shoghakat.am/'],
  ['Քրիստոնեական դաստիարակության կենտրոն', 'https://qdk.am/'],
];

export function MotherSeeSection() {
  return (
    <section className="py-24 sm:py-32"><Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
      <div><Landmark className="size-10 text-gold" strokeWidth={1.3} /><SectionTitle eyebrow="Մեր հոգևոր կենտրոնը" title="Միություն Մայր Աթոռ Սուրբ Էջմիածնի հետ" description="Սյունյաց թեմը Հայ Առաքելական Սուրբ Եկեղեցու անբաժան մասն է՝ առաջնորդվելով Ամենայն Հայոց Կաթողիկոսի հայրապետական օրհնությամբ և Մայր Աթոռի կանոնական կարգով։" /></div>
      <div className="grid gap-3">{links.map(([label, href]) => <AnimatedCard className="group border border-gold/25 bg-white/45" key={label}><a className="focus-ring flex items-center justify-between gap-5 p-5 text-sm font-bold text-episcopal transition hover:bg-white/65" href={href} rel="noreferrer" target="_blank"><span>{label}</span><ArrowUpRight className="size-4 shrink-0 text-royal transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a></AnimatedCard>)}</div>
    </Container></section>
  );
}
