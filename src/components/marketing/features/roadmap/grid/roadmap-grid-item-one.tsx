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
    correct: false
  },
  { id: 4, text: 'How does prototypal inheritance work?', correct: true },
  { id: 5, text: "What is the purpose of the 'this' keyword?", correct: false },
  { id: 6, text: 'Explain async/await', correct: true },
  { id: 7, text: 'What are Higher Order Components?', correct: false },
  { id: 8, text: 'Describe the Virtual DOM', correct: true },
  {
    id: 9,
    text: 'What is the difference between null and undefined?',
    correct: true
  }
];

export default function RoadmapGridItemOne() {
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
            sampleAnswers[(nextIndex + 2) % sampleAnswers.length]
          ];
        });
        setIsTransitioning(false);
      }, 500); // Wait for exit animations to complete
    }, 3000); // Change answers every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative col-span-full md:col-span-6 pb-0 md:pb-12 pt-4 p-0 md:p-12 flex flex-col gap-10">
      <div className="flex flex-col gap-2.5">
        <h3 className="text-3xl text-gradient from-white to-white/75">
          Analyze your skills
        </h3>
        <p className="text-gray-400">
          First, we need to understand how much you already know. We start by
          getting you to answer a few coding questions to gauge your current
          skill level.
        </p>
      </div>
      <div className="relative overflow-hidden h-full">
        <div
          className="border border-black-50 rounded-lg h-full p-6"
          style={{
            background:
              'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)'
          }}
        >
          <p className="font-onest text-base sm:text-xl md:text-2xl font-semibold leading-none tracking-tight text-white mb-4">
            Your answers
          </p>
          <div className="space-y-3">
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
          </div>
        </div>
        <div className="z-10 absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
        <div className="z-10 absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#000] to-transparent pointer-events-none"></div>
      </div>
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-0 top-0 h-full w-px pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(143, 143, 143, 0.67) 0%, rgba(0, 0, 0, 0) 100%)'
        }}
      ></div>
    </div>
  );
}
