import { useUserServer } from "@/hooks/use-user-server";
import { ChevronLeft, ArrowLeft } from "lucide-react";
import { Button } from "./button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";

export default async function BackToDashboard(opts: {
  href?: string;
  backTo?: string;
}) {
  const { href = "/dashboard", backTo = "Dashboard" } = opts;

  const user = await useUserServer();
  if (!user) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            href={href}
            variant="default"
            size="icon"
            wrapperClassName="flex items-center"
          >
            <ChevronLeft className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
            <ArrowLeft className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Back to {backTo}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
