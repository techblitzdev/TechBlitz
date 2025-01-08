import { defaultRoadmapQuestionCount } from '@/utils/data/roadmap/questions/default/fetch-roadmap-questions';

export default async function OnboardingProgressBar({ currentStep = 0 }) {
  const defaultQuestions = await defaultRoadmapQuestionCount();

  return (
    <div className="flex items-center w-3/5 relative">
      {/* Progress Bar Background */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-black-50 rounded-full"></div>

      {/* Progress Bar Filled */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-green-500 rounded-full"
        style={{
          width: `${((currentStep - 1) / (defaultQuestions - 1)) * 100}%`,
        }}
      ></div>

      {/* Progress Dots */}
      <div className="flex justify-between w-full relative z-10">
        {Array.from({ length: defaultQuestions }).map((_, i) => (
          <div
            key={i}
            className={`
              size-4 rounded-full border-2 transition-all duration-300
              ${
                i < currentStep - 1
                  ? 'bg-green-500 border-green-500'
                  : 'bg-black-50 border-black-50'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
