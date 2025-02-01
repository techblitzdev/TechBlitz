"use client";

import { useMemo } from "react";
import Link from "next/link";
import { QuestionWithTags } from "@/types/Questions";
import Chip from "@/components/ui/chip";
import { capitalise, getQuestionDifficultyColor } from "@/utils";
import { CheckCircle, ChevronRight, Circle } from "lucide-react";
import { Answer } from "@/types/Answers";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";
import { UserRecord } from "@/types/User";

interface QuestionCarouselCardProps {
  questionData: QuestionWithTags & { userAnswers: Answer[] };
  user: UserRecord | null;
}

export default function QuestionCarouselCard({
  questionData,
  user,
}: QuestionCarouselCardProps) {
  const answerStatus = useMemo(() => {
    if (questionData.userAnswers && questionData.userAnswers.length > 0) {
      return questionData.userAnswers[0].correctAnswer
        ? "correct"
        : "incorrect";
    }
    return "not-answered";
  }, [questionData.userAnswers]);

  const difficultyColor = useMemo(
    () => getQuestionDifficultyColor(questionData.difficulty),
    [questionData.difficulty],
  );

  const title = questionData?.title || questionData?.question;

  return (
    <Link
      href={`/question/${questionData.slug}`}
      className="h-full bg-black-75 group w-full"
    >
      <div className="flex flex-col justify-between space-y-5 items-start border border-black-50 hover:border-accent duration-300 p-6 rounded-lg group w-full h-full relative overflow-hidden">
        <h3 className="text-wrap text-start line-clamp-2">{title}</h3>
        <div className="flex items-center gap-x-2">
          {answerStatus === "correct" ? (
            <CheckCircle className="flex-shrink-0 size-5 text-green-500" />
          ) : (
            <Circle className="flex-shrink-0 size-5 text-black-50" />
          )}
          <div className="text-sm font-medium">
            {answerStatus === "correct" ? (
              <p>Correct</p>
            ) : answerStatus === "incorrect" ? (
              <p>Incorrect</p>
            ) : (
              <div className="relative">
                <p className="group-hover:opacity-0 transition-opacity duration-300">
                  Not Answered
                </p>
                <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap flex items-center gap-x-1">
                  <p>Learn Now</p>
                  <ChevronRight className="flex-shrink-0 size-4 text-white group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <Chip
            text={capitalise(questionData.difficulty)}
            color={difficultyColor.bg}
            textColor={difficultyColor.text}
            border={difficultyColor.border}
          />
          {questionData.isPremiumQuestion &&
            (user?.userLevel === "FREE" || !user) && (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <div className="h-fit order-first md:order-last">
                      <Chip
                        text="Premium"
                        color="bg-gradient-to-r from-yellow-400 to-yellow-600"
                        textColor="text-black"
                        border="border-yellow-500"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upgrade to Premium to access this question</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
        </div>
      </div>
    </Link>
  );
}
