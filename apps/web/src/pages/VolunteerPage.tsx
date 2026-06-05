import { Container } from '../components/common/Container';
import { SectionTitle } from '../components/common/SectionTitle';
import { SocialNavigation } from '../components/social/SocialNavigation';
import { VolunteerForm } from '../components/social/VolunteerForm';

export function VolunteerPage() { return <><div className="bg-forest py-20 sm:py-28"><Container><SectionTitle eyebrow="Ժամանակ և հոգատարություն" title="Դարձեք կամավոր" description="Ձեր գիտելիքը, ժամանակը և ներկայությունը կարող են իրական փոփոխություն բերել մարդկանց կյանքում։" light /></Container></div><SocialNavigation /><section className="py-20 sm:py-28"><Container className="max-w-4xl"><VolunteerForm /></Container></section></>; }
