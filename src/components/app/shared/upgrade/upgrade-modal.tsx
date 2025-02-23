import UpgradePage from '@/components/shared/payment/upgrade-page';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Dialog } from '@/components/ui/dialog';
import { X } from 'lucide-react';

export default function UpgradeModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="premium">Get Pro</Button>
      </DialogTrigger>
      <DialogContent className="bg-black-75 max-w-4xl">
        <UpgradePage />
      </DialogContent>
    </Dialog>
  );
}
