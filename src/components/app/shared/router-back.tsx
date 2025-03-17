'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { forwardRef } from 'react';

const RouterBack = forwardRef<
  HTMLButtonElement,
  {
    children?: React.ReactNode;
    href?: string;
    className?: string;
  }
>(({ children, href, className }) => {
  const router = useRouter();

  return (
    <Button
      variant="link"
      className={cn('text-white flex items-center gap-x-2', className)}
      onClick={() => (href ? router.push(href) : router.back())}
    >
      {children || (
        <>
          <ArrowLeft className="size-4" />
          Back
        </>
      )}
    </Button>
  );
});

RouterBack.displayName = 'RouterBack';

export default RouterBack;
