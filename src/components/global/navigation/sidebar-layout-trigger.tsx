'use client';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/utils/cn';

/**
 * This component is used to trigger the sidebar layout.
 * It is used in the dashboard page to hide the sidebar trigger when the sidebar is expanded.
 */
export default function SidebarLayoutTrigger() {
  const { state } = useSidebar();

  return <SidebarTrigger className={cn(state === 'expanded' && 'hidden')} />;
}
