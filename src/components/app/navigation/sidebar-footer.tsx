'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from '@/components/auth/logout';
import ProfilePicture from '@/components/ui/profile-picture';

import { UserRecord } from '@/types/User';
import { getUserDisplayName } from '@/utils/user';
import { Profile } from '@/types/Profile';
import { capitalise } from '@/utils';
import SidebarFooterPremium from './sidebar-footer-premium';
import ReferralModal from '@/components/shared/referral-modal';

/**
/**
 * Sidebar footer component
 *
 * @param opts - The options for the sidebar footer
 * @returns The sidebar footer component
 */
export default function SidebarFooterComponent(opts: {
  user: UserRecord | null;
  profile: Profile | null;
}) {
  const { user } = opts;

  // get the current route so we can add the redirectUrl to the login button
  const pathname = usePathname();

  // profile link determined on env (dev or prod)
  //const profileLink =
  //process.env.NEXT_PUBLIC_ENV === 'production' ? '/settings/profile' : `/${user?.username}`;

  return (
    <SidebarFooter className="bg-[#000000]">
      <SidebarMenu>
        {/** if sidebar is collapsed, hide the upgrade button */}
        {user?.userLevel === 'FREE' && <SidebarFooterPremium />}
        {/** if there is no user, we render a login / signup button */}
        {!user ? (
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden flex flex-col gap-2">
            <Button
              variant="default"
              fullWidth
              className=""
              href={`/login?redirectUrl=${pathname}`}
            >
              Login
            </Button>
            <Button
              variant="accent"
              fullWidth
              className=""
              href={`/signup?redirectUrl=${pathname}`}
            >
              Signup
            </Button>
          </SidebarMenuItem>
        ) : (
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton variant="default" className="text-white h-fit">
                  <ProfilePicture
                    src={user?.userProfilePicture}
                    alt="Profile Picture"
                    className="size-9"
                  />

                  <div className="flex flex-col">
                    <span className="text-white font-medium text-lg line-clamp-1">
                      {user && getUserDisplayName(user)}
                    </span>
                    <span className="text-xs text-white">{capitalise(user.userLevel)}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#000] !text-white border-black-50">
                <DropdownMenuItem>
                  <Link href="https://dub.sh/upgrade-techblitz" className="w-full">
                    Upgrade
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ReferralModal>
                    <Button
                      variant="ghost"
                      padding="none"
                      className="flex items-center gap-x-2 h-auto !bg-transparent"
                    >
                      Invite a friend
                    </Button>
                  </ReferralModal>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/homepage">Homepage</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="https://git.new/blitz">GitHub</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogoutButton variant="ghost" padding="none" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarFooter>
  );
}
