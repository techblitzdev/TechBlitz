import { getUserDailyStats } from "@/utils/data/user/authed/get-daily-streak";
import { Suspense, SVGProps } from "react";
import LoadingSpinner from "./loading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export function SolarFlameBoldDuotone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        className="fill-red-500"
        d="M20 15c0 4.255-2.618 6.122-4.641 6.751a.44.44 0 0 1-.233.012c-.289-.069-.432-.453-.224-.751c.88-1.266 1.898-3.196 1.898-5.012c0-1.95-1.644-4.253-2.928-5.674c-.293-.324-.805-.11-.821.328c-.053 1.45-.282 3.388-1.268 4.908a.412.412 0 0 1-.677.036c-.308-.39-.616-.871-.924-1.252c-.166-.204-.466-.207-.657-.026c-.747.707-1.792 1.809-1.792 3.18c0 .93.36 1.905.767 2.69c.202.39-.103.851-.482.77a.5.5 0 0 1-.122-.046C6.113 19.98 4 18.084 4 15c0-3.146 4.31-7.505 5.956-11.623c.26-.65 1.06-.955 1.617-.531C14.943 5.414 20 10.378 20 15"
      ></path>
      <path
        className="fill-orange-400"
        d="M7.733 17.5c0 .93.36 1.905.767 2.69c.202.39-.103.852-.482.77c.482.54 3.658.957 7.108.803c-.289-.069-.432-.453-.224-.751c.88-1.265 1.898-3.196 1.898-5.012c0-1.95-1.644-4.253-2.928-5.674c-.293-.324-.805-.11-.821.328c-.053 1.45-.282 3.388-1.268 4.908a.412.412 0 0 1-.677.036c-.308-.39-.616-.871-.924-1.251c-.166-.205-.466-.208-.657-.027c-.747.707-1.792 1.809-1.792 3.18"
      ></path>
    </svg>
  );
}

async function CurrentStreakData() {
  const userStreak = await getUserDailyStats();

  return (
    <div className="flex items-center gap-x-1">
      <p className="font-onest font-bold">
        {userStreak?.streakData?.currentstreakCount ?? 0}
      </p>
    </div>
  );
}

export default async function CurrentStreak() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <div className="flex items-center gap-x-1">
            <Suspense fallback={<LoadingSpinner />}>
              <CurrentStreakData />
            </Suspense>
            <SolarFlameBoldDuotone className="size-6" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Your current streak</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
