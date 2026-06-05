import { Cross } from 'lucide-react';

export function LogoMark() {
  return (
    <span className="relative grid size-12 shrink-0 place-items-center rounded-full border border-gold/60 bg-episcopal text-gold shadow-md">
      <span className="absolute inset-1 rounded-full border border-gold/25" />
      <Cross aria-hidden="true" className="size-5" strokeWidth={1.6} />
    </span>
  );
}
