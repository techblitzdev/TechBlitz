import type { StudyPath } from '@/utils/constants/study-paths';
import { Button } from '@/components/ui/button';
import { BookOpen, Target } from 'lucide-react';
import { useUserServer } from '@/hooks/use-user-server';
import UpgradeCard from '../shared/upgrade-card';

export default async function StudyPathSidebar({
  studyPath,
}: {
  studyPath: StudyPath;
}) {
  const user = await useUserServer();

  return (
    <aside className="w-full lg:w-1/4 space-y-6 order-first lg:order-last">
      <div className="sticky top-10 space-y-6">
        <div className="flex flex-col bg-[#090909] gap-y-2 border border-black-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-white">
            <BookOpen className="size-5" />
            <span>Summary</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {studyPath.description}
          </p>
        </div>

        <div className="bg-[#090909] flex flex-col gap-y-2 backdrop-blur-sm border border-black-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-white">
            <Target className="size-5" />
            <span>Set a Goal</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Set a goal date to complete this study path. Receive a daily
            reminder to complete the next question.
          </p>
          <Button className="w-full mt-2" disabled>
            Coming soon
          </Button>
        </div>

        {user?.userLevel === 'FREE' && <UpgradeCard />}
      </div>
    </aside>
  );
}
