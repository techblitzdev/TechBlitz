import { Check, X } from 'lucide-react';

interface Answer {
  questionUid: string;
  question: {
    order: number;
  };
  correct: boolean;
}

export default function UserAnswers({ answers }: { answers: Answer[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white pb-2">Your Answers</h2>
      <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
        {answers.map((answer) => (
          <li
            key={answer.questionUid}
            className="flex items-center gap-4 px-2 py-1 transition-all duration-300"
          >
            <span className="text-lg font-medium">{answer.question.order}.</span>
            <span className="text-sm font-semibold flex-grow">
              {answer.correct ? (
                <div className="flex items-center">
                  <span className="text-lg">Correct</span>
                  <Check className="size-5 ml-2 text-green-400" aria-hidden="true" />
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-lg">Incorrect</span>
                  <X className="size-5 ml-2 text-destructive" aria-hidden="true" />
                </div>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
