import { cn } from '@/utils/cn';
import Link from 'next/link';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4 ', className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}) => {
  const content = (
    <>
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-bold text-white mb-1 mt-2 font-inter">{title}</div>
        <div className="font-normal text-xs text-white font-inter">
          {description}
        </div>
      </div>
    </>
  );

  // If `href` is provided, wrap the content in a Link or anchor tag
  return href ? (
    <Link
      href={href}
      className={cn(
        'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-black-75 border border-transparent justify-between flex flex-col space-y-4',
        className
      )}
      prefetch
    >
      {content}
    </Link>
  ) : (
    <div
      className={cn(
        'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-black-75 border border-transparent justify-between flex flex-col space-y-4',
        className
      )}
    >
      {content}
    </div>
  );
};
