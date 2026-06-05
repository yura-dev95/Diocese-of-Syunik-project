import { Container } from '../components/common/Container';
import { LoadingState } from '../components/common/LoadingState';
import { SectionTitle } from '../components/common/SectionTitle';
import { ProgramCard } from '../components/social/ProgramCard';
import { SocialNavigation } from '../components/social/SocialNavigation';
import { useSocialPrograms } from '../hooks/useSocialData';

export function SocialProgramsPage() { const { data, isLoading } = useSocialPrograms(); return <><div className="bg-forest py-20 sm:py-28"><Container><SectionTitle eyebrow="Հավատք՝ գործով" title="Սոցիալական ծրագրեր" description="Ընտրեք ծրագիր և դարձեք համայնքային իրական փոփոխության մասնակից։" light /></Container></div><SocialNavigation /><section className="py-20 sm:py-28"><Container>{isLoading ? <LoadingState /> : <div className="grid gap-5 lg:grid-cols-3">{data?.map((program) => <ProgramCard program={program} key={program.id} />)}</div>}</Container></section></>; }
