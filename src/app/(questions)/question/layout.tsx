import { Separator } from '@/components/ui/separator';

export default function QuestionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container text-white flex flex-col gap-y-4">
      <div className="flex w-full justify-between items-center font-inter">
        <h1 className="font-bold text-xs">Today's Question</h1>
        <span>0:00</span>
      </div>
      <Separator />
      {children}
    </div>
  );
}
