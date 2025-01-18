'use client';

import React from 'react';
import { Editor } from '@monaco-editor/react';
import { Check, X, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useQuestionSingle } from '../questions/single/layout/question-single-context';
import LoadingSpinner from '@/components/ui/loading';
import { motion, AnimatePresence } from 'framer-motion';

export default function CodeChallenge(opts: { defaultCode: string }) {
  const { defaultCode } = opts;
  const { setCode, result } = useQuestionSingle();

  return (
    <div className="w-full border-none p-0">
      <div className="">
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
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4 min-h-fit"
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Alert
                      variant={detail.passed ? 'default' : 'default'}
                      className={`border-l-4 ${
                        detail.passed
                          ? 'border-l-green-500'
                          : 'border-l-red-500'
                      }`}
                    >
                      <AlertDescription>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center">
                            <ChevronRight className="h-4 w-4 mr-2" />
                            <span className="font-medium">
                              Test Case {index + 1}
                            </span>
                          </div>
                          <div className="ml-6 space-y-1 text-sm">
                            <p>Input: ({detail.input.join(', ')})</p>
                            <p>Expected: {detail.expected}</p>
                            <p>Received: {detail.received}</p>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
