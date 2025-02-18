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
      <CardHeader>
        <div className="flex items-start justify-between w-full space-x-4">
          <div className="flex flex-col space-y-2">
            <CardDescription className="text-white">
              {currentStep + 1} of {totalSteps}
            </CardDescription>
            <CardTitle className="mb-2 text-lg text-white font-onest font-semibold">
              {step.icon} {step.title}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            className="text-black/50 absolute top-4 right-2 hover:bg-transparent hover:text-black/80"
            size="icon"
            onClick={() => closeOnborda()}
          >
            <X size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-white">{step.content}</CardContent>
      <CardFooter className="text-white">
        <div className="flex justify-between w-full gap-4">
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
              className="bg-black-75 hover:bg-black-50 text-white hover:text-white ml-auto"
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
      </CardFooter>
      <span className="text-black">{arrow}</span>
    </Card>
  );
};
