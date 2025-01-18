import { Question } from '@/types/Questions';

export default function CodingChallengeDescription(opts: {
  question: Question;
}) {
  const { question } = opts;

  return (
    <div className="p-4">
      <h3 className="font-onest font-light text-base md:text-xl">
        {question.question}
      </h3>
    </div>
  );
}
