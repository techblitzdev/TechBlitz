import React from 'react';
import HomepageHeroEmailSignup from '@/components/marketing/homepage/hero/email-input';
import { WaitlistForm } from '@/components/marketing/global/waitlist-form';
import Link from 'next/link';
import AnimatedSpan from '@/components/ui/animated-span';

export default function HomepageHero() {
  return (
    <section
      id="#waitlist-form"
      className="pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56 grid grid-cols-12 gap-4 lg:gap-16 items-center"
    >
      <div className="flex flex-col gap-y-4 col-span-full items-center text-center">
        <AnimatedSpan content="Sign up to get 50% off our premium plan when we launch" />
        <h1 className="text-5xl lg:text-[68px] !font-onest !font-medium tracking-tight max-w-5xl">
          The ultimate platform to fast-track your coding career
        </h1>
        <h6 className="font-onest max-w-xl text-gray-400">
          An{' '}
          <Link
            href="https://github.com/techblitzdev/techblitz"
            target="_blank"
            className="text-accent"
          >
            open-source
          </Link>
          , mobile-friendly software engineering platform that will transform
          you into an exceptional developer.
        </h6>
        {process.env.NEXT_PUBLIC_ENV === 'development' ? (
          <HomepageHeroEmailSignup />
        ) : (
          <WaitlistForm />
        )}
      </div>
    </section>
  );
}
