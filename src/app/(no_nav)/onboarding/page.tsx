import Logo from '@/components/ui/logo';
import StarsBackground from '@/components/ui/stars-background';

import Link from 'next/link';
import { UserOnboardingContextProvider } from '@/components/app/onboarding/onboarding-context';
import OnboardingForm from '@/components/app/onboarding/onboarding-form';

export const metadata = {
  title: 'Onboarding | TechBlitz',
};

export default function OnboardingPage() {
  return (
    <div className="relative container">
      <StarsBackground className="-z-10" />
      <div className="flex flex-col min-h-screen">
        <Link href="/" className="pl-0 md:pl-8 p-8 pb-0 flex justify-center">
          <Logo />
        </Link>
        <UserOnboardingContextProvider>
          <div className="flex-1 flex items-center justify-center">
            <OnboardingForm />
          </div>
        </UserOnboardingContextProvider>
      </div>
    </div>
  );
}
