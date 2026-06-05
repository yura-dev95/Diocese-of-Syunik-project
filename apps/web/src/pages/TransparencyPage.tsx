import { Container } from '../components/common/Container';
import { SectionTitle } from '../components/common/SectionTitle';
import { SocialNavigation } from '../components/social/SocialNavigation';
import { TransparencyDashboard } from '../components/social/TransparencyDashboard';
import { useSocialPrograms } from '../hooks/useSocialData';
import { SpendingChart } from '../components/social/TransparencyDashboard';

export function TransparencyPage() { const { data } = useSocialPrograms(); return <><div className="bg-forest py-20 sm:py-28"><Container><SectionTitle eyebrow="Հաշվետվողականություն" title="Թափանցիկության վահանակ" description="Հետևեք ծրագրերի նպատակներին, հավաքված միջոցներին և ծախսերի բաշխմանը։" light /></Container></div><SocialNavigation /><section className="py-20 sm:py-28"><Container><TransparencyDashboard /><div className="mt-12 grid gap-5 lg:grid-cols-3">{data?.map((program) => <article className="border border-gold/25 bg-white/45 p-6" key={program.id}><h2 className="font-display text-xl font-bold text-episcopal">{program.title}</h2><div className="mt-6"><SpendingChart items={program.spending} /></div></article>)}</div></Container></section></>; }
