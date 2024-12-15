import Logo from '@/components/ui/logo';
import { StarsBackground } from '@/components/ui/stars-background';
import Link from 'next/link';
import { UserOnboardingContextProvider } from '@/components/onboarding/onboarding-context';
import OnboardingStepOne from '@/components/onboarding/onboarding-step-one';

export default function OnboardingPage() {
  return (
    <div className="relative container">
      <StarsBackground className="-z-10" />
      <Link
        href="/"
        className="absolute top-8 left-0 lg:left-8"
      >
        <Logo />
      </Link>
      <UserOnboardingContextProvider>
        <div className="container text-white h-screen flex items-center justify-center">
          <OnboardingStepOne />
        </div>
      </UserOnboardingContextProvider>
    </div>
  );
}
