import { lazy, Suspense } from 'react';
import type { ComponentType } from 'react';
import type { RouteObject } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../pages/HomePage';
import { LoadingState } from '../components/common/LoadingState';

function lazyPage(loader: () => Promise<Record<string, unknown>>, name: string) {
  const Page = lazy(async () => ({ default: (await loader())[name] as ComponentType<Record<string, never>> }));
  return <Suspense fallback={<div className="mx-auto max-w-[1440px] px-5 py-24"><LoadingState /></div>}><Page /></Suspense>;
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'heritage',
        element: lazyPage(() => import('../pages/HeritagePage'), 'HeritagePage'),
      },
      { path: 'heritage/churches', element: lazyPage(() => import('../pages/ChurchesPage'), 'ChurchesPage') },
      { path: 'heritage/churches/:slug', element: lazyPage(() => import('../pages/ChurchDetailPage'), 'ChurchDetailPage') },
      {
        path: 'heritage/library',
        element: lazyPage(() => import('../pages/LibraryPage'), 'LibraryPage'),
      },
      {
        path: 'diocese',
        element: lazyPage(() => import('../pages/DiocesePage'), 'DiocesePage'),
      },
      { path: 'diocese/primate', element: lazyPage(() => import('../pages/PrimatePage'), 'PrimatePage') },
      { path: 'diocese/clergy', element: lazyPage(() => import('../pages/ClergyPage'), 'ClergyPage') },
      { path: 'diocese/clergy/:slug', element: lazyPage(() => import('../pages/ClergyDetailPage'), 'ClergyDetailPage') },
      { path: 'diocese/documents', element: lazyPage(() => import('../pages/DocumentsPage'), 'DocumentsPage') },
      { path: 'diocese/ask-a-priest', element: lazyPage(() => import('../pages/AskPriestPage'), 'AskPriestPage') },
      {
        path: 'social-impact',
        element: lazyPage(() => import('../pages/SocialImpactPage'), 'SocialImpactPage'),
      },
      { path: 'social-impact/programs', element: lazyPage(() => import('../pages/SocialProgramsPage'), 'SocialProgramsPage') },
      { path: 'social-impact/programs/:slug', element: lazyPage(() => import('../pages/SocialProgramDetailPage'), 'SocialProgramDetailPage') },
      { path: 'social-impact/transparency', element: lazyPage(() => import('../pages/TransparencyPage'), 'TransparencyPage') },
      { path: 'social-impact/volunteer', element: lazyPage(() => import('../pages/VolunteerPage'), 'VolunteerPage') },
      {
        path: 'spiritual-life',
        element: lazyPage(() => import('../pages/SpiritualLifePage'), 'SpiritualLifePage'),
      },
      { path: 'spiritual-life/prayers', element: lazyPage(() => import('../pages/PrayersPage'), 'PrayersPage') },
      { path: 'spiritual-life/bible', element: lazyPage(() => import('../pages/BiblePage'), 'BiblePage') },
      { path: 'spiritual-life/calendar', element: lazyPage(() => import('../pages/SpiritualCalendarPage'), 'SpiritualCalendarPage') },
      { path: 'spiritual-life/sacraments', element: lazyPage(() => import('../pages/SacramentsPage'), 'SacramentsPage') },
      { path: 'spiritual-life/sacraments/:slug', element: lazyPage(() => import('../pages/SacramentsPage'), 'SacramentDetailPage') },
      { path: 'spiritual-life/media', element: lazyPage(() => import('../pages/SpiritualMediaPage'), 'SpiritualMediaPage') },
      {
        path: 'pilgrim-guide',
        element: lazyPage(() => import('../pages/PilgrimGuidePage'), 'PilgrimGuidePage'),
      },
      { path: 'pilgrim-guide/routes', element: lazyPage(() => import('../pages/PilgrimRoutesPage'), 'PilgrimRoutesPage') },
      { path: 'pilgrim-guide/routes/:slug', element: lazyPage(() => import('../pages/PilgrimRouteDetailPage'), 'PilgrimRouteDetailPage') },
      { path: 'pilgrim-guide/liturgy', element: lazyPage(() => import('../pages/LiturgySchedulePage'), 'LiturgySchedulePage') },
      { path: 'pilgrim-guide/contacts', element: lazyPage(() => import('../pages/PilgrimContactsPage'), 'PilgrimContactsPage') },
      { path: 'pilgrim-guide/etiquette', element: lazyPage(() => import('../pages/EtiquettePage'), 'EtiquettePage') },
      {
        path: 'news-contact',
        element: lazyPage(() => import('../pages/NewsPage'), 'NewsPage'),
      },
      { path: 'news-contact/news/:slug', element: lazyPage(() => import('../pages/NewsDetailPage'), 'NewsDetailPage') },
      { path: 'news-contact/announcements', element: lazyPage(() => import('../pages/AnnouncementsPage'), 'AnnouncementsPage') },
      { path: 'news-contact/gallery', element: lazyPage(() => import('../pages/GalleryPage'), 'GalleryPage') },
      { path: 'news-contact/faq', element: lazyPage(() => import('../pages/FAQPage'), 'FAQPage') },
      { path: 'news-contact/contact', element: lazyPage(() => import('../pages/ContactPage'), 'ContactPage') },
      { path: '*', element: lazyPage(() => import('../pages/NotFoundPage'), 'NotFoundPage') },
    ],
  },
];
