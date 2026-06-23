import { LogOut, ShieldCheck } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { adminResources } from '../../constants/admin';
import { useAdminAuth } from '../../features/admin/AdminAuthContext';

export function AdminLayout() {
  const { logout, user } = useAdminAuth();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-72 overflow-y-auto border-r border-slate-200 bg-white p-5 lg:block">
        <NavLink className="flex items-center gap-3 rounded-2xl bg-episcopal p-4 text-parchment" to="/admin">
          <ShieldCheck className="size-6 text-gold" />
          <span>
            <span className="block text-sm font-bold">Syunik Admin</span>
            <span className="text-xs text-parchment/55">{user?.email}</span>
          </span>
        </NavLink>
        <nav className="mt-6 grid gap-1">
          <NavLink className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? 'bg-gold/20 text-episcopal' : 'text-slate-600 hover:bg-slate-100'}`} end to="/admin">
            Dashboard
          </NavLink>
          {adminResources.map((resource) => (
            <NavLink className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? 'bg-gold/20 text-episcopal' : 'text-slate-600 hover:bg-slate-100'}`} key={resource.key} to={`/admin/${resource.key}`}>
              {resource.label}
            </NavLink>
          ))}
        </nav>
        <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-gold/50 px-3 py-2 text-sm font-bold text-episcopal hover:bg-slate-50" type="button" onClick={logout}>
          <LogOut className="size-4" /> Logout
        </button>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <NavLink className="font-bold text-episcopal" to="/admin">Syunik Admin</NavLink>
            <button className="rounded-full border border-gold/50 px-3 py-1.5 text-xs font-bold text-episcopal" type="button" onClick={logout}>Logout</button>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <NavLink className="shrink-0 rounded-full border border-gold/50 px-3 py-1.5 text-xs font-bold text-episcopal" end to="/admin">Dashboard</NavLink>
            {adminResources.map((resource) => <NavLink className="shrink-0 rounded-full border border-gold/50 px-3 py-1.5 text-xs font-bold text-episcopal" key={resource.key} to={`/admin/${resource.key}`}>{resource.label}</NavLink>)}
          </nav>
        </header>
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
