import { Container } from '../components/common/Container';
import { LoadingState } from '../components/common/LoadingState';
import { ClergyProfile } from '../components/clergy/ClergyProfile';
import { DioceseNavigation } from '../components/clergy/DioceseNavigation';
import { usePrimate } from '../hooks/useDioceseData';
import { NotFoundPage } from './NotFoundPage';

export function PrimatePage() {
  const { data, isLoading } = usePrimate();
  if (isLoading) return <Container className="py-24"><LoadingState /></Container>;
  if (!data) return <NotFoundPage />;
  return <><DioceseNavigation /><ClergyProfile member={data} /></>;
}
