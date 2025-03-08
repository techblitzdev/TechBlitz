import { getUserDailyStats } from '@/utils/data/user/authed/get-daily-streak';
import { Suspense } from 'react';
import LoadingSpinner from './loading';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
import { Button } from './button';
import { getSuggestions } from '@/utils/data/questions/get-suggestions';

export function SolarFlameBoldDuotone({
  className,
  hasActiveStreak,
}: {
  className: string;
  hasActiveStreak: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        className={cn('fill-red-500', hasActiveStreak ? 'fill-red-500' : 'fill-gray-400')}
        d="M20 15c0 4.255-2.618 6.122-4.641 6.751a.44.44 0 0 1-.233.012c-.289-.069-.432-.453-.224-.751c.88-1.266 1.898-3.196 1.898-5.012c0-1.95-1.644-4.253-2.928-5.674c-.293-.324-.805-.11-.821.328c-.053 1.45-.282 3.388-1.268 4.908a.412.412 0 0 1-.677.036c-.308-.39-.616-.871-.924-1.252c-.166-.204-.466-.207-.657-.026c-.747.707-1.792 1.809-1.792 3.18c0 .93.36 1.905.767 2.69c.202.39-.103.851-.482.77a.5.5 0 0 1-.122-.046C6.113 19.98 4 18.084 4 15c0-3.146 4.31-7.505 5.956-11.623c.26-.65 1.06-.955 1.617-.531C14.943 5.414 20 10.378 20 15"
      ></path>
      <path
        className={cn('fill-orange-400', hasActiveStreak ? 'fill-orange-400' : 'fill-gray-400')}
        d="M7.733 17.5c0 .93.36 1.905.767 2.69c.202.39-.103.852-.482.77c.482.54 3.658.957 7.108.803c-.289-.069-.432-.453-.224-.751c.88-1.265 1.898-3.196 1.898-5.012c0-1.95-1.644-4.253-2.928-5.674c-.293-.324-.805-.11-.821.328c-.053 1.45-.282 3.388-1.268 4.908a.412.412 0 0 1-.677.036c-.308-.39-.616-.871-.924-1.251c-.166-.205-.466-.208-.657-.027c-.747.707-1.792 1.809-1.792 3.18"
      ></path>
    </svg>
  );
}

async function CurrentStreakData() {
  const userStreak = await getUserDailyStats();

  return (
    <div className="flex items-center gap-x-1">
      <p className="font-onest font-medium">{userStreak?.streakData?.currentstreakCount ?? 0}</p>
    </div>
  );
}

export default async function CurrentStreak() {
  const userStreak = await getUserDailyStats();
  const nextRecommendedQuestion = await getSuggestions({
    limit: 1,
  });

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex items-center gap-x-1">
          <Suspense fallback={<LoadingSpinner />}>
            <CurrentStreakData />
          </Suspense>
          <SolarFlameBoldDuotone
            className="size-6"
            hasActiveStreak={Boolean(userStreak?.streakData?.currentstreakCount)}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="bg-black border border-black-50 text-white" align="end">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-y-1">
            <p className="text-xl text-gray-400 font-medium font-onest">
              {userStreak?.streakData?.currentstreakCount} day streak
            </p>
            {userStreak?.streakData?.currentstreakCount === 0 ? (
              <p className="text-xs text-gray-400 font-medium font-onest">
                Start your streak today by{' '}
                <a
                  href={`/question/${nextRecommendedQuestion?.[0]?.slug}`}
                  className="underline text-accent"
                >
                  completing your next question!
                </a>
              </p>
            ) : (
              <p className="text-xs text-gray-400 font-medium font-onest">Keep it up!</p>
            )}
          </div>
          <Button href="/statistics" variant="default" fullWidth>
            View full stats
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
