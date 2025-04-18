import { lazy } from 'react';
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
import { getStudyPath } from '@/utils/data/study-paths/get';
import QuestionPageHeader from '@/components/app/questions/single/layout/page-header';

// Lazy Components
const PremiumQuestionDeniedAccess = lazy(
  () => import('@/components/app/questions/premium-question-denied-access')
);
const UpgradeModal = dynamic(() => import('@/components/app/shared/upgrade/upgrade-modal'));

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

export default async function QuestionUidLayout({ params, searchParams, children }: any) {
  const { slug } = params;
  const lessonIndex = searchParams?.lesson ? parseInt(searchParams.lesson as string, 10) : 0;

  const studyPath = await getStudyPath(slug);

  if (!studyPath) {
    redirect('/coding-challenges');
  }

  let allQuestionSlugs: string[] = [];

  if (studyPath.overviewData) {
    // Collect all question slugs from sections and subsections
    Object.values(studyPath.overviewData || {}).forEach((section: any) => {
      // Add direct section question slugs if they exist
      if (section.questionSlugs) {
        allQuestionSlugs = [...allQuestionSlugs, ...section.questionSlugs];
      }

      // Add subsection question slugs if they exist
      if (section.subSections) {
        Object.values(section.subSections).forEach((subSection: any) => {
          if (subSection.questionSlugs) {
            allQuestionSlugs = [...allQuestionSlugs, ...subSection.questionSlugs];
          }
        });
      }
    });
  } else {
    allQuestionSlugs = studyPath.questionSlugs || [];
  }

  // Log for debugging
  console.log(`[LAYOUT] Validating lesson index ${lessonIndex} for study path ${slug}`);
  console.log(`[LAYOUT] Total questions in study path: ${allQuestionSlugs.length}`);
  console.log(
    `[LAYOUT] Question slugs: ${allQuestionSlugs.slice(0, 10).join(', ')}${
      allQuestionSlugs.length > 10 ? '...' : ''
    }`
  );

  // Ensure the lesson index is valid
  if (lessonIndex < 0 || lessonIndex >= allQuestionSlugs.length) {
    console.log(
      `[LAYOUT] REDIRECTING: Invalid lesson index ${lessonIndex} (total questions: ${allQuestionSlugs.length})`
    );
    redirect(`/roadmaps/${slug}?error=invalid_lesson_index`);
  }

  const [user, question, { answeredQuestionsCount }] = await Promise.all([
    getUser(),
    getQuestion('slug', allQuestionSlugs[lessonIndex]), // cached
    userHasAnsweredAnyQuestion({
      numberOfQuestions: 3,
    }),
  ]);

  if (!question || !question.slug || !question.tags) {
    redirect('/coding-challenges');
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
            <QuestionPageHeader
              question={question}
              nextAndPreviousQuestionPromise={nextAndPreviousQuestion}
              isStudyPathLesson={true}
              studyPathSlug={slug}
            />
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
