import { FileQuestion, Trophy } from 'lucide-react';
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered';

import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import ShowTimeTakenToggle from './show-time-taken';
import { useUserServer } from '@/hooks/use-user-server';
import LeaderboardMostAnsweredTable from './leaderboard-most-answered-table';
import { UserRecord } from '@/types/User';

export default async function LeaderboardMostQuestionsAnswered() {
  const userPromise = useUserServer();

  const topUsersByQuestionCount = await getMostQuestionsAnswered();

  return (
    <Card className="border-none">
      <CardHeader className="p-0 md:p-6 w-full flex gap-2 justify-between">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="order-last md:order-first flex items-center gap-x-2">
            <Trophy className="size-5 text-accent" />
            <div>
              <CardTitle className="text-white">
                Most Questions Answered
              </CardTitle>
              <CardDescription className="text-gray-400">
                Battle your way to the top of TechBlitz!
              </CardDescription>
            </div>
          </div>
          <ShowTimeTakenToggle userPromise={userPromise} />
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-6 md:p-6 md:pt-0">
        <Table>
          <TableHeader className="bg-transparent">
            <TableRow className="bg-transparent">
              <TableHead className="!border-t-0 w-12 md:w-[100px] text-white bg-transparent">
                Rank
              </TableHead>
              <TableHead className="!border-t-0 text-white bg-transparent">
                User
              </TableHead>
              <TableHead className="!border-t-0 flex justify-center items-center xs:justify-end gap-2 md:text-right text-white bg-transparent">
                <span className="hidden sm:block">Questions Solved</span>
                <span className="block sm:hidden">
                  <FileQuestion className="size-4 text-white" />
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <LeaderboardMostAnsweredTable
            topUsersByQuestionCount={
              topUsersByQuestionCount as unknown as (UserRecord & {
                _count: { answers: number };
              })[]
            }
            userPromise={userPromise}
          />
        </Table>
      </CardContent>
    </Card>
  );
}
