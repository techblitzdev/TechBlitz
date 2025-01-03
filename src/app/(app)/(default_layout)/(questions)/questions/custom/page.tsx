import { Suspense } from 'react';

// Components
import Filter from '@/components/global/filters/filter';
import FilterChips from '@/components/global/filters/chips';
import Hero from '@/components/global/hero';
import QuestionPageSidebarLoading from '@/components/app/questions/question-page-sidebar-loading';
import QuestionPageSidebar from '@/components/app/questions/question-page-sidebar';

// Hooks
import { useUserServer } from '@/hooks/use-user-server';

export default async function CustomQuestionsPage() {
  const user = await useUserServer();
  if (!user) return null;

  return (
    <>
      <Hero
        heading="Custom Questions"
        subheading="Questions created just for you."
      />
      <div className="md:container flex flex-col lg:flex-row mt-5 gap-16">
        <div className="w-full lg:w-[55%] space-y-6">
          <Filter />
          <FilterChips />
        </div>
        <Suspense fallback={<QuestionPageSidebarLoading />}>
          {user && <QuestionPageSidebar user={user} />}
        </Suspense>
      </div>
    </>
  );
}
