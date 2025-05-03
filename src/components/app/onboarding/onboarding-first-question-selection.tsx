import { CardHeader } from '@/components/ui/card';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { motion } from 'framer-motion';
import InfiniteScrollingRoadmapCards from '@/components/shared/infinite-scrolling-roadmap-cards';

export default function OnboardingFirstQuestionSelection() {
  const { itemVariants } = useOnboardingContext();

  return (
    <CardHeader className="flex flex-col gap-y-4 max-w-xl relative">
      <div className="flex flex-col gap-y-3 mb-3">
        <motion.h1
          className="text-2xl flex flex-col font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Let's begin!
        </motion.h1>

        <motion.p className="text-sm text-gray-500" variants={itemVariants}>
          We're so excited to have you here! Your future in tech is bright, and we're here to help
          you get there.
        </motion.p>

        <InfiniteScrollingRoadmapCards className="md:h-64 xl:h-[20rem]" />
      </div>
    </CardHeader>
  );
}
