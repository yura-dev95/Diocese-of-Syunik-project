import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navigationItems } from '../../constants/navigation';
import { useI18n } from '../../i18n/I18nContext';
import { Container } from '../common/Container';

const externalLinks = [
  { labelKey: 'external.motherSee' as const, href: 'https://www.armenianchurch.org/' },
  { labelKey: 'external.shoghakat' as const, href: 'https://shoghakat.am/' },
  { labelKey: 'external.education' as const, href: 'https://qdk.am/' },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-gold/20 bg-episcopal text-parchment">
      <Container className="grid gap-12 py-16 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <p className="font-display text-xl font-bold">{t('brand.name')}</p>
          <p className="mt-6 max-w-sm text-sm leading-7 text-parchment/70">
            {t('footer.description')}
          </p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{t('footer.sections')}</h2>
          <div className="mt-5 grid gap-3">
            {navigationItems.slice(1, 5).map((item) => (
              <Link className="text-sm text-parchment/72 transition hover:text-gold" key={item.href} to={item.href}>
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{t('footer.usefulLinks')}</h2>
          <div className="mt-5 grid gap-3">
            {externalLinks.map((item) => (
              <a className="flex items-center gap-2 text-sm text-parchment/72 transition hover:text-gold" href={item.href} key={item.href} rel="noreferrer" target="_blank">
                {t(item.labelKey)} <ArrowUpRight className="size-3" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{t('footer.contact')}</h2>
          <div className="mt-5 grid gap-4 text-sm text-parchment/72">
            <p className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {t('footer.address')}</p>
            <a className="flex gap-3 hover:text-gold" href="tel:+37400000000"><Phone className="size-4 shrink-0 text-gold" /> +374 00 00 00 00</a>
            <a className="flex gap-3 hover:text-gold" href="mailto:info@syunikdiocese.am"><Mail className="size-4 shrink-0 text-gold" /> info@syunikdiocese.am</a>
          </div>
        </div>
      </Container>
      <div className="border-t border-parchment/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-parchment/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {t('brand.name')}. {t('footer.rights')}</p>
          <p>{t('footer.createdFor')}</p>
        </Container>
      </div>
    </footer>
  );
}
