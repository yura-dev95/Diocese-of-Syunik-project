import { DigitalLibraryPreview } from '../components/heritage/DigitalLibraryPreview';
import { HeritageArtifactsSection } from '../components/heritage/HeritageArtifactsSection';
import { HeritageHero } from '../components/heritage/HeritageHero';
import { HeritageNavigation } from '../components/heritage/HeritageNavigation';
import { HistoryTimeline } from '../components/heritage/HistoryTimeline';

export function HeritagePage() {
  return (
    <>
      <HeritageHero />
      <HeritageNavigation />
      <HeritageArtifactsSection />
      <HistoryTimeline />
      <DigitalLibraryPreview />
    </>
  );
}
