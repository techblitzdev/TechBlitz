import BackToDashboard from '@/components/global/back-to-dashboard';
import { Separator } from '@/components/ui/separator';

export default function RoadmapLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-white flex flex-col gap-y-4 relative h-full">
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex flex-col gap-y-2 justify-center w-full text-center">
          <div className="flex items-center w-full justify-between container">
            <BackToDashboard />
          </div>
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="container">{children}</div>
    </div>
  );
}
