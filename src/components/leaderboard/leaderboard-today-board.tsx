import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import Card from '../global/Card';
import { QuestionWithoutAnswers } from '@/types/Questions';
import { getUserDisplayName } from '@/utils/user';
import { Medal, User } from 'lucide-react';
import { cn } from '@/utils/cn';
import GlobalPagination from '../global/pagination';
import { formatSeconds } from '@/utils/time';

const ITEMS_PER_PAGE = 20;

const header = () => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex gap-x-1 items-center">
        <Medal className="size-5 text-yellow-400" />
        <h3 className="text-lg">Fastest times today</h3>
      </div>
    </div>
  );
};

const footer = (totalAnswers: number) => {
  return (
    <div className="flex w-full items-center justify-between">
      <GlobalPagination
        currentPage={1}
        totalPages={1}
        href="/leaderboard/today"
        paramName="page"
        margin="mt-0 justify-start"
      />
      <div className="font-ubuntu text-nowrap">{totalAnswers} answers</div>
    </div>
  );
};

export default async function LeaderboardTodayBoard(opts: {
  todayQuestion: QuestionWithoutAnswers;
  currentPage: number;
}) {
  const { todayQuestion, currentPage } = opts;

  const { fastestTimes, total } = await getFastestTimes({
    numberOfResults: 20,
    questionUid: todayQuestion?.uid || '',
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
  });

  return (
    <Card header={header()} footer={footer(total)}>
      <div className="flex flex-col divide-y-[1px] divide-black-50">
        {fastestTimes.length > 0 &&
          fastestTimes.map((time, index) => (
            <div
              key={time.uid}
              className={cn(
                'flex items-center justify-between p-4',
                index % 2 === 0 ? 'bg-black' : 'bg-black-75'
              )}
            >
              <div className="flex items-center gap-4 font-ubuntu">
                <span className="text-sm font-bold">{index + 1}.</span>
                <div className="flex items-center gap-2">
                  {time?.user.userProfilePicture ? (
                    <img
                      src={time?.user.userProfilePicture}
                      className="rounded-full size-5"
                    />
                  ) : (
                    <div className="rounded-full size-5 flex items-center justify-center bg-black-50">
                      <User className="size-3" />
                    </div>
                  )}
                  <span>{getUserDisplayName(time.user)}</span>
                </div>
              </div>
              <span>{formatSeconds(time.timeTaken || 0)}</span>
            </div>
          ))}
      </div>
    </Card>
  );
}
