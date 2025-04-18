import type { Question, QuestionMock } from '@/types/Questions';
import MultipleChoiceLayoutClient from './layout.client';

// Define navigation interface to match the data from getNextAndPreviousQuestion
interface NavigationData {
  previousQuestion: string | null | undefined;
  nextQuestion: string | null | undefined;
}

export default function MultipleChoiceLayout({
  question,
  nextAndPreviousQuestion,
}: {
  question: Question | QuestionMock;
  nextAndPreviousQuestion: NavigationData | null;
}) {
  return (
    <MultipleChoiceLayoutClient
      question={question}
      nextAndPreviousQuestion={nextAndPreviousQuestion}
    >
      <div className="flex flex-col gap-2 justify-center mb-4 self-center max-w-3xl">
        {question.description ? (
          <p
            dangerouslySetInnerHTML={{ __html: question.description }}
            className="text-gray-400 text-center text-lg font-onest"
          />
        ) : (
          <h2 className="text-3xl font-bold text-white text-center">{question.question}</h2>
        )}
      </div>
    </MultipleChoiceLayoutClient>
  );
}
