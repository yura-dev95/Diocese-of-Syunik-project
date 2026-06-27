import { ArrowRight, BookOpen, FileText, ScrollText } from 'lucide-react';
import { AnimatedCard } from '../common/AnimatedCard';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { SectionTitle } from '../common/SectionTitle';
import { useI18n } from '../../i18n/I18nContext';

const items = [
  { icon: ScrollText, type: 'Ձեռագիր', title: 'Տաթևի դպրոցի ձեռագրական ժառանգությունը', meta: 'Թվայնացված հավաքածու' },
  { icon: BookOpen, type: 'Հին գիրք', title: 'Սյունյաց աշխարհի հոգևոր կենտրոնները', meta: 'Պատմական ուսումնասիրություն' },
  { icon: FileText, type: 'Գիտական հոդված', title: 'Սյունյաց ճարտարապետական դպրոցը', meta: 'PDF · 24 էջ' },
];

export function DigitalLibraryPreview() {
  const { localize } = useI18n();

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle eyebrow="Թվային գրադարան" title="Գիտելիք՝ բաց բոլորի համար" description="Ձեռագրեր, հին գրքեր և գիտական ուսումնասիրություններ՝ Սյունյաց հոգևոր ու մշակութային ժառանգության մասին։" />
          <Button href="/heritage/library" variant="secondary">Բացել գրադարանը</Button>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <AnimatedCard className="group border border-gold/25 bg-parchment/80 p-7 transition hover:bg-white/75 hover:shadow-sacred" key={item.title}>
              <item.icon className="size-8 text-royal" strokeWidth={1.4} />
              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{localize(item.type)}</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-episcopal">{localize(item.title)}</h3>
              <div className="mt-7 flex items-center justify-between border-t border-gold/20 pt-5 text-xs text-ink/50">
                <span>{localize(item.meta)}</span><ArrowRight className="size-4 text-royal transition group-hover:translate-x-1" />
              </div>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
