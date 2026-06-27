import { BookOpen, CalendarDays, Mail, MapPin } from 'lucide-react';
import type { ClergyMember } from '../../types/diocese';
import { Button } from '../common/Button';
import { Container } from '../common/Container';

export function ClergyProfile({ member }: { member: ClergyMember }) {
  return (
    <>
      <section className="bg-[rgb(245_236_215/var(--tw-bg-opacity,1))] py-16 text-[#561731] sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-[10rem] border border-gold/30">
            <img alt={member.fullName} className="size-full object-cover opacity-85" src={member.imageUrl} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{member.title}</p>
            <h1 className="mt-5 font-display text-5xl font-bold text-[#561731] sm:text-7xl">{member.fullName}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#561731]/70">{member.ministryFocus}</p>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-[#561731]/65">
              {member.ordinationYear && <span className="flex items-center gap-2"><CalendarDays className="size-4 text-gold" />Ձեռնադրություն՝ {member.ordinationYear}</span>}
              {member.church && <span className="flex items-center gap-2"><MapPin className="size-4 text-gold" />{member.church.name}</span>}
            </div>
          </div>
        </Container>
      </section>
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <article>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-royal">Կենսագրություն և ծառայություն</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-episcopal">Հոգևոր ծառայություն՝ մարդկանց կողքին</h2>
            <p className="mt-7 max-w-3xl leading-8 text-ink/65">{member.biography}</p>
          </article>
          <aside className="space-y-4">
            {member.education && <div className="border border-gold/25 bg-parchment/80 p-6"><BookOpen className="size-6 text-royal" /><h3 className="mt-4 font-display text-xl font-bold text-episcopal">Կրթություն</h3><p className="mt-3 text-sm leading-7 text-ink/60">{member.education}</p></div>}
            <div className="bg-forest p-6 text-parchment"><Mail className="size-6 text-gold" /><h3 className="mt-4 font-display text-xl font-bold">Հոգևոր հարց ունե՞ք</h3><p className="mt-3 text-sm leading-7 text-parchment/65">Հարցը կարող եք ուղարկել նաև ամբողջությամբ անանուն։</p><Button className="mt-6 w-full" href="/diocese/ask-a-priest" variant="light">Հարցրու քահանային</Button></div>
          </aside>
        </Container>
      </section>
    </>
  );
}
