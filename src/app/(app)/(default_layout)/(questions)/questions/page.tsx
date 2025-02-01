import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import Hero from '@/components/shared/hero';
import { Button } from '@/components/ui/button';

import { validateSearchParams, parseSearchParams } from '@/utils/search-params';
import { getTags } from '@/utils/data/questions/tags/get-tags';
import { createMetadata, WebPageJsonLdBreadcrumb } from '@/utils/seo';

const Filter = dynamic(() => import('@/components/app/filters/filter'), {
  ssr: false,
  loading: () => <FilterLoading />,
});

const FilterChips = dynamic(() => import('@/components/app/filters/chips'), {
  ssr: false,
  loading: () => <div className="h-8"></div>,
});
const QuestionsList = dynamic(
  () => import('@/components/app/questions/layout/questions-list'),
  {
    loading: () => (
      <div className="flex flex-col gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <QuestionCardSkeleton key={index} />
        ))}
      </div>
    ),
  }
);
const QuestionPageSidebar = dynamic(
  () => import('@/components/app/questions/layout/question-page-sidebar'),
  {
    loading: () => <QuestionPageSidebarLoading />,
  }
);

import FilterLoading from '@/components/app/filters/filters-loading';
import QuestionPageSidebarLoading from '@/components/app/questions/layout/question-page-sidebar-loading';
import { QuestionCardSkeleton } from '@/components/app/questions/layout/question-card';
import ContinueJourney from '@/components/app/navigation/continue-journey-button';
import { ArrowRightIcon } from 'lucide-react';
import { WebPageJsonLd } from '@/types/Seo';
import { getBaseUrl } from '@/utils';

export const revalidate = 600;

export async function generateMetadata() {
  return createMetadata({
    title: 'Coding Questions | TechBlitz',
    description:
      'Explore a diverse set of coding questions across multiple topics to enhance your knowledge.',
    image: {
      text: 'Coding Questions | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/questions',
  });
}

const heroDescription = (
  <div className="flex flex-col gap-y-4 z-20 relative font-inter max-w-3xl">
    <p className="text-sm md:text-base text-gray-400">
      Explore all the questions we have to offer. Filter by tags, question type,
      difficulty, and more.
    </p>
    <p className="text-gray-400">Need a more guided set of questions?</p>
    <div className="flex flex-col md:flex-row gap-2 md:items-center">
      <Button href="/study-paths" variant="secondary">
        Explore study paths
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
);

export default async function QuestionsDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // create json ld
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/questions`,
    headline: 'Coding Challenges | TechBlitz',
    description:
      'Explore a diverse set of coding questions across multiple topics to enhance your knowledge.',
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

  const tagsPromise = getTags();

  const filters = parseSearchParams(searchParams);
  if (!validateSearchParams(filters)) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero heading="Coding Challenges" subheading={heroDescription} />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 group">
        <div className="flex flex-col xl:flex-row gap-12">
          <div className="w-full lg:min-w-[75%] space-y-6">
            <div className="min-h-[84px] flex flex-col gap-y-2">
              <Suspense fallback={<FilterLoading />}>
                <Filter tagsPromise={tagsPromise} />
                <FilterChips />
              </Suspense>
            </div>
            <QuestionsList
              currentPage={filters.page || 1}
              filters={filters}
              customQuestions={false}
              paginationUrl="/questions"
              postsPerPage={filters.postsPerPage || 15}
            />
          </div>
          <QuestionPageSidebar />
        </div>
      </div>
    </>
  );
}
