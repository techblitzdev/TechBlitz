import type React from 'react';
import { lazy, Suspense } from 'react';
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
import QuestionPageHeader from '@/components/app/questions/single/layout/page-header';
import { getStudyPath } from '@/utils/data/study-paths/get';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import RouterBack from '@/components/app/shared/router-back';
import LogoSmall from '@/components/ui/LogoSmall';
import { FlagIcon } from 'lucide-react';
import FeedbackButton from '@/components/app/shared/feedback/feedback-button';

// Lazy Components
const PremiumQuestionDeniedAccess = lazy(
  () => import('@/components/app/questions/premium-question-denied-access')
);
const UpgradeModal = dynamic(
  () => import('@/components/app/questions/single/layout/upgrade-modal')
);

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const question = await getQuestion('slug', params.slug);
  const title = question?.title || question?.slug?.replace(/-/g, ' ') || 'Coding Question';

  const defaultQuestionDescription = `Practice ${capitalise(
    title
  )} and improve your coding skills with interactive challenges on TechBlitz`;

  const description =
    question?.questionType === 'SIMPLE_MULTIPLE_CHOICE'
      ? question?.afterQuestionInfo || defaultQuestionDescription
      : defaultQuestionDescription;

  return createMetadata({
    title: `${capitalise(title)} | TechBlitz`,
    description,
    image: {
      text: `${title} | TechBlitz`,
      bgColor: '#000000',
      textColor: '#ffffff',
    },
    canonicalUrl: `/question/${params.slug}`,
  });
}

export default async function QuestionUidLayout({
  params,
  searchParams,
  children,
}: {
  params: { slug: string };
  searchParams: { lesson?: string };
  children: Readonly<React.ReactNode>;
}) {
  const { slug } = params;
  const lessonIndex = searchParams?.lesson ? parseInt(searchParams.lesson, 10) : 0;

  const studyPath = await getStudyPath(slug);

  if (!studyPath) {
    return redirect('/coding-challenges');
  }

  let allQuestionSlugs: string[] = [];

  if (studyPath.overviewData) {
    allQuestionSlugs = Object.values(studyPath.overviewData).flatMap(
      (section) => section.questionSlugs
    );
  } else {
    allQuestionSlugs = studyPath.questionSlugs;
  }

  // Ensure the lesson index is valid
  if (lessonIndex < 0 || lessonIndex >= allQuestionSlugs.length) {
    redirect(`/roadmap/learn/${slug}`);
  }

  const [user, question, { answeredQuestionsCount }] = await Promise.all([
    getUser(),
    getQuestion('slug', allQuestionSlugs[lessonIndex]), // cached
    userHasAnsweredAnyQuestion({
      numberOfQuestions: 3,
    }),
  ]);

  if (!question || !question.slug || !question.tags) {
    return redirect('/coding-challenges');
  }

  const defaultQuestionDescription = `Practice ${capitalise(
    question?.title || question?.slug?.replace(/-/g, ' ') || 'Coding Question'
  )} and improve your coding skills with interactive challenges on TechBlitz`;

  const description =
    question?.questionType === 'SIMPLE_MULTIPLE_CHOICE'
      ? question?.afterQuestionInfo || defaultQuestionDescription
      : defaultQuestionDescription;

  // create json ld
  const jsonLd: QuizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: capitalise(question?.slug?.replace(/-/g, ' ') || ''),
    description,
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
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${getBaseUrl()}` },
        { '@type': 'ListItem', position: 2, name: 'Questions', item: `${getBaseUrl()}/questions` },
        {
          '@type': 'ListItem',
          position: 3,
          name: question.slug,
          item: `${getBaseUrl()}/question/${slug}`,
        },
      ],
    },
  };

  // not resolving the promises here - passing the promises and
  // using 'use' to resolve them in their own components
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
            <div className="flex items-center justify-between py-2 px-3">
              <TooltipProvider delayDuration={0} skipDelayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <RouterBack href={`/roadmaps/${slug}`}>
                      <LogoSmall size={32} />
                    </RouterBack>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Back to {studyPath.title}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div
                className={`col-span-3 lg:col-span-4 flex items-center gap-x-1 md:gap-x-3 justify-end ${
                  question.questionType === 'SIMPLE_MULTIPLE_CHOICE'
                    ? 'col-start-10 lg:col-start-12'
                    : ''
                }`}
              >
                <Suspense fallback={null}>
                  <FeedbackButton
                    feedbackModalTitle="Report a problem"
                    feedbackModalDescription="If you're experiencing issues with this question, please let us know so we can fix it."
                    reference={question?.slug || undefined}
                    icon={<FlagIcon height="1.5rem" width="1.5rem" />}
                  />
                  <div className="hidden lg:block">
                    <UpgradeModal />
                  </div>
                </Suspense>
              </div>
            </div>
            <div style={{ opacity: 'var(--content-opacity)' }} className="relative">
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
