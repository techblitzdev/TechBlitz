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
import { useUser } from '@/hooks/use-user';
import { deleteUser } from '@/actions/user/account/delete-user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/ui/loading';

export default function DeleteAccountModal(opts: { isOpen: boolean; onClose: () => void }) {
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
    onError: (error: Error) => {
      // Show the error message to the user
      toast.error(`Failed to delete account: ${error.message}`);
      console.error('Error deleting account:', error);
    },
  });

  const handleDelete = async () => {
    try {
      await server_deleteUser();
    } catch (error) {
      // Error is handled in the mutation's onError callback
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black max-w-md">
        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
        <DialogDescription>
          This action is irreversible and will delete all your data.
        </DialogDescription>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? (
              <>
                <LoadingSpinner className="w-4 h-4 mr-2" /> Deleting...
              </>
            ) : (
              'Delete Account'
            )}
          </Button>
          <Button variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
