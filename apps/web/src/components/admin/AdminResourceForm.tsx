import { useMemo, useState, type FormEvent } from 'react';
import type { AdminResourceConfig } from '../../types/admin';

function normalizeInitialValue(value: unknown) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) return value.slice(0, 10);
  return value;
}

export function AdminResourceForm({ config, initialItem, onSubmit, onCancel }: { config: AdminResourceConfig; initialItem?: Record<string, unknown>; onSubmit: (payload: Record<string, unknown>) => Promise<void>; onCancel: () => void }) {
  const initialValues = useMemo(() => Object.fromEntries(config.fields.map((field) => [field.name, normalizeInitialValue(initialItem?.[field.name])])), [config.fields, initialItem]);
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save item.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="grid gap-5" onSubmit={submit}>
      {config.readonly && <div className="rounded-xl bg-gold/15 p-4 text-sm text-episcopal">This record is read-only except for allowed management fields such as status.</div>}
      {config.fields.map((field) => {
        const value = values[field.name];
        if (field.type === 'checkbox') {
          return <label className="flex items-center gap-3 text-sm font-bold text-slate-700" key={field.name}><input checked={Boolean(value)} type="checkbox" onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.checked }))} />{field.label}</label>;
        }
        if (field.type === 'select') {
          return <label className="grid gap-2 text-xs font-bold uppercase tracking-wide text-slate-500" key={field.name}>{field.label}<select className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-semibold normal-case text-slate-800" required={field.required} value={String(value ?? '')} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}><option value="">Select...</option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
        }
        if (field.type === 'textarea') {
          return <label className="grid gap-2 text-xs font-bold uppercase tracking-wide text-slate-500" key={field.name}>{field.label}<textarea className="min-h-28 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold normal-case text-slate-800" required={field.required} value={String(value ?? '')} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))} /></label>;
        }
        return <label className="grid gap-2 text-xs font-bold uppercase tracking-wide text-slate-500" key={field.name}>{field.label}<input className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm font-semibold normal-case text-slate-800" required={field.required} type={field.type ?? 'text'} value={String(value ?? '')} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))} /></label>;
      })}
      {error && <p className="rounded-xl bg-royal/10 p-3 text-sm text-royal">{error}</p>}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
        <button className="rounded-xl border border-gold/50 px-4 py-2 text-sm font-bold text-episcopal" type="button" onClick={onCancel}>Cancel</button>
        <button className="rounded-xl bg-gold px-4 py-2 text-sm font-bold text-white disabled:opacity-60" disabled={isSaving} type="submit">{isSaving ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}
