'use client';

import { Question } from '@/types/Questions';
import { UserRecord } from '@/types/User';
import { Answer } from '@/types/Answers';
import { createContext, useState, useContext, useEffect } from 'react';
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
  currentLayout: 'questions' | 'codeSnippet';
  setCurrentLayout: (layout: 'questions' | 'codeSnippet') => void;
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
  // stored here so we can start to change the codeSnippet based on the user's answer
  // (prefilling the code snippet)
  const [userAnswer, setUserAnswer] = useState<Answer | null>(null);
  const [newUserData, setNewUserData] = useState<UserRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [customQuestion, setCustomQuestion] = useState(false);

  // The prefilled code snippet
  const [prefilledCodeSnippet, setPrefilledCodeSnippet] = useState<
    string | null
  >(null);
  // on answer selected change, check if the answer is a code snippet
  // if it is, set the prefilled code snippet to the answer
  useEffect(() => {
    // Check if the selected answer is a prefill answer
    // everytime the answer changes, we need to check if we can update
    // the prefilled code snippet
    if (selectedAnswer) {
      const answer = question.answers.find(
        (answer) => answer.uid === selectedAnswer
      )?.answerFullSnippet;

      if (answer) {
        setPrefilledCodeSnippet(answer);
      } else {
        setPrefilledCodeSnippet(question.codeSnippet);
      }
    }
  }, [selectedAnswer]);

  // this determines if the code snippet or question is shown in the question card on mobile
  // on button click, it acts as a toggle
  const [currentLayout, setCurrentLayout] = useState<
    'questions' | 'codeSnippet'
  >('questions');

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
        isModalOpen,
        setIsModalOpen,
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
