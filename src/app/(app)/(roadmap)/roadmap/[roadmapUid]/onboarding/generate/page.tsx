import { fetchDefaultUserAnswers } from '@/actions/roadmap/questions/default/fetch-default-user-answers';
import LoadingSpinner from '@/components/ui/loading';
import { useUserServer } from '@/hooks/use-user-server';
import { Check, Route, X } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import RoadmapGenerateButton from '@/components/app/roadmaps/onboarding/onboarding-generate';

export default async function RoadmapGeneratingPage({
  params,
}: {
  params: { roadmapUid: string };
}) {
  const { roadmapUid } = params;

  const user = await useUserServer();
  if (!user || !user.uid) {
    return redirect('/login');
  }

  // Fetch user answers
  const userAnswers = await fetchDefaultUserAnswers({
    roadmapUid,
  });

  // Sort answers by question order
  userAnswers.sort((a, b) => a.question.order - b.question.order);

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className="w-full max-w-4xl p-8 border border-black-50 shadow-lg rounded-md relative"
        style={{
          background:
            'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
        }}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* User Answers Section */}
          <div className="flex-1 z-50">
            <h1 className="text-xl font-semibold mb-4 text-white">
              Your Answers
            </h1>
            <ul className="space-y-3">
              {userAnswers?.map((answer) => (
                <li
                  key={answer.questionUid}
                  className="flex items-center gap-4 p-2 bg-black-100 border border-black-50 rounded-md shadow-sm font-ubuntu"
                >
                  <span className="text-sm font-medium text-white">
                    {answer.question.order}.
                  </span>
                  <span className={`text-sm font-semibold`}>
                    {answer.correct ? (
                      <div className="flex items-center">
                        Correct
                        <Check className="size-4 ml-2 text-green-500" />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Incorrect
                        <X className="size-4 ml-2 text-destructive" />
                      </div>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Roadmap Generating Section */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="space flex flex-col gap-y-2 items-center">
              <Route />
              <h1 className="text-2xl font-semibold text-white">
                Generating Your Roadmap
              </h1>
            </div>
            <p className="text-xs text-gray-400 text-center">
              This process may take a few minutes. <br /> Please hold tight
              while we prepare your personalised roadmap.
            </p>
            <Suspense fallback={<LoadingSpinner />}>
              <RoadmapGenerateButton
                roadmapUid={roadmapUid}
                userUid={user.uid}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
