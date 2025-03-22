import { Question } from '@/types/Questions';
import MultipleChoiceLayoutClient from './layout.client';
import { QuestionAnswer } from '@/types/QuestionAnswers';

// Mock implementation for Storybook
interface QuestionMock {
  uid: string;
  question: string;
  questionDate: string;
  correctAnswer: string;
  answers: QuestionAnswer[];
  createdAt?: Date;
  updatedAt?: Date;
  title?: string | null;
  description?: string | null;
  dailyQuestion?: boolean;
  customQuestion?: boolean;
  difficulty?: string;
  slug?: string | null;
  slugGenerated?: boolean;
  questionType?: string;
  [key: string]: any;
}

export default function MultipleChoiceLayout({ question }: { question: Question | QuestionMock }) {
  console.log({
    question: question.answers,
  });
  return (
    <MultipleChoiceLayoutClient question={question}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{question.question}</h2>
      </div>
    </MultipleChoiceLayoutClient>
  );
}
