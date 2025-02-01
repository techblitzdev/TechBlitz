import { fetchDefaultUserAnswers } from "@/utils/data/roadmap/questions/default/fetch-default-user-answers";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loading";
import RoadmapGenerateButton from "@/components/app/roadmaps/onboarding/onboarding-generate";
import UserAnswers from "@/components/app/roadmaps/onboarding/onboarding-user-answers";
import RoadmapStatus from "@/components/app/roadmaps/onboarding/onboarding-roadmap-status";

async function RoadmapGenerateWrapper({ roadmapUid }: { roadmapUid: string }) {
  try {
    const { roadmapGenerate } = await import("@/actions/ai/roadmap/generate");
    const generate = await roadmapGenerate({ roadmapUid });
    return (
      <RoadmapGenerateButton
        roadmapUid={roadmapUid}
        generate={generate.length ? "generated" : ""}
      />
    );
  } catch (error) {
    console.error("Error in roadmap generation:", error);
    return null;
  }
}

export default async function RoadmapGeneratingPage({
  params,
}: {
  params: { roadmapUid: string };
}) {
  const { roadmapUid } = params;

  try {
    const userAnswers = await fetchDefaultUserAnswers({ roadmapUid });

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
              <RoadmapStatus isGenerated={false} />
              <div className="w-full max-w-xs">
                <Suspense fallback={<LoadingSpinner />}>
                  <RoadmapGenerateWrapper roadmapUid={roadmapUid} />
                </Suspense>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-400">
            We're having trouble generating your roadmap. Please contact support
            so we can help you out.
          </p>
        </div>
      </main>
    );
  }
}
