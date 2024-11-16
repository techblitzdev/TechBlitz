'use client';
import GlobalPagination from '@/components/global/pagination';
import PreviousQuestionCard from '@/components/questions/previous/previous-question-card';
import PreviousQuestionSkeleton from '@/components/questions/previous/previous-question-card-skeleton';
import { Separator } from '@/components/ui/separator';
import { getPreviousQuestions } from '@/actions/questions/get-previous';
import { useUser } from '@/hooks/useUser';
import { getPagination } from '@/utils/supabase/pagination';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import BackToDashboard from '@/components/global/back-to-dashboard';
import { getSuggestions } from '@/actions/questions/get-suggestions';
import PreviousQuestionPageSidenbar from '@/components/questions/previous/previous-question-page-sidebar';

const ITEMS_PER_PAGE = 10;

export default function PreviousQuestionsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { from, to } = getPagination(currentPage, ITEMS_PER_PAGE);
  const { user, isLoading: userLoading, isError: userError } = useUser();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['previous-questions', user?.uid, currentPage],
    queryFn: async () => {
      if (!user?.uid) {
        throw new Error('User not found');
      }
      return getPreviousQuestions({
        userUid: user.uid,
        orderBy: 'desc',
        from,
        to,
      });
    },
    enabled: !!user?.uid,
  });

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  return (
    <>
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex flex-col gap-y-2 justify-center w-full text-center">
          <div className="flex items-center w-full justify-between container">
            <BackToDashboard />
            <div className="flex flex-col w-full justify-between">
              <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
                Previous Daily Questions
              </h1>
              <p className="font-ubuntu text-sm text-gray-300">
                Here you can find all the daily questions that have been asked
                in the past.
              </p>
            </div>
            <div aria-hidden></div>
          </div>
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="flex flex-col h-full justify-between container mt-5">
        <div className="flex w-full gap-10">
          <div className="w-1/2 space-y-6">
            {isLoading
              ? // Display skeleton loading states
                Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <PreviousQuestionSkeleton key={index} />
                ))
              : data?.questions.map((q) => (
                  <PreviousQuestionCard
                    key={q.uid}
                    questionData={q}
                    userUid={user?.uid || ''}
                    userAnswer={data.answers.find(
                      (a) => a.questionUid === q.uid
                    )}
                  />
                ))}
          </div>
          {/* Display sidebar with user statistics and suggested questions */}
          {user && <PreviousQuestionPageSidenbar user={user} />}
        </div>
        <GlobalPagination
          className="mt-5"
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalItems={data?.total || 0}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </>
  );
}
