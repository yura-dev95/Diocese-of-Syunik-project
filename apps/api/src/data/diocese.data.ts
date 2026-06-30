import type { ClergyRecord, OfficialDocumentRecord, PublicQuestionRecord } from '../types/clergy.types.js';

const tatevImage = '/images/uploads/tatev.jpg';
const fatherMikayelImage = '/images/uploads/father-mikayel.jpeg';
const terAharonImage = '/images/uploads/ter-aharon.jpg';

export const clergyMembers: ClergyRecord[] = [
  {
    id: 'clergy-primate',
    slug: 'diocesan-primate',
    fullName: 'Գերաշնորհ Տ. Մակար եպիսկոպոս',
    title: 'Սյունյաց թեմի առաջնորդ',
    biography: 'Սյունյաց թեմի առաջնորդը ծառայում է թեմի հոգևոր կյանքի զորացմանը, համայնքների միավորմանը և պատմական ժառանգության պահպանությանը։ Նրա առաջնորդությամբ թեմը զարգացնում է կրթական, երիտասարդական և սոցիալական ծրագրեր։',
    imageUrl: '/images/uploads/makar-episcopos.jpg',
    ordinationYear: 2001,
    education: 'Գևորգյան հոգևոր ճեմարան, աստվածաբանական բարձրագույն կրթություն',
    ministryFocus: 'Հովվական առաջնորդություն, կրթություն և սոցիալական ծառայություն',
    publicEmail: 'office@syunikdiocese.am',
    isPrimate: true,
    church: { slug: 'saint-gregory-goris', name: 'Սուրբ Գրիգոր Լուսավորիչ եկեղեցի', settlement: 'Գորիս' },
  },
  {
    id: 'clergy-tatev',
    slug: 'father-mikayel-tatev',
    fullName: 'Հոգեշնորհ Տ. Միքայել վարդապետ',
    title: 'Տաթևի վանքի վանահայր',
    biography: 'Ծառայում է Տաթևի վանական համալիրում՝ առաջնորդելով վանական համայնքի հոգևոր և ուխտավորների ընդունելության առաքելությունը։',
    imageUrl: fatherMikayelImage,
    ordinationYear: 2010,
    ministryFocus: 'Վանական կյանք և ուխտավորների հոգևոր խնամք',
    isPrimate: false,
    church: { slug: 'tatev-monastery', name: 'Տաթևի վանական համալիր', settlement: 'Տաթև գյուղ' },
  },
  {
    id: 'clergy-goris',
    slug: 'father-narek-goris',
    fullName: 'Տեր Ահարոն քահանա Մելքումյան',
    title: 'Ծխական քահանա',
    biography: 'Ծառայում է Գորիսի համայնքին՝ հոգևոր խնամքի, երիտասարդական աշխատանքի և ընտանեկան խորհրդատվության ոլորտներում։',
    imageUrl: terAharonImage,
    ordinationYear: 2015,
    ministryFocus: 'Ընտանիքների և երիտասարդների հոգևոր խնամք',
    isPrimate: false,
    church: { slug: 'saint-gregory-goris', name: 'Սուրբ Գրիգոր Լուսավորիչ եկեղեցի', settlement: 'Գորիս' },
  },
];

export const officialDocuments: OfficialDocumentRecord[] = [
  { id: 'doc-1', slug: 'diocese-charter', title: 'Սյունյաց թեմի կանոնադրություն', description: 'Թեմի առաքելությունը, կառավարման սկզբունքները և ծառայության ուղղությունները։', documentType: 'Կանոնադրություն', documentDate: '2025-02-10', fileUrl: '/documents/diocese-charter.pdf' },
  { id: 'doc-2', slug: 'annual-report-2025', title: '2025 թվականի տարեկան հաշվետվություն', description: 'Թեմի հոգևոր, սոցիալական և մշակութային գործունեության ամփոփ հաշվետվություն։', documentType: 'Հաշվետվություն', documentDate: '2026-03-01', fileUrl: '/documents/annual-report-2025.pdf' },
  { id: 'doc-3', slug: 'pilgrimage-guideline', title: 'Ուխտագնացությունների կազմակերպման ուղեցույց', description: 'Թեմի սրբավայրերում կազմակերպված ուխտագնացությունների պաշտոնական ուղեցույց։', documentType: 'Ուղեցույց', documentDate: '2025-05-18', fileUrl: '/documents/pilgrimage-guideline.pdf' },
];

export const publicQuestions: PublicQuestionRecord[] = [
  { id: 'public-q-1', question: 'Ինչպե՞ս պատրաստվել Սուրբ Պատարագին մասնակցելուն։', answer: 'Խորհուրդ է տրվում գալ ժամանակին, աղոթական տրամադրությամբ և հնարավորության դեպքում նախապես ծանոթանալ օրվա ընթերցվածքներին։', category: 'Հոգևոր կյանք', answeredAt: '2026-05-20' },
  { id: 'public-q-2', question: 'Կարո՞ղ եմ եկեղեցի այցելել, եթե առաջին անգամ եմ գալիս։', answer: 'Այո։ Եկեղեցու դռները բաց են յուրաքանչյուրի առաջ։ Կարող եք դիմել հոգևորականին կամ եկեղեցու սպասավորին՝ հարցերի դեպքում։', category: 'Եկեղեցական կյանք', answeredAt: '2026-05-12' },
];
