'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { OnboardingStepOne } from './onboarding-step-one';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useOnboardingContext } from './onboarding-context';
import { updateUser } from '@/actions/user/authed/update-user';

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
  const { user } = useOnboardingContext();
  const currentStep = 'stepOne';
  const [isLoading, setIsLoading] = useState(false);

  const handleSkip = () => {
    setIsLoading(true);
    localStorage.removeItem('onboarding');
    router.push('/dashboard');
  };

  const handleContinue = async () => {
    setIsLoading(true);

    // update the user data in the db
    await updateUser({ userDetails: user });

    localStorage.removeItem('onboarding');
    router.push('/dashboard?onboarding=true');
  };

  return (
    <div className="container min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card
          className="border border-black-50 rounded-lg shadow-xl overflow-hidden w-72 sm:w-96 lg:w-[30rem]"
          style={{
            background:
              'radial-gradient(128% 107% at 0% 0%, #212121 0%, rgb(0,0,0) 77.61%)',
          }}
        >
          <CardHeader className="space-y-1">
            <motion.h1
              className="text-3xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Welcome!
            </motion.h1>
            <CardDescription className="text-gray-400">
              <motion.span variants={itemVariants}>
                Let's get started by setting up your account.
              </motion.span>
            </CardDescription>
          </CardHeader>
          {currentStep === 'stepOne' && <OnboardingStepOne />}
          <motion.div variants={itemVariants}>
            <CardFooter className="flex items-center gap-3 justify-end">
              <AnimatePresence>
                {!isLoading && currentStep === 'stepOne' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Button
                      type="button"
                      variant="secondary"
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      {currentStep === 'stepOne' ? 'Continue' : 'Finish'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
