import { getQuestions } from '@/actions/questions/admin/list';
import { enrollInStudyPath } from '@/actions/study-paths/enroll';
import StudyPathsList from '@/components/app/study-paths/list';
import StudyPathSidebar from '@/components/app/study-paths/study-path-sidebar';
import Hero from '@/components/global/hero';
import { Button } from '@/components/ui/button';
import { useUserServer } from '@/hooks/use-user-server';
import { QuizJsonLd } from '@/types/Seo';
import { UserRecord } from '@/types/User';
import { capitalise, getBaseUrl } from '@/utils';
import { StudyPath, studyPaths } from '@/utils/constants/study-paths';
import { createMetadata } from '@/utils/seo';
import { ArrowRightIcon, Sparkles } from 'lucide-react';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const studyPath = studyPaths.find((path) => path.slug === params.slug);

  if (!studyPath) {
    return createMetadata({
      title: 'Study path not found | TechBlitz',
      description: 'Study path not found',
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
    canonicalUrl: `/questions/study-paths/${params.slug}`,
  });
}

const getStartedCta = async (studyPath: StudyPath) => {
  const user = await useUserServer();

  // the button will be disabled if the user is a free user and has reached the maximum number of study paths
  // the button will be disabled if the user is already enrolled in the study path
  const isDisabled =
    user?.userLevel === 'FREE' &&
    (user?.studyPathEnrollments?.length ?? 0) === 0;

  return (
    <form
      action={async () => {
        'use server';
        await enrollInStudyPath(studyPath.slug);

        // redirect to the first question in the study path
        redirect(`/questions/${studyPath.questionSlugs[0]}`);
      }}
    >
      <Button
        type="submit"
        variant="secondary"
        className="z-30 relative flex items-center gap-x-2"
        disabled={isDisabled}
      >
        Enroll now
        <ArrowRightIcon className="w-4 h-4" />
      </Button>
    </form>
  );
};

const heroChip = (studyPath: StudyPath) => {
  return (
    <span className="text-xs text-white px-2 py-1 rounded-full w-fit flex items-center gap-x-2 z-20">
      <Sparkles className="size-3 text-yellow-400 fill-yellow-500" />
      {studyPath?.heroChip}
    </span>
  );
};

export default async function StudyPathPage({
  params,
}: {
  params: { slug: string };
}) {
  const studyPath = studyPaths.find((path) => path.slug === params.slug);

  // create json ld
  const jsonLd: QuizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    // replace the - with a space and
    name: capitalise(params.slug?.replace(/-/g, ' ') || ''),
    description: studyPath?.description || '',
    url: `${getBaseUrl()}/questions/study-paths/${params.slug}`,
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

  // TODO: BETTER DISPLAY ERRORS
  if (!studyPath) {
    return <div>Study path not found</div>;
  }

  // get all of the question data for the questions in the study path
  const questions = getQuestions({
    questionSlugs: studyPath?.questionSlugs ?? [],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-y-12">
        <Hero
          heading={studyPath?.title}
          container={true}
          chip={heroChip(studyPath)}
        >
          {getStartedCta(studyPath)}
        </Hero>
        <div className="container flex gap-12">
          <div className="w-full lg:w-[65%] space-y-6">
            <StudyPathsList questions={questions} studyPath={studyPath} />
          </div>
          <StudyPathSidebar studyPath={studyPath} />
        </div>
      </div>
    </>
  );
}
