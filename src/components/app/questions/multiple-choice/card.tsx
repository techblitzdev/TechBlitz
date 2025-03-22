'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface MultipleChoiceCardProps {
  index: number;
  handleSelectAnswer: (option: string, index: number) => void;
  answer: string;
  selectedAnswer?: string;
  className?: string;
  isCorrect?: boolean | null;
  isSubmitted?: boolean;
  correctAnswer?: string;
  animate?: boolean;
}

export default function MultipleChoiceCard({
  index,
  handleSelectAnswer,
  answer,
  selectedAnswer,
  className,
  isCorrect,
  isSubmitted = false,
  correctAnswer,
  animate = true,
}: MultipleChoiceCardProps) {
  const isSelected = selectedAnswer === answer;

  // Determine border color based on selection and correctness
  const getBorderClass = () => {
    if (!isSubmitted) {
      return isSelected ? 'border-accent' : '';
    }

    if (isSelected) {
      return isCorrect ? 'border-green-500' : 'border-red-500';
    }

    if (correctAnswer === answer && isCorrect === false) {
      return 'border-green-500';
    }

    return '';
  };

  const CardComponent = animate ? motion.div : 'div';

  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: index * 0.1 + 0.3 },
        whileTap: { scale: 0.98 },
      }
    : {};

  return (
    <CardComponent key={index} {...animationProps} className={cn('w-full', className)}>
      <Button
        onClick={() => handleSelectAnswer(answer, index)}
        className={`justify-start w-full py-6 px-3 rounded-lg text-left flex items-center bg-transparent border border-black-50 ${getBorderClass()}`}
        variant="default"
        disabled={isSubmitted}
      >
        <span className="mr-2 text-sm opacity-70 border border-black-50 rounded-md px-2 py-1">
          {index + 1}
        </span>
        <span className="flex-1">{answer}</span>

        {isSubmitted && isSelected && isCorrect && (
          <CheckCircle className="ml-2 text-green-500" size={20} />
        )}

        {isSubmitted && isSelected && isCorrect === false && (
          <XCircle className="ml-2 text-red-500" size={20} />
        )}

        {isSubmitted && !isSelected && correctAnswer === answer && isCorrect === false && (
          <CheckCircle className="ml-2 text-green-500" size={20} />
        )}
      </Button>
    </CardComponent>
  );
}
