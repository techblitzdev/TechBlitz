import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function Example() {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen={true}
      modal={true}
      onOpenChange={router.back}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <p>Dialog content</p>
      </DialogContent>
    </Dialog>
  );
}
