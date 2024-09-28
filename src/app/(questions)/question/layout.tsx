import { Separator } from '@/components/ui/separator';

export default function QuestionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container text-white flex flex-col gap-y-4 py-12">
      <div className="flex w-full justify-between items-center font-satoshi">
        <h1 className="font-bold text-lg">Daily Question</h1>
        <span>0:00</span>
      </div>
      <Separator />
      {children}
    </div>
  );
}
