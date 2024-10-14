import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import GlobalPagination from '@/components/global/pagination';
import { formatSeconds } from '@/utils/time';

const ITEMS_PER_PAGE = 12;

export default async function TodaysLeaderboardPage() {
  const todayQuestion = await getTodaysQuestion();

  const { fastestTimes, total } = await getFastestTimes({
    numberOfResults: 10,
    questionUid: todayQuestion?.uid || '',
    page: 1,
    pageSize: 20,
  });

  return (
    <div className="font-satoshi">
      {fastestTimes.map((time, i) => {
        return (
          <div key={i}>
            {i + 1}. <span className="font-semibold">{time.user?.name}</span>:{' '}
            {formatSeconds(time.timeTaken || 0)}
          </div>
        );
      })}
      <GlobalPagination
        className="absolute bottom-0 left-0"
        currentPage={1}
        onPageChange={() => {}}
        totalItems={total || 0}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}
