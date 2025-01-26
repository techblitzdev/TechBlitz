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
import { useSearchParams } from 'next/navigation';

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
  tokensUsed: number;
  setTokensUsed: (tokensUsed: number) => void;
  validateCode: (e: React.FormEvent<HTMLFormElement>) => void;
  code: string;
  setCode: (code: string) => void;
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
  submitAnswer: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  userAnswered: Promise<Answer | null>;
  showHint: boolean;
  setShowHint: (showHint: boolean) => void;
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
  userAnswered,
}: {
  children: React.ReactNode;
  question: Question;
  user: UserRecord | null;
  relatedQuestions: Promise<QuestionWithoutAnswers[]> | null;
  userAnswered: Promise<Answer | null>;
}) => {
  // for handling study path progress
  const searchParams = useSearchParams();
  const studyPathSlug = searchParams?.get('study-path');

  // STATE VARIABLES
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

  // track the tokens used
  const [tokensUsed, setTokensUsed] = useState<number>(
    user?.userLevel === 'PREMIUM' ? Infinity : user?.aiQuestionHelpTokens || 0
  );

  // the current layout of the page
  const [currentLayout, setCurrentLayout] = useState<
    'questions' | 'codeSnippet' | 'answer'
  >('questions');

  const [code, setCode] = useState('');
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

  // stopwatch

  const { pause, reset, totalSeconds } = useStopwatch({ autoStart: true });

  // EFFECTS
  useEffect(() => {
    if (selectedAnswer && !prefilledCodeSnippet) {
      const answer = question.answers.find(
        (answer) => answer.uid === selectedAnswer
      )?.answerFullSnippet;
      setPrefilledCodeSnippet(answer || question.codeSnippet);
    }
  }, [selectedAnswer, question.answers, question.codeSnippet]);

  // METHODS
  // submits the answer for a non-CODING_CHALLENGE question
  const submitQuestionAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
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
        timeTaken,
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

      // once we have submitted the answer, we can set the current layout to 'answer'
      setCurrentLayout('answer');
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  // validates the code for a CODING_CHALLENGE question
  const validateCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const challenge =
      question.questionType === 'CODING_CHALLENGE' ? question : null;

    if (!challenge) {
      toast.error('No challenge found');
      return;
    }

    try {
      // Create function using Function constructor with more robust parsing
      const createSafeFunction = (code: string) => {
        try {
          // Wrap code in a return statement to ensure function creation
          const wrappedCode = `return (${code})`;
          const safeFunction = new Function(wrappedCode)();

          // Validate function properties
          if (typeof safeFunction !== 'function') {
            throw new Error('Invalid function');
          }

          return safeFunction;
        } catch (error: any) {
          throw new Error('Function creation failed: ' + error?.message);
        }
      };

      const userFunction = createSafeFunction(code);

      // Run test cases with comprehensive error handling
      const results = challenge.testCases.map((test: any) => {
        try {
          const result = userFunction(...test.input);
          const received =
            typeof result === 'object' ? JSON.stringify(result) : result;

          // check if the expected is an array, if it is, convert wrap it in an array
          const expected = Array.isArray(test.expected)
            ? `[${test.expected.join(',')}]`
            : test.expected;

          return {
            passed: expected == received,
            input: test.input,
            expected,
            received,
          };
        } catch (execError) {
          return {
            passed: false,
            input: test.input,
            expected: test.expected,
            received:
              execError instanceof Error
                ? execError.message
                : 'Execution failed',
          };
        }
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

  // method to submit the answer depending on the question type
  const submitAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) {
      toast.error('User is not logged in');
      return;
    }
    // pause the timer
    pause();

    // determine method to use based on question type
    if (question.questionType === 'CODING_CHALLENGE') {
      validateCode(e);
    } else {
      submitQuestionAnswer(e);
    }

    // set the current layout to 'answer' to show the answer submitted
    setCurrentLayout('answer');
  };

  const generateAiAnswerHelp = async (setCodeSnippetLayout?: boolean) => {
    // if the user has asked for assistance for the answer, set the current layout to 'codeSnippet'
    // this is so mobile view switches to the code snippet view
    if (setCodeSnippetLayout) {
      setCurrentLayout('codeSnippet');
    }
    const { content, tokensUsed } = await generateAnswerHelp(
      question.uid,
      question.questionType === 'CODING_CHALLENGE'
        ? result?.passed || false
        : correctAnswer === 'correct'
    );

    if (!content) {
      toast.error('Error generating answer help');
      return;
    }

    setTokensUsed(tokensUsed);
    setAnswerHelp(content);
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
    setCode(question.codeSnippet || '');
    setResult(null);
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
        tokensUsed,
        setTokensUsed,
        validateCode,
        code,
        setCode,
        result,
        submitAnswer,
        userAnswered,
        showHint,
        setShowHint,
      }}
    >
      {children}
    </QuestionSingleContext.Provider>
  );
};
