import { Button } from '@/components/ui/button';
import LogoSmall from '@/components/ui/LogoSmall';
import { ChevronLeft, ChevronRight, List, ShuffleIcon } from 'lucide-react';

export default function QuestionNavigationLoading() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        <LogoSmall size={32} />
        <div className="flex items-center gap-x-2">
          <List className="size-4" />
          <p className="text-sm font-medium">Challenge List</p>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          disabled
          className={`p-2 rounded-r-md relative group duration-200 size-8 flex items-center justify-center`}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled
          className={`p-2 rounded-r-md relative group duration-200 size-8 flex items-center justify-center`}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8" padding="none">
          <ShuffleIcon size={16} />
        </Button>
      </div>
    </div>
  );
}
