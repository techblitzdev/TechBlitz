'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function ClientPage({
  children,
  searchParams
}: {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (searchParams.purchase === 'success') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  // if we close the modal, remove the query param
  useEffect(() => {
    if (!isModalOpen) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [isModalOpen]);

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <DialogContent className="sm:max-w-[425px] bg-black-100">
          <DialogHeader>
            <DialogTitle className="text-xl">Purchase Successful!</DialogTitle>
            <DialogDescription className="flex flex-col gap-y-2">
              <span>
                You now have access to all the features on techblitz, why not
                one out now?
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              href="/roadmaps"
            >
              Go to roadmaps
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>{children}</div>
    </>
  );
}
