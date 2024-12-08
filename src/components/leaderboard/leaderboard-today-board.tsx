import NoDailyQuestion from '@/components/global/errors/no-daily-question';
import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import Card from '../global/Card';
import { QuestionWithoutAnswers } from '@/types/Questions';
import { getUserDisplayName } from '@/utils/user';
import { ArrowRight, Medal, User } from 'lucide-react';
import { cn } from '@/utils/cn';
import GlobalPagination from '../global/pagination';
import { formatSeconds } from '@/utils/time';
import Link from 'next/link';

const ITEMS_PER_PAGE = 20;

const header = (todayQuestionUid: string) => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex gap-x-2 items-center">
        <Medal className="size-5 text-yellow-400" />
        <h3 className="text-lg flex gap-x-2 items-end">
          <span>Fastest times today</span>
          <span className="text-xs text-gray-500 mb-1">
            ({new Date().toLocaleDateString()})
          </span>
        </h3>
      </div>
      <Link
        href={`/question/${todayQuestionUid}`}
        className="bg-accent px-2 py-1 gap-x-2 rounded-md group font-ubuntu hover:bg-accent/90 duration-300 text-xs font-medium flex items-center justify-between"
      >
        Answer now
        <ArrowRight className="size-3 inline-block" />
      </Link>
    </div>
  );
};

const footer = (opts: {
  totalAnswers: number;
  totalPages: number;
  currentPage: number;
}) => {
  const { totalAnswers, currentPage, totalPages } = opts;

  return (
    <div className="flex w-full items-center justify-between">
      <GlobalPagination
        currentPage={currentPage}
        totalPages={totalPages}
        href="/leaderboard"
        paramName="page"
        margin="mt-0 justify-start"
      />
      <div className="font-ubuntu text-nowrap">{totalAnswers} answers</div>
    </div>
  );
};

export default async function LeaderboardTodayBoard(opts: {
  todayQuestion: QuestionWithoutAnswers | null;
  currentPage: number;
  userUid?: string;
}) {
  const { todayQuestion, currentPage, userUid } = opts;

  const { fastestTimes, total, totalPages } = await getFastestTimes({
    numberOfResults: 100,
    questionUid: todayQuestion?.uid || '',
    page: currentPage,
    pageSize: ITEMS_PER_PAGE
  });

  const startingRank = (currentPage - 1) * ITEMS_PER_PAGE;

  return (
    <Card
      header={header(todayQuestion?.uid || '')}
      footer={footer({
        currentPage,
        totalAnswers: total,
        totalPages
      })}
    >
      {!todayQuestion ? (
        <div className="p-4">
          <NoDailyQuestion />
        </div>
      ) : (
        <div className="flex flex-col divide-y-[1px] divide-black-50">
          {/* Headings Row */}
          <div className="flex items-center justify-between px-4 py-2 bg-black-75 font-medium font-ubuntu text-xs">
            <span className="flex-1">Position</span>
            <span className="flex-1">User</span>
            <span className="flex-1 text-right">Time</span>
          </div>
          {/* Leaderboard Rows */}
          {fastestTimes.length > 0 &&
            fastestTimes.map((time, index) => (
              <div
                key={time.uid}
                className={cn(
                  'flex items-center justify-between px-4 py-3',
                  index % 2 === 0 ? 'bg-[#000]' : 'bg-black-75'
                )}
              >
                <span className="flex-1 text-sm font-bold">
                  #{1 + (startingRank + index)}
                </span>
                <div className="flex-1 flex items-center gap-2">
                  {time?.user.userProfilePicture ? (
                    <img
                      src={time?.user.userProfilePicture}
                      className="rounded-full size-6"
                    />
                  ) : (
                    <div className="rounded-full size-6 flex items-center justify-center bg-black-50">
                      <User className="size-4" />
                    </div>
                  )}
                  {/** truncate */}
                  <p>
                    {getUserDisplayName(time.user).length > 15
                      ? `${getUserDisplayName(time.user).substring(0, 15)}...`
                      : getUserDisplayName(time.user)}
                  </p>
                  <p>
                    {userUid === time.user.uid && (
                      <span className="text-xs text-gray-500">(You)</span>
                    )}
                  </p>
                </div>
                <span className="flex-1 text-right">
                  {formatSeconds(time.timeTaken || 0)}
                </span>
              </div>
            ))}
        </div>
      )}
    </Card>
  );
}
