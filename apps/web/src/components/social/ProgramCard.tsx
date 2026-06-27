import { ArrowUpRight, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import type { SocialProgram } from '../../types/social';
import { AnimatedCard } from '../common/AnimatedCard';

export function ProgramCard({ program }: { program: SocialProgram }) {
  const { formatNumber, localize } = useI18n();
  const progress = Math.round(program.raisedAmount / program.goalAmount * 100);
  const title = localize(program.title);

  return <AnimatedCard className="group overflow-hidden border border-gold/25 bg-parchment/80 transition hover:-translate-y-1 hover:shadow-sacred"><Link className="focus-ring block" to={`/social-impact/programs/${program.slug}`}><div className="relative aspect-[16/10] overflow-hidden bg-forest"><img alt={title} className="size-full object-cover opacity-75 transition duration-700 group-hover:scale-105" loading="lazy" src={program.coverUrl} /><div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent" /><span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-parchment text-forest"><ArrowUpRight className="size-4" /></span></div><div className="p-6"><div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[.14em] text-royal"><span className="flex items-center gap-1"><MapPin className="size-3" />{localize(program.location)}</span><span className="flex items-center gap-1"><Users className="size-3" />{formatNumber(program.beneficiaries)} {localize('շահառու')}</span></div><h3 className="mt-4 font-display text-2xl font-bold text-episcopal">{title}</h3><p className="mt-3 line-clamp-2 text-sm leading-7 text-ink/60">{localize(program.summary)}</p><div className="mt-6 h-1.5 overflow-hidden rounded-full bg-gold/20"><div className="h-full bg-forest" style={{ width: `${progress}%` }} /></div><div className="mt-2 flex justify-between text-[10px] font-bold text-ink/50"><span>{formatNumber(program.raisedAmount)} ֏</span><span>{progress}%</span></div></div></Link></AnimatedCard>;
}
