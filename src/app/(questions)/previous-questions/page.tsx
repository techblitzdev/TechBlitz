'use client';
import { getPreviousQuestions } from '@/actions/questions/get-previous';
import { BreadcrumbWithCustomSeparator } from '@/components/global/breadcrumbs';
import QueryStates from '@/components/global/query-states';
import LoadingSpinner from '@/components/ui/loading';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';

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
  const { user, isLoading: userLoading, isError: userError } = useUser();

  const {
    data: previousQuestions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['previous-questions', user?.uid],
    queryFn: async () => {
      if (!user?.uid) {
        throw new Error('User not found');
      }
      return getPreviousQuestions({
        userUid: user.uid,
        orderBy: 'desc',
      });
    },
    enabled: !!user?.uid, // Only run query when user exists
  });

  <QueryStates
    error={error}
    isError={isError}
    isLoading={isLoading}
    userError={userError}
    userLoading={userLoading}
  />;

  return (
    <>
      <div className="flex w-full justify-between items-center font-satoshi">
        <BreadcrumbWithCustomSeparator items={items} />
      </div>
      <Separator />
      <div className="flex flex-col gap-5">
        {previousQuestions?.map((q) => (
          <div key={q.uid}>{q.questionDate.toString()}</div>
        ))}
      </div>
    </>
  );
}
