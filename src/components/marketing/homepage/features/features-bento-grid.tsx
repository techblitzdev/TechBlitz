import { Button } from '@/components/ui/button';
import { Grid } from '@/components/ui/grid';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import dynamic from 'next/dynamic';
import AnimatedSpan from '@/components/ui/animated-span';
import { QUESTIONS_COUNT } from '@/utils/constants/misc';

import DailyQuestionBox from './daily-question-box';
const LeaderboardBentoBox = dynamic(() => import('./leaderboard-bento-box'), {
  ssr: false,
});
const RoadmapFeatureBox = dynamic(() => import('./roadmap-feature-box'), {
  ssr: false,
});
const ProgressionBentoBox = dynamic(() => import('./progression-box'), {
  ssr: false,
});

const cardClasses = 'border border-black-50 p-6 rounded-lg';

export default async function FeaturesBentoGrid() {
  return (
    <section className="pt-10 lg:pt-28 pb-10 md:pb-20 flex flex-col gap-y-7 relative">
      <div className="flex flex-col gap-y-1 items-center text-center">
        <AnimatedSpan content="Features" />
        <h1 className="text-2xl lg:text-5xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          Improve coding knowledge effortlessly
        </h1>
        <span className="text-sm md:text-base text-gray-400 max-w-4xl">
          Discover why TechBlitz is the best free leetcode alternative as you
          master software engineering with ease. <br /> {QUESTIONS_COUNT}+ free
          daily coding challenges, in depth statistics and personalized learning
          paths created to improve coding skills.
        </span>
      </div>
      <div className="min-h-[1450px] md:min-h-[1000px] lg:min-h-[700px] rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-black-400 rounded-lg">
          <Link
            href="/features/roadmap"
            className={cn(
              'h-80 col-span-full lg:col-span-2 relative overflow-hidden group flex flex-col sm:flex-row gap-5',
              cardClasses
            )}
            prefetch
            aria-label="Navigate to Roadmaps"
          >
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-y-1 relative max-w-md">
                <h5 className="text-2xl text-gradient from-white to-white/55">
                  Coding Roadmaps
                </h5>
                <p className="text-xs text-gray-400 font-onest">
                  Created a personalized coding roadmap that adapt to your
                  coding skills and craft you a learning path to ensure you
                  become a better developer.
                </p>
                <Button
                  variant="default"
                  className="flex md:hidden z-10 relative mt-2"
                >
                  Learn more{' '}
                  <ChevronRight className="size-4 group-hover:ml-1 duration-300" />
                </Button>
              </div>
              <Button
                variant="default"
                className="z-10 relative gap-x-2 items-center w-fit font-onest hidden md:flex"
              >
                Learn more{' '}
                <ChevronRight className="size-4 group-hover:ml-1 duration-300" />
              </Button>
            </div>
            <RoadmapFeatureBox />
            <Grid size={20} position="bottom-left" />
          </Link>
          <Link
            href="/features/statistics"
            className={cn(
              'h-[390px] lg:h-80 flex flex-col justify-between group overflow-hidden',
              cardClasses
            )}
            aria-label="Navigate to Statistics"
          >
            <div className="flex flex-col gap-y-4 relative">
              <div className="flex flex-col gap-y-1">
                <h5 className="text-2xl text-gradient from-white to-white/55">
                  Progress tracking
                </h5>
                <p className="text-xs text-gray-400 font-onest">
                  Know exactly where you are in your learning journey. Get
                  insights on your coding habits and how to improve your coding
                  skills.
                </p>
              </div>
              <div className="w-full h-fit flex items-center justify-center">
                <ProgressionBentoBox />
              </div>
            </div>
          </Link>
          <Link
            href={'/features/leaderboard'}
            className={cn(
              'relative overflow-hidden group flex flex-col',
              cardClasses
            )}
            aria-label="Navigate to Leaderboard"
          >
            <LeaderboardBentoBox />
            <div className="flex flex-col gap-y-1 mt-auto">
              <h5 className="text-2xl text-gradient from-white to-white/55">
                Leaderboard
              </h5>
              <p className="text-xs text-gray-400 font-onest">
                Opt-in to see how you stack up against other developers, no
                pressure.
              </p>
            </div>
          </Link>
          <Link
            href="/features/daily-coding-challenges"
            className={cn(
              'col-span-full lg:col-span-2 group overflow-hidden',
              cardClasses
            )}
            prefetch
            aria-label="Navigate to Daily Challenges"
          >
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-1 h-fit">
                <h5 className="text-2xl text-gradient from-white to-white/55">
                  Daily coding challenges
                </h5>
                <p className="text-xs text-gray-400 font-onest">
                  Beginner-friendly coding challenges delivered straight to your
                  inbox. Improving your coding skills in just 5 minutes a day.
                </p>
              </div>
              <Button variant="default" className="font-onest">
                Learn more{' '}
                <ChevronRight className="size-4 group-hover:ml-1 duration-300" />
              </Button>
            </div>
            <div className="relative">
              <DailyQuestionBox />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
