import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const StudyPathsList = dynamic(
  () => import("@/components/app/study-paths/list"),
  {
    loading: () => (
      <div className="flex flex-col gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <QuestionCardSkeleton key={index} />
        ))}
      </div>
    ),
  },
);
import StudyPathSidebar from "@/components/app/study-paths/study-path-sidebar";
import Hero from "@/components/shared/hero";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ChevronLeft, Sparkles } from "lucide-react";

import { getQuestions } from "@/actions/questions/admin/list";
import { enrollInStudyPath } from "@/actions/study-paths/enroll";
import { useUserServer } from "@/hooks/use-user-server";

import { capitalise, getBaseUrl } from "@/utils";
import {
  getStudyPath,
  isUserEnrolledInStudyPath,
} from "@/utils/data/study-paths/get";
import { createMetadata } from "@/utils/seo";

import { QuizJsonLd } from "@/types/Seo";
import type { StudyPath } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import ShareQuestion from "@/components/app/shared/share-question";
import { QuestionCardSkeleton } from "@/components/app/questions/layout/question-card";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const studyPath = await getStudyPath(params.slug);

  if (!studyPath) {
    return createMetadata({
      title: "Study path not found | TechBlitz",
      description: "Study path not found",
    });
  }

  return createMetadata({
    title: `${studyPath?.title} | TechBlitz`,
    description: studyPath?.description,
    keywords: [
      "javascript coding questions",
      "react coding questions",
      "web development coding questions",
      "coding challenges",
      "coding tutorials",
      "coding practice",
      "coding practice questions",
    ],
    image: {
      text: `${studyPath?.title} | TechBlitz`,
      bgColor: "#000",
      textColor: "#fff",
    },
    canonicalUrl: `/study-paths/${params.slug}`,
  });
}

async function GetStartedCta({ studyPath }: { studyPath: StudyPath }) {
  // run in parallel
  const [user, isEnrolled] = await Promise.all([
    useUserServer(),
    isUserEnrolledInStudyPath(studyPath.uid),
  ]);

  // the button will be disabled if the user is a free user and has reached the maximum number of study paths
  // the button will be disabled if the user is already enrolled in the study path
  const isDisabled =
    user?.userLevel === "FREE" &&
    (user?.studyPathEnrollments?.length ?? 0) === 0;

  return (
    <div className="flex flex-col gap-y-4 z-30 relative ">
      <form
        action={async () => {
          "use server";
          if (!isEnrolled) {
            await enrollInStudyPath(studyPath.uid);
          }
          // redirect to the first question in the study path
          redirect(
            `/question/${studyPath.questionSlugs[0]}?type=study-path&study-path=${studyPath.slug}`,
          );
        }}
      >
        <Button
          type="submit"
          variant="secondary"
          className="flex items-center gap-x-2"
          disabled={isDisabled}
        >
          {isEnrolled ? "Continue learning" : "Enroll now"}
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}

function HeroChip({ studyPath }: { studyPath: StudyPath }) {
  return (
    <div className="text-xs text-white px-2 py-1 rounded-full w-fit flex items-center gap-x-2 z-20">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              href="/study-paths"
              variant="default"
              size="sm"
              className="p-1 h-fit"
            >
              <ChevronLeft className="size-4 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back to study paths</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Sparkles className="size-3 text-yellow-400 fill-yellow-500" />
      {studyPath?.heroChip}
    </div>
  );
}

function HeroHeading({ studyPath }: { studyPath: StudyPath }) {
  return (
    <div className="flex w-full justify-between item-center">
      <h1 className="relative z-20 text-3xl md:text-5xl text-wrap text-start font-inter max-w-2xl text-gradient from-white to-white/55 py-1">
        {studyPath?.title}
      </h1>
      {/** share button */}
      <ShareQuestion content="Share this study path" variant="default" />
    </div>
  );
}

export default async function StudyPathPage({
  params,
}: {
  params: { slug: string };
}) {
  // run in parallel
  const [studyPath, user] = await Promise.all([
    getStudyPath(params.slug),
    useUserServer(),
  ]);

  // create json ld
  const jsonLd: QuizJsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    // replace the - with a space and
    name: capitalise(params.slug?.replace(/-/g, " ") || ""),
    description: studyPath?.description || "",
    url: `${getBaseUrl()}/study-paths/${params.slug}`,
    educationalUse: "practice",
    learningResourceType: ["quiz", "learning activity"],
    creator: {
      "@type": "Organization",
      name: "TechBlitz",
      url: getBaseUrl(),
    },
    assesses: ["coding"],
    educationLevel: studyPath?.educationLevel || "beginner",
    dateCreated: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    headline: studyPath?.title || "",
    interactivityType: "mixed",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    teaches: "coding",
  };

  // TODO: BETTER DISPLAY ERRORS
  if (!studyPath) {
    return <div>Study path not found</div>;
  }

  // get all of the question data for the questions in the study path
  const questions = getQuestions({
    questionSlugs: studyPath?.questionSlugs ?? [],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-y-12">
        <Hero
          heading={<HeroHeading studyPath={studyPath} />}
          container={true}
          chip={<HeroChip studyPath={studyPath} />}
        >
          <GetStartedCta studyPath={studyPath} />
        </Hero>
        <div className="lg:container flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-[65%] space-y-6">
            {/** only show if user is enrolled */}
            {user?.studyPathEnrollments?.find(
              (e) => e.studyPathUid === studyPath.uid,
            ) && (
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-sm text-gray-400 font-onest">
                  {Math.round(
                    user?.studyPathEnrollments?.find(
                      (e) => e.studyPathUid === studyPath.uid,
                    )?.progress ?? 0,
                  )}
                  % completed
                </p>
                <Progress
                  className="border border-black-50 bg-black-50"
                  value={
                    user?.studyPathEnrollments?.find(
                      (e) => e.studyPathUid === studyPath.uid,
                    )?.progress ?? 0
                  }
                />
              </div>
            )}
            <StudyPathsList questions={questions} studyPath={studyPath} />
          </div>
          <StudyPathSidebar studyPath={studyPath} />
        </div>
      </div>
    </>
  );
}
