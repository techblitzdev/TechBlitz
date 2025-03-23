import { Button } from '@/components/ui/button';
import { Grid } from '@/components/ui/grid';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import dynamic from 'next/dynamic';
import AnimatedSpan from '@/components/ui/animated-span';

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
        <AnimatedSpan content="Land your dream tech job" />
        <h2 className="text-2xl lg:text-5xl !font-onest !leading-[normal] tracking-tight text-gradient from-white to-white/55">
          Build your tech career with <br /> personalized learning tools
        </h2>
        <span className="text-sm md:text-base text-gray-400 max-w-4xl">
          Learn to code with tools that adapt to your weaknesses. Get personalized practice, instant
          AI feedback, and step-by-step guidance.
        </span>
      </div>
      <div className="min-h-[1450px] md:min-h-[1000px] lg:min-h-[700px] rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-black-400 rounded-lg">
          <Link
            href="/features/roadmap"
            className={cn(
              'h-[22rem] md:h-80 col-span-full lg:col-span-2 relative overflow-hidden group flex flex-col sm:flex-row gap-5',
              cardClasses
            )}
            prefetch
            aria-label="Navigate to Personalized Programming Roadmaps"
          >
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-y-1 relative max-w-md">
                <h5 className="text-2xl text-gradient from-white to-white/55">
                  Personalized Programming Roadmaps
                </h5>
                <p className="text-xs text-gray-400 font-onest">
                  Follow a customized learning path tailored to your skill level. Our AI-powered
                  roadmaps adapt to your progress and provide personalized recommendations.
                </p>
                <Button variant="default" className="flex md:hidden z-10 relative mt-2">
                  Explore roadmaps <ChevronRight className="size-4 group-hover:ml-1 duration-300" />
                </Button>
              </div>
              <Button
                variant="default"
                className="z-10 relative gap-x-2 items-center w-fit font-onest hidden md:flex"
              >
                Explore roadmaps <ChevronRight className="size-4 group-hover:ml-1 duration-300" />
              </Button>
            </div>
            <RoadmapFeatureBox />
            <Grid size={20} position="bottom-left" />
          </Link>
          <Link
            href="/features/statistics"
            className={cn(
              'h-[420px] lg:h-80 flex flex-col justify-between group overflow-hidden',
              cardClasses
            )}
            aria-label="Navigate to Coding Progress Analytics"
          >
            <div className="flex flex-col gap-y-4 relative">
              <div className="flex flex-col gap-y-1">
                <h5 className="text-2xl text-gradient from-white to-white/55">
                  Comprehensive Coding Progress Analytics
                </h5>
                <p className="text-xs text-gray-400 font-onest">
                  Track your programming journey with detailed analytics. Monitor your coding
                  practice, identify learning patterns, and receive data-driven recommendations.
                </p>
              </div>
              <div className="w-full h-fit flex items-center justify-center">
                <ProgressionBentoBox />
              </div>
            </div>
          </Link>
          <Link
            href={'/features/leaderboard'}
            className={cn('relative overflow-hidden group flex flex-col', cardClasses)}
            aria-label="Navigate to Developer Community Leaderboard"
          >
            <LeaderboardBentoBox />
            <div className="flex flex-col gap-y-1 mt-auto">
              <h5 className="text-2xl text-gradient from-white to-white/55">
                Community Leaderboard
              </h5>
              <p className="text-xs text-gray-400 font-onest">
                Join our global developer community and benchmark your progress. Compare your coding
                achievements with peers worldwide in a supportive, growth-focused environment.
              </p>
            </div>
          </Link>
          <Link
            href="/features/coding-challenges"
            className={cn('col-span-full lg:col-span-2 group overflow-hidden', cardClasses)}
            prefetch
            aria-label="Navigate to Daily Programming Challenges"
          >
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-1 h-fit">
                <h5 className="text-2xl text-gradient from-white to-white/55">
                  Daily Coding Challenges
                </h5>
                <p className="text-xs text-gray-400 font-onest">
                  Enhance your coding skills with our curated daily challenges. Perfect for all
                  skill levels, from beginners to advanced developers. Receive structured
                  programming exercises directly in your inbox.
                </p>
              </div>
              <Button variant="default" className="font-onest">
                Start practicing <ChevronRight className="size-4 group-hover:ml-1 duration-300" />
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
