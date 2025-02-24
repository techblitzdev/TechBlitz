import type React from 'react';
import { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

// Contexts
import { QuestionSingleContextProvider } from '@/contexts/question-single-context';

// Actions & Utils
import { createMetadata, getQuestionEducationLevel } from '@/utils/seo';
import { capitalise, getBaseUrl } from '@/utils';
import { getQuestion } from '@/utils/data/questions/get';
import { getUser } from '@/actions/user/authed/get-user';
import { getRelatedQuestions } from '@/utils/data/questions/get-related';
import { getUserAnswer } from '@/utils/data/answers/get-user-answer';
import { getNextAndPreviousQuestion } from '@/utils/data/questions/question-navigation';
import type { QuizJsonLd } from '@/types/Seo';
import { userHasAnsweredAnyQuestion } from '@/utils/data/questions/user-has-answered-any-question';

// Components
import { Onborda, OnbordaProvider } from 'onborda';
import { steps } from '@/lib/onborda';
import { TourCard } from '@/components/app/shared/question/tour-card';
import { getSuggestions } from '@/utils/data/questions/get-suggestions';
import LoadingSpinner from '@/components/ui/loading';
import LogoSmall from '@/components/ui/LogoSmall';
import RouterBack from '@/components/app/shared/router-back';
import HomeIcon from '@/components/ui/icons/home';

// Lazy Components
const CurrentStreak = dynamic(() => import('@/components/ui/current-streak'), { ssr: false });
const FeedbackButton = dynamic(() => import('@/components/app/shared/feedback/feedback-button'), {
  ssr: false,
});
const RandomQuestion = dynamic(() => import('@/components/shared/random-question'), { ssr: false });
const QuestionActionButtons = lazy(
  () => import('@/components/app/questions/single/layout/question-action-buttons')
);
const QuestionNavigation = lazy(() => import('@/components/app/navigation/question-navigation'));
const PremiumQuestionDeniedAccess = lazy(
  () => import('@/components/app/questions/premium-question-denied-access')
);
const UpgradeModal = dynamic(
  () => import('@/components/app/questions/single/layout/upgrade-modal')
);
const UpgradeModalButton = lazy(() => import('@/components/app/shared/upgrade/upgrade-modal'));

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const question = await getQuestion('slug', params.slug);
  const title = question?.slug?.replace(/-/g, ' ') || 'Coding Question';

  return createMetadata({
    title: `${capitalise(title)} | TechBlitz`,
    description: `Practice ${capitalise(title)} and improve your coding skills with interactive challenges on TechBlitz`,
    image: {
      text: `${title} | TechBlitz`,
      bgColor: '#000000',
      textColor: '#ffffff',
    },
    canonicalUrl: `/question/${params.slug}`,
  });
}

export default async function QuestionUidLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { slug: string } }>) {
  const { slug } = params;

  const [user, question, { answeredQuestionsCount }] = await Promise.all([
    getUser(),
    getQuestion('slug', slug), // cached
    userHasAnsweredAnyQuestion({
      numberOfQuestions: 3,
    }),
  ]);

  if (!question || !question.slug || !question.tags) {
    return redirect('/questions');
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
    datePublished: question?.questionDate || question?.createdAt.toISOString() || '',
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
  };

  const nextAndPreviousQuestion = getNextAndPreviousQuestion(question.uid); // cached

  const relatedQuestions = getRelatedQuestions({
    questionSlug: question.slug,
    tags: question.tags,
    limit: 10,
  });

  const suggestedQuestions = getSuggestions({ limit: 2 });

  const userAnswered = getUserAnswer({ questionUid: question.uid });
  const isPremiumUser = user && user.userLevel !== 'FREE';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OnbordaProvider>
        <Onborda
          steps={steps()}
          showOnborda={true}
          shadowRgb="0,0,0"
          shadowOpacity="0.8"
          cardComponent={TourCard}
          cardTransition={{ duration: 0.3, type: 'tween' }}
        >
          <QuestionSingleContextProvider
            question={question}
            user={user}
            relatedQuestions={relatedQuestions}
            userAnswered={userAnswered}
            suggestedQuestions={suggestedQuestions}
          >
            <div className="grid grid-cols-12 items-center justify-between pt-2 px-3 relative">
              <div className="col-span-2 lg:col-span-4 flex items-center justify-start">
                <RouterBack href="/questions" className="px-0 block md:hidden">
                  <HomeIcon width="16" height="16" />
                </RouterBack>
                <div className="items-center hidden md:flex">
                  <Suspense fallback={<LoadingSpinner />}>
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
                  <div className="hidden lg:block">
                    <CurrentStreak />
                  </div>
                  <FeedbackButton reference={question?.slug || undefined} icon={true} />
                  <div className="hidden lg:block">
                    <UpgradeModalButton />
                  </div>
                </Suspense>
              </div>
            </div>
            <div style={{ opacity: 'var(--content-opacity)' }}>
              {children}
              {question.isPremiumQuestion && !isPremiumUser && <PremiumQuestionDeniedAccess />}
            </div>
            {/** shown every 3 questions */}
            {user?.userLevel === 'FREE' && answeredQuestionsCount % 3 === 0 && <UpgradeModal />}
          </QuestionSingleContextProvider>
        </Onborda>
      </OnbordaProvider>
    </>
  );
}
