'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardFooter } from '@/components/ui/card';
import OnboardingStepOne from './onboarding-step-one';
import OnboardingStepTwo from './onboarding-step-two';
import OnboardingStepThree from './onboarding-step-three';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useOnboardingContext } from './onboarding-context';
import { updateUser } from '@/actions/user/authed/update-user';
import { cn } from '@/utils/cn';

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function OnboardingForm() {
  const router = useRouter();
  const {
    user,
    currentStep,
    setCurrentStep,
    selectedTags,
    handleGetOnboardingQuestions,
  } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSkip = () => {
    setIsLoading(true);
    localStorage.removeItem('onboarding');
    router.push('/dashboard?onboarding=true');
  };

  const handleContinue = async () => {
    setIsLoading(true);

    await updateUser({ userDetails: user });

    if (currentStep === 'stepOne') {
      setCurrentStep('stepTwo');
      setIsLoading(false);
    } else if (currentStep === 'stepTwo') {
      await handleGetOnboardingQuestions();
      setCurrentStep('stepThree');
      setIsLoading(false);
    } else {
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

  return (
    <div className="container min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card
          className={cn(
            'border border-black-50 rounded-lg shadow-xl overflow-hidden min-w-72 sm:min-w-96 lg:min-w-[30rem] relative',
            (currentStep === 'stepTwo' || currentStep === 'stepThree') &&
              'lg:min-w-[50rem]'
          )}
          style={{
            background:
              'radial-gradient(128% 107% at 0% 0%, #212121 0%, rgb(0,0,0) 77.61%)',
          }}
        >
          {currentStep === 'stepOne' && <OnboardingStepOne />}
          {currentStep === 'stepTwo' && <OnboardingStepTwo />}
          {currentStep === 'stepThree' && <OnboardingStepThree />}
          <motion.div variants={itemVariants}>
            <CardFooter
              className={cn(
                'flex flex-wrap items-center gap-3 lg:justify-between',
                currentStep === 'stepOne' && 'lg:justify-end'
              )}
            >
              <AnimatePresence>
                {(currentStep === 'stepTwo' || currentStep === 'stepThree') && (
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
                  {!isLoading && currentStep !== 'stepThree' && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Button
                        type="button"
                        variant="default"
                        onClick={handleSkip}
                        disabled={!user?.username?.length}
                      >
                        Skip
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    variant="accent"
                    className="text-xs sm:text-sm font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
                    onClick={() => handleContinue()}
                    disabled={
                      isLoading ||
                      (currentStep === 'stepTwo' && selectedTags.length === 0)
                    }
                  >
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        {currentStep === 'stepThree'
                          ? 'Go to dashboard'
                          : 'Continue'}
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
