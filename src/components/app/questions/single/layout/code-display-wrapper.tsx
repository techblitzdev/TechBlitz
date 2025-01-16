'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeDisplay from './code-snippet';
import { useQuestionSingle } from './question-single-context';

export default function CodeDisplayWrapper() {
  const { prefilledCodeSnippet, user, question } = useQuestionSingle();

  const [codeSnippet, setCodeSnippet] = useState<string | null>(
    question?.codeSnippet
  );

  // update the prefilled code snippet to the answer
  useEffect(() => {
    if (prefilledCodeSnippet) {
      setCodeSnippet(prefilledCodeSnippet);
    } else {
      setCodeSnippet(question?.codeSnippet);
    }
  }, [prefilledCodeSnippet, question?.codeSnippet]);

  return (
    <div className="h-full overflow-y-auto pb-4 scrollable-element">
      <AnimatePresence mode="wait">
        {codeSnippet && (
          <motion.div
            key={codeSnippet}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full pb-5"
          >
            <CodeDisplay
              content={codeSnippet}
              user={user}
              backgroundColor="#111111"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
