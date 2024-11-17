import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import Card from '../global/Card';
import { QuestionWithoutAnswers } from '@/types/Questions';
import { getUserDisplayName } from '@/utils/user';
import { Medal } from 'lucide-react';
import { cn } from '@/utils/cn';
import GlobalPagination from '../global/pagination';

const ITEMS_PER_PAGE = 20;

const header = (totalAnswers: number) => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex gap-x-1 items-center">
        <Medal className="size-5 text-yellow-400" />
        <h3 className="text-lg">Fastest times today</h3>
      </div>
      <span>{totalAnswers} answers</span>
    </div>
  );
};

const footer = () => {
  return (
    <GlobalPagination
      currentPage={1}
      totalPages={1}
      href="/leaderboard/today"
      paramName="page"
      margin="mt-0"
    />
  );
};

export default async function LeaderboardTodayBoard(opts: {
  todayQuestion: QuestionWithoutAnswers;
}) {
  const { todayQuestion } = opts;

  const { fastestTimes, total } = await getFastestTimes({
    numberOfResults: 20,
    questionUid: todayQuestion?.uid || '',
    page: 1,
    pageSize: ITEMS_PER_PAGE,
  });

  return (
    <Card header={header(total)} footer={footer()}>
      <div className="flex flex-col divide-y-[1px] divide-black-50">
        {fastestTimes.map((time, index) => (
          <div
            key={time.uid}
            className={cn(
              'flex items-center justify-between p-2',
              index % 2 === 0 ? 'bg-black' : 'bg-black-75'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{index + 1}.</span>
              <span>{getUserDisplayName(time.user)}</span>
            </div>
            <span>seconds</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
