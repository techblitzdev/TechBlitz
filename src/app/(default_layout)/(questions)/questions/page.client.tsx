'use client';

import GlobalPagination from '@/components/global/pagination';
import LoadingSpinner from '@/components/ui/loading';
import QuestionListCard from '@/components/questions/list/question-card';
import { useUser } from '@/hooks/useUser';
import { Question } from '@/types/Questions';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { listQuestions } from '@/actions/questions/list';

const QuestionsDashboardClient = ({
  initialQuestions,
  initialPage,
  totalPages,
  total,
  itemsPerPage,
}: {
  initialQuestions: Omit<Question, 'answers'>[];
  initialPage: number;
  totalPages: number;
  total: number;
  itemsPerPage: number;
}) => {
  const { user, isLoading: userLoading } = useUser();
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  const { data, isLoading } = useQuery({
    queryKey: ['questions', user?.uid, currentPage],
    queryFn: async () => {
      if (!user?.uid) {
        throw new Error('User not found');
      }
      return listQuestions({
        page: currentPage,
        pageSize: 20,
      });
    },
    enabled: false,
  });

  if (userLoading) return <LoadingSpinner />;
  if (!user) return null;

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {questions?.map((question) => (
            <QuestionListCard
              key={question.uid}
              question={question}
              user={user}
            />
          ))}
        </div>
      )}

      <GlobalPagination
        className="mt-5"
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalItems={total}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default QuestionsDashboardClient;
