import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

export default function Feedback() {
  return (
    <Button
      variant="default"
      className="flex items-center gap-x-2"
    >
      <ChatBubbleIcon className="size-4" />
      Feedback
    </Button>
  );
}
