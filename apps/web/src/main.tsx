import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import { AdminAuthProvider } from './features/admin/AdminAuthContext';
import { I18nProvider } from './i18n/I18nContext';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AdminAuthProvider>
    </I18nProvider>
  </StrictMode>,
);
