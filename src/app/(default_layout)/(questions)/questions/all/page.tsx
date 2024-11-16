import { listQuestions } from '@/actions/questions/list';
import { getPagination } from '@/utils/supabase/pagination';
import QuestionListCard from '@/components/questions/list/question-card';
import { useUserServer } from '@/hooks/useUserServer';
import { getUserDailyStats } from '@/actions/user/get-daily-streak';
import { DatePicker } from '@mantine/dates';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GlobalPagination from '@/components/global/pagination';

const ITEMS_PER_PAGE = 5;

export default async function QuestionsDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();
  if (!user) return null;

  const currentPage = parseInt(searchParams.page as string) || 1;
  if (currentPage < 1) return null; // Handle invalid page numbers

  // Fetch user streak statistics
  const userStreak = await getUserDailyStats(user.uid);
  const startDate = userStreak?.streakData?.streakStart as Date;
  const endDate = userStreak?.streakData?.streakEnd as Date;
  const dateArray: [Date, Date] = [startDate, endDate];

  // Fetch questions for the current page
  const { from, to } = getPagination(currentPage, ITEMS_PER_PAGE);
  const { questions, totalPages } = await listQuestions({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
  });

  return (
    <div className="container flex mt-5 gap-10">
      {/* Left Section: Questions */}
      <div className="w-1/2 space-y-6">
        {questions?.map((question) => (
          <QuestionListCard
            key={question.uid}
            question={question}
            user={user}
          />
        ))}

        {/* Pagination Controls */}
        <div className="mt-5 w-full flex justify-center gap-x-2">
          <GlobalPagination
            currentPage={currentPage}
            totalPages={25}
            href="/questions/all"
            paramName="page"
          />
        </div>
      </div>

      {/* Right Section: Statistics */}
      <aside className="w-1/2 relative">
        <div className="sticky top-10 space-y-10 w-1/2">
          <div className="w-fit h-fit flex flex-col gap-y-1.5">
            <h6 className="text-xl">Your statistics</h6>
            <DatePicker
              className="z-30 text-white border border-black-50 p-2 rounded-md bg-black-100 hover:cursor-default"
              type="range"
              value={dateArray}
              inputMode="none"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
