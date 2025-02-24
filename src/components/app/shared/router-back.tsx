'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RouterBack({
  children,
  href,
  className,
}: {
  children?: React.ReactNode;
  href?: string;
  className?: string;
}) {
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
}
