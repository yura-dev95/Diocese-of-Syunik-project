import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { ContentLocalizer } from '../../i18n/ContentLocalizer';
import { Footer } from './Footer';
import { Header } from './Header';

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <ContentLocalizer>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Outlet />
        </motion.main>
      </ContentLocalizer>
      <Footer />
    </div>
  );
}
