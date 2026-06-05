import { DigitalLibraryPreview } from '../components/heritage/DigitalLibraryPreview';
import { FeaturedChurches } from '../components/heritage/FeaturedChurches';
import { HeritageHero } from '../components/heritage/HeritageHero';
import { HeritageNavigation } from '../components/heritage/HeritageNavigation';
import { HistoryTimeline } from '../components/heritage/HistoryTimeline';

export function HeritagePage() {
  return (
    <>
      <HeritageHero />
      <HeritageNavigation />
      <FeaturedChurches />
      <HistoryTimeline />
      <DigitalLibraryPreview />
    </>
  );
}
