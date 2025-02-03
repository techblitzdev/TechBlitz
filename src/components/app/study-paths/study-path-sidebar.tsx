import { Button } from '@/components/ui/button';
import { BookOpen, Target } from 'lucide-react';
import { useUserServer } from '@/hooks/use-user-server';
import UpgradeCard from '../shared/upgrade-card';
import { Progress } from '@/components/ui/progress';
import { StudyPath } from '@prisma/client';

export default async function StudyPathSidebar({ studyPath }: { studyPath: StudyPath }) {
  const user = await useUserServer();

  return (
    <aside className="w-full lg:w-1/4 space-y-6 order-first lg:order-last">
      <div className="sticky top-20 space-y-6">
        {/** only show if user is enrolled */}
        {user?.studyPathEnrollments?.find((e) => e.studyPathUid === studyPath.uid) && (
          <div className="flex flex-col gap-y-2 w-full">
            <p className="text-sm text-gray-400 font-onest">
              {Math.round(
                user?.studyPathEnrollments?.find((e) => e.studyPathUid === studyPath.uid)
                  ?.progress ?? 0
              )}
              % completed
            </p>
            <Progress
              className="border border-black-50 bg-black-50"
              value={
                user?.studyPathEnrollments?.find((e) => e.studyPathUid === studyPath.uid)
                  ?.progress ?? 0
              }
            />
          </div>
        )}
        {/**
         * 
        <div className="flex flex-col bg-[#090909] gap-y-2 border border-black-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-white">
            <BookOpen className="size-5" />
            <span>Summary</span>
          </div>
          <p className="text-sm text-muted-foreground">{studyPath.description}</p>
        </div>
            */}

        {user?.userLevel === 'FREE' && (
          <UpgradeCard
            title="Looking for a personalized study plan?"
            description="Unlock your full potential with a personalized study plan tailored just for you. Get focused learning paths, progress tracking, and expert guidance to learn 3x faster."
          />
        )}

        <div className="bg-[#090909] flex flex-col gap-y-2 backdrop-blur-sm border border-black-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-white">
            <Target className="size-5" />
            <span>Set a Goal</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Set a goal date to complete this study path. Receive a daily reminder to complete the
            next question.
          </p>
          <Button className="w-full mt-2" disabled>
            Coming soon
          </Button>
        </div>
      </div>
    </aside>
  );
}
