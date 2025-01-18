import CodeEditor from '@/components/app/code-editor/editor';

export default function CodeEditorPage() {
  return (
    <div className="flex items-center justify-center">
      <CodeEditor
        height="50vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
    </div>
  );
}
