import { Question } from '@/types/Questions';
import MultipleChoiceLayoutClient from './layout.client';

// Mock implementation for Storybook
interface QuestionMock {
  uid: string;
  question: string;
  questionDate: string;
  correctAnswer: string;
  answers: Array<string | { answer: string }>;
  [key: string]: any;
}

export default function MultipleChoiceLayout({ question }: { question: Question | QuestionMock }) {
  return (
    <MultipleChoiceLayoutClient question={question}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{question.question}</h2>
      </div>
    </MultipleChoiceLayoutClient>
  );
}
