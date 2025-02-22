'use client';

import React, { useState, memo } from 'react';
import { Editor } from '@monaco-editor/react';
import LoadingSpinner from '@/components/ui/loading';
import { useQuestionSingle } from '@/contexts/question-single-context';
import { capitalize } from 'lodash';
import { AnimatePresence } from 'framer-motion';
import { useMonaco } from '@monaco-editor/react';
import { CODING_FACTS } from '@/utils/constants';

// memo the LoadingState component to prevent re-renders
const LoadingState = memo(function LoadingState() {
  // Use useState instead of useMemo to persist the random fact between re-renders
  const [randomFact] = useState(
    () => CODING_FACTS[Math.floor(Math.random() * CODING_FACTS.length)]
  );

  return (
    <div className="w-full relative flex flex-col items-center justify-center max-w-xl px-10">
      <LoadingSpinner />
      {/** a random coding fact */}
      <div className="flex flex-col items-center justify-center">
        <h6 className="text-gray-200 text-center">Did you know?</h6>
        <p className="text-gray-200 text-center">{randomFact}</p>
      </div>
    </div>
  );
});

export default function CodeEditor() {
  const { code, setCode, answerHelp, user, question } = useQuestionSingle();

  const userCanAccess = question.isPremiumQuestion ? user?.userLevel !== 'FREE' : true;

  const monaco = useMonaco();

  monaco?.editor.defineTheme('vs-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    encodedTokensColors: [],
    colors: {
      'editor.background': '#0e0e0e',
    },
  });

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
    <div className="w-full relative">
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        value={userCanAccess ? code : ''}
        onChange={(value) => setCode(value || '')}
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
        loading={<LoadingState />}
      />
    </div>
  );
}
