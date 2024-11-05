'use client';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronUp, User2 } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { getUserDisplayName } from '@/utils/user';
import LoadingSpinner from '@/components/ui/loading';
import LogoutButton from '../logout';
import Link from 'next/link';

export default function SidebarFooterComponent() {
  const { user, isError, isLoading } = useUser();

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="text-xl">
                <User2 />
                {isLoading && <LoadingSpinner />}
                {isError && 'Error'}
                {user && getUserDisplayName(user)}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width] bg-black-75 border-black-50 text-white"
            >
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
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
