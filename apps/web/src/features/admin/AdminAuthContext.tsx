import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { adminService, adminTokenKey } from '../../services/admin.service';
import type { AdminUser } from '../../types/admin';

interface AdminAuthContextValue {
  user?: AdminUser;
  token?: string;
  isReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | undefined>(() => localStorage.getItem(adminTokenKey) ?? undefined);
  const [user, setUser] = useState<AdminUser | undefined>();
  const [isReady, setIsReady] = useState(!token);

  useEffect(() => {
    if (!token) return;
    adminService.me().then(setUser).catch(() => {
      localStorage.removeItem(adminTokenKey);
      setToken(undefined);
    }).finally(() => setIsReady(true));
  }, [token]);

  const value = useMemo<AdminAuthContextValue>(() => ({
    user,
    token,
    isReady,
    login: async (email, password) => {
      const result = await adminService.login({ email, password });
      localStorage.setItem(adminTokenKey, result.accessToken);
      setToken(result.accessToken);
      setUser(result.user);
      setIsReady(true);
    },
    logout: () => {
      localStorage.removeItem(adminTokenKey);
      setToken(undefined);
      setUser(undefined);
      setIsReady(true);
    },
  }), [isReady, token, user]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return context;
}
