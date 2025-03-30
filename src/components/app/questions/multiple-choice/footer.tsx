import { Button } from '@/components/ui/button';
import { useQuestionSingle } from '@/contexts/question-single-context';
import { Question } from '@/types/Questions';
import { Lightbulb, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define navigation interface to match the data from getNextAndPreviousQuestion
interface NavigationData {
  previousQuestion: string | null | undefined;
  nextQuestion: string | null | undefined;
}

interface MultipleChoiceFooterProps {
  question: Question;
  selectedAnswer?: string;
  onClear: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  hasSubmitted?: boolean;
  onReset: () => void;
  nextAndPreviousQuestion: NavigationData;
}

export default function MultipleChoiceFooter({
  selectedAnswer,
  onClear,
  onSubmit,
  isSubmitting = false,
  hasSubmitted = false,
  onReset,
  nextAndPreviousQuestion,
  question,
}: MultipleChoiceFooterProps) {
  const { user, showHint, setShowHint } = useQuestionSingle();
  const searchParams = useSearchParams();

  // Check if the question is part of a study path
  const type = searchParams?.get('type');
  const studyPathSlug = searchParams?.get('study-path');
  const isStudyPath = type === 'study-path' && studyPathSlug;

  const isClearDisabled = !selectedAnswer || isSubmitting;

  const handleClear = () => {
    if (hasSubmitted) {
      onReset();
    } else {
      onClear();
    }
  };

  // Toggle hint display
  const toggleHint = () => {
    setShowHint(!showHint);
  };

  // if submitted, the submit button will be 'next question'
  const submitButtonText = hasSubmitted ? 'Next Question' : 'Submit';

  // Determine the navigation href with study path params if necessary
  const navigationHref = hasSubmitted
    ? nextAndPreviousQuestion?.nextQuestion
      ? `/question/${nextAndPreviousQuestion.nextQuestion}${
          isStudyPath ? `?type=${type}&study-path=${studyPathSlug}` : ''
        }`
      : isStudyPath
      ? `/study-paths/${studyPathSlug}`
      : '/questions'
    : '';

  // Render the submit/next button based on the submission state
  let submitButton;

  if (!user) {
    // If no user, link to login page
    submitButton = (
      <Link href="/login">
        <Button variant="accent">Sign in to submit</Button>
      </Link>
    );
  } else if (hasSubmitted) {
    // Don't use asChild with conditional rendering in a Link
    submitButton = (
      <Link href={navigationHref}>
        <Button variant="accent">{submitButtonText}</Button>
      </Link>
    );
  } else {
    submitButton = (
      <Button variant="accent" onClick={onSubmit} disabled={!selectedAnswer || isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          submitButtonText
        )}
      </Button>
    );
  }

  // Animation variants for the pulsing hint button
  const pulseAnimation = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9],
      boxShadow: [
        '0 0 0 0 rgba(255, 255, 255, 0.2)',
        '0 0 0 6px rgba(255, 255, 255, 0.1)',
        '0 0 0 0 rgba(255, 255, 255, 0.2)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop' as const,
      },
    },
  };

  return (
    <section className="flex items-center justify-between w-full lg:pt-5">
      <Button variant="destructive" onClick={handleClear} disabled={isClearDisabled}>
        {hasSubmitted ? 'Try Again' : 'Clear'}
      </Button>
      <div className="flex items-center gap-x-2">
        {question.hint && (
          <AnimatePresence>
            <motion.div variants={pulseAnimation} initial={false}>
              <Button
                variant={showHint ? 'secondary' : 'default'}
                size="icon"
                onClick={toggleHint}
                aria-label={showHint ? 'Hide hint' : 'Show hint'}
                title={showHint ? 'Hide hint' : 'Show hint'}
              >
                <Lightbulb className={`w-4 h-4`} />
              </Button>
            </motion.div>
          </AnimatePresence>
        )}
        {submitButton}
      </div>
    </section>
  );
}
