import CallToActionBlock from '@/components/marketing/global/call-to-action-block';
import MarketingFooter from '@/components/marketing/global/footer';
import MarketingNavigation from '@/components/marketing/global/navigation';
import OpenSourceBlock from '@/components/marketing/global/open-source/open-source-block';
import SocialLinks from '@/components/marketing/global/socials';
import FeaturesBentoGrid from '@/components/marketing/homepage/features/features-bento-grid';
import HomepageHero from '@/components/marketing/homepage/hero/hero';
import HomepageLargeText from '@/components/marketing/homepage/large-text';

import posthog from 'posthog-js';

export default async function AuthedPage() {
  posthog.capture('page_view', { page_name: 'Landing Page' });

  return (
    <div className="overflow-x-hidden">
      <div className="z-30">
        {process.env.NEXT_PUBLIC_ENV === 'development' && (
          <MarketingNavigation />
        )}
        <div className="container">
          <HomepageHero />
          <FeaturesBentoGrid />
          <HomepageLargeText />
          <OpenSourceBlock />
          <CallToActionBlock title="Master Coding in Weeks, Not Years" />
          {process.env.NEXT_PUBLIC_ENV === 'development' ? (
            <MarketingFooter />
          ) : (
            <div className="w-full flex items-center justify-center py-5">
              <SocialLinks />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
