'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { updateUser } from '@/actions/user/authed/update-user';
import { createCouponOnSignup } from '@/actions/user/account/create-coupon';
import { sendWelcomeEmail } from '@/actions/misc/send-welcome-email';
import { useLocalStorage } from './use-local-storage';

// Toggle for admin to skip initial questions
const ADMIN_SKIP_INITIAL_QUESTIONS = false;

export const STEPS = {
  USER_DETAILS: 'USER_DETAILS', // get the users info
  INITIAL_QUESTIONS: 'INITIAL_QUESTIONS', // give the user 3 very simple multiple choice questions to gauge skill level and give them quick wins!
  TIME_COMMITMENT: 'TIME_COMMITMENT', // get the users daily coding goal
  NOTIFICATIONS: 'NOTIFICATIONS', // offer push notifications
  FIRST_QUESTION_SELECTION: 'FIRST_QUESTION_SELECTION', // get the users first question (either send them to the first question or the tag selection)
} as const;

type StepKey = keyof typeof STEPS;
type StepValue = (typeof STEPS)[StepKey];

export function useOnboardingSteps() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    serverUser,
    user,
    canContinue,
    setCanContinue,
    timeSpendingPerDay,
    firstQuestionSelection,
    totalXp,
  } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStepState] = useState<StepKey>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1).replace(/-/g, '_').toUpperCase();
      return Object.values(STEPS).includes(hash as StepValue) ? (hash as StepKey) : 'USER_DETAILS';
    }
    return 'USER_DETAILS';
  });

  // Update URL hash when step changes
  useEffect(() => {
    const hashValue = currentStep.toLowerCase().replace(/_/g, '-');
    window.location.hash = hashValue;
  }, [currentStep]);

  const stepConfig = {
    // gather user details
    [STEPS.USER_DETAILS]: {
      next: STEPS.INITIAL_QUESTIONS,
      component: 'OnboardingUserDetails',
    },
    [STEPS.INITIAL_QUESTIONS]: {
      next: STEPS.TIME_COMMITMENT,
      component: 'OnboardingInitialQuestions',
    },
    // get the user to choose a daily amount of time to spend on coding
    [STEPS.TIME_COMMITMENT]: {
      next: STEPS.NOTIFICATIONS,
      component: 'OnboardingTimeCommitment',
    },
    [STEPS.NOTIFICATIONS]: {
      next: STEPS.FIRST_QUESTION_SELECTION,
      component: 'OnboardingNotifications',
    },
    [STEPS.FIRST_QUESTION_SELECTION]: {
      next: 'ROADMAP_PAGE',
      component: 'OnboardingFirstQuestionSelection',
    },
  } as const;

  const handleSkip = () => {
    const nextStep = stepConfig[currentStep]?.next;
    if (nextStep === 'ROADMAP_PAGE') {
      localStorage.removeItem('onboarding');
      window.location.hash = '';
      router.push('/roadmaps?onboarding=true');
    } else {
      setCurrentStepState(nextStep as StepKey);
    }
  };

  const handleContinue = async () => {
    if (!user || !canContinue) return;

    setIsLoading(true);
    try {
      // Handle first question selection routing
      if (
        currentStep === STEPS.FIRST_QUESTION_SELECTION &&
        firstQuestionSelection === 'startFromScratch'
      ) {
        // Navigate to roadmap instead of QUESTIONS step
        localStorage.removeItem('onboarding');
        router.push('/roadmaps?onboarding=true');
        return;
      }

      // Handle time commitment step
      if (currentStep === STEPS.TIME_COMMITMENT) {
        await updateUser({ userDetails: { ...user, timeSpendingPerDay } });
        setCurrentStepState(stepConfig[STEPS.TIME_COMMITMENT].next as StepKey);
        return;
      }

      // Handle user details step
      if (currentStep === STEPS.USER_DETAILS) {
        await updateUser({ userDetails: user });

        // Create coupon and send welcome email if needed
        if (!user.hasCreatedCustomSignupCoupon) {
          const coupon = await createCouponOnSignup();

          // Check if welcome email has already been sent
          const storageKey = serverUser?.email
            ? `welcome-email-sent_${serverUser.email}`
            : 'welcome-email-sent';
          const { value: welcomeEmailSent, setValue: setWelcomeEmailSent } = useLocalStorage({
            defaultValue: false,
            key: storageKey,
          });

          if (!welcomeEmailSent) {
            await sendWelcomeEmail(serverUser, coupon?.name ?? '');
            setWelcomeEmailSent(true);
          }
        }

        // Admin users can skip initial questions if feature flag is enabled
        if (ADMIN_SKIP_INITIAL_QUESTIONS && serverUser?.userLevel === 'ADMIN') {
          console.log('Admin user detected - skipping initial questions');
          setCurrentStepState(STEPS.TIME_COMMITMENT);
        } else {
          setCurrentStepState(stepConfig[STEPS.USER_DETAILS].next as StepKey);
        }
        return;
      }

      // Handle initial questions step
      if (currentStep === STEPS.INITIAL_QUESTIONS) {
        const userXpValue = typeof totalXp === 'number' && !isNaN(totalXp) ? totalXp : 0;

        try {
          await updateUser({
            userDetails: {
              ...user,
              userXp: userXpValue,
            },
          });
          console.log(`Successfully updated user with XP: ${userXpValue}`);
        } catch (error) {
          console.error('Error updating user XP:', error);
        }

        setCurrentStepState(stepConfig[STEPS.INITIAL_QUESTIONS].next as StepKey);
        return;
      }

      // Handle all other steps
      await updateUser({ userDetails: user });
      const nextStep = stepConfig[currentStep]?.next;

      if (nextStep === 'ROADMAP_PAGE') {
        localStorage.removeItem('onboarding');
        router.push('/roadmaps?onboarding=true');
      } else {
        setCurrentStepState(nextStep as StepKey);
      }
    } catch (error) {
      console.error('Error during continue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    // if we're on the first step, we shouldn't go back
    if (currentStep === STEPS.USER_DETAILS) {
      return;
    }

    // Get the previous step
    const previousStep = Object.entries(stepConfig).find(
      ([, config]) => config.next === currentStep
    )?.[0];

    if (previousStep) {
      // If navigating back to USER_DETAILS, ensure the continue button is enabled
      if (previousStep === STEPS.USER_DETAILS) {
        setCanContinue(true);
      }

      setCurrentStepState(previousStep as StepKey);
    }
  };

  const showSkipButton = () => {
    const refInUrl = searchParams.get('ref') !== null;
    const isStepOne = currentStep === STEPS.USER_DETAILS;
    const hasUsername = (user?.username?.length ?? 0) > 0;

    // Never show skip button on the first page (USER_DETAILS) regardless of other conditions
    if (isStepOne) {
      return false;
    }

    // For other steps, show the skip button if there's a ref in the URL or the user has a username
    return refInUrl || hasUsername;
  };

  // Function to determine if back button should be shown
  const showBackButton = () => {
    // Don't show back button on the first step (USER_DETAILS)
    if (currentStep === STEPS.USER_DETAILS) {
      return false;
    }

    // Show back button on all other steps
    return true;
  };

  return {
    currentStep,
    isLoading,
    handleSkip,
    handleContinue,
    handleBack,
    showSkipButton,
    showBackButton,
    stepConfig,
  };
}
