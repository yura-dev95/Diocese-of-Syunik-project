import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoadingState } from '../../components/common/LoadingState';
import { useAdminAuth } from './AdminAuthContext';

export function RequireAdmin() {
  const auth = useAdminAuth();
  const location = useLocation();

  if (!auth.isReady) return <div className="p-10"><LoadingState /></div>;
  if (!auth.token || !auth.user) return <Navigate replace to="/admin/login" state={{ from: location.pathname }} />;

  return <Outlet />;
}
