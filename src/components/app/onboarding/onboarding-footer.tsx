import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { ArrowLeft } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { STEPS } from '@/hooks/use-onboarding-steps';
import { useOnboardingContext } from '@/contexts/onboarding-context';

interface OnboardingFooterProps {
  currentStep: keyof typeof STEPS;
  isLoading: boolean;
  showSkipButton: boolean;
  showBackButton: boolean;
  onSkip: () => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function OnboardingFooter({
  currentStep,
  isLoading,
  showSkipButton,
  showBackButton,
  onSkip,
  onContinue,
  onBack,
}: OnboardingFooterProps) {
  const { user, canContinue } = useOnboardingContext();

  // Steps where skip button should be hidden
  const hideSkipButton = ['FIRST_QUESTION_SELECTION', 'INITIAL_QUESTIONS', 'USER_DETAILS'].includes(
    currentStep
  );

  // Conditions to disable continue button
  const disableContinue =
    isLoading ||
    !canContinue ||
    (currentStep === STEPS.USER_DETAILS && (!user?.username || !user?.howDidYouHearAboutTechBlitz));

  return (
    <CardFooter
      className={cn(
        'flex flex-wrap items-center gap-3 lg:justify-between',
        currentStep === STEPS.USER_DETAILS && 'lg:justify-end'
      )}
    >
      <AnimatePresence>
        {showBackButton && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Button type="button" variant="secondary" onClick={onBack} disabled={isLoading}>
              <ArrowLeft className="mr-2 size-4" />
              Back
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-x-3">
        {showSkipButton && !hideSkipButton && (
          <Button type="button" variant="ghost" onClick={onSkip} disabled={isLoading}>
            Skip
          </Button>
        )}
        <Button variant="accent" type="button" onClick={onContinue} disabled={disableContinue}>
          Continue
          {isLoading && <LoadingSpinner className="ml-2 size-4" />}
        </Button>
        {process.env.NODE_ENV === 'development' && (
          <div className="text-white text-xs">DEBUG: {currentStep}</div>
        )}
      </div>
    </CardFooter>
  );
}
