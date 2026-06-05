import { AnimatePresence } from 'framer-motion';
import { useLocation, useRoutes } from 'react-router-dom';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { Seo } from '../components/common/Seo';
import { routes } from './routes';

export function App() {
  const location = useLocation();
  const element = useRoutes(routes, location);

  return (
    <ErrorBoundary>
      <Seo />
      <AnimatePresence mode="wait">{element}</AnimatePresence>
    </ErrorBoundary>
  );
}
