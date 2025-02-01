"use client";

import { ShareIcon } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { toast } from "sonner";

export default function ShareQuestion({
  content,
  variant,
}: {
  content?: string;
  variant?: "outline" | "ghost" | "default";
}) {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant={variant || "ghost"}
            size="icon"
            padding="none"
            onClick={copyLink}
          >
            <ShareIcon className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content || "Share this question!"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
