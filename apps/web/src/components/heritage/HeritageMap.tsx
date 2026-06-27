import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Church } from '../../types/church';

interface HeritageMapProps {
  churches: Church[];
}

function markerPosition(church: Church) {
  const left = 14 + ((church.longitude - 45.75) / 0.75) * 72;
  const top = 82 - ((church.latitude - 39.15) / 0.65) * 68;
  return { left: `${Math.min(88, Math.max(8, left))}%`, top: `${Math.min(88, Math.max(8, top))}%` };
}

export function HeritageMap({ churches }: HeritageMapProps) {
  return (
    <div className="relative min-h-[34rem] overflow-hidden bg-forest shadow-sacred">
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_center,#f5ecd7_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -left-24 top-8 h-72 w-[70%] rotate-6 rounded-[50%] border border-gold/20" />
      <div className="absolute right-[-10%] top-28 h-80 w-[75%] -rotate-12 rounded-[50%] border border-gold/20" />
      <div className="absolute left-[8%] top-[16%] max-w-xs">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Ինտերակտիվ քարտեզ</p>
        <h3 className="mt-3 font-display text-3xl font-bold text-parchment">Սյունյաց սրբավայրերի ճանապարհը</h3>
        <p className="mt-3 text-sm leading-6 text-parchment/60">Նշիչները կառուցված են իրական աշխարհագրական կոորդինատներից և պատրաստ են Leaflet շերտին միանալու համար։</p>
      </div>
      {churches.map((church) => (
        <Link
          aria-label={church.name}
          className="focus-ring group absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          key={church.id}
          style={markerPosition(church)}
          title={church.name}
          to={`/churches/${church.slug}`}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
          <span className="relative grid size-10 place-items-center rounded-full border-2 border-parchment bg-gold text-white shadow-lg transition group-hover:scale-110 group-hover:bg-gold group-hover:text-episcopal">
            <MapPin className="size-4" />
          </span>
        </Link>
      ))}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border border-parchment/15 bg-episcopal/80 px-5 py-4 backdrop-blur-md">
        <span className="text-xs font-semibold text-parchment/70">Ցուցադրված սրբավայրեր</span>
        <span className="font-display text-2xl text-gold">{churches.length}</span>
      </div>
    </div>
  );
}
