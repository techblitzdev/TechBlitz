'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarsIcon } from 'lucide-react';

export default function AnimatedAIQuestionHelpCard() {
  const [showAIHelp, setShowAIHelp] = useState(false);
  const [typedPlaceholder, setTypedPlaceholder] = useState('');

  const placeholder = 'How do I use Array.Reduce in JavaScript?';

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 50;

    const typeWriter = () => {
      if (currentIndex < placeholder.length) {
        setTypedPlaceholder(placeholder.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, typingSpeed);
      }
    };

    typeWriter();

    const interval = setInterval(() => {
      typeWriter();
      currentIndex = 0;
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      className="w-full max-w-md h-full overflow-hidden text-white border border-black-50 relative"
      style={{
        background: 'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <StarsIcon className="size-4 text-yellow-400 fill-yellow-500" />
          AI Coding Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="h-3/4 relative">
        <AnimatePresence mode="wait">
          {showAIHelp ? (
            <motion.div
              key="ai-help"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-y-2"
            >
              <motion.div
                className="bg-black-100 border border-black-50 p-3 rounded-md text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                In JavaScript, you can use the `Array.reduce` method to reduce an array to a single
                value. This method takes a callback function as an argument and returns a single
                value. The callback function takes four arguments: the accumulator, the current
                value, the current index, and the array itself. The accumulator is the value that is
                returned from the previous callback function. The current value is the current
                element in the array. The current index is the index of the current element in the
                array. The array is the array itself.
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="question-form"
              className="flex flex-col gap-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Textarea
                name="userContent"
                placeholder={typedPlaceholder}
                className="mb-4 text-white border border-black-50"
                rows={5}
              />
              <Button onClick={() => setShowAIHelp(true)} variant="secondary" className="w-full">
                Request AI Assistance
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
