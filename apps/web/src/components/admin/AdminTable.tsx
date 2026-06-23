import { Edit, Trash2 } from 'lucide-react';
import type { AdminResourceConfig } from '../../types/admin';

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) return new Date(value).toLocaleDateString();
  return String(value);
}

export function AdminTable({ config, items, onEdit, onDelete }: { config: AdminResourceConfig; items: Record<string, unknown>[]; onEdit: (item: Record<string, unknown>) => void; onDelete: (item: Record<string, unknown>) => void }) {
  const extraFields = config.fields.slice(0, 3).map((field) => field.name).filter((field) => field !== config.titleField);
  const columns = [config.titleField, ...extraFields, 'status', 'updatedAt'].filter((field, index, all) => all.indexOf(field) === index);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500" key={column}>{column}</th>)}
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr className="hover:bg-slate-50" key={String(item.id)}>
                {columns.map((column) => <td className="max-w-xs truncate px-4 py-3 text-slate-700" key={column}>{formatValue(item[column])}</td>)}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="grid size-9 place-items-center rounded-full bg-gold/15 text-episcopal" type="button" onClick={() => onEdit(item)} aria-label="Edit">
                      <Edit className="size-4" />
                    </button>
                    <button className="grid size-9 place-items-center rounded-full bg-gold/15 text-episcopal" type="button" onClick={() => onDelete(item)} aria-label="Delete">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td className="px-4 py-12 text-center text-slate-500" colSpan={columns.length + 1}>No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
