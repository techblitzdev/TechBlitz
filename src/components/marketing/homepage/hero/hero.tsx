import React from 'react';
import HomepageHeroEmailSignup from './email-input';
import { WaitlistForm } from '../../waitlist-form';
import AnimatedSpan from '@/components/ui/animated-span';

export default function HomepageHero() {
  return (
    <section
      id="#waitlist-form"
      className="pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56 grid grid-cols-12 gap-4 lg:gap-16 items-center"
    >
      <div className="flex flex-col gap-y-4 col-span-full items-center text-center">
        <AnimatedSpan content="Sign up to get 50% off your first month" />
        <h1 className="text-5xl lg:text-7xl !font-onest !font-medium tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/55">
            Supercharge{' '}
          </span>
          <span className="text-gradient from-white to-white/75">
            Your <br /> Software Engineering Career
          </span>
        </h1>
        <h6 className="font-onest max-w-2xl text-gray-400">
          Personalized coding roadmaps, daily coding challenges, and a
          supportive tech community. Tailored for{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80">
            every{' '}
          </span>
          skill level.
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
