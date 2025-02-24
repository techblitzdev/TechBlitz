import { DatePicker } from '@mantine/dates';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

import { useUserServer } from '@/hooks/use-user-server';
import CurrentStreak, { SolarFlameBoldDuotone } from '@/components/ui/current-streak';
import { getUserDailyStats } from '@/utils/data/user/authed/get-daily-streak';
import { Button } from '@/components/ui/button';

export default async function StreakCalendar() {
  const [user, userStreak] = await Promise.all([useUserServer(), getUserDailyStats()]);

  // get the streak start date and streak end date
  const startDate = userStreak?.streakData?.streakStart as Date;
  const endDate = userStreak?.streakData?.streakEnd as Date;

  // create an array of dates between the start and end date
  const dateArray: [Date, Date] = [startDate, endDate];

  return (
    <div className="relative">
      {user ? (
        <div className="flex flex-col gap-y-4 text-white bg-black-75 border border-black-50 p-4 rounded-lg hover:cursor-default">
          <h6>Streak Stats</h6>
          <DatePicker
            className="z-30"
            color="white"
            type="range"
            value={dateArray}
            c="gray"
            inputMode="none"
          />
          <Separator className="w-full bg-black-50" />
          <div className="grid grid-cols-2 gap-4 pt-2">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <div className="flex flex-col gap-y-2 items-center">
                    <p className="text-sm text-gray-400">Longest streak</p>
                    <div className="flex items-center gap-x-1">
                      <p className="font-onest font-bold">
                        {userStreak?.streakData?.longestStreak}
                      </p>
                      <SolarFlameBoldDuotone
                        className="size-6"
                        hasActiveStreak={Boolean(
                          userStreak?.streakData?.currentstreakCount ?? 0 > 0
                        )}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your longest streak was {userStreak?.streakData?.longestStreak} days.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex flex-col gap-y-2 items-center">
              <p className="text-sm text-gray-400">Current streak</p>
              <CurrentStreak />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute inset-0 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-md">
            <Button variant="default" href="/login">
              Log in to start a streak
            </Button>
          </div>
          <DatePicker
            className="z-0 text-white bg-black-100 border border-black-50 p-2 rounded-md hover:cursor-default opacity-50"
            color="white"
            type="range"
            value={[new Date(), new Date(new Date().setDate(new Date().getDate() + 1))]}
            c="gray"
            inputMode="none"
          />
        </div>
      )}
    </div>
  );
}
