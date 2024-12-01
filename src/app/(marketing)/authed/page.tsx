import MarketingFooter from '@/components/marketing/global/footer';
import MarketingNavigation from '@/components/marketing/global/navigation';
import HomepageHero from '@/components/marketing/homepage/hero';
import { useUserServer } from '@/hooks/useUserServer';
import { redirect } from 'next/navigation';

export default async function AuthedPage() {
  const user = useUserServer();
  if (!user) {
    return redirect('/');
  }

  return (
    <div className="mt-6 z-30 container">
      <MarketingNavigation />
      <HomepageHero />
      <MarketingFooter />
    </div>
  );
}
