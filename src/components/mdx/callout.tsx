import type React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle, Zap } from 'lucide-react';

type CalloutProps = {
  children: React.ReactNode;
  type?: 'default' | 'info' | 'warning' | 'success' | 'error' | 'top-tip';
  title?: string;
  className?: string;
};

export default function Callout({ children, type = 'default', title, className }: CalloutProps) {
  const icons = {
    default: Info,
    info: Info,
    warning: AlertCircle,
    success: CheckCircle,
    error: XCircle,
    'top-tip': () => (
      <span role="img" aria-label="light bulb">
        💡
      </span>
    ),
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        'my-6 flex gap-4 rounded-lg border p-4',
        {
          'bg-blue-200 border-blue-300 text-blue-900 dark:bg-blue-950/90 dark:border-blue-900 dark:text-blue-200':
            type === 'default' || type === 'info' || type === 'top-tip',
          'bg-amber-200 border-amber-300 text-amber-900 dark:bg-amber-950/90 dark:border-amber-900 dark:text-amber-200':
            type === 'warning',
          'bg-green-200 border-green-300 text-green-900 dark:bg-green-950/90 dark:border-green-900 dark:text-green-200':
            type === 'success',
          'bg-red-200 border-red-300 text-red-900 dark:bg-red-950/90 dark:border-red-900 dark:text-red-200':
            type === 'error',
        },
        className
      )}
    >
      <div className="mt-1 flex-shrink-0">
        <Icon className="size-5" />
      </div>
      <div className="flex-1 space-y-1.5">
        {title && <p className="font-medium font-onest">{title}</p>}
        <div className="prose-sm prose-p:leading-relaxed prose-pre:p-0 font-onest">{children}</div>
      </div>
    </div>
  );
}
