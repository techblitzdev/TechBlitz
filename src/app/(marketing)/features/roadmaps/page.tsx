import FeatureRoadmapHeroBlock from '@/components/marketing/features/roadmap/roadmap-hero';
import CallToActionBlock from '@/components/marketing/global/call-to-action-block';
import HomepageLargeText from '@/components/marketing/large-text';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmaps | techblitz',
  description:
    'Create your own progression path with our AI powered roadmaps, designed to help you grow as a developer.'
};

export default function FeatureDailyQuestionPage() {
  return (
    <div className="container">
      <FeatureRoadmapHeroBlock />

      <CallToActionBlock
        title="The smarter way to stay on top of tech"
        description="Create your own progression path with our AI powered roadmaps, designed to help you grow as a developer."
      />
    </div>
  );
}
