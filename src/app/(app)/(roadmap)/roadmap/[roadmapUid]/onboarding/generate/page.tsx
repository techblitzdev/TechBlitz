import { fetchDefaultUserAnswers } from '@/utils/data/roadmap/questions/default/fetch-default-user-answers';
import { roadmapGenerate } from '@/actions/ai/roadmap/generate';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/loading';
import RoadmapGenerateButton from '@/components/app/roadmaps/onboarding/onboarding-generate';
import UserAnswers from '@/components/app/roadmaps/onboarding/onboarding-user-answers';
import RoadmapStatus from '@/components/app/roadmaps/onboarding/onboarding-roadmap-status';

export default async function RoadmapGeneratingPage({
  params,
}: {
  params: { roadmapUid: string };
}) {
  const { roadmapUid } = params;

  try {
    const [userAnswers, generate] = await Promise.all([
      fetchDefaultUserAnswers({ roadmapUid }),
      roadmapGenerate({ roadmapUid }),
    ]);

    // Sort answers by question order
    userAnswers.sort((a, b) => a.question.order - b.question.order);

    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl p-8 border border-black-50 shadow-2xl rounded-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10">
            <section className="flex-1" aria-labelledby="user-answers">
              <UserAnswers answers={userAnswers} />
            </section>

            <section
              className="flex-1 flex flex-col items-center justify-center space-y-8 lg:border-l lg:border-black-50 lg:pl-12"
              aria-labelledby="roadmap-status"
            >
              <RoadmapStatus isGenerated={generate.length > 0} />
              <div className="w-full max-w-xs">
                <Suspense fallback={<LoadingSpinner />}>
                  <RoadmapGenerateButton
                    roadmapUid={roadmapUid}
                    generate={generate.length ? 'generated' : ''}
                  />
                </Suspense>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error generating roadmap:', error);
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-400">
            We're having trouble generating your roadmap. Please try again
            later.
          </p>
        </div>
      </main>
    );
  }
}
