import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { ContentLocalizer } from '../../i18n/ContentLocalizer';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { Footer } from './Footer';
import { Header } from './Header';

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <a className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-episcopal" href="#main-content">
        Անցնել հիմնական բովանդակությանը
      </a>
      <Header />
      <ContentLocalizer>
        <ErrorBoundary>
          <motion.main
            id="main-content"
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.main>
        </ErrorBoundary>
      </ContentLocalizer>
      <Footer />
    </div>
  );
}
