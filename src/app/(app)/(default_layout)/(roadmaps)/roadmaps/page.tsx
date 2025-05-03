import { Suspense } from 'react';

// components
import Hero from '@/components/shared/hero';
import { Button } from '@/components/ui/button';
import ContinueJourney from '@/components/app/navigation/continue-journey-button';
import { ArrowRightIcon, InfoIcon } from 'lucide-react';
import { StudyPathCard } from '@/components/app/study-paths/study-path-card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// utils
import { createMetadata } from '@/utils/seo';
import { getStudyPathsAndGroupByCategory } from '@/utils/data/study-paths/get';
import { getBaseUrl } from '@/utils';
import { roadmapPageSteps } from '@/lib/onborda';

// types
import { WebPageJsonLd } from '@/types';
import { Onborda, OnbordaProvider } from 'onborda';
import { TourCard } from '@/components/app/shared/question/tour-card';

export async function generateMetadata() {
  return createMetadata({
    title: 'Learning Paths | TechBlitz',
    description:
      'A collection of learning paths, ranging from Javascript, React, Node, Web Development. Created to help you learn and grow your skills in different areas of programming.',
    image: {
      text: 'Learning Paths | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/roadmaps',
  });
}

const heroDescription = (
  <div className="flex flex-col gap-y-4 z-20 relative font-inter max-w-3xl">
    <p className="text-sm md:text-base text-gray-400 font-onest">
      Explore our library of programming learning paths, consisting of many different topics on the
      web. Set your own goals and work your way through the challenges at your own pace, and get 1%
      better every day.
    </p>
    <div className="flex flex-col gap-y-2">
      <p className="text-gray-400 font-onest">Can't find what you're looking for?</p>
      <div className="flex items-center gap-x-2 pt-1">
        <Button href="/coding-challenges" variant="secondary">
          View all challenges
        </Button>
        <Suspense
          fallback={
            <Button variant="ghost" className="w-full">
              Your next recommended question
              <ArrowRightIcon className="size-4" />
            </Button>
          }
        >
          <ContinueJourney text="Your next recommended question" variant="ghost" />
        </Suspense>
      </div>
    </div>
  </div>
);

export default async function ExploreQuestionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // used to determine if the onboarding tour guide needs to be shown.
  const { onboarding } = searchParams;

  // create json ld
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/roadmaps`,
    headline: 'Learning Paths | TechBlitz',
    description:
      'Curated lists of coding questions, ranging from Javascript, React, Node, Web Development. Perfect for your daily coding practice.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${getBaseUrl()}` },
        { '@type': 'ListItem', position: 2, name: 'Roadmaps', item: `${getBaseUrl()}/roadmaps` },
      ],
    },
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

  const { categories, studyPathsByCategory } = await getStudyPathsAndGroupByCategory({
    sortCategoryOrder: true,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OnbordaProvider>
        <Onborda
          steps={roadmapPageSteps()}
          showOnborda={true}
          shadowRgb="0,0,0"
          shadowOpacity="0.8"
          cardComponent={TourCard}
          cardTransition={{ duration: 0.3, type: 'tween' }}
        >
          <div className="flex flex-col gap-y-12 max-w-7xl mx-auto">
            <Hero heading="Library" subheading={heroDescription} container={true} />
            <div className="lg:container flex flex-col lg:flex-row mt-5 gap-16">
              <div className="w-full flex flex-col gap-12">
                {categories.map((category) => (
                  <div key={category} className="space-y-6">
                    <div className="flex items-center gap-x-2">
                      <h2 className="text-2xl font-bold text-white">{category}</h2>
                      {studyPathsByCategory[category][0].categoryToolTip && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="size-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            {studyPathsByCategory[category][0].categoryToolTip}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {studyPathsByCategory[category].map((studyPath) => (
                        <StudyPathCard key={studyPath.uid} studyPath={studyPath} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Onborda>
      </OnbordaProvider>
    </>
  );
}
