import { DailyGospelSection } from '../components/home/DailyGospelSection';
import { HomeHero } from '../components/home/HomeHero';
import { MissionSection } from '../components/home/MissionSection';
import { PrimateMessageSection } from '../components/home/PrimateMessageSection';
import { SocialProgramSection } from '../components/home/SocialProgramSection';
import { SyunyatsShunchSection } from '../components/home/SyunyatsShunchSection';

export function HomePage() {
  return (
    <>
      <HomeHero />
      <MissionSection />
      <PrimateMessageSection />
      <SocialProgramSection />
      <DailyGospelSection />
      <SyunyatsShunchSection />
    </>
  );
}
