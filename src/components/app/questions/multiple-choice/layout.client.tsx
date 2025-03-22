'use client';

import { Question } from '@/types/Questions';
import MultipleChoiceCard from './card';
import { useState } from 'react';
import MultipleChoiceFooter from './footer';
import { toast } from 'sonner';
import { answerQuestion } from '@/actions/answers/answer';
import { QuestionAnswer } from '@/types/QuestionAnswers';

interface QuestionMock {
  uid: string;
  question: string;
  questionDate: string;
  correctAnswer: string;
  answers: QuestionAnswer[];
  [key: string]: any;
}

export default function MultipleChoiceLayoutClient({
  children,
  question,
}: {
  children: React.ReactNode;
  question: Question | QuestionMock;
}) {
  // Track the selected answer UID and text
  const [selectedAnswerData, setSelectedAnswerData] = useState<{
    uid: string;
    text: string;
  } | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track time spent
  const [startTime] = useState<number>(Date.now());

  // Ensure answers is an array of QuestionAnswer objects
  const answers = Array.isArray(question.answers) ? question.answers : [];

  // Handle answer selection
  const handleSelectAnswer = (answer: string, index: number) => {
    // Prevent changing answer after submission
    if (isSubmitted) return;

    // Get the answer UID from the answers array at this index
    const answerObj = answers[index];

    if (answerObj) {
      setSelectedAnswerData({
        uid: answerObj.uid,
        text: answer,
      });
      // Reset the result when a new answer is selected
      setIsCorrect(null);
    }
  };

  // Handle clearing the selected answer
  const handleClear = () => {
    if (isSubmitted) return;
    setSelectedAnswerData(null);
    setIsCorrect(null);
  };

  // Get the correct answer text for display
  const getCorrectAnswerText = () => {
    // If the correctAnswer is a UID, find the corresponding answer text
    const correctAnswerObj = answers.find((a) => a.uid === question.correctAnswer);
    if (correctAnswerObj) {
      return correctAnswerObj.answer;
    }

    // Fallback: If correctAnswer isn't a UID or no match found, return the raw correctAnswer
    return String(question.correctAnswer);
  };

  // Handle submitting the answer
  const handleSubmit = async () => {
    if (!selectedAnswerData || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Calculate time taken in seconds
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);

      console.log('Submitting answer:', {
        questionUid: question.uid,
        answerUid: selectedAnswerData.uid,
        timeTaken,
      });

      // Submit the answer using the answerQuestion action
      const response = await answerQuestion({
        questionUid: question.uid,
        answerUid: selectedAnswerData.uid,
        timeTaken,
      });

      setIsCorrect(response.correctAnswer);
      setIsSubmitted(true);

      if (response.correctAnswer) {
        toast.success('Correct answer!');
      } else {
        const correctAnswerText = getCorrectAnswerText();
        toast.error(`Incorrect. The correct answer is: ${correctAnswerText}`);
      }

      console.log(
        `Answer submitted: ${selectedAnswerData.text}, Correct: ${response.correctAnswer}`
      );
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get the correct answer text for display when needed
  const correctAnswerText = getCorrectAnswerText();

  return (
    <div className="container min-h-screen flex flex-col justify-center items-center max-w-xs md:max-w-xl lg:max-w-2xl">
      {children}
      <div className="flex flex-col gap-4 pt-0 p-4 lg:pt-0 lg:p-20 mb-6">
        {answers.map((answerObj, index) => {
          const isCurrentAnswer = selectedAnswerData?.uid === answerObj.uid;

          return (
            <MultipleChoiceCard
              key={answerObj.uid}
              index={index}
              answer={answerObj.answer}
              handleSelectAnswer={handleSelectAnswer}
              selectedAnswer={selectedAnswerData?.text}
              isCorrect={isSubmitted && isCurrentAnswer ? isCorrect : undefined}
              isSubmitted={isSubmitted}
              correctAnswer={isSubmitted ? correctAnswerText : undefined}
            />
          );
        })}
      </div>

      {isSubmitted && (
        <div className="mb-4 px-4 py-2 rounded-md text-center w-full max-w-md">
          {isCorrect ? (
            <p className="text-green-400">Correct! 🎉</p>
          ) : (
            <p className="text-red-400">
              Incorrect. The correct answer is:{' '}
              <span className="font-bold">{correctAnswerText}</span>
            </p>
          )}
        </div>
      )}

      <MultipleChoiceFooter
        selectedAnswer={selectedAnswerData?.text}
        onClear={handleClear}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
