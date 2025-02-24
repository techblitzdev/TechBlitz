'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RouterBack({ children }: { children?: React.ReactNode }) {
  const router = useRouter();

  return (
    <Button
      variant="link"
      className="text-white flex items-center gap-x-2"
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
}
