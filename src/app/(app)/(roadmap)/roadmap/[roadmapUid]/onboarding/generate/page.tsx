import { fetchDefaultUserAnswers } from '@/utils/data/roadmap/questions/default/fetch-default-user-answers';
import LoadingSpinner from '@/components/ui/loading';
import { Check, Route, X } from 'lucide-react';
import { Suspense } from 'react';
import RoadmapGenerateButton from '@/components/app/roadmaps/onboarding/onboarding-generate';

export default async function RoadmapGeneratingPage({
  params,
}: {
  params: { roadmapUid: string };
}) {
  const { roadmapUid } = params;

  // Fetch user answers
  const userAnswers = await fetchDefaultUserAnswers({
    roadmapUid,
  });

  // Sort answers by question order
  userAnswers.sort((a, b) => a.question.order - b.question.order);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black-100 to-black">
      <div
        className="w-full max-w-5xl p-8 border border-black-50 shadow-2xl rounded-xl relative overflow-hidden"
        style={{
          background:
            'radial-gradient(128% 107% at 0% 0%, #212121 0%, rgb(0,0,0) 77.61472409909909%)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-20"></div>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10">
          {/* User Answers Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 text-white border-b border-black-50 pb-2">
              Your Answers
            </h2>
            <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
              {userAnswers?.map((answer) => (
                <li
                  key={answer.questionUid}
                  className="flex items-center gap-4 p-4 bg-black-100/50 border border-black-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:border-accent/50"
                >
                  <span className="text-lg font-medium text-accent">
                    {answer.question.order}.
                  </span>
                  <span className={`text-sm font-semibold flex-grow`}>
                    {answer.correct ? (
                      <div className="flex items-center text-green-400">
                        Correct
                        <Check className="size-5 ml-2" />
                      </div>
                    ) : (
                      <div className="flex items-center text-destructive">
                        Incorrect
                        <X className="size-5 ml-2" />
                      </div>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Roadmap Generating Section */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 lg:border-l lg:border-black-50 lg:pl-12">
            <div className="text-center">
              <Route className="size-16 text-accent mb-4 mx-auto" />
              <h1 className="text-3xl font-bold text-white mb-2">
                Generating Your Roadmap
              </h1>
              <p className="text-sm text-gray-400 max-w-md">
                This process may take a few minutes. Please hold tight while we
                prepare your personalised learning journey.
              </p>
            </div>
            <div className="w-full max-w-xs">
              <Suspense fallback={<LoadingSpinner />}>
                <RoadmapGenerateButton roadmapUid={roadmapUid} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
