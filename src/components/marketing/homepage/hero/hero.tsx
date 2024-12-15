import React from 'react';
import HomepageHeroEmailSignup from './email-input';
import { WaitlistForm } from '../../waitlist-form';

export default function HomepageHero() {
  return (
    <section
      id="#waitlist-form"
      className="pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56 grid grid-cols-12 gap-4 lg:gap-16 items-center"
    >
      <div className="flex flex-col gap-y-4 col-span-full items-center text-center">
        <div className="group w-fit relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 font-medium text-white backdrop-blur-3xl">
            Sign up to get 50% off your first month
          </span>
        </div>
        <h1 className="text-5xl lg:text-7xl !font-onest !font-medium tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/55">
            Supercharge{' '}
          </span>
          <span className=" text-gradient from-white to-white/75">
            Your <br /> Software Engineering Career
          </span>
        </h1>
        <h6 className="font-onest max-w-2xl text-gray-400">
          AI-powered learning paths, daily coding challenges, and a supportive
          tech community. Tailored for{' '}
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
