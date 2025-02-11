import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { motion } from 'framer-motion';

export default function OnboardingNotifications() {
  const { itemVariants } = useOnboardingContext();

  return (
    <>
      <CardHeader>
        <div className="flex flex-col gap-y-2 mb-3">
          <motion.h1
            className="text-2xl flex flex-col font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-center"
            variants={itemVariants}
          >
            Enable push notifications
          </motion.h1>
          <motion.p className="text-sm text-gray-500" variants={itemVariants}>
            Don't worry, we won't spam you. Just your daily dose of coding to keep you motivated.
          </motion.p>
        </div>
        <motion.div variants={itemVariants} className="flex flex-col gap-y-4">
          <Button variant="outline" className="w-full"></Button>
        </motion.div>
      </CardHeader>
    </>
  );
}
