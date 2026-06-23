import { BarChart3, HandHeart, HeartHandshake, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import { Container } from '../common/Container';

const links = [{ to: '/social-impact', labelKey: 'social.mission' as const, icon: HeartHandshake, end: true }, { to: '/social-impact/programs', labelKey: 'social.programs' as const, icon: HandHeart }, { to: '/social-impact/transparency', labelKey: 'social.transparency' as const, icon: BarChart3 }, { to: '/social-impact/volunteer', labelKey: 'social.volunteer' as const, icon: Users }];
export function SocialNavigation() { const { t } = useI18n(); return <div className="border-y border-gold/20 bg-parchment/90"><Container className="flex gap-0 overflow-x-auto py-4">{links.map((item) => <NavLink className={({ isActive }) => `focus-ring flex min-h-12 shrink-0 items-center gap-2 border border-gold/25 px-5 text-xs font-bold transition first:rounded-l-md last:rounded-r-md ${isActive ? 'bg-gold text-white' : 'bg-parchment/70 text-episcopal hover:bg-white/75'}`} end={item.end} key={item.to} to={item.to}><item.icon className="size-4" />{t(item.labelKey)}</NavLink>)}</Container></div>; }
