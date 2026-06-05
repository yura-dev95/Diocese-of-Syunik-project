import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { type Locale, locales, translations, type TranslationKey } from './translations';
import { localizeContent } from './content';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  formatDate: (value: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  localize: (value: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);
const storageKey = 'syunik-diocese-locale';

function getInitialLocale(): Locale {
  const savedLocale = localStorage.getItem(storageKey);
  return locales.includes(savedLocale as Locale) ? (savedLocale as Locale) : 'hy';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem(storageKey, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translations[locale][key],
      formatDate: (date, options) => new Intl.DateTimeFormat(locale, options).format(new Date(date)),
      formatNumber: (number, options) => new Intl.NumberFormat(locale, options).format(number),
      localize: (text) => localizeContent(text, locale),
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
