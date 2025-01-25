import { getQuestions } from '@/actions/questions/admin/list';
import StudyPathsList from '@/components/app/study-paths/list';
import StudyPathSidebar from '@/components/app/study-paths/study-path-sidebar';
import Hero from '@/components/global/hero';
import { Button } from '@/components/ui/button';
import { QuizJsonLd } from '@/types/Seo';
import { capitalise, getBaseUrl } from '@/utils';
import { StudyPath, studyPaths } from '@/utils/constants/study-paths';
import { createMetadata } from '@/utils/seo';
import { ArrowRightIcon, Sparkles } from 'lucide-react';

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

const getStartedCta = () => {
  return (
    <Button href="/questions" variant="secondary" className="z-30">
      Get started
      <ArrowRightIcon className="w-4 h-4" />
    </Button>
  );
};

const heroChip = (studyPath: StudyPath) => {
  return (
    <span className="text-xs text-white px-2 py-1 rounded-full w-fit flex items-center gap-x-2">
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
      <Hero
        heading={studyPath?.title}
        container={true}
        chip={heroChip(studyPath)}
      >
        {getStartedCta()}
      </Hero>
      <div className="container flex gap-12">
        <div className="w-full lg:w-[65%] space-y-6">
          <StudyPathsList questions={questions} studyPath={studyPath} />
        </div>
        <StudyPathSidebar studyPath={studyPath} />
      </div>
    </>
  );
}
