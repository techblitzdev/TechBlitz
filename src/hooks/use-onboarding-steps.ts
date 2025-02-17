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
  FIRST_QUESTION_SELECTION: 'FIRST_QUESTION_SELECTION', // get the users first question (either send them to the first question or the tag selection)
} as const;

type StepKey = keyof typeof STEPS;
type StepValue = (typeof STEPS)[StepKey];

export function useOnboardingSteps() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    user,
    handleGetOnboardingQuestions,
    canContinue,
    timeSpendingPerDay,
    firstQuestionSelection,
    FIRST_QUESTION_TUTORIAL_SLUG,
  } = useOnboardingContext();
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
      next: STEPS.FIRST_QUESTION_SELECTION,
      component: 'OnboardingNotifications',
    },
    [STEPS.FIRST_QUESTION_SELECTION]: {
      next: STEPS.TAGS,
      component: 'OnboardingFirstQuestionSelection',
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
      // if the user wants to start from scratch, the next page needs to be the pricing page, not the tags page
      if (
        currentStep === STEPS.FIRST_QUESTION_SELECTION &&
        firstQuestionSelection === 'startFromScratch'
      ) {
        setCurrentStepState(STEPS.PRICING);
        return;
      }

      // if we are on the last step and the user chose to start from scratch,
      // redirect them to the first question
      if (currentStep === STEPS.PRICING && firstQuestionSelection === 'startFromScratch') {
        router.push(`/question/${FIRST_QUESTION_TUTORIAL_SLUG}?tutorial=true`);
        // remove the onboarding data from local storage
        localStorage.removeItem('onboarding');
        return;
      } else if (
        currentStep === STEPS.PRICING &&
        firstQuestionSelection === 'personalizeLearning'
      ) {
        await handleGetOnboardingQuestions();
        // remove the onboarding data from local storage
        localStorage.removeItem('onboarding');
        setCurrentStepState(STEPS.QUESTIONS);
        return;
      }

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
          setCurrentStepState(STEPS.PRICING);
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
    // if the user is on the pricing page, they need to go back to the tags page only if they did not
    // start from scratch
    if (currentStep === STEPS.PRICING && firstQuestionSelection !== 'startFromScratch') {
      setCurrentStepState(STEPS.TAGS);
      return;
    }

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
