'use client';
import GlobalPagination from '@/components/global/pagination';
import { Answer } from '@/types/Answers';
import { getPagination } from '@/utils/supabase/pagination';
import { useState } from 'react';

const ITEMS_PER_PAGE = 12;

export default function TodaysLeaderboardPageClient(opts: {
  fastestTimes: Answer[];
  total: number;
}) {
  // pull out the data from the props
  const { fastestTimes, total } = opts;

  const [currentPage, setCurrentPage] = useState(0);
  const { from, to } = getPagination(currentPage, ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  return (
    <GlobalPagination
      className="absolute bottom-0 left-0"
      currentPage={1}
      onPageChange={handlePageChange}
      totalItems={total || 0}
      itemsPerPage={ITEMS_PER_PAGE}
    />
  );
}
