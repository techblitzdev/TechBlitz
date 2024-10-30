'use client';
import { useState } from 'react';
import GlobalPagination from '@/components/global/pagination';
import { useQuery } from '@tanstack/react-query';
// types
import { Answer } from '@/types/Answers';
// utils
import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import { formatSeconds } from '@/utils/time';
import { Button } from '@/components/ui/button';
import { getUserDisplayName } from '@/utils/user';

const ITEMS_PER_PAGE = 1;

export default function TodaysLeaderboardPageClient(opts: {
  questionUid: string;
  initialFastestTimes: Answer[];
  initialTotal: number;
}) {
  // pull out the data from the props
  const { questionUid } = opts;

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
    <div>
      {data?.fastestTimes.length === 0 && (
        <div className="w-full flex flex-col gap-y-1 justify-center items-center ">
          <p>No fastest times yet!</p>
          <Button variant="secondary" href={`/question/${questionUid}`}>
            Click here to be the first!
          </Button>
        </div>
      )}
      {data?.fastestTimes.map((time, i) => {
        const index = (currentPage - 1) * ITEMS_PER_PAGE + i + 1;
        return (
          <div key={time.uid}>
            {index}.{' '}
            <span className="font-semibold">
              {getUserDisplayName(time.user)}
            </span>
            : {formatSeconds(time.timeTaken || 0)}
          </div>
        );
      })}
      {data && data?.fastestTimes?.length > 0 && data?.totalPages > 0 && (
        <GlobalPagination
          className="absolute bottom-0 left-0"
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalItems={data?.total || 0}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </div>
  );
}
