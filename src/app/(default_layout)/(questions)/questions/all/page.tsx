import { listQuestions } from '@/actions/questions/list';
import { getPagination } from '@/utils/supabase/pagination';
import QuestionsDashboardClient from '../page.client';
import QuestionListCard from '@/components/questions/list/question-card';
import { useUserServer } from '@/hooks/useUserServer';
import { getUserDailyStats } from '@/actions/user/get-daily-streak';
import { DatePicker } from '@mantine/dates';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

export default async function QuestionsDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();
  if (!user) return null;

  const userStreak = await getUserDailyStats(user.uid);
  // get the streak start date and streak end date
  const startDate = userStreak?.streakData?.streakStart as Date;
  const endDate = userStreak?.streakData?.streakEnd as Date;
  // create an array of dates between the start and end date
  const dateArray: [Date, Date] = [startDate, endDate];

  // Fetch the first page of questions server-side
  const { from, to } = getPagination(1, ITEMS_PER_PAGE);
  const { questions, total, totalPages } = await listQuestions({
    page: searchParams.page ? parseInt(searchParams.page as string) : 1,
    pageSize: ITEMS_PER_PAGE,
  });

  return (
    <div className="container flex mt-5 gap-10">
      <div className="w-1/2 space-y-6">
        {/* Render questions fetched server-side */}
        {questions?.map((question) => (
          <QuestionListCard
            key={question.uid}
            question={question}
            user={user}
          />
        ))}

        {/* Pass data to the client component for interactivity */}
        {/* <QuestionsDashboardClient
          initialQuestions={questions}
          initialPage={1}
          totalPages={totalPages}
          total={total}
          itemsPerPage={ITEMS_PER_PAGE}
        /> */}
        <div className="mt-5 w-full flex justify-center gap-x-2">
          <Link href="">
            <ArrowLeft className="size-5" />
          </Link>
          {searchParams.page}

          <Link href="?page=2">
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>

      <aside className="w-1/2 relative">
        <div className="sticky top-10 space-y-10 w-1/2">
          <div className="w-fit h-fit flex flex-col gap-y-1.5">
            <h6 className="text-xl">Your statistics</h6>
            <DatePicker
              className="z-30 text-white border border-black-50 p-2 rounded-md bg-black-100 hover:cursor-default"
              color="white"
              type="range"
              value={dateArray}
              c="gray"
              inputMode="none"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
