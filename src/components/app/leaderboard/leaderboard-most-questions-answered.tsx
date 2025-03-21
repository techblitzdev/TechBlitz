import { Sparkles } from 'lucide-react';
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered';
import { Suspense } from 'react';
import { Table, TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { useUserServer } from '@/hooks/use-user-server';
import LeaderboardMostAnsweredTable from './leaderboard-most-answered-table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import ShowTimeTakenToggle from './show-time-taken';

type LeaderboardUser = {
  uid: string;
  email: string;
  userLevel: string;
  userProfilePicture: string | null;
  username: string | null;
  userXp: number;
  _count: { answers: number };
};

export default async function LeaderboardXPRankings({
  page = 1,
  postsPerPage = 15,
}: {
  page?: number;
  postsPerPage?: number;
}) {
  const { users } = await getMostQuestionsAnswered(postsPerPage, page);
  const userPromise = useUserServer();

  return (
    <Card className="border-none flex flex-col gap-6">
      <CardHeader className="p-0 w-full flex gap-2 justify-between">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="order-last md:order-first flex items-center gap-x-2">
            <Sparkles className="size-5 text-accent" />
            <div>
              <CardTitle className="text-white">Experience Points Ranking</CardTitle>
              <CardDescription className="text-gray-400">
                Battle your way to the top of TechBlitz!
              </CardDescription>
            </div>
          </div>
          <ShowTimeTakenToggle userPromise={userPromise} />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="w-[100px] text-white">Rank</TableHead>
              <TableHead className="text-white">User</TableHead>
              <TableHead className="text-right text-white pr-4">XP</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<div>Loading...</div>}>
            <LeaderboardMostAnsweredTable
              topUsersByQuestionCount={users as unknown as LeaderboardUser[]}
              userPromise={userPromise}
              page={page}
              postsPerPage={postsPerPage}
            />
          </Suspense>
        </Table>
      </CardContent>
    </Card>
  );
}
