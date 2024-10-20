'use client';
// components
import { BreadcrumbWithCustomSeparator } from '@/components/global/breadcrumbs';
import GlobalPagination from '@/components/global/pagination';
import QueryStates from '@/components/global/query-states';
import PreviousQuestionCard from '@/components/questions/previous-question-card';
import LoadingSpinner from '@/components/ui/loading';
import { Separator } from '@/components/ui/separator';

import { getPreviousQuestions } from '@/actions/questions/get-previous';
import { useUser } from '@/hooks/useUser';
import { getPagination } from '@/utils/supabase/pagination';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const ITEMS_PER_PAGE = 6;

const items = [
  {
    href: '/dashboard',
    label: 'Home',
  },
  {
    href: '/questions',
    label: 'Questions',
  },
  {
    href: '',
    label: 'Previous Questions',
  },
];

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

  <QueryStates
    error={error}
    isError={isError}
    isLoading={isLoading}
    userError={userError}
    userLoading={userLoading}
  />;

  return (
    <>
      <div className="flex flex-col gap-y-2 w-full">
        <BreadcrumbWithCustomSeparator items={items} />
        <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
          Previous Questions
        </h1>
      </div>
      <Separator />
      <div className="flex flex-col gap-5">
        {isLoading && (
          <div className="h-96 flex justify-center items-center">
            <LoadingSpinner />
          </div>
        )}
        {data?.questions.map((q) => (
          <PreviousQuestionCard
            key={q.uid}
            questionData={q}
            userUid={user?.uid || ''}
            userAnswer={data.answers.find((a) => a.questionUid === q.uid)}
          />
        ))}
      </div>
      <GlobalPagination
        className="absolute bottom-0 left-0"
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalItems={data?.total || 0}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </>
  );
}
