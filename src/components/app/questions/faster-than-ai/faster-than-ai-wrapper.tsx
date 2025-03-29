'use client';

import { useState, useEffect, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import FasterThanAIFeedback from './feedback';
import Countdown from './countdown';

interface FasterThanAIWrapperProps {
  children: ReactNode;
  fasterThanAiGameMode: boolean;
  aiTimeToComplete?: number;
  isSubmitted?: boolean;
  wasCorrect?: boolean;
}

export default function FasterThanAIWrapper({
  children,
  fasterThanAiGameMode,
  aiTimeToComplete,
  isSubmitted = false,
  wasCorrect,
}: FasterThanAIWrapperProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [userTime, setUserTime] = useState<number | null>(null);
  const [startTime] = useState<number>(Date.now());

  // Initialize countdown when component mounts
  useEffect(() => {
    if (fasterThanAiGameMode && aiTimeToComplete && !isSubmitted) {
      setShowCountdown(true);
    }
  }, [fasterThanAiGameMode, aiTimeToComplete, isSubmitted]);

  // When the user submits, calculate their time and show feedback
  useEffect(() => {
    if (isSubmitted && fasterThanAiGameMode && aiTimeToComplete) {
      const timeTaken = (Date.now() - startTime) / 1000;
      setUserTime(timeTaken);
      setShowFeedback(true);
      setShowCountdown(false); // Hide countdown when showing feedback
    }
  }, [isSubmitted, fasterThanAiGameMode, aiTimeToComplete, startTime]);

  return (
    <>
      {children}

      <AnimatePresence>
        {showCountdown && aiTimeToComplete && !isSubmitted && (
          <Countdown
            aiTime={aiTimeToComplete}
            isVisible={showCountdown}
            isSubmitted={isSubmitted}
            wasCorrect={wasCorrect}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFeedback && userTime !== null && aiTimeToComplete && wasCorrect !== undefined && (
          <FasterThanAIFeedback
            aiTime={aiTimeToComplete}
            userTime={userTime}
            wasCorrect={wasCorrect}
          />
        )}
      </AnimatePresence>
    </>
  );
}
