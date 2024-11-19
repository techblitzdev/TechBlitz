import { DatePicker } from '@mantine/dates';
import GlobalPagination from '@/components/global/pagination';
import QuestionSuggestedCard from '@/components/questions/suggested-questions-table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { listQuestions } from '@/actions/questions/list';
import { getUserDailyStats } from '@/actions/user/get-daily-streak';
import { useUserServer } from '@/hooks/useUserServer';
import { getSuggestions } from '@/actions/questions/get-suggestions';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import QuestionCard from '@/components/questions/question-card';
import Filter from '@/components/global/filters/filter';
import { QuestionDifficulty } from '@/types/Questions';
import FilterChips from '@/components/global/filters/chips';

const ITEMS_PER_PAGE = 20;

export default async function QuestionsDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();
  if (!user) return null;

  // filters from search params
  const currentPage = parseInt(searchParams.page as string) || 1;
  const ascending = searchParams.ascending === 'true';
  const difficulty = searchParams.difficulty as QuestionDifficulty;
  const completed =
    'completed' in searchParams ? searchParams.completed === 'true' : undefined;
  const tags = (searchParams.tags as string)?.split(',') || [];

  if (currentPage < 1) return null;

  // construct filter object to send up
  const filters = {
    ascending,
    difficulty,
    completed,
    tags,
  };

  // Fetch user streak statistics
  const userStreak = await getUserDailyStats(user.uid);
  const startDate = userStreak?.streakData?.streakStart as Date;
  const endDate = userStreak?.streakData?.streakEnd as Date;
  const dateArray: [Date, Date] = [startDate, endDate];

  // Fetch questions for the current page
  const { questions, totalPages, total } = await listQuestions({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    userUid: user.uid,
    filters,
  });

  const suggestions = await getSuggestions({
    userUid: user?.uid || '',
  });

  return (
    <div className="container flex mt-5 gap-10">
      {/* Left Section: Questions */}
      <div className="w-1/2 space-y-6">
        <Filter />
        <FilterChips />
        {questions?.map((q) => (
          <QuestionCard
            key={q.uid}
            questionData={q}
            userUid={user?.uid || ''}
          />
        ))}

        <div className="mt-5 w-full flex justify-center gap-x-2">
          <GlobalPagination
            currentPage={currentPage}
            totalPages={totalPages}
            href="/questions/all"
            paramName="page"
          />
        </div>
      </div>

      {/* Right Section: Statistics */}
      <aside className="w-1/2 relative">
        <div className="sticky top-10 space-y-10 w-1/2">
          <div className="w-fit h-fit flex flex-col gap-y-2.5">
            <h6 className="text-xl">Your statistics</h6>
            <DatePicker
              className="z-30 text-white border border-black-50 p-2 rounded-md bg-black-100 hover:cursor-default"
              type="range"
              value={dateArray}
              inputMode="none"
            />
          </div>
          <div className="space-y-4">
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
            <QuestionSuggestedCard
              questions={suggestions ?? []}
              isLoading={false}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
