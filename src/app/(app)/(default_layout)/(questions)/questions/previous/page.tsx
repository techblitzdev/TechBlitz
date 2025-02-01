import QuestionsList from '@/components/app/questions/layout/questions-list'

import QuestionPageSidebar from '@/components/app/questions/layout/question-page-sidebar'

import Hero from '@/components/shared/hero'

import { validateSearchParams } from '@/utils/search-params'
import { parseSearchParams } from '@/utils/search-params'
import { getTags } from '@/utils/data/questions/tags/get-tags'
import { createMetadata } from '@/utils/seo'
import { Button } from '@/components/ui/button'
import FilterChips from '@/components/app/filters/chips'
import Filter from '@/components/app/filters/filter'

// revalidate every 10 minutes
export const revalidate = 600

export async function generateMetadata() {
  return createMetadata({
    title: 'Previous Daily Questions | TechBlitz',
    description: 'All daily questions that have been asked in the past.',
    image: {
      text: 'Previous Daily Questions | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/questions/previous',
  })
}

const heroDescription = (
  <div className="flex flex-col gap-y-4 z-20 relative font-inter max-w-3xl">
    <p className="text-sm md:text-base text-gray-400">
      All daily questions that have been asked in the past.
    </p>
    <div className="flex flex-col gap-y-2">
      <p className="text-gray-400">Want to see more questions?</p>
      <Button href="/questions" variant="secondary">
        View all questions
      </Button>
    </div>
  </div>
)

export default async function PreviousQuestionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const tagPromise = getTags()

  const filters = parseSearchParams(searchParams)
  if (!validateSearchParams(filters)) return null

  return (
    <>
      <Hero heading="Previous Daily Questions" subheading={heroDescription} />
      <div className="flex flex-col h-full justify-between container mt-5">
        <div className="flex flex-col lg:flex-row w-full gap-16">
          <div className="w-full lg:min-w-[65%] space-y-6">
            <div className="min-h-[84px] flex flex-col gap-y-2">
              <Filter tagsPromise={tagPromise} />
              <FilterChips />
            </div>
            <QuestionsList
              currentPage={filters.page || 1}
              filters={filters}
              customQuestions={false}
              previousQuestions
              paginationUrl="/questions"
            />
          </div>
          <QuestionPageSidebar />
        </div>
      </div>
    </>
  )
}
