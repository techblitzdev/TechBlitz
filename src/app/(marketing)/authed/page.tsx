import CallToActionBlock from '@/components/marketing/global/call-to-action-block';
import MarketingFooter from '@/components/marketing/global/footer';
import MarketingNavigation from '@/components/marketing/global/navigation';
import OpenSourceBlock from '@/components/marketing/global/open-source-block';
import FeaturesBentoGrid from '@/components/marketing/homepage/features/features-bento-grid';
import HomepageHero from '@/components/marketing/homepage/hero/hero';
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
      <div className="z-30">
        <MarketingNavigation />
        <div className="container">
          <HomepageHero />
          <FeaturesBentoGrid />
          <HomepageLargeText />
          <OpenSourceBlock />
          <CallToActionBlock title="Master Coding Skills in Weeks, Not Years" />
          <MarketingFooter />
        </div>
      </div>
    </div>
  );
}
