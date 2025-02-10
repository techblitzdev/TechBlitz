'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { updateUser } from '@/actions/user/authed/update-user';

export const STEPS = {
  USER_DETAILS: 'USER_DETAILS',
  PRICING: 'PRICING',
  SHARE: 'SHARE',
  TAGS: 'TAGS',
  QUESTIONS: 'QUESTIONS',
} as const;

type StepKey = keyof typeof STEPS;
type StepValue = (typeof STEPS)[StepKey];

export function useOnboardingSteps() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setCurrentStep, handleGetOnboardingQuestions, canContinue } =
    useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStepState] = useState<StepKey>('USER_DETAILS');

  const stepConfig = {
    [STEPS.USER_DETAILS]: {
      next: STEPS.PRICING,
      component: 'OnboardingUserDetails',
    },
    [STEPS.PRICING]: {
      next: STEPS.SHARE,
      component: 'OnboardingPricing',
    },
    [STEPS.SHARE]: {
      next: STEPS.TAGS,
      component: 'OnboardingShare',
    },
    [STEPS.TAGS]: {
      next: STEPS.QUESTIONS,
      component: 'OnboardingTags',
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
      router.push('/dashboard?onboarding=true');
    }
    // if the user is skipping past the tags, redirect to the dashboard
    else if (nextStep === 'QUESTIONS') {
      localStorage.removeItem('onboarding');
      router.push('/dashboard?onboarding=true');
    } else {
      setCurrentStepState(nextStep as StepKey);
    }
  };

  const handleContinue = async () => {
    if (!user || !canContinue) return;

    setIsLoading(true);
    await updateUser({ userDetails: user });

    const nextStep = stepConfig[currentStep].next;
    if (nextStep === 'DASHBOARD') {
      localStorage.removeItem('onboarding');
      router.push('/dashboard?onboarding=true');
    } else {
      if (currentStep === STEPS.TAGS) {
        await handleGetOnboardingQuestions();
      }
      setCurrentStepState(nextStep as StepKey);
    }
    setIsLoading(false);
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
