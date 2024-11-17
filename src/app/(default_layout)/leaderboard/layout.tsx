import BackToDashboard from '@/components/global/back-to-dashboard';
import { Separator } from '@/components/ui/separator';

export default function LeaderboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-white flex flex-col gap-y-4 relative h-full">
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex flex-col gap-y-2 justify-center w-full text-center">
          <div className="flex items-center w-full justify-between container">
            <BackToDashboard />
            <div className="flex flex-col w-full justify-between">
              <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
                Top users
              </h1>
              <p className="font-ubuntu text-sm text-gray-300">
                View the top users on TechBlitz.
              </p>
            </div>
            <div aria-hidden></div>
          </div>
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </div>
  );
}
