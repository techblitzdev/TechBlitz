'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface MultipleChoiceCardProps {
  index: number;
  handleSelectAnswer: (option: string, index: number) => void;
  answer: string;
  selectedAnswer?: string;
}

export default function MultipleChoiceCard({
  index,
  handleSelectAnswer,
  answer,
  selectedAnswer,
}: MultipleChoiceCardProps) {
  const isSelected = selectedAnswer === answer;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={() => handleSelectAnswer(answer, index)}
        className={`justify-start w-full py-6 px-3 rounded-lg text-left flex items-center bg-transparent border border-black-50 ${
          isSelected ? 'border-accent' : ''
        }`}
        variant="default"
      >
        <span className="mr-2 text-sm opacity-70 border border-black-50 rounded-md px-2 py-1">
          {index + 1}
        </span>
        <span className="flex-1">{answer}</span>
      </Button>
    </motion.div>
  );
}
