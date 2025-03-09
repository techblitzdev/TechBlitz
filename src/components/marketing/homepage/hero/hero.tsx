import Link from 'next/link';
import dynamic from 'next/dynamic';
import AnimatedSpan from '@/components/ui/animated-span';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserServer } from '@/hooks/use-user-server';
import LoadingSpinner from '@/components/ui/loading';

const HeroText = dynamic(() => import('./text-rotate'), {
  ssr: false,
});

const GoogleSignUp = dynamic(() => import('./google-sign-up'), {
  ssr: false,
  loading: () => (
    <Button variant="accent" size="lg" href="/dashboard">
      <LoadingSpinner />
    </Button>
  ),
});

export default function HomepageHero() {
  const animatedSpanContent = (
    <div className="flex items-center group">
      <span className="hidden md:block">30% off lifetime access!</span>
      <span className="block md:hidden">30% off lifetime access!</span>
      <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-all duration-300" />
    </div>
  );

  const user = useUserServer();

  return (
    <section className="pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56 grid grid-cols-12 gap-4 lg:gap-16 items-center">
      <div className="flex flex-col gap-y-2 col-span-full items-center text-center">
        <Link href="/pricing">
          <AnimatedSpan content={animatedSpanContent} />
        </Link>
        <h1 className="mt-3 text-5xl lg:text-[68px] !font-onest !font-medium tracking-tight leading-[64px] max-w-5xl py-1.5 items-center">
          <span className="tracking-tighter text-gradient from-white to-white/75">
            Learning to code <br />
          </span>
          <div className="h-28 lg:h-16">
            <HeroText />
          </div>
        </h1>
        <p className="font-onest max-w-4xl text-gray-400 text-lg tracking-tight mt-4 md:mt-0">
          Unlock your potential with hands-on, industry-standard coding challenges. <br /> Take the
          first step today and transform your passion into a thriving tech career.
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
          <GoogleSignUp userPromise={user} />
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
        </div>
      </div>
    </section>
  );
}
