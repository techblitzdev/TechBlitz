import { QuestionWithTags } from '@/types/Questions';
import Link from 'next/link';
import Chip from '@/components/ui/chip';
import { capitalise, getQuestionDifficultyColor } from '@/utils';

export default function QuestionCarouselCard(opts: {
  questionData: QuestionWithTags;
}) {
  const { questionData } = opts;

  return (
    <Link
      href={`/question/${questionData?.slug}`}
      className="h-full bg-black-75"
    >
      <div className="flex flex-col justify-between space-y-5 items-start border border-black-50 hover:border-accent duration-300 p-6 rounded-lg group w-full h-full relative overflow-hidden">
        <h6 className="text-wrap text-start line-clamp-2">
          {questionData?.question}
        </h6>
        <div className="w-full flex justify-between items-end">
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
