import { BookOpen, Church, History } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import { Container } from '../common/Container';

const links = [
  { to: '/heritage', labelKey: 'heritage.overview' as const, icon: History, end: true },
  { to: '/heritage/churches', labelKey: 'heritage.churches' as const, icon: Church },
  { to: '/heritage/library', labelKey: 'heritage.library' as const, icon: BookOpen },
];

export function HeritageNavigation() {
  const { t } = useI18n();
  return (
    <div className="border-b border-gold/20 bg-parchment">
      <Container className="flex gap-2 overflow-x-auto py-4">
        {links.map((item) => (
          <NavLink
            className={({ isActive }) => `focus-ring flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition ${isActive ? 'bg-episcopal text-parchment' : 'border border-gold/30 text-episcopal hover:bg-gold/10'}`}
            end={item.end}
            key={item.to}
            to={item.to}
          >
            <item.icon className="size-4" /> {t(item.labelKey)}
          </NavLink>
        ))}
      </Container>
    </div>
  );
}
