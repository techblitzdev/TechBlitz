'use client';

import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { answerQuestion } from '@/actions/answers/answer';
import { Question, QuestionWithoutAnswers } from '@/types/Questions';
import { UserRecord } from '@/types/User';
import { Answer } from '@/types/Answers';
import { generateAnswerHelp } from '@/actions/ai/questions/answer-help';
import { answerHelpSchema } from '@/lib/zod/schemas/ai/answer-help';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { executeQuestionCode } from '@/actions/questions/execute';

// Define the context type for the question single page
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
  submitQuestionAnswer: (
    e: React.FormEvent<HTMLFormElement>,
    totalSeconds: number
  ) => Promise<void>;
  resetQuestionState: () => void;
  currentLayout: 'questions' | 'codeSnippet' | 'answer';
  setCurrentLayout: (layout: 'questions' | 'codeSnippet' | 'answer') => void;
  customQuestion: boolean;
  setCustomQuestion: (customQuestion: boolean) => void;
  prefilledCodeSnippet: string | null;
  relatedQuestions: Promise<QuestionWithoutAnswers[]> | null;
  generateAiAnswerHelp: (setCodeSnippetLayout?: boolean) => Promise<void>;
  answerHelp: z.infer<typeof answerHelpSchema> | null;
  setAnswerHelp: (answerHelp: z.infer<typeof answerHelpSchema> | null) => void;
  tokensUsed: number;
  setTokensUsed: (tokensUsed: number) => void;
  validateCode: (e: React.FormEvent<HTMLFormElement>, totalSeconds: number) => Promise<void>;
  code: string;
  setCode: (code: string) => void;
  originalCode: string;
  result: {
    passed: boolean;
    details?: Array<{
      passed: boolean;
      input: number[];
      expected: number;
      received: number;
    }>;
    error?: string;
  } | null;
  submitAnswer: (e: React.FormEvent<HTMLFormElement>, totalSeconds: number) => Promise<void>;
  userAnswered: Promise<Answer | null>;
  showHint: boolean;
  setShowHint: (showHint: boolean) => void;
  nextQuestion: string | null | undefined;
  previousQuestion: string | null | undefined;
  setNextQuestion: (nextQuestion: string | null | undefined) => void;
  setPreviousQuestion: (previousQuestion: string | null | undefined) => void;
  totalSeconds: number;
  setTotalSeconds: (totalSeconds: number) => void;
};

// Create the context
export const QuestionSingleContext = createContext<QuestionSingleContextType>(
  {} as QuestionSingleContextType
);

// Custom hook to use the context
export const useQuestionSingle = () => {
  const context = useContext(QuestionSingleContext);
  if (!context) {
    throw new Error('useQuestionSingle must be used within a QuestionSingleContextProvider');
  }
  return context;
};

// Context provider component
export const QuestionSingleContextProvider = ({
  children,
  question,
  user,
  relatedQuestions,
  userAnswered,
}: {
  children: React.ReactNode;
  question: Question;
  user: UserRecord | null;
  relatedQuestions: Promise<QuestionWithoutAnswers[]> | null;
  userAnswered: Promise<Answer | null>;
}) => {
  // Get study path slug from URL search params
  const searchParams = useSearchParams();
  const studyPathSlug = searchParams?.get('study-path');

  // STATE VARIABLES
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<'init' | 'incorrect' | 'correct'>('init');
  const [userAnswer, setUserAnswer] = useState<Answer | null>(null);
  const [newUserData, setNewUserData] = useState<UserRecord | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [customQuestion, setCustomQuestion] = useState(false);
  const [prefilledCodeSnippet, setPrefilledCodeSnippet] = useState<string | null>(null);
  const [answerHelp, setAnswerHelp] = useState<z.infer<typeof answerHelpSchema> | null>(null);
  const [tokensUsed, setTokensUsed] = useState<number>(
    user?.userLevel === 'PREMIUM' ? Infinity : user?.aiQuestionHelpTokens || 0
  );
  const [currentLayout, setCurrentLayout] = useState<'questions' | 'codeSnippet' | 'answer'>(
    'questions'
  );
  const [code, setCode] = useState(question.codeSnippet || '');
  const originalCode = useMemo(() => question.codeSnippet || '', [question.codeSnippet]);
  const [result, setResult] = useState<{
    passed: boolean;
    details?: Array<{
      passed: boolean;
      input: number[];
      expected: number;
      received: number;
    }>;
    error?: string;
  } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [nextQuestion, setNextQuestion] = useState<string | null | undefined>(null);
  const [previousQuestion, setPreviousQuestion] = useState<string | null | undefined>(null);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);

  // EFFECTS
  useEffect(() => {
    // Set prefilled code snippet based on the selected answer
    if (selectedAnswer && !prefilledCodeSnippet) {
      const answer = question.answers.find(
        (answer) => answer.uid === selectedAnswer
      )?.answerFullSnippet;
      setPrefilledCodeSnippet(answer || question.codeSnippet);
    }
  }, [selectedAnswer, question.answers, question.codeSnippet]);

  // METHODS
  // Submit the answer for a non-CODING_CHALLENGE question
  const submitQuestionAnswer = async (
    e: React.FormEvent<HTMLFormElement>,
    totalSeconds: number
  ) => {
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
      const opts = {
        questionUid: question.uid,
        answerUid: selectedAnswer,
        userUid: user.uid,
        timeTaken: totalSeconds,
        studyPathSlug: studyPathSlug || undefined,
      };

      const {
        correctAnswer: isCorrect,
        userAnswer: submittedAnswer,
        userData: newUserData,
      } = await answerQuestion(opts);

      setCorrectAnswer(isCorrect ? 'correct' : 'incorrect');
      setUserAnswer(submittedAnswer);
      setNewUserData(newUserData);

      // Switch to the answer layout after submission
      setCurrentLayout('answer');
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validate the code for a CODING_CHALLENGE question
  const validateCode = async (e: React.FormEvent<HTMLFormElement>, totalSeconds: number) => {
    e.preventDefault();

    const challenge = question.questionType === 'CODING_CHALLENGE' ? question : null;

    if (!challenge) {
      toast.error('No challenge found');
      return;
    }

    try {
      // Execute the user's code with test cases
      const results = await executeQuestionCode({
        code,
        language: 'javascript',
        testCases: challenge.testCases,
      });

      const allPassed = results.every((r: any) => r.passed);
      setResult({ passed: allPassed, details: results });

      await answerQuestion({
        questionUid: question.uid,
        answerUid: null,
        userUid: user?.uid || '',
        timeTaken: totalSeconds,
        allPassed,
        studyPathSlug: studyPathSlug || undefined,
      });

      setCorrectAnswer(allPassed ? 'correct' : 'incorrect');
    } catch (error: any) {
      setResult({
        passed: false,
        error: error.message,
      });
      setCorrectAnswer('incorrect');
    }
  };

  // Submit the answer based on the question type
  const submitAnswer = async (e: React.FormEvent<HTMLFormElement>, totalSeconds: number) => {
    setIsSubmitting(true);
    if (!user) {
      toast.error('User is not logged in');
      return;
    }

    // Use the appropriate method based on the question type
    if (question.questionType === 'CODING_CHALLENGE') {
      await validateCode(e, totalSeconds);
    } else {
      await submitQuestionAnswer(e, totalSeconds);
    }

    setIsSubmitting(false);
    setCurrentLayout('answer'); // Switch to the answer layout
  };

  // Generate AI-based answer help
  const generateAiAnswerHelp = async (setCodeSnippetLayout?: boolean) => {
    if (setCodeSnippetLayout) {
      setCurrentLayout('codeSnippet');
    }
    const { content, tokensUsed } = await generateAnswerHelp(
      question.uid,
      question.questionType === 'CODING_CHALLENGE'
        ? result?.passed || false
        : correctAnswer === 'correct',
      'regular'
    );

    if (!content) {
      toast.error('Error generating answer help');
      return;
    }

    setTokensUsed(tokensUsed);
    setAnswerHelp(content);
  };

  // Reset the question state
  const resetQuestionState = () => {
    console.log('resetting question state');
    setCorrectAnswer('init');
    setUserAnswer(null);
    setNewUserData(null);
    setIsSubmitting(false);
    setSelectedAnswer('');
    setTimeTaken(0);
    setPrefilledCodeSnippet(null);
    setCurrentLayout('questions');
    setAnswerHelp(null);
    setTotalSeconds(0);
    setCode(originalCode);
    setResult(null);
    setShowHint(false);
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
        currentLayout,
        setCurrentLayout,
        customQuestion,
        setCustomQuestion,
        prefilledCodeSnippet,
        relatedQuestions,
        generateAiAnswerHelp,
        answerHelp,
        setAnswerHelp,
        tokensUsed,
        setTokensUsed,
        validateCode,
        code,
        setCode,
        originalCode,
        result,
        submitAnswer,
        userAnswered,
        showHint,
        setShowHint,
        nextQuestion,
        setNextQuestion,
        previousQuestion,
        setPreviousQuestion,
        totalSeconds,
        setTotalSeconds,
      }}
    >
      {children}
    </QuestionSingleContext.Provider>
  );
};
