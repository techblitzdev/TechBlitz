import { Button } from '@/components/ui/button';
import ArcheryTarget from '@/components/ui/icons/target';
import { cn } from '@/lib/utils';
import AnimatedAIQuestionHelpCard from '../../homepage/personalized/ai-help-demo';
import StudyPathsList from '@/components/app/study-paths/list';
import { getQuestions } from '@/actions/questions/admin/list';
import { getStudyPath } from '@/utils/data/study-paths/get';

/**
 *
 * 'Built for modern teams' - https://mintlify.com/
 *
 * Used to showcase 3 features of TechBlitz.
 * No link to other pages, just a simple 3 block showcase.
 *
 * Either shows default values in the boxes, or they can be customized
 * via props.
 *
 * @returns
 */
export default async function ThreeBlockShowcase({
  title,
  subheader,
  align = 'left',
  left,
  right,
  center,
}: {
  title: string;
  subheader: string;
  align?: 'left' | 'center' | 'right';
  left?: React.ReactNode;
  right?: React.ReactNode;
  center?: React.ReactNode;
}) {
  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const baseCardClasses =
    'border border-black-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-sm flex flex-col justify-between';
  const cardTitleClasses =
    'mt-auto transition-transform duration-300 md:group-hover:translate-y-[-2.5rem] md:group-hover:translate-y-[-2.5rem]';
  const cardDescriptionClasses =
    'absolute bottom-0 left-6 translate-y-full transition-transform duration-300 md:group-hover:translate-y-[-1rem] md:group-hover:translate-y-[-1rem] text-sm text-gray-400';

  // hardcoded study path and questions
  const studyPath = await getStudyPath('javascript-fundamentals');
  const questions = await getQuestions({
    questionSlugs: studyPath?.questionSlugs.slice(0, 3) ?? [],
  });

  return (
    <section className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 pb-16 md:pb-24 lg:pb-32 flex flex-col gap-8">
      <div className={`flex flex-col gap-4 ${alignMap[align]}`}>
        <h2 className="text-2xl sm:text-3xl md:text-5xl !font-onest !font-medium tracking-tight text-gradient from-white to-white/75 py-1">
          {title}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-400 font-onest max-w-3xl mx-auto">
          {subheader}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4 auto-rows-fr">
        <div
          className={cn(
            baseCardClasses,
            'group relative rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-sm min-h-[280px] md:min-h-[320px]'
          )}
        >
          {left || (
            <>
              <div
                className="
                        w-full lg:w-full bg-[#090909] flex flex-col gap-y-2 
                        backdrop-blur-sm border border-black-50 p-3 md:p-4 rounded-lg duration-300
                        absolute top-8 right-0 md:-right-16 scale-110 md:scale-125 group-hover:scale-[1.2] md:group-hover:scale-[1.3]
                        group-hover:-right-[60px] md:group-hover:-right-[70px]
                    "
              >
                <div className="flex items-center space-x-2 text-white">
                  <ArcheryTarget height="28" width="28" />
                  <h3 className="text-base md:text-lg font-semibold">Set a Goal</h3>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Set a goal date to complete this study path. Receive a daily reminder to complete
                  the next question.
                </p>
              </div>
              <div className={cardTitleClasses}>
                <h3 className="text-lg md:text-xl font-semibold text-white">Goal Setting</h3>
              </div>
              <div className={cardDescriptionClasses}>
                Stay on track with your goals and receive daily reminders encouraging your growth.
              </div>
            </>
          )}
        </div>

        <div
          className={cn(
            baseCardClasses,
            'group relative rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-sm min-h-[280px] md:min-h-[320px]'
          )}
        >
          {center || (
            <>
              <div className="relative flex-1 scale-90">
                <AnimatedAIQuestionHelpCard className="absolute" />
                {/** bottom fade effect */}
                <div className="z-10 absolute inset-x-0 bottom-0 h-20 md:h-28 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
              </div>
              <div className={cn(cardTitleClasses, 'z-20')}>
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  Powerful AI Assistant
                </h3>
              </div>
              <div className={cn(cardDescriptionClasses, 'z-20')}>
                Never feel confused with a coding problem again. Ask for help and receive instant
                feedback.
              </div>
            </>
          )}
        </div>

        <div
          className={cn(
            baseCardClasses,
            'group relative rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-sm min-h-[280px] md:min-h-[320px]'
          )}
        >
          {right || (
            <>
              <div className="flex-1">
                {studyPath && (
                  <StudyPathsList
                    calculateOffset={(index) => Math.sin(index * 2) * 3}
                    top={50}
                    questions={questions}
                    studyPath={studyPath}
                    className="h-full"
                  />
                )}
              </div>
              <div className={cardTitleClasses}>
                <h3 className="text-lg md:text-xl font-semibold text-white">Structured Learning</h3>
              </div>
              <div className={cardDescriptionClasses}>
                Follow a structured learning path and become a better developer.
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
