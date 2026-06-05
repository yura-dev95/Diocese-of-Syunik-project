import type { PropsWithChildren } from 'react';

export function Badge({ children }: PropsWithChildren) {
  return <span className="inline-flex rounded-full bg-parchment/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-episcopal shadow-sm">{children}</span>;
}
