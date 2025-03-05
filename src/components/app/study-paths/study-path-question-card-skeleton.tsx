import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';

export default function StudyPathQuestionCardSkeleton() {
  return (
    <div className="relative group perspective-1000 flex items-center justify-center">
      {/* Wrapper element with colored border */}
      <div
        className="absolute -inset-4 rounded-full border-2 border-black-100/20 transition-all duration-300 transform-gpu
          group-hover:rotate-2 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-accent/20
          group-active:rotate-1 group-active:scale-95"
      />

      {/* The card itself */}
      <div
        className="w-24 h-[86px] justify-center items-center flex flex-col gap-y-5 bg-[#191919] duration-300 p-5 rounded-full group relative transition-all mb-2
          transform-gpu
          before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-black-100/30 before:to-transparent before:opacity-70
          after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-t after:from-black-100/30 after:to-transparent after:opacity-30 after:translate-y-1/2
          hover:translate-y-[1px]
          active:translate-y-[1px] active:rotate-1 active:scale-95
          transform-style-3d
          backface-visibility-hidden
          cursor-pointer select-none
          active:translate-y-2 active:[box-shadow:0_0px_0_0_#191919,0_0px_0_0_#191919]
          active:border-b-[0px]
          transition-all duration-150 [box-shadow:0_8px_0_0_#0e0e0e,0_9px_0_0_#0e0e0e]"
      >
        <div className="flex w-full items-center justify-center gap-4 md:gap-5 relative z-10">
          <div className="flex items-center justify-center rounded-full">
            <div className="size-6 rounded-full bg-black-100/20 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
