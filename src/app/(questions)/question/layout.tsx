import { Separator } from '@/components/ui/separator';

export default function QuestionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container text-white flex flex-col gap-y-4">
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-3xl font-inter">Question</h1>
      </div>
      <Separator />
      {children}
    </div>
  );
}
