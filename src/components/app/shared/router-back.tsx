'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RouterBackProps {
  children?: React.ReactNode;
  href?: string;
  className?: string;
}

const RouterBack = ({ children, href, className }: RouterBackProps) => {
  const router = useRouter();

  if (href) {
    return (
      <Link href={href} className={cn('text-white flex items-center gap-x-2', className)}>
        {children || (
          <>
            <ArrowLeft className="size-4" />
            Back
          </>
        )}
      </Link>
    );
  }

  return (
    <Button
      variant="link"
      className={cn('text-white flex items-center gap-x-2', className)}
      onClick={() => router.back()}
    >
      {children || (
        <>
          <ArrowLeft className="size-4" />
          Back
        </>
      )}
    </Button>
  );
};

export default RouterBack;
