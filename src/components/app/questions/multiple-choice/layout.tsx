import { QuestionWithTags } from '@/types/Questions';
import MultipleChoiceCard from './card';
import { Questions } from '@prisma/client';

// Mock implementation for Storybook
interface QuestionMock {
  uid: string;
  question: string;
  questionDate: string;
  correctAnswer: string;
  answers: Array<string | { answer: string }>;
  [key: string]: any; // Allow other properties
}

type QuestionProp = Questions & {
  answers?: Array<string | { answer: string }>;
};

export default function MultipleChoiceLayout({
  Question,
}: {
  Question: QuestionProp | QuestionMock;
}) {
  // Check if answers is an array of strings or objects
  const formatAnswer = (answer: string | { answer: string }): string => {
    if (typeof answer === 'string') return answer;
    if (answer && typeof answer === 'object' && 'answer' in answer) return answer.answer;
    return String(answer); // Fallback
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{Question.question}</h2>
      </div>

      <div className="flex flex-col gap-4">
        {Question.answers &&
          Array.isArray(Question.answers) &&
          Question.answers.map((answer, index) => (
            <MultipleChoiceCard
              key={index}
              index={index}
              handleSelectAnswer={() => {}}
              answer={formatAnswer(answer)}
              selectedAnswer={Question.correctAnswer}
            />
          ))}
      </div>
    </>
  );
}
