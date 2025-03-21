import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { createMetadata } from '@/utils/seo';
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered';
import GlobalPagination from '@/components/app/shared/pagination';
import { useUserServer } from '@/hooks/use-user-server';
import AnswerQuestionModal from '@/components/app/leaderboard/answer-question-modal';
import { getSuggestions } from '@/utils/data/questions/get-suggestions';
import { getUserXp } from '@/utils/data/user/authed/get-user-xp';
import LeaguesShowcase from '@/components/app/leaderboard/leagues/leagues-showcase';
import UpgradeCard from '@/components/app/shared/upgrade/upgrade-card';
import { getLeagues } from '@/utils/data/leagues/get';

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

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; postsPerPage: string };
}) {
  const currentPage = Number.parseInt(searchParams.page as string) || 1;
  const postsPerPage = Number.parseInt(searchParams.postsPerPage as string) || 10;

  // run in parallel
  const [topThreeUsersData, hasAnsweredMoreThan3Questions, user] = await Promise.all([
    getMostQuestionsAnswered(3, 1),
    getUserXp().then(({ userXp }) => userXp > 0),
    useUserServer(),
  ]);

  const leagues = await getLeagues();

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
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 group flex flex-col xl:flex-row gap-12">
      <div className="w-full lg:min-w-[75%] space-y-6">
        <LeaguesShowcase leagues={leagues} />
        {/**
       * 
       <Suspense fallback={<LoadingSpinner />}>
       {/** @ts-ignore - this is the valid type 
       <LeaderboardHero topThreeUsers={topThreeUsers} />
       </Suspense>
       */}
        <div className="flex flex-col gap-10 mt-24">
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
      </div>
      <aside className="w-full xl:w-1/4">
        <div className="sticky top-10 space-y-5 w-full">
          <UpgradeCard
            title="Try TechBlitz premium"
            description="Premium questions, personalized roadmaps, and unlimited AI credits!"
          />
        </div>
      </aside>
    </div>
  );
}
