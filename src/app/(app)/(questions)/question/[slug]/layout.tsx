import { Suspense, lazy } from 'react'
import { createMetadata, getQuestionEducationLevel } from '@/utils/seo'
import { capitalise, getBaseUrl } from '@/utils'
import { Separator } from '@/components/ui/separator'
import { QuestionSingleContextProvider } from '@/components/app/questions/single/layout/question-single-context'
import { redirect } from 'next/navigation'

// Actions
import { getQuestion } from '@/utils/data/questions/get'
import { getUser } from '@/actions/user/authed/get-user'
import { getRelatedQuestions } from '@/utils/data/questions/get-related'
import { getUserAnswer } from '@/utils/data/answers/get-user-answer'
import { getNextAndPreviousQuestion } from '@/utils/data/questions/question-navigation'
import { QuizJsonLd } from '@/types/Seo'

// Components
const CurrentStreak = lazy(() => import('@/components/ui/current-streak'))
const FeedbackButton = lazy(
  () => import('@/components/app/shared/feedback/feedback-button'),
)
const SidebarLayoutTrigger = lazy(
  () => import('@/components/app/navigation/sidebar-layout-trigger'),
)
const RandomQuestion = lazy(() => import('@/components/shared/random-question'))
const QuestionActionButtons = lazy(
  () =>
    import('@/components/app/questions/single/layout/question-action-buttons'),
)
const QuestionNavigation = lazy(
  () => import('@/components/app/navigation/question-navigation'),
)
const PremiumQuestionDeniedAccess = lazy(
  () => import('@/components/app/questions/premium-question-denied-access'),
)

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const question = await getQuestion('slug', params.slug)
  const title = question?.slug?.replace(/-/g, ' ') || 'Coding Question'

  return createMetadata({
    title: `${capitalise(title)} | TechBlitz`,
    description: 'Boost your coding skills for free with TechBlitz',
    image: {
      text: `${title} | TechBlitz`,
      bgColor: '#000000',
      textColor: '#ffffff',
    },
    canonicalUrl: `/question/${params.slug}`,
  })
}

export default async function QuestionUidLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { slug: string } }>) {
  const { slug } = params

  const [user, question] = await Promise.all([
    getUser(),
    getQuestion('slug', slug),
  ])

  if (!question || !question.slug || !question.tags) {
    return redirect('/questions')
  }

  // create json ld
  const jsonLd: QuizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: capitalise(question?.slug?.replace(/-/g, ' ') || ''),
    description: question?.question || '',
    url: `${getBaseUrl()}/question/${slug}`,
    educationLevel: getQuestionEducationLevel(question?.difficulty || 'EASY'),
    educationalUse: 'practice',
    learningResourceType: ['quiz', 'learning activity'],
    creator: { '@type': 'Organization', name: 'TechBlitz', url: getBaseUrl() },
    assesses: ['coding'],
    dateCreated: question?.createdAt.toISOString() || '',
    dateModified: question?.updatedAt.toISOString() || '',
    datePublished:
      question?.questionDate || question?.createdAt.toISOString() || '',
    headline: question?.question || '',
    interactivityType: 'mixed',
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    teaches: 'coding',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${getBaseUrl()}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const nextAndPreviousQuestion = getNextAndPreviousQuestion(question.uid)

  const relatedQuestions = getRelatedQuestions({
    questionSlug: question.slug,
    tags: question.tags,
    limit: 3,
  })

  const userAnswered = getUserAnswer({ questionUid: question.uid })

  if (question.isPremiumQuestion && (!user || user.userLevel === 'FREE')) {
    return <PremiumQuestionDeniedAccess />
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QuestionSingleContextProvider
        question={question}
        user={user}
        relatedQuestions={relatedQuestions}
        userAnswered={userAnswered}
      >
        <div className="grid grid-cols-12 items-center justify-between pb-2 px-3 relative">
          <div className="col-span-2 lg:col-span-4 flex items-center py-2 justify-start">
            <Suspense fallback={<div>Loading...</div>}>
              <SidebarLayoutTrigger />
            </Suspense>
            <div className="items-center gap-x-2 hidden md:flex">
              <Suspense fallback={<div>Loading...</div>}>
                <QuestionNavigation
                  navigationType="question"
                  slug={slug}
                  nextPrevPromise={nextAndPreviousQuestion}
                />
                <RandomQuestion identifier="slug" currentQuestionSlug={slug} />
              </Suspense>
            </div>
            {question?.dailyQuestion && question?.questionDate && (
              <div className="font-ubuntu gap-x-5 items-center hidden md:flex pl-4">
                <p>Daily question</p>
              </div>
            )}
          </div>
          <div className="col-span-7 lg:col-span-4 flex items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
              <QuestionActionButtons />
            </Suspense>
          </div>
          <div className="col-span-3 lg:col-span-4 flex items-center gap-x-1 md:gap-x-3 justify-end">
            <Suspense fallback={<div>Loading...</div>}>
              <CurrentStreak />
              <FeedbackButton reference={question?.slug || undefined} />
            </Suspense>
          </div>
        </div>
        <Separator className="bg-black-50" />
        {children}
      </QuestionSingleContextProvider>
    </>
  )
}
