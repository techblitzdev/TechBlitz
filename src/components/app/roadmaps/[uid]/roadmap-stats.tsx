import type { RoadmapUserQuestions, UserRoadmapsWithAnswers } from '@/types';
import RoadmapStatsChart from './roadmap-stats-chart';

export default function RoadmapStats(opts: {
  roadmap: UserRoadmapsWithAnswers & {
    questions: RoadmapUserQuestions[];
  };
}) {
  const { roadmap } = opts;

  return (
    <div className="space-y-2.5">
      <RoadmapStatsChart roadmap={roadmap} />
    </div>
  );
}
