'use client';

import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { answerQuestion } from '@/actions/answers/answer';
import { generateAnswerHelp } from '@/actions/ai/questions/answer-help';
import { executeQuestionCode } from '@/actions/questions/execute';
import { useSearchParams } from 'next/navigation';
import { useStudyPath } from '@/hooks/use-study-path';
import { readStreamableValue } from 'ai/rsc';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { devLog } from '@/utils';
import { Question, QuestionWithoutAnswers, Answer, UserRecord, QuestionAnswer } from '@/types';
import { StudyPath } from '@prisma/client';

interface TestRunResult {
  passed: boolean;
  details?: Array<{
    passed: boolean;
    input: number[];
    expected: number;
    received: number;
  }>;
  error?: string;
}

type LayoutType = 'questions' | 'codeSnippet' | 'answer';

interface QuestionSingleContextType {
  // State
  question: Question;
  user: UserRecord | null;
  isSubmitting: boolean;
  correctAnswer: 'init' | 'incorrect' | 'correct';
  userAnswer: Answer | null;
  newUserData: UserRecord | null;
  selectedAnswer: string;
  timeTaken: number;
  currentLayout: LayoutType;
  customQuestion: boolean;
  prefilledCodeSnippet: string | null;
  answerHelp: string;
  tokensUsed: number;
  code: string;
  originalCode: string;
  result: TestRunResult | null;
  showHint: boolean;
  nextQuestion: string | null | undefined;
  previousQuestion: string | null | undefined;
  totalSeconds: number;
  runningCode: boolean;
  testRunResult: TestRunResult | null;

  // Data
  relatedQuestions: Promise<QuestionWithoutAnswers[]> | null;
  suggestedQuestions: Promise<QuestionWithoutAnswers[]> | null;
  studyPath: StudyPath | null;
  userAnswered: Promise<Answer | null>;

  // Setters
  setSelectedAnswer: (answer: string) => void;
  setTimeTaken: (time: number) => void;
  setCurrentLayout: (layout: LayoutType) => void;
  setCustomQuestion: (customQuestion: boolean) => void;
  setAnswerHelp: (answerHelp: string) => void;
  setTokensUsed: (tokensUsed: number) => void;
  setCode: (code: string) => void;
  setShowHint: (showHint: boolean) => void;
  setNextQuestion: (nextQuestion: string | null | undefined) => void;
  setPreviousQuestion: (previousQuestion: string | null | undefined) => void;
  setTotalSeconds: (totalSeconds: number) => void;
  setRunningCode: (runningCode: boolean) => void;

  // Methods
  submitQuestionAnswer: (
    e: React.FormEvent<HTMLFormElement>,
    totalSeconds: number
  ) => Promise<void>;
  resetQuestionState: () => void;
  generateAiAnswerHelp: (setCodeSnippetLayout?: boolean) => Promise<void>;
  validateCode: (e: React.FormEvent<HTMLFormElement>, totalSeconds: number) => Promise<void>;
  submitAnswer: (e: React.FormEvent<HTMLFormElement>, totalSeconds: number) => Promise<void>;
  testRunCode: () => Promise<void>;
}

const QuestionSingleContext = createContext<QuestionSingleContextType>(
  {} as QuestionSingleContextType
);

export const useQuestionSingle = () => {
  const context = useContext(QuestionSingleContext);
  if (!context) {
    throw new Error('useQuestionSingle must be used within a QuestionSingleContextProvider');
  }
  return context;
};

export const QuestionSingleContextProvider = ({
  children,
  question,
  user,
  relatedQuestions,
  userAnswered,
  suggestedQuestions,
}: {
  children: React.ReactNode;
  question: Question;
  user: UserRecord | null;
  relatedQuestions: Promise<QuestionWithoutAnswers[]> | null;
  userAnswered: Promise<Answer | null>;
  suggestedQuestions: Promise<QuestionWithoutAnswers[]> | null;
}) => {
  // Search params and study path
  const searchParams = useSearchParams();
  const studyPathSlug = searchParams?.get('study-path');
  const { studyPath } = useStudyPath(studyPathSlug || '') as {
    studyPath: StudyPath | null;
  };

  // Answer state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<'init' | 'incorrect' | 'correct'>('init');
  const [userAnswer, setUserAnswer] = useState<Answer | null>(null);
  const [newUserData, setNewUserData] = useState<UserRecord | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeTaken, setTimeTaken] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);

  // UI state
  const [currentLayout, setCurrentLayout] = useState<LayoutType>('questions');
  const [showHint, setShowHint] = useState(false);
  const [customQuestion, setCustomQuestion] = useState(false);
  const [prefilledCodeSnippet, setPrefilledCodeSnippet] = useState<string | null>(null);

  // Code state
  const [code, setCode] = useState(question.codeSnippet || '');
  const originalCode = useMemo(() => question.codeSnippet || '', [question.codeSnippet]);
  const [result, setResult] = useState<TestRunResult | null>(null);
  const [runningCode, setRunningCode] = useState(false);
  const [testRunResult, setTestRunResult] = useState<TestRunResult | null>(null);

  // Navigation
  const [nextQuestion, setNextQuestion] = useState<string | null | undefined>(null);
  const [previousQuestion, setPreviousQuestion] = useState<string | null | undefined>(null);

  // AI Help
  const [answerHelp, setAnswerHelp] = useState('');
  const [tokensUsed, setTokensUsed] = useState(
    user?.userLevel === 'PREMIUM' ? Infinity : user?.aiQuestionHelpTokens || 0
  );

  // Local storage
  const { setValue: setSavedLocalStorageCode, removeFromArray } = useLocalStorage({
    key: question.slug ? `challenge-${question.slug}` : '',
    defaultValue: '',
  });

  // Reset state when question changes
  useEffect(() => {
    devLog(`Question changed: UID=${question.uid}, Lesson Index=${searchParams?.get('lesson')}`);

    const resetState = () => {
      setCorrectAnswer('init');
      setUserAnswer(null);
      setCurrentLayout('questions');
      setSelectedAnswer('');
      setAnswerHelp('');
      setTotalSeconds(0);
      setTimeTaken(0);
      setPrefilledCodeSnippet(null);
      setCode(question.codeSnippet || '');
      setResult(null);
      setTestRunResult(null);
      setShowHint(false);
      setRunningCode(false);
    };

    resetState();
  }, [searchParams?.get('lesson')]);

  // Set prefilled code snippet based on selected answer
  useEffect(() => {
    if (selectedAnswer && !prefilledCodeSnippet) {
      const answer = question.answers.find(
        (answer: QuestionAnswer) => answer.uid === selectedAnswer
      )?.answerFullSnippet;
      setPrefilledCodeSnippet(answer || question.codeSnippet);
    }
  }, [selectedAnswer, question.answers, question.codeSnippet, prefilledCodeSnippet]);

  const handleAnswerSubmission = async (
    isCorrect: boolean,
    submittedAnswer: Answer,
    newUserData: UserRecord
  ) => {
    setCorrectAnswer(isCorrect ? 'correct' : 'incorrect');
    setUserAnswer(submittedAnswer);
    setNewUserData(newUserData);
    setCurrentLayout('answer');
  };

  const submitQuestionAnswer = async (
    e: React.FormEvent<HTMLFormElement>,
    totalSeconds: number
  ) => {
    e.preventDefault();

    if (!user) {
      toast.error('User is not logged in');
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
      const response = await answerQuestion(opts);
      // Ensure userData is not null before passing to handleAnswerSubmission
      if (response.userData) {
        await handleAnswerSubmission(
          response.correctAnswer,
          response.userAnswer,
          response.userData
        );
      } else {
        console.error('User data is null');
        toast.error('Error processing user data');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    } finally {
      removeFromArray(question.slug ? `challenge-${question.slug}` : '');
      setIsSubmitting(false);
    }
  };

  const validateCode = async (e: React.FormEvent<HTMLFormElement>, totalSeconds: number) => {
    e.preventDefault();

    if (question.questionType !== 'CODING_CHALLENGE') {
      toast.error('No challenge found');
      return;
    }

    try {
      const results = await executeQuestionCode({
        code,
        language: 'javascript',
        testCases: question.testCases,
      });

      const allPassed = results.every((r: any) => r.passed);
      setResult({
        passed: allPassed,
        details: results.map((r: any) => ({
          passed: r.passed,
          input: r.input,
          expected: r.expected,
          received: r.received,
        })),
      });

      await answerQuestion({
        questionUid: question.uid,
        answerUid: null,
        timeTaken: totalSeconds,
        allPassed,
        studyPathSlug: studyPathSlug || undefined,
      });

      setSavedLocalStorageCode('');
      setCorrectAnswer(allPassed ? 'correct' : 'incorrect');
    } catch (error: any) {
      setResult({
        passed: false,
        error: error.message,
      });
      setCorrectAnswer('incorrect');
    }
  };

  const submitAnswer = async (e: React.FormEvent<HTMLFormElement>, totalSeconds: number) => {
    setIsSubmitting(true);

    if (!user) {
      toast.error('User is not logged in');
      return;
    }

    try {
      if (question.questionType === 'CODING_CHALLENGE') {
        await validateCode(e, totalSeconds);
      } else {
        await submitQuestionAnswer(e, totalSeconds);
      }
      setCurrentLayout('answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAiAnswerHelp = async (setCodeSnippetLayout?: boolean) => {
    if (setCodeSnippetLayout) {
      setCurrentLayout('codeSnippet');
    }

    try {
      setAnswerHelp(JSON.stringify({ status: 'loading', message: 'Generating answer help...' }));

      const { tokensUsed: newTokensUsed, object } = await generateAnswerHelp(
        question.uid,
        question.questionType === 'CODING_CHALLENGE'
          ? result?.passed || false
          : correctAnswer === 'correct',
        'regular'
      );

      if (!object) {
        setAnswerHelp(JSON.stringify({ error: 'Failed to generate answer help' }));
        toast.error('Error generating answer help');
        return;
      }

      setTokensUsed(newTokensUsed);

      try {
        for await (const partialObject of readStreamableValue(object)) {
          if (partialObject) {
            setAnswerHelp(JSON.stringify(partialObject, null, 2));
          }
        }
      } catch (error) {
        console.error('Error streaming response:', error);
        setAnswerHelp(JSON.stringify({ error: 'Error processing the response' }));
        toast.error('Error processing the response');
      }
    } catch (error) {
      console.error('Error generating answer help:', error);
      setAnswerHelp(JSON.stringify({ error: 'Failed to generate answer help' }));
      toast.error('Error generating answer help');
    }
  };

  const testRunCode = async () => {
    if (!user) {
      toast.error('User is not logged in');
      return;
    }

    setRunningCode(true);

    try {
      const results = await executeQuestionCode({
        code,
        language: 'javascript',
        testCases: question.testCases,
      });

      if (!results) {
        toast.error('Error running code');
        return;
      }

      const allPassed = results.every((r: any) => r.passed);
      setTestRunResult({
        passed: allPassed,
        details: results.map((r: any) => ({
          passed: r.passed,
          input: r.input,
          expected: r.expected,
          received: r.received,
        })),
      });
    } finally {
      setRunningCode(false);
    }
  };

  const resetQuestionState = () => {
    setCorrectAnswer('init');
    setUserAnswer(null);
    setNewUserData(null);
    setIsSubmitting(false);
    setSelectedAnswer('');
    setTimeTaken(0);
    setPrefilledCodeSnippet(null);
    setCurrentLayout('questions');
    setAnswerHelp('');
    setTotalSeconds(0);
    setCode(originalCode);
    setResult(null);
    setTestRunResult(null);
    setShowHint(false);
    removeFromArray(question.slug ? `challenge-${question.slug}` : '');
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
        currentLayout,
        customQuestion,
        prefilledCodeSnippet,
        answerHelp,
        tokensUsed,
        code,
        originalCode,
        result,
        showHint,
        nextQuestion,
        previousQuestion,
        totalSeconds,
        runningCode,
        testRunResult,
        relatedQuestions,
        suggestedQuestions,
        studyPath,
        userAnswered,
        setSelectedAnswer,
        setTimeTaken,
        setCurrentLayout,
        setCustomQuestion,
        setAnswerHelp,
        setTokensUsed,
        setCode,
        setShowHint,
        setNextQuestion,
        setPreviousQuestion,
        setTotalSeconds,
        setRunningCode,
        submitQuestionAnswer,
        resetQuestionState,
        generateAiAnswerHelp,
        validateCode,
        submitAnswer,
        testRunCode,
      }}
    >
      {children}
    </QuestionSingleContext.Provider>
  );
};
