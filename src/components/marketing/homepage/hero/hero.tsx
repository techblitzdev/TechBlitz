import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserServer } from '@/hooks/use-user-server';
import { UserRecord } from '@/types/User';
import { Suspense } from 'react';

const HeroText = dynamic(() => import('./text-rotate'), {
  ssr: false,
  loading: () => (
    <span className="text-gradient from-white to-white/75 text-focus-in flex justify-center whitespace-pre tracking-tighter text-center pr-3 pb-2 md:pb-4">
      made easy
    </span>
  ),
});

const GoogleSignUp = dynamic(() => import('./google-sign-up'), {
  ssr: false,
  loading: () => <div className="h-10"></div>,
});

const Buttons = ({ user }: { user: Promise<UserRecord | null> }) => {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
      <GoogleSignUp userPromise={user} />
      {!user && (
        <Button
          variant="default"
          size="lg"
          href="/signup"
          className="flex-1 px-5 flex items-center group"
        >
          Sign up with email
          <ArrowRight
            size={16}
            className="ml-1 size-4 group-hover:translate-x-1 transition-all duration-300"
          />
        </Button>
      )}
    </div>
  );
};

export default function HomepageHero() {
  const user = useUserServer();

  return (
    <section className="pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56 grid grid-cols-12 gap-4 lg:gap-16 items-center">
      <div className="flex flex-col gap-y-2 col-span-full items-center text-center">
        <h1 className="mt-3 text-5xl lg:text-[68px] !font-onest !font-medium tracking-tight leading-[64px] max-w-5xl py-1.5 items-center">
          <span className="tracking-tighter text-gradient from-white to-white/75 text-focus-in animate-fade-in-up">
            Learning to code
          </span>
          <br />
          <div className="h-28 lg:h-16 animate-fade-in-up [animation-delay:300ms]">
            <HeroText />
          </div>
        </h1>
        <p className="font-onest max-w-4xl text-gray-400 text-lg tracking-tight mt-4 md:mt-0 text-focus-in animate-fade-in-up [animation-delay:600ms]">
          Unlock your potential with hands-on, industry-standard coding challenges. <br /> Take the
          first step today and transform your passion into a thriving tech career.
        </p>
        <div className="animate-fade-in-up [animation-delay:900ms]">
          <Suspense fallback={null}>
            <Buttons user={user} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
