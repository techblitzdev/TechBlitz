import { Button } from '@/components/ui/button';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Stars } from 'lucide-react';
import { SIDEBAR_FOOTER_DESCRIPTION, SIDEBAR_FOOTER_TITLE } from '@/utils/constants/sidebar';
import { usePathname } from 'next/navigation';
import { UserRecord } from '@/types/User';
import { getUserDisplayName } from '@/utils/user';

interface SidebarFooterPremiumProps {
  user: UserRecord | null;
}

export default function SidebarFooterPremium({ user }: SidebarFooterPremiumProps) {
  const pathname = usePathname();

  const premiumUrl =
    process.env.NODE_ENV === 'production' ? 'https://dub.sh/upgrade-techblitz' : '/upgrade';

  const overrideDynamicTitleAndDescription = true;

  return (
    <>
      {/* Show when sidebar is expanded */}
      <SidebarMenuItem
        className="p-4 font-semibold font-inter text-center flex flex-col gap-y-1 items-center justify-center rounded-lg border border-black-50 group-data-[collapsible=icon]:hidden"
        style={{
          background:
            'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
        }}
      >
        <p className="font-onest">
          {overrideDynamicTitleAndDescription
            ? `${getUserDisplayName(user)}, looking to accelerate your learning?`
            : SIDEBAR_FOOTER_TITLE[pathname as keyof typeof SIDEBAR_FOOTER_TITLE]}
        </p>
        <p className="text-xs font-light font-onest">
          {overrideDynamicTitleAndDescription ? (
            <>
              Receive 30% off your first three months with code{' '}
              <span className="font-bold">FEBRUARY30</span>. Offer ends 28th February 2025.
            </>
          ) : (
            SIDEBAR_FOOTER_DESCRIPTION[pathname as keyof typeof SIDEBAR_FOOTER_DESCRIPTION]
          )}
        </p>
        <Button variant="premium" fullWidth className="mt-4" href={premiumUrl}>
          Upgrade to Premium
        </Button>
      </SidebarMenuItem>

      {/* Show when sidebar is collapsed */}
      <SidebarMenuItem className="hidden group-data-[collapsible=icon]:block">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-5"
                href={premiumUrl}
                title="Upgrade to Premium"
              >
                <Stars className="size-4 text-yellow-400 fill-yellow-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Upgrade to Premium</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarMenuItem>
    </>
  );
}
