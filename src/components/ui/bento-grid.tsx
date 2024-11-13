'use client';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { Grid } from './grid';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode[];
}) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-4 gap-6', className)}>
      <div className="flex flex-col gap-6 md:col-span-1">
        {children?.[0]}
        {children?.[1]}
      </div>
      {children?.slice(2)}
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
  padded,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  padded?: boolean;
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
    'rounded-xl group/bento overflow-hidden hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-black-75 border border-black-50 justify-between flex flex-col',
    // Only add space-y-4 if there's content to space
    header || title || description || icon ? 'space-y-4' : '',
    className,
    padded ? 'p-4' : ''
  );

  return href ? (
    <Link href={href} className={baseClasses} prefetch>
      {renderContent()}
    </Link>
  ) : (
    <div className={baseClasses}>{renderContent()}</div>
  );
};
