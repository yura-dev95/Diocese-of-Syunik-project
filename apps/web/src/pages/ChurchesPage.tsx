import { useDeferredValue, useMemo, useState } from 'react';
import { ChurchCard } from '../components/heritage/ChurchCard';
import { ChurchFilters } from '../components/heritage/ChurchFilters';
import { HeritageMap } from '../components/heritage/HeritageMap';
import { HeritageNavigation } from '../components/heritage/HeritageNavigation';
import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingState } from '../components/common/LoadingState';
import { SectionTitle } from '../components/common/SectionTitle';
import { useChurches } from '../hooks/useChurches';
import type { ChurchCategory } from '../types/church';

export function ChurchesPage() {
  const [category, setCategory] = useState<ChurchCategory>();
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const filters = useMemo(() => ({ category, search: deferredSearch || undefined }), [category, deferredSearch]);
  const { churches, isLoading, error } = useChurches(filters);

  return (
    <>
      <div className="bg-episcopal py-20 text-parchment sm:py-28">
        <Container><SectionTitle eyebrow="Սրբավայրերի շտեմարան" title="Եկեղեցիներ, վանքեր և մատուռներ" description="Որոնեք Սյունիքի գործող և պատմական սրբավայրերը՝ ըստ տեսակի ու տեղադրության։" light /></Container>
      </div>
      <HeritageNavigation />
      <section className="py-20 sm:py-28">
        <Container>
          <ChurchFilters category={category} search={search} onCategoryChange={setCategory} onSearchChange={setSearch} />
          <div className="mt-10">
            {isLoading && <LoadingState />}
            {!isLoading && error && <EmptyState title="Տվյալները հասանելի չեն" description={error} />}
            {!isLoading && !error && churches.length === 0 && <EmptyState title="Սրբավայր չի գտնվել" description="Փորձեք փոխել որոնման բառը կամ ընտրել այլ բաժին։" />}
            {!isLoading && !error && churches.length > 0 && <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{churches.map((church) => <ChurchCard church={church} key={church.id} />)}</div>}
          </div>
          {!isLoading && !error && churches.length > 0 && <div className="mt-16"><HeritageMap churches={churches} /></div>}
        </Container>
      </section>
    </>
  );
}
