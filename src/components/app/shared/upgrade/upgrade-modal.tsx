import StudentDiscountBlock from '@/components/marketing/pricing/student-discount';
import UpgradePage from '@/components/shared/payment/upgrade-page';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Dialog } from '@/components/ui/dialog';
import { useUserServer } from '@/hooks/use-user-server';

export default async function UpgradeModal() {
  const user = await useUserServer();

  // we don't show this modal if the user is not a free user (they are already on the pro plan)
  if (user?.userLevel !== 'FREE') return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="premium" size="sm">
          Get Pro
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black-75 max-w-6xl max-h-[80vh] border-none overflow-scroll">
        <UpgradePage gradientBackground={false} />
        <StudentDiscountBlock />
      </DialogContent>
    </Dialog>
  );
}
