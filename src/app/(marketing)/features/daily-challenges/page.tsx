import FeatureDailyChallengeHero from '@/components/marketing/features/daily-challenge/hero/daily-challenge-hero';
import CallToActionBlock from '@/components/marketing/global/call-to-action-block';

export default function FeatureDailyQuestionPage() {
  return (
    <div className="container">
      <FeatureDailyChallengeHero />
      <CallToActionBlock
        title="The smarter way to stay on top of tech"
        description="Create your own progression path with our AI powered roadmaps, designed to help you grow as a developer."
      />
    </div>
  );
}
