import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import HomepageHeroImages from '../hero/hero-images';
import HomepageHeroEmailSignup from './email-input';

export default function HomepageHero() {
  return (
    <section className="py-16 md:pb-20 md:pt-32 xl:py-40 grid grid-cols-12 gap-4 lg:gap-16 items-center">
      <div className="flex flex-col gap-y-4 col-span-full lg:col-span-6 xl:col-span-5">
        <Link
          href="/"
          className="group w-fit relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Sign up for early access
            <ArrowUpRight className="ml-2 size-4 group-hover:rotate-45 duration-300" />
          </span>
        </Link>
        <h1 className="text-3xl lg:text-5xl !font-onest !font-medium !leading-[1.1] text-gradient from-white to-white/75">
          Your{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/55">
            personalized
          </span>
          <br />
          path to master software engineering.
        </h1>
        <h6 className="font-onest">
          A fully customizable, end-to-end learning platform for software
          engineers of all abilities — packed with daily challenges that are{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80">
            actually
          </span>{' '}
          useful.
        </h6>
        <HomepageHeroEmailSignup />
      </div>

      <div className="col-span-full lg:col-span-6 xl:col-span-7 h-full">
        <HomepageHeroImages />
      </div>
    </section>
  );
}
