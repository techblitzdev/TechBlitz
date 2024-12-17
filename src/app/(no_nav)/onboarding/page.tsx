import Logo from '@/components/ui/logo';
import dynamic from 'next/dynamic';

const StarsBackground = dynamic(
  () => import('../../../components/ui/stars-background')
);
import Link from 'next/link';
import { UserOnboardingContextProvider } from '@/components/onboarding/onboarding-context';
import OnboardingForm from '@/components/onboarding/onboarding-form';

export const metadata = {
  title: 'techblitz | Onboarding'
};

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
          <OnboardingForm />
        </div>
      </UserOnboardingContextProvider>
    </div>
  );
}
