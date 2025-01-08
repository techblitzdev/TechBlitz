'use client';
import { deleteReport } from '@/actions/statistics/reports/delete';
import { MoreHorizontal, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function StatsReportCardMenu(opts: {
  reportUid: string;
  redirect?: string;
  triggerBackground?: boolean;
}) {
  const { reportUid, redirect, triggerBackground } = opts;

  const router = useRouter();

  const handleDeleteReport = async () => {
    try {
      await deleteReport(reportUid);
      toast.success('Report deleted');
      if (redirect) {
        router.push(redirect);
      }
    } catch (error) {
      toast.error('Failed to delete report');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={triggerBackground ? 'default' : 'ghost'}
          padding={triggerBackground ? 'sm' : 'none'}
          className={cn(
            'hover:bg-black-50',
            triggerBackground ? '' : 'p-0.5 h-fit'
          )}
        >
          <MoreHorizontal className="size-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem>
          <button
            className="flex items-center gap-2"
            onClick={handleDeleteReport}
          >
            <Trash2 className="size-4 text-destructive" />
            <p>Delete</p>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
