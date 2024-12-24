export default function SuggestedQuestions() {
  return (
    <section
      className="col-span-full md:col-span-6 border border-black-50 rounded-lg p-4"
      style={{
        background:
          'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
      }}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-onest">Suggested Questions</h2>
        <p className="text-sm text-gray-400">
          Here are some questions that we think you might find interesting.
        </p>
      </div>
    </section>
  );
}
