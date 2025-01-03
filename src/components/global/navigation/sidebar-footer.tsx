import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useUser } from '@/hooks/use-user';
import { Button } from '@/components/ui/button';
import { getUserDisplayName } from '@/utils/user';
import { ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import LogoutButton from '@/components/auth/logout';
import ProfilePicture from '@/components/ui/profile-picture';

export default function SidebarFooterComponent() {
  const { user } = useUser();

  return (
    <SidebarFooter className="bg-[#000000] ">
      <SidebarMenu>
        {/** if sidebar is collapsed, hide the upgrade button */}
        {user?.userLevel === 'FREE' && (
          <SidebarMenuItem className="font-semibold font-inter text-center flex flex-col gap-y-1 items-center justify-center rounded-lg border border-black-75 p-6 group-data-[collapsible=icon]:hidden">
            <p className="text-sm">Upgrade to Premium</p>
            <p className="text-xs font-light">
              Get access to all features and unlock your full potential.
            </p>
            <Button variant="accent" fullWidth className="mt-4" href="/upgrade">
              Upgrade
            </Button>
          </SidebarMenuItem>
        )}
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton variant="default" className="text-white">
                <ProfilePicture
                  src={user?.userProfilePicture}
                  alt="Profile Picture"
                />
                {user && getUserDisplayName(user)}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#000] !text-white border-black-50">
              <DropdownMenuItem>
                <Link href="/upgrade" className="w-full">
                  Upgrade
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/homepage">Homepage</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogoutButton variant="ghost" padding="none" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
