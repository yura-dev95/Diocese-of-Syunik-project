import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingState } from '../components/common/LoadingState';
import { SectionTitle } from '../components/common/SectionTitle';
import { ClergyCard } from '../components/clergy/ClergyCard';
import { DioceseNavigation } from '../components/clergy/DioceseNavigation';
import { useClergy } from '../hooks/useDioceseData';

export function ClergyPage() {
  const { data, isLoading, error } = useClergy();
  return <><div className="bg-episcopal py-20 sm:py-28"><Container><SectionTitle eyebrow="Հովվական ծառայություն" title="Սյունյաց թեմի հոգևորականները" description="Ծանոթացեք թեմի հոգևորականներին, նրանց ծառայության վայրերին և առաքելությանը։" light /></Container></div><DioceseNavigation /><section className="py-20 sm:py-28"><Container>{isLoading && <LoadingState />}{error && <EmptyState title="Տվյալները հասանելի չեն" description={error} />}{data && <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{data.map((member) => <ClergyCard key={member.id} member={member} />)}</div>}</Container></section></>;
}
