import { Button } from '@/components/ui/button';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Stars } from 'lucide-react';
import { SIDEBAR_FOOTER_DESCRIPTION } from '@/utils/constants/sidebar';
import { usePathname } from 'next/navigation';
import { UserRecord } from '@/types/User';
import { getUserDisplayName } from '@/utils/user';
import { getUpgradeUrl } from '@/utils';

interface SidebarFooterPremiumProps {
  user: UserRecord | null;
}

export default function SidebarFooterPremium({ user }: SidebarFooterPremiumProps) {
  const pathname = usePathname();

  const overrideDynamicTitleAndDescription = false;

  // check if the user has a custom coupon and the expiring date is in the future
  const hasCustomCoupon =
    user?.userCustomCoupon &&
    user?.userCustomCouponExpiresAt &&
    user?.userCustomCouponExpiresAt > new Date();

  return (
    <>
      {/* Show when sidebar is expanded */}
      <SidebarMenuItem
        className="p-2 pt-4 font-semibold font-inter text-center flex flex-col gap-y-1 items-center justify-center rounded-lg border border-black-50 group-data-[collapsible=icon]:hidden"
        style={{
          background:
            'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
        }}
      >
        <p className="font-onest">
          {/** overrideDynamicTitleAndDescription
            ? `${getUserDisplayName(user)}, don't miss out!`
            : SIDEBAR_FOOTER_TITLE[pathname as keyof typeof SIDEBAR_FOOTER_TITLE] */}
          {hasCustomCoupon
            ? `${getUserDisplayName(user)}, don't miss out!`
            : 'Accelerate your learning!'}
        </p>
        <p className="text-xs font-light font-onest">
          {hasCustomCoupon ? (
            <>
              Receive 60% off your first three months with code{' '}
              <span className="font-bold">{user?.userCustomCoupon}</span>. Offer ends{' '}
              {user?.userCustomCouponExpiresAt?.toLocaleDateString()}.
            </>
          ) : (
            <>
              {overrideDynamicTitleAndDescription
                ? 'Receive 30% off your first three months with code FEBRUARY30. Offer ends 2/28/2025.'
                : SIDEBAR_FOOTER_DESCRIPTION[pathname as keyof typeof SIDEBAR_FOOTER_DESCRIPTION]
                  ? SIDEBAR_FOOTER_DESCRIPTION[pathname as keyof typeof SIDEBAR_FOOTER_DESCRIPTION]
                  : 'Personalized practice, premium questions and more'}
            </>
          )}
        </p>
        <Button variant="premium" fullWidth className="mt-4" href={getUpgradeUrl()}>
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
                href={getUpgradeUrl()}
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
