import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OnboardingModal(opts: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // if the param 'onboarding' is true, set the modal to open
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (opts.searchParams.onboarding === 'true') {
      setIsModalOpen(true);
    }
  }, [opts.searchParams.onboarding]);
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px] bg-black-100">
        <DialogHeader>
          <DialogTitle className="text-xl">Welcome!</DialogTitle>
          <DialogDescription className="flex flex-col gap-y-2">
            <span>
              Please note that techblitz is still in beta, and as such, there may be some bugs and
              issues. If you encounter any, please let us know by clicking the feedback button in
              the top right corner of the screen and we will do our best to fix them in a timely
              manner.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <span className="flex flex-col gap-y-2 w-full">
            You can also follow our progress on GitHub.
            <Button
              href="https://github.com/techblitzdev/TechBlitz"
              className="flex items-center gap-x-2"
            >
              <Star className="size-4 text-yellow-400 fill-yellow-600" />
              us on GitHub!
            </Button>
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
