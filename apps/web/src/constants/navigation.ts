import type { TranslationKey } from '../i18n/translations';

export interface NavigationItem {
  labelKey: TranslationKey;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.heritage', href: '/heritage' },
  { labelKey: 'nav.diocese', href: '/diocese' },
  { labelKey: 'nav.social', href: '/social-impact' },
  { labelKey: 'nav.spiritual', href: '/spiritual-life' },
  { labelKey: 'nav.pilgrim', href: '/pilgrim-guide' },
  { labelKey: 'nav.news', href: '/news-contact' },
];
