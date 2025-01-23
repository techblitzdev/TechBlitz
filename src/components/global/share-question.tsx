'use client';

import { ShareIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { toast } from 'sonner';

export default function ShareQuestion() {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Question link copied to clipboard!');
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" padding="none" onClick={copyLink}>
            <ShareIcon className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share this question!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
