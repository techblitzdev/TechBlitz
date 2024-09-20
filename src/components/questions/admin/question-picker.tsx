'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getQuestions } from '@/actions/questions/admin/get';
import { getPagination } from '@/utils/supabase/pagination';

export default async function AdminQuestionPicker({
  to,
  from,
}: {
  to: number;
  from: number;
}) {
  return (
    <div className="w-full flex justify-between">
      <Button className="flex items-center gap-x-1" onClick={() => {}}>
        <ChevronLeft className="size-4" />
        Previous
      </Button>
      <Button className="flex items-center gap-x-1" onClick={() => {}}>
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
