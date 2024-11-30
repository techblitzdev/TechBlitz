import { UserRoadmapsWithAnswers } from '@/types/Roadmap';
import RoadmapStatsChart from './roadmap-stats-chart';

export default function RoadmapStats(opts: {
  roadmap: UserRoadmapsWithAnswers;
}) {
  const { roadmap } = opts;

  return (
    <div className="space-y-2.5">
      <h6 className="text-xl">Roadmap stats</h6>
      <RoadmapStatsChart />
    </div>
  );
}
