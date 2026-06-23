import { Container } from '../components/common/Container';
import { SectionTitle } from '../components/common/SectionTitle';
import { AskPriestForm } from '../components/clergy/AskPriestForm';
import { DioceseNavigation } from '../components/clergy/DioceseNavigation';
import { usePublicQuestions } from '../hooks/useDioceseData';

export function AskPriestPage() {
  const { data } = usePublicQuestions();
  return <><div className="bg-episcopal py-20 sm:py-28"><Container><SectionTitle eyebrow="Գաղտնի և հոգատար զրույց" title="Հարցրու քահանային" description="Ուղարկեք ձեր հարցը անանուն կամ թողեք էլեկտրոնային հասցե՝ մասնավոր պատասխան ստանալու համար։" light /></Container></div><DioceseNavigation /><section className="py-20 sm:py-28"><Container className="grid gap-12 lg:grid-cols-[1.05fr_.95fr]"><AskPriestForm /><div><SectionTitle eyebrow="Հաճախ տրվող հարցեր" title="Հրապարակված պատասխաններ" /> <div className="mt-8 grid gap-4">{data?.map((item) => <article className="border border-gold/25 bg-parchment/80 p-6" key={item.id}><p className="text-xs font-bold uppercase tracking-[0.16em] text-royal">{item.category}</p><h3 className="mt-3 font-display text-xl font-bold text-episcopal">{item.question}</h3><p className="mt-4 text-sm leading-7 text-ink/60">{item.answer}</p></article>)}</div></div></Container></section></>;
}
