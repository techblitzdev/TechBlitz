'use client';

import { Question } from '@/types/Questions';
import { UserRecord } from '@/types/User';
import { Answer } from '@/types/Answers';
import { createContext, useState, useContext } from 'react';
import { answerQuestion } from '@/actions/answers/answer';
import { toast } from 'sonner';
import { useStopwatch } from 'react-timer-hook';

type QuestionSingleContextType = {
  question: Question;
  user: UserRecord | null;
  isSubmitting: boolean;
  correctAnswer: 'init' | 'incorrect' | 'correct';
  userAnswer: Answer | null;
  newUserData: UserRecord | null;
  selectedAnswer: string;
  timeTaken: number;
  setSelectedAnswer: (answer: string) => void;
  setTimeTaken: (time: number) => void;
  submitQuestionAnswer: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetQuestionState: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  pause: () => void;
  reset: () => void;
  totalSeconds: number;
};

export const QuestionSingleContext = createContext<QuestionSingleContextType>(
  {} as QuestionSingleContextType
);

export const useQuestionSingle = () => {
  const context = useContext(QuestionSingleContext);
  if (!context) {
    throw new Error(
      'useQuestionSingle must be used within a QuestionSingleContextProvider'
    );
  }
  return context;
};

export const QuestionSingleContextProvider = ({
  children,
  question,
  user,
}: {
  children: React.ReactNode;
  question: Question;
  user: UserRecord | null;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<
    'init' | 'incorrect' | 'correct'
  >('init');
  const [userAnswer, setUserAnswer] = useState<Answer | null>(null);
  const [newUserData, setNewUserData] = useState<UserRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeTaken, setTimeTaken] = useState<number>(0);

  const { pause, reset, totalSeconds } = useStopwatch({
    autoStart: true,
  });

  const submitQuestionAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    // stop the stopwatch
    pause();

    e.preventDefault();

    if (!user) {
      console.error('User is not logged in');
      return;
    }

    if (!selectedAnswer) {
      toast.error('Please select an answer');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const opts: {
        questionUid: string;
        answerUid: string;
        userUid: string;
        timeTaken: number;
      } = {
        questionUid: question?.uid,
        answerUid: selectedAnswer,
        userUid: user.uid,
        timeTaken: timeTaken,
      };

      const {
        correctAnswer: isCorrect,
        userAnswer: submittedAnswer,
        userData: newUserData,
      } = await answerQuestion(opts);

      setCorrectAnswer(isCorrect ? 'correct' : 'incorrect');
      setUserAnswer(submittedAnswer);
      setNewUserData(newUserData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuestionState = () => {
    reset();
    setCorrectAnswer('init');
    setUserAnswer(null);
    setNewUserData(null);
    setIsSubmitting(false);
    setSelectedAnswer('');
    setTimeTaken(0);
    setIsModalOpen(false);
  };

  return (
    <QuestionSingleContext.Provider
      value={{
        question,
        user,
        isSubmitting,
        correctAnswer,
        userAnswer,
        newUserData,
        selectedAnswer,
        timeTaken,
        setSelectedAnswer,
        setTimeTaken,
        submitQuestionAnswer,
        resetQuestionState,
        isModalOpen,
        setIsModalOpen,
        pause,
        reset,
        totalSeconds,
      }}
    >
      {children}
    </QuestionSingleContext.Provider>
  );
};
