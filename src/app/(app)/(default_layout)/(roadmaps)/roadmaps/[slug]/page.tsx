import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// actions
import { getQuestions } from '@/actions/questions/admin/list';

// utils
import { createMetadata } from '@/utils/seo';
import { getStudyPath } from '@/utils/data/study-paths/get';
import { capitalise, getBaseUrl } from '@/utils';

// types
import type { QuizJsonLd } from '@/types/Seo';
import type { StudyPath } from '@prisma/client';
import { Question } from '@/types/Questions';

// components
import StudyPathQuestionCardSkeleton from '@/components/app/study-paths/study-path-question-card-skeleton';
import QuestionCardClient from '@/components/app/questions/layout/question-card-client';
import { Answer } from '@/types/Answers';
const StudyPathsList = dynamic(() => import('@/components/app/study-paths/list'), {
  loading: () => <StudyPathsListSkeleton />,
});
const StudyPathSidebar = dynamic(() => import('@/components/app/study-paths/study-path-sidebar'));
const Hero = dynamic(() => import('@/components/shared/hero'));
const HeroChip = dynamic(() => import('@/components/app/study-paths/hero-chip'));
const HeroHeading = dynamic(() => import('@/components/app/study-paths/hero-heading'));

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const studyPath = await getStudyPath(params.slug);

  if (!studyPath) {
    return createMetadata({
      title: 'Roadmap not found | TechBlitz',
      description: 'Roadmap not found',
    });
  }

  return createMetadata({
    title: `${studyPath?.title} | TechBlitz`,
    description: studyPath?.description,
    image: {
      text: `${studyPath?.title} | TechBlitz`,
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: `/roadmaps/${params.slug}`,
  });
}

/**
 * A skeleton for the study paths list.
 *
 * @returns A list of question cards.
 */
function StudyPathsListSkeleton() {
  return (
    <div className="flex flex-col gap-6 relative z-10 w-[90%]">
      {Array.from({ length: 9 }).map((_, index) => (
        <QuestionCardClient key={index} questionData={null} offset={Math.sin(index * 0.9) * 4}>
          <StudyPathQuestionCardSkeleton />
        </QuestionCardClient>
      ))}
    </div>
  );
}

/**
 * Creates a JSON-LD object for a study path.
 *
 * @param studyPath - The study path object.
 * @param slug - The slug of the study path.
 * @returns The JSON-LD object.
 */
function createJsonLd(studyPath: StudyPath, slug: string): QuizJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: capitalise(slug?.replace(/-/g, ' ') || ''),
    description: studyPath?.description || '',
    url: `${getBaseUrl()}/roadmaps/${slug}`,
    educationalUse: 'practice',
    learningResourceType: ['quiz', 'learning activity'],
    creator: {
      '@type': 'Organization',
      name: 'TechBlitz',
      url: getBaseUrl(),
    },
    assesses: ['coding'],
    educationLevel: studyPath?.educationLevel || 'beginner',
    dateCreated: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    headline: studyPath?.title || '',
    interactivityType: 'mixed',
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    teaches: 'coding',
  };
}

/**
 * Component for displaying a section header with an icon and title.
 */
function SectionHeader({ title, color }: { title: string; icon?: string | null; color?: string }) {
  return (
    <div className="flex items-center justify-center gap-x-3 mb-8">
      <hr className="w-full border-t-2 border-black-50" />
      <h2 className="text-xl font-bold flex-shrink-0" style={{ color: color || 'inherit' }}>
        {title}
      </h2>
      <hr className="w-full border-t-2 border-black-50" />
    </div>
  );
}

/**
 * Component for displaying all sections of a study path.
 */
function StudyPathSections({
  studyPath,
  questions,
}: {
  studyPath: StudyPath;
  questions: Question[];
}) {
  // If studyPath has overviewData, use it; otherwise, fall back to questionSlugs
  const overviewData = studyPath.overviewData ?? null;

  // If no overviewData, fall back to the old implementation
  if (!overviewData) {
    return (
      <Suspense fallback={<StudyPathsListSkeleton />}>
        <StudyPathsList questions={questions} studyPath={studyPath} />
      </Suspense>
    );
  }

  // Group questions by section based on overviewData
  const sections = Object.entries(overviewData).map(([key, section]) => {
    const sectionQuestions = section.questionSlugs
      .map((slug: string | null) => questions.find((q) => q.slug === slug))
      .filter((q: Question): q is Question => q !== undefined);

    return {
      key,
      ...section,
      questions: sectionQuestions,
    };
  });

  // Find the first unanswered question across all sections
  const allQuestions = sections.flatMap((section) => section.questions);
  const firstUnansweredQuestion = allQuestions.find(
    (q) =>
      !q.userAnswers?.length ||
      q.userAnswers?.some((answer: Answer) => answer.correctAnswer === false)
  );

  return (
    <div className="flex flex-col">
      {sections.map((section) => {
        // Determine if this section contains the first unanswered question
        const containsFirstUnanswered =
          firstUnansweredQuestion &&
          section.questions.some((q: Question) => q.uid === firstUnansweredQuestion.uid);

        // Create a special studyPath object for this section
        const sectionStudyPath = {
          ...studyPath,
          // Only include question slugs for this section
          questionSlugs: section.questions.map((q: Question) => q.slug).filter(Boolean) as string[],
        };

        // if this is not the section with the first unanswered question,
        // remove unanswered questions or mark them as answered to prevent "Start" from showing
        let sectionQuestions = section.questions;
        if (!containsFirstUnanswered) {
          // Deep clone the questions to avoid modifying the original
          sectionQuestions = section.questions.map((q: Question) => ({
            ...q,
            // add a fake userAnswer if there are none, to prevent it from being considered "first unanswered"
            userAnswers: q.userAnswers?.length
              ? q.userAnswers
              : [
                  {
                    uid: 'fake',
                    userUid: 'fake',
                    questionUid: q.uid,
                    correctAnswer: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    questionDate: new Date().toISOString(),
                    userAnswerUid: null,
                    timeTaken: null,
                    difficulty: 'EASY',
                  },
                ],
          }));
        }

        return (
          <div key={section.key} className="space-y-6 inline-grid">
            <SectionHeader title={section.sectionName} icon={section.icon} color={section.color} />
            <div className="pl-4 relative">
              <Suspense fallback={<StudyPathsListSkeleton />}>
                <StudyPathsList questions={sectionQuestions} studyPath={sectionStudyPath} />
              </Suspense>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function RoadmapPage({ params }: { params: { slug: string } }) {
  const studyPathData = await getStudyPath(params.slug);

  if (!studyPathData) {
    return <div>Study path not found</div>;
  }

  const jsonLd: QuizJsonLd = createJsonLd(studyPathData, params.slug);

  // Get all question slugs from either overviewData or questionSlugs
  const allQuestionSlugs = studyPathData.overviewData
    ? Object.values(studyPathData.overviewData).flatMap((section) => section.questionSlugs)
    : studyPathData.questionSlugs;

  // Fetch questions
  const questions = getQuestions({
    questionSlugs: allQuestionSlugs ?? [],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-y-12 xl:px-28">
        <Hero
          heading={<HeroHeading studyPath={studyPathData} />}
          container={false}
          chip={<HeroChip studyPath={studyPathData} />}
        />
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          <div className="w-full lg:w-[55%] flex-1">
            <Suspense fallback={<StudyPathsListSkeleton />}>
              <StudyPathSections questions={await questions} studyPath={studyPathData} />
            </Suspense>
          </div>
          <StudyPathSidebar studyPath={studyPathData} />
        </div>
      </div>
    </>
  );
}
