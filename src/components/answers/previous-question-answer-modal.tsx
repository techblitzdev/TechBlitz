// components
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import JsonDisplay from '@/components/global/json-display';
// types
import { Answer } from '@/types/Answers';

export default function PreviousQuestionAnswerModal(opts: {
  isOpen: boolean;
  onClose: () => void;
  userAnswer: Answer | undefined;
}) {
  const { onClose, isOpen, userAnswer } = opts;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-black-75 md:max-w-xl"
        aria-description={`Answer question modal`}
      >
        <DialogTitle>Answer</DialogTitle>
        <DialogDescription>
          <JsonDisplay data={userAnswer} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
