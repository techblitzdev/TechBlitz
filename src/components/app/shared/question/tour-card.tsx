'use client';
import React from 'react';
import type { CardComponentProps } from 'onborda';
import { useOnborda } from 'onborda';

// Shadcn
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Icons
import { X } from 'lucide-react';

// Confetti
import confetti from 'canvas-confetti';

export const TourCard: React.FC<CardComponentProps> = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}) => {
  // Onborda hooks
  const { closeOnborda } = useOnborda();

  function handleConfetti() {
    closeOnborda();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <Card className="relative min-w-[300px] w-max max-w-full z-[999] bg-black border border-black-50">
      <Button
        variant="ghost"
        className="text-white absolute top-2 right-2 hover:text-white/50"
        size="icon"
        onClick={() => closeOnborda()}
      >
        <X size={16} />
      </Button>
      <CardHeader>
        <div className="flex items-start justify-between w-full space-x-4 relative">
          <div className="flex flex-col space-y-2">
            <CardDescription className="text-white">
              {currentStep + 1} of {totalSteps}
            </CardDescription>
            <CardTitle className="mb-2 text-lg text-white font-onest font-semibold">
              {step.icon} {step.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-white">{step.content}</CardContent>
      <CardFooter className="text-white">
        <div className="flex justify-between w-full gap-4">
          <Button
            variant="ghost"
            padding="none"
            onClick={() => closeOnborda()}
            className="text-white hover:text-white/50"
          >
            Skip tour
          </Button>
          <div className="flex gap-4 ml-auto">
            {currentStep !== 0 && (
              <Button
                onClick={() => prevStep()}
                className="bg-black-75 hover:bg-black-50 text-white hover:text-white"
              >
                Previous
              </Button>
            )}
            {currentStep + 1 !== totalSteps && (
              <Button
                onClick={() => nextStep()}
                className="bg-black-75 hover:bg-black-50 text-white hover:text-white"
              >
                Next
              </Button>
            )}
            {currentStep + 1 === totalSteps && (
              <Button variant="default" onClick={handleConfetti}>
                Dive in!
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
      <span className="text-black">{arrow}</span>
    </Card>
  );
};
