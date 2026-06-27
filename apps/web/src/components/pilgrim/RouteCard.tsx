import { ArrowUpRight, Clock, MapPin, Route } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import type { PilgrimRoute } from '../../types/pilgrim';
import { AnimatedCard } from '../common/AnimatedCard';

export function RouteCard({ route }: { route: PilgrimRoute }) {
  const { localize } = useI18n();
  const title = localize(route.title);

  return <AnimatedCard className="group overflow-hidden border border-gold/25 bg-parchment/80"><Link className="focus-ring block" to={`/pilgrim-guide/routes/${route.slug}`}><div className="relative aspect-[16/10] overflow-hidden bg-forest"><img alt={title} className="size-full object-cover opacity-75 transition duration-700 group-hover:scale-105" src={route.coverUrl}/><div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent"/><span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-parchment text-forest"><ArrowUpRight className="size-4"/></span></div><div className="p-6"><div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[.12em] text-royal"><span className="flex gap-1"><Clock className="size-3"/>{localize(route.duration)}</span><span className="flex gap-1"><Route className="size-3"/>{route.distanceKm} {localize('կմ')}</span><span className="flex gap-1"><MapPin className="size-3"/>{localize(route.startLocation)}</span></div><h3 className="mt-4 font-display text-2xl font-bold text-episcopal">{title}</h3><p className="mt-3 text-sm leading-7 text-ink/60">{localize(route.summary)}</p></div></Link></AnimatedCard>;
}
