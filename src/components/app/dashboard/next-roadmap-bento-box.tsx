import { getDashboardStudyPath } from '@/utils/data/study-paths/get';
import NextRoadmapGraphic from './next-roadmap-graphic';

export default async function StreakBentoBox() {
  const studyPath = await getDashboardStudyPath();

  return (
    <div className="space-y-4 group relative overflow-hidden p-4 h-full">
      <div className="space-y-1">
        <h6 className="text-xl">
          {studyPath ? (
            <>
              Continue learning <span className="font-medium">{studyPath.studyPath.title}</span>
            </>
          ) : (
            'Start learning'
          )}
        </h6>
        <p className="text-sm text-gray-400">
          Don't let your skills go stale - take 3 minutes to answer a question from your roadmap.
        </p>
      </div>
      <div className="w-full h-fit flex items-center justify-center">
        <NextRoadmapGraphic
          studyPathSlug={studyPath?.studyPath.slug || 'javascript-fundamentals'}
        />
      </div>
    </div>
  );
}
