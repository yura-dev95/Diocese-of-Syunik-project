import { AdminModal } from './AdminModal';

export function ConfirmDialog({ title, message, onCancel, onConfirm }: { title: string; message: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <AdminModal title={title} onClose={onCancel}>
      <p className="leading-7 text-slate-600">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button className="rounded-xl border border-gold/50 px-4 py-2 text-sm font-bold text-episcopal" type="button" onClick={onCancel}>Cancel</button>
        <button className="rounded-xl bg-gold px-4 py-2 text-sm font-bold text-white" type="button" onClick={onConfirm}>Confirm</button>
      </div>
    </AdminModal>
  );
}
