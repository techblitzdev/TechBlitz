'use client';

import { useState, useEffect, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import FasterThanAIAnimation from './animation';
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
  const [showAnimation, setShowAnimation] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Only show the animation on the initial mount if fasterThanAiGameMode is true
  useEffect(() => {
    if (fasterThanAiGameMode && !initialized) {
      setShowAnimation(true);
      setInitialized(true);
    }
  }, [fasterThanAiGameMode, initialized]);

  // Handle when the animation completes
  const handleAnimationComplete = () => {
    setShowAnimation(false);

    // Show the countdown timer after the animation completes
    if (fasterThanAiGameMode && aiTimeToComplete) {
      setShowCountdown(true);
    }
  };

  return (
    <>
      {showAnimation && aiTimeToComplete && (
        <FasterThanAIAnimation aiTime={aiTimeToComplete} onComplete={handleAnimationComplete} />
      )}

      <AnimatePresence>
        {showCountdown && aiTimeToComplete && (
          <Countdown
            aiTime={aiTimeToComplete}
            isVisible={showCountdown}
            isSubmitted={isSubmitted}
            wasCorrect={wasCorrect}
          />
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
