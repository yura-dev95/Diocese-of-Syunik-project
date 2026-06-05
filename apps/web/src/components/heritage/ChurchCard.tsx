import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { churchCategoryLabels } from '../../constants/church';
import type { Church } from '../../types/church';
import { AnimatedCard } from '../common/AnimatedCard';
import { Badge } from '../common/Badge';

export function ChurchCard({ church }: { church: Church }) {
  return (
    <AnimatedCard className="group overflow-hidden border border-gold/25 bg-white/45 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-sacred">
      <Link className="focus-ring block" to={`/heritage/churches/${church.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-episcopal">
          <img
            alt={church.name}
            className="size-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            loading="lazy"
            src={church.imageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-episcopal/80 via-transparent to-transparent" />
          <div className="absolute left-4 top-4"><Badge>{churchCategoryLabels[church.category]}</Badge></div>
          <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-parchment text-episcopal transition group-hover:bg-gold">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.12em] text-royal/70">
            <span className="flex items-center gap-1.5"><MapPin className="size-3.5" /> {church.settlement}</span>
            <span>{church.century}</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-episcopal">{church.name}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-7 text-ink/60">{church.summary}</p>
        </div>
      </Link>
    </AnimatedCard>
  );
}
