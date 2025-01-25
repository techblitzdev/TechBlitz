import type { StudyPath } from '@/utils/constants/study-paths';
import { Button } from '@/components/ui/button';
import { BookOpen, Sparkles, Target } from 'lucide-react';

export default function StudyPathSidebar({
  studyPath,
}: {
  studyPath: StudyPath;
}) {
  return (
    <aside className="w-full xl:w-1/4 space-y-6">
      <div className="sticky top-10 space-y-6">
        <div className="flex flex-col gap-y-2 border border-black-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-white">
            <BookOpen className="size-5" />
            <span>Summary</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {studyPath.description}
          </p>
        </div>

        <div className="flex flex-col gap-y-2 backdrop-blur-sm border border-black-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-white">
            <Target className="size-5" />
            <span>Set a Goal</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Set a goal to complete the study path and track your progress.
          </p>
          <Button className="w-full mt-2">Create Goal</Button>
        </div>

        <div className="flex flex-col gap-y-2 backdrop-blur-sm border border-black-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-white">
            <Sparkles className="size-5 text-yellow-400 fill-yellow-500" />
            <span>Want a personalized study plan?</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Upgrade to premium to get a personalized study plan to accelerate
            your learning by 3x.
          </p>
          <Button
            href="https://dub.sh/upgrade-techblitz"
            className="mt-2 w-full"
            variant="accent"
          >
            Upgrade to Premium
          </Button>
        </div>
      </div>
    </aside>
  );
}
