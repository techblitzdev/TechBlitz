'use client';

import React, { useState, memo, useEffect } from 'react';
import { Editor, useMonaco } from '@monaco-editor/react';
import LoadingSpinner from '@/components/ui/loading';
import { useQuestionSingle } from '@/contexts/question-single-context';
import { capitalize } from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { CODING_FACTS } from '@/utils/constants';
import { useLocalStorage } from '@/hooks/use-local-storage';

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
  const [parsedAnswerHelp, setParsedAnswerHelp] = useState<Record<string, any>>({});
  const { value: savedLocalStorageCode, setValue: setSavedLocalStorageCode } = useLocalStorage({
    key: question.slug ? `challenge-${question.slug}` : '',
    defaultValue: '',
  });

  const monaco = useMonaco();
  const userCanAccess = question.isPremiumQuestion ? user?.userLevel !== 'FREE' : true;

  // if the user has code in local storage, set it on init
  useEffect(() => {
    if (savedLocalStorageCode) {
      setCode(savedLocalStorageCode);
    }
  }, [savedLocalStorageCode, setCode]);

  // Parse answer help when available
  useEffect(() => {
    if (!answerHelp) return;

    try {
      const parsed = JSON.parse(answerHelp);
      setParsedAnswerHelp(parsed);
    } catch (error) {
      console.error('Failed to parse answer help:', error);
      setParsedAnswerHelp({ error: 'Failed to parse answer help' });
    }
  }, [answerHelp]);

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
          {Object.entries(parsedAnswerHelp).map(([key, value], idx) => (
            <motion.div
              key={idx}
              className="mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {Object.keys(parsedAnswerHelp).length > 1 && (
                <h3 className="text-xs font-bold">{capitalize(key.replace(/-/g, ' '))}</h3>
              )}
              {typeof value === 'string' ? (
                <p>{value.replace(/```/g, '')}</p>
              ) : (
                <pre className="text-xs overflow-x-auto">{JSON.stringify(value, null, 2)}</pre>
              )}
            </motion.div>
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
        onChange={(value) => {
          // update the code in the editor
          setCode(value || '');
          // update the code in local storage
          setSavedLocalStorageCode(value || '');
        }}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
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
