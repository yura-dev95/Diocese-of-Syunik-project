import type { ChoirRecord, FeastDayRecord, MediaItemRecord, PrayerRecord, SacramentGuideRecord, SaintRecord } from '../types/spiritual.types.js';

const tatevImage = '/images/uploads/tatev.jpg';

export const prayers: PrayerRecord[] = [
  { id: 'prayer-1', slug: 'morning-prayer', title: 'Առավոտյան աղոթք', category: 'Օրվա աղոթքներ', summary: 'Օրը Աստծո ներկայությամբ սկսելու աղոթք։', content: 'Տե՛ր, առաջնորդիր իմ քայլերը այս նոր օրվա ընթացքում և շնորհիր խաղաղություն իմ սրտին։' },
  { id: 'prayer-2', slug: 'family-prayer', title: 'Աղոթք ընտանիքի համար', category: 'Ընտանիք', summary: 'Օրհնության և միաբանության աղոթք ընտանիքի համար։', content: 'Օրհնի՛ր, Տե՛ր, մեր տունը, պահպանի՛ր սիրո և ներողամտության մեջ։' },
  { id: 'prayer-3', slug: 'healing-prayer', title: 'Աղոթք բժշկության համար', category: 'Առողջություն', summary: 'Մխիթարության և զորության խնդրանք հիվանդության ժամանակ։', content: 'Բժշկի՛ր մեր հոգին և մարմինը, Տե՛ր, և շնորհիր համբերություն ու հույս։' },
  { id: 'prayer-4', slug: 'evening-prayer', title: 'Երեկոյան աղոթք', category: 'Օրվա աղոթքներ', summary: 'Շնորհակալություն անցած օրվա և խաղաղ գիշերվա համար։', content: 'Գոհանում եմ Քեզանից այս օրվա համար. պահպանի՛ր մեզ գիշերվա խաղաղության մեջ։' },
];
export const saints: SaintRecord[] = [
  { id: 'saint-1', slug: 'saint-gregory-illuminator', name: 'Սուրբ Գրիգոր Լուսավորիչ', biography: 'Հայոց առաջին Հայրապետը և Հայաստանի լուսավորիչը։', feastDate: '06-27', imageUrl: '/images/uploads/surb-grigor-lusavorich.jpeg', patronOf: 'Հայոց աշխարհի' },
  { id: 'saint-2', slug: 'saint-mesrop-mashtots', name: 'Սուրբ Մեսրոպ Մաշտոց', biography: 'Հայոց գրերի ստեղծողը, վարդապետ և լուսավորիչ։', feastDate: '02-17', imageUrl: '/images/uploads/targmanichner.webp', patronOf: 'Կրթության և գրերի' },
  { id: 'saint-3', slug: 'saint-tatevos', name: 'Սուրբ Թադեոս առաքյալ', biography: 'Հայաստանում քրիստոնեություն քարոզած առաքյալներից։', feastDate: '12-05', imageUrl: '/images/uploads/tadeos-arakyal.jpg' },
];
export const feastDays: FeastDayRecord[] = [
  { id: 'feast-1', slug: 'holy-nativity', title: 'Սուրբ Ծնունդ և Աստվածահայտնություն', description: 'Մեր Տեր Հիսուս Քրիստոսի Ծննդյան և Մկրտության տոնը։', feastDate: '01-06', isMovable: false },
  { id: 'feast-2', slug: 'holy-easter', title: 'Սուրբ Հարություն', description: 'Քրիստոսի հրաշափառ Հարության տոնը։', feastDate: 'MOVABLE', isMovable: true },
  { id: 'feast-3', slug: 'transfiguration', title: 'Պայծառակերպություն', description: 'Վարդավառ՝ Տիրոջ Պայծառակերպության տոնը։', feastDate: 'MOVABLE', isMovable: true },
  { id: 'feast-4', slug: 'exaltation-cross', title: 'Խաչվերաց', description: 'Սուրբ Խաչի բարձրացման տոնը։', feastDate: '09-14', isMovable: false },
];
export const sacramentGuides: SacramentGuideRecord[] = [
  { id: 'guide-1', slug: 'baptism', title: 'Մկրտություն', summary: 'Քրիստոնեական կյանքի սկիզբը և Եկեղեցու անդամ դառնալու խորհուրդը։', content: 'Մկրտության խորհրդով մարդը վերածնվում է ջրից և Հոգուց։', preparation: ['Կապ հաստատել ծխական քահանայի հետ', 'Ընտրել կնքահայր', 'Մասնակցել նախապատրաստական զրույցին'] },
  { id: 'guide-2', slug: 'wedding', title: 'Պսակադրություն', summary: 'Ընտանիքի ստեղծման և ամուսնական միության օրհնության խորհուրդը։', content: 'Պսակադրությամբ ամուսինները ստանում են Աստծո օրհնությունը միասնական կյանքի համար։', preparation: ['Նախապես դիմել եկեղեցի', 'Ներկայացնել անհրաժեշտ փաստաթղթերը', 'Մասնակցել հոգևոր զրույցին'] },
  { id: 'guide-3', slug: 'confession', title: 'Խոստովանություն', summary: 'Ապաշխարության, ներողության և հոգևոր նորոգության ճանապարհ։', content: 'Խոստովանությունը անկեղծ վերադարձ է դեպի Աստծո ողորմությունը։', preparation: ['Քննել սեփական խիղճը', 'Աղոթքով պատրաստվել', 'Անկեղծորեն զրուցել հոգևորականի հետ'] },
];
export const choirs: ChoirRecord[] = [
  { id: 'choir-1', slug: 'syunik-diocese-choir', name: 'Սյունյաց թեմի երգչախումբ', description: 'Թեմական տոներին և Սուրբ Պատարագներին ծառայող երգչախումբ։', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85', conductor: 'Աննա Սարգսյան', location: 'Գորիս' },
  { id: 'choir-2', slug: 'tatev-children-choir', name: 'Տաթև մանկական երգչախումբ', description: 'Հոգևոր երգի և հայկական երաժշտական ժառանգության կրթական խումբ։', imageUrl: tatevImage, conductor: 'Մարիամ Ավետիսյան', location: 'Տաթև' },
];
export const mediaItems: MediaItemRecord[] = [
  { id: 'media-1', slug: 'silence-of-tatev', title: 'Տաթևի լռությունը. ինչպե՞ս լսել աղոթքը', description: '«Սյունյաց շունչ» զրույց հոգևոր լռության մասին։', mediaType: 'PODCAST', coverUrl: tatevImage, duration: '28։42', publishedAt: '2026-06-01' },
  { id: 'media-2', slug: 'light-of-hope-sermon', title: 'Հույսի լույսը', description: 'Կիրակնօրյա քարոզ՝ դժվար ժամանակներում հույսը պահպանելու մասին։', mediaType: 'SERMON', coverUrl: 'https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1200&q=85', duration: '18։15', publishedAt: '2026-05-25' },
  { id: 'media-3', slug: 'surp-surb-sharakan', title: 'Սուրբ, Սուրբ', description: 'Սուրբ Պատարագի շարական՝ Սյունյաց թեմի երգչախմբի կատարմամբ։', mediaType: 'SHARAKAN', coverUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85', duration: '06։18', publishedAt: '2026-05-10', choirSlug: 'syunik-diocese-choir' },
  { id: 'media-4', slug: 'one-day-at-tatev', title: 'Մեկ օր Տաթևում', description: 'Տեսապատում վանական համալիրի առօրյայից։', mediaType: 'VLOG', coverUrl: tatevImage, duration: '12։30', publishedAt: '2026-04-18' },
  { id: 'media-5', slug: 'morning-hymn', title: 'Առավոտ լուսո', description: 'Հոգևոր երգի ձայնագրություն։', mediaType: 'CHOIR_RECORDING', coverUrl: tatevImage, duration: '04։52', publishedAt: '2026-03-14', choirSlug: 'tatev-children-choir' },
];
