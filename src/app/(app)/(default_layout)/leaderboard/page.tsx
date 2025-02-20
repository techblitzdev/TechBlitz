import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { createMetadata } from '@/utils/seo';
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered';
import GlobalPagination from '@/components/app/shared/pagination';
import { useUserServer } from '@/hooks/use-user-server';
import { getTotalUserAnswers } from '@/utils/data/leaderboard/get-total-user-answers';
import LoadingSpinner from '@/components/ui/loading';
import AnswerQuestionModal from '@/components/app/leaderboard/answer-question-modal';
import { getSuggestions } from '@/utils/data/questions/get-suggestions';

const LeaderboardHero = dynamic(() => import('@/components/app/leaderboard/leaderboard-hero'), {
  loading: () => <div>Loading hero...</div>,
});

const LeaderboardMostQuestionsAnswered = dynamic(
  () => import('@/components/app/leaderboard/leaderboard-most-questions-answered'),
  { loading: () => <div>Loading leaderboard...</div> }
);

export async function generateMetadata() {
  return createMetadata({
    title: 'Leaderboard | TechBlitz',
    description: 'See how you stack up against the rest of the community.',
    canonicalUrl: '/leaderboard',
    image: {
      text: 'Leaderboard | TechBlitz',
      bgColor: '#000000',
      textColor: '#ffffff',
    },
  });
}

export default async function TodaysLeaderboardPage({
  searchParams,
}: {
  searchParams: { page: string; postsPerPage: string };
}) {
  const currentPage = Number.parseInt(searchParams.page as string) || 1;
  const postsPerPage = Number.parseInt(searchParams.postsPerPage as string) || 10;

  // run in parallel
  const [topThreeUsersData, hasAnsweredMoreThan3Questions, user] = await Promise.all([
    getMostQuestionsAnswered(3, 1),
    getTotalUserAnswers().then((count) => count > 3),
    useUserServer(),
  ]);

  const topThreeUsers = topThreeUsersData.users;

  // users logged in must answer more than three questions to view the leaderboard
  if (!hasAnsweredMoreThan3Questions && user) {
    // get the user a recommended question
    const recommendedQuestion = await getSuggestions({
      userUid: user.uid,
      limit: 1,
    });

    return <AnswerQuestionModal recommendedQuestion={recommendedQuestion[0]} />;
  }

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        {/** @ts-ignore - this is the valid type */}
        <LeaderboardHero topThreeUsers={topThreeUsers} />
      </Suspense>
      <div className="lg:container flex flex-col gap-10 mt-10">
        <Suspense fallback={<div>Loading leaderboard...</div>}>
          <LeaderboardMostQuestionsAnswered page={currentPage} postsPerPage={postsPerPage} />
          <div className="w-full flex justify-center gap-x-2">
            <GlobalPagination
              currentPage={currentPage}
              totalPages={Math.ceil(topThreeUsersData.totalCount / postsPerPage)}
              href={'/leaderboard'}
              paramName="page"
              postsPerPage={postsPerPage}
            />
          </div>
        </Suspense>
      </div>
    </>
  );
}
