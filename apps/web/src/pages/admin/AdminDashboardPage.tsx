import { Database, MessageSquare, UsersRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingState } from '../../components/common/LoadingState';
import { adminService } from '../../services/admin.service';
import type { AdminSummaryItem } from '../../types/admin';

export function AdminDashboardPage() {
  const [items, setItems] = useState<AdminSummaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.summary().then(setItems).finally(() => setIsLoading(false));
  }, []);

  const total = items.reduce((sum, item) => sum + item.count, 0);
  const submissions = items.filter((item) => ['contact-messages', 'volunteer-applications', 'qna-questions'].includes(item.key)).reduce((sum, item) => sum + item.count, 0);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-royal">Management</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-episcopal">Dashboard</h1>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-white p-6 shadow-sm"><Database className="size-6 text-forest" /><p className="mt-5 font-display text-3xl font-bold">{total}</p><p className="text-sm text-slate-500">Total records</p></article>
        <article className="rounded-2xl bg-white p-6 shadow-sm"><MessageSquare className="size-6 text-royal" /><p className="mt-5 font-display text-3xl font-bold">{submissions}</p><p className="text-sm text-slate-500">Submissions</p></article>
        <article className="rounded-2xl bg-white p-6 shadow-sm"><UsersRound className="size-6 text-gold" /><p className="mt-5 font-display text-3xl font-bold">{items.length}</p><p className="text-sm text-slate-500">Managed resources</p></article>
      </div>
      <div className="mt-8">
        {isLoading ? <LoadingState /> : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
              <Link className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg" key={item.key} to={`/admin/${item.key}`}>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{item.key}</p>
                <h2 className="mt-3 font-display text-xl font-bold text-episcopal">{item.label}</h2>
                <p className="mt-4 text-3xl font-bold text-slate-800">{item.count}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
