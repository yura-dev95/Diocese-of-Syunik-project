import { Search } from 'lucide-react';
import { useDeferredValue, useMemo, useState } from 'react';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingState } from '../components/common/LoadingState';
import { Container } from '../components/common/Container';
import { SectionTitle } from '../components/common/SectionTitle';
import { HeritageNavigation } from '../components/heritage/HeritageNavigation';
import { LibraryCard } from '../components/heritage/LibraryCard';
import { useLibraryItems } from '../hooks/useLibraryItems';
import type { LibraryCategory } from '../types/library';

const categories: { value?: LibraryCategory; label: string }[] = [
  { label: 'Բոլորը' }, { value: 'PDF', label: 'PDF գրքեր' }, { value: 'MANUSCRIPT', label: 'Ձեռագրեր' }, { value: 'ARTICLE', label: 'Հոդվածներ' },
];

export function LibraryPage() {
  const [category, setCategory] = useState<LibraryCategory>();
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const filters = useMemo(() => ({ category, search: deferredSearch || undefined }), [category, deferredSearch]);
  const { items, isLoading, error } = useLibraryItems(filters);

  return (
    <>
      <div className="bg-episcopal py-20 text-parchment sm:py-28">
        <Container><SectionTitle eyebrow="Թվային ժառանգություն" title="Գրադարան և արխիվ" description="Բացահայտեք Սյունյաց թեմի ձեռագրերը, հին գրքերը, PDF հրատարակությունները և գիտական հոդվածները։" light /></Container>
      </div>
      <HeritageNavigation />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-5 border-y border-gold/25 py-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((item) => <button className={`focus-ring shrink-0 rounded-full px-4 py-2.5 text-xs font-bold ${category === item.value ? 'bg-episcopal text-parchment' : 'border border-gold/30 text-episcopal'}`} key={item.label} onClick={() => setCategory(item.value)} type="button">{item.label}</button>)}
            </div>
            <label className="relative block min-w-64"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-royal" /><span className="sr-only">Որոնել գրադարանում</span><input className="focus-ring h-12 w-full rounded-full border border-gold/35 bg-white/45 pl-11 pr-4 text-sm" placeholder="Որոնել վերնագրով կամ հեղինակով" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          </div>
          <div className="mt-10">
            {isLoading && <LoadingState />}
            {!isLoading && error && <EmptyState title="Գրադարանը հասանելի չէ" description={error} />}
            {!isLoading && !error && items.length === 0 && <EmptyState title="Նյութ չի գտնվել" description="Փորձեք փոխել որոնման բառը կամ բաժինը։" />}
            {!isLoading && !error && <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((item) => <LibraryCard item={item} key={item.id} />)}</div>}
          </div>
        </Container>
      </section>
    </>
  );
}
