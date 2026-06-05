import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ClergyMember } from '../../types/diocese';
import { AnimatedCard } from '../common/AnimatedCard';

export function ClergyCard({ member }: { member: ClergyMember }) {
  return <AnimatedCard className="group overflow-hidden border border-gold/25 bg-white/45 transition hover:-translate-y-1 hover:shadow-sacred"><Link className="focus-ring block" to={member.isPrimate ? '/diocese/primate' : `/diocese/clergy/${member.slug}`}><div className="relative aspect-[4/5] overflow-hidden bg-episcopal"><img alt={member.fullName} className="size-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-95" loading="lazy" src={member.imageUrl} /><div className="absolute inset-0 bg-gradient-to-t from-episcopal via-transparent to-transparent" /><span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-parchment text-episcopal"><ArrowUpRight className="size-4" /></span></div><div className="p-6"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-royal">{member.title}</p><h3 className="mt-3 font-display text-2xl font-bold text-episcopal">{member.fullName}</h3>{member.church && <p className="mt-4 flex items-center gap-2 text-xs text-ink/55"><MapPin className="size-3.5 text-gold" />{member.church.name}, {member.church.settlement}</p>}</div></Link></AnimatedCard>;
}
