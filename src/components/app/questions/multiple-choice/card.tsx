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
  const isCorrectAnswer = correctAnswer === answer;

  // Determine background color and border based on selection and correctness
  const getCardStyles = () => {
    const baseClasses =
      'min-h-fit justify-start w-full p-3 rounded-lg text-left flex items-center border transition-all duration-300 text-wrap';

    if (!isSubmitted) {
      return `${baseClasses} bg-transparent border-black-50 ${isSelected ? 'border-accent' : ''}`;
    }

    if (isSelected) {
      if (isCorrect) {
        return `${baseClasses} bg-green-500/20 border-green-500 text-green-500`;
      }
      return `${baseClasses} bg-red-500/20 border-red-500 text-white`;
    }

    if (isCorrectAnswer) {
      return `${baseClasses} bg-green-500/20 border-green-500 text-green-500`;
    }

    return `${baseClasses} bg-transparent border-black-50 opacity-70`;
  };

  // Define the animation variants based on submission state and correctness
  const getAnimationVariants = () => {
    if (!isSubmitted) {
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: index * 0.1 + 0.3 },
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
      };
    }

    if (isSelected && isCorrect) {
      // Bounce effect for correct answer
      return {
        animate: {
          scale: [1, 1.05, 1],
          borderColor: ['#22c55e', '#22c55e', '#22c55e'],
          transition: {
            duration: 0.6,
            times: [0, 0.5, 1],
            ease: 'easeInOut',
          },
        },
      };
    }

    if (isSelected && !isCorrect) {
      // Shake effect for incorrect answer
      return {
        animate: {
          x: [0, -10, 10, -10, 10, 0],
          borderColor: ['#ef4444', '#ef4444', '#ef4444'],
          transition: {
            duration: 0.5,
            ease: 'easeInOut',
          },
        },
      };
    }

    if (isCorrectAnswer && !isSelected) {
      // Highlight effect for the correct answer when user selected wrong
      return {
        animate: {
          scale: [1, 1.05, 1],
          borderColor: ['#22c55e', '#22c55e', '#22c55e'],
          transition: {
            duration: 0.6,
            delay: 0.3,
            times: [0, 0.5, 1],
            ease: 'easeInOut',
          },
        },
      };
    }

    // Dim other options
    return {
      animate: {
        opacity: 0.6,
        scale: 0.98,
        transition: { duration: 0.3 },
      },
    };
  };

  const CardComponent = animate ? motion.div : 'div';
  const animationProps = animate ? getAnimationVariants() : {};

  return (
    <CardComponent key={index} {...animationProps} className={cn('w-full', className)}>
      <Button
        onClick={() => handleSelectAnswer(answer, index)}
        className={getCardStyles()}
        variant="default"
        disabled={isSubmitted}
      >
        <span
          className={`mr-2 text-sm border rounded-md px-2 py-1 ${
            isSubmitted && (isSelected || isCorrectAnswer)
              ? isCorrect || isCorrectAnswer
                ? 'border-green-500 bg-green-500/20'
                : 'border-red-500 bg-red-500/20'
              : 'border-black-50 opacity-70'
          }`}
        >
          {index + 1}
        </span>
        <span>{answer}</span>

        {isSubmitted && isSelected && isCorrect && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.2 }}
          >
            <CheckCircle className="ml-2 text-green-500" size={20} />
          </motion.div>
        )}

        {isSubmitted && isSelected && isCorrect === false && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.2 }}
          >
            <XCircle className="ml-2 text-red-500" size={20} />
          </motion.div>
        )}

        {isSubmitted && !isSelected && correctAnswer === answer && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.4 }}
          >
            <CheckCircle className="ml-2 text-green-500" size={20} />
          </motion.div>
        )}
      </Button>
    </CardComponent>
  );
}
