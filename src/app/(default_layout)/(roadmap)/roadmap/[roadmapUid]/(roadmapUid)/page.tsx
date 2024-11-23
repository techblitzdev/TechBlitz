import { roadmapGenerate } from '@/actions/roadmap/ai/generate';
import { fetchRoadmap } from '@/actions/roadmap/fetch-single-roadmap';
import RoadmapQuestionCard from '@/components/roadmaps/questions/[uid]/question-card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUserServer } from '@/hooks/useUserServer';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function RoadmapSinglgePage({
  params,
}: {
  params: { roadmapUid: string };
}) {
  const { roadmapUid } = params;

  // better safe than sorry!
  const user = await useUserServer();
  if (!user) {
    return redirect('/login');
  }

  // go get the roadmap
  const roadmap = await fetchRoadmap({ roadmapUid, userUid: user.uid });

  const generatedPlan = await roadmapGenerate({
    roadmapUid,
    userUid: user.uid,
  });

  return (
    <div className="flex flex-col lg:flex-row gap-10 mt-5 container">
      <div className="w-full lg:w-1/2">
        <div className="space-y-6">
          {generatedPlan?.map((step) => (
            <RoadmapQuestionCard
              key={step.uid}
              question={step}
              roadmapUid={roadmapUid}
            />
          ))}
        </div>
      </div>

      <aside className="w-full lg:w-1/2 relative">
        <div className="sticky top-10 space-y-10 w-1/2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                disabled={roadmap?.status === 'COMPLETED'}
                asChild
                className="w-fit"
              >
                <Button
                  variant="accent"
                  disabled={roadmap?.status !== 'COMPLETED'}
                >
                  Generate more questions
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  You can only generate more questions once you have completed
                  the roadmap
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>
    </div>
  );
}
