import { Expand } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import QuestionDisplay from '@/components/questions/single/code-snippet';

export default function ExpandedCodeModal({ code }: { code: string }) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-x-3">
        <Expand className="size-4 text-gray-500" />
      </DialogTrigger>
      <DialogContent className="bg-black-100 border border-black-50 max-w-5xl">
        <QuestionDisplay
          content={code}
          language=""
        />
      </DialogContent>
    </Dialog>
  );
}
