import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface MultipleChoiceFooterProps {
  selectedAnswer?: string;
  onClear: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export default function MultipleChoiceFooter({
  selectedAnswer,
  onClear,
  onSubmit,
  isSubmitting = false,
}: MultipleChoiceFooterProps) {
  const isClearDisabled = !selectedAnswer || isSubmitting;

  return (
    <section className="flex items-center justify-between w-full">
      <Button variant="destructive" onClick={onClear} disabled={isClearDisabled}>
        Clear
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
