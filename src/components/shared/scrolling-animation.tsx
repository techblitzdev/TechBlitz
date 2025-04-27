import { cn } from '@/lib/utils';

export default function ScrollingAnimation({
  children,
  className,
  count,
}: {
  children: React.ReactNode;
  className?: string;
  count: number;
}) {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#000] to-transparent z-10" />
      <div
        className={cn('animate-scroll hover:pause-animation relative z-0', className)}
        style={{ '--question-count': count } as React.CSSProperties}
      >
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#000] to-transparent z-10" />
    </>
  );
}
