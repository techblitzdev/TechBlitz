import Logo from '@/components/ui/logo';
import StarsBackground from '@/components/ui/stars-background';

import Link from 'next/link';
import { UserOnboardingContextProvider } from '@/contexts/onboarding-context';
import OnboardingForm from '@/components/app/onboarding/onboarding-form';
import { useUserServer } from '@/hooks/use-user-server';

export const metadata = {
  title: 'Onboarding | TechBlitz',
};

export default async function OnboardingPage() {
  const [user] = await Promise.all([useUserServer()]);

  return (
    <div className="relative container">
      <StarsBackground className="-z-10" />
      <div className="flex flex-col min-h-screen">
        <Link href="/" className="pl-0 md:pl-8 p-8 pb-0 flex justify-center">
          <Logo />
        </Link>
        <UserOnboardingContextProvider serverUser={user}>
          <div className="flex-1 flex items-center justify-center">
            <OnboardingForm />
          </div>
        </UserOnboardingContextProvider>
      </div>
    </div>
  );
}
