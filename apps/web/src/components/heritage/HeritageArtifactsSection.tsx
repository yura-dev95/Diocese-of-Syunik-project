import { Eye, Images } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import { AnimatedCard } from '../common/AnimatedCard';
import { Container } from '../common/Container';
import { SectionTitle } from '../common/SectionTitle';

const artifacts = [
  {
    src: '/images/uploads/artifacts/artifact1.jpg',
    title: 'Պաշտպանություն և հոգևոր իշխանություն',
    description: 'Վահան, խույր և թեմի հոգևոր իշխանության խորհրդանշաններ՝ ներկայացված միասնական նշանային համակարգում։',
  },
  {
    src: '/images/uploads/artifacts/artifact2.jpg',
    title: 'Սուրբ Հոգին և լույսը',
    description: 'Թեմի խորհրդանիշում Սուրբ Հոգու և լուսարձակ ճառագայթների պատկերային մեկնաբանություն։',
  },
  {
    src: '/images/uploads/artifacts/artifact3.jpg',
    title: 'Տաթևի վանական համալիրը և Խուստուփ լեռը',
    description: 'Սյունյաց թեմի պատմական կենտրոնի, Տաթևի ժառանգության և լեռնաշխարհի տեսողական պատմություն։',
  },
  {
    src: '/images/uploads/artifacts/artifact4.jpg',
    title: 'Կենաց ծառը և հավերժությունը',
    description: 'Հայկական խաչի, կենաց ծառի և քրիստոնեական հավերժության խորհրդանշական շերտերը։',
  },
  {
    src: '/images/uploads/artifacts/artifact5.jpg',
    title: 'Գավազանները և եմիփորոնը',
    description: 'Եպիսկոպոսական իշխանության, հովվական ծառայության և հոգևոր առաջնորդության նշանները։',
  },
  {
    src: '/images/uploads/artifacts/artifact6.jpg',
    title: 'Նույնականացում և խորհրդանիշներ',
    description: 'Գրության, նռան պսակի և թեմական նշանների բացատրություն՝ որպես ինքնության և համայնքային հիշողության մաս։',
  },
  {
    src: '/images/uploads/artifacts/artifact7.jpg',
    title: 'Ներկայություն և տեսողական փոխհարաբերություն',
    description: 'Գունավոր և մոնոխրոմ տարբերակների համադրություն՝ թեմի նշանի կիրառման և ճանաչելիության համար։',
  },
];

export function HeritageArtifactsSection() {
  const { localize } = useI18n();

  return (
    <section className="bg-parchment py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Խորհրդանիշների լեզու"
            title="Սյունյաց թեմի նշանների պատկերային մեկնաբանություն"
            description="Թեմի զինանշանի տարրերը ներկայացնող պատկերներ՝ պահված հանգիստ, թանգարանային և ընթեռնելի ձևաչափով։"
          />
          <div className="flex items-center gap-3 rounded-md border border-[#bd9754] bg-[#bd9754] px-4 py-3 text-sm font-semibold text-white shadow-sm">
            <Images className="size-5 text-white" />
            {localize('7 պատկեր')}
          </div>
        </div>

        <div className="mt-12 grid gap-6">
          {artifacts.map((artifact, index) => (
            <AnimatedCard
              className="group overflow-hidden rounded-md border border-gold/25 bg-parchment/90 shadow-sm shadow-episcopal/5 transition duration-500 hover:-translate-y-1 hover:bg-white/65 hover:shadow-sacred"
              key={artifact.src}
            >
              <div className="grid gap-0 xl:grid-cols-[minmax(0,1.45fr)_minmax(22rem,.55fr)]">
                <a
                  className="focus-ring block bg-[#f5ecd7]"
                  href={artifact.src}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt={localize(artifact.title)}
                    className="h-full min-h-64 w-full object-contain"
                    loading="lazy"
                    src={artifact.src}
                  />
                </a>
                <div className="flex flex-col justify-between border-t border-gold/20 p-6 sm:p-8 xl:border-l xl:border-t-0">
                  <div>
                    <p className="font-display text-5xl text-gold/30">0{index + 1}</p>
                    <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-episcopal sm:text-3xl">
                      {localize(artifact.title)}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-ink/60">
                      {localize(artifact.description)}
                    </p>
                  </div>
                  <a
                    className="focus-ring mt-8 inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-royal transition hover:text-episcopal"
                    href={artifact.src}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Eye className="size-4" />
                    {localize('Դիտել ամբողջ չափով')}
                  </a>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
