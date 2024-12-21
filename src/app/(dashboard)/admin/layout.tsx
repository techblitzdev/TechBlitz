'use client';
import NewQuestionModal from '@/components/questions/new-question-modal';
import { Separator } from '@/components/ui/separator';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center px-6">
        <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
          Questions
        </h1>
        <NewQuestionModal className="w-fit" />
      </div>
      <>
        <Separator className="bg-black-50" />
        {children}
      </>
    </div>
  );
}
