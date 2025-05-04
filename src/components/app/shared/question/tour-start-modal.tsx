'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { UserRecord } from '@/types';
import { getUserDisplayName } from '@/utils/user';
import { useOnborda } from 'onborda';
import Link from 'next/link';

interface TourStartModalProps {
  user: UserRecord | null;
  tourName: string;
  queryParam: string;
}

export default function TourStartModal({ user, tourName, queryParam }: TourStartModalProps) {
  const { startOnborda } = useOnborda();
  const handleStartOnborda = () => {
    // close the modal
    setIsModalOpen(false);
    // start the tour
    startOnborda(tourName);
  };

  // this opens if the url has '?tutorial=true'
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // if on mobile, don't show the modal
    if (window.innerWidth < 768) {
      return;
    }

    // if on modal, show the modal
    if (window.location.search.includes(queryParam)) {
      setIsModalOpen(true);
    }
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-3xl bg-gradient-to-b shadow-xl bg-black">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl font-bold text-gradient from-white/55 to-white">
            {getUserDisplayName(user)}, welcome to TechBlitz!
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-2 text-gray-400">
            <p>
              We're excited to have you on board. We've prepared a quick tour to help you get
              started.
            </p>
            <p>
              If you have any questions, please don't hesitate to reach out to us at{' '}
              <Link href="mailto:team@techblitz.dev" className="underline text-accent">
                team@techblitz.dev
              </Link>
              .
            </p>
            <p className="mt-3">
              Or submit an issue on our{' '}
              <Link href="https://git.new/blitz" className="underline text-accent">
                GitHub
              </Link>
              .
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full justify-end space-x-3 mt-6">
          <Button variant="default" onClick={() => setIsModalOpen(false)}>
            Skip
          </Button>
          <Button variant="secondary" onClick={handleStartOnborda}>
            Start tour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
