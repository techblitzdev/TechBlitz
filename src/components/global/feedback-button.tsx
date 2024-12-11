import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import Link from 'next/link';

export default async function FeedbackButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2"
        >
          <ChatBubbleIcon className="size-4" />
          Send feedback
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#000] border border-black-50">
        <AlertDialogHeader>
          <AlertDialogTitle>Send feedback</AlertDialogTitle>
          <AlertDialogDescription>
            We really value your feedback, please let us know how we can improve
            our questions/product to better suit your needs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white text-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction>
            <Link href="mailto:loganfordwd@gmail.com">Send feedback</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
