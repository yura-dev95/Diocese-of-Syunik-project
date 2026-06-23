import { Cross } from 'lucide-react';
import { PageHero } from '../common/PageHero';

export function DioceseHero() {
  return (
    <PageHero
      eyebrow="Հոգևոր առաջնորդություն"
      title="Սյունյաց թեմ և հոգևորականներ"
      description="Մայր Աթոռ Սուրբ Էջմիածնի օրհնությամբ՝ հավատքի, ծառայության և համայնքային կյանքի կենդանի կենտրոն Սյունյաց աշխարհում։"
      imageUrl="https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=2200&q=85"
      icon={Cross}
    />
  );
}
