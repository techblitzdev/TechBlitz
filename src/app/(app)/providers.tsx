'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useSidebar();

  return (
    <main
      className={cn(
        'w-full transition-[width] duration-200 ease-in-out py-6',
        'lg:py-4 lg:pb-3',
        {
          'lg:w-[calc(100%-15rem)]': state === 'expanded',
          'lg:w-[calc(100%-3rem)]': state === 'collapsed',
        }
      )}
    >
      {children}
    </main>
  );
}
