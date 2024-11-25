import MarketingNavigation from '@/components/marketing/navigation';
import { useUserServer } from '@/hooks/useUserServer';
import { redirect } from 'next/navigation';

export default async function AuthedPage() {
  const user = useUserServer();
  if (!user) {
    return redirect('/');
  }

  return (
    <div className="container mt-6 z-30">
      <MarketingNavigation />
    </div>
  );
}
