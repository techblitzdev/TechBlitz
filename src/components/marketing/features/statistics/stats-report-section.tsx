import QuestionChart from '@/components/app/statistics/total-question-chart';
import SkewedQuestionCards from './skewed-question-cards';
import { generateFakeData } from '@/utils';

/**
 * 1. Showing off the customised questions
 * 2. Showing off the tag overview
 * 3. showing off the progress report
 */
export default function StatsReportSection() {
  const fakeStatsData = generateFakeData(30);

  return (
    <section className="py-16 px-4 md:pt-24 md:pb-32 flex flex-col gap-y-16 relative">
      <div className="flex flex-col gap-y-4">
        <h2 className="text-3xl lg:text-5xl text-gradient from-white to-white/75 !font-onest !font-medium tracking-tight py-1.5">
          Detailed Analytics & Progress <br /> Reports to Accelerate Your Growth
        </h2>
        <p className="text-gray-400 max-w-5xl text-base md:text-lg">
          Get actionable insights with personalized performance analytics. Track
          your coding journey, identify areas for improvement, and celebrate
          your achievements with comprehensive progress reports.
        </p>
      </div>
      <div
        aria-hidden="true"
        className="left-1/2 top-0 w-full center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      ></div>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-5 flex flex-col gap-y-6 relative">
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col">
                <h6 className="text-2xl lg:text-4xl text-gradient from-white to-white/75 !font-onest !font-medium tracking-tight py-1.5">
                  Customised Questions
                </h6>
                <p className="text-gray-400 w-3/4">
                  Question created based on your report to help you improve your
                  skills.
                </p>
              </div>
              <SkewedQuestionCards />
            </div>
            <div className="flex flex-col gap-y-8 relative p-4">
              <div
                aria-hidden="true"
                className="left-1/2 top-0 w-full center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2 bg-black-50"
              ></div>
              <h6 className="text-2xl lg:text-4xl text-gradient from-white to-white/75 !font-onest !font-medium tracking-tight py-1.5">
                Tag overview
              </h6>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="hidden md:block absolute right-0 top-0 h-full w-px pointer-events-none bg-black-50"
          ></div>
        </div>

        <div className="col-span-7 flex flex-col gap-y-8">
          <div className="flex flex-col">
            <h6 className="text-2xl lg:text-4xl text-gradient from-white to-white/75 !font-onest !font-medium tracking-tight py-1.5">
              Progress report
            </h6>
            <p className="text-gray-400 w-3/4">
              Visualize your progress in an easy to digest format. View your
              progress over time and see how you&apos;re progressing.
            </p>
          </div>
          <div className="relative">
            <QuestionChart
              questionData={fakeStatsData}
              step="day"
              backgroundColor="bg-black"
            />
            <div className="z-10 absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
            <div className="z-10 absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#000] to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
