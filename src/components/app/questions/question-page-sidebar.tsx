import { DatePicker } from '@mantine/dates';
import QuestionSuggestedCard from '@/components/app/questions/suggested-questions-table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

import { UserRecord } from '@/types/User';
import { getSuggestions } from '@/actions/questions/get-suggestions';
import { getUserDailyStats } from '@/actions/user/authed/get-daily-streak';
import { Button } from '@/components/ui/button';

export default async function QuestionPageSidebar(opts: {
  user: UserRecord | null;
}) {
  const { user } = opts;

  // get the user's daily streak if they are logged in
  const userStreak = await getUserDailyStats(user?.uid || '');

  // get the streak start date and streak end date
  const startDate = userStreak?.streakData?.streakStart as Date;
  const endDate = userStreak?.streakData?.streakEnd as Date;

  // create an array of dates between the start and end date
  const dateArray: [Date, Date] = [startDate, endDate];

  const suggestions = await getSuggestions({
    userUid: user?.uid || '',
  });

  return (
    <aside className="w-full lg:w-[45%] relative">
      <div className="sticky top-10 space-y-10 w-3/4">
        <div className="w-fit h-fit flex flex-col gap-y-2.5">
          <h6 className="text-xl">Your current streak</h6>
          <div className="relative">
            {user ? (
              <DatePicker
                className="z-30 text-white bg-black-100 border border-black-50 p-2 rounded-md hover:cursor-default"
                color="white"
                type="range"
                value={dateArray}
                c="gray"
                inputMode="none"
              />
            ) : (
              <div className="relative">
                <div className="absolute inset-0 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-md">
                  <Button variant="secondary" href="/login">
                    Log in to start a streak
                  </Button>
                </div>
                <DatePicker
                  className="z-0 text-white bg-black-100 border border-black-50 p-2 rounded-md hover:cursor-default opacity-50"
                  color="white"
                  type="range"
                  value={[
                    new Date(),
                    new Date(new Date().setDate(new Date().getDate() + 1)),
                  ]}
                  c="gray"
                  inputMode="none"
                />
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-x-2">
            <h6 className="text-xl">Suggested questions</h6>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <QuestionMarkCircledIcon className="size-3.5 mt-1 text-gray-300" />
                  <TooltipContent>
                    <p>
                      These question have been suggested based on areas where
                      some users have struggled in the past.
                    </p>
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <QuestionSuggestedCard questions={suggestions ?? []} />
            {!user && (
              <div className="absolute inset-0 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-md">
                <Button variant="secondary" href="/login">
                  Log in to see suggestions
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
