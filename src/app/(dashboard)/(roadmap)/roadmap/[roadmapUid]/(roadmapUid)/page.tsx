import { fetchRoadmap } from '@/actions/roadmap/fetch-single-roadmap';
import GenerateMoreQuestionsButton from '@/components/roadmaps/[uid]/generate-more-questions';
import RoadmapQuestionCard from '@/components/roadmaps/questions/[uid]/question-card';
import RoadmapStats from '@/components/roadmaps/[uid]/roadmap-stats';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useUserServer } from '@/hooks/useUserServer';
import { redirect } from 'next/navigation';
import Hero from '@/components/global/hero';
import Chip from '@/components/ui/chip';
import { capitalise } from '@/utils';

export default async function RoadmapSinglgePage({
  params
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

  if (!roadmap) {
    redirect('/roadmaps?error=roadmap_not_found');
  }

  // order the questions via the order
  roadmap.questions.sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="px-8">
        <Hero
          heading={roadmap.title || 'Untitled Roadmap'}
          subheading={roadmap.description || 'No description'}
        >
          <div className="mt-5 w-fit flex gap-3 z-10">
            <div className="flex items-center gap-x-3">
              {roadmap?.status && (
                <Chip
                  text={capitalise(roadmap.status)}
                  color="black-100"
                  border="black-50"
                />
              )}
            </div>
            <Chip
              text={roadmap?.questions.length.toString() + ' ' + 'Questions'}
              color="white"
              textColor="black"
            />
          </div>
        </Hero>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 mt-5 container">
        <div className="order-last md:order-first w-full lg:w-1/2 relative">
          {roadmap.questions?.map((question, index) => (
            <div className="flex flex-col justify-center">
              <RoadmapQuestionCard
                key={question.uid}
                question={question}
                roadmapUid={roadmapUid}
                index={index}
                totalQuestions={roadmap.questions.length}
                nextQuestionCorrect={roadmap.questions[index + 1]?.userCorrect}
                nextQuestionAnswered={roadmap.questions[index + 1]?.completed}
                prevQuestionCorrect={roadmap.questions[index - 1]?.userCorrect}
                prevQuestionAnswered={roadmap.questions[index - 1]?.completed}
              />
            </div>
          ))}
        </div>

        <aside className="w-full lg:w-1/2 relative">
          <div className="order-first md:order-last sticky top-10 space-y-5 w-full md:w-3/4 xl:w-2/5">
            {/** @ts-ignore */}
            <RoadmapStats roadmap={roadmap} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  disabled={roadmap?.status === 'COMPLETED'}
                  asChild
                  className="w-fit"
                >
                  <GenerateMoreQuestionsButton roadmap={roadmap} />
                </TooltipTrigger>
                <TooltipContent align="center">
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
    </>
  );
}
