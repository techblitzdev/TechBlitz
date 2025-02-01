'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardFooter } from '@/components/ui/card';
import OnboardingUserDetails from './onboarding-user-details';
import OnboardingTags from './onboarding-tags';
import OnboardingQuestions from './onboarding-questions';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useOnboardingContext } from './onboarding-context';
import { updateUser } from '@/actions/user/authed/update-user';
import { cn } from '@/lib/utils';
import OnboardingPricing from './onboarding-pricing';
import OnboardingShare from './onboarding-share';

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

export default function OnboardingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    user,
    currentStep,
    setCurrentStep,
    handleGetOnboardingQuestions,
    itemVariants,
    canContinue,
  } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);

  // skip goes to the next step
  const handleSkip = () => {
    if (currentStep === 'stepOne') {
      setCurrentStep('stepTwo');
    } else if (currentStep === 'stepTwo') {
      setCurrentStep('stepThree');
    } else if (currentStep === 'stepThree') {
      setCurrentStep('stepFour');
    } else if (currentStep === 'stepFour') {
      localStorage.removeItem('onboarding');
      router.push('/dashboard?onboarding=true');
    }
  };

  const handleContinue = async () => {
    if (!user) return;

    if (!canContinue) return;

    setIsLoading(true);

    await updateUser({ userDetails: user });
    if (currentStep === 'stepOne') {
      setCurrentStep('stepTwo');
      setIsLoading(false);
    } else if (currentStep === 'stepTwo') {
      setCurrentStep('stepThree');
      setIsLoading(false);
    } else if (currentStep === 'stepThree') {
      setCurrentStep('stepFour');
      setIsLoading(false);
    } else if (currentStep === 'stepFour') {
      await handleGetOnboardingQuestions();
      setCurrentStep('stepFive');
      setIsLoading(false);
    } else if (currentStep === 'stepFive') {
      localStorage.removeItem('onboarding');
      router.push('/dashboard?onboarding=true');
    }
  };

  const handleBack = () => {
    if (currentStep === 'stepTwo') {
      setCurrentStep('stepOne');
    } else if (currentStep === 'stepThree') {
      setCurrentStep('stepTwo');
    }
  };

  const showSkipButton = () => {
    const refInUrl = searchParams.get('ref') !== null;
    const isStepOne = currentStep === 'stepOne';
    const hasUsername = (user?.username?.length ?? 0) > 0;

    return refInUrl || (!isStepOne && hasUsername) || (isStepOne && refInUrl && hasUsername);
  };

  return (
    <div className="container min-h-screen flex items-center justify-center p-4">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <Card
          className={cn(
            'rounded-lg shadow-xl overflow-hidden min-w-72 sm:min-w-96 lg:min-w-[30rem] relative',
            (currentStep === 'stepTwo' || currentStep === 'stepThree') && 'lg:min-w-[50rem]',
            currentStep === 'stepTwo' ? 'border-none' : 'border border-black-50'
          )}
          style={{
            background:
              currentStep === 'stepTwo'
                ? 'none'
                : 'radial-gradient(128% 107% at 0% 0%, #212121 0%, rgb(0,0,0) 77.61%)',
          }}
        >
          {currentStep === 'stepOne' && <OnboardingUserDetails />}
          {currentStep === 'stepTwo' && <OnboardingPricing />}
          {currentStep === 'stepThree' && <OnboardingShare />}
          {currentStep === 'stepFour' && <OnboardingTags />}
          {currentStep === 'stepFive' && <OnboardingQuestions />}
          <motion.div variants={itemVariants}>
            <CardFooter
              className={cn(
                'flex flex-wrap items-center gap-3 lg:justify-between',
                currentStep === 'stepOne' && 'lg:justify-end'
              )}
            >
              <AnimatePresence>
                {(currentStep === 'stepTwo' ||
                  currentStep === 'stepThree' ||
                  currentStep === 'stepFour') && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleBack}
                      disabled={isLoading}
                    >
                      <ArrowLeft className="mr-2 size-4" />
                      Back
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex items-center gap-3">
                <AnimatePresence>
                  {!isLoading && showSkipButton() && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Button type="button" variant="default" onClick={handleSkip}>
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
                    onClick={() => handleContinue()}
                    disabled={
                      isLoading ||
                      (currentStep === 'stepOne' && (user?.username?.length ?? 0) < 2) ||
                      !canContinue
                    }
                  >
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        {currentStep === 'stepFive' ? 'Go to dashboard' : 'Continue'}
                        <ArrowRight className="ml-2 size-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </CardFooter>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
