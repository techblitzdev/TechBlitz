import { Button } from '@/components/ui/button';
import ArcheryTarget from '@/components/ui/icons/target';
import { useUserServer } from '@/hooks/use-user-server';
import UpgradeCard from '../shared/upgrade-card';
import { Progress } from '@/components/ui/progress';
import { StudyPath } from '@prisma/client';
import DailyChallengesCard from '../shared/question/daily-goals-card';
import { ArrowRightIcon } from 'lucide-react';
import { isUserEnrolledInStudyPath } from '@/utils/data/study-paths/get';
import { enrollInStudyPath } from '@/actions/study-paths/enroll';
import { redirect } from 'next/navigation';
import { getDailyMissions } from '@/utils/data/missions/get-daily-missions';
import { getUserMissionRecords } from '@/utils/data/missions/get-user-mission-record';
import ScrollToStartButton from './scroll-to-start-button';

async function GetStartedCta({ studyPath }: { studyPath: StudyPath }) {
  // run in parallel
  const [user, isEnrolled] = await Promise.all([
    useUserServer(),
    isUserEnrolledInStudyPath(studyPath.uid),
  ]);

  // the button will be disabled if the user is a free user and has reached the maximum number of study paths
  // the button will be disabled if the user is already enrolled in the study path
  const isDisabled = user?.userLevel === 'FREE' && (user?.studyPathEnrollments?.length ?? 0) === 0;

  return (
    <div className="flex flex-col gap-y-4 z-30 relative ">
      <form
        action={async () => {
          'use server';
          if (!isEnrolled) {
            await enrollInStudyPath(studyPath.uid);
          }
          // redirect to the first question in the study path
          redirect(
            `/question/${studyPath.questionSlugs[0]}?type=study-path&study-path=${studyPath.slug}`
          );
        }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <Button
            type="submit"
            variant="default"
            className="flex items-center gap-x-2"
            disabled={isDisabled}
          >
            {isEnrolled ? 'Continue learning' : 'Enroll now'}
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default async function StudyPathSidebar({ studyPath }: { studyPath: StudyPath }) {
  const user = await useUserServer();
  // get the active missions for the day
  const missionsPromise = getDailyMissions();
  const userMissionRecordsPromise = getUserMissionRecords();

  return (
    <aside className="w-full lg:w-2/5 xl:w-1/3 space-y-6 order-first lg:order-last">
      <div className="sticky top-20 space-y-6">
        <div className="flex gap-4">
          <div>
            <ScrollToStartButton />
          </div>
          <div className="flex-1 space-y-6">
            {/** show if not enrolled */}
            {!user?.studyPathEnrollments?.find((e) => e.studyPathUid === studyPath.uid) ? (
              <GetStartedCta studyPath={studyPath} />
            ) : (
              /** only show if user is enrolled */
              <div className="flex flex-col gap-y-2 w-full">
                {user?.studyPathEnrollments?.find((e) => e.studyPathUid === studyPath.uid)
                  ?.progress === 100 ? (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-2">
                      {/**
                   * TODO: revisit the design of the complete button
                  <Check className="size-4" />
                  <p className="text-sm font-onest">Complete</p>
                   */}
                    </div>
                    {studyPath.nextStudyPathSlug && (
                      <Button
                        variant="secondary"
                        className="w-full flex items-center gap-x-2"
                        href={`/roadmaps/${studyPath.nextStudyPathSlug}`}
                      >
                        Continue your learning journey
                        <ArrowRightIcon className="size-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
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
                  </>
                )}
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

            <div className="flex flex-col md:flex-row lg:flex-col gap-4">
              <div className="w-full md:w-1/2 lg:w-full">
                <DailyChallengesCard
                  missionsPromise={missionsPromise}
                  userMissionRecordsPromise={userMissionRecordsPromise}
                />
              </div>

              <div className="w-full md:w-1/2 lg:w-full bg-[#090909] flex flex-col gap-y-2 backdrop-blur-sm border border-black-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-white">
                  <ArcheryTarget height="36" width="36" />
                  <h3 className="text-lg font-semibold">Set a Goal</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set a goal date to complete this study path. Receive a daily reminder to complete
                  the next question.
                </p>
                <Button className="w-full mt-2" disabled>
                  Coming soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
