import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export default function RoadmapQuestionCardMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          padding="none"
          className="hover:bg-black-50 h-fit p-0.5"
        >
          <MoreHorizontal className="size-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="bg-black-75 border border-black-50 text-white hover:text-white"
      >
        {' '}
        <DropdownMenuItem className="font-onest">Regenerate</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black-50" />
        <DropdownMenuItem>Mark as correct</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
