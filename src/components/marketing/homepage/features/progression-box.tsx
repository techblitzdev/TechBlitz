import DifficultyRadialChart from '@/components/app/statistics/difficulty-radial-chart';

const mockData = {
  all: {
    totalQuestions: 175,
    tagCounts: {},
    tags: [],
    difficulties: { BEGINNER: 101, EASY: 34, MEDIUM: 31, HARD: 9 },
  },
};

export default function ProgressionBentoBox() {
  return (
    <>
      {/* Top Card */}
      <div className="overflow-hidden absolute z-10 scale-150 md:scale-100 top-40 md:top-16 flex flex-col gap-4 w-full rounded-lg transition-all duration-300">
        <DifficultyRadialChart questionData={mockData} />
      </div>
    </>
  );
}
