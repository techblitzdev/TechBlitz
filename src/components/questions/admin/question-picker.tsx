import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminQuestionPicker() {
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
