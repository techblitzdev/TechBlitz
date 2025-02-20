'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserRecord } from '@/types/User';
import { getUserDisplayName } from '@/utils/user';
import { useOnborda } from 'onborda';
import { useState } from 'react';
import { useEffect } from 'react';

interface TourStartModalProps {
  user: UserRecord | null;
}

export default function TourStartModal({ user }: TourStartModalProps) {
  const { startOnborda } = useOnborda();
  const handleStartOnborda = () => {
    // close the modal
    setIsModalOpen(false);
    // start the tour
    startOnborda('question-tour');
  };

  // this opens if the url has '?tutorial=true'
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // if on mobile, don't show the modal
    if (window.innerWidth < 768) {
      return;
    }

    // if on modal, show the modal
    if (window.location.search.includes('tutorial=true')) {
      setIsModalOpen(true);
    }
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-3xl bg-gradient-to-b shadow-xl bg-black">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-gradient from-white/55 to-white">
            {getUserDisplayName(user)}, welcome to TechBlitz!
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-4 text-gray-200">
            <p>
              We're excited to have you on board. We've prepared a quick tour to help you get
              started.
            </p>
            <p>If you have any questions, please don't hesitate to reach out to us.</p>
            <p>Happy coding!</p>
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
