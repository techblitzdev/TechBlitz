import { Suspense, lazy } from 'react';

import Hero from '@/components/shared/hero';
import { Button } from '@/components/ui/button';
import { validateSearchParams, parseSearchParams } from '@/utils/search-params';
import { createMetadata } from '@/utils/seo';
import FilterLoading from '@/components/app/filters/filters-loading';
import QuestionPageSidebarLoading from '@/components/app/questions/layout/question-page-sidebar-loading';
import { QuestionCardSkeleton } from '@/components/app/questions/layout/question-card';
import { ArrowRightIcon } from 'lucide-react';
import type { WebPageJsonLd } from '@/types/Seo';
import { getBaseUrl } from '@/utils';

const Filter = lazy(() => import('@/components/app/filters/filter'));
const FilterChips = lazy(() => import('@/components/app/filters/chips'));
const QuestionsList = lazy(() => import('@/components/app/questions/layout/questions-list'));
const QuestionPageSidebar = lazy(
  () => import('@/components/app/questions/layout/question-page-sidebar')
);
const ContinueJourney = lazy(() => import('@/components/app/navigation/continue-journey-button'));

export const revalidate = 600;

export async function generateMetadata() {
  return createMetadata({
    title: 'Coding Challenges | TechBlitz',
    description:
      'Explore a diverse set of coding challenges across various topics to enhance your knowledge.',
    image: {
      text: 'Coding Challenges | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/coding-challenges',
  });
}

const heroDescription = (
  <div className="flex flex-col gap-y-4 z-20 relative font-onest max-w-3xl">
    <p className="text-sm md:text-base text-gray-400">
      Explore our collection of coding challenges and practice questions. Filter by topic,
      difficulty, and more to find the perfect challenges for your learning journey.
    </p>
    <div className="flex flex-col md:flex-row gap-4 md:items-center">
      <Button href="/roadmaps" variant="secondary">
        View Learning Paths
      </Button>
      <Suspense
        fallback={
          <Button variant="default" className="w-full">
            Your next challenge
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        }
      >
        <ContinueJourney text="Your next challenge" variant="default" />
      </Suspense>
    </div>
  </div>
);

export default async function QuestionsDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/coding-challenges`,
    headline: 'Coding Challenges | TechBlitz',
    description:
      'Explore a diverse set of coding challenges across various topics to enhance your knowledge.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Coding Challenges',
          item: getBaseUrl() + '/coding-challenges',
        },
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
      '@id': `${getBaseUrl()}/coding-challenges`,
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

  const filters = parseSearchParams(searchParams);
  if (!validateSearchParams(filters)) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero heading="Coding Challenges" subheading={heroDescription} />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 group flex flex-col xl:flex-row gap-12">
        <div className="w-full lg:min-w-[75%] space-y-6">
          <div className="min-h-[84px] flex flex-col gap-y-2">
            <Suspense fallback={<FilterLoading />}>
              <Filter />
              <FilterChips />
            </Suspense>
          </div>
          <Suspense
            fallback={
              <div className="flex flex-col gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <QuestionCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            <QuestionsList
              currentPage={filters.page || 1}
              filters={filters}
              customQuestions={false}
              paginationUrl="/coding-challenges"
              postsPerPage={filters.postsPerPage || 15}
            />
          </Suspense>
        </div>
        <Suspense fallback={<QuestionPageSidebarLoading />}>
          <QuestionPageSidebar />
        </Suspense>
      </div>
    </>
  );
}
