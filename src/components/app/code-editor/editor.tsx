'use client';

import React from 'react';
import { Editor } from '@monaco-editor/react';
import LoadingSpinner from '@/components/ui/loading';
import { useQuestionSingle } from '../questions/single/layout/question-single-context';
import TestCaseDisplay from './test-case-display';
import { capitalize } from 'lodash';
import { AnimatePresence } from 'framer-motion';

export default function CodeEditor(opts: { defaultCode: string }) {
  const { defaultCode } = opts;
  const { setCode, currentLayout, answerHelp } = useQuestionSingle();

  if (answerHelp) {
    return (
      <AnimatePresence mode="wait">
        <div className="flex flex-col gap-y-4 p-4">
          <h2 className="text-lg font-bold">Answer Help</h2>
          {Object.entries(answerHelp).map(([key, value], index) => (
            <div key={index}>
              <h3 className="text-md font-bold underline">
                {capitalize(key.replace(/-/g, ' '))}
              </h3>
              <p className="text-gray-200">{value.replace(/```/g, '')}</p>
            </div>
          ))}
        </div>
      </AnimatePresence>
    );
  }

  if (currentLayout === 'answer') {
    return (
      <div className="w-full relative">
        <TestCaseDisplay />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        defaultValue={defaultCode}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
        language="javascript"
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 16,
        }}
        loading={<LoadingSpinner />}
      />
    </div>
  );
}
