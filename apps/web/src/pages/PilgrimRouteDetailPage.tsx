import { Clock, MapPin, Route } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { LoadingState } from '../components/common/LoadingState';
import { HowToReach } from '../components/pilgrim/HowToReach';
import { PilgrimNavigation } from '../components/pilgrim/PilgrimNavigation';
import { useI18n } from '../i18n/I18nContext';
import { pilgrimService } from '../services/pilgrim.service';
import type { PilgrimRoute } from '../types/pilgrim';
import { NotFoundPage } from './NotFoundPage';

export function PilgrimRouteDetailPage() {
  const { slug = '' } = useParams();
  const { localize } = useI18n();
  const [route, setRoute] = useState<PilgrimRoute>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    pilgrimService.route(slug).then(setRoute).catch(() => setFailed(true));
  }, [slug]);

  if (failed) return <NotFoundPage/>;
  if (!route) return <Container className="py-24"><LoadingState/></Container>;

  return <><section className="relative isolate min-h-[60svh] bg-forest"><img alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-35" src={route.coverUrl}/><div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/50 to-transparent"/><Container className="flex min-h-[60svh] items-end pb-12 pt-24"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-gold">{localize('Ուխտավորական երթուղի')}</p><h1 className="mt-4 font-display text-5xl font-bold text-parchment sm:text-7xl">{localize(route.title)}</h1><div className="mt-6 flex flex-wrap gap-5 text-sm text-parchment/65"><span className="flex gap-2"><Clock className="size-4 text-gold"/>{localize(route.duration)}</span><span className="flex gap-2"><Route className="size-4 text-gold"/>{route.distanceKm} {localize('կմ')} · {localize(route.difficulty)}</span><span className="flex gap-2"><MapPin className="size-4 text-gold"/>{localize(route.startLocation)} → {localize(route.endLocation)}</span></div></div></Container></section><PilgrimNavigation/><section className="py-20"><Container className="grid gap-12 lg:grid-cols-[1.2fr_.8fr]"><div><h2 className="font-display text-4xl font-bold text-episcopal">{localize('Օրվա ծրագիրը')}</h2><p className="mt-5 leading-8 text-ink/60">{localize(route.summary)}</p><div className="mt-10 grid gap-0">{route.itinerary.map((stop,index)=><article className="relative border-l border-gold/40 pb-8 pl-7 last:pb-0" key={stop.time+stop.title}><span className="absolute -left-2 top-0 grid size-4 place-items-center rounded-full bg-gold text-[8px] font-bold text-episcopal">{index+1}</span><p className="text-xs font-bold text-royal">{stop.time} · {localize(stop.location)}</p><h3 className="mt-2 font-display text-xl font-bold text-episcopal">{localize(stop.title)}</h3><p className="mt-2 text-sm text-ink/55">{localize(stop.description)}</p></article>)}</div></div><HowToReach route={route}/></Container></section></>;
}
