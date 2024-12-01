import { Button } from '@/components/ui/button';
import { Highlight } from '@/components/ui/highlight';
import { Input } from '@/components/ui/input';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import HomepageHeroImages from './hero-images';

export default function HomepageHero() {
  return (
    <section className="py-16 lg:py-32 grid grid-cols-12 gap-4 lg:gap-16 items-center">
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
        <h1 className="text-3xl lg:text-5xl font-inter font-bold !leading-[normal]">
          Your <Highlight>personalized</Highlight> path to master software
          engineering.
        </h1>
        <h6 className="font-inter">
          A fully customizable, end-to-end learning platform for software
          engineers of all abilities — packed with daily challenges that are{' '}
          <strong>actually</strong> useful.
        </h6>
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col md:flex-row gap-3 md:items-end mt-3 w-full">
            <Input
              className="
								bg-transparent p-2 placeholder:text-white/50 autofill:!bg-transparent border border-black-50
								focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 px-4
								hover:border-white/50 w-full lg:w-72
          		"
              placeholder="Enter your email"
            />
            <Button
              variant="accent"
              className="w-full lg:w-fit items-center"
            >
              Get Started for Free
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
          <p className="text-gray-400 text-xs pl-0.5">
            No credit card required.
          </p>
        </div>
      </div>

      <div className="col-span-full lg:col-span-6 xl:col-span-7 h-full">
        <HomepageHeroImages />
      </div>
    </section>
  );
}
