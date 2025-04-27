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
    serverUser,
    user,
    handleGetOnboardingQuestions,
    canContinue,
    timeSpendingPerDay,
    firstQuestionSelection,
    FIRST_QUESTION_TUTORIAL_SLUG,
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
        // remove onboarding data
        localStorage.removeItem('onboarding');
        // then redirect
        router.push(`/question/${FIRST_QUESTION_TUTORIAL_SLUG}?tutorial=true`);
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
      } else if (currentStep === STEPS.USER_DETAILS) {
        await updateUser({ userDetails: user });

        // if this is false, we need to create a coupon and send the welcome email
        if (!user.hasCreatedCustomSignupCoupon) {
          const coupon = await createCouponOnSignup();

          // Check if welcome email has already been sent using localStorage
          // Use a generic key if serverUser doesn't have email
          const storageKey = serverUser?.email
            ? `welcome-email-sent_${serverUser.email}`
            : 'welcome-email-sent';
          const { value: welcomeEmailSent, setValue: setWelcomeEmailSent } = useLocalStorage({
            defaultValue: false,
            key: storageKey,
          });

          // Only send welcome email if it hasn't been sent before
          if (!welcomeEmailSent) {
            // send the welcome email
            await sendWelcomeEmail(serverUser, coupon?.name ?? '');
            // Mark that welcome email has been sent for this user
            setWelcomeEmailSent(true);
          }
        }

        // If user is an admin and the feature toggle is enabled, skip the INITIAL_QUESTIONS step
        if (ADMIN_SKIP_INITIAL_QUESTIONS && serverUser?.userLevel === 'ADMIN') {
          console.log('Admin user detected - skipping initial questions');
          // Skip to the TIME_COMMITMENT step (which is after INITIAL_QUESTIONS)
          setCurrentStepState(STEPS.TIME_COMMITMENT);
        } else {
          // Regular user follows normal flow
          setCurrentStepState(stepConfig[STEPS.USER_DETAILS].next as StepKey);
        }
      } else if (currentStep === STEPS.INITIAL_QUESTIONS) {
        // Fix the userXp field by ensuring it's a numeric value
        // Make sure to use the existing user object and only update the userXp field
        const userXpValue = typeof totalXp === 'number' && !isNaN(totalXp) ? totalXp : 0;

        try {
          await updateUser({
            userDetails: {
              ...user,
              userXp: userXpValue,
            },
          });
          console.log(`Successfully updated user with XP: ${userXpValue}`);
          setCurrentStepState(stepConfig[STEPS.INITIAL_QUESTIONS].next as StepKey);
        } catch (error) {
          console.error('Error updating user XP:', error);
          // We'll still proceed to the next step even if the XP update fails
          setCurrentStepState(stepConfig[STEPS.INITIAL_QUESTIONS].next as StepKey);
        }
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
