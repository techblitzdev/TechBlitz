import { Suspense } from 'react';
import { DatePicker } from '@mantine/dates';
import GlobalPagination from '@/components/global/pagination';
import QuestionSuggestedCard from '@/components/questions/suggested-questions-table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { listQuestions } from '@/actions/questions/list';
import { getUserDailyStats } from '@/actions/user/authed/get-daily-streak';
import { useUserServer } from '@/hooks/useUserServer';
import { getSuggestions } from '@/actions/questions/get-suggestions';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import QuestionCard from '@/components/questions/question-card';
import Filter from '@/components/global/filters/filter';
import { QuestionDifficulty, QuestionWithoutAnswers } from '@/types/Questions';
import FilterChips from '@/components/global/filters/chips';
import Hero from '@/components/global/hero';
import QuestionCardLoading from '@/components/questions/question-card-loading';

const ITEMS_PER_PAGE = 20;

export default async function QuestionsDashboard({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();
  if (!user) return null;

  const currentPage = parseInt(searchParams.page as string) || 1;
  const ascending = searchParams.ascending === 'true';
  const difficulty = searchParams.difficulty as QuestionDifficulty;
  const completed =
    'completed' in searchParams ? searchParams.completed === 'true' : undefined;
  const tags = (searchParams.tags as string)?.split(',') || [];

  if (currentPage < 1) return null;

  const filters = {
    ascending,
    difficulty,
    completed,
    tags
  };

  const userStreak = await getUserDailyStats(user.uid);
  const startDate = userStreak?.streakData?.streakStart as Date;
  const endDate = userStreak?.streakData?.streakEnd as Date;
  const dateArray: [Date, Date] = [startDate, endDate];

  // run all the async functions in parallel
  const [data, suggestions] = await Promise.all([
    listQuestions({
      page: currentPage,
      pageSize: ITEMS_PER_PAGE,
      userUid: user.uid,
      filters
    }),
    getSuggestions({
      userUid: user.uid
    })
  ]);

  return (
    <>
      <Hero
        heading="All Questions"
        subheading="Explore a diverse set of questions across multiple topics to enhance your knowledge."
      />
      <div className="md:container flex flex-col lg:flex-row mt-5 gap-10">
        <div className="w-full lg:w-1/2 space-y-6">
          <Filter />
          <FilterChips />
          <Suspense
            fallback={
              <>
                {[...Array(6)].map((_, i) => (
                  <QuestionCardLoading key={i} />
                ))}
              </>
            }
          >
            {data.questions.map((q) => (
              <QuestionCard
                key={q.uid}
                questionData={q}
                userUid={user.uid}
              />
            ))}
          </Suspense>
          <div className="mt-5 w-full flex justify-center gap-x-2">
            <GlobalPagination
              currentPage={currentPage}
              totalPages={data.totalPages}
              href="/questions/all"
              paramName="page"
            />
          </div>
        </div>
        <aside className="w-full lg:w-1/2 relative">
          <div className="sticky top-10 space-y-10 md:w-1/2">
            <div className="w-fit h-fit flex flex-col gap-y-2.5">
              <h6 className="text-xl">Your current streak</h6>
              <DatePicker
                className="z-30 text-white border border-black-50 p-2 rounded-md hover:cursor-default"
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
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        These questions have been suggested based on areas where
                        some users have struggled in the past.
                      </p>
                    </TooltipContent>
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
    </>
  );
}
