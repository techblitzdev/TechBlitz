import MarketingFooter from '@/components/marketing/global/footer';
import MarketingNavigation from '@/components/marketing/global/navigation';
import FeaturesBentoGrid from '@/components/marketing/homepage/features/features-bento-grid';
import HomepageHero from '@/components/marketing/homepage/hero';
import HomepageLargeText from '@/components/marketing/homepage/large-text';
import { useUserServer } from '@/hooks/useUserServer';
import { redirect } from 'next/navigation';

export default async function AuthedPage() {
  const user = useUserServer();
  if (!user) {
    return redirect('/');
  }

  return (
    <div className="overflow-x-hidden">
      <div className="mt-6 z-30 container">
        <MarketingNavigation />
        <HomepageHero />
        <FeaturesBentoGrid />
        <HomepageLargeText />
        <MarketingFooter />
      </div>
    </div>
  );
}
