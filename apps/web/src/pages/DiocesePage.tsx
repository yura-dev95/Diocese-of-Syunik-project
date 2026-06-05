import { HeartHandshake, UsersRound, Waypoints } from 'lucide-react';
import { AnimatedCard } from '../components/common/AnimatedCard';
import { Container } from '../components/common/Container';
import { SectionTitle } from '../components/common/SectionTitle';
import { DioceseHero } from '../components/clergy/DioceseHero';
import { DioceseNavigation } from '../components/clergy/DioceseNavigation';
import { MotherSeeSection } from '../components/clergy/MotherSeeSection';

const organizations = [
  { icon: UsersRound, title: 'Երիտասարդաց միություն', text: 'Հոգևոր կրթություն, կամավորություն և համայնքային նախաձեռնություններ երիտասարդների համար։' },
  { icon: HeartHandshake, title: 'Կանանց միություն', text: 'Ընտանիքների աջակցություն, բարեգործություն և եկեղեցական համայնքի զորացում։' },
  { icon: Waypoints, title: 'Սոցիալական կենտրոններ', text: 'Մարդասիրական և խորհրդատվական ծառայություններ Սյունիքի համայնքներում։' },
];

export function DiocesePage() {
  return <><DioceseHero /><DioceseNavigation /><MotherSeeSection /><section className="bg-episcopal py-24 sm:py-32"><Container><SectionTitle eyebrow="Թեմական կազմակերպություններ" title="Համայնք, որ ծառայում է միասին" light /><div className="mt-12 grid gap-5 lg:grid-cols-3">{organizations.map((item) => <AnimatedCard className="border border-parchment/10 bg-parchment/5 p-7" key={item.title}><item.icon className="size-7 text-gold" strokeWidth={1.4} /><h3 className="mt-7 font-display text-2xl font-bold text-parchment">{item.title}</h3><p className="mt-4 text-sm leading-7 text-parchment/60">{item.text}</p></AnimatedCard>)}</div></Container></section></>;
}
