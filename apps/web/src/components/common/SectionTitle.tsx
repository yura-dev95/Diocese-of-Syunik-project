import { useI18n } from '../../i18n/I18nContext';

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}

export function SectionTitle({ eyebrow, title, description, light = false }: SectionTitleProps) {
  const { localize } = useI18n();

  return (
    <div className="max-w-3xl">
      <p className={`mb-4 text-xs font-bold uppercase tracking-[0.26em] ${light ? 'text-gold' : 'text-royal'}`}>
        {localize(eyebrow)}
      </p>
      <h2 className={`font-display text-3xl leading-tight sm:text-4xl lg:text-5xl ${light ? 'text-parchment' : 'text-episcopal'}`}>
        {localize(title)}
      </h2>
      {description && (
        <p className={`mt-5 max-w-2xl leading-8 ${light ? 'text-parchment/70' : 'text-ink/65'}`}>
          {localize(description)}
        </p>
      )}
    </div>
  );
}
