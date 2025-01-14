'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

const sampleAnswers = [
  { id: 1, text: 'What is a closure?', correct: true },
  { id: 2, text: 'Explain the event loop', correct: true },
  {
    id: 3,
    text: 'What is the difference between let and var?',
    correct: false,
  },
  { id: 4, text: 'How does prototypal inheritance work?', correct: true },
  { id: 5, text: "What is the purpose of the 'this' keyword?", correct: false },
  { id: 6, text: 'Explain async/await', correct: true },
  { id: 7, text: 'What are Higher Order Components?', correct: false },
  { id: 8, text: 'Describe the Virtual DOM', correct: true },
  {
    id: 9,
    text: 'What is the difference between null and undefined?',
    correct: true,
  },
];

export default function RoadmapGridItemOneAnimation() {
  const [currentAnswers, setCurrentAnswers] = useState(
    sampleAnswers.slice(0, 3)
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentAnswers((prev) => {
          const nextIndex =
            (sampleAnswers.findIndex((a) => a.id === prev[0].id) + 1) %
            sampleAnswers.length;
          return [
            sampleAnswers[nextIndex],
            sampleAnswers[(nextIndex + 1) % sampleAnswers.length],
            sampleAnswers[(nextIndex + 2) % sampleAnswers.length],
          ];
        });
        setIsTransitioning(false);
      }, 500); // Wait for exit animations to complete
    }, 3000); // Change answers every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isTransitioning && (
        <motion.div
          key={currentAnswers[0].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentAnswers.map((answer, index) => (
            <motion.div
              key={answer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-2 mb-2"
            >
              {answer.correct ? (
                <Check className="size-4 text-green-400" />
              ) : (
                <X className="size-4 text-red-400" />
              )}
              <p className="text-white text-sm sm:text-base font-onest">
                {answer.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
