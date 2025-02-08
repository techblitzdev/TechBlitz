import { Button } from '@/components/ui/button';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Stars } from 'lucide-react';
//import { SIDEBAR_FOOTER_DESCRIPTION, SIDEBAR_FOOTER_TITLE } from '@/utils/constants/sidebar';
//import { usePathname } from 'next/navigation';

export default function SidebarFooterPremium() {
  //const pathname = usePathname();

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
          {/**
         * 
         {SIDEBAR_FOOTER_TITLE[pathname as keyof typeof SIDEBAR_FOOTER_TITLE] ||
         'Unlock Your Full Potential'}
         */}
          Don't miss out!
        </p>
        <p className="text-xs font-light font-onest">
          {/**
           *
           * {SIDEBAR_FOOTER_DESCRIPTION[pathname as keyof typeof SIDEBAR_FOOTER_DESCRIPTION] ||
           *   'Get AI-powered study paths, premium challenges, and learn 3x faster with personalized guidance!'
           * }
           */}
          Lifetime access deal ends 14th February.
        </p>
        <Button
          variant="premium"
          fullWidth
          className="mt-4"
          href="https://dub.sh/upgrade-techblitz"
        >
          Upgrade to Premium
        </Button>
      </SidebarMenuItem>

      {/* Show when sidebar is collapsed */}
      <SidebarMenuItem className="hidden group-data-[collapsible=icon]:block">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="premium"
                size="icon"
                className="size-5"
                href="https://dub.sh/upgrade-techblitz"
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
