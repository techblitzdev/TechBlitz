'use client';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/hooks/useUser';
import { deleteUser } from '@/actions/user/account/delete-user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DeleteAccountModal(opts: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isOpen, onClose } = opts;
  const { user } = useUser();
  const router = useRouter();

  const { mutateAsync: server_deleteUser, isPending } = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: () =>
      deleteUser({
        userUid: user?.uid || '',
      }),
    onSuccess: () => {
      // redirect the user to the signup page
      toast.success('Account deleted successfully');
      router.push('/signup');
    },
  });

  const handleDelete = async () => await server_deleteUser();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black">
        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
        <DialogDescription>
          This action is irreversible and will delete all your data.
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={async () => await handleDelete()}
          >
            {isPending ? 'Deleting...' : 'Delete Account'}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
