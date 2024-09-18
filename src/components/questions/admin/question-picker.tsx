import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';

export default function AdminQuestionPicker({ ...props }) {
  return (
    <div className="w-full flex justify-between">
      <Button className="flex items-center gap-x-1">
        <ChevronLeft className="size-4" />
        Previous
      </Button>
      <Button className="flex items-center gap-x-1">
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
