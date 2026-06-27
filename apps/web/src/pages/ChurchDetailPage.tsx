import { ArrowLeft, CalendarDays, MapPin, Navigation, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Container } from '../components/common/Container';
import { LoadingState } from '../components/common/LoadingState';
import { churchCategoryLabels } from '../constants/church';
import { ChurchGallery } from '../components/heritage/ChurchGallery';
import { HeritageNavigation } from '../components/heritage/HeritageNavigation';
import { churchService } from '../services/church.service';
import type { Church } from '../types/church';
import { NotFoundPage } from './NotFoundPage';

export function ChurchDetailPage() {
  const { slug = '' } = useParams();
  const [church, setChurch] = useState<Church>();
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    churchService.getBySlug(slug)
      .then(setChurch)
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) return <Container className="py-24"><LoadingState /></Container>;
  if (notFound || !church) return <NotFoundPage />;

  return (
    <>
      <section className="relative isolate min-h-[68svh] overflow-hidden bg-episcopal">
        <img alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-60" src={church.imageUrl} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-episcopal via-episcopal/45 to-black/20" />
        <Container className="flex min-h-[68svh] items-end pb-14 pt-24">
          <div className="max-w-4xl">
            <Link className="focus-ring mb-8 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-parchment/75 hover:text-gold" to="/churches"><ArrowLeft className="size-4" /> Բոլոր սրբավայրերը</Link>
            <div><Badge>{churchCategoryLabels[church.category]}</Badge></div>
            <h1 className="mt-5 font-display text-5xl font-bold text-parchment sm:text-7xl">{church.name}</h1>
            <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold text-parchment/70">
              <span className="flex items-center gap-2"><MapPin className="size-4 text-gold" />{church.settlement}</span>
              <span className="flex items-center gap-2"><CalendarDays className="size-4 text-gold" />{church.century}</span>
            </div>
          </div>
        </Container>
      </section>
      <HeritageNavigation />
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_.7fr]">
          <article>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-royal">Սրբավայրի պատմությունը</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-episcopal">Դարերի հիշողություն՝ քարի մեջ</h2>
            <p className="mt-7 font-display text-2xl leading-relaxed text-episcopal/85">{church.summary}</p>
            <p className="mt-7 max-w-3xl leading-8 text-ink/65">{church.description}</p>
          </article>
          <aside className="space-y-4">
            {church.serviceSchedule && (
              <div className="border border-gold/25 bg-parchment/80 p-6">
                <CalendarDays className="size-6 text-royal" />
                <h3 className="mt-4 font-display text-xl font-bold text-episcopal">Ժամերգության կարգ</h3>
                <p className="mt-3 text-sm leading-7 text-ink/60">{church.serviceSchedule}</p>
              </div>
            )}
            <div className="border border-gold/25 bg-parchment/80 p-6">
              <ShieldCheck className="size-6 text-forest" />
              <h3 className="mt-4 font-display text-xl font-bold text-episcopal">Այցելուի համար</h3>
              <p className="mt-3 text-sm leading-7 text-ink/60">{church.visitingNote}</p>
            </div>
            <div className="bg-episcopal p-6 text-parchment">
              <Navigation className="size-6 text-gold" />
              <h3 className="mt-4 font-display text-xl font-bold">Տեղադրություն</h3>
              <p className="mt-3 text-sm text-parchment/60">{church.latitude.toFixed(4)}, {church.longitude.toFixed(4)}</p>
              <Button href="/pilgrim-guide" className="mt-6 w-full" variant="light">Պլանավորել այցը</Button>
            </div>
          </aside>
        </Container>
      </section>
      <ChurchGallery images={church.gallery} />
    </>
  );
}
