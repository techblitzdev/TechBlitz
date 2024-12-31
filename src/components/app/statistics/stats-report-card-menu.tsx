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

export default function StatsReportCardMenu(opts: { reportUid: string }) {
  const { reportUid } = opts;

  const handleDeleteReport = async () => {
    try {
      await deleteReport(reportUid);
      toast.success('Report deleted');
    } catch (error) {
      toast.error('Failed to delete report');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          padding="none"
          className="hover:bg-black-50 h-fit p-0.5"
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
