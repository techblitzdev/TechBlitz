'use client';

import React from 'react';
import { Editor } from '@monaco-editor/react';
import { Check, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useQuestionSingle } from '../questions/single/layout/question-single-context';
import LoadingSpinner from '@/components/ui/loading';
import { motion, AnimatePresence } from 'framer-motion';
import ResultCard from './result-card';

export default function CodeChallenge(opts: { defaultCode: string }) {
  const { defaultCode } = opts;
  const { setCode, result } = useQuestionSingle();

  return (
    <div className="w-full relative">
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        defaultValue={defaultCode}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 16,
        }}
        loading={<LoadingSpinner />}
      />

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4 min-h-fit absolute bottom-0"
          >
            <Alert variant="default" className="border-2">
              <AlertDescription className="flex items-center gap-2 text-lg font-semibold">
                {result.passed ? (
                  <>
                    <Check className="h-6 w-6" />
                    All tests passed! Great job!
                  </>
                ) : (
                  <>
                    <X className="h-6 w-6" />
                    Some tests failed. Let's review:
                  </>
                )}
              </AlertDescription>
            </Alert>

            {!result.passed && result.details && (
              <div className="space-y-2">
                {result.details.map((detail, index) => (
                  <ResultCard
                    key={`result-${index}`}
                    result={detail}
                    index={index}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
