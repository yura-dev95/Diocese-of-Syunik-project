import { MapPin } from 'lucide-react';
import { PageHero } from '../common/PageHero';

export function HeritageHero() {
  return (
    <PageHero
      eyebrow="Սյունյաց սրբավայրերը"
      title="Ժառանգություն, որ շարունակում է խոսել"
      description="Բացահայտեք Սյունյաց աշխարհի վանքերը, եկեղեցիներն ու դարերի աղոթքը պահպանող սրբավայրերը։"
      imageUrl="https://images.unsplash.com/photo-1571687949921-1306bfb24b72?auto=format&fit=crop&w=2200&q=85"
      icon={MapPin}
    />
  );
}
