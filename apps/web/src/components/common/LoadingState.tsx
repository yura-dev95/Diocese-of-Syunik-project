import { useI18n } from '../../i18n/I18nContext';

export function LoadingState() {
  const { t } = useI18n();
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label={t('common.loading')}>
      {[1, 2, 3].map((item) => (
        <div className="animate-pulse overflow-hidden border border-gold/20 bg-white/40" key={item}>
          <div className="aspect-[4/3] bg-gold/15" />
          <div className="space-y-4 p-6">
            <div className="h-3 w-24 rounded bg-gold/20" />
            <div className="h-7 w-3/4 rounded bg-episcopal/10" />
            <div className="h-4 rounded bg-episcopal/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
