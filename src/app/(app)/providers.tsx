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
        '!w-full lg:w-auto transition-[width] duration-200 ease-in-out py-6 lg:pt-4 lg:pb-3'
      )}
      style={{
        width:
          state === 'expanded' ? 'calc(100% - 15rem)' : 'calc(100% - 3rem)',
      }}
    >
      {children}
    </main>
  );
}
