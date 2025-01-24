import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const QuestionPageSidebar = dynamic(
  () => import('@/components/app/questions/layout/question-page-sidebar'),
  {
    loading: () => <QuestionPageSidebarLoading />,
  }
);
import QuestionPageSidebarLoading from '@/components/app/questions/layout/question-page-sidebar-loading';

const QuestionsCarouselList = dynamic(
  () =>
    import('@/components/app/questions/layout/carousel/question-carousel-list')
);

import Hero from '@/components/global/hero';
import { createMetadata } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { useUserServer } from '@/hooks/use-user-server';
import ContinueJourney from '@/components/global/navigation/continue-journey-button';
import { ArrowRightIcon } from 'lucide-react';

// revalidate every 10 minutes
export const revalidate = 600;

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
    canonicalUrl: '/questions/study-paths',
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
              Resume your journey
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          }
        >
          <ContinueJourney text="Resume your journey" variant="default" />
        </Suspense>
      </div>
    </div>
  </div>
);

export default async function ExploreQuestionsPage() {
  const user = await useUserServer();

  return (
    <>
      <Hero
        heading="Study paths"
        subheading={heroDescription}
        container={false}
      />
      <div className="flex flex-col xl:flex-row mt-5 gap-16">
        <div className="w-full lg:min-w-[70%] space-y-6">
          <QuestionsCarouselList user={user} />
        </div>
        <Suspense fallback={<QuestionPageSidebarLoading />}>
          <QuestionPageSidebar />
        </Suspense>
      </div>
    </>
  );
}
