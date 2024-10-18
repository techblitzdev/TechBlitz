'use client';
import { useState } from 'react';
import GlobalPagination from '@/components/global/pagination';
import { useQuery } from '@tanstack/react-query';
// types
import { Answer } from '@/types/Answers';
// utils
import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import { formatSeconds } from '@/utils/time';

const ITEMS_PER_PAGE = 1;

export default function TodaysLeaderboardPageClient(opts: {
  questionUid: string;
  initialFastestTimes: Answer[];
  initialTotal: number;
}) {
  // pull out the data from the props
  const { initialFastestTimes, initialTotal, questionUid } = opts;

  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['top-users', questionUid, currentPage],
    queryFn: async () => {
      return getFastestTimes({
        questionUid: questionUid,
        page: currentPage,
        numberOfResults: ITEMS_PER_PAGE,
        pageSize: ITEMS_PER_PAGE,
      });
    },
  });

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <>
      {data?.fastestTimes.map((time, i) => {
        const index = (currentPage - 1) * ITEMS_PER_PAGE + i + 1;
        return (
          <div key={i}>
            {index}. <span className="font-semibold">{time.user?.name}</span>:{' '}
            {formatSeconds(time.timeTaken || 0)}
          </div>
        );
      })}
      <GlobalPagination
        className="absolute bottom-0 left-0"
        currentPage={currentPage} // Use the state variable
        onPageChange={handlePageChange}
        totalItems={data?.total || 0}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </>
  );
}
