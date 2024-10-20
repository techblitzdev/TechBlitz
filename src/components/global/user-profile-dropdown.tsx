import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from '@/types/User';
import LogoutButton from './logout';
import AdminButton from '../admin-button';

export default async function UserProfileDropdown(opts: {
  userData: Partial<User>;
}) {
  const { userData } = opts;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src="https://www.gravatar.com/avatar/default"
          alt="user"
          className="w-8 h-8 rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-black-75 text-whtie border-black-75 w-56"
        align="end"
      >
        {/* <DropdownMenuLabel>Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator className="bg-black-50" /> */}
        <DropdownMenuItem>
          My profile
          <span className="font-semibold font-satoshi">
            &nbsp; @{userData?.name || userData.email}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>Account settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem>Upgrade account</DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black-50" />
        <LogoutButton />
        {userData.userLevel == 'ADMIN' && (
          <DropdownMenuItem className="hover:bg-transparent">
            <AdminButton className="w-full" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
