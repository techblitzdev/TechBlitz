import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { STEPS } from '@/hooks/use-onboarding-steps';

interface OnboardingFooterProps {
  currentStep: keyof typeof STEPS;
  isLoading: boolean;
  showSkipButton: boolean;
  onSkip: () => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function OnboardingFooter({
  currentStep,
  isLoading,
  showSkipButton,
  onSkip,
  onContinue,
  onBack,
}: OnboardingFooterProps) {
  return (
    <CardFooter
      className={cn(
        'flex flex-wrap items-center gap-3 lg:justify-between',
        currentStep === STEPS.USER_DETAILS && 'lg:justify-end'
      )}
    >
      <AnimatePresence>
        {(currentStep === STEPS.PRICING ||
          currentStep === STEPS.QUESTIONS ||
          currentStep === STEPS.TIME_COMMITMENT ||
          currentStep === STEPS.TAGS ||
          currentStep === STEPS.NOTIFICATIONS) && (
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
      <div className="flex items-center gap-3">
        <AnimatePresence>
          {!isLoading && showSkipButton && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Button type="button" variant="default" onClick={onSkip}>
                Skip
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="button"
            variant="accent"
            className="text-xs sm:text-sm font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
            onClick={onContinue}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {currentStep === STEPS.QUESTIONS ? 'Go to dashboard' : 'Continue'}
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </CardFooter>
  );
}
