'use client';

import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { answerQuestion } from '@/actions/answers/answer';
import { Question, QuestionWithoutAnswers } from '@/types/Questions';
import { UserRecord } from '@/types/User';
import { Answer } from '@/types/Answers';
import { generateAnswerHelp } from '@/actions/ai/questions/answer-help';
import { useSearchParams } from 'next/navigation';
import { executeQuestionCode } from '@/actions/questions/execute';
import { useStudyPath } from '@/hooks/use-study-path';
import { StudyPath } from '@prisma/client';
import { readStreamableValue } from 'ai/rsc';

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
  answerHelp: string;
  setAnswerHelp: (answerHelp: string) => void;
  tokensUsed: number;
  setTokensUsed: (tokensUsed: number) => void;
  validateCode: (e: React.FormEvent<HTMLFormElement>, totalSeconds: number) => Promise<void>;
  code: string;
  setCode: (code: string) => void;
  originalCode: string;
  result: TestRunResult | null;
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

  // Test run code
  runningCode: boolean;
  setRunningCode: (runningCode: boolean) => void;
  testRunCode: () => Promise<void>;
  testRunResult: TestRunResult | null;

  // Suggested questions
  suggestedQuestions: Promise<QuestionWithoutAnswers[]> | null;

  // Study path
  studyPath: StudyPath | null;
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
  suggestedQuestions,
}: {
  children: React.ReactNode;
  question: Question;
  user: UserRecord | null;
  relatedQuestions: Promise<QuestionWithoutAnswers[]> | null;
  userAnswered: Promise<Answer | null>;
  suggestedQuestions: Promise<QuestionWithoutAnswers[]> | null;
}) => {
  // Get study path slug from URL search params
  const searchParams = useSearchParams();
  const studyPathSlug = searchParams?.get('study-path');

  const { studyPath } = useStudyPath(studyPathSlug || '') as {
    studyPath: StudyPath | null;
  };

  // STATE VARIABLES
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<'init' | 'incorrect' | 'correct'>('init');
  const [userAnswer, setUserAnswer] = useState<Answer | null>(null);
  const [newUserData, setNewUserData] = useState<UserRecord | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [customQuestion, setCustomQuestion] = useState(false);
  const [prefilledCodeSnippet, setPrefilledCodeSnippet] = useState<string | null>(null);
  const [answerHelp, setAnswerHelp] = useState<string>('');
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
  const [runningCode, setRunningCode] = useState(false);
  const [testRunResult, setTestRunResult] = useState<{
    passed: boolean;
    details?: Array<{
      passed: boolean;
      input: number[];
      expected: number;
      received: number;
    }>;
    error?: string;
  } | null>(null);

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

  // Reset the state when the lesson index changes or question changes
  useEffect(() => {
    console.log(
      `Question changed or lesson index changed: UID=${
        question.uid
      }, Lesson Index=${searchParams?.get('lesson')}`
    );

    // Reset all answer-related state
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
    setTestRunResult(null); // Reset test run results when changing questions
    setShowHint(false);
    setRunningCode(false); // Ensure running code state is reset

    // Ensure nothing from the previous question affects this one
  }, [question, question.uid, searchParams?.get('lesson')]);

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
    setCurrentLayout('answer'); // switch to the answer layout
  };

  // Generate AI-based answer help
  const generateAiAnswerHelp = async (setCodeSnippetLayout?: boolean) => {
    if (setCodeSnippetLayout) {
      setCurrentLayout('codeSnippet');
    }

    try {
      // Set a loading placeholder
      setAnswerHelp(JSON.stringify({ status: 'loading', message: 'Generating answer help...' }));

      const { tokensUsed: newTokensUsed, object } = await generateAnswerHelp(
        question.uid,
        question.questionType === 'CODING_CHALLENGE'
          ? result?.passed || false
          : correctAnswer === 'correct',
        'regular'
      );

      if (!object) {
        setAnswerHelp(
          JSON.stringify({ error: 'Failed to generate answer help. Please try again.' })
        );
        toast.error('Error generating answer help');
        return;
      }

      // Update token count
      setTokensUsed(newTokensUsed);

      try {
        // Process the streamed response
        // @ts-ignore - This is needed because the StreamableValue types don't match perfectly
        for await (const partialObject of readStreamableValue(object)) {
          if (partialObject) {
            setAnswerHelp(JSON.stringify(partialObject, null, 2));
          }
        }
      } catch (error) {
        console.error('Error streaming response:', error);
        setAnswerHelp(
          JSON.stringify({ error: 'Error processing the response. Please try again.' })
        );
        toast.error('Error processing the response');
      }
    } catch (error) {
      console.error('Error generating answer help:', error);
      setAnswerHelp(JSON.stringify({ error: 'Failed to generate answer help. Please try again.' }));
      toast.error('Error generating answer help');
    }
  };

  // Test run the code
  const testRunCode = async () => {
    // user must be logged in
    if (!user) {
      toast.error('User is not logged in');
      return;
    }

    setRunningCode(true);

    // simulate a 5 second delay
    // Execute the user's code with test cases
    const results = await executeQuestionCode({
      code,
      language: 'javascript',
      testCases: question.testCases,
    });

    if (!results) {
      toast.error('Error running code');
      setRunningCode(false);
      return;
    }

    const allPassed = results?.every((r: any) => r.passed);

    // simulate a random result
    setTestRunResult({
      passed: allPassed,
      details: results.map((r: any) => ({
        passed: r.passed,
        input: r.input,
        expected: r.expected,
        received: r.received,
      })),
    });

    // after 5 seconds, set the result to null
    setTimeout(() => {
      setTestRunResult(null);
    }, 5000);

    setRunningCode(false);
  };

  // Reset the question state
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
        runningCode,
        setRunningCode,
        testRunCode,
        testRunResult,
        suggestedQuestions,
        studyPath,
      }}
    >
      {children}
    </QuestionSingleContext.Provider>
  );
};
