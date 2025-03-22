'use client';

import { Question } from '@/types/Questions';
import MultipleChoiceCard from './card';
import { useState } from 'react';

interface QuestionMock {
  uid: string;
  question: string;
  questionDate: string;
  correctAnswer: string;
  answers: Array<string | { answer: string }>;
  [key: string]: any;
}

export default function MultipleChoiceLayoutClient({
  children,
  question,
}: {
  children: React.ReactNode;
  question: Question | QuestionMock;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined);

  // Handle answer selection
  const handleSelectAnswer = (answer: string, index: number) => {
    setSelectedAnswer(answer);
    // In a real implementation, you would probably do something with this selection
    console.log(`Selected answer: ${answer} at index ${index}`);
  };

  // Check if answers is an array of strings or objects
  const formatAnswer = (answer: string | { answer: string }): string => {
    if (typeof answer === 'string') return answer;
    if (answer && typeof answer === 'object' && 'answer' in answer) return answer.answer;
    return String(answer);
  };

  return (
    <div className="container min-h-screen flex flex-col justify-center items-center max-w-xs md:max-w-xl lg:max-w-2xl">
      {children}
      <div className="flex flex-col gap-4">
        {question.answers &&
          Array.isArray(question.answers) &&
          question.answers.map((answer, index) => (
            <MultipleChoiceCard
              key={index}
              index={index}
              answer={formatAnswer(answer)}
              handleSelectAnswer={handleSelectAnswer}
              selectedAnswer={selectedAnswer}
            />
          ))}
      </div>
    </div>
  );
}
