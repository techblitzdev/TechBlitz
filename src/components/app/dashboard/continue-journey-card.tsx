import { getSuggestions } from '@/utils/data/questions/get-suggestions';
import Link from 'next/link';
import { ArrowRight, CheckCircle, BookOpen } from 'lucide-react';
import { getUserStudyPaths } from '@/utils/data/study-paths/get';
import { Progress } from '@/components/ui/progress';

export default async function ContinueJourneyCard() {
  const suggestions = await getSuggestions({
    limit: 1,
  });

  const studyPaths = await getUserStudyPaths();

  const suggestion = suggestions?.[0];

  // no need to render anything if there is no suggestion
  if (!suggestion) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
      <Link
        href={`/question/${suggestion?.slug}`}
        className="group flex flex-col justify-between h-full overflow-hidden p-4 transition-all rounded-xl border border-black-50"
        style={{
          background:
            'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
        }}
      >
        <div className="flex flex-col justify-between size-full gap-y-2">
          <p className="text-sm font-medium text-gray-400 font-onest">
            Your next question:
          </p>
          <div className="flex w-full items-center gap-x-2 justify-between">
            {suggestion && (
              <h2 className="text-xl text-white line-clamp-1">
                {suggestion.title}
              </h2>
            )}
            <div className="flex items-center gap-x-2 flex-shrink-0">
              <span className="text-sm text-gray-400">Answer now</span>
              <ArrowRight className="size-4 text-gray-300 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
      <Link
        href={
          studyPaths?.[0]
            ? `/questions/study-paths/${studyPaths[0].studyPath.slug}`
            : '/questions/study-paths'
        }
        style={{
          background:
            'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
        }}
        className="group flex flex-col justify-between h-full overflow-hidden p-4 transition-all rounded-xl border border-black-50"
      >
        <div className="flex flex-col justify-between size-full gap-y-2">
          {studyPaths?.[0] ? (
            <>
              <p className="text-sm font-medium text-gray-400 group-hover:text-white duration-300 font-onest">
                Continue your study path:{' '}
                <span className="text-white font-semibold">
                  {studyPaths[0].studyPath.title}
                </span>
              </p>
              <div className="flex w-full items-center gap-x-2 justify-between">
                <div className="flex flex-col gap-y-2 w-full">
                  <p className="text-sm text-gray-400 font-onest">
                    {Math.round(studyPaths[0].progress) === 100 ? (
                      <div className="flex items-center gap-x-2">
                        <CheckCircle className="size-4 text-green-500" />
                        <span className="text-sm text-gray-400 font-onest">
                          completed
                        </span>
                      </div>
                    ) : (
                      `${Math.round(studyPaths[0].progress)}% completed`
                    )}
                  </p>
                  <Progress
                    className="border border-black-50 bg-black-50"
                    value={studyPaths[0].progress}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-between size-full gap-y-2">
              <p className="text-sm font-medium text-gray-400 group-hover:text-white duration-300 font-onest">
                Start your learning journey
              </p>
              <div className="flex items-center gap-x-2">
                <BookOpen className="size-4 text-gray-300" />
                <span className="text-sm text-gray-400">
                  Browse study paths
                </span>
                <ArrowRight className="size-4 text-gray-300 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
