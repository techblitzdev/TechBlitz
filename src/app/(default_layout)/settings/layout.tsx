import { Separator } from '@/components/ui/separator';

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-white flex flex-col gap-y-4 relative">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
          Settings
        </h1>
      </div>
      <Separator className="bg-black-50" />
      <div className="bg-black-75 rounded-xl border border-black-50">
        {children}
      </div>
    </div>
  );
}
