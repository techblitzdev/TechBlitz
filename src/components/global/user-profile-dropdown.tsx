import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { ExitIcon } from '@radix-ui/react-icons';
import type { User } from '@/types/User';

export default function UserProfileDropdown(opts: { userData: Partial<User> }) {
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
          My profile @{userData?.name || userData.email}
        </DropdownMenuItem>
        <DropdownMenuItem>Account settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem>Upgrade account</DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black-50" />
        <DropdownMenuItem className="px-0" asChild>
          <Button
            className="w-full py-1 px-4 flex items-center gap-x-2"
            variant="default"
          >
            <span>Sign out</span>
            <ExitIcon className="size-3" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
