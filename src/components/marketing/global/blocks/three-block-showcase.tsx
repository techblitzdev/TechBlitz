import { Button } from '@/components/ui/button';
import ArcheryTarget from '@/components/ui/icons/target';
import { cn } from '@/lib/utils';

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
export default function ThreeBlockShowcase({
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

  return (
    <section className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24 lg:pb-32 flex flex-col gap-8">
      <div className={`flex flex-col gap-4 ${alignMap[align]}`}>
        <h2 className="text-3xl md:text-5xl !font-onest !font-medium tracking-tight text-gradient from-white to-white/75 py-1">
          {title}
        </h2>
        <p className="text-base lg:text-lg text-gray-400 font-onest max-w-3xl mx-auto">
          {subheader}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-4 h-80">
        <div
          className={cn(
            baseCardClasses,
            'group relative rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-sm'
          )}
        >
          {left || (
            <>
              <div
                className="
                        w-full md:w-1/2 lg:w-full bg-[#090909] flex flex-col gap-y-2 
                        backdrop-blur-sm border border-black-50 p-4 rounded-lg
                        absolute top-8 -right-16 scale-125
                    "
              >
                <div className="flex items-center space-x-2 text-white">
                  <ArcheryTarget height="36" width="36" />
                  <h3 className="text-lg font-semibold">Set a Goal</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set a goal date to complete this study path. Receive a daily reminder to complete
                  the next question.
                </p>
              </div>
              <div className="mt-auto transition-transform duration-300 group-hover:translate-y-[-2.5rem]">
                <h3 className="text-xl font-semibold text-white">Goal Setting</h3>
              </div>
              <div className="absolute bottom-0 left-6 translate-y-full transition-transform duration-300 group-hover:translate-y-[-1rem]">
                Stay on track with your goals and receive daily reminders encouraging your growth.
              </div>
            </>
          )}
        </div>

        <div
          className={cn(
            baseCardClasses,
            'group relative rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-sm'
          )}
        >
          {center || (
            <>
              <div className="flex-1"></div>
              <div className="mt-auto">
                <h3 className="text-xl font-semibold text-white">Powerful AI Assistant</h3>
              </div>
            </>
          )}
        </div>

        <div
          className={cn(
            baseCardClasses,
            'group relative rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-sm'
          )}
        >
          {right || (
            <>
              <div className="flex-1"></div>
              <div className="mt-auto">
                <h3 className="text-xl font-semibold text-white">Progress Tracking</h3>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
