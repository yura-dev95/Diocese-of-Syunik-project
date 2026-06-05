import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Languages, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '../../constants/navigation';
import { useI18n } from '../../i18n/I18nContext';
import { localeOptions } from '../../i18n/translations';
import { Container } from '../common/Container';
import { LogoMark } from './LogoMark';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, t } = useI18n();
  const activeLanguage = localeOptions.find((item) => item.code === locale) ?? localeOptions[0];

  useEffect(() => {
    function closeLanguageMenu(event: MouseEvent) {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener('mousedown', closeLanguageMenu);
    return () => document.removeEventListener('mousedown', closeLanguageMenu);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/15 bg-parchment/95 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between gap-5">
        <NavLink aria-label={t('nav.home')} className="focus-ring flex items-center gap-3 rounded-lg" to="/" onClick={() => setIsOpen(false)}>
          <LogoMark />
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold text-episcopal">{t('brand.name')}</span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-royal/70 sm:block">
              {t('brand.subtitle')}
            </span>
          </span>
        </NavLink>

        <nav aria-label={t('nav.main')} className="hidden items-center gap-5 xl:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              className={({ isActive }) =>
                `focus-ring rounded-md py-2 text-xs font-semibold transition hover:text-royal ${
                  isActive ? 'text-royal' : 'text-ink/70'
                }`
              }
              to={item.href}
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative" ref={languageMenuRef}>
            <button
              aria-expanded={isLanguageOpen}
              aria-haspopup="menu"
              aria-label={t('language.change')}
              className="focus-ring flex min-h-10 items-center gap-1.5 rounded-full border border-gold/40 px-3 text-xs font-bold text-episcopal transition hover:border-gold hover:bg-gold/10"
              type="button"
              onClick={() => setIsLanguageOpen((current) => !current)}
            >
              <Languages className="size-3.5 text-royal" />
              {activeLanguage.shortLabel}
              <ChevronDown className={`size-3.5 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLanguageOpen && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  aria-label={t('language.select')}
                  className="absolute right-0 top-[calc(100%+0.65rem)] z-50 min-w-44 overflow-hidden rounded-xl border border-gold/25 bg-parchment p-1.5 shadow-xl shadow-episcopal/15"
                  exit={{ opacity: 0, y: -6 }}
                  initial={{ opacity: 0, y: -6 }}
                  role="menu"
                >
                  {localeOptions.map((item) => (
                    <button
                      className={`focus-ring flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
                        locale === item.code ? 'bg-episcopal text-parchment' : 'text-episcopal hover:bg-gold/15'
                      }`}
                      key={item.code}
                      role="menuitemradio"
                      aria-checked={locale === item.code}
                      type="button"
                      onClick={() => {
                        setLocale(item.code);
                        setIsLanguageOpen(false);
                      }}
                    >
                      <span>{item.label}</span>
                      {locale === item.code && <Check className="size-4 text-gold" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? t('menu.close') : t('menu.open')}
            className="focus-ring grid size-11 place-items-center rounded-full bg-episcopal text-parchment xl:hidden"
            type="button"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            aria-label={t('nav.mobile')}
            className="border-t border-gold/15 bg-parchment px-5 pb-6 xl:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="mx-auto flex max-w-[1440px] flex-col pt-3">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.href}
                  className={({ isActive }) =>
                    `border-b border-gold/15 py-4 font-display text-lg ${isActive ? 'text-royal' : 'text-episcopal'}`
                  }
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
