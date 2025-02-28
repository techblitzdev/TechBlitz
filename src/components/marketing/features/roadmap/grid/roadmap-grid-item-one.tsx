import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const RoadmapGridItemOneAnimation = dynamic(() => import('./roadmap-grid-item-one-animation'), {
  ssr: false,
});

export default function RoadmapGridItemOne() {
  return (
    <div className="relative col-span-full md:col-span-6 pb-0 md:pb-12 pt-4 p-0 md:p-12 flex flex-col gap-10">
      <div className="flex flex-col gap-2.5">
        <h3 className="text-3xl text-gradient from-white to-white/75">Analyze your skills</h3>
        <p className="text-gray-400">
          First, we need to understand how much you already know. We start by getting you to answer
          a few coding questions to gauge your current skill level. This enables us to create the
          perfect coding roadmap.
        </p>
      </div>
      <div className="relative overflow-hidden h-full">
        <div
          className="border border-black-50 rounded-lg h-full p-6"
          style={{
            background:
              'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
          }}
        >
          <p className="font-onest text-base sm:text-xl md:text-2xl font-semibold leading-none tracking-tight text-white mb-4">
            Your answers
          </p>
          <div className="space-y-3">
            <Suspense fallback={<div className="min-h-[88px] w-full animate-pulse"></div>}>
              <RoadmapGridItemOneAnimation />
            </Suspense>
          </div>
        </div>
        <div className="z-10 absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#000] to-transparent pointer-events-none"></div>
        <div className="z-10 absolute inset-y-0 left-0 w-20 bg-linear-to-r from-[#000] to-transparent pointer-events-none"></div>
      </div>
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-0 top-0 h-[calc(100%-1px)] w-px pointer-events-none "
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 10%, rgba(143, 143, 143, 0.67) 100%)',
        }}
      ></div>
    </div>
  );
}
