import Logo from '@/components/ui/logo';
import StarsBackground from '@/components/ui/stars-background';

import Link from 'next/link';
import { UserOnboardingContextProvider } from '@/components/app/onboarding/onboarding-context';
import OnboardingForm from '@/components/app/onboarding/onboarding-form';

export const metadata = {
  title: 'techblitz | Onboarding',
};

export default function OnboardingPage() {
  return (
    <div className="relative container">
      <StarsBackground className="-z-10" />
      <Link href="/" className="absolute top-8 left-8">
        <Logo />
      </Link>
      <UserOnboardingContextProvider>
        <div className="container text-white h-screen flex items-center justify-center">
          <OnboardingForm />
        </div>
      </UserOnboardingContextProvider>
    </div>
  );
}
