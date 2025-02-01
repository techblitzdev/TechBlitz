import { Suspense } from 'react';

import Hero from '@/components/shared/hero';
import { createMetadata, WebPageJsonLdBreadcrumb } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { useUserServer } from '@/hooks/use-user-server';
import ContinueJourney from '@/components/app/navigation/continue-journey-button';
import { ArrowRightIcon, Mail } from 'lucide-react';
import { getAllStudyPaths } from '@/utils/data/study-paths/get';
import { StudyPathCard } from '@/components/app/study-paths/study-path-card';
import FeedbackButton from '@/components/app/shared/feedback/feedback-button';
import UpgradeCard from '@/components/app/shared/upgrade-card';
import { WebPageJsonLd } from '@/types/Seo';
import { getBaseUrl } from '@/utils';

export async function generateMetadata() {
  return createMetadata({
    title: 'Study paths | TechBlitz',
    description:
      'A collection of coding questions, ranging from Javascript, React, Node, Web Development. Aimed to enhance your coding skills in each domain.',
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
      text: 'Study paths | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/study-paths',
  });
}

const heroDescription = (
  <div className="flex flex-col gap-y-4 z-20 relative font-inter max-w-3xl">
    <p className="text-sm md:text-base text-gray-400">
      Curated lists of coding questions, ranging from Javascript, React, Node,
      Web Development. Perfect for your daily coding practice.
    </p>
    <div className="flex flex-col gap-y-2">
      <p className="text-gray-400">Can't find what you're looking for?</p>
      <div className="flex items-center gap-x-2">
        <Button href="/questions" variant="secondary">
          View all questions
        </Button>
        <Suspense
          fallback={
            <Button variant="default" className="w-full">
              Your next recommended question
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          }
        >
          <ContinueJourney
            text="Your next recommended question"
            variant="default"
          />
        </Suspense>
      </div>
    </div>
  </div>
);

export default async function ExploreQuestionsPage() {
  // create json ld
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/study-paths`,
    headline: 'Study paths | TechBlitz',
    description:
      'Curated lists of coding questions, ranging from Javascript, React, Node, Web Development. Perfect for your daily coding practice.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
    breadcrumb: WebPageJsonLdBreadcrumb,
    author: {
      '@type': 'Organization',
      name: 'TechBlitz',
      url: getBaseUrl(),
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getBaseUrl(),
    },
    keywords:
      'learn to code for free, beginner-friendly coding lessons, interactive coding challenges, daily programming practice, personalized coding roadmap, improve coding skills, best platform to learn coding, AI-assisted coding, learn javascript',
    publisher: {
      '@type': 'Organization',
      name: 'TechBlitz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://techblitz.dev/favicon.ico',
      },
    },
  };

  const user = await useUserServer();

  const studyPaths = await getAllStudyPaths();

  // group study paths by category
  const studyPathsByCategory: Record<string, typeof studyPaths> =
    studyPaths.reduce(
      (acc, studyPath) => {
        const category = studyPath.category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(studyPath);
        return acc;
      },
      {} as Record<string, typeof studyPaths>
    );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-y-12 max-w-7xl mx-auto">
        <Hero
          heading="Study paths"
          subheading={heroDescription}
          container={true}
        />
        <div className="lg:container flex flex-col lg:flex-row mt-5 gap-16">
          <div className="w-full lg:w-[70%] flex flex-col gap-12">
            {Object.entries(studyPathsByCategory).map(([category, paths]) => (
              <div key={category} className="space-y-6">
                <h2 className="text-2xl font-bold text-white">{category}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {paths.map((studyPath) => (
                    <StudyPathCard key={studyPath.uid} studyPath={studyPath} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <aside className="w-full lg:w-[30%] flex flex-col gap-5 order-first lg:order-last">
            {user?.userLevel === 'FREE' && (
              <UpgradeCard
                title="Looking for a more personalized experience?"
                description="Unlock your full potential with a personalized study plan tailored just for you. Get focused learning paths, progress tracking, and expert guidance to learn 3x faster."
              />
            )}
            <div className="bg-[#090909] flex flex-col gap-y-2 backdrop-blur-sm border border-black-50 p-4 rounded-lg h-fit">
              <div className="flex items-center space-x-2 text-white">
                <Mail className="size-5 text-white" />
                <span>Suggest a study path</span>
              </div>
              <p className="text-sm text-muted-foreground">
                We are adding new study paths every week. If you have a study
                path in mind, please let us know and we will get back to you as
                soon as possible.
              </p>
              <FeedbackButton title="Suggest a study path" />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
