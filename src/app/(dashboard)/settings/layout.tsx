import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function ProfileLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-white flex flex-col gap-y-4 relative">
      <div className="flex gap-2 items-center px-6">
        <div className="block md:hidden">
          <SidebarTrigger />
        </div>
        <h1 className="text-xl md:text-3xl font-onest font-semibold">
          Settings
        </h1>
      </div>
      <Separator className="bg-black-50" />
      <div className="bg-black-75 rounded-xl border border-black-50 mx-6">
        {children}
      </div>
    </div>
  );
}
