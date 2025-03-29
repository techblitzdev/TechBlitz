'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Zap, Clock } from 'lucide-react';
import ChatBot from '@/components/ui/icons/chat-bot';
import { Separator } from '@/components/ui/separator';

interface FasterThanAIFeedbackProps {
  aiTime: number;
  userTime: number;
  wasCorrect: boolean;
}

export default function FasterThanAIFeedback({
  aiTime,
  userTime,
  wasCorrect,
}: FasterThanAIFeedbackProps) {
  // Determine if user beat AI (only if they got the answer correct)
  const didBeatAI = wasCorrect && userTime < aiTime;

  // Calculate time difference
  const timeDiff = Math.abs(aiTime - userTime).toFixed(1);

  // Get appropriate styles and messages based on result
  const getIcon = () => {
    if (!wasCorrect) return <XCircle className="size-5 text-red-500" />;
    if (didBeatAI) return <Zap className="size-5 text-green-500" />;
    return <Clock className="size-5 text-yellow-500" />;
  };

  const getTitle = () => {
    if (!wasCorrect) return 'Incorrect Answer';
    if (didBeatAI) return 'You Beat AI!';
    return 'AI Was Faster';
  };

  const getMessage = () => {
    if (!wasCorrect) {
      return 'Focus on getting it right next time!';
    }
    if (didBeatAI) {
      return `You answered ${timeDiff} seconds faster than AI!`;
    }
    return `AI solved this ${timeDiff} seconds faster than you. But not to worry, you can always try again!`;
  };

  return (
    <motion.div
      className="absolute top-4 right-4 bg-background border border-black-50 rounded-md shadow-lg z-50 max-w-xs"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className="px-4 pt-4">
          <h3 className="font-semibold text-base mb-1">{getTitle()}</h3>
          <p className="text-sm text-muted-foreground mb-2">{getMessage()}</p>
        </div>

        <Separator className="my-2 bg-black-50" />

        <div className="flex justify-between text-xs pt-2 px-4 pb-4">
          <div className="flex items-center gap-1">
            <ChatBot className="size-3.5" />
            <span>{aiTime.toFixed(1)}s</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3.5" />
            <span>{userTime.toFixed(1)}s</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
