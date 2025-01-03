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

export default async function QuestionPageSidebar(opts: {
  user: UserRecord | null;
}) {
  const { user } = opts;
  if (!user) return null;

  const userStreak = await getUserDailyStats(user?.uid);

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
      <div className="sticky top-10 space-y-10 w-1/2">
        <div className="w-fit h-fit flex flex-col gap-y-2.5">
          <h6 className="text-xl">Your current streak</h6>
          <DatePicker
            className="z-30 text-white bg-black-100 border border-black-50 p-2 rounded-md hover:cursor-default"
            color="white"
            type="range"
            value={dateArray}
            c="gray"
            inputMode="none"
          />
        </div>
        <div className="space-y-4 min-w-fit">
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
          <QuestionSuggestedCard questions={suggestions ?? []} />
        </div>
      </div>
    </aside>
  );
}
