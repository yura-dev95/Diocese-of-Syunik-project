import { MapPin } from 'lucide-react';
import { PageHero } from '../common/PageHero';

export function HeritageHero() {
  return (
    <PageHero
      eyebrow="Սյունյաց սրբավայրերը"
      title="Ժառանգություն, որ շարունակում է խոսել"
      description="Բացահայտեք Սյունյաց աշխարհի վանքերը, եկեղեցիներն ու դարերի աղոթքը պահպանող սրբավայրերը։"
      imageUrl="/images/uploads/tatev.jpg"
      icon={MapPin}
    />
  );
}
