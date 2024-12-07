import CallToActionBlock from '@/components/marketing/global/call-to-action-block';
import MarketingFooter from '@/components/marketing/global/footer';
import OpenSourceBlock from '@/components/marketing/global/open-source/open-source-block';
import FeaturesBentoGrid from '@/components/marketing/homepage/features/features-bento-grid';
import HomepageHero from '@/components/marketing/homepage/hero/hero';
import HomepageLargeText from '@/components/marketing/homepage/large-text';

import posthog from 'posthog-js';

export default async function AuthedPage() {
  posthog.capture('page_view', { page_name: 'Landing Page' });

  return (
    <div className="overflow-x-hidden">
      <div className="z-30">
        <div className="container">
          <HomepageHero />
          <FeaturesBentoGrid />
          <HomepageLargeText />
          <OpenSourceBlock />
          <CallToActionBlock title="Master Coding in Weeks, Not Years" />
        </div>
      </div>
    </div>
  );
}
