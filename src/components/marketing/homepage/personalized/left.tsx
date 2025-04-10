import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Suspense } from 'react';
const StaticAIQuestionHelp = dynamic(() => import('./ai-help-demo'), {
  ssr: false,
});

export default function PersonalizedLeft() {
  return (
    <div className="col-span-full md:col-span-6 pb-12 pt-4 p-0 md:p-12 flex flex-col gap-10 relative">
      <div className="h-72 overflow-hidden relative">
        <Suspense fallback={<div className="h-72 w-full bg-gray-200" />}>
          <StaticAIQuestionHelp />
        </Suspense>
        <div className="z-10 absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-3xl text-gradient from-white to-white/75">
          Your personal learning assistant
        </h3>
        <p className="text-gray-400 font-onest">
          Stuck on a problem? Ask your very own AI coding assistant. Giving you the ultimate
          learning experience no matter what challenge you are facing.
        </p>
        <Button
          variant="default"
          href="/coding-challenges"
          className="w-fit flex items-center gap-1"
        >
          Try it out
          <ChevronRight className="size-3 ml-1" />
        </Button>
      </div>
      <div
        aria-hidden="true"
        className="rotate-180 hidden lg:block absolute right-0 top-0 h-full w-px pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 10%, rgba(143, 143, 143, 0.67) 100%)',
        }}
      ></div>
      <div
        aria-hidden="true"
        className="block lg:hidden absolute left-1/2 bottom-0 w-full h-px max-w-full -translate-x-1/2"
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      ></div>
    </div>
  );
}
