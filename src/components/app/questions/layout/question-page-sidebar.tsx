import { useUserServer } from '@/hooks/use-user-server';
import DailyGoalsCard from '@/components/app/shared/question/daily-goals-card';
import UpgradeCard from '@/components/app/shared/upgrade/upgrade-card';
import { getDailyMissions } from '@/utils/data/missions/get-daily-missions';
import { getUserMissionRecords } from '@/utils/data/missions/get-user-mission-record';
import StreakCalendar from '@/components/app/streaks/streak-calendar';

export default async function QuestionPageSidebar() {
  // run in parallel
  const [user] = await Promise.all([useUserServer()]);

  const missionsPromise = getDailyMissions();
  const userMissionRecordsPromise = getUserMissionRecords();

  return (
    <aside className="w-full xl:w-1/4">
      <div className="sticky top-10 space-y-10 w-full">
        {user?.userLevel === 'FREE' && (
          <UpgradeCard
            title="Try TechBlitz premium"
            description="Premium questions, personalized roadmaps, and unlimited AI credits!"
          />
        )}
        <DailyGoalsCard
          missionsPromise={missionsPromise}
          userMissionRecordsPromise={userMissionRecordsPromise}
        />
        <div className="w-fit h-fit flex flex-col gap-y-2.5">
          <StreakCalendar />
        </div>
      </div>
    </aside>
  );
}
