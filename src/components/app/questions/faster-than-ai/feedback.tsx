'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Zap, Clock } from 'lucide-react';
import ChatBot from '@/components/ui/icons/chat-bot';

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
    if (didBeatAI) return 'You Beat ChatGPT!';
    return 'ChatGPT Was Faster';
  };

  const getMessage = () => {
    if (!wasCorrect) {
      return 'Focus on getting it right next time!';
    }
    if (didBeatAI) {
      return `You answered ${timeDiff} seconds faster than ChatGPT!`;
    }
    return `ChatGPT solved this ${timeDiff} seconds faster than you.`;
  };

  return (
    <motion.div
      className="fixed top-4 right-4 bg-background border border-border rounded-md p-4 shadow-lg z-50 max-w-xs"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        {getIcon()}

        <div>
          <h3 className="font-semibold text-base mb-1">{getTitle()}</h3>
          <p className="text-sm text-muted-foreground mb-2">{getMessage()}</p>

          <div className="flex justify-between text-xs mt-3 pt-2 border-t border-border">
            <div className="flex items-center gap-1.5">
              <ChatBot className="size-3.5" />
              <span>{aiTime.toFixed(1)}s</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>{userTime.toFixed(1)}s</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
