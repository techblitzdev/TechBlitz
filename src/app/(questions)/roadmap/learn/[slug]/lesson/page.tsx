import { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

// Utils and Data Fetching
import { getStudyPath } from '@/utils/data/study-paths/get';
import { getQuestion } from '@/utils/data/questions/get';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import { createMetadata } from '@/utils/seo';
import { useUserServer } from '@/hooks/use-user-server';

// Components
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

// UI Components
import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/shared/no-daily-question';
import LoadingSpinner from '@/components/ui/loading';
import { Expand, StarsIcon } from 'lucide-react';
import EditorIcon from '@/components/ui/icons/editor';
import WindowCode2 from '@/components/ui/icons/window-code';
import QuestionCardLoading from '@/components/app/questions/single/layout/question-card-loading';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const studyPath = await getStudyPath(params.slug);

  if (!studyPath) {
    return createMetadata({
      title: 'Roadmap Lesson Not Found | TechBlitz',
      description: 'Roadmap lesson not found',
    });
  }

  return createMetadata({
    title: `${studyPath?.title} - Lesson | TechBlitz`,
    description: studyPath?.description,
    image: {
      text: `${studyPath?.title} - Lesson | TechBlitz`,
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: `/roadmaps/${params.slug}/lesson`,
  });
}

export default async function RoadmapLessonPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { lesson?: string };
}) {
  const { slug } = params;
  const lessonIndex = searchParams.lesson ? parseInt(searchParams.lesson, 10) : 0;

  // Fetch the study path
  const studyPath = await getStudyPath(slug);

  if (!studyPath) {
    return <div>Study path not found</div>;
  }

  // Get all question slugs from either overviewData or questionSlugs
  let allQuestionSlugs: string[] = [];

  if (studyPath.overviewData) {
    // If we have overviewData, extract questionSlugs from each section
    allQuestionSlugs = Object.values(studyPath.overviewData)
      .flatMap((section: any) => section.questionSlugs || [])
      .filter(Boolean);
  } else {
    // Fall back to regular questionSlugs
    allQuestionSlugs = studyPath.questionSlugs || [];
  }

  // Ensure the lesson index is valid
  if (lessonIndex < 0 || lessonIndex >= allQuestionSlugs.length) {
    redirect(`/roadmaps/${slug}`);
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

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const questionPromise = getQuestion('slug', questionSlug);

  // Create navigation data for the study path
  const studyPathNavigation = {
    nextQuestion:
      nextLessonIndex !== null ? `/roadmaps/${slug}/lesson?lesson=${nextLessonIndex}` : null,
    previousQuestion:
      prevLessonIndex !== null ? `/roadmaps/${slug}/lesson?lesson=${prevLessonIndex}` : null,
  };

  if (question.questionType === 'SIMPLE_MULTIPLE_CHOICE') {
    return (
      <PremiumContentWrapper>
        <MultipleChoiceLayout question={question} nextAndPreviousQuestion={studyPathNavigation} />
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
      <ResizableLayout
        leftContent={leftContent}
        rightTopContent={rightContent}
        rightBottomContent={rightBottomContent}
        initialLeftWidth={50}
        initialRightTopHeight={question?.testCases?.length ? 70 : 100}
      />
    </PremiumContentWrapper>
  );
}
