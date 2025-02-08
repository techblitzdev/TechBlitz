import type { UserRecord } from '@/types/User';
import SidebarFooterPremium from './sidebar-footer-premium';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

interface SidebarFooterProps {
  user: UserRecord | null;
}

export default function SidebarFooter({ user }: SidebarFooterProps) {
  const pathname = usePathname();

  return (
    <div className="p-4">
      {!user && (
        <SidebarMenuItem className="group-data-[collapsible=icon]:hidden flex flex-col gap-2">
          <Button variant="default" fullWidth className="" href={`/login?redirectUrl=${pathname}`}>
            Login
          </Button>
          <Button variant="accent" fullWidth className="" href={`/signup?redirectUrl=${pathname}`}>
            Signup
          </Button>
        </SidebarMenuItem>
      )}
      {user?.userLevel === 'FREE' && <SidebarFooterPremium />}
    </div>
  );
}
