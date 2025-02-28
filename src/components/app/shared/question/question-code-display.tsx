'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Editor } from '@monaco-editor/react';
import { capitalize } from 'lodash';
import type { z } from 'zod';
import type { answerHelpSchema } from '@/lib/zod/schemas/ai/answer-help';
import type { Question } from '@/types/Questions';
import type { RoadmapUserQuestions } from '@/types/Roadmap';
import type { UserRecord } from '@/types/User';
import CodeDisplay from '@/components/app/questions/single/layout/code-snippet';
import LoadingSpinner from '@/components/ui/loading';
import { DefaultRoadmapQuestions } from '@prisma/client';
import TestCaseSection from '../../questions/code-editor/test-case-section';

type QuestionCodeDisplayProps = {
  user: UserRecord | null;
  answerHelp?: z.infer<typeof answerHelpSchema> | null;
  question: Question | RoadmapUserQuestions | DefaultRoadmapQuestions;
  prefilledCodeSnippet?: string | null;
  isEditable?: boolean;
  onCodeChange?: (code: string) => void;
  currentLayout?: 'question' | 'answer';
};

export default function QuestionCodeDisplay({
  user,
  answerHelp,
  question,
  prefilledCodeSnippet,
  isEditable = false,
  onCodeChange,
  currentLayout = 'question',
}: QuestionCodeDisplayProps) {
  const [codeSnippet, setCodeSnippet] = useState<string | null>(
    prefilledCodeSnippet || question?.codeSnippet || ''
  );

  useEffect(() => {
    if (prefilledCodeSnippet) {
      setCodeSnippet(prefilledCodeSnippet);
    } else {
      setCodeSnippet(question?.codeSnippet || '');
    }
  }, [prefilledCodeSnippet, question?.codeSnippet]);

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCodeSnippet(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  if (answerHelp) {
    return (
      <AnimatePresence mode="wait" key={JSON.stringify(answerHelp)}>
        <div className="flex flex-col gap-y-4 p-4">
          <h2 className="text-lg font-bold">Answer Help</h2>
          {Object.entries(answerHelp).map(([key, value], index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h3 className="text-md font-bold underline">{capitalize(key.replace(/-/g, ' '))}</h3>
              <p className="text-gray-200">{value.replace(/```/g, '')}</p>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    );
  }

  if (currentLayout === 'answer') {
    return (
      <div className="w-full relative">
        <TestCaseSection />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto scrollable-element">
      <AnimatePresence mode="wait">
        {codeSnippet && (
          <motion.div
            key={codeSnippet}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {isEditable ? (
              <Editor
                height="83vh"
                defaultLanguage="javascript"
                value={codeSnippet}
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  guides: {
                    indentation: true,
                    bracketPairs: true,
                    bracketPairsHorizontal: true,
                    highlightActiveBracketPair: true,
                    highlightActiveIndentation: true,
                  },
                }}
                className="bg-black-50 overflow-y-auto! !scrollable-element"
                loading={<LoadingSpinner />}
              />
            ) : (
              <CodeDisplay content={codeSnippet} user={user} backgroundColor="#111111" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
