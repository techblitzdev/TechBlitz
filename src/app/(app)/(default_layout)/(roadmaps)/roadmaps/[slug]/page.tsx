import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// actions
import { getQuestions } from '@/actions/questions/admin/list';

// utils
import { createMetadata } from '@/utils/seo';
import { getAndGroupStudyPathQuestions, getStudyPath } from '@/utils/data/study-paths/get';
import { capitalise, getBaseUrl } from '@/utils';

// types
import type { QuizJsonLd } from '@/types/Seo';
import type { StudyPath } from '@prisma/client';
import { Question } from '@/types/Questions';

// components
import { Answer } from '@/types/Answers';
import { StudyPathWithOverviewData } from '@/types/StudyPath';

const SubSectionCardClient = dynamic(
  () => import('@/components/app/study-paths/subsection-card-client')
);
const StudyPathsList = dynamic(() => import('@/components/app/study-paths/list'), {
  loading: () => <StudyPathsListSkeleton />,
});
const StudyPathsSubSectionList = dynamic(
  () => import('@/components/app/study-paths/list').then((mod) => mod.StudyPathsSubSectionList),
  { loading: () => <StudyPathsListSkeleton /> }
);
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
    <div className="flex flex-col gap-6 relative z-10 w-full">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-black-75 animate-pulse rounded-xl h-28 w-full border-2 border-black-50"
        />
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
const SectionHeader = ({
  title,
  color,
}: {
  title: string;
  icon?: string | null;
  color?: string;
}) => {
  return (
    <div className="flex items-center justify-center gap-x-3 mb-8">
      <hr className="w-full border-t-2 border-black-50" />
      <h2 className="text-xl font-bold flex-shrink-0" style={{ color: color || 'inherit' }}>
        {title}
      </h2>
      <hr className="w-full border-t-2 border-black-50" />
    </div>
  );
};

/**
 * Component for displaying a subsection header with title.
 */
const SubSectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center mb-6">
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
};

/**
 * Component for displaying all sections of a study path.
 */
function StudyPathSections({
  studyPathSections,
  studyPath,
}: {
  studyPathSections: any[];
  studyPath: StudyPathWithOverviewData;
}) {
  if (!studyPathSections || studyPathSections.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No content available for this roadmap yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-16">
      {studyPathSections.map((section, sectionIndex) => {
        // Skip sections with no content
        if (
          (!section.questions || section.questions.length === 0) &&
          (!section.subSections || section.subSections.length === 0)
        ) {
          return null;
        }

        return (
          <div key={section.key} className="space-y-8">
            <SectionHeader title={section.sectionName} icon={section.icon} color={section.color} />

            {/* Render subsections if any */}
            {section.subSections && section.subSections.length > 0 && (
              <div className="space-y-6 pl-4">
                <Suspense fallback={<StudyPathsListSkeleton />}>
                  <StudyPathsSubSectionList
                    studyPath={studyPath}
                    subSections={section.subSections}
                    sectionIndex={sectionIndex}
                    offsetType="sine"
                    offsetMultiplier={1}
                    className="gap-8"
                  />
                </Suspense>
              </div>
            )}

            {/* Render main section questions if any and no subsections */}
            {section.questions && section.questions.length > 0 && !section.subSections && (
              <div className="pl-4">
                <Suspense fallback={<StudyPathsListSkeleton />}>
                  <StudyPathsList
                    questions={section.questions}
                    studyPath={{
                      ...studyPath,
                      questionSlugs: section.questions.map((q: Question) => q.slug).filter(Boolean),
                    }}
                    className="gap-8"
                  />
                </Suspense>
              </div>
            )}
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

  const studyPathSectionData = await getAndGroupStudyPathQuestions({ studyPath: studyPathData });

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
          chip={<HeroChip />}
        />
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          <div className="w-full lg:w-[55%] flex-1">
            <Suspense fallback={<StudyPathsListSkeleton />}>
              <StudyPathSections
                studyPathSections={studyPathSectionData}
                studyPath={studyPathData}
              />
            </Suspense>
          </div>
          <StudyPathSidebar studyPath={studyPathData} />
        </div>
      </div>
    </>
  );
}
