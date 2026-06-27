import { BarChart3, HandHeart, Target, Users } from 'lucide-react';
import { useTransparency } from '../../hooks/useSocialData';
import { useI18n } from '../../i18n/I18nContext';
import type { SpendingItem } from '../../types/social';
import { LoadingState } from '../common/LoadingState';

export function SpendingChart({ items }: { items: SpendingItem[] }) {
  const { formatNumber, localize } = useI18n();
  const total = items.reduce((s, i) => s + i.amount, 0);

  return <div className="grid gap-4">{items.map((item) => <div key={item.label}><div className="mb-2 flex justify-between text-xs"><span className="font-semibold text-episcopal">{localize(item.label)}</span><span className="text-ink/50">{formatNumber(item.amount)} ֏</span></div><div className="h-2 overflow-hidden rounded-full bg-gold/15"><div className="h-full rounded-full" style={{ backgroundColor: item.color, width: `${item.amount / total * 100}%` }} /></div></div>)}</div>;
}

export function TransparencyDashboard() {
  const { data, isLoading } = useTransparency();
  const { formatNumber, localize } = useI18n();

  if (isLoading || !data) return <LoadingState />;

  const stats = [{ icon: HandHeart, label: 'Հավաքված միջոցներ', value: `${formatNumber(data.totalRaised)} ֏` }, { icon: Target, label: 'Ընդհանուր նպատակ', value: `${formatNumber(data.totalGoal)} ֏` }, { icon: Users, label: 'Շահառուներ', value: formatNumber(data.beneficiaries) }, { icon: BarChart3, label: 'Գործող ծրագրեր', value: String(data.programs) }];
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <article className="border border-gold/25 bg-parchment/80 p-6" key={stat.label}><stat.icon className="size-6 text-forest" /><p className="mt-7 font-display text-2xl font-bold text-episcopal">{stat.value}</p><p className="mt-2 text-xs text-ink/50">{localize(stat.label)}</p></article>)}</div>;
}
