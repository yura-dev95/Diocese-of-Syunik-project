import { CalendarDays, Map, MapPinned, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { PilgrimNavigation } from '../components/pilgrim/PilgrimNavigation';

const actions = [
  ['/pilgrim-guide/routes', 'Պլանավորել երթուղի', 'Մեկօրյա ուխտագնացություններ և ճանապարհի հստակ քայլեր։', Map],
  ['/pilgrim-guide/liturgy', 'Տեսնել ժամերգությունները', 'Պատարագների և ժամերգությունների ընթացիկ ժամանակացույց։', CalendarDays],
  ['/pilgrim-guide/contacts', 'Օգտակար կոնտակտներ', 'Գիշերակաց, տրանսպորտ և թեմական աջակցություն։', Phone],
  ['/pilgrim-guide/etiquette', 'Սրբավայրի վարքականոն', 'Կարճ և գործնական կանոններ այցելությունից առաջ։', ShieldCheck],
] as const;

export function PilgrimGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Ճանապարհ դեպի սրբավայրեր"
        title="Ուխտավորի ուղեցույց"
        description="Ամենակարևոր տեղեկությունը՝ երթուղուց մինչև պատարագի ժամ, պարզ և հասանելի մեկ տեղում։"
        imageUrl="https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?auto=format&fit=crop&w=2200&q=85"
        icon={MapPinned}
      />
      <PilgrimNavigation />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {actions.map(([to, title, text, Icon]) => (
              <Link
                className="focus-ring rounded-md border border-gold/25 bg-parchment/80 p-6 transition hover:bg-white/75 hover:shadow-sacred"
                key={to}
                to={to}
              >
                <Icon className="size-7 text-gold" />
                <h2 className="mt-6 font-display text-2xl font-bold text-episcopal">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink/60">{text}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
