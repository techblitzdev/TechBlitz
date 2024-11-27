import MarketingFooter from '@/components/marketing/footer';
import MarketingNavigation from '@/components/marketing/navigation';
import { useUserServer } from '@/hooks/useUserServer';
import { redirect } from 'next/navigation';

export default async function AuthedPage() {
  const user = useUserServer();
  if (!user) {
    return redirect('/');
  }

  return (
    <div className="mt-6 z-30">
      <MarketingNavigation />
      <div className="h-[90dvh]"></div>
      <MarketingFooter />
    </div>
  );
}
