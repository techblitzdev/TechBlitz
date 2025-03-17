import { Button } from '@/components/ui/button';
import { ChevronRight, FileQuestion } from 'lucide-react';
import { Suspense } from 'react';
import LeaderboardMostAnsweredTable from '@/components/app/leaderboard/leaderboard-most-answered-table';
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered';
import { useUserServer } from '@/hooks/use-user-server';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function LeaderboardFeaturesLeft() {
  const topUsersByQuestionCount = await getMostQuestionsAnswered(5);
  const userPromise = useUserServer();

  return (
    <div className="col-span-full md:col-span-6 pb-12 pt-4 p-0 md:p-12 flex flex-col gap-10 relative">
      <div className="h-72 overflow-hidden relative">
        <Suspense fallback={<div className="h-72 w-full bg-gray-200" />}>
          <Table>
            <TableHeader className="bg-transparent">
              <TableRow className="bg-transparent">
                <TableHead className="!border-t-0 w-12 md:w-[100px] text-white bg-transparent">
                  Rank
                </TableHead>
                <TableHead className="!border-t-0 text-white bg-transparent">User</TableHead>
                <TableHead className="!border-t-0 flex justify-center items-center xs:justify-end gap-2 md:text-right text-white bg-transparent">
                  <span className="hidden sm:block">Questions Solved</span>
                  <span className="block sm:hidden">
                    <FileQuestion className="size-4 text-white" />
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <LeaderboardMostAnsweredTable
              topUsersByQuestionCount={topUsersByQuestionCount.users.map((user) => ({
                ...user,
                userProfilePicture: user.userProfilePicture || null,
              }))}
              userPromise={userPromise}
            />
          </Table>
        </Suspense>
        <div className="z-10 absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-3xl text-gradient from-white to-white/75">Battle with your friends</h3>
        <p className="text-gray-400 font-onest">
          Challenge your friends and see who is the best. You can even create your own challenges
          and see who is the best.
        </p>
        <Button variant="secondary" href="/questions" className="w-fit flex items-center gap-1">
          Try it out
          <ChevronRight className="size-3 ml-1" />
        </Button>
      </div>
      <div
        aria-hidden="true"
        className="rotate-180 hidden lg:block absolute right-0 top-0 h-full w-px pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 10%, rgba(143, 143, 143, 0.67) 100%)',
        }}
      ></div>
      <div
        aria-hidden="true"
        className="block lg:hidden absolute left-1/2 bottom-0 w-full h-px max-w-full -translate-x-1/2"
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      ></div>
    </div>
  );
}
