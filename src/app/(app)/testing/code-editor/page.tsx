import CodeEditor from '@/components/app/questions/code-editor/editor';
import { useUserServer } from '@/hooks/use-user-server';
import { redirect } from 'next/navigation';

export default async function CodeEditorPage() {
  const user = await useUserServer();

  // sneaky 😉
  if (user?.userLevel !== 'ADMIN') {
    return redirect('/dashboard');
  }

  return (
    <div className="flex items-center justify-center">
      <CodeEditor />
    </div>
  );
}
