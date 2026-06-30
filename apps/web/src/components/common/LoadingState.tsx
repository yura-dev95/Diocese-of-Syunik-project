import { useI18n } from '../../i18n/I18nContext';

interface LoadingStateProps {
  count?: number;
  variant?: 'cards' | 'rows';
}

export function LoadingState({ count = 3, variant = 'cards' }: LoadingStateProps) {
  const { t } = useI18n();
  const items = Array.from({ length: count }, (_, index) => index);

  if (variant === 'rows') {
    return (
      <div className="grid gap-3" aria-label={t('common.loading')} aria-live="polite">
        {items.map((item) => (
          <div className="animate-pulse rounded-md border border-gold/15 bg-parchment/80 p-5" key={item}>
            <div className="h-4 w-1/4 rounded-full bg-gold/20" />
            <div className="mt-4 h-6 w-2/3 rounded-full bg-episcopal/10" />
            <div className="mt-3 h-4 w-full rounded-full bg-episcopal/10" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label={t('common.loading')} aria-live="polite">
      {items.map((item) => (
        <div className="animate-pulse overflow-hidden rounded-md border border-gold/20 bg-parchment/75 shadow-sm" key={item}>
          <div className="aspect-[4/3] bg-gradient-to-br from-gold/20 via-parchment to-episcopal/10" />
          <div className="space-y-4 p-6">
            <div className="h-3 w-24 rounded bg-gold/20" />
            <div className="h-7 w-3/4 rounded bg-episcopal/10" />
            <div className="h-4 rounded bg-episcopal/10" />
            <div className="h-4 w-2/3 rounded bg-episcopal/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
