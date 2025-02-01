import dynamic from 'next/dynamic'

import LeaderboardHero from '@/components/app/leaderboard/leaderboard-hero'
import { createMetadata } from '@/utils/seo'
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered'
import { Suspense } from 'react'
import GlobalPagination from '@/components/app/shared/pagination'

const LeaderboardMostQuestionsAnswered = dynamic(
  () =>
    import('@/components/app/leaderboard/leaderboard-most-questions-answered'),
)

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
  })
}

export default async function TodaysLeaderboardPage({
  searchParams,
}: {
  searchParams: { page: string; postsPerPage: string }
}) {
  const currentPage = parseInt(searchParams.page as string) || 1
  const postsPerPage = parseInt(searchParams.postsPerPage as string) || 10

  const topThreeUsersData = await getMostQuestionsAnswered(3, 1)
  const topThreeUsers = topThreeUsersData.users

  return (
    <>
      {/** @ts-ignore - this is the valid type */}
      <LeaderboardHero topThreeUsers={topThreeUsers} />
      <div className="lg:container flex flex-col gap-10 mt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <LeaderboardMostQuestionsAnswered
            page={currentPage}
            postsPerPage={postsPerPage}
          />
          <div className="w-full flex justify-center gap-x-2">
            <GlobalPagination
              currentPage={currentPage}
              totalPages={Math.ceil(
                topThreeUsersData.totalCount / postsPerPage,
              )}
              href={'/leaderboard'}
              paramName="page"
              postsPerPage={postsPerPage}
            />
          </div>
        </Suspense>
      </div>
    </>
  )
}
