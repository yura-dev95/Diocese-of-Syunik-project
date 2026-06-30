import { HeartHandshake, Landmark, Mountain } from 'lucide-react';

export const homePillars = [
  {
    icon: Landmark,
    title: 'Պահպանել ժառանգությունը',
    text: 'Սրբավայրերը, ձեռագրերն ու պատմական հիշողությունը փոխանցել գալիք սերունդներին։',
    href: '/heritage',
  },
  {
    icon: HeartHandshake,
    title: 'Ծառայել մարդուն',
    text: 'Լինել մարդկանց կողքին՝ հավատքով, խնամքով և արժանապատիվ աջակցությամբ։',
    href: '/social-impact',
  },
  {
    icon: Mountain,
    title: 'Միավորել Սյունիքը',
    text: 'Ստեղծել կենդանի կապ համայնքների, ուխտավորների և աշխարհասփյուռ հայության միջև։',
    href: '/diocese',
  },
];

export const homeStats = [
  { value: '17', label: 'դարերի ժառանգություն' },
  { value: '40+', label: 'սրբավայր և եկեղեցի' },
  { value: '12', label: 'համայնքային ծրագիր' },
];

export const currentSocialProgram = {
  title: 'Տուն՝ սահմանամերձ ընտանիքներին',
  description: 'Միասին օգնում ենք Սյունիքի սահմանամերձ ընտանիքներին ունենալ ապահով, տաք և արժանապատիվ ձմեռ։',
  raised: 7_680_000,
  goal: 12_000_000,
  families: 48,
};

export const latestPodcast = {
  series: 'Սյունյաց շունչ',
  title: 'Տաթևի լռությունը. ինչպե՞ս լսել աղոթքը',
  description: 'Զրույց հոգևոր լռության, վանական կյանքի և առօրյայում խաղաղություն գտնելու մասին։',
  episode: 'Թողարկում 18',
  duration: '28։42',
  publishedAt: 'Այսօր',
};
