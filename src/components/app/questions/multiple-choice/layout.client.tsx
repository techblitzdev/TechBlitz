'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { INCORRECT_ANSWER_XP, QUESTION_XP } from '@/utils/constants/question-xp';

import FeedbackBanner from '@/components/app/questions/multiple-choice/feedback-banner';
import FasterThanAIWrapper from '@/components/app/questions/faster-than-ai/faster-than-ai-wrapper';
import MultipleChoiceFooter from '@/components/app/questions/multiple-choice/footer';
import MultipleChoiceCard from '@/components/app/questions/multiple-choice/card';
import HintDrawer from '@/components/app/questions/multiple-choice/hint-drawer';

import { answerQuestion } from '@/actions/answers/answer';

import { useQuestionSingle } from '@/contexts/question-single-context';

import type { QuestionAnswer } from '@/types/QuestionAnswers';
import type { Question } from '@/types/Questions';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/ui/code-block';

interface QuestionMock {
  uid: string;
  question: string;
  questionDate: string;
  correctAnswer: string;
  answers: QuestionAnswer[];
  [key: string]: any;
}

// Define navigation interface to match the data from getNextAndPreviousQuestion
interface NavigationData {
  previousQuestion: string | null | undefined;
  nextQuestion: string | null | undefined;
}

export default function MultipleChoiceLayoutClient({
  children,
  question,
  nextAndPreviousQuestion,
}: {
  children: React.ReactNode;
  question: Question | QuestionMock;
  nextAndPreviousQuestion: NavigationData | null;
}) {
  const { user, showHint, setShowHint } = useQuestionSingle();
  const router = useRouter();
  // determine if this question is eligible for the faster than ai game mode
  const fasterThanAiGameMode = user?.fasterThanAiGameMode && question.aiTimeToComplete;

  // Track the selected answer UID and text
  const [selectedAnswerData, setSelectedAnswerData] = useState<{
    uid: string;
    text: string;
  } | null>(null);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [xpIncrease, setXpIncrease] = useState(0);
  const [navigating, setNavigating] = useState(false);

  // Track time spent
  const [startTime] = useState<number>(Date.now());

  // Create a default object if nextAndPreviousQuestion is null
  const navigationData = nextAndPreviousQuestion || {
    previousQuestion: null,
    nextQuestion: null,
  };

  // Ensure answers is an array of QuestionAnswer objects
  const answers = Array.isArray(question.answers) ? question.answers : [];

  // check if this question has a code snippet or not
  const hasCodeSnippet = question.codeSnippet;

  // the container widths are different depending on if the question has a code snippet or not
  const containerWidth = hasCodeSnippet
    ? 'max-w-md md:max-w-2xl lg:max-w-4xl'
    : 'max-w-xs md:max-w-xl lg:max-w-2xl';

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

  const resetQuestion = () => {
    setIsSubmitted(false);
    setIsCorrect(null);
    setSelectedAnswerData(null);
  };

  // Handle submitting the answer
  const handleSubmit = async () => {
    if (!selectedAnswerData || isSubmitting) return;

    setIsSubmitting(true);

    // provides instant feedback without waiting for the server to respond
    if (question.correctAnswer === selectedAnswerData.uid) {
      setIsCorrect(true);
      setIsSubmitted(true);
      setXpIncrease(QUESTION_XP[question.difficulty] || 10);
    } else {
      setIsCorrect(false);
      setIsSubmitted(true);
      setXpIncrease(INCORRECT_ANSWER_XP);
    }

    try {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);

      // Get study path param if it exists
      const searchParams = new URLSearchParams(window.location.search);
      const studyPathSlug = searchParams.get('study-path');

      const { correctAnswer, userAnswer } = await answerQuestion({
        questionUid: question.uid,
        answerUid: selectedAnswerData.uid,
        timeTaken,
        studyPathSlug: studyPathSlug || undefined,
      });

      console.log({
        correctAnswer,
        userAnswer,
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Error submitting answer');
    } finally {
      // Move setting isSubmitting to false here to ensure it happens after the request completes
      setIsSubmitting(false);
    }
  };

  // Determine the navigation href with study path params if necessary
  const navigationHref = isSubmitted
    ? nextAndPreviousQuestion?.nextQuestion
      ? `/question/${nextAndPreviousQuestion.nextQuestion}`
      : '/coding-challenges'
    : '';

  // Add keyboard event handling for number keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent handling if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key;

      if (isSubmitted) {
        // After submission keyboard controls
        if (key === 'Backspace') {
          // Reset the question when Backspace is pressed after submission
          resetQuestion();
          toast.info('Question restarted');
        } else if (key === 'Enter' && navigationData.nextQuestion) {
          // Navigate to next question when Enter is pressed after submission
          // and a next question exists
          setNavigating(true);
          router.push(navigationHref);
        }
      } else {
        // Controls when question is not yet submitted
        const numberPressed = parseInt(key);

        // If it's a number key and within the range of available answers
        if (!isNaN(numberPressed) && numberPressed > 0 && numberPressed <= answers.length) {
          // Adjust for 0-based indexing (key 1 selects index 0)
          const index = numberPressed - 1;
          const answerText = answers[index].answer;

          // Select the answer
          handleSelectAnswer(answerText, index);

          // Provide visual feedback
          toast.info(`Selected answer ${numberPressed}`);
        } else if (key === 'Enter' && selectedAnswerData && !isSubmitting) {
          // Submit answer on Enter key if an answer is selected
          handleSubmit();
        }
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [answers, selectedAnswerData, isSubmitted, isSubmitting, navigationData, resetQuestion]);

  // Find the correct answer UID for highlighting
  const correctAnswerUid = question.correctAnswer;

  // Get the feedback messages
  const getFeedbackMessage = useCallback(() => {
    if (!isSubmitted) return null;

    if (isCorrect) {
      const messages = [
        'Excellent!',
        'Perfect!',
        'Great job!',
        'You got it!',
        'Brilliant!',
        'Nicely done!',
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    } else {
      const messages = [
        'Try again!',
        'Almost there!',
        "You'll get it next time!",
        'We all make mistakes',
        'Practice makes perfect!',
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }
  }, [isCorrect, isSubmitted]);

  const feedbackMessage = getFeedbackMessage();

  // Render the question content that will be wrapped
  const questionContent = (
    <div
      className={cn(
        'px-4 lg:px-0 lg:container min-h-screen flex flex-col justify-self-center justify-center items-center',
        containerWidth
      )}
    >
      <div className="flex flex-col gap-4 mb-6 relative w-full">
        {/* Feedback banner that slides in from top when submitted */}
        <AnimatePresence>
          {isSubmitted && (
            <FeedbackBanner
              isCorrect={isCorrect || false}
              feedbackMessage={feedbackMessage || ''}
              xpIncrease={xpIncrease}
            />
          )}
        </AnimatePresence>

        {children}

        <div className={cn(hasCodeSnippet ? 'grid grid-cols-1 lg:grid-cols-12 gap-10' : '')}>
          {/* Answer cards that stay visible and transform when submitted */}
          <div className="col-span-full md:col-span-6 flex flex-col gap-4 w-full">
            {answers.map((answerObj, index) => {
              const isCurrentAnswer = selectedAnswerData?.uid === answerObj.uid;
              const isCorrectAnswer = answerObj.uid === correctAnswerUid;

              return (
                <MultipleChoiceCard
                  key={answerObj.uid}
                  index={index}
                  answer={answerObj.answer}
                  handleSelectAnswer={handleSelectAnswer}
                  selectedAnswer={selectedAnswerData?.text}
                  isCorrect={isSubmitted && isCurrentAnswer ? isCorrect : undefined}
                  isSubmitted={isSubmitted}
                  correctAnswer={isSubmitted && isCorrectAnswer ? answerObj.answer : undefined}
                />
              );
            })}
          </div>
          {hasCodeSnippet && (
            <div className="col-span-full md:col-span-6">
              <CodeBlock
                className="h-full"
                files={[{ title: 'index.html', code: question.codeSnippet }]}
              />
            </div>
          )}
        </div>

        {/* After question info that appears after submission */}
        <AnimatePresence>
          {isSubmitted && question.afterQuestionInfo && (
            <motion.div
              className="mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-lg font-medium mb-2">Learn More</h4>
              <div
                className="text-muted-foreground text-sm"
                dangerouslySetInnerHTML={{ __html: question.afterQuestionInfo }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MultipleChoiceFooter
        selectedAnswer={selectedAnswerData?.text}
        onClear={handleClear}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        hasSubmitted={isSubmitted}
        onReset={resetQuestion}
        nextAndPreviousQuestion={navigationData}
        question={question as Question}
        navigating={navigating}
      />
    </div>
  );

  // Wrap with FasterThanAIWrapper if the game mode is active
  return (
    <>
      <FasterThanAIWrapper
        fasterThanAiGameMode={!!fasterThanAiGameMode}
        aiTimeToComplete={question.aiTimeToComplete}
        isSubmitted={isSubmitted}
        wasCorrect={isCorrect === null ? undefined : isCorrect}
      >
        {questionContent}
      </FasterThanAIWrapper>

      {/* Render hint drawer when showHint is true */}
      {question.hint && (
        <HintDrawer hint={question.hint} isOpen={showHint} onClose={() => setShowHint(false)} />
      )}
    </>
  );
}
