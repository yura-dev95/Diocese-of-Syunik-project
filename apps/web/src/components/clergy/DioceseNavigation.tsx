import { FileText, HelpCircle, Landmark, UserRound, UsersRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import { Container } from '../common/Container';

const links = [
  { to: '/diocese', labelKey: 'diocese.about' as const, icon: Landmark, end: true },
  { to: '/diocese/primate', labelKey: 'diocese.primate' as const, icon: UserRound },
  { to: '/diocese/clergy', labelKey: 'diocese.clergy' as const, icon: UsersRound },
  { to: '/diocese/documents', labelKey: 'diocese.documents' as const, icon: FileText },
  { to: '/diocese/ask-a-priest', labelKey: 'diocese.ask' as const, icon: HelpCircle },
];

export function DioceseNavigation() {
  const { t } = useI18n();
  return <div className="border-y border-gold/20 bg-parchment/90"><Container className="flex gap-0 overflow-x-auto py-4">{links.map((item) => <NavLink className={({ isActive }) => `focus-ring flex min-h-12 shrink-0 items-center gap-2 border border-gold/25 px-5 text-xs font-bold transition first:rounded-l-md last:rounded-r-md ${isActive ? 'bg-gold text-white' : 'bg-parchment/70 text-episcopal hover:bg-white/75'}`} end={item.end} key={item.to} to={item.to}><item.icon className="size-4" />{t(item.labelKey)}</NavLink>)}</Container></div>;
}
