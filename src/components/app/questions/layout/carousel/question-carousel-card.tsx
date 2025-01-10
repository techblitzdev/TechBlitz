import { QuestionWithTags } from '@/types/Questions';
import Link from 'next/link';
import Chip from '@/components/ui/chip';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import { getUserAnswer } from '@/utils/data/answers/get-user-answer';
import { CheckCircle, Circle } from 'lucide-react';

export default async function QuestionCarouselCard(opts: {
  questionData: QuestionWithTags;
}) {
  const { questionData } = opts;

  const userAnswered = await getUserAnswer({ questionUid: questionData.uid });

  return (
    <Link
      href={`/question/${questionData?.slug}`}
      className="h-full bg-black-75 group"
    >
      <div className="flex flex-col justify-between space-y-5 items-start border border-black-50 hover:border-accent duration-300 p-6 rounded-lg group w-full h-full relative overflow-hidden">
        <h6 className="text-wrap text-start line-clamp-2">
          {questionData?.question}
        </h6>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-x-2">
            {userAnswered ? (
              <CheckCircle className="flex-shrink-0 size-5 text-green-500" />
            ) : (
              <Circle className="flex-shrink-0 size-5 text-black-50" />
            )}
            <p className="text-sm font-medium">
              {userAnswered ? 'Answered' : 'Not Answered'}
            </p>
          </div>
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
