import { Container } from '../components/common/Container';
import { SectionTitle } from '../components/common/SectionTitle';
import { DioceseNavigation } from '../components/clergy/DioceseNavigation';
import { DocumentsArchive } from '../components/clergy/DocumentsArchive';

export function DocumentsPage() {
  return <><div className="bg-episcopal py-20 sm:py-28"><Container><SectionTitle eyebrow="Պաշտոնական արխիվ" title="Փաստաթղթեր և հաշվետվություններ" description="Թեմի պաշտոնական փաստաթղթերը, կանոնադրությունները, ուղեցույցներն ու հրապարակային հաշվետվությունները։" light /></Container></div><DioceseNavigation /><section className="py-20 sm:py-28"><Container><DocumentsArchive /></Container></section></>;
}
