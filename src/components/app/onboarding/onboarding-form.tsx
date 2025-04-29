'use client';

import { motion } from 'framer-motion';

// components
import { Card } from '@/components/ui/card';
import OnboardingUserDetails from './onboarding-user-details';
import OnboardingTimeCommitment from './onboarding-time-commitment';
import OnboardingFooter from './onboarding-footer';
import OnboardingNotifications from './onboarding-notifications';
import OnboardingInitialQuestions from './onboarding-initial-questions';

// contexts
import { useOnboardingContext } from '@/contexts/onboarding-context';

// utils
import { cn } from '@/lib/utils';

// hooks
import { useOnboardingSteps, STEPS } from '@/hooks/use-onboarding-steps';
import OnboardingFirstQuestionSelection from './onboarding-first-question-selection';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const stepComponents = {
  [STEPS.USER_DETAILS]: OnboardingUserDetails,
  [STEPS.INITIAL_QUESTIONS]: OnboardingInitialQuestions,
  [STEPS.TIME_COMMITMENT]: OnboardingTimeCommitment,
  [STEPS.NOTIFICATIONS]: OnboardingNotifications,
  [STEPS.FIRST_QUESTION_SELECTION]: OnboardingFirstQuestionSelection,
};

export default function OnboardingForm() {
  const { itemVariants } = useOnboardingContext();
  const {
    currentStep,
    isLoading,
    handleSkip,
    handleContinue,
    handleBack,
    showSkipButton,
    showBackButton,
  } = useOnboardingSteps();

  const StepComponent = stepComponents[currentStep];

  return (
    <div className="container flex items-center justify-center p-4 flex-1">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <Card
          className={cn(
            'rounded-lg shadow-xl overflow-hidden min-w-fit relative',
            currentStep === STEPS.TIME_COMMITMENT && 'lg:min-w-[58rem]',
            currentStep === STEPS.INITIAL_QUESTIONS ? 'border-none' : 'border border-black-50'
          )}
          style={{
            background:
              currentStep === STEPS.INITIAL_QUESTIONS ||
              currentStep === STEPS.FIRST_QUESTION_SELECTION
                ? 'none'
                : 'radial-gradient(128% 107% at 0% 0%, #212121 0%, rgb(0,0,0) 77.61%)',
          }}
        >
          <StepComponent />
          <motion.div variants={itemVariants}>
            <OnboardingFooter
              currentStep={currentStep}
              isLoading={isLoading}
              showSkipButton={showSkipButton()}
              showBackButton={showBackButton()}
              onSkip={handleSkip}
              onContinue={handleContinue}
              onBack={handleBack}
            />
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
