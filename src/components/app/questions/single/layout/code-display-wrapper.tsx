'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeDisplay from './code-snippet';
import { useQuestionSingle } from '../../../../../contexts/question-single-context';
import { capitalize } from 'lodash';

export default function CodeDisplayWrapper() {
  const { prefilledCodeSnippet, user, question, answerHelp } = useQuestionSingle();

  const [codeSnippet, setCodeSnippet] = useState<string | null>(question?.codeSnippet);

  // update the prefilled code snippet to the answer
  useEffect(() => {
    if (prefilledCodeSnippet) {
      setCodeSnippet(prefilledCodeSnippet);
    } else {
      setCodeSnippet(question?.codeSnippet);
    }
  }, [prefilledCodeSnippet, question?.codeSnippet]);

  // if the user has asked for assistance for the answer, show them plain text
  if (answerHelp) {
    return (
      <AnimatePresence mode="wait">
        <div className="flex flex-col gap-y-4 p-4">
          <h2 className="text-lg font-bold">Answer Help</h2>
          {Object.entries(answerHelp).map(([key, value], index) => (
            <div key={index}>
              <h3 className="text-md font-bold underline">{capitalize(key.replace(/-/g, ' '))}</h3>
              <p className="text-gray-200">{value.replace(/```/g, '')}</p>
            </div>
          ))}
        </div>
      </AnimatePresence>
    );
  }

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
            <CodeDisplay content={codeSnippet} user={user} backgroundColor="#111111" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
