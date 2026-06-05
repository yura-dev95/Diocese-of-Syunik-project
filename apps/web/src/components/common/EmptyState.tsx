import { SearchX } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  const { localize } = useI18n();
  return (
    <div className="grid min-h-72 place-items-center border border-dashed border-gold/40 bg-white/30 px-6 text-center">
      <div>
        <SearchX className="mx-auto size-9 text-gold" strokeWidth={1.5} />
        <h3 className="mt-5 font-display text-2xl font-bold text-episcopal">{localize(title)}</h3>
        <p className="mt-3 text-sm leading-7 text-ink/60">{localize(description)}</p>
      </div>
    </div>
  );
}
