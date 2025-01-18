'use client';

import React from 'react';
import { Editor } from '@monaco-editor/react';
import LoadingSpinner from '@/components/ui/loading';
import { useQuestionSingle } from '../questions/single/layout/question-single-context';
import TestCaseDisplay from './test-case-display';

export default function CodeEditor(opts: { defaultCode: string }) {
  const { defaultCode } = opts;
  const { setCode, currentLayout } = useQuestionSingle();

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
