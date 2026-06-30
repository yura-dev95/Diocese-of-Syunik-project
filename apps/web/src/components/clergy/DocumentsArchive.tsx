import { Download, FileText } from 'lucide-react';
import { useOfficialDocuments } from '../../hooks/useDioceseData';
import { useI18n } from '../../i18n/I18nContext';
import { EmptyState } from '../common/EmptyState';
import { LoadingState } from '../common/LoadingState';

export function DocumentsArchive() {
  const { formatDate } = useI18n();
  const { data, isLoading, error } = useOfficialDocuments();
  if (isLoading) return <LoadingState />;
  if (error || !data) return <EmptyState title="Փաստաթղթերը հասանելի չեն" description={error ?? ''} />;
  return <div className="grid gap-4">{data.map((document) => <article className="flex flex-col gap-5 border border-gold/25 bg-parchment/80 p-6 sm:flex-row sm:items-center sm:justify-between" key={document.id}><div className="flex gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-episcopal text-gold"><FileText className="size-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-royal">{document.documentType} · {formatDate(document.documentDate)}</p><h3 className="mt-2 font-display text-xl font-bold text-episcopal">{document.title}</h3><p className="mt-2 text-sm leading-6 text-ink/55">{document.description}</p></div></div><button className="focus-ring inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-4 text-xs font-bold text-white" type="button"><Download className="size-4" /> Ներբեռնել</button></article>)}</div>;
}
