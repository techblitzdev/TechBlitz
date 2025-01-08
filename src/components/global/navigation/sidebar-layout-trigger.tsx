'use client';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

/**
 * This component is used to trigger the sidebar layout.
 * It is used in the dashboard page to hide the sidebar trigger when the sidebar is expanded.
 * On mobile devices, the trigger is always shown regardless of sidebar state.
 */
export default function SidebarLayoutTrigger() {
  const { state } = useSidebar();

  return (
    <SidebarTrigger
      className={cn(
        'h-7',
        // Only hide on desktop when expanded
        state === 'expanded' ? 'lg:hidden' : ''
      )}
    />
  );
}
