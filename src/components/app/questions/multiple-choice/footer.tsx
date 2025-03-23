import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

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

  // Determine the navigation href
  const navigationHref = hasSubmitted
    ? nextAndPreviousQuestion?.nextQuestion
      ? `/question/${nextAndPreviousQuestion.nextQuestion}`
      : '/questions'
    : '';

  // Render the submit/next button based on the submission state
  let submitButton;

  if (hasSubmitted) {
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
