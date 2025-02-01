import { fetchRoadmap } from "@/utils/data/roadmap/fetch-single-roadmap";
import GenerateMoreQuestionsButton from "@/components/app/roadmaps/[uid]/generate-more-questions";
import RoadmapQuestionCard from "@/components/app/roadmaps/questions/[uid]/question-card";
import RoadmapStats from "@/components/app/roadmaps/[uid]/roadmap-stats";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserServer } from "@/hooks/use-user-server";
import { redirect } from "next/navigation";
import Chip from "@/components/ui/chip";
import { capitalise } from "@/utils";
import Hero from "@/components/shared/hero";
import { RoadmapUserQuestions } from "@prisma/client";

export default async function RoadmapSinglePage({
  params,
}: {
  params: { roadmapUid: string };
}) {
  const { roadmapUid } = params;

  // better safe than sorry!
  const user = await useUserServer();
  if (!user) {
    return redirect(`/login?redirect=/roadmaps`);
  }

  // go get the roadmap
  const roadmap = await fetchRoadmap({ roadmapUid });

  // put the user back to the roadmap page if the roadmap is not found
  // do not redirect to the login page as the user is already logged in
  if (!roadmap) {
    redirect(`/roadmaps?error=roadmap_not_found`);
  }

  // order the questions via the order
  roadmap.questions.sort((a, b) => a.order - b.order);

  // determine the roadmap title and description via the status
  // if the roadmap is 'creating' then we output 'Creation in progress'
  const roadmapTitle =
    roadmap.status === "CREATING"
      ? "Creation in progress"
      : roadmap.title || "Untitled Roadmap";

  const roadmapDescription =
    roadmap.status === "CREATING"
      ? "We are creating your roadmap, this may take a few minutes"
      : roadmap.description || "No description";

  return (
    <>
      <div className="lg:px-8">
        <Hero heading={roadmapTitle} subheading={roadmapDescription}>
          <div className="mt-5 w-fit flex gap-3 z-10">
            <div className="flex items-center gap-x-3">
              {roadmap?.status && (
                <Chip
                  text={capitalise(roadmap.status)}
                  color="bg-black-100"
                  border="border-black-50"
                />
              )}
            </div>
            <Chip
              text={roadmap?.questions.length.toString() + " " + "Questions"}
              color="bg-white"
              textColor="text-black"
              border="border-black-50"
            />
          </div>
        </Hero>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 mt-5 lg:container">
        <div className="order-last md:order-first w-full lg:w-[70%] relative">
          {roadmap.questions?.map((question: RoadmapUserQuestions, index) => (
            <div key={question.uid} className="flex flex-col justify-center">
              <RoadmapQuestionCard
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

        <aside className="w-full lg:w-[30%] relative order-first md:order-last ">
          <div className="sticky top-10 space-y-5 w-full">
            {/** @ts-ignore */}
            <RoadmapStats roadmap={roadmap} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  disabled={roadmap?.status === "COMPLETED"}
                  asChild
                  className="w-fit"
                >
                  {/** @ts-ignore */}
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
