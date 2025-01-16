'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { toast } from 'sonner';
import { answerQuestion } from '@/actions/answers/answer';
import { Question } from '@/types/Questions';
import { UserRecord } from '@/types/User';
import { Answer } from '@/types/Answers';

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
  pause: () => void;
  reset: () => void;
  totalSeconds: number;
  currentLayout: 'questions' | 'codeSnippet' | 'answer';
  setCurrentLayout: (layout: 'questions' | 'codeSnippet' | 'answer') => void;
  customQuestion: boolean;
  setCustomQuestion: (customQuestion: boolean) => void;
  prefilledCodeSnippet: string | null;
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
  // the users answer to the question
  const [userAnswer, setUserAnswer] = useState<Answer | null>(null);

  // the new user data after the question is answered
  const [newUserData, setNewUserData] = useState<UserRecord | null>(null);

  // the selected answer by the user
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  // the time taken to answer the question
  const [timeTaken, setTimeTaken] = useState<number>(0);

  // whether the question is a custom question
  const [customQuestion, setCustomQuestion] = useState(false);

  // the prefilled code snippet based on the user's answer
  const [prefilledCodeSnippet, setPrefilledCodeSnippet] = useState<
    string | null
  >(null);

  // the current layout of the page
  const [currentLayout, setCurrentLayout] = useState<
    'questions' | 'codeSnippet' | 'answer'
  >('questions');

  const { pause, reset, totalSeconds } = useStopwatch({ autoStart: true });

  useEffect(() => {
    if (selectedAnswer) {
      const answer = question.answers.find(
        (answer) => answer.uid === selectedAnswer
      )?.answerFullSnippet;
      setPrefilledCodeSnippet(answer || question.codeSnippet);
    }
  }, [selectedAnswer, question.answers, question.codeSnippet]);

  const submitQuestionAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pause();

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
      const opts = {
        questionUid: question.uid,
        answerUid: selectedAnswer,
        userUid: user.uid,
        timeTaken,
      };

      const {
        correctAnswer: isCorrect,
        userAnswer: submittedAnswer,
        userData: newUserData,
      } = await answerQuestion(opts);

      setCorrectAnswer(isCorrect ? 'correct' : 'incorrect');
      setUserAnswer(submittedAnswer);
      setNewUserData(newUserData);

      // once we have submitted the answer, we can set the current layout to 'answer'
      setCurrentLayout('answer');
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
    setPrefilledCodeSnippet(question.codeSnippet);
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
        pause,
        reset,
        totalSeconds,
        currentLayout,
        setCurrentLayout,
        customQuestion,
        setCustomQuestion,
        prefilledCodeSnippet,
      }}
    >
      {children}
    </QuestionSingleContext.Provider>
  );
};
