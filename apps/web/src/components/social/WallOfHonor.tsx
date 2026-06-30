import { Heart } from 'lucide-react';
import { useDonorHonors } from '../../hooks/useSocialData';
import { useI18n } from '../../i18n/I18nContext';
import { Container } from '../common/Container';
import { SectionTitle } from '../common/SectionTitle';

export function WallOfHonor() {
  const { data } = useDonorHonors();
  const { localize } = useI18n();

  return <section className="bg-episcopal py-24 sm:py-32"><Container><SectionTitle eyebrow="Շնորհակալության պատ" title="Մեր առաքելության բարեկամները" description="Մենք երախտապարտ ենք յուրաքանչյուր մարդուն և կազմակերպությանը, ովքեր իրենց աջակցությամբ ուժ են տալիս համայնքներին։" light /><div className="mt-12 grid gap-px overflow-hidden border border-parchment/10 bg-parchment/10 sm:grid-cols-2 lg:grid-cols-4">{data?.map((honor) => <article className="bg-episcopal p-7" key={honor.id}><Heart className="size-5 text-gold" /><p className="mt-6 text-[10px] font-bold uppercase tracking-[.18em] text-gold">{localize(honor.honorLevel)}</p><h3 className="mt-3 font-display text-xl font-bold text-parchment">{localize(honor.displayName)}</h3>{honor.message && <p className="mt-3 text-xs leading-6 text-parchment/50">{localize(honor.message)}</p>}</article>)}</div></Container></section>;
}
