'use client';
import { listQuestions } from '@/actions/questions/list';
import GlobalPagination from '@/components/global/pagination';
import QuestionListCard from '@/components/questions/list/question-card';
import LoadingSpinner from '@/components/ui/loading';
import { useUser } from '@/hooks/useUser';
import { Question } from '@/types/Questions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const ITEMS_PER_PAGE = 20;

export default function QuestionsDashboardClient(opts: {
  questions: Omit<Question, 'answers'>[];
  totalPages: number;
  page: number;
  total: number;
}) {
  const { total } = opts;
  const { user, isLoading: userLoading } = useUser();

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  const { data, isLoading } = useQuery({
    queryKey: ['questions', user?.uid, currentPage],
    queryFn: async () => {
      if (!user?.uid) {
        throw new Error('User not found');
      }
      return listQuestions({
        page: currentPage,
        pageSize: ITEMS_PER_PAGE,
      });
    },
    enabled: !!user?.uid,
  });

  if (userLoading || isLoading) return <LoadingSpinner />;
  if (!user) return null;

  return (
    <>
      {data?.questions?.map((question) => (
        <QuestionListCard key={question.uid} question={question} user={user} />
      ))}
      <GlobalPagination
        className="mt-5"
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalItems={total}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </>
  );
}
