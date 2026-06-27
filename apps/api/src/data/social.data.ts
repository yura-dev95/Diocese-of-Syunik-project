import type { DonorHonorRecord, SocialProgramRecord, SuccessStoryRecord } from '../types/social.types.js';

export const socialPrograms: SocialProgramRecord[] = [
  {
    id: 'program-warm-home',
    slug: 'warm-home-border-families',
    title: 'Տուն՝ սահմանամերձ ընտանիքներին',
    summary: 'Ջեռուցման և կենցաղային աջակցության ծրագիր Սյունիքի սահմանամերձ ընտանիքների համար։',
    description: 'Ծրագիրը տրամադրում է վառելիք, ջեռուցման անվտանգ սարքեր և անհրաժեշտ կենցաղային աջակցություն՝ ընտանիքների արժանապատիվ ու տաք ձմեռը ապահովելու համար։',
    coverUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=85',
    location: 'Սյունիքի սահմանամերձ համայնքներ',
    beneficiaries: 48,
    startsAt: '2026-01-10',
    endsAt: '2026-12-20',
    isFeatured: true,
    goalAmount: 12_000_000,
    raisedAmount: 7_680_000,
    spending: [
      { label: 'Ջեռուցման միջոցներ', amount: 4_200_000, color: '#a83638' },
      { label: 'Վառելիք', amount: 2_300_000, color: '#bd9754' },
      { label: 'Տրանսպորտ և առաքում', amount: 780_000, color: '#256343' },
      { label: 'Պահուստ', amount: 400_000, color: '#561731' },
    ],
  },
  {
    id: 'program-children-learning',
    slug: 'children-learning-centers',
    title: 'Կրթական կենտրոններ երեխաների համար',
    summary: 'Դասապատրաստման, հոգևոր կրթության և ստեղծագործական խմբակների հասանելի միջավայր։',
    description: 'Թեմի համայնքային կենտրոններում երեխաները ստանում են դասապատրաստման աջակցություն, մասնակցում մշակութային և ստեղծագործական ծրագրերի։',
    coverUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=85',
    location: 'Գորիս և Կապան',
    beneficiaries: 180,
    startsAt: '2026-02-01',
    isFeatured: false,
    goalAmount: 18_000_000,
    raisedAmount: 10_800_000,
    spending: [
      { label: 'Կրթական նյութեր', amount: 4_100_000, color: '#a83638' },
      { label: 'Ուսուցիչներ', amount: 5_300_000, color: '#bd9754' },
      { label: 'Սնունդ', amount: 1_400_000, color: '#256343' },
    ],
  },
  {
    id: 'program-elder-care',
    slug: 'elder-care-visits',
    title: 'Հոգատար այցեր տարեցներին',
    summary: 'Կամավորների և հոգևորականների կանոնավոր այցելություններ միայնակ տարեցներին։',
    description: 'Ծրագիրը միավորում է տնային այցելությունները, սննդային աջակցությունը և հոգևոր խնամքը Սյունիքի միայնակ տարեցների համար։',
    coverUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=85',
    location: 'Սյունիքի գյուղական համայնքներ',
    beneficiaries: 95,
    startsAt: '2025-09-01',
    isFeatured: false,
    goalAmount: 9_000_000,
    raisedAmount: 6_300_000,
    spending: [
      { label: 'Սննդային փաթեթներ', amount: 3_700_000, color: '#a83638' },
      { label: 'Առողջապահական աջակցություն', amount: 1_600_000, color: '#bd9754' },
      { label: 'Տրանսպորտ', amount: 1_000_000, color: '#256343' },
    ],
  },
];

export const successStories: SuccessStoryRecord[] = [
  { id: 'story-1', slug: 'a-warm-winter-in-tegh', title: 'Ջերմ ձմեռ Տեղ համայնքում', summary: 'Տասներկու ընտանիք ստացել է անվտանգ ջեռուցման սարք և վառելիքի ամբողջ ձմեռային պաշար։', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85', impactLabel: '12 ընտանիք', programSlug: 'warm-home-border-families' },
  { id: 'story-2', slug: 'learning-together', title: 'Սովորում ենք միասին', summary: 'Գորիսի կենտրոնի աշակերտները ստեղծեցին իրենց առաջին համայնքային ցուցահանդեսը։', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85', impactLabel: '64 երեխա', programSlug: 'children-learning-centers' },
  { id: 'story-3', slug: 'visits-that-matter', title: 'Այցեր, որոնք փոխում են առօրյան', summary: 'Կամավորների թիմը շաբաթական այցելում է հեռավոր գյուղերի միայնակ տարեցներին։', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85', impactLabel: '95 տարեց', programSlug: 'elder-care-visits' },
];

export const donorHonors: DonorHonorRecord[] = [
  { id: 'honor-1', displayName: 'Սյունյաց բարեկամներ հիմնադրամ', honorLevel: 'Ոսկե աջակից', message: 'Տարիներ շարունակ թեմի սոցիալական ծրագրերի կողքին։' },
  { id: 'honor-2', displayName: 'Անանուն բարերար', honorLevel: 'Արծաթե աջակից' },
  { id: 'honor-3', displayName: 'Գորիսի համայնքային խումբ', honorLevel: 'Համայնքի բարեկամ', message: 'Կամավորական և նյութական մշտական աջակցություն։' },
  { id: 'honor-4', displayName: 'Սյունեցի ընտանիքներ', honorLevel: 'Համայնքի բարեկամ' },
];
