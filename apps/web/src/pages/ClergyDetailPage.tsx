import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { LoadingState } from '../components/common/LoadingState';
import { ClergyProfile } from '../components/clergy/ClergyProfile';
import { DioceseNavigation } from '../components/clergy/DioceseNavigation';
import { dioceseService } from '../services/diocese.service';
import type { ClergyMember } from '../types/diocese';
import { NotFoundPage } from './NotFoundPage';

export function ClergyDetailPage() {
  const { slug = '' } = useParams();
  const [member, setMember] = useState<ClergyMember>();
  const [failed, setFailed] = useState(false);
  useEffect(() => { dioceseService.getClergyBySlug(slug).then(setMember).catch(() => setFailed(true)); }, [slug]);
  if (failed) return <NotFoundPage />;
  if (!member) return <Container className="py-24"><LoadingState /></Container>;
  return <><DioceseNavigation /><ClergyProfile member={member} /></>;
}
