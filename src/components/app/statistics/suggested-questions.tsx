import QuestionSuggestedCard from '@/components/app/questions/suggested-questions-table'

export default function SuggestedQuestions() {
  return (
    <section className="col-span-full lg:col-span-6 border border-black-50 rounded-lg flex flex-col divide-y-[1px] divide-black-50 overflow-hidden">
      <div className="flex flex-col gap-2.5 px-3 py-4">
        <h2 className="text-2xl font-onest">Suggested Questions</h2>
        <p className="text-sm text-gray-400">
          Based on your answer history, here are some questions we think will
          help you improve.
        </p>
      </div>
      <QuestionSuggestedCard border={false} />
    </section>
  )
}
