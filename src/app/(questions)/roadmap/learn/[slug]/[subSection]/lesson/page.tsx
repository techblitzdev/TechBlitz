import { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

// Utils and Data Fetching
import { getStudyPath } from '@/utils/data/study-paths/get';
import { getQuestion } from '@/utils/data/questions/get';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import { createMetadata } from '@/utils/seo';
import { useUserServer } from '@/hooks/use-user-server';
import { getRelatedQuestions } from '@/utils/data/questions/get-related';
import { getUserAnswer } from '@/utils/data/answers/get-user-answer';
import { getSuggestions } from '@/utils/data/questions/get-suggestions';

// Components
const LessonTransitionWrapper = dynamic(
  () => import('@/components/app/roadmaps/lesson-transition-wrapper'),
  {
    ssr: false,
  }
);
const QuestionCard = dynamic(
  () => import('@/components/app/questions/single/layout/question-card'),
  {
    ssr: false,
    loading: () => <QuestionCardLoading />,
  }
);
const PremiumContentWrapper = lazy(
  () => import('@/components/app/shared/question/premium-content-wrapper')
);
const CodeDisplayWrapper = dynamic(
  () => import('@/components/app/questions/single/layout/code-display-wrapper'),
  {
    ssr: false,
  }
);
const CodeEditor = lazy(() => import('@/components/app/questions/code-editor/editor'));
const TestCaseSection = lazy(
  () => import('@/components/app/questions/code-editor/test-case-section')
);
const TourStartModal = lazy(() => import('@/components/app/shared/question/tour-start-modal'));
const AiQuestionHelp = dynamic(
  () => import('@/components/app/questions/single/layout/ai-question-help'),
  {
    ssr: false,
    loading: () => <StarsIcon className="size-4 text-yellow-400 fill-yellow-500" />,
  }
);
const ChangeCodeTheme = dynamic(
  () => import('@/components/app/questions/single/layout/change-code-theme'),
  {
    ssr: false,
    loading: () => <EditorIcon />,
  }
);
const ExpandedCodeModal = dynamic(
  () => import('@/components/app/questions/single/layout/expanded-code-modal'),
  {
    ssr: false,
    loading: () => <Expand className="size-4 text-gray-500" />,
  }
);
const ResizableLayout = dynamic(() => import('@/components/ui/resizable-layout'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const MultipleChoiceLayout = dynamic(
  () => import('@/components/app/questions/multiple-choice/layout')
);
const PremiumQuestionDeniedAccess = lazy(
  () => import('@/components/app/questions/premium-question-denied-access')
);
import { QuestionSingleContextProvider } from '@/contexts/question-single-context';
import QuestionPageHeader from '@/components/app/questions/single/layout/page-header';

// UI Components
import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/shared/no-daily-question';
import LoadingSpinner from '@/components/ui/loading';
import { Expand, StarsIcon } from 'lucide-react';
import EditorIcon from '@/components/ui/icons/editor';
import WindowCode2 from '@/components/ui/icons/window-code';
import QuestionCardLoading from '@/components/app/questions/single/layout/question-card-loading';

export async function generateMetadata({
  params,
}: {
  params: { slug: string; subSection: string };
}) {
  const studyPath = await getStudyPath(params.slug);

  if (!studyPath) {
    return createMetadata({
      title: 'Roadmap Lesson Not Found | TechBlitz',
      description: 'Roadmap lesson not found',
    });
  }

  // Get subsection name by looking up the sectionSlug
  let subsectionName = '';
  if (params.subSection !== 'main' && studyPath.overviewData) {
    // First try to find by sectionSlug
    Object.values(studyPath.overviewData).forEach((section: any) => {
      if (section.subSections) {
        Object.values(section.subSections).forEach((sub: any) => {
          if (sub.sectionSlug === params.subSection) {
            subsectionName = ` - ${sub.sectionName}`;
          }
        });
      }
    });

    // If not found by sectionSlug, try to find by key (for backward compatibility)
    if (!subsectionName) {
      Object.values(studyPath.overviewData).forEach((section: any) => {
        if (section.subSections && section.subSections[params.subSection]) {
          subsectionName = ` - ${section.subSections[params.subSection].sectionName}`;
        }
      });
    }
  }

  return createMetadata({
    title: `${studyPath?.title}${subsectionName} - Lesson | TechBlitz`,
    description: studyPath?.description,
    image: {
      text: `${studyPath?.title}${subsectionName} - Lesson | TechBlitz`,
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: `/roadmap/learn/${params.slug}/${params.subSection}/lesson`,
  });
}

export default async function RoadmapLessonPage({
  params,
  searchParams,
}: {
  params: { slug: string; subSection: string };
  searchParams: { lesson?: string };
}) {
  const { slug, subSection } = params;
  const lessonIndex = searchParams.lesson ? Number.parseInt(searchParams.lesson, 10) : 0;

  // Fetch the study path
  const studyPath = await getStudyPath(slug);

  if (!studyPath) {
    return <div>Study path not found</div>;
  }

  // Get all question slugs from either overviewData or questionSlugs
  let allQuestionSlugs: string[] = [];
  let sectionName = '';

  if (studyPath.overviewData) {
    // If it's the main section (not a subsection)
    if (subSection === 'main') {
      // Get questions directly from the sections
      allQuestionSlugs = Object.values(studyPath.overviewData)
        .flatMap((section: any) => section.questionSlugs || [])
        .filter(Boolean);
    } else {
      // Get questions from the specific subsection by matching sectionSlug
      const subsectionQuestions: string[] = [];

      // Find the subsection in the study path data by matching the sectionSlug
      Object.values(studyPath.overviewData).forEach((section: any) => {
        if (section.subSections) {
          Object.values(section.subSections).forEach((sub: any) => {
            if (sub.sectionSlug === subSection) {
              subsectionQuestions.push(...(sub.questionSlugs || []));
              sectionName = sub.sectionName || '';
            }
          });
        }
      });

      // If no subsection found with sectionSlug, try to find by key (for backward compatibility)
      if (subsectionQuestions.length === 0) {
        Object.values(studyPath.overviewData).forEach((section: any) => {
          if (section.subSections && section.subSections[subSection]) {
            subsectionQuestions.push(...(section.subSections[subSection].questionSlugs || []));
            sectionName = section.subSections[subSection].sectionName || '';
          }
        });
      }

      allQuestionSlugs = subsectionQuestions;
    }
  } else {
    // Fall back to regular questionSlugs
    allQuestionSlugs = studyPath.questionSlugs || [];
  }

  // Ensure the lesson index is valid, if not, return to the roadmap overview page
  if (lessonIndex < 0 || lessonIndex >= allQuestionSlugs.length) {
    redirect(`/roadmaps/${slug}?error=invalid_lesson_index`);
  }

  // Get the current question slug
  const questionSlug = allQuestionSlugs[lessonIndex];

  // Calculate previous and next lesson indexes
  const prevLessonIndex = lessonIndex > 0 ? lessonIndex - 1 : null;
  const nextLessonIndex = lessonIndex < allQuestionSlugs.length - 1 ? lessonIndex + 1 : null;

  const [user, question, totalSubmissions] = await Promise.all([
    useUserServer(),
    getQuestion('slug', questionSlug),
    getQuestionStats('slug', questionSlug),
  ]);

  if (!question || !question.slug) {
    return <NoDailyQuestion textAlign="center" />;
  }

  // Not resolving the promises here - passing the promises and
  // using 'use' to resolve them in their own components
  const relatedQuestions = getRelatedQuestions({
    questionSlug: question.slug,
    tags: question.tags || [],
    limit: 10,
  });
  const suggestedQuestions = getSuggestions({ limit: 2 });
  const userAnswered = getUserAnswer({ questionUid: question.uid });
  const isPremiumUser = user && user.userLevel !== 'FREE';

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const questionPromise = getQuestion('slug', questionSlug);

  // Create navigation data for the study path
  const studyPathNavigation = {
    nextQuestion:
      nextLessonIndex !== null
        ? `/roadmap/learn/${slug}/${subSection}/lesson?lesson=${nextLessonIndex}`
        : // If we're at the last lesson, allow navigation back to the roadmap overview
          `/roadmaps/${slug}`,
    previousQuestion:
      prevLessonIndex !== null
        ? `/roadmap/learn/${slug}/${subSection}/lesson?lesson=${prevLessonIndex}`
        : // If we're at the first lesson, allow navigation back to the roadmap overview
          `/roadmaps/${slug}`,
  };

  if (question.isPremiumQuestion && user?.userLevel === 'FREE') {
    return <PremiumQuestionDeniedAccess />;
  }

  if (question.questionType === 'SIMPLE_MULTIPLE_CHOICE') {
    return (
      <PremiumContentWrapper>
        <QuestionSingleContextProvider
          question={question}
          user={user}
          relatedQuestions={relatedQuestions}
          userAnswered={userAnswered}
          suggestedQuestions={suggestedQuestions}
        >
          <QuestionPageHeader
            question={question}
            isStudyPathLesson={true}
            studyPathSlug={slug}
            studyPathMetadata={{
              lessonIndex: lessonIndex,
              totalLessons: allQuestionSlugs.length,
              subSection: subSection,
              subSectionName: sectionName,
            }}
          />
          <LessonTransitionWrapper>
            <MultipleChoiceLayout
              question={question}
              nextAndPreviousQuestion={studyPathNavigation}
            />
          </LessonTransitionWrapper>
        </QuestionSingleContextProvider>
      </PremiumContentWrapper>
    );
  }

  const leftContent = (
    <div className="flex flex-col gap-y-4 p-3 lg:pr-1.5 h-full">
      <Suspense fallback={<LoadingSpinner />}>
        <QuestionCard
          questionPromise={questionPromise}
          totalSubmissions={totalSubmissions}
          user={user}
          identifier="slug"
          nextAndPreviousQuestion={studyPathNavigation}
          studyPathMetadata={{
            studyPathSlug: slug,
            subSection: subSection,
            subSectionName: sectionName,
            lessonIndex: lessonIndex,
            totalLessons: allQuestionSlugs.length,
          }}
        />
      </Suspense>
    </div>
  );

  const rightContent = (
    <div
      className={`hidden lg:flex flex-col gap-4 p-3 lg:pl-1.5 h-full ${
        question?.testCases?.length ? 'lg:pb-1.5' : 'lg:pb-3'
      }`}
    >
      <div
        id="code-snippet"
        className="bg-black-75 border border-black-50 rounded-xl relative h-full overflow-y-auto scrollable-element"
      >
        <div className="px-4 py-2.5 text-sm flex w-full justify-between items-center bg-black-25">
          <span className="text-xs font-medium flex items-center gap-x-2">
            <WindowCode2 width="1.25em" height="1.25em" />
            Code
          </span>
          <div className="flex items-center gap-x-3">
            <AiQuestionHelp question={question} user={user} questionType="study-path" />
            <ChangeCodeTheme user={user} />
            {question.codeSnippet && <ExpandedCodeModal code={question.codeSnippet} />}
          </div>
        </div>
        <Separator className="bg-black-50" />
        {question?.questionType === 'CODING_CHALLENGE' ? <CodeEditor /> : <CodeDisplayWrapper />}
      </div>
    </div>
  );

  const rightBottomContent = question?.testCases?.length ? <TestCaseSection /> : null;

  return (
    <PremiumContentWrapper>
      <TourStartModal user={user} />
      <QuestionSingleContextProvider
        question={question}
        user={user}
        relatedQuestions={relatedQuestions}
        userAnswered={userAnswered}
        suggestedQuestions={suggestedQuestions}
      >
        <QuestionPageHeader
          question={question}
          isStudyPathLesson={true}
          studyPathSlug={slug}
          studyPathMetadata={{
            lessonIndex: lessonIndex,
            totalLessons: allQuestionSlugs.length,
            subSection: subSection,
            subSectionName: sectionName,
          }}
        />
        <LessonTransitionWrapper>
          <ResizableLayout
            leftContent={leftContent}
            rightTopContent={rightContent}
            rightBottomContent={rightBottomContent}
            initialLeftWidth={50}
            initialRightTopHeight={question?.testCases?.length ? 70 : 100}
          />
          {question.isPremiumQuestion && !isPremiumUser && <PremiumQuestionDeniedAccess />}
        </LessonTransitionWrapper>
      </QuestionSingleContextProvider>
    </PremiumContentWrapper>
  );
}
