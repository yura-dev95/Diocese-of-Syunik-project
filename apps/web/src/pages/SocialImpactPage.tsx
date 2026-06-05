import { Container } from '../components/common/Container';
import { SectionTitle } from '../components/common/SectionTitle';
import { ProgramCard } from '../components/social/ProgramCard';
import { SocialHero } from '../components/social/SocialHero';
import { SocialNavigation } from '../components/social/SocialNavigation';
import { SuccessStories } from '../components/social/SuccessStories';
import { TransparencyDashboard } from '../components/social/TransparencyDashboard';
import { WallOfHonor } from '../components/social/WallOfHonor';
import { useSocialPrograms } from '../hooks/useSocialData';

export function SocialImpactPage() { const { data } = useSocialPrograms(); return <><SocialHero /><SocialNavigation /><section className="py-24 sm:py-32"><Container><SectionTitle eyebrow="Գործող ծրագրեր" title="Աջակցությունը դառնում է իրական փոփոխություն" /><div className="mt-12 grid gap-5 lg:grid-cols-3">{data?.map((program) => <ProgramCard program={program} key={program.id} />)}</div><div className="mt-16"><TransparencyDashboard /></div></Container></section><SuccessStories /><WallOfHonor /></>; }
