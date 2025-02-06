import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { getQuestions } from '@/actions/questions/admin/list';
import { getStudyPath } from '@/utils/data/study-paths/get';
import { createMetadata } from '@/utils/seo';
import { capitalise, getBaseUrl } from '@/utils';
import type { QuizJsonLd } from '@/types/Seo';
import type { StudyPath } from '@prisma/client';
import StudyPathQuestionCardSkeleton from '@/components/app/study-paths/study-path-question-card-skeleton';
import QuestionCardClient from '@/components/app/questions/layout/question-card-client';

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
    keywords: [
      'javascript coding questions',
      'react coding questions',
      'web development coding questions',
      'coding challenges',
      'coding tutorials',
      'coding practice',
      'coding practice questions',
    ],
    image: {
      text: `${studyPath?.title} | TechBlitz`,
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: `/roadmaps/${params.slug}`,
  });
}

export default async function RoadmapPage({ params }: { params: { slug: string } }) {
  const studyPath = await getStudyPath(params.slug);

  if (!studyPath) {
    return <div>Study path not found</div>;
  }

  const questions = getQuestions({
    questionSlugs: studyPath?.questionSlugs ?? [],
  });

  const jsonLd: QuizJsonLd = createJsonLd(studyPath, params.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-y-12 lg:px-28">
        <Hero
          heading={<HeroHeading studyPath={studyPath} />}
          container={false}
          chip={<HeroChip studyPath={studyPath} />}
        />
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="w-full lg:w-[55%] space-y-6 pb-12">
            <Suspense fallback={<StudyPathsListSkeleton />}>
              <StudyPathsList questions={questions} studyPath={studyPath} />
            </Suspense>
          </div>
          <StudyPathSidebar studyPath={studyPath} />
        </div>
      </div>
    </>
  );
}

function StudyPathsListSkeleton() {
  return (
    <div className="flex flex-col gap-6 relative z-10">
      {Array.from({ length: 9 }).map((_, index) => (
        <QuestionCardClient
          key={index}
          questionData={null}
          index={index}
          offset={Math.sin(index * 0.9) * 4}
        >
          <StudyPathQuestionCardSkeleton />
        </QuestionCardClient>
      ))}
    </div>
  );
}

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
