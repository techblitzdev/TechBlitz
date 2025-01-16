'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { toast } from 'sonner';
import { answerQuestion } from '@/actions/answers/answer';
import { Question, QuestionWithoutAnswers } from '@/types/Questions';
import { UserRecord } from '@/types/User';
import { Answer } from '@/types/Answers';
import { generateAnswerHelp } from '@/actions/ai/questions/answer-help';
import { answerHelpSchema } from '@/lib/zod/schemas/ai/answer-help';
import { z } from 'zod';

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
  relatedQuestions: Promise<QuestionWithoutAnswers[]> | null;
  generateAiAnswerHelp: (setCodeSnippetLayout?: boolean) => Promise<void>;
  answerHelp: z.infer<typeof answerHelpSchema> | null;
  setAnswerHelp: (answerHelp: z.infer<typeof answerHelpSchema> | null) => void;
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
  relatedQuestions,
}: {
  children: React.ReactNode;
  question: Question;
  user: UserRecord | null;
  relatedQuestions: Promise<QuestionWithoutAnswers[]> | null;
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

  // track the answer help
  const [answerHelp, setAnswerHelp] = useState<z.infer<
    typeof answerHelpSchema
  > | null>(null);

  // the current layout of the page
  const [currentLayout, setCurrentLayout] = useState<
    'questions' | 'codeSnippet' | 'answer'
  >('questions');

  const { pause, reset, totalSeconds } = useStopwatch({ autoStart: true });

  useEffect(() => {
    if (selectedAnswer && !prefilledCodeSnippet) {
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

  const generateAiAnswerHelp = async (setCodeSnippetLayout?: boolean) => {
    // if the user has asked for assistance for the answer, set the current layout to 'codeSnippet'
    // this is so mobile view switches to the code snippet view
    if (setCodeSnippetLayout) {
      setCurrentLayout('codeSnippet');
    }
    const answerHelp = await generateAnswerHelp(
      question.uid,
      correctAnswer === 'correct'
    );
    if (!answerHelp) {
      toast.error('Error generating answer help');
      return;
    }

    console.log(answerHelp);

    setAnswerHelp(answerHelp);
  };

  const resetQuestionState = () => {
    reset();
    setCorrectAnswer('init');
    setUserAnswer(null);
    setNewUserData(null);
    setIsSubmitting(false);
    setSelectedAnswer('');
    setTimeTaken(0);
    setPrefilledCodeSnippet(null);
    setCurrentLayout('questions');
    setAnswerHelp(null);
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
        relatedQuestions,
        generateAiAnswerHelp,
        answerHelp,
        setAnswerHelp,
      }}
    >
      {children}
    </QuestionSingleContext.Provider>
  );
};
