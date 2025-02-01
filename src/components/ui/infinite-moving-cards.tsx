'use client';

import { cn } from '@/lib/utils';

export const InfiniteMovingCards = ({
  items,
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    title: string;
  }[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-16 w-max flex-nowrap',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => {
          return (
            <div
              className={cn(
                'bg-[#000] w-[150px] relative rounded-2xl border flex-shrink-0 border-black-50 p-4 md:w-[200px] transition-all',
                idx % 2 === 0 ? '-translate-y-16' : 'translate-y-16'
              )}
              key={`${item.name}-${idx}`}
            >
              {/* Roadmap marker line */}
              <div
                className={cn(
                  'absolute left-1/2 w-px bg-black-50',
                  idx % 2 === 0
                    ? 'bottom-0 h-[25px] translate-y-full'
                    : 'top-0 h-[25px] -translate-y-full'
                )}
              >
                {/* Dot at the connection point */}
                <div
                  className={cn(
                    'absolute left-1/2 size-1.5 rounded-full bg-black-50 -translate-x-1/2',
                    idx % 2 !== 0 ? 'top-0' : 'bottom-0'
                  )}
                />
              </div>

              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="relative z-20 flex size-full justify-center items-center">
                <span className="text-white font-onest text-center">{item.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
