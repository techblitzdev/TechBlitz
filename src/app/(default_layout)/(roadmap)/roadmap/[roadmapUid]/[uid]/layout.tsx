import BackToDashboard from '@/components/global/back-to-dashboard';
import { Separator } from '@/components/ui/separator';

export default function RoadmapQuestionLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { roadmapUid: string; questionUid: string };
}>) {
  const { roadmapUid, questionUid } = params;

  return (
    <>
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-x-5 py-2">
          <BackToDashboard />
        </div>
      </div>
      <Separator className="bg-black-50 mt-4" />
      <div className="px-6 h-full mt-1">{children}</div>
    </>
  );
}
