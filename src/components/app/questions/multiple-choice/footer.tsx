import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface MultipleChoiceFooterProps {
  selectedAnswer?: string;
  onClear: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  hasSubmitted?: boolean;
  onReset: () => void;
}

export default function MultipleChoiceFooter({
  selectedAnswer,
  onClear,
  onSubmit,
  isSubmitting = false,
  hasSubmitted = false,
  onReset,
}: MultipleChoiceFooterProps) {
  const isClearDisabled = !selectedAnswer || isSubmitting;

  const handleClear = () => {
    if (hasSubmitted) {
      onReset();
    } else {
      onClear();
    }
  };

  return (
    <section className="flex items-center justify-between w-full pt-5">
      <Button variant="destructive" onClick={handleClear} disabled={isClearDisabled}>
        {hasSubmitted ? 'Try Again' : 'Clear'}
      </Button>
      <Button variant="accent" onClick={onSubmit} disabled={!selectedAnswer || isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </section>
  );
}
