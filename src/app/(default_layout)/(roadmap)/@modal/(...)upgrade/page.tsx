'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function Example({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen={true}
      modal={true}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
