import { HeartHandshake } from 'lucide-react';
import { Button } from '../common/Button';
import { PageHero } from '../common/PageHero';

export function SocialHero() {
  return (
    <PageHero
      eyebrow="Հավատք՝ գործով"
      title="Սոցիալական առաքելություն"
      description="Միասին ստեղծում ենք արժանապատիվ, հոգատար և հույսով լի համայնքներ Սյունյաց աշխարհում։"
      imageUrl="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2200&q=85"
      icon={HeartHandshake}
    >
      <Button href="/social-impact/programs" variant="light">Աջակցել ծրագրին</Button>
      <Button href="/social-impact/volunteer" className="border-parchment/30 text-parchment hover:bg-parchment/10" variant="secondary">Դառնալ կամավոր</Button>
    </PageHero>
  );
}
