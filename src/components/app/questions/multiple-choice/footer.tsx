import { Button } from '@/components/ui/button';
import { useQuestionSingle } from '@/contexts/question-single-context';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Define navigation interface to match the data from getNextAndPreviousQuestion
interface NavigationData {
  previousQuestion: string | null | undefined;
  nextQuestion: string | null | undefined;
}

interface MultipleChoiceFooterProps {
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
}: MultipleChoiceFooterProps) {
  const { user } = useQuestionSingle();
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

  return (
    <section className="flex items-center justify-between w-full lg:pt-5">
      <Button variant="destructive" onClick={handleClear} disabled={isClearDisabled}>
        {hasSubmitted ? 'Try Again' : 'Clear'}
      </Button>
      {submitButton}
    </section>
  );
}
