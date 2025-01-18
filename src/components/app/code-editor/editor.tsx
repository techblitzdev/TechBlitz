'use client';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

interface CodeEditorProps {
  height: string;
  defaultLanguage: string;
  defaultValue: string;
}

export default function CodeEditor({
  height,
  defaultLanguage,
  defaultValue,
}: CodeEditorProps) {
  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log('onValidate:', marker.message));
  }

  return (
    <Editor
      height={height}
      defaultLanguage={defaultLanguage}
      defaultValue={defaultValue}
      theme="vs-dark"
      onValidate={handleEditorValidation}
    />
  );
}
