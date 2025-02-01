import { Suspense } from "react";
import dynamic from "next/dynamic";

import { Separator } from "@/components/ui/separator";
import ClientPage from "./page.client";
import LoadingSpinner from "@/components/ui/loading";
import DashboardBentoGrid from "@/components/app/dashboard/dashboard-bento-grid";
import DashboardHeader from "@/components/app/dashboard/dashboard-header";
import { useUserServer } from "@/hooks/use-user-server";
import { ArrowRight } from "lucide-react";

const ContinueJourney = dynamic(
  () => import("@/components/app/dashboard/continue-journey-card"),
  {
    loading: () => (
      <div
        className="mt-2 group flex flex-col md:flex-row justify-between h-full overflow-hidden rounded-xl border border-black-50 p-4 transition-all "
        style={{
          background:
            "radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)",
        }}
      >
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-400">
            Your next question:
          </p>
          <div className="h-7">
            <LoadingSpinner />
          </div>
        </div>
        <div className="mt-6 flex gap-x-2 items-center md:justify-between">
          <span className="text-sm text-gray-400">Answer now</span>
          <ArrowRight className="size-4 text-gray-300 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    ),
  },
);

interface DashboardProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const user = useUserServer();

  return (
    <ClientPage searchParams={searchParams} userPromise={user}>
      <div className="text-white flex flex-col gap-y-2 h-full">
        <DashboardHeader />
        <Separator className="bg-black-50" />
        <div className="h-full mt-1 max-w-7xl px-6 mx-auto flex flex-col gap-5">
          <Suspense
            fallback={
              <div className="flex flex-col gap-y-2 min-h-20">
                <LoadingSpinner />
                <p className="text-sm text-gray-400 font-light font-onest mt-3">
                  Loading...
                </p>
              </div>
            }
          >
            <ContinueJourney />
          </Suspense>
          <DashboardBentoGrid />
        </div>
      </div>
    </ClientPage>
  );
}
