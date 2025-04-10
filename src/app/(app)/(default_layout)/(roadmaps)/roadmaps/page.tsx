import { Suspense } from 'react';

import Hero from '@/components/shared/hero';
import { createMetadata } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import ContinueJourney from '@/components/app/navigation/continue-journey-button';
import { ArrowRightIcon } from 'lucide-react';
import { getAllStudyPaths, categoryOrder } from '@/utils/data/study-paths/get';
import { StudyPathCard } from '@/components/app/study-paths/study-path-card';
import { WebPageJsonLd } from '@/types/Seo';
import { getBaseUrl } from '@/utils';

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

export default async function ExploreQuestionsPage() {
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

  // run in parallel
  const [studyPaths] = await Promise.all([getAllStudyPaths()]);

  // group study paths by category
  const studyPathsByCategory: Record<string, typeof studyPaths> = studyPaths.reduce(
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

  // Sort categories according to the predefined order
  const sortedCategories = Object.keys(studyPathsByCategory).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    // If category is not in our predefined list, place it at the end
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    // Otherwise sort by the predefined order
    return indexA - indexB;
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-y-12 max-w-7xl mx-auto">
        <Hero heading="Library" subheading={heroDescription} container={true} />
        <div className="lg:container flex flex-col lg:flex-row mt-5 gap-16">
          <div className="w-full flex flex-col gap-12">
            {sortedCategories.map((category) => (
              <div key={category} className="space-y-6">
                <h2 className="text-2xl font-bold text-white">{category}</h2>
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
    </>
  );
}
