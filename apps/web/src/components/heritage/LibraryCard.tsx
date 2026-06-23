import { BookOpen, Download, FileText, ScrollText } from 'lucide-react';
import type { LibraryItem } from '../../types/library';
import { AnimatedCard } from '../common/AnimatedCard';
import { Badge } from '../common/Badge';

const icons = { PDF: FileText, MANUSCRIPT: ScrollText, ARTICLE: BookOpen };
const labels = { PDF: 'PDF գիրք', MANUSCRIPT: 'Ձեռագիր', ARTICLE: 'Գիտական հոդված' };

export function LibraryCard({ item }: { item: LibraryItem }) {
  const Icon = icons[item.category];
  return (
    <AnimatedCard className="group overflow-hidden border border-gold/25 bg-parchment/80 transition hover:-translate-y-1 hover:shadow-sacred">
      <div className="relative aspect-[4/3] overflow-hidden bg-episcopal">
        {item.coverUrl && <img alt="" className="size-full object-cover opacity-55 transition duration-700 group-hover:scale-105" loading="lazy" src={item.coverUrl} />}
        <div className="absolute inset-0 bg-gradient-to-t from-episcopal via-episcopal/20 to-transparent" />
        <div className="absolute left-4 top-4"><Badge>{labels[item.category]}</Badge></div>
        <Icon className="absolute bottom-5 left-5 size-8 text-gold" strokeWidth={1.3} />
      </div>
      <div className="p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-royal/65">{item.author ?? 'Սյունյաց թեմի արխիվ'}</p>
        <h3 className="mt-3 font-display text-2xl font-bold text-episcopal">{item.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-7 text-ink/60">{item.description}</p>
        <div className="mt-6 flex items-center justify-between border-t border-gold/20 pt-4 text-xs text-ink/50">
          <span>{item.publicationYear} · {item.pageCount} էջ</span>
          <span className="grid size-9 place-items-center rounded-full bg-gold text-white"><Download className="size-4" /></span>
        </div>
      </div>
    </AnimatedCard>
  );
}
