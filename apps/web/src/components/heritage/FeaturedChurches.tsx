import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useChurches } from '../../hooks/useChurches';
import { LoadingState } from '../common/LoadingState';
import { Container } from '../common/Container';
import { SectionTitle } from '../common/SectionTitle';
import { ChurchCard } from './ChurchCard';

export function FeaturedChurches() {
  const { churches, isLoading } = useChurches({});
  const featured = churches.filter((church) => church.isFeatured).slice(0, 3);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle eyebrow="Նշանավոր սրբավայրեր" title="Ժառանգության կենդանի վկաները" description="Յուրաքանչյուր սրբավայր պահպանում է Սյունյաց աշխարհի հավատի, կրթության և համայնքային կյանքի մի էջ։" />
          <Link className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-bold text-royal" to="/heritage/churches">Տեսնել ամբողջ շտեմարանը <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-12">
          {isLoading ? <LoadingState /> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{featured.map((church) => <ChurchCard church={church} key={church.id} />)}</div>}
        </div>
      </Container>
    </section>
  );
}
