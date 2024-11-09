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
    <div className={cn('grid grid-cols-1 md:grid-cols-4 gap-6', className)}>
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
  const renderContent = () => {
    const hasContent = title || description || icon;

    return (
      <>
        {header}
        {hasContent && (
          <div className="group-hover/bento:translate-x-2 transition duration-200">
            {icon}
            {title && (
              <div className="font-bold text-white mb-1 mt-2 font-satoshi text-lg">
                {title}
              </div>
            )}
            {description && (
              <div className="font-normal text-sm text-white">
                {description}
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  const baseClasses = cn(
    'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-black-75 border border-transparent justify-between flex flex-col  border border-black-50',
    // Only add space-y-4 if there's content to space
    header || title || description || icon ? 'space-y-4' : '',
    className
  );

  return href ? (
    <Link href={href} className={baseClasses} prefetch>
      {renderContent()}
    </Link>
  ) : (
    <div className={baseClasses}>{renderContent()}</div>
  );
};
