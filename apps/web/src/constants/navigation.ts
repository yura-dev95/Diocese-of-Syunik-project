import type { TranslationKey } from '../i18n/translations';

export interface NavigationItem {
  labelKey: TranslationKey;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.heritage', href: '/heritage' },
  { labelKey: 'nav.churches', href: '/churches' },
  { labelKey: 'nav.clergy', href: '/diocese/clergy' },
  { labelKey: 'nav.quickNews', href: '/news-contact' },
  { labelKey: 'nav.events', href: '/spiritual-life' },
];
