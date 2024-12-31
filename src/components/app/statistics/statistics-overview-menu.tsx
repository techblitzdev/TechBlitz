'use client';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, FileText } from 'lucide-react';
import { cn } from '@/utils/cn';
import { generateStatisticsReport } from '@/actions/ai/reports/generate-report';
import { UserWithOutAnswers } from '@/types/User';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTransition } from 'react';

export default function StatisticsOverviewMenu(opts: {
  user: UserWithOutAnswers;
}) {
  const { user } = opts;
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleGenerateReport = async () => {
    try {
      startTransition(async () => {
        const report = await generateStatisticsReport();
        console.log('report', report);
        // Use router.push instead of redirect for client-side navigation
        router.push(`/statistics/reports/${report.uid}`);
      });
    } catch (error) {
      toast.error('Failed to generate report');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="px-2" variant="default" padding="md" size="sm">
          <EllipsisVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-black border border-black-50 text-white hover:text-white"
      >
        <DropdownMenuItem
          className={cn(
            user?.userLevel === 'PREMIUM' &&
              'opacity-50 hover:cursor-not-allowed'
          )}
        >
          <button
            onClick={handleGenerateReport}
            className="hover:cursor-pointer flex items-center gap-x-2"
          >
            <FileText className="size-3.5" />
            {isPending ? 'Generating...' : 'Generate Report'}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
