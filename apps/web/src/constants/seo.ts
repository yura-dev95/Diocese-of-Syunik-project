export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
}

const defaultDescription =
  'Official public platform of the Diocese of Syunik: heritage, clergy, spiritual life, social service, pilgrimage guidance, news, and contact information.';

export const defaultSeo: SeoConfig = {
  title: 'Diocese of Syunik',
  description: defaultDescription,
  image: '/og-syunik-diocese.jpg',
};

export const seoByPath: Array<{ match: RegExp; seo: SeoConfig }> = [
  { match: /^\/$/, seo: { title: 'Diocese of Syunik | Faith, Heritage, Service', description: defaultDescription } },
  { match: /^\/heritage/, seo: { title: 'Heritage & History | Diocese of Syunik', description: 'Explore Syunik monasteries, churches, chapels, historic sanctuaries, maps, and the digital library.' } },
  { match: /^\/diocese/, seo: { title: 'Diocese & Clergy | Diocese of Syunik', description: 'Learn about the Diocese, its connection with Holy Etchmiadzin, the Diocesan Primate, clergy, documents, and Ask a Priest.' } },
  { match: /^\/social-impact/, seo: { title: 'Social Impact | Diocese of Syunik', description: 'Current social programs, transparency, donation intent flow, volunteering, success stories, and donor honor.' } },
  { match: /^\/spiritual-life/, seo: { title: 'Spiritual Life & Community | Diocese of Syunik', description: 'Prayer library, Bible search, saints, feast calendar, sacraments, sermons, choirs, and Syunyats Shunch.' } },
  { match: /^\/pilgrim-guide/, seo: { title: "Pilgrim's Guide | Diocese of Syunik", description: 'Practical pilgrimage routes, liturgy schedules, useful contacts, downloadable maps, and holy place etiquette.' } },
  { match: /^\/news-contact/, seo: { title: 'News & Contact | Diocese of Syunik', description: 'News, announcements, FAQ, contact form, and public information from the Diocese of Syunik.' } },
  { match: /^\/admin/, seo: { title: 'Admin Panel | Diocese of Syunik', description: 'Protected administration area for Diocese of Syunik content management.' } },
];

export function resolveSeo(pathname: string) {
  return seoByPath.find((item) => item.match.test(pathname))?.seo ?? defaultSeo;
}
