import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import Card from '../global/Card';
import { QuestionWithoutAnswers } from '@/types/Questions';
import { getUserDisplayName } from '@/utils/user';

const ITEMS_PER_PAGE = 20;

const header = (
  <div className="flex items-center w-full justify-between">
    <h3 className="text-lg">Fastest times today</h3>
  </div>
);

export default async function LeaderboardTodayBoard(opts: {
  todayQuestion: QuestionWithoutAnswers;
}) {
  const { todayQuestion } = opts;

  const { fastestTimes, total } = await getFastestTimes({
    numberOfResults: 1,
    questionUid: todayQuestion?.uid || '',
    page: 1,
    pageSize: ITEMS_PER_PAGE,
  });

  return (
    <Card header={header}>
      <div className="p-4">
        <div className="flex flex-col gap-2">
          {fastestTimes.map((time, index) => (
            <div key={time.uid} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{index + 1}.</span>
                <span>{getUserDisplayName(time.user)}</span>
              </div>
              <span>seconds</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
