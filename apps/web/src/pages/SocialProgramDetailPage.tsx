import { CalendarDays, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { LoadingState } from '../components/common/LoadingState';
import { DonationPanel } from '../components/social/DonationPanel';
import { SocialNavigation } from '../components/social/SocialNavigation';
import { SpendingChart } from '../components/social/TransparencyDashboard';
import { useI18n } from '../i18n/I18nContext';
import { socialService } from '../services/social.service';
import type { SocialProgram } from '../types/social';
import { NotFoundPage } from './NotFoundPage';

export function SocialProgramDetailPage() {
  const { slug = '' } = useParams();
  const { formatDate, formatNumber, localize } = useI18n();
  const [program, setProgram] = useState<SocialProgram>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    socialService.getProgram(slug).then(setProgram).catch(() => setFailed(true));
  }, [slug]);

  if (failed) return <NotFoundPage />;
  if (!program) return <Container className="py-24"><LoadingState /></Container>;

  const progress = Math.round(program.raisedAmount / program.goalAmount * 100);

  return <><section className="relative isolate min-h-[65svh] overflow-hidden bg-forest"><img alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-35" src={program.coverUrl} /><div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/55 to-transparent" /><Container className="flex min-h-[65svh] items-end pb-14 pt-24"><div className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-gold">{localize('Սոցիալական ծրագիր')}</p><h1 className="mt-5 font-display text-5xl font-bold text-parchment sm:text-7xl">{localize(program.title)}</h1><div className="mt-6 flex flex-wrap gap-5 text-sm text-parchment/65"><span className="flex gap-2"><MapPin className="size-4 text-gold" />{localize(program.location)}</span><span className="flex gap-2"><Users className="size-4 text-gold" />{formatNumber(program.beneficiaries)} {localize('շահառու')}</span><span className="flex gap-2"><CalendarDays className="size-4 text-gold" />{formatDate(program.startsAt)}</span></div></div></Container></section><SocialNavigation /><section className="py-20 sm:py-28"><Container className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]"><article><p className="text-xs font-bold uppercase tracking-[.2em] text-royal">{localize('Ծրագրի մասին')}</p><h2 className="mt-4 font-display text-4xl font-bold text-episcopal">{localize(program.summary)}</h2><p className="mt-7 leading-8 text-ink/65">{localize(program.description)}</p><div className="mt-10 border border-gold/25 bg-parchment/80 p-6"><div className="flex justify-between text-sm font-bold text-episcopal"><span>{localize('Հավաքագրման առաջընթաց')}</span><span>{progress}%</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-gold/20"><div className="h-full bg-forest" style={{ width: `${progress}%` }} /></div><div className="mt-10"><h3 className="mb-6 font-display text-2xl font-bold text-episcopal">{localize('Միջոցների բաշխում')}</h3><SpendingChart items={program.spending} /></div></div></article><DonationPanel programSlug={program.slug} /></Container></section></>;
}
