import { BookOpen, Volume2 } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import type { Prayer } from '../../types/spiritual';
import { AnimatedCard } from '../common/AnimatedCard';
export function PrayerCard({prayer}:{prayer:Prayer}){const{localize}=useI18n();return <AnimatedCard className="border border-gold/25 bg-parchment/80 p-6"><div className="flex justify-between"><BookOpen className="size-6 text-royal"/>{prayer.audioUrl&&<Volume2 className="size-4 text-gold"/>}</div><p className="mt-7 text-[10px] font-bold uppercase tracking-[.18em] text-gold">{localize(prayer.category)}</p><h3 className="mt-3 font-display text-2xl font-bold text-episcopal">{localize(prayer.title)}</h3><p className="mt-3 text-sm text-ink/55">{localize(prayer.summary)}</p><blockquote className="mt-6 border-l border-gold pl-4 font-display italic leading-7 text-episcopal/80">{localize(prayer.content)}</blockquote></AnimatedCard>}
