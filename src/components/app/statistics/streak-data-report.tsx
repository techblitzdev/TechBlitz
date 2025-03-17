import StreakCalendar from '../streaks/streak-calendar';

export default async function StreakDataReport() {
  return (
    <section className="col-span-full lg:col-span-6 border border-black-50 rounded-lg flex flex-col divide-y-[1px] divide-black-50 overflow-hidden">
      <div className="flex flex-col gap-2.5 px-3 py-4">
        <h2 className="text-2xl font-onest">Streak Data</h2>
        <p className="text-sm text-gray-400">
          Your streak data is a measure of how many days in a row you have answered questions.
        </p>
        <div className="w-fit h-fit flex flex-col gap-y-2.5">
          <StreakCalendar />
        </div>
      </div>
    </section>
  );
}
