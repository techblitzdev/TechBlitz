'use client';

import { BreadcrumbWithCustomSeparator } from '@/components/global/breadcrumbs';
import GlobalPagination from '@/components/global/pagination';
import QueryStates from '@/components/global/query-states';
import PreviousQuestionCard from '@/components/questions/previous-question-card';
import PreviousQuestionSkeleton from '@/components/questions/previous-question-card-skeleton';
import { Separator } from '@/components/ui/separator';
import { getPreviousQuestions } from '@/actions/questions/get-previous';
import { useUser } from '@/hooks/useUser';
import { getPagination } from '@/utils/supabase/pagination';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import BackToDashboard from '@/components/global/back-to-dashboard';
import { DatePicker } from '@mantine/dates';

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

  const today = new Date();
  const date = new Date(today).setDate(today.getDate() - 10);

  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(date),
    today,
  ]);

  return (
    <>
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex flex-col gap-y-2 justify-center w-full text-center">
          <div className="flex w-full justify-between container">
            <BackToDashboard />
            <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
              Previous Daily Questions
            </h1>
            <div aria-hidden></div>
          </div>
          <p className="font-ubuntu text-sm text-gray-300">
            Here you can find all the daily questions that have been asked in
            the past, as well as your answers to them.
          </p>
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
          <div className="w-1/2 relative">
            <div className="sticky top-10 space-y-10">
              <div className="w-fit h-fit flex flex-col gap-y-1.5">
                <h6 className="text-xl">Your statistics</h6>
                <DatePicker
                  className="z-30 text-white border border-black-50 p-2 rounded-md bg-black-100 hover:cursor-default"
                  color="white"
                  type="range"
                  value={value}
                  onChange={setValue}
                  c="gray"
                  inputMode="none"
                  onClick={(e) => e.preventDefault()}
                />
              </div>
              <div className="">
                <h6 className="text-xl">Suggested questions</h6>
              </div>
            </div>
          </div>
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
