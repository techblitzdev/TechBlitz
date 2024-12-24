import { getSuggestions } from '@/actions/questions/get-suggestions';
import { useUserServer } from '@/hooks/useUserServer';
import { redirect } from 'next/navigation';
import QuestionSuggestedCard from '@/components/questions/suggested-questions-table';

export default async function SuggestedQuestions() {
  const user = await useUserServer();
  if (!user) {
    redirect('/login');
  }

  const suggestions = await getSuggestions({ userUid: user.uid });

  return (
    <section className="col-span-full lg:col-span-6 border border-black-50 rounded-lg flex flex-col divide-y-[1px] divide-black-50 overflow-hidden">
      <div className="flex flex-col gap-2.5 px-3 py-4">
        <h2 className="text-2xl font-onest">Suggested Questions</h2>
        <p className="text-xs text-gray-400">
          Based on your answer history, here are some questions we think will
          help you improve.
        </p>
      </div>
      <QuestionSuggestedCard
        questions={suggestions ?? []}
        isLoading={false}
        border={false}
      />
    </section>
  );
}
