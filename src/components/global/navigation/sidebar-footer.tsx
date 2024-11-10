'use client';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';

{
  /* <DropdownMenu>
            {/* <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                variant="outline"
                className="bg-black-100 text-white"
              >
                <User2 />
                {isLoading && <LoadingSpinner />}
                {isError && 'Error'}
                {user && getUserDisplayName(user)}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger> */
}
{
  /* <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width] bg-black-75 border-black-50 text-white"
            >
              <DropdownMenuItem className="!hover:bg-black-50">
                <Link href="/upgrade" className="w-full">
                  Upgrade
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="!hover:bg-black-50">
                <Link href="/settings/account" className="w-full">
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-black-50">
                <Link href="/settings/billing" className="w-full">
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-black-50 w-full">
                <LogoutButton variant="ghost" padding="none" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */
}

export default function SidebarFooterComponent() {
  const { user, isError, isLoading } = useUser();

  return (
    <SidebarFooter>
      <SidebarMenu>
        {user?.userLevel !== 'PREMIUM' && (
          <SidebarMenuItem className="font-semibold font-ubuntu text-center flex flex-col gap-y-1 items-center justify-center rounded-lg border border-black-75 p-6">
            <p className="text-sm">
              Upgrade to{' '}
              {user?.userLevel !== 'STANDARD' ? 'Standard' : 'Premium'}
            </p>
            <p className="text-xs font-light">
              Elevate your development skills
            </p>
            <Button variant="accent" fullWidth className="mt-4" href="/upgrade">
              Upgrade
            </Button>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarFooter>
  );
}
