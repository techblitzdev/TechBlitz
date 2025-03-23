import { XCircle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SolarFlameBoldDuotone } from '@/components/ui/current-streak';

interface FeedbackBannerProps {
  isCorrect: boolean;
  feedbackMessage: string;
  xpIncrease: number;
}

export default function FeedbackBanner({
  isCorrect,
  feedbackMessage,
  xpIncrease,
}: FeedbackBannerProps) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`w-full px-4 py-2 lg:p-4 lg:py-4 rounded-lg mb-4 flex items-center justify-between ${
        isCorrect ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
      }`}
    >
      <div className="flex items-center">
        {isCorrect ? (
          <CheckCircle2 className="mr-2" size={20} />
        ) : (
          <XCircle className="mr-2" size={20} />
        )}
        <span className="font-medium font-onest">{feedbackMessage}</span>
      </div>

      {/* Show XP earned inside the feedback banner */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 15,
          delay: 0.2,
        }}
        className="flex items-center text-white px-3 py-1.5 rounded-full font-medium shadow-sm"
      >
        <SolarFlameBoldDuotone className="size-6" hasActiveStreak={true} />
        <span className="font-onest">+{xpIncrease}xp</span>
      </motion.div>
    </motion.div>
  );
}
