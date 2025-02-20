import type React from 'react';
import { QUESTIONS_COUNT } from '@/utils/constants';
import { Suspense } from 'react';
import FloatingChips from './user-stats-floating-chips';

interface HomepageUserStatsProps {
  userCountPromise: Promise<number>;
}

export default async function HomepageUserStats({ userCountPromise }: HomepageUserStatsProps) {
  const userCount = Math.round((await userCountPromise) / 10) * 10;

  return (
    <section className="pt-40 pb-24 lg:pb-52 relative overflow-hidden">
      <div className="flex flex-col gap-y-4 justify-center items-center relative z-10">
        <h6 className="text-lg text-gradient from-white to-white/55">A growing community with</h6>
        <div className="flex flex-col items-center justify-center [&>*]:text-5xl [&>*]:py-1 [&>*]:text-gradient [&>*]:from-white [&>*]:to-white/55">
          <h6 className="text-center">Over {QUESTIONS_COUNT} challenges</h6>
          <h6 className="text-center">Over {userCount} users</h6>
          <h6 className="text-center">Unlimited practice</h6>
        </div>
      </div>
      <div className="absolute inset-0 top-[50px] md:top-0 opacity-20 sm:opacity-100">
        <Suspense fallback={null}>
          <FloatingChips />
        </Suspense>
      </div>
    </section>
  );
}
