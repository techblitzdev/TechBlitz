'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { updateUser } from '@/actions/user/authed/update-user';

export const STEPS = {
  USER_DETAILS: 'USER_DETAILS', // get the users info
  TIME_COMMITMENT: 'TIME_COMMITMENT', // get the users daily coding goal
  NOTIFICATIONS: 'NOTIFICATIONS', // offer push notifications
  TAGS: 'TAGS', // get the users interests
  PRICING: 'PRICING', // get the users pricing plan
  QUESTIONS: 'QUESTIONS', // get the users questions
} as const;

type StepKey = keyof typeof STEPS;
type StepValue = (typeof STEPS)[StepKey];

export function useOnboardingSteps() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, handleGetOnboardingQuestions, canContinue, timeSpendingPerDay } =
    useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStepState] = useState<StepKey>(() => {
    // Initialize from URL hash if available, otherwise default to USER_DETAILS
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1).toUpperCase();
      return Object.values(STEPS).includes(hash as StepValue) ? (hash as StepKey) : 'USER_DETAILS';
    }
    return 'USER_DETAILS';
  });

  // Update URL hash when step changes
  useEffect(() => {
    window.location.hash = currentStep.toLowerCase();
  }, [currentStep]);

  const stepConfig = {
    // gather user details
    [STEPS.USER_DETAILS]: {
      next: STEPS.TIME_COMMITMENT,
      component: 'OnboardingUserDetails',
    },
    // get the user to choose a daily amount of time to spend on coding
    [STEPS.TIME_COMMITMENT]: {
      next: STEPS.NOTIFICATIONS,
      component: 'OnboardingTimeCommitment',
    },
    [STEPS.NOTIFICATIONS]: {
      next: STEPS.TAGS,
      component: 'OnboardingNotifications',
    },
    [STEPS.TAGS]: {
      next: STEPS.PRICING,
      component: 'OnboardingTags',
    },
    [STEPS.PRICING]: {
      next: STEPS.QUESTIONS,
      component: 'OnboardingPricing',
    },
    [STEPS.QUESTIONS]: {
      next: 'DASHBOARD',
      component: 'OnboardingQuestions',
    },
  } as const;

  const handleSkip = () => {
    const nextStep = stepConfig[currentStep].next;
    if (nextStep === 'DASHBOARD') {
      localStorage.removeItem('onboarding');
      window.location.hash = '';
      router.push('/dashboard?onboarding=true');
    }
    // if the user is skipping past the tags, redirect to the dashboard
    else if (nextStep === STEPS.TAGS) {
      localStorage.removeItem('onboarding');
      router.push('/dashboard?onboarding=true');
    } else {
      setCurrentStepState(nextStep as StepKey);
    }
  };

  const handleContinue = async () => {
    if (!user || !canContinue) return;

    setIsLoading(true);
    try {
      if (currentStep === STEPS.TIME_COMMITMENT) {
        await updateUser({ userDetails: { ...user, timeSpendingPerDay } });
        setCurrentStepState(stepConfig[STEPS.TIME_COMMITMENT].next as StepKey);
      } else {
        await updateUser({ userDetails: user });
        const nextStep = stepConfig[currentStep].next;

        if (nextStep === 'DASHBOARD') {
          localStorage.removeItem('onboarding');
          router.push('/dashboard?onboarding=true');
        } else if (nextStep === STEPS.PRICING) {
          setCurrentStepState(nextStep as StepKey);
        } else if (nextStep === STEPS.TAGS) {
          await handleGetOnboardingQuestions();
          setCurrentStepState(nextStep as StepKey);
        } else {
          setCurrentStepState(nextStep as StepKey);
        }
      }
    } catch (error) {
      console.error('Error during continue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    const previousStep = Object.entries(stepConfig).find(
      ([, config]) => config.next === currentStep
    )?.[0];
    if (previousStep) {
      setCurrentStepState(previousStep as StepKey);
    }
  };

  const showSkipButton = () => {
    const refInUrl = searchParams.get('ref') !== null;
    const isStepOne = currentStep === STEPS.USER_DETAILS;
    const hasUsername = (user?.username?.length ?? 0) > 0;

    return refInUrl || (!isStepOne && hasUsername) || (isStepOne && refInUrl && hasUsername);
  };

  return {
    currentStep,
    isLoading,
    handleSkip,
    handleContinue,
    handleBack,
    showSkipButton,
    stepConfig,
  };
}
