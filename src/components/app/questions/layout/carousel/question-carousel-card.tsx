import { QuestionWithTags } from '@/types/Questions';
import Link from 'next/link';
import Chip from '@/components/ui/chip';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import { CheckCircle, ChevronRight } from 'lucide-react';

import { Circle } from 'lucide-react';
import { Answer } from '@/types/Answers';
export default async function QuestionCarouselCard(opts: {
  questionData: QuestionWithTags & { userAnswers: Answer[] };
}) {
  const { questionData } = opts;

  console.log(questionData);

  return (
    <Link
      href={`/question/${questionData?.slug}`}
      className="h-full bg-black-75 group"
    >
      <div className="flex flex-col justify-between space-y-5 items-start border border-black-50 hover:border-accent duration-300 p-6 rounded-lg group w-full h-full relative overflow-hidden">
        <h6 className="text-wrap text-start line-clamp-2">
          {questionData?.question}
        </h6>
        <div className="flex items-center gap-x-2">
          {questionData.userAnswers && questionData.userAnswers.length > 0 ? (
            <div>
              {questionData.userAnswers[0].correctAnswer ? (
                <CheckCircle className="flex-shrink-0 size-5 text-green-500" />
              ) : (
                <Circle className="flex-shrink-0 size-5 text-black-50" />
              )}
            </div>
          ) : (
            <Circle className="flex-shrink-0 size-5 text-black-50" />
          )}
          <div className="text-sm font-medium">
            {questionData.userAnswers && questionData.userAnswers.length > 0 ? (
              questionData.userAnswers[0].correctAnswer ? (
                <p>Correct</p>
              ) : (
                <p>Incorrect</p>
              )
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
            text={capitalise(questionData?.difficulty)}
            color={getQuestionDifficultyColor(questionData?.difficulty).bg}
            textColor={
              getQuestionDifficultyColor(questionData?.difficulty).text
            }
            border={getQuestionDifficultyColor(questionData?.difficulty).border}
          />
        </div>
      </div>
    </Link>
  );
}
