import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import Link from 'next/link';

export default async function FeedbackButton(opts: { showText?: boolean }) {
  const { showText = true } = opts;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full flex justify-end">
        <Button
          variant={showText ? 'default' : 'ghost'}
          className="flex items-center gap-2 p-2"
        >
          <ChatBubbleIcon className="size-4" />
          {showText && <p className="text-sm">Feedback</p>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black-100 border border-black-50">
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
            <Link href="mailto:team@techblitz.dev">Send feedback</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
