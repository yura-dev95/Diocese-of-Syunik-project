import { BarChart3, HandHeart, HeartHandshake, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import { Container } from '../common/Container';

const links = [{ to: '/social-impact', labelKey: 'social.mission' as const, icon: HeartHandshake, end: true }, { to: '/social-impact/programs', labelKey: 'social.programs' as const, icon: HandHeart }, { to: '/social-impact/transparency', labelKey: 'social.transparency' as const, icon: BarChart3 }, { to: '/social-impact/volunteer', labelKey: 'social.volunteer' as const, icon: Users }];
export function SocialNavigation() { const { t } = useI18n(); return <div className="border-b border-gold/20 bg-parchment"><Container className="flex gap-2 overflow-x-auto py-4">{links.map((item) => <NavLink className={({ isActive }) => `focus-ring flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold ${isActive ? 'bg-forest text-parchment' : 'border border-gold/30 text-episcopal'}`} end={item.end} key={item.to} to={item.to}><item.icon className="size-4" />{t(item.labelKey)}</NavLink>)}</Container></div>; }
