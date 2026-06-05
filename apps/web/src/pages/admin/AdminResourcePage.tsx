import { Plus, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminResourceForm } from '../../components/admin/AdminResourceForm';
import { AdminTable } from '../../components/admin/AdminTable';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { LoadingState } from '../../components/common/LoadingState';
import { getAdminResource } from '../../constants/admin';
import { adminService } from '../../services/admin.service';

export function AdminResourcePage() {
  const { resource } = useParams();
  const config = useMemo(() => getAdminResource(resource), [resource]);
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | undefined>();
  const [isCreating, setIsCreating] = useState(false);
  const [deletingItem, setDeletingItem] = useState<Record<string, unknown> | undefined>();
  const [error, setError] = useState('');

  async function load() {
    if (!config) return;
    setIsLoading(true);
    setError('');
    try {
      const result = await adminService.list(config.key, search);
      setItems(result.items);
    } catch {
      setError('Could not load records.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [config?.key]);

  if (!config) return <Navigate replace to="/admin" />;

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-royal">Admin resource</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-episcopal">{config.label}</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative">
            <Search className="absolute left-3 top-3 size-4 text-slate-400" />
            <input className="min-h-11 rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm" placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void load(); }} />
          </label>
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold" type="button" onClick={() => void load()}>Search</button>
          {!config.readonly && <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-episcopal px-4 py-2 text-sm font-bold text-white" type="button" onClick={() => setIsCreating(true)}><Plus className="size-4" /> New</button>}
        </div>
      </div>
      {error && <p className="mt-6 rounded-xl bg-royal/10 p-4 text-sm text-royal">{error}</p>}
      <div className="mt-8">{isLoading ? <LoadingState /> : <AdminTable config={config} items={items} onEdit={setEditingItem} onDelete={setDeletingItem} />}</div>
      {(isCreating || editingItem) && (
        <AdminModal title={editingItem ? `Edit ${config.label}` : `New ${config.label}`} onClose={() => { setIsCreating(false); setEditingItem(undefined); }}>
          <AdminResourceForm
            config={config}
            initialItem={editingItem}
            onCancel={() => { setIsCreating(false); setEditingItem(undefined); }}
            onSubmit={async (payload) => {
              if (editingItem?.id) await adminService.update(config.key, String(editingItem.id), payload);
              else await adminService.create(config.key, payload);
              setIsCreating(false);
              setEditingItem(undefined);
              await load();
            }}
          />
        </AdminModal>
      )}
      {deletingItem && (
        <ConfirmDialog
          title="Delete record"
          message="This action cannot be undone. Continue?"
          onCancel={() => setDeletingItem(undefined)}
          onConfirm={async () => {
            await adminService.remove(config.key, String(deletingItem.id));
            setDeletingItem(undefined);
            await load();
          }}
        />
      )}
    </div>
  );
}
